"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Compact homepage strip for the live Intelligence page: three headline reads
// from panel_v1.json and a link through to /intelligence.
const PANEL_URL =
  "https://atlasdigitaltrading-panel.s3.ap-northeast-1.amazonaws.com/public/panel_v1.json";

type Read = {
  label: string;
  buyShare: number | null;
  mk60: number | null;
  bidShare: number | null;
  asOf: string | null;
};

export function IntelligenceTeaser() {
  const [read, setRead] = useState<Read | null>(null);

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch(PANEL_URL)
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (!alive || !d || d.schema !== "panel_v1") return;
          const btc = d.products?.["BTC-USD"] ?? {};
          setRead({
            label: btc.flow?.label ?? "—",
            buyShare: btc.flow?.buy_share_pct ?? null,
            mk60: btc.markout?.mk60s_notional_wtd_bps ?? null,
            bidShare: btc.book?.bid_share_25_pct ?? null,
            asOf: d.as_of_ms
              ? new Date(d.as_of_ms).toLocaleTimeString("en-US", {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "UTC",
                }) + " UTC"
              : null,
          });
        })
        .catch(() => {});
    load();
    const t = setInterval(load, 60_000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  const tone =
    read?.label === "BUYERS"
      ? "text-atlas-green"
      : read?.label === "SELLERS"
        ? "text-atlas-red"
        : "text-atlas-gray";

  return (
    <section className="px-[clamp(16px,4vw,56px)] py-[60px]" style={{ background: "#09090b" }}>
      <Link
        href="/intelligence"
        className="group mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-8 gap-y-4 rounded-[14px] border border-atlas-border bg-atlas-card px-7 py-6 no-underline transition-all hover:-translate-y-0.5 hover:border-atlas-accent/40"
      >
        <div className="min-w-[220px]">
          <div className="mb-1 text-xs font-bold uppercase tracking-[0.12em] text-atlas-accent">
            Live Market Intelligence
          </div>
          <div className="font-display text-lg font-bold text-atlas-white">
            The tape, read properly
          </div>
          {read?.asOf ? (
            <div className="mt-1 text-[11px] tabular-nums text-atlas-gray-dark">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-atlas-pulse rounded-full bg-atlas-green align-middle" />
              as of {read.asOf}
            </div>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-atlas-gray-dark">
              BTC taker flow
            </div>
            <div className={`text-base font-bold tabular-nums ${tone}`}>
              {read ? `${read.label}${read.buyShare != null ? ` · ${read.buyShare.toFixed(1)}%` : ""}` : "…"}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-atlas-gray-dark">
              +60s markout
            </div>
            <div className="text-base font-bold tabular-nums text-atlas-white">
              {read?.mk60 != null ? `${read.mk60 > 0 ? "+" : ""}${read.mk60.toFixed(2)} bps` : "…"}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-atlas-gray-dark">
              Book bid share ±25bps
            </div>
            <div className="text-base font-bold tabular-nums text-atlas-white">
              {read?.bidShare != null ? `${read.bidShare}%` : "…"}
            </div>
          </div>
          <span className="text-sm font-semibold text-atlas-accent transition-transform group-hover:translate-x-0.5">
            View live intelligence →
          </span>
        </div>
      </Link>
    </section>
  );
}
