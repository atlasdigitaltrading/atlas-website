import { SectionHeading } from "./SectionHeading";
import { SectionLabel } from "./SectionLabel";

const segs = [
  {
    title: "Buy Side",
    color: "#3b82f6",
    list: [
      "Asset Managers",
      "ETF Issuers",
      "Hedge Funds",
      "Crypto Funds",
      "Proprietary Trading Firms",
      "Token Holders & Projects",
    ],
  },
  {
    title: "Sell Side",
    color: "#06b6d4",
    list: [
      "Banks",
      "Retail Investment Platforms",
      "OTC Desks",
      "Broker-Dealers",
      "Prime Brokers",
    ],
  },
  {
    title: "Service Providers",
    color: "#a78bfa",
    list: ["Custodians", "Payment Service Providers"],
  },
];

export function Clients() {
  return (
    <section id="clients" className="bg-atlas-bg px-[clamp(16px,4vw,56px)] py-[100px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-[60px] text-center">
          <SectionLabel>Who We Serve</SectionLabel>
          <SectionHeading center>
            Built for every side of the market
          </SectionHeading>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {segs.map((s) => (
            <div
              key={s.title}
              className="relative overflow-hidden rounded-[14px] border border-atlas-border bg-atlas-card p-8"
            >
              <div
                className="absolute left-0 right-0 top-0 h-[3px]"
                style={{ background: s.color }}
              />
              <h3
                className="font-display mb-5 text-xl font-bold"
                style={{ color: s.color }}
              >
                {s.title}
              </h3>
              <div className="flex flex-col gap-3">
                {s.list.map((c) => (
                  <div key={c} className="flex items-center gap-2.5 text-sm text-atlas-offwhite">
                    <span
                      className="h-1.5 w-1.5 flex-shrink-0 rounded-full opacity-50"
                      style={{ background: s.color }}
                    />
                    {c}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
