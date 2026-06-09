"use client";

import { useEffect, useState } from "react";
import { Counter } from "./Counter";

export function Hero() {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-[clamp(16px,4vw,56px)] pb-20 pt-[120px]"
      style={{
        background: `radial-gradient(ellipse 80% 50% at 50% 20%, rgba(59,130,246,0.12) 0%, transparent 50%), #09090b`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.025) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 65% 65% at 50% 40%, black 15%, transparent 65%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 65% 65% at 50% 40%, black 15%, transparent 65%)",
        }}
      />

      <div
        className={`relative z-[1] max-w-[880px] text-center transition-all duration-[800ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
          vis ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"
        }`}
      >
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-atlas-accent/30 bg-[rgba(59,130,246,0.12)] px-3.5 py-1.5 text-xs font-semibold tracking-wide text-atlas-accent">
          <span className="h-1.5 w-1.5 animate-atlas-pulse rounded-full bg-atlas-accent shadow-[0_0_8px_#3b82f6]" />
          Atlas is now live — Institutional firms can request access
        </div>

        <h1 className="font-display m-0 mb-6 text-[clamp(38px,5.2vw,68px)] font-extrabold leading-[1.08] tracking-tight text-atlas-white">
          Institutional{" "}
          <span className="text-atlas-accent">Execution</span>
          <br />
          for Digital Assets
        </h1>

        <p className="mx-auto mb-9 max-w-[660px] text-[clamp(15px,1.4vw,18px)] leading-relaxed text-atlas-gray">
          The institutional execution infrastructure for digital assets: Smart
          Order Routing, Execution Algorithms, and Pre-trade/Post-Trade
          Transaction Cost Analysis (TCA) — unified in a single platform.
        </p>

        <div className="flex flex-wrap justify-center gap-3.5">
          <a
            href="#demo"
            className="rounded-lg bg-atlas-accent px-8 py-3.5 text-[15px] font-bold text-white no-underline shadow-[0_0_30px_rgba(59,130,246,0.25)] transition-all hover:bg-atlas-accent-light"
          >
            Book a Demo →
          </a>
          <a
            href="#platform"
            className="rounded-lg border border-atlas-border bg-transparent px-8 py-3.5 text-[15px] font-semibold text-atlas-white no-underline transition-all hover:border-atlas-accent/50"
          >
            See the Platform
          </a>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-[clamp(28px,5vw,60px)] border-t border-atlas-border pt-9">
          {(
            [
              { v: 15, s: "+", l: "Connected Exchanges" },
              { v: 10, s: "+", l: "Execution Algorithms" },
              { v: "24/7", s: "", l: "High Availability" },
            ] as const
          ).map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-[clamp(26px,2.8vw,38px)] font-extrabold tracking-tight text-atlas-accent">
                {typeof s.v === "number" ? (
                  <Counter end={s.v} suffix={s.s} />
                ) : (
                  s.v
                )}
              </div>
              <div className="mt-1 text-xs font-medium text-atlas-gray-darker">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
