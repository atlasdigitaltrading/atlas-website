"use client";

import { useState } from "react";

// Email capture. Two variants sharing one form: the Intelligence briefing
// list and the Atlas Pro waitlist. Posts to /api/subscribe, which stores the
// contact in the matching Resend audience (or falls back to notifying us).
const COPY = {
  intelligence: {
    title: "Get Atlas intelligence in your inbox.",
    body: "New research, notable market reads, and platform updates from the team building institutional execution intelligence. Occasional and worth opening — no noise.",
    button: "Subscribe",
    done: "You're on the list.",
    cross: { pre: "Professional trader?", label: "Join the Atlas Pro waitlist", href: "/pro" },
  },
  pro: {
    title: "Join the Atlas Pro waitlist.",
    body: "Be first in line when Atlas Pro opens. Early waitlist members get priority access and founding-user pricing.",
    button: "Join waitlist",
    done: "You're on the waitlist. We'll be in touch as access opens.",
    cross: { pre: "Institutional desk?", label: "Book a platform demo", href: "/#demo" },
  },
} as const;

export function Subscribe({
  variant = "intelligence",
}: {
  variant?: keyof typeof COPY;
}) {
  const copy = COPY[variant];
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || state === "busy") return;
    setState("busy");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), list: variant === "pro" ? "pro" : undefined }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <section className="px-[clamp(16px,4vw,56px)] pb-[90px]">
      <div
        className="mx-auto max-w-[1200px] rounded-[14px] border border-atlas-accent/30 p-8 md:p-10"
        style={{
          background:
            "radial-gradient(70% 130% at 50% 0%, rgba(59,130,246,0.14), transparent 60%), #0f0f12",
        }}
      >
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1.3fr_1fr]">
          <div>
            <h3 className="font-display m-0 text-xl font-bold text-atlas-white">
              {copy.title}
            </h3>
            <p className="mb-0 mt-2 text-sm leading-relaxed text-atlas-gray">
              {copy.body}
            </p>
            <p className="mb-0 mt-2.5 text-[11.5px] text-atlas-gray-dark">
              {copy.cross.pre}{" "}
              <a href={copy.cross.href} className="text-atlas-accent no-underline hover:underline">
                {copy.cross.label}
              </a>
            </p>
          </div>
          {state === "done" ? (
            <div className="rounded-lg border border-atlas-green/40 bg-atlas-green/10 px-4 py-3 text-sm text-atlas-green">
              ✓ {copy.done}
            </div>
          ) : (
            <form onSubmit={submit} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === "error") setState("idle");
                }}
                placeholder="work email"
                aria-label="work email"
                className="w-full flex-1 rounded-lg border border-atlas-border bg-black/40 px-3.5 py-2.5 text-sm text-atlas-white outline-none transition-colors focus:border-atlas-accent"
              />
              <button
                type="submit"
                disabled={state === "busy"}
                className="rounded-lg border-none bg-atlas-accent px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-atlas-accent-light disabled:cursor-not-allowed disabled:opacity-50"
              >
                {state === "busy" ? "…" : copy.button}
              </button>
            </form>
          )}
        </div>
        {state === "error" ? (
          <p className="mb-0 mt-3 text-xs text-atlas-red">
            Something went wrong — please try again.
          </p>
        ) : null}
      </div>
    </section>
  );
}
