"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  OrdersScreenMock,
  PostTradeTCAMock,
  PreTradeScreenMock,
  TradingScreenMock,
  VenueAnalyticsMock,
} from "./platform-mocks";
import { SectionHeading } from "./SectionHeading";
import { SectionLabel } from "./SectionLabel";
import { TopOfBook } from "./TopOfBook";

const tabs = [
  {
    label: "Pre-Trade Analytics",
    desc: "Comprehensive pre-trade cost estimation powered by Almgren-Chriss impact models. Analyze spread, temporary impact, book depth walk, timing risk, and opportunity cost — broken down by basis points and USD. Includes per-venue 24h volume data and illustrative execution schedules for TWAP orders.",
    features: [
      "Almgren-Chriss cost decomposition",
      "Per-venue volume & ADV analysis",
      "Trade difficulty assessment",
      "Illustrative execution schedule",
      "Multi-venue constraint selection",
    ],
    image: "/screenshots/pre-trade.png",
  },
  {
    label: "Trading",
    desc: "Multi-venue price charts with real-time data from Binance, Coinbase, Kraken, OKX and more. Consolidated order book (CLOB) aggregates liquidity across all venues. Smart Order Router with Aggressive, Passive, and Neutral execution modes. Full order ticket with market, limit, and stop-limit order types.",
    features: [
      "Multi-venue price charts & order books",
      "Consolidated Limit Order Book (CLOB)",
      "Smart Order Router (SOR) with 3 execution modes",
      "Real-time trade history across all venues",
      "Standard & TWAP execution strategies",
    ],
    image: "/screenshots/trading.png",
  },

  {
    label: "Consolidated Order Book",
    desc: "Atlas aggregates order book depth from every connected exchange into a single consolidated view, so you're always trading against the full market — not one venue's slice of it. Smart Order Routing works the consolidated book in real time, and every fill is benchmarked against it at the moment of execution.",
    features: [
      "Aggregated depth across all connected venues",
      "Live top-of-book across Binance, Coinbase, Kraken & more",
      "Smart Order Routing against the full market",
      "Fills benchmarked to the consolidated book, not one quote",
      "Real, executable liquidity — not displayed depth",
    ],
    image: "",
  },

  {
    label: "Post-Trade TCA",
    desc: "Post-trade Transaction Cost Analysis with implementation shortfall decomposition, strategy comparison (Direct vs SOR vs TWAP), venue volume mix visualization, and slippage benchmarking. Drill into order-level detail with full execution audit trails.",
    features: [
      "Strategy comparison (Direct / SOR / TWAP)",
      "Venue volume breakdown with drill-down",
      "Slippage comparison charts (bps)",
      "VWAP slippage benchmarking",
      "Exchange-level execution detail",
    ],
    image: "/screenshots/post-trade-tca.png",
  },
  {
    label: "Orders & Execution",
    desc: "Complete order lifecycle management with real-time fill tracking, parent/child order relationships, multi-exchange execution detail, and full audit trail. View trades, closed orders, balances, positions, and cancelled orders in one unified blotter.",
    features: [
      "Real-time fill tracking across venues",
      "Parent/child order relationships",
      "Multi-exchange execution routing",
      "Full order lifecycle audit trail",
      "Trade history with venue attribution",
    ],
    image: "/screenshots/orders.png",
  },
  {
    label: "Venue Analytics",
    desc: "Post-trade venue analysis showing volume distribution across exchanges, per-instrument execution metrics, and average price comparisons. Understand where your liquidity is sourced and optimize venue selection for future trades.",
    features: [
      "Volume distribution by venue",
      "Per-instrument execution metrics",
      "Average price comparison by exchange",
      "Venue selection optimization data",
      "Time-filtered analysis (7d/30d/MTD/YTD)",
    ],
    image: "/screenshots/venue-analytics.png",
  },
  {
    label: "Portfolio",
    desc: "Unified portfolio view across all venues and instruments. Track balances, positions, and PnL in real time with a consolidated NAV, exposure breakdowns, and venue-level allocation. Drill into individual holdings to understand cost basis, realized vs. unrealized PnL, and concentration risk.",
    features: [
      "Consolidated NAV across all venues",
      "Real-time positions & PnL tracking",
      "Exposure & concentration breakdowns",
      "Cost basis with realized / unrealized PnL",
      "Venue-level allocation & balance detail",
    ],
    image: [
      "/screenshots/portfolio-1.png",
      "/screenshots/portfolio-2.png",
      "/screenshots/portfolio-3.png",
    ],
  },
  {
    label: "Margin",
    desc: "Real-time margin and collateral monitoring across all venues. Track initial and maintenance margin, available buying power, leverage, and liquidation thresholds in one unified view. Stress-test positions against price moves and surface concentration or cross-venue funding risk before it becomes a problem.",
    features: [
      "Initial & maintenance margin by venue",
      "Buying power & leverage utilization",
      "Liquidation price & risk thresholds",
      "Scenario / stress-test analysis",
      "Cross-venue collateral & funding view",
    ],
    image: [
      "/screenshots/margin-1.png",
      "/screenshots/margin-2.png",
      "/screenshots/margin-3.png",
      "/screenshots/margin-4.png",
    ],
  },
];

const captions = [
  "Pre-Trade analytics — cost estimation with execution schedule",
  "Trading view — multi-venue charts, order books, CLOB, order ticket, trade history",
  "Consolidated Order Book — live top-of-book aggregated across venues",
  "Post-Trade TCA — strategy comparison, venue mix, slippage",
  "Orders & Executions — fill tracking, multi-exchange routing",
  "Exchange Information — venue volume, per-instrument detail",
  "Portfolio — consolidated NAV, positions, PnL, and venue allocation",
  "Margin — initial/maintenance margin, leverage, liquidation, stress-tests",
];

