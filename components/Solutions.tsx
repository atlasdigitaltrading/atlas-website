import { SectionHeading } from "./SectionHeading";
import { SectionLabel } from "./SectionLabel";

const items = [
  {
    icon: "⚡",
    title: "Smart Order Routing",
    desc: "Route orders across 10+ venues with Aggressive, Passive, and Neutral execution modes. Real-time venue scoring on fill probability, latency, fees, and market impact.",
  },
  {
    icon: "📊",
    title: "Execution Algorithms",
    desc: "TWAP and VWAP algorithms with adaptive scheduling, participation rate capping, and catch-up logic. Minimize market impact on large orders.",
  },
  {
    icon: "🔍",
    title: "Pre-Trade Analytics",
    desc: "Almgren-Chriss impact models, spread cost estimation, book depth analysis, per-venue ADV data, and illustrative execution schedules.",
  },
  {
    icon: "📈",
    title: "Post-Trade TCA",
    desc: "Implementation shortfall decomposition, strategy comparison, venue analysis, markout analytics, and slippage benchmarking.",
  },
  {
    icon: "🏦",
    title: "Order Management",
    desc: "Full OMS with multi-venue state management, parent/child order tracking, partial fill handling, and sub-account allocation.",
  },
  {
    icon: "🛡️",
    title: "Margin & Collateral",
    desc: "Real-time margin monitoring with health scores across all venues. Proactive alerts and one-click collateral transfers via Fireblocks.",
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
