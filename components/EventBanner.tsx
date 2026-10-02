"use client";

import Image from "next/image";
import { EVENT, isEventLive } from "@/lib/event";

// Pre-fills the demo form with the event context: the CTA announces the
// referral on the window and scrolls to #demo; DemoForm listens for it.
function goToDemo(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  window.dispatchEvent(new CustomEvent("atlas:ref", { detail: EVENT.id }));
  document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
}

export function EventBanner() {
  if (!isEventLive()) return null;
  return (
    <section
      id={EVENT.id}
      className="px-[clamp(16px,4vw,56px)] py-14"
      style={{
        background:
          "radial-gradient(60% 120% at 20% 50%, rgba(59,130,246,0.14), transparent 60%), #0f0f12",
        borderTop: "1px solid #27272a",
        borderBottom: "1px solid #27272a",
      }}
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr]">
        <Image
          src={EVENT.image}
          alt="Meet Atlas Digital Markets at TOKEN2049 Singapore, 7 to 8 October 2026, Booth SS29 Startup Village"
          width={1200}
          height={1200}
          unoptimized
          className="h-auto w-full max-w-[340px] justify-self-center rounded-[14px] border border-atlas-border shadow-[0_16px_50px_rgba(0,0,0,0.45)] md:justify-self-start"
        />
        <div>
          <div className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-atlas-accent">
            {EVENT.name} · {EVENT.dates} · {EVENT.venue}
          </div>
          <h2 className="font-display m-0 text-[clamp(26px,3.2vw,40px)] font-extrabold leading-tight tracking-tight text-atlas-white">
            Meet Atlas at TOKEN2049
          </h2>
          <p className="mb-0 mt-4 max-w-[640px] text-[15px] leading-relaxed text-atlas-gray">
            Kiran Pingali, Founder &amp; CEO, and Julia Durkot, Sales Strategy
            &amp; Execution, will be on the floor both days. Come with the
            execution question that matters to your desk: a buy-side OEMS, a
            broker desk platform, independent measurement of the stack you
            already run, or digital assets inside the platform you already
            offer. We will show the working software.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {[
              ["Find us", EVENT.booth],
              ["Hear us", EVENT.stage],
            ].map(([k, v]) => (
              <div
                key={k}
                className="rounded-lg border border-atlas-border bg-atlas-card px-4 py-2.5"
                style={{ borderLeft: "3px solid #3b82f6" }}
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-atlas-accent">
                  {k}
                </div>
                <div className="text-[14px] font-semibold text-atlas-white">{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#demo"
              onClick={goToDemo}
              className="rounded-lg bg-atlas-accent px-6 py-3 text-[14px] font-bold text-white no-underline shadow-[0_0_28px_rgba(59,130,246,0.3)] transition-all hover:bg-atlas-accent-light"
            >
              Book a meeting at TOKEN2049 →
            </a>
            <span className="text-[12px] text-atlas-gray-dark">
              AtlasX · Atlas DESK · Atlas TCA · Atlas Infrastructure
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
