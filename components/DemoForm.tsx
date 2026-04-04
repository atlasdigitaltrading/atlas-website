"use client";

import { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { SectionLabel } from "./SectionLabel";

export function DemoForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    message: "",
  });
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const up = (k: keyof typeof form, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setError(null);
  };

  const valid =
    form.email.trim().length > 0 && form.firstName.trim().length > 0;

  async function submit() {
    if (!valid || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(
          typeof data.error === "string" ? data.error : "Something went wrong",
        );
        setLoading(false);
        return;
      }
      setDone(true);
    } catch {
      setError("Network error — please try again.");
    }
    setLoading(false);
  }

  return (
    <section
      id="demo"
      className="px-[clamp(16px,4vw,56px)] py-[100px]"
      style={{
        background: `radial-gradient(ellipse 55% 45% at 50% 50%, rgba(59,130,246,0.12) 0%, transparent 55%), #0f0f12`,
      }}
    >
      <div className="mx-auto max-w-[640px]">
        <div className="mb-10 text-center">
          <SectionLabel>Get Started</SectionLabel>
          <SectionHeading center>Book a demo</SectionHeading>
          <p className="mt-3.5 text-base leading-relaxed text-atlas-gray">
            See how Atlas can transform your digital asset execution.
            <br />
            Design partner pricing available for early adopters.
          </p>
        </div>

        {done ? (
          <div className="rounded-[14px] border border-[rgba(59,130,246,0.35)] bg-atlas-card p-11 text-center">
            <div className="mb-3.5 text-[44px]">✓</div>
            <h3 className="font-display mb-2.5 text-[22px] font-bold text-atlas-white">
              Thank you, {form.firstName}
            </h3>
            <p className="text-[15px] text-atlas-gray">
              We&apos;ll be in touch within 24 hours to schedule your demo.
            </p>
          </div>
        ) : (
          <div className="rounded-[14px] border border-atlas-border bg-atlas-card px-9 pb-7 pt-9">
            {error ? (
              <p className="mb-4 rounded-md border border-atlas-red/40 bg-atlas-red/10 px-3 py-2 text-sm text-atlas-red">
                {error}
              </p>
            ) : null}
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-atlas-gray">
                  First Name *
                </label>
                <input
                  className="w-full rounded-lg border border-atlas-border bg-black/40 px-3.5 py-2.5 text-sm text-atlas-white outline-none transition-colors focus:border-atlas-accent"
                  placeholder="Jane"
                  value={form.firstName}
                  onChange={(e) => up("firstName", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-atlas-gray">
                  Last Name
                </label>
                <input
                  className="w-full rounded-lg border border-atlas-border bg-black/40 px-3.5 py-2.5 text-sm text-atlas-white outline-none transition-colors focus:border-atlas-accent"
                  placeholder="Smith"
                  value={form.lastName}
                  onChange={(e) => up("lastName", e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="mb-1.5 block text-xs font-semibold text-atlas-gray">
                Work Email *
              </label>
              <input
                type="email"
                className="w-full rounded-lg border border-atlas-border bg-black/40 px-3.5 py-2.5 text-sm text-atlas-white outline-none transition-colors focus:border-atlas-accent"
                placeholder="jane@hedgefund.com"
                value={form.email}
                onChange={(e) => up("email", e.target.value)}
              />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-atlas-gray">
                  Company
                </label>
                <input
                  className="w-full rounded-lg border border-atlas-border bg-black/40 px-3.5 py-2.5 text-sm text-atlas-white outline-none transition-colors focus:border-atlas-accent"
                  placeholder="Acme Capital"
                  value={form.company}
                  onChange={(e) => up("company", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-atlas-gray">
                  Role
                </label>
                <input
                  className="w-full rounded-lg border border-atlas-border bg-black/40 px-3.5 py-2.5 text-sm text-atlas-white outline-none transition-colors focus:border-atlas-accent"
                  placeholder="Head of Trading"
                  value={form.role}
                  onChange={(e) => up("role", e.target.value)}
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="mb-1.5 block text-xs font-semibold text-atlas-gray">
                Anything specific you&apos;d like to discuss?
              </label>
              <textarea
                className="min-h-[70px] w-full resize-y rounded-lg border border-atlas-border bg-black/40 px-3.5 py-2.5 text-sm text-atlas-white outline-none transition-colors focus:border-atlas-accent"
                placeholder="Tell us about your trading needs..."
                value={form.message}
                onChange={(e) => up("message", e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={submit}
              disabled={!valid || loading}
              className="w-full rounded-lg border-none bg-atlas-accent py-3.5 text-[15px] font-bold text-white shadow-[0_0_28px_rgba(59,130,246,0.25)] transition-all disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Sending…" : "Request Demo"}
            </button>
            <p className="mb-0 mt-3.5 text-center text-[11px] text-atlas-gray-darker">
              We&apos;ll respond within 24 hours. No spam, no sales automation.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
