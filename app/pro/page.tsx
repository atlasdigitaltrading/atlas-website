import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Subscribe } from "@/components/Subscribe";
import { SectionLabel } from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Atlas Pro — Waitlist | Atlas Digital Trading",
  description:
    "Atlas Pro brings institutional-grade execution to professional and sophisticated traders — built on the same engine as AtlasX. Join the waitlist.",
  alternates: { canonical: "/pro" },
  openGraph: {
    images: [{ url: "/og/og-pro.png", width: 1200, height: 630 }],
    title: "Atlas Pro — Waitlist | Atlas Digital Trading",
  },
  twitter: { card: "summary_large_image", images: ["/og/og-pro.png"] },
};

const POINTS = [
  {
    t: "The institutional engine, your seat",
    d: "The same smart order routing, execution algorithms, and pre/post-trade analytics that power AtlasX for institutions — in a platform built for professional traders.",
  },
  {
    t: "Execution intelligence, not just charts",
    d: "Verified taker flow, per-venue markout, and book absorption — the live measurement stack behind our Intelligence feed, wired into how you trade.",
  },
  {
    t: "Costs that get measured, then get smaller",
    d: "Every order analyzed before and after: what it should cost, what it did cost, and where the difference came from.",
  },
];

export default function ProWaitlistPage() {
  return (
    <div className="min-h-screen bg-atlas-bg text-atlas-white">
      <NavBar />
      <main className="px-[clamp(16px,4vw,56px)] pb-10 pt-32">
        <div className="mx-auto max-w-[880px] text-center">
          <SectionLabel>Atlas Pro</SectionLabel>
          <div className="mb-5 mt-1 inline-flex items-center gap-2 rounded-full border border-atlas-orange/40 bg-atlas-orange/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-atlas-orange">
            <span className="h-1.5 w-1.5 rounded-full bg-atlas-orange" />
            In development — launching later this year
          </div>
          <h1 className="font-display m-0 text-[clamp(30px,4.5vw,52px)] font-extrabold leading-[1.08] tracking-tight text-atlas-white">
            Institutional execution,
            <br />
            for <span className="text-atlas-accent">professional traders</span>
          </h1>
          <p className="mx-auto mb-0 mt-5 max-w-[620px] text-[clamp(14px,1.3vw,17px)] leading-relaxed text-atlas-gray">
            Atlas Pro is the advanced surface of the Atlas platform. Built on
            the same execution engine institutions use, opened to professional
            and sophisticated traders.
          </p>
          <a
            href="#waitlist"
            className="mt-7 inline-block rounded-lg bg-atlas-accent px-7 py-3 text-[15px] font-bold text-white no-underline shadow-[0_0_28px_rgba(59,130,246,0.3)] transition-all hover:bg-atlas-accent-light"
          >
            Join the waitlist
          </a>
        </div>
        <div className="mx-auto mt-14 grid max-w-[1000px] grid-cols-1 gap-5 md:grid-cols-3">
          {POINTS.map((p) => (
            <div
              key={p.t}
              className="rounded-[14px] border border-atlas-border bg-atlas-card p-6"
            >
              <h3 className="font-display m-0 mb-2 text-[15px] font-bold text-atlas-white">
                {p.t}
              </h3>
              <p className="m-0 text-[13px] leading-relaxed text-atlas-gray">
                {p.d}
              </p>
            </div>
          ))}
        </div>
        <p className="mx-auto mb-0 mt-10 max-w-[620px] text-center text-xs text-atlas-gray-darker">
          In the meantime, the live read is free for everyone —{" "}
          <a href="/intelligence" className="text-atlas-accent no-underline hover:underline">
            see today&rsquo;s Market Intelligence
          </a>
          .
        </p>
      </main>
      <div id="waitlist">
        <Subscribe variant="pro" />
      </div>
      <Footer />
    </div>
  );
}
