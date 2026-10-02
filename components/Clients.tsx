import { SectionHeading } from "./SectionHeading";
import { SectionLabel } from "./SectionLabel";

// Each segment maps to the product built for it.
const segs = [
  {
    title: "Buy Side",
    product: "AtlasX",
    href: "/atlasx",
    color: "#3b82f6",
    blurb:
      "Desks for whom execution quality is a measurable P&L line.",
    list: [
      "Crypto Hedge Funds",
      "Crypto Asset Managers",
      "ETF Issuers",
      "Wealth Management Firms",
      "Family Offices",
      "Crypto VCs and Foundations",
      "Token Holders & Projects",
      "Proprietary Trading Firms",
      "Market Makers",
    ],
  },
  {
    title: "Sell Side",
    product: "Atlas DESK",
    href: "/atlas-desk",
    color: "#06b6d4",
    blurb:
      "Desks that quote clients, manage inventory, and cover in the market.",
    list: [
      "Crypto Brokers",
      "OTC Desks",
      "Agency Trading Desks",
      "Banks",
      "Prime Brokers",
      "Retail Platforms",
    ],
  },
  {
    title: "Incumbent OEMS",
    product: "Atlas TCA",
    href: "/atlas-tca",
    color: "#a78bfa",
    blurb:
      "Desks keeping the system they run and wanting an independent scorecard on it.",
    list: [
      "Desks on a Third-Party OEMS",
      "Compliance & Best-Execution Teams",
      "Allocators & Investment Committees",
      "Broker & Platform Operations",
      "Equities Desks Adding Digital Assets",
    ],
  },
  {
    title: "Platforms",
    product: "Atlas Infrastructure",
    href: "/atlas-infrastructure",
    color: "#22c55e",
    blurb:
      "Platforms adding digital assets behind their own front end.",
    list: [
      "Trading Platforms",
      "OMS/EMS Vendors",
      "Brokerages Adding Crypto",
      "FinTechs & Neobrokers",
      "Payment Service Providers",
      "Custodians",
      "Tier-3 Exchanges",
    ],
  },
];

export function Clients() {
  return (
    <section id="clients" className="bg-atlas-bg px-[clamp(16px,4vw,56px)] py-[100px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-[60px] text-center">
          <SectionLabel>Who We Serve</SectionLabel>
          <SectionHeading center>
            Built for every side of the market
          </SectionHeading>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {segs.map((s) => (
            <div
              key={s.title}
              className="relative flex flex-col overflow-hidden rounded-[14px] border border-atlas-border bg-atlas-card p-7"
            >
              <div
                className="absolute left-0 right-0 top-0 h-[3px]"
                style={{ background: s.color }}
              />
              <h3
                className="font-display mb-1 text-xl font-bold"
                style={{ color: s.color }}
              >
                {s.title}
              </h3>
              <p className="mb-5 text-[12.5px] leading-relaxed text-atlas-gray">
                {s.blurb}
              </p>
              <div className="flex flex-col gap-2.5">
                {s.list.map((c) => (
                  <div key={c} className="flex items-center gap-2.5 text-[13.5px] text-atlas-offwhite">
                    <span
                      className="h-1.5 w-1.5 flex-shrink-0 rounded-full opacity-50"
                      style={{ background: s.color }}
                    />
                    {c}
                  </div>
                ))}
              </div>
              <a
                href={s.href}
                className="mt-6 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] no-underline transition-opacity hover:opacity-80"
                style={{ color: s.color }}
              >
                {s.product} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
