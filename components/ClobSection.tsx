import { TopOfBook } from "./TopOfBook";
import { SectionHeading } from "./SectionHeading";
import { SectionLabel } from "./SectionLabel";

const FEATURES = [
  {
    title: "Smart Order Routing",
    desc: "Orders are routed across the consolidated book in real time. Aggressive, Passive, and Neutral modes weigh price, depth, and fees per venue so every order finds the best available liquidity.",
  },
  {
    title: "Transaction Cost Analysis",
    desc: "Every fill is benchmarked against the consolidated book at the moment of execution, so slippage and venue selection are measured against the real market — not a single exchange's quote.",
  },
];

export function ClobSection() {
  return (
    <section
      id="clob"
      className="px-[clamp(16px,4vw,56px)] py-[100px]"
      style={{ background: "#09090b" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionLabel>Consolidated Order Book</SectionLabel>
        <SectionHeading>
          Every venue&rsquo;s liquidity,
          <br />
          one book
        </SectionHeading>

        <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="mb-8 text-[15px] leading-relaxed text-atlas-gray">
              Atlas aggregates order book depth from every connected exchange
              into a single consolidated view, so you&rsquo;re always trading
              against the full market — not one venue&rsquo;s slice of it.
            </p>

            <div className="flex flex-col gap-7">
              {FEATURES.map((f) => (
                <div key={f.title}>
                  <div className="mb-2 flex items-center gap-2.5">
                    <span className="flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded bg-[rgba(59,130,246,0.12)] text-[11px] font-bold text-atlas-accent">
                      ✓
                    </span>
                    <h3 className="text-[16px] font-bold text-atlas-white">
                      {f.title}
                    </h3>
                  </div>
                  <p className="pl-[30px] text-[14px] leading-relaxed text-atlas-gray">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <TopOfBook />
        </div>
      </div>
    </section>
  );
}
