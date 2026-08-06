import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ProductShot } from "@/components/ProductShot";
import { SectionLabel } from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Atlas DESK — Sell-Side Broker OMS/EMS | Atlas Digital Trading",
  description:
    "The broker platform for crypto desks and OTC dealers: low-touch/high-touch rules engine, principal and agency workflows, internal crossing, inventory auto-hedging, and per-client pricing — running today.",
  alternates: { canonical: "/atlas-desk" },
  openGraph: {
    images: [{ url: "/og/og-atlas-desk.png", width: 1200, height: 630 }],
    title: "Atlas DESK — Sell-Side Broker OMS/EMS | Atlas Digital Trading",
  },
  twitter: { card: "summary_large_image", images: ["/og/og-atlas-desk.png"] },
};

const PILLARS = [
  {
    t: "Rules engine at the core",
    d: "In-policy client flow auto-executes at streamed, tiered prices. Above-threshold orders hold for the desk. Low-touch by default, high-touch when it matters.",
  },
  {
    t: "Net, cross, cover",
    d: "Opposing client flow crosses internally — two commissioned trades, not one net entry — and only the residual is covered in the market, on the broker's own keys.",
  },
  {
    t: "Inventory that hedges itself",
    d: "Per-symbol bands with OFF / MANUAL / AUTO modes. Breach the band and the desk auto-hedges — with a kill-switch that halts everything in one click.",
  },
  {
    t: "Your clients, your pricing",
    d: "Per-client markup and commission with size-tier ladders, prefunded ledgers, entitlements, and a treasury view of venue funding.",
  },
];

export default function AtlasDeskPage() {
  return (
    <div className="min-h-screen bg-atlas-bg text-atlas-white">
      <NavBar />
      <main className="px-[clamp(16px,4vw,56px)] pb-16 pt-32">
        <div className="mx-auto max-w-[1100px]">
          {/* hero */}
          <div className="mb-10 max-w-[820px]">
            <SectionLabel>Atlas DESK · Sell-Side Broker OMS/EMS</SectionLabel>
            <h1 className="font-display m-0 text-[clamp(30px,4.5vw,50px)] font-extrabold leading-[1.08] tracking-tight">
              Run the desk.
              <br />
              <span className="text-atlas-accent">Keep the spread.</span>
            </h1>
            <p className="mb-0 mt-5 max-w-[640px] text-[15.5px] leading-relaxed text-atlas-gray">
              For crypto brokers and OTC desks: one workbench that takes client
              flow from quote to cover — rules engine, blotter, netting,
              inventory, treasury — deployed per broker, on your own
              infrastructure, with your clients as tenants. This is the working
              software, not a mock-up.
            </p>
          </div>

          {/* the workbench, full */}
          <section className="mb-14">
            <ProductShot
              src="/screenshots/v2/desk-hero.png"
              alt="Atlas DESK workbench: held-order queue, central blotter, consolidated book, desk P&L, inventory, netting"
              caption="The desk workbench — held queue, all-client blotter, consolidated book, P&L, street book, inventory bands, netting"
              priority
            />
          </section>

          {/* pillars */}
          <section className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => (
              <div key={p.t} className="rounded-[14px] border border-atlas-border bg-atlas-card p-5">
                <h3 className="font-display m-0 mb-2 text-[15px] font-bold">{p.t}</h3>
                <p className="m-0 text-[12.5px] leading-relaxed text-atlas-gray">{p.d}</p>
              </div>
            ))}
          </section>

          {/* drawer economics */}
          <section className="mb-14 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_1.15fr]">
            <div>
              <h2 className="font-display m-0 text-2xl font-bold">
                Every order, both legs, full economics
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-atlas-gray">
                Click any order and the drawer shows the whole story: the client
                leg with quoted price, markup, commission and the rule decision
                that executed it — and the cover leg with per-venue child fills
                and the captured spread. Principal book-at-quote or agency
                work-the-order, the economics are always explicit.
              </p>
              <ul className="mt-4 flex flex-col gap-2 text-[13.5px] text-atlas-offwhite">
                {[
                  "Client leg: quote, markup bps, commission, rule decision",
                  "Cover leg: venue fills, average price, one-click cover",
                  "Captured spread computed per order — your P&L, itemized",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded bg-[rgba(6,182,212,0.14)] text-[10px] font-bold text-atlas-cyan">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <ProductShot
              src="/screenshots/v2/desk-drawer.png"
              alt="Atlas DESK order drawer: client leg with markup and commission, cover leg with cover-in-market action"
              caption="The order drawer — client leg economics and the cover leg, one click from covered"
            />
          </section>

          {/* admin console */}
          <section className="mb-14 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.15fr_1fr]">
            <ProductShot
              src="/screenshots/v2/desk-admin.png"
              alt="Atlas DESK broker admin: system health, client onboarding, kill switch, hedge bands, venue funding treasury"
              caption="The broker console — onboard a client in one form, set hedge bands, fund venues, and the kill-switch"
            />
            <div>
              <h2 className="font-display m-0 text-2xl font-bold">
                You are the operator
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-atlas-gray">
                Atlas DESK deploys per broker — your instance, your keys, your
                clients. Onboard a client firm in one form with default pricing.
                Set the hold-above threshold, hedge bands, and per-client
                markups. Watch every service on one health board. And when you
                need everything to stop: one kill-switch.
              </p>
              <ul className="mt-4 flex flex-col gap-2 text-[13.5px] text-atlas-offwhite">
                {[
                  "Per-broker deployment — no shared tenancy, ever",
                  "Client onboarding, entitlements, prefunded ledgers",
                  "Treasury: venue funding with min/top-up automation",
                  "Full audit trail on every desk action",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded bg-[rgba(6,182,212,0.14)] text-[10px] font-bold text-atlas-cyan">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* network tie */}
          <section className="mb-14 rounded-[14px] border border-atlas-cyan/30 p-8"
            style={{ background: "radial-gradient(70% 130% at 50% 0%, rgba(6,182,212,0.10), transparent 60%), #0f0f12" }}>
            <h2 className="font-display m-0 text-2xl font-bold">
              Plugged into the buy side
            </h2>
            <p className="mt-3 max-w-[760px] text-[14px] leading-relaxed text-atlas-gray">
              Funds running AtlasX can route orders directly to your desk —
              they appear in your blotter tagged ATLASX, priced by your rules,
              covered by your workflow. Two products, both sides of the trade,
              one engine:{" "}
              <Link href="/#network" className="text-atlas-accent no-underline hover:underline">
                see how the network works
              </Link>
              .
            </p>
          </section>

          {/* CTA */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-[14px] border border-atlas-border bg-atlas-card px-7 py-6">
            <div>
              <div className="font-display text-lg font-bold">
                First broker POCs are onboarding now.
              </div>
              <div className="mt-1 text-[13px] text-atlas-gray">
                A working desk in a day on your infrastructure — bring your
                venue keys and a client list.
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/#demo" className="rounded-lg bg-atlas-accent px-5 py-2.5 text-sm font-bold text-white no-underline transition-all hover:bg-atlas-accent-light">
                Book a demo
              </Link>
              <Link href="/atlasx" className="rounded-lg border border-atlas-border px-5 py-2.5 text-sm font-semibold text-atlas-offwhite no-underline transition-all hover:border-atlas-accent/40">
                Buy side? AtlasX →
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
