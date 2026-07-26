"use client";

import { useState } from "react";

// Email capture for the Intelligence page. Posts to /api/subscribe, which
// stores the contact in a Resend audience (or falls back to notifying us).
export function Subscribe() {
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
        body: JSON.stringify({ email: email.trim() }),
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
              Get the Atlas read, every morning.
            </h3>
            <p className="mb-0 mt-2 text-sm leading-relaxed text-atlas-gray">
              The daily flow &amp; markout briefing — who was buying, what it
              cost them, and what the book can absorb today. Free, from the team
              building institutional execution intelligence.
            </p>
            <p className="mb-0 mt-2.5 text-[11.5px] text-atlas-gray-dark">
              Institutional desk?{" "}
              <a href="/#demo" className="text-atlas-accent no-underline hover:underline">
                Book a platform demo
              </a>
            </p>
          </div>
          {state === "done" ? (
            <div className="rounded-lg border border-atlas-green/40 bg-atlas-green/10 px-4 py-3 text-sm text-atlas-green">
              ✓ You&rsquo;re on the list. First briefing lands tomorrow morning.
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
                {state === "busy" ? "…" : "Subscribe"}
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
