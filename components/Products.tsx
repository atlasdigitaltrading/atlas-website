import { SectionHeading } from "./SectionHeading";
import { SectionLabel } from "./SectionLabel";

const products = [
  {
    name: "AtlasX",
    eyebrow: "Buy-Side Execution",
    color: "#3b82f6",
    tagline:
      "The institutional order and execution management system (OEMS) for hedge funds, asset managers, and proprietary trading firms.",
    features: [
      "Smart order routing across 16+ CEX and DEX venues, with execution-quality screening built in",
      "Trade spot, perpetuals, and options across any crypto",
      "Pre-trade cost analysis and post-trade TCA, calibrated to your own flow",
      "Execution algorithms — TWAP, VWAP, POV, Implementation Shortfall, Arrival, Liquidity Seeker, Iceberg, Pegged, and others",
      "RFQ to source block liquidity directly from market makers",
      "AI-assisted execution intelligence",
      "Multi-broker and multi-venue, with optional self-custody and full auditability",
    ],
    cta: "Live today — book a demo",
  },
  {
    name: "Atlas DESK",
    eyebrow: "Sell-Side & OTC",
    color: "#06b6d4",
    tagline:
      "The broker platform for crypto desks and OTC dealers — principal and agency flow in one system.",
    features: [
      "Cover client flow in spot, perpetuals, and options across any crypto",
      "Low-touch / high-touch broker rules engine at the core",
      "Unified principal and agency execution workflows",
      "Inventory management with calibrated auto-hedging",
      "Comprehensive execution algorithms — TWAP, VWAP, POV, Implementation Shortfall, Arrival, Liquidity Seeker, Iceberg, Pegged, and others",
      "RFQ to source block liquidity directly from other brokers and market makers",
      "Client-specific pricing, fee schedules, and a street-side API",
      "AI-assisted desk intelligence",
    ],
    cta: "Now onboarding design partners",
  },
];

export function Products() {
  return (
    <section
      id="products"
      className="px-[clamp(16px,4vw,56px)] py-[100px]"
      style={{
        background: "linear-gradient(180deg, #09090b 0%, #0f0f12 100%)",
      }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-[60px] text-center">
          <SectionLabel>Products</SectionLabel>
          <SectionHeading center>Two products, one engine</SectionHeading>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {products.map((p) => (
            <div
              key={p.name}
              className="relative flex flex-col overflow-hidden rounded-[14px] border border-atlas-border bg-atlas-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(59,130,246,0.35)]"
            >
              <div
                className="absolute left-0 right-0 top-0 h-[3px]"
                style={{ background: p.color }}
              />
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-atlas-gray-dark">
                {p.eyebrow}
              </div>
              <h3
                className="font-display mb-3 text-2xl font-bold"
                style={{ color: p.color }}
              >
                {p.name}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-atlas-gray">
                {p.tagline}
              </p>
              <div className="mb-7 flex flex-col gap-3">
                {p.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-atlas-offwhite"
                  >
                    <span
                      className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full opacity-50"
                      style={{ background: p.color }}
                    />
                    {f}
                  </div>
                ))}
              </div>
              <a
                href="#demo"
                className="group/cta mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold tracking-wide no-underline transition-opacity hover:opacity-80"
                style={{ color: p.color }}
              >
                {p.cta}
                <span className="transition-transform duration-200 group-hover/cta:translate-x-0.5">
                  →
                </span>
              </a>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-[680px] text-center text-sm leading-relaxed text-atlas-gray">
          Both run on the same calibration engine — a closed feedback loop that
          decomposes expected cost before every trade, measures what actually
          happened after, and learns from the difference. Per firm. Per venue.
          Per instrument.
        </p>
      </div>
    </section>
  );
}
