import { SectionHeading } from "./SectionHeading";
import { SectionLabel } from "./SectionLabel";

const leaders = [
  {
    name: "Kiran Pingali",
    title: "Founder & CEO",
    credentials: [
      "Ex-Citigroup · Ex-Lehman Brothers · Ex-Thomson Reuters/Refinitiv · Ex-Bloomberg",
      "25+ years in electronic trading & market structure",
      "Masters in Engineering (Computer Science), Cornell University",
      "Masters in Business Administration, Columbia University",
      "Chartered Financial Analyst (CFA), CFA Institute",
    ],
    linkedin: "https://www.linkedin.com/in/kiran-pingali/",
  },
  {
    name: "Paul Weiss",
    title: "Head of Engineering",
    credentials: [
      "Ex-UBS · Ex-Barclays · Ex-AllianceBernstein · Ex-Bloomberg",
      "TradeBlock (acquired by CoinDesk) · IOHK (Cardano)",
      "20+ years building institutional electronic trading systems",
      "Expertise: fault-tolerant order routing, low-latency systems, deterministic algo engines",
    ],
    linkedin: "https://www.linkedin.com/in/pauljweiss/",
  },
];

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
        <SectionLabel>Why Atlas</SectionLabel>
        <SectionHeading>
          Built by practitioners
        </SectionHeading>
        <p className="mb-12 mt-5 max-w-[820px] text-[15px] leading-relaxed text-atlas-gray">
          Atlas is built by a team that spent decades on the institutional side
          of electronic trading — building the platforms that route orders,
          measure execution quality, and help traders prove best execution.
          That experience is the foundation of every feature in the platform.
        </p>

        <div className="mb-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {leaders.map((l) => (
            <div
              key={l.name}
              className="flex flex-col rounded-xl border border-atlas-border bg-atlas-card p-[22px]"
            >
              <div className="text-[15px] font-bold text-atlas-white">
                {l.name}
              </div>
              <div className="mt-1 text-[13px] font-semibold text-atlas-accent">
                {l.title}
              </div>
              <ul className="mt-3 flex flex-col gap-1 text-[13px] text-atlas-gray">
                {l.credentials.map((c) => (
                  <li key={c}>- {c}</li>
                ))}
              </ul>
              <a
                href={l.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-atlas-accent no-underline hover:underline"
              >
                LinkedIn Profile →
              </a>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
    </section>
  );
}
