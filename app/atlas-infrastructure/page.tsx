import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { TickerStrip } from "@/components/TickerStrip";
import { Footer } from "@/components/Footer";
import { SectionLabel } from "@/components/SectionLabel";
import { OptionADiagram, OptionBDiagram } from "@/components/InfraDiagram";

export const metadata: Metadata = {
  title: "Atlas Infrastructure — White-Label Digital-Asset Execution | Atlas Digital Trading",
  description:
    "Add digital assets to your trading platform, OMS/EMS, or brokerage without building the stack: white-labelled, non-custodial execution over FIX 4.4 or REST, or Atlas engines deployed beneath your OMS. Execution reports, drop-copy and position feeds into your own risk layer.",
  alternates: { canonical: "/atlas-infrastructure" },
  openGraph: {
    images: [{ url: "/og/og-atlas-infrastructure-v2.png", width: 1200, height: 630 }],
    title: "Atlas Infrastructure — White-Label Digital-Asset Execution | Atlas Digital Trading",
  },
  twitter: { card: "summary_large_image", images: ["/og/og-atlas-infrastructure-v2.png"] },
};

const GREEN = "#22c55e";

const PILLARS = [
  {
    t: "Digital assets inside your front ends",
    d: "Your clients trade crypto in the applications they already use. No second platform, no separate login, no order flow walking out the door to a crypto-native competitor.",
  },
  {
    t: "Your risk layer, activated",
    d: "Drop-copy and position feeds give your existing risk and margin systems a native digital-asset execution source, in the same risk view as everything else your clients trade.",
  },
  {
    t: "Execution intelligence on every order",
    d: "Pre-trade cost forecasts and post-trade TCA on every order routed through Atlas: the measurement layer institutional clients, allocators, and regulators increasingly expect.",
  },
  {
    t: "Your brand, your clients, no custody",
    d: "White-label by design; you own the client relationship and the pricing. Atlas is pure agency: assets remain with the client's own venue and custody relationships at all times.",
  },
];

const COMPARE: [string, string, string][] = [
  ["Where the engine runs", "Atlas-hosted, outside the partner perimeter", "Deployed inside the partner's environment, no outbound egress required"],
  ["Order path", "Partner OMS sends digital-asset orders to Atlas over FIX 4.4 or REST; Atlas executes and reports back", "Partner OMS calls the Atlas engine for routing and algorithm decisions; the OMS keeps the order and its own exchange managers"],
  ["Venue connectivity", "Atlas's own connectivity to 16+ digital-asset venues", "The partner's exchange managers; Atlas supplies digital-asset connectivity where the partner has none"],
  ["Measurement", "Pre-trade cost and post-trade TCA on orders routed through Atlas", "A separate TCA engine measuring the OMS's full order history, every asset class it carries, rendered in the partner's own portal"],
  ["Time to first order", "Certification sandbox to production enablement; weeks, not quarters", "A joint engineering track with a shared roadmap; sequenced by product area"],
  ["Best for", "Platforms adding digital assets with minimal change to the existing stack", "Multi-asset platforms making Atlas the execution and measurement brain of their OMS"],
];

const PATH = [
  {
    t: "Scoped technical session",
    d: "Architecture, integration surfaces, and segment demand, worked through with your product and engineering leads. Not a sales demo. The session settles which option fits.",
  },
  {
    t: "Certification sandbox or pilot",
    d: "Option A: your test OMS session certified against the Atlas FIX 4.4 acceptor, routing to live books on simulation venues, with execution reports, drop-copy, and a position feed into your risk system. Option B: the TCA engine on a slice of your own order history, then the execution engine.",
  },
  {
    t: "Production enablement",
    d: "Live rollout with a named first client and an agreed segment, then expansion across your client base on your commercial terms.",
  },
];

