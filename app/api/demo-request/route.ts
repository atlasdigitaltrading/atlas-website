import { NextResponse } from "next/server";
import { Resend } from "resend";

// ---------------------------------------------------------------------------
// Abuse controls
//
// On 2026-11-06 a script posted to this endpoint every few seconds for half an
// hour (name "t x", email rate@probe.local), and every hit became an email.
// Nothing here needs a third-party service. The counters live in module
// memory: Vercel keeps a function instance warm between calls, so they hold
// across exactly the kind of burst they are meant to stop. A cold start
// resets them, which is why the Cloudflare rate-limit rule in front of the
// site is the backstop, not this file.
// ---------------------------------------------------------------------------

const PER_IP_LIMIT = 3; // submissions per IP ...
const PER_IP_WINDOW_MS = 10 * 60_000; // ... per 10 minutes
const GLOBAL_LIMIT = 20; // submissions from everyone ...
const GLOBAL_WINDOW_MS = 60 * 60_000; // ... per hour
const DEDUPE_WINDOW_MS = 10 * 60_000; // same person, same details: send once

// Browsers always send Origin on a cross-page fetch POST, so a request with
// neither Origin nor Referer did not come from the form.
const ALLOWED_HOSTS = new Set([
  "atlasdigitaltrading.com",
  "www.atlasdigitaltrading.com",
  "localhost:3000",
]);

// TLDs that can never receive mail. A real lead never types these.
const RESERVED_TLDS = new Set([
  "local",
  "localhost",
  "localdomain",
  "test",
  "invalid",
  "example",
  "internal",
  "lan",
  "home",
]);

const ipHits = new Map<string, number[]>();
const globalHits: number[] = [];
const recentSends = new Map<string, number>();

function prune(times: number[], windowMs: number, now: number) {
  while (times.length && now - times[0] > windowMs) times.shift();
}

function clientIp(request: Request): string {
  const h = request.headers;
  return (
    h.get("cf-connecting-ip") ??
    h.get("x-real-ip") ??
    h.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown"
  );
}

function originAllowed(request: Request): boolean {
  const source = request.headers.get("origin") ?? request.headers.get("referer");
  if (!source) return false;
  try {
    const host = new URL(source).host;
    return ALLOWED_HOSTS.has(host) || host.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

function emailLooksReal(email: string): boolean {
  if (email.length > 254) return false;
  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) return false;
  const tld = email.slice(email.lastIndexOf(".") + 1).toLowerCase();
  return !RESERVED_TLDS.has(tld);
}

function reject(
  request: Request,
  status: number,
  error: string,
  reason: string,
  extra?: Record<string, unknown>,
) {
  console.warn("demo-request rejected", {
    reason,
    ip: clientIp(request),
    ua: request.headers.get("user-agent") ?? "",
    ...extra,
  });
  return NextResponse.json({ error }, { status });
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.DEMO_EMAIL_RECIPIENT;

  if (!apiKey || !to) {
    return NextResponse.json(
      {
        error:
          "Email not configured. Set RESEND_API_KEY and DEMO_EMAIL_RECIPIENT on the server.",
      },
      { status: 503 },
    );
  }

  if (!originAllowed(request)) {
    return reject(request, 403, "Forbidden", "bad-origin", {
      origin: request.headers.get("origin"),
      referer: request.headers.get("referer"),
    });
  }

  // Production traffic must come through Cloudflare, so the WAF and
  // rate-limit rules there cannot be skipped by posting to the *.vercel.app
  // hostname. Cloudflare stamps every proxied request with cf-ray. If the
  // domain is ever un-proxied (grey cloud) this check has to go too.
  if (process.env.VERCEL_ENV === "production" && !request.headers.get("cf-ray")) {
    return reject(request, 403, "Forbidden", "bypassed-cloudflare", {
      host: request.headers.get("host"),
    });
  }

  // Count the hit before looking at the body, so garbage requests burn the
  // same budget as well-formed ones.
  const now = Date.now();
  const ip = clientIp(request);
  const mine = ipHits.get(ip) ?? [];
  prune(mine, PER_IP_WINDOW_MS, now);
  prune(globalHits, GLOBAL_WINDOW_MS, now);
  if (mine.length >= PER_IP_LIMIT || globalHits.length >= GLOBAL_LIMIT) {
    return reject(
      request,
      429,
      "Too many requests. Please try again in a few minutes, or email info@atlasdigitaltrading.com.",
      mine.length >= PER_IP_LIMIT ? "rate-limit-ip" : "rate-limit-global",
    );
  }
  mine.push(now);
  ipHits.set(ip, mine);
  globalHits.push(now);

  try {
    const body = await request.json();

    // Honeypot: a hidden field real users never see or fill. Bots that
    // scrape the form fill every input. Answer as if it worked, so the
    // script learns nothing.
    if (String(body.website ?? "").trim()) {
      console.warn("demo-request honeypot", { ip });
      return NextResponse.json({ success: true });
    }

    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();
    const email = String(body.email ?? "").trim();
    const company = String(body.company ?? "").trim();
    const role = String(body.role ?? "").trim();
    const businessType = String(body.businessType ?? "").trim();
    const country = String(body.country ?? "").trim();
    const timeline = String(body.timeline ?? "").trim();
    const products = Array.isArray(body.products)
      ? body.products.map((p: unknown) => String(p)).join(", ")
      : "";
    const message = String(body.message ?? "").trim();

    if (!firstName || !email) {
      return reject(request, 400, "Missing required fields", "missing-fields");
    }
    if (firstName.length < 2 || firstName.length > 80 || lastName.length > 80) {
      return reject(request, 400, "Please enter your name", "bad-name");
    }
    if (!emailLooksReal(email)) {
      return reject(request, 400, "Please enter a valid work email", "bad-email", {
        email,
      });
    }
    if (message.length > 5000 || company.length > 200) {
      return reject(request, 400, "Message is too long", "too-long");
    }

    // The same person resubmitting the same request inside ten minutes
    // (double click, back button, "did it go through?") gets one email.
    const dedupeKey = `${email.toLowerCase()}|${firstName.toLowerCase()}|${company.toLowerCase()}`;
    const lastSent = recentSends.get(dedupeKey);
    if (lastSent && now - lastSent < DEDUPE_WINDOW_MS) {
      return NextResponse.json({ success: true });
    }

    const resend = new Resend(apiKey);
    const from =
      process.env.DEMO_EMAIL_FROM ??
      "Atlas Demo Request <info@atlasdigitaltrading.com>";

    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Demo Request: ${firstName} ${lastName} — ${company || businessType || "No company"}`,
      html: `
        <h2>New Demo Request</h2>
        <p><strong>Name:</strong> ${esc(firstName)} ${esc(lastName)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Company:</strong> ${esc(company) || "Not provided"}</p>
        <p><strong>Role:</strong> ${esc(role) || "Not provided"}</p>
        <p><strong>Firm Type:</strong> ${esc(businessType) || "Not provided"}</p>
        <p><strong>Country:</strong> ${esc(country) || "Not provided"}</p>
        <p><strong>Products of Interest:</strong> ${esc(products) || "Not provided"}</p>
        <p><strong>Implementation Timeline:</strong> ${esc(timeline) || "Not provided"}</p>
        <p><strong>Message:</strong> ${esc(message) || "None"}</p>
        <hr />
        <p><em>Submitted via atlasdigitaltrading.com · IP ${esc(ip)}</em></p>
      `,
    });

    if (error) {
      console.error("Resend error", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    recentSends.set(dedupeKey, now);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}

// Form values go into an HTML email; keep them as text.
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
