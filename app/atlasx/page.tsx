import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ProductShot } from "@/components/ProductShot";
import { SectionLabel } from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "AtlasX — Buy-Side OEMS | Atlas Digital Trading",
  description:
    "The institutional OEMS whose trading models calibrate to each firm's own execution flow. Smart order routing, execution algorithms, RFQ, and pre/post-trade analytics across spot, perps, and options.",
  alternates: { canonical: "/atlasx" },
  openGraph: {
    images: [{ url: "/og/og-atlasx-v2.png", width: 1200, height: 630 }],
    title: "AtlasX — Buy-Side OEMS | Atlas Digital Trading",
  },
  twitter: { card: "summary_large_image", images: ["/og/og-atlasx-v2.png"] },
};

// The page is structured as the engine's loop — predict, route, measure,
// recalibrate — because the loop IS the product's differentiator.
const LOOP = ["Predict", "Route", "Measure", "Recalibrate"];

function LoopRail({ active }: { active: number }) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em]">
      {LOOP.map((s, i) => (
        <span key={s} className="flex items-center gap-2">
          <span className={i === active ? "text-atlas-accent" : "text-atlas-gray-darker"}>
            {s}
          </span>
          {i < LOOP.length - 1 ? <span className="text-atlas-gray-darker">·</span> : null}
        </span>
      ))}
    </div>
  );
}

