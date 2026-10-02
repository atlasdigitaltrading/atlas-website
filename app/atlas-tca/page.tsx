import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { SectionLabel } from "@/components/SectionLabel";
import { TcaScorecard } from "@/components/TcaScorecard";

export const metadata: Metadata = {
  title: "Atlas TCA — Standalone Execution Measurement | Atlas Digital Trading",
  description:
    "Independent transaction cost analysis for desks that keep the OEMS they already run: implementation-shortfall decomposition, venue attribution and markouts, strategy and broker comparison, calibrated to your own fills. Atlas never touches the order flow.",
  alternates: { canonical: "/atlas-tca" },
  openGraph: {
    images: [{ url: "/og/og-atlas-tca-v2.png", width: 1200, height: 630 }],
    title: "Atlas TCA — Standalone Execution Measurement | Atlas Digital Trading",
  },
  twitter: { card: "summary_large_image", images: ["/og/og-atlas-tca-v2.png"] },
};

const MEASURES = [
  {
    t: "Cost decomposition",
    d: "Implementation shortfall against arrival: spread, book impact, timing, opportunity cost. Per order, aggregated per strategy, per symbol, and per counterparty. Fee-inclusive by default, with gross metrics alongside.",
  },
  {
    t: "Venue attribution",
    d: "Realized cost and markout by venue at 1s, 5s, and 1m horizons (positive = cost to the aggressor), effective spread per fill, and adverse selection by venue and instrument.",
  },
  {
    t: "Strategy comparison",
    d: "Relative performance across execution strategies, algorithms, and brokers on comparable flow, so the desk can see which choices are earning their keep.",
  },
  {
    t: "Firm-specific calibration",
    d: "Cost estimates recalibrate against the desk's own realized outcomes, per venue and per instrument pair. Accuracy improves as volume accumulates rather than staying fixed at a market-wide average.",
  },
  {
    t: "Data validation",
    d: "Every ingested file returns a validation report: row counts, rejects with reasons, coverage gaps, and convention checks, so data issues surface immediately rather than at the readout.",
  },
  {
    t: "Reporting surface",
    d: "Documented REST API and scheduled reports. Output renders in existing dashboards or stands alone. No requirement to adopt an Atlas screen.",
  },
];

const DEPLOY = [
  {
    t: "Fill file",
    d: "Periodic file drop in the desk's existing export format (CSV, NDJSON, Parquet). No integration, no infrastructure, no engineering time. Fastest route to a first result.",
  },
  {
    t: "Read-only API keys",
    d: "Continuous ingestion against venue accounts using keys with no order permissions, once the desk wants ongoing measurement rather than periodic reporting.",
  },
  {
    t: "In your environment",
    d: "Single-container deployment inside the desk's own cloud, no outbound egress. No fill data leaves the perimeter and the module emits no telemetry.",
  },
  {
    t: "Inside a platform partner",
    d: "Engine deployed in the platform's environment, fed by a scheduled extract from its data warehouse, consumed over REST, rendered in the platform's own portal under its brand.",
  },
];

const ACCENT = "rgba(167,139,250,0.14)";

