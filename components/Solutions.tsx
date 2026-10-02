import { SectionHeading } from "./SectionHeading";
import { SectionLabel } from "./SectionLabel";

const items = [
  {
    icon: "⚡",
    title: "Smart Order Routing",
    desc: "Route across 16+ CEX and DEX venues with Aggressive, Passive, and Neutral modes. Real-time venue scoring on fill probability, latency, fees, and market impact, with every decision logged and replayable.",
  },
  {
    icon: "📊",
    title: "Execution Algorithms & RFQ",
    desc: "TWAP, VWAP, POV, Implementation Shortfall, Arrival Price, Liquidity Seeker, Iceberg, and Pegged, with adaptive scheduling and participation caps. RFQ for block liquidity and direct-to-broker routing into the Atlas DESK network.",
  },
  {
    icon: "🔍",
    title: "Pre-Trade Analytics",
    desc: "Five-component cost decomposition (spread, temporary impact, book-depth walk, timing risk, opportunity cost) in bps and USD, live per-venue ADV and fees, execution schedules, and tape plus on-chain context on the ticket.",
  },
  {
    icon: "📈",
    title: "Post-Trade TCA",
    desc: "Implementation-shortfall decomposition, per-venue attribution and markouts, strategy and broker comparison, and validation reports. Inside AtlasX and Atlas DESK, or standalone as Atlas TCA with a REST API.",
  },
  {
    icon: "🧭",
    title: "Six Asset Classes",
    desc: "Spot, perpetuals, options, prediction markets, tokenized stocks, and equities on one engine. A canonical order and fill contract means routing, analytics, and measurement work the same way across all of them.",
  },
  {
    icon: "🛡️",
    title: "Portfolio, Margin & Risk",
    desc: "Consolidated positions and PnL across venues, gross and net exposure, VaR and concentration limits with alerts, real-time margin health scores, and one-click collateral transfers via Fireblocks.",
  },
];

export function Solutions() {
  return (
    <section
      id="capabilities"
      className="px-[clamp(16px,4vw,56px)] py-[100px]"
      style={{
        background: "linear-gradient(180deg, #0f0f12 0%, #09090b 100%)",
      }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-[60px] text-center">
          <SectionLabel>Capabilities</SectionLabel>
          <SectionHeading center>The complete execution stack</SectionHeading>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
            <div
              key={s.title}
              className="cursor-default rounded-[14px] border border-atlas-border bg-atlas-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(59,130,246,0.35)]"
            >
              <div className="mb-4 flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-[rgba(59,130,246,0.12)] text-xl">
                {s.icon}
              </div>
              <h3 className="font-display mb-2.5 text-lg font-bold text-atlas-white">
                {s.title}
              </h3>
              <p className="m-0 text-sm leading-relaxed text-atlas-gray">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