export default function AtlasXPage() {
  return (
    <div className="min-h-screen bg-atlas-bg text-atlas-white">
      <NavBar />
      <main className="px-[clamp(16px,4vw,56px)] pb-16 pt-32">
        <div className="mx-auto max-w-[1100px]">
          {/* hero */}
          <div className="mb-16 max-w-[820px]">
            <SectionLabel>AtlasX · Buy-Side OEMS</SectionLabel>
            <h1 className="font-display m-0 text-[clamp(30px,4.5vw,50px)] font-extrabold leading-[1.08] tracking-tight">
              The OEMS that learns
              <br />
              <span className="text-atlas-accent">your</span> execution flow
            </h1>
            <p className="mb-0 mt-5 max-w-[640px] text-[15.5px] leading-relaxed text-atlas-gray">
              For hedge funds, asset managers, and proprietary trading firms.
              AtlasX runs a closed loop on every order: predict the cost, route
              against the prediction, measure what actually happened, and feed
              the difference back into the models — per firm, per venue, per
              instrument. The longer you trade on it, the more accurately it
              executes for you.
            </p>
          </div>

          {/* PREDICT */}
          <section className="mb-16 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <LoopRail active={0} />
              <h2 className="font-display m-0 text-2xl font-bold">
                Know the cost before you commit size
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-atlas-gray">
                Every order gets a five-component implicit-cost decomposition —
                spread, temporary impact, book-depth walk, timing risk,
                opportunity cost — calibrated to the venues and liquidity that
                order will actually meet. Beside it, the live tape read and
                on-chain context: who is aggressing right now, and whether a
                token unlock lands inside your horizon.
              </p>
              <ul className="mt-4 flex flex-col gap-2 text-[13.5px] text-atlas-offwhite">
                {[
                  "Pre-trade cost model calibrated to your own fills",
                  "Live tape chips: flow, markout state, book imbalance",
                  "Token-unlock warnings on the ticket, before you commit",
                  "Algorithm cost comparison with a recommended schedule",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded bg-[rgba(59,130,246,0.12)] text-[10px] font-bold text-atlas-accent">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <ProductShot
              src="/screenshots/v2/onchain.png"
              alt="AtlasX On-Chain analytics: rates and carry, stablecoin liquidity, token unlocks, derivatives context"
              caption="On-Chain context — rates & carry, stablecoin liquidity, unlock calendar — feeding the pre-trade ticket"
              priority
            />
          </section>

          {/* ROUTE */}
          <section className="mb-16">
            <LoopRail active={1} />
            <div className="mb-6 grid grid-cols-1 items-end gap-4 lg:grid-cols-[1fr_auto]">
              <div>
                <h2 className="font-display m-0 text-2xl font-bold">
                  One ticket, every venue, every instrument
                </h2>
                <p className="mb-0 mt-3 max-w-[720px] text-[14px] leading-relaxed text-atlas-gray">
                  Consolidated books across the venues Atlas captures, smart
                  order routing with execution algorithms — TWAP, VWAP, POV,
                  Implementation Shortfall, Arrival, Liquidity Seeker, Iceberg,
                  Pegged and others — plus RFQ for block liquidity, and direct-to-broker
                  routing into the Atlas DESK network. Spot, perpetuals, and options.
                </p>
              </div>
            </div>
            <ProductShot
              src="/screenshots/trading.png"
              alt="AtlasX trading view: multi-venue chart, consolidated order book, smart order router ticket"
              caption="The trading surface — multi-venue chart, consolidated book, SOR ticket with execution strategies"
            />
          </section>

          {/* MEASURE */}
          <section className="mb-16 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.1fr_1fr]">
            <ProductShot
              src="/screenshots/v2/flow.png"
              alt="AtlasX Flow analytics: morning read, verified taker order flow by venue, absorption"
              caption="Flow & Microstructure — verified taker flow, venue markout league, absorption. Real market tape, never simulation"
            />
            <div>
              <LoopRail active={2} />
              <h2 className="font-display m-0 text-2xl font-bold">
                Measure the market — and yourself
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-atlas-gray">
                The same measurement stack behind our public{" "}
                <Link href="/intelligence" className="text-atlas-accent no-underline hover:underline">
                  Market Intelligence
                </Link>{" "}
                feed, wired into the desk: verified taker flow (aggressor side
                derived against each venue&rsquo;s own mid — reported side
                fields are not trusted), per-venue markout, book absorption.
                And for your own orders: implementation-shortfall decomposition,
                per-venue attribution, and markouts on every fill.
              </p>
              <ul className="mt-4 flex flex-col gap-2 text-[13.5px] text-atlas-offwhite">
                {[
                  "Market-wide venue markout league — where aggressive flow gets hurt least",
                  "Post-trade TCA: predicted vs realized, component by component",
                  "Full order lifecycle audit trail, drillable to each child fill",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded bg-[rgba(59,130,246,0.12)] text-[10px] font-bold text-atlas-accent">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* RECALIBRATE */}
          <section className="mb-16 rounded-[14px] border border-atlas-accent/30 p-8"
            style={{ background: "radial-gradient(70% 130% at 50% 0%, rgba(59,130,246,0.12), transparent 60%), #0f0f12" }}>
            <LoopRail active={3} />
            <h2 className="font-display m-0 text-2xl font-bold">
              The part that compounds
            </h2>
            <p className="mt-3 max-w-[760px] text-[14px] leading-relaxed text-atlas-gray">
              After every execution, the difference between predicted and
              realized cost flows back into the models — automatically, per
              firm, per venue, per instrument pair. No analyst step, no weekly
              refit. Pooled models calibrated on everyone&rsquo;s data and
              applied to no one in particular are a reasonable start and a poor
              finish: the cost that matters is the cost on the venues{" "}
              <em>you</em> trade, at the sizes <em>you</em> trade. That only
              comes from closing the loop — and it is why AtlasX gets more
              accurate for your desk the longer you run on it.
            </p>
          </section>

          {/* CTA */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-[14px] border border-atlas-border bg-atlas-card px-7 py-6">
            <div>
              <div className="font-display text-lg font-bold">
                See it on your flow.
              </div>
              <div className="mt-1 text-[13px] text-atlas-gray">
                Integrate in about a week; trade against the simulator until
                satisfied, then turn on production keys.
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/#demo" className="rounded-lg bg-atlas-accent px-5 py-2.5 text-sm font-bold text-white no-underline transition-all hover:bg-atlas-accent-light">
                Book a demo
              </Link>
              <Link href="/atlas-desk" className="rounded-lg border border-atlas-border px-5 py-2.5 text-sm font-semibold text-atlas-offwhite no-underline transition-all hover:border-atlas-accent/40">
                Sell side? Atlas DESK →
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