const MOCKS = [
  PreTradeScreenMock,
  TradingScreenMock,
  null, // Consolidated Order Book renders the live TopOfBook widget, not a screenshot
  PostTradeTCAMock,
  OrdersScreenMock,
  VenueAnalyticsMock,
  null,
  null,
];

const NAV = [
  "Account",
  "Pre-Trade",
  "Trading",
  "Post-Trade",
  "Portfolio",
  "Margin",
  "Allocation",
];

function PlatformVisual({ activeTab }: { activeTab: number }) {
  const [useMock, setUseMock] = useState(false);
  const tab = tabs[activeTab];
  const Mock = MOCKS[activeTab];
  const images = Array.isArray(tab.image) ? tab.image : [tab.image];

  // The Consolidated Order Book tab shows the live top-of-book widget rather
  // than a static screenshot.
  if (tab.label === "Consolidated Order Book") {
    return (
      <div className="relative min-h-[320px] overflow-hidden rounded-lg border border-atlas-border bg-atlas-bg p-6">
        <TopOfBook />
      </div>
    );
  }

  return (
    <div className="relative min-h-[320px] overflow-hidden rounded-lg border border-atlas-border bg-atlas-bg p-6">
      {useMock && Mock ? (
        <Mock />
      ) : (
        <div className="flex flex-col gap-4">
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={captions[activeTab]}
              width={1200}
              height={720}
              unoptimized
              className="h-auto w-full rounded-md object-contain object-top"
              priority={activeTab === 0 && i === 0}
              onError={() => Mock && setUseMock(true)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Platform() {
  const [activeTab, setActiveTab] = useState(0);
  // Auto-advance the highlighted tab while the section is on screen, so a
  // visitor sees the full trade lifecycle without interacting. A manual tab
  // click ends the auto-tour for the rest of the session — we never fight the
  // user's own selection.
  const sectionRef = useRef<HTMLElement>(null);
  const [autoPlay, setAutoPlay] = useState(true);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!autoPlay || !inView) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;
    const id = window.setInterval(() => {
      setActiveTab((t) => (t + 1) % tabs.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, [autoPlay, inView]);

  function selectTab(i: number) {
    setAutoPlay(false);
    setActiveTab(i);
  }

  return (
    <section
      ref={sectionRef}
      id="platform"
      className="px-[clamp(16px,4vw,56px)] py-[100px]"
      style={{ background: "#09090b" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionLabel>The Platform</SectionLabel>
        <SectionHeading>
          One platform for the
          <br />
          entire trade lifecycle
        </SectionHeading>

        <div className="mb-9 mt-10 flex w-full max-w-full flex-wrap gap-0.5 rounded-lg border border-atlas-border bg-atlas-card/80 p-0.5 sm:w-fit">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              type="button"
              onClick={() => selectTab(i)}
              className={`rounded-md px-[18px] py-2 text-[13px] font-semibold transition-all whitespace-nowrap ${
                activeTab === i
                  ? "border border-atlas-accent/30 bg-[rgba(59,130,246,0.12)] text-atlas-accent"
                  : "border border-transparent text-atlas-gray-dark hover:text-atlas-gray"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h3 className="font-display mb-3.5 text-[26px] font-bold tracking-tight text-atlas-white">
              {tabs[activeTab].label}
            </h3>
            <p className="mb-7 text-[15px] leading-relaxed text-atlas-gray">
              {tabs[activeTab].desc}
            </p>
            <div className="flex flex-col gap-2.5">
              {tabs[activeTab].features.map((f) => (
                <div
                  key={f}
                  className="flex items-start gap-2.5 text-sm text-atlas-offwhite"
                >
                  <span className="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded bg-[rgba(59,130,246,0.12)] text-[10px] font-bold text-atlas-accent">
                    ✓
                  </span>
                  {f}
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-[14px] border border-atlas-border p-4 shadow-[0_16px_50px_rgba(0,0,0,0.4),0_0_60px_rgba(59,130,246,0.25)]"
            style={{
              background: "linear-gradient(135deg, #18181b 0%, #09090b 100%)",
            }}
          >
            <div className="mb-2.5 flex items-center justify-between rounded-md bg-[rgba(59,130,246,0.08)] px-2.5 py-1.5">
              <span className="text-[11px] font-bold text-atlas-accent">
                Atlas EMS
              </span>
              <div className="flex flex-wrap gap-1">
                {NAV.map((t, i) => {
                  // NAV pills: 1=Pre-Trade, 2=Trading, 3=Post-Trade, 4=Portfolio, 5=Margin.
                  // tabs order: 0 Pre-Trade, 1 Trading, 2 Consolidated Order Book,
                  // 3 Post-Trade, 4 Orders, 5 Venue Analytics, 6 Portfolio, 7 Margin.
                  const isActive =
                    (activeTab === 0 && i === 1) ||
                    (activeTab >= 1 && activeTab <= 2 && i === 2) ||
                    (activeTab >= 3 && activeTab <= 5 && i === 3) ||
                    (activeTab === 6 && i === 4) ||
                    (activeTab === 7 && i === 5);
                  return (
                    <span
                      key={t}
                      className={`rounded px-2 py-0.5 text-[8px] font-semibold ${
                        isActive
                          ? "bg-atlas-accent text-white"
                          : `border border-atlas-border text-atlas-gray-dark`
                      }`}
                    >
                      {t}
                    </span>
                  );
                })}
              </div>
            </div>

            <PlatformVisual key={activeTab} activeTab={activeTab} />

            <p className="mt-2.5 text-center text-[10px] italic text-atlas-gray-darker">
              {captions[activeTab]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