export default function AtlasInfrastructurePage() {
  return (
    <div className="min-h-screen bg-atlas-bg text-atlas-white">
      <NavBar />
      <div className="mt-[68px] sticky top-[68px] z-[999]">
        <TickerStrip />
      </div>
      <main className="px-[clamp(16px,4vw,56px)] pb-16 pt-12">
        <div className="mx-auto max-w-[1180px]">
          {/* hero */}
          <div className="mb-12 max-w-[820px]">
            <SectionLabel>Atlas Infrastructure · Powered by Atlas · For Trading Platforms and Vendors</SectionLabel>
            <h1 className="font-display m-0 text-[clamp(30px,4.5vw,50px)] font-extrabold leading-[1.08] tracking-tight">
              Add digital assets.
              <br />
              <span style={{ color: GREEN }}>Keep your platform.</span>
            </h1>
            <p className="mb-0 mt-5 max-w-[700px] text-[15.5px] leading-relaxed text-atlas-gray">
              Within the past year, Interactive Brokers, Morgan Stanley, and
              Schwab all switched on embedded crypto trading, and platforms that
              cannot offer digital assets are watching order flow route around
              them. Building the capability in-house means venue connectivity,
              a market-data plant, routing, algorithms, analytics, and 24/7
              operations: a multi-year build a long way from your core product.
              Atlas Infrastructure delivers it as infrastructure: your platform
              stays as it is, white-labelled under your brand, and Atlas
              becomes the execution destination for one more asset class,
              non-custodial end to end.
            </p>
          </div>

          {/* pillars */}
          <section className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => (
              <div key={p.t} className="rounded-[14px] border border-atlas-border bg-atlas-card p-5">
                <h3 className="font-display m-0 mb-2 text-[15px] font-bold">{p.t}</h3>
                <p className="m-0 text-[12.5px] leading-relaxed text-atlas-gray">{p.d}</p>
              </div>
            ))}
          </section>

          {/* integration models */}
          <section className="mb-14">
            <div className="mb-6 max-w-[820px]">
              <SectionLabel>Two integration models</SectionLabel>
              <h2 className="font-display m-0 text-2xl font-bold">
                Loosely coupled or tightly coupled, chosen by your architecture
              </h2>
              <p className="mb-0 mt-3 text-[14px] leading-relaxed text-atlas-gray">
                Option A adds Atlas as an external execution destination over
                standard protocols and leaves the partner stack untouched.
                Option B deploys the Atlas engines inside the partner&rsquo;s
                environment, beneath the OMS, so the platform&rsquo;s own
                routing, algorithm, and measurement decisions run on Atlas.
              </p>
            </div>

            <div className="flex flex-col gap-10">
              {/* Option A */}
              <div>
                <div className="mb-4 max-w-[820px]">
                  <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: GREEN }}>
                    Option A · Loosely coupled
                  </div>
                  <h3 className="font-display m-0 text-[20px] font-bold">
                    Atlas as an execution destination over FIX 4.4
                  </h3>
                  <p className="mb-0 mt-2 text-[13.5px] leading-relaxed text-atlas-gray">
                    The partner stack is unchanged. The OMS sends digital-asset
                    orders to the Atlas-hosted engine over FIX 4.4 or REST; Atlas
                    routes to its own venue connectivity; execution reports,
                    drop-copy, and position feeds return to the partner&rsquo;s
                    OMS and risk layer. Fastest path to a first order.
                  </p>
                </div>
                <OptionADiagram />
              </div>

              {/* Option B */}
              <div>
                <div className="mb-4 max-w-[820px]">
                  <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: GREEN }}>
                    Option B · Tightly coupled
                  </div>
                  <h3 className="font-display m-0 text-[20px] font-bold">
                    Atlas engines deployed inside your environment, beneath the OMS
                  </h3>
                  <p className="mb-0 mt-2 text-[13.5px] leading-relaxed text-atlas-gray">
                    The Atlas execution engine and TCA engine run inside the
                    partner&rsquo;s environment. The OMS delegates routing and
                    algorithm decisions over one bidirectional link and keeps its
                    own exchange managers; the TCA engine measures the
                    OMS&rsquo;s own order history from a scheduled warehouse
                    extract and serves results over REST into the partner&rsquo;s
                    portal.
                  </p>
                </div>
                <OptionBDiagram />
              </div>
            </div>

            {/* comparison table */}
            <div className="mt-10 overflow-x-auto rounded-[14px] border border-atlas-border bg-atlas-card">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-atlas-border">
                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-atlas-gray-dark"></th>
                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: GREEN }}>Option A · Loosely coupled</th>
                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: GREEN }}>Option B · Tightly coupled</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map(([k, a, b]) => (
                    <tr key={k} className="border-b border-atlas-border/60 align-top last:border-b-0">
                      <td className="px-5 py-3 text-[12.5px] font-semibold text-atlas-white">{k}</td>
                      <td className="px-5 py-3 text-[12.5px] leading-relaxed text-atlas-gray">{a}</td>
                      <td className="px-5 py-3 text-[12.5px] leading-relaxed text-atlas-gray">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* integration path */}
          <section className="mb-14">
            <div className="mb-6">
              <SectionLabel>The integration path</SectionLabel>
              <h2 className="font-display m-0 text-2xl font-bold">Three steps to a named first client</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {PATH.map((p, i) => (
                <div key={p.t} className="rounded-[14px] border border-atlas-border bg-atlas-card p-5">
                  <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-md text-[12px] font-bold" style={{ background: "rgba(34,197,94,0.12)", color: GREEN }}>
                    {i + 1}
                  </div>
                  <h3 className="font-display m-0 mb-2 text-[15px] font-bold">{p.t}</h3>
                  <p className="m-0 text-[12.5px] leading-relaxed text-atlas-gray">{p.d}</p>
                </div>
              ))}
            </div>
            <p className="mb-0 mt-5 text-[13px] leading-relaxed text-atlas-gray">
              <span className="font-semibold text-atlas-offwhite">Commercial structure:</span>{" "}
              no development charge in either direction; a revenue share on
              enabled clients with a per-client floor; the partner owns the
              client relationship and the pricing. Terms scoped per partnership
              against the first client readout.
            </p>
          </section>

          {/* CTA */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-[14px] border border-atlas-border bg-atlas-card px-7 py-6">
            <div>
              <div className="font-display text-lg font-bold">
                Start with a scoped technical session.
              </div>
              <div className="mt-1 text-[13px] text-atlas-gray">
                Bring your product and engineering leads. We bring the working engine.
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/#demo" className="rounded-lg bg-atlas-accent px-5 py-2.5 text-sm font-bold text-white no-underline transition-all hover:bg-atlas-accent-light">
                Request a session
              </Link>
              <Link href="/atlas-tca" className="rounded-lg border border-atlas-border px-5 py-2.5 text-sm font-semibold text-atlas-offwhite no-underline transition-all hover:border-atlas-accent/40">
                Measurement only? Atlas TCA →
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
