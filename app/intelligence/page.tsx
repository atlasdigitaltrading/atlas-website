import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { TickerStrip } from "@/components/TickerStrip";
import { MarketMap } from "@/components/MarketMap";
import { Intelligence } from "@/components/Intelligence";
import { Subscribe } from "@/components/Subscribe";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionLabel } from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Live Market Intelligence | Atlas Digital Trading",
  description:
    "Live crypto microstructure across major venues: verified taker order flow, per-venue markout, and book absorption — derived from public exchange data. Context, not advice.",
  alternates: { canonical: "/intelligence" },
  openGraph: {
    images: [{ url: "/og/og-intelligence-v2.png", width: 1200, height: 630 }],
    title: "Live Market Intelligence | Atlas Digital Trading",
  },
  twitter: { card: "summary_large_image", images: ["/og/og-intelligence-v2.png"] },
};

export default function IntelligencePage() {
  return (
    <div className="min-h-screen bg-atlas-bg text-atlas-white">
      <NavBar />
      <div className="mt-[68px] sticky top-[68px] z-[999]">
        <TickerStrip />
      </div>
      <header className="px-[clamp(16px,4vw,56px)] pb-2 pt-14">
        <div className="mx-auto max-w-[1200px]">
          <SectionLabel>Market Intelligence</SectionLabel>
          <SectionHeading>The market, measured</SectionHeading>
          <p className="mb-0 mt-4 max-w-[720px] text-[15px] leading-relaxed text-atlas-gray">
            The live read across the venues Atlas captures — prices and market
            structure above, execution microstructure below. Everything on this
            page is derived from public exchange data and refreshes
            automatically.
          </p>
        </div>
      </header>
      <MarketMap />
      <Intelligence />
      <Subscribe />
      <Footer />
    </div>
  );
}