export default function AtlasTcaPage() {
  return (
    <div className="min-h-screen bg-atlas-bg text-atlas-white">
      <NavBar />
      <main className="px-[clamp(16px,4vw,56px)] pb-16 pt-32">
        <div className="mx-auto max-w-[1100px]">
          {/* hero */}
          <div className="mb-10 max-w-[820px]">
            <SectionLabel>Atlas TCA · Standalone Execution Measurement</SectionLabel>
            <h1 className="font-display m-0 text-[clamp(30px,4.5vw,50px)] font-extrabold leading-[1.08] tracking-tight">
              Measure execution quality.
              <br />
              <span className="text-atlas-purple">Whoever executed it.</span>
            </h1>
            <p className="mb-0 mt-5 max-w-[680px] text-[15.5px] leading-relaxed text-atlas-gray">
              Atlas TCA is a standalone execution-measurement service for desks
              that already run an order management system they intend to keep.
              Atlas ingests fills from the existing stack and returns cost
              decomposition, venue attribution, and strategy comparison,
              calibrated against the desk&rsquo;s own realized costs. Atlas
              does not route, execute, or touch order flow at any point.
            </p>
          </div>

          {/* scorecard */}
          <section className="mb-14">
            <TcaScorecard />
          </section>

          {/* why it exists */}
          <section className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="font-display m-0 text-2xl font-bold">Why it exists</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-atlas-gray">
                Execution management systems report on their own routing
                decisions: the system being measured is the system doing the
                measuring. That is a structural conflict, not a vendor
                failing.
              </p>
            </div>
            <div className="rounded-[14px] border border-atlas-border bg-atlas-card p-6">
              <p className="m-0 text-[14px] leading-relaxed text-atlas-offwhite">
                Two heads of trading at separate institutions independently
                reached the same conclusion: routing in crypto is largely
                solved, and the gap is measurement. No consolidated tape, no
                standard arrival benchmark, and no independent read on whether
                a venue fills what it quotes. Measurement and execution should
                be separable, and the desk that owns the flow should own the
                scorecard.
              </p>
            </div>
          </section>

          {/* what it measures */}
          <section className="mb-14">
            <div className="mb-6">
              <SectionLabel>What it measures</SectionLabel>
              <h2 className="font-display m-0 text-2xl font-bold">
                Six outputs on every run
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MEASURES.map((m) => (
                <div key={m.t} className="rounded-[14px] border border-atlas-border bg-atlas-card p-5">
                  <h3 className="font-display m-0 mb-2 text-[15px] font-bold">{m.t}</h3>
                  <p className="m-0 text-[12.5px] leading-relaxed text-atlas-gray">{m.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* how it deploys */}
          <section className="mb-14">
            <div className="mb-6">
              <SectionLabel>How it deploys</SectionLabel>
              <h2 className="font-display m-0 text-2xl font-bold">
                Four ways in, from a file drop to inside your perimeter
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {DEPLOY.map((m, i) => (
                <div key={m.t} className="rounded-[14px] border border-atlas-border bg-atlas-card p-5">
                  <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-md text-[12px] font-bold text-atlas-purple" style={{ background: ACCENT }}>
                    {i + 1}
                  </div>
                  <h3 className="font-display m-0 mb-2 text-[15px] font-bold">{m.t}</h3>
                  <p className="m-0 text-[12.5px] leading-relaxed text-atlas-gray">{m.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* coverage + scorecard offer */}
          <section className="mb-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-[14px] border border-atlas-border bg-atlas-card p-7">
              <h2 className="font-display m-0 text-xl font-bold">Asset coverage</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-atlas-gray">
                Digital assets: live in production. US cash equities: in build
                with a platform partner. The engine is asset-class agnostic by
                architecture: a canonical fill contract, benchmark mathematics
                with golden test fixtures, and per-client column-mapped
                ingestion, with no dependency on any other Atlas service.
              </p>
            </div>
            <div
              className="rounded-[14px] border border-atlas-purple/40 p-7"
              style={{ background: "radial-gradient(70% 130% at 50% 0%, rgba(167,139,250,0.14), transparent 60%), #0f0f12" }}
            >
              <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-atlas-purple">
                Where to start
              </div>
              <h2 className="font-display m-0 text-xl font-bold">
                The Execution Quality Scorecard
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-atlas-gray">
                A complimentary, backward-looking analysis on a slice of the
                desk&rsquo;s own production fills, returned within 48 hours. No
                integration, no procurement, no commitment. Four things agreed
                before the file moves: a named sponsor, production fills, a
                booked readout, and a threshold stated in advance, so the
                readout is a decision meeting rather than a presentation. One
                Scorecard per firm.
              </p>
              <Link href="/#demo" className="mt-4 inline-block rounded-lg bg-atlas-purple px-5 py-2.5 text-sm font-bold text-[#09090b] no-underline transition-opacity hover:opacity-90">
                Request a Scorecard
              </Link>
            </div>
          </section>

          {/* what it does not do */}
          <section className="mb-14 rounded-[14px] border border-atlas-border bg-atlas-card px-7 py-6">
            <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-atlas-gray-dark">
              What Atlas does not do
            </div>
            <p className="m-0 text-[14px] leading-relaxed text-atlas-offwhite">
              No routing, no execution, no order flow, no custody. Atlas is
              agency-only, takes no venue rebates, and runs no proprietary
              book, so the measurement layer has no economic interest in which
              venue a fill lands on. That is the condition for the measurement
              to carry weight with an investment committee, an allocator, or a
              compliance function.
            </p>
          </section>

          {/* CTA */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-[14px] border border-atlas-border bg-atlas-card px-7 py-6">
            <div>
              <div className="font-display text-lg font-bold">
                Own the scorecard on your own flow.
              </div>
              <div className="mt-1 text-[13px] text-atlas-gray">
                Send a fill file, get a readout in 48 hours. Keep the system you run.
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/#demo" className="rounded-lg bg-atlas-accent px-5 py-2.5 text-sm font-bold text-white no-underline transition-all hover:bg-atlas-accent-light">
                Book a demo
              </Link>
              <Link href="/atlas-infrastructure" className="rounded-lg border border-atlas-border px-5 py-2.5 text-sm font-semibold text-atlas-offwhite no-underline transition-all hover:border-atlas-accent/40">
                Running a platform? Atlas Infrastructure →
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
