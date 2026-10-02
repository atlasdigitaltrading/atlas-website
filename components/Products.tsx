import { SectionHeading } from "./SectionHeading";
import { SectionLabel } from "./SectionLabel";

// Four ways to run on one engine. Order follows the trade: buy side, sell
// side, then the measurement layer on its own, then the engine behind
// partner platforms.
const products = [
  {
    name: "AtlasX",
    eyebrow: "Buy-Side OEMS",
    color: "#3b82f6",
    tagline:
      "The broker-neutral order and execution management system for hedge funds, asset managers, and proprietary trading firms.",
    features: [
      "Smart order routing across 16+ CEX and DEX venues with three aggression modes",
      "Eight execution algorithms plus RFQ for block liquidity and direct-to-broker routing",
      "Pre-trade cost decomposition and post-trade TCA, calibrated to your own fills",
      "Spot, perpetuals, options, prediction markets, and tokenized stocks on one ticket",
      "Pure agency, optional self-custody, every routing decision logged and replayable",
    ],
    cta: "Explore AtlasX",
    href: "/atlasx",
  },
  {
    name: "Atlas DESK",
    eyebrow: "Sell-Side Broker OMS/EMS",
    color: "#06b6d4",
    tagline:
      "The broker workbench for crypto desks and OTC dealers: client flow from quote to cover, in a system you operate yourself.",
    features: [
      "Rules engine: in-policy flow auto-executes at tiered prices, the rest holds for the desk",
      "Internal crossing with the residual covered on the broker's own keys",
      "Inventory bands with auto-hedge and a one-click kill-switch",
      "Per-client markup, commission ladders, prefunded ledgers, venue treasury",
      "Deployed per broker: your instance, your venue keys, your clients as tenants",
    ],
    cta: "Explore Atlas DESK",
    href: "/atlas-desk",
  },
  {
    name: "Atlas TCA",
    eyebrow: "Standalone Execution Measurement",
    color: "#a78bfa",
    tagline:
      "Independent measurement for desks that already run an OEMS they intend to keep. Atlas measures the fills and never touches the flow.",
    features: [
      "Implementation-shortfall decomposition per order, strategy, symbol, and counterparty",
      "Per-venue attribution with markouts at 1s, 5s, and 1m horizons",
      "Strategy, algorithm, and broker comparison on comparable flow",
      "Calibrates to the desk's own realized costs; a validation report on every file",
      "Deploys by fill file, read-only keys, inside your cloud, or inside a platform partner",
    ],
    cta: "Explore Atlas TCA",
    href: "/atlas-tca",
  },
  {
    name: "Atlas Infrastructure",
    eyebrow: "Powered by Atlas · Platforms & Vendors",
    color: "#22c55e",
    tagline:
      "White-labelled digital-asset execution behind trading platforms, OMS/EMS vendors, and brokerages adding a new asset class.",
    features: [
      "Your clients trade digital assets inside the front ends they already use",
      "Loosely coupled over FIX 4.4 or REST, or Atlas engines deployed beneath your OMS",
      "Execution reports, drop-copy, and position feeds into your existing risk layer",
      "Pre-trade forecasts and post-trade TCA on every order routed through Atlas",
      "Pure agency and non-custodial; you own the client relationship and the pricing",
    ],
    cta: "Explore Atlas Infrastructure",
    href: "/atlas-infrastructure",
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
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-[60px] text-center">
          <SectionLabel>Products</SectionLabel>
          <SectionHeading center>One engine, every side of the trade</SectionHeading>
          <p className="mx-auto mb-0 mt-4 max-w-[680px] text-[14.5px] leading-relaxed text-atlas-gray">
            Four ways to run on it: as the buy side&rsquo;s OEMS, as the
            broker&rsquo;s desk, as an independent scorecard on the stack you
            already have, or as the execution engine behind your own platform.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {products.map((p) => (
            <div
              key={p.name}
              className="relative flex flex-col overflow-hidden rounded-[14px] border border-atlas-border bg-atlas-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(59,130,246,0.35)]"
            >
              <div
                className="absolute left-0 right-0 top-0 h-[3px]"
                style={{ background: p.color }}
              />
              <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-atlas-gray-dark">
                {p.eyebrow}
              </div>
              <h3
                className="font-display mb-3 text-[22px] font-bold leading-tight"
                style={{ color: p.color }}
              >
                {p.name}
              </h3>
              <p className="mb-5 text-[13.5px] leading-relaxed text-atlas-gray">
                {p.tagline}
              </p>
              <div className="mb-6 flex flex-col gap-2.5">
                {p.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-start gap-2.5 text-[13px] leading-relaxed text-atlas-offwhite"
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
                href={p.href}
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
        <p className="mx-auto mt-10 max-w-[720px] text-center text-sm leading-relaxed text-atlas-gray">
          All four run on the same calibration engine: a closed loop that
          predicts the cost before every trade, measures what actually
          happened after, and learns from the difference. Per firm. Per venue.
          Per instrument.
        </p>
      </div>
    </section>
  );
}
