import { NextResponse } from "next/server";
import { Resend } from "resend";

// Newsletter signup. Preferred path: store the contact in a Resend audience
// (set RESEND_AUDIENCE_ID). Fallback: notify DEMO_EMAIL_RECIPIENT so no
// signup is ever lost while the audience isn't configured.
export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  let email = "";
  try {
    const body = await request.json();
    email = String(body.email ?? "").trim().toLowerCase();
  } catch {
    /* fall through to validation */
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  // Preferred: store in the audience. If that fails for ANY reason (key
  // lacks full access, audience mismatch, transient error), fall back to the
  // notification email — a signup must never be lost.
  if (audienceId) {
    try {
      const { error } = await resend.contacts.create({
        email,
        audienceId,
        unsubscribed: false,
      });
      if (!error) return NextResponse.json({ success: true });
      console.error("subscribe: contacts.create failed", error);
    } catch (e) {
      console.error("subscribe: contacts.create threw", e);
    }
  }

  try {
    const to = process.env.DEMO_EMAIL_RECIPIENT;
    if (!to) {
      return NextResponse.json({ error: "Not configured" }, { status: 503 });
    }
    const from =
      process.env.DEMO_EMAIL_FROM ??
      "Atlas Demo Request <info@atlasdigitaltrading.com>";
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: `Intelligence subscriber: ${email}`,
      html: `<p>New Intelligence briefing subscriber: <strong>${email}</strong></p><p><em>${audienceId ? "Audience write FAILED — check the API key has Full access and the audience ID matches. Contact captured via this email only." : "Add RESEND_AUDIENCE_ID to store contacts in an audience automatically."}</em></p>`,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("subscribe error", e);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
