import { SectionHeading } from "./SectionHeading";
import { SectionLabel } from "./SectionLabel";

const diffs = [
  {
    t: "Pre-Trade ↔ Post-Trade Feedback Loop",
    d: "Our pre-trade cost models are continuously calibrated from post-trade TCA outcomes. The more you trade, the more accurate your cost predictions become — a compounding moat.",
  },
  {
    t: "Venue-Agnostic Smart Routing",
    d: "Not tied to any single exchange or liquidity pool. Atlas routes across 10+ CEXs and DEXs, scoring venues in real-time on fill probability, latency, fees, and market impact.",
  },
  {
    t: "Modular Architecture",
    d: "Use the full stack or integrate individual modules. Need just SOR? Just TCA? Atlas's microservices architecture lets you deploy what you need.",
  },
  {
    t: "Transparent, Unconflicted",
    d: "Atlas is a pure technology provider — no prop trading desk, no internalization, no conflicts of interest. Agency-only execution aligned with your best outcome.",
  },
];

export function WhyAtlas() {
  return (
    <section
      id="why-atlas"
      className="px-[clamp(16px,4vw,56px)] py-[100px]"
      style={{
        background: "linear-gradient(180deg, #09090b 0%, #0f0f12 100%)",
      }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-[72px]">
          <div>
            <SectionLabel>Why Atlas</SectionLabel>
            <SectionHeading>
              Built by a practitioner
            </SectionHeading>
            <p className="mb-7 mt-5 text-[15px] leading-relaxed text-atlas-gray">
              Atlas is founded by Kiran Pingali, who spent 25 years building
              electronic trading infrastructure at Citigroup, Lehman Brothers, Thomson
              Reuters/Refinitiv, and Bloomberg — then brought that expertise to
              institutional crypto as a CEO and CPO.
            </p>
            <p className="mb-7 text-[15px] leading-relaxed text-atlas-gray">
              Atlas combines quantitative execution models with crypto-native infrastructure —
              real-time CLOB aggregation, cross-venue margin monitoring, and
              Almgren-Chriss impact modeling.
            </p>
            <div className="rounded-xl border border-atlas-border bg-atlas-card p-[22px]">
              <div className="mb-2.5 text-[15px] font-bold text-atlas-white">
                Kiran Pingali
              </div>
              <div className="flex flex-col gap-1 text-[13px] text-atlas-gray">
                <span>
                  - Masters in Engineering (Computer Science), Cornell University 
                  </span>
                  <span>
                  - Masters in Business Administration, Columbia University
                  </span>
                  <span>
                  - Chartered Financial Analyst (CFA), CFA Institute
                  </span>
                <span>
                  - Ex-Citigroup · Ex-Lehman Brothers · Ex-Thomson Reuters/Refinitiv · Ex-Bloomberg
                </span>
                <span>- 25+ years in electronic trading & market structure</span>
              </div>
              <a
                href="https://www.linkedin.com/in/kiran-pingali/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-atlas-accent no-underline hover:underline"
              >
                LinkedIn Profile →
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {diffs.map((d) => (
              <div
                key={d.t}
                className="rounded-xl border border-atlas-border bg-atlas-card p-[22px] transition-colors duration-300 hover:border-[rgba(59,130,246,0.35)]"
              >
                <h4 className="font-display mb-2 text-base font-bold text-atlas-white">
                  {d.t}
                </h4>
                <p className="m-0 text-[13px] leading-relaxed text-atlas-gray">
                  {d.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
