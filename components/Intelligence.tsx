"use client";

import { useEffect, useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { SectionLabel } from "./SectionLabel";

// Live market-intelligence panel. Renders panel_v1.json, published every 15
// minutes from public exchange market data (taker side independently verified
// against each venue's own mid). Display-only: this repo holds no data
// pipeline — see the panel_v1 schema contract.
const PANEL_URL =
  "https://atlasdigitaltrading-panel.s3.ap-northeast-1.amazonaws.com/public/panel_v1.json";
const PRODUCTS = ["BTC-USD", "ETH-USD"] as const;

type FlowVenue = {
  venue: string;
  buy_pct: number;
  taker_usd_m: number | null;
  trades: number;
  spread_bps: number | null;
};
type MarkoutVenue = {
  venue: string;
  mk5s_bps: number | null;
  mk60s_bps: number | null;
  taker_usd_m: number | null;
};
type BookVenue = {
  venue: string;
  bid25_usd_m: number | null;
  ask25_usd_m: number | null;
  bid_share_25_pct: number | null;
};
type MomentumCoin = {
  product: string;
  last: number | null;
  chg_24h_pct: number | null;
  chg_1h_pct: number | null;
  chg_weekend_pct?: number;
};
type CarryRow = { venue: string; symbol: string; annualized_pct?: number; net_pct?: number };
type Carry = {
  lend: { label: string; apy_pct: number }[];
  staking: { label: string; apy_pct: number } | null;
  basis: { label: string; venue: string; annualized_pct: number }[];
  funding: CarryRow[];
  net_carry: CarryRow[];
  definition: string;
};
type Panel = {
  schema: string;
  as_of_ms: number;
  refresh_s: number;
  momentum?: { coins: MomentumCoin[] } | null;
  carry?: Carry | null;
  products: Record<
    string,
    {
      flow?: {
        window_min: number;
        label: string;
        buy_share_pct: number;
        buy_usd_m: number | null;
        sell_usd_m: number | null;
        venues: FlowVenue[];
      };
      markout?: {
        window_min: number;
        mk60s_notional_wtd_bps: number | null;
        mk60s_equal_wtd_bps: number | null;
        weightings_agree: boolean;
        venues: MarkoutVenue[];
      };
      book?: {
        bid25_total_usd_m: number | null;
        ask25_total_usd_m: number | null;
        bid_share_25_pct: number | null;
        venues: BookVenue[];
      };
    }
  >;
};

const fmtM = (v: number | null | undefined) =>
  v == null ? "—" : v >= 1000 ? `$${(v / 1000).toFixed(2)}B` : `$${v.toFixed(1)}M`;
const fmtBps = (v: number | null | undefined) =>
  v == null ? "—" : `${v > 0 ? "+" : ""}${v.toFixed(2)}`;

function labelTone(label: string) {
  if (label === "BUYERS")
    return "border-atlas-green/40 bg-atlas-green/15 text-atlas-green";
  if (label === "SELLERS")
    return "border-atlas-red/40 bg-atlas-red/15 text-atlas-red";
  return "border-atlas-border bg-atlas-card text-atlas-gray";
}

function StatTile({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "up" | "down";
}) {
  return (
    <div className="rounded-lg border border-atlas-border bg-atlas-bg/60 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-atlas-gray-dark">
        {label}
      </div>
      <div
        className={`mt-0.5 text-base font-bold tabular-nums ${
          tone === "up"
            ? "text-atlas-green"
            : tone === "down"
              ? "text-atlas-red"
              : "text-atlas-white"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function Card({
  title,
  badge,
  children,
  foot,
}: {
  title: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
  foot: string;
}) {
  return (
    <div className="flex flex-col rounded-[14px] border border-atlas-border bg-atlas-card p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="font-display m-0 text-[15px] font-bold text-atlas-white">
          {title}
        </h3>
        {badge}
      </div>
      {children}
      <p className="mb-0 mt-auto pt-3 text-[10.5px] leading-relaxed text-atlas-gray-darker">
        {foot}
      </p>
    </div>
  );
}

export function Intelligence() {
  const [panel, setPanel] = useState<Panel | null>(null);
  const [product, setProduct] =
    useState<(typeof PRODUCTS)[number]>("BTC-USD");
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch(PANEL_URL)
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (alive && d && d.schema === "panel_v1") setPanel(d);
        })
        .catch(() => {});
    load();
    const dataTimer = setInterval(load, 60_000);
    const clockTimer = setInterval(() => setNow(Date.now()), 30_000);
    return () => {
      alive = false;
      clearInterval(dataTimer);
      clearInterval(clockTimer);
    };
  }, []);

  const sect = panel?.products?.[product];
  const ageMin = panel ? Math.max(0, (now - panel.as_of_ms) / 60000) : null;
  const stale = ageMin != null && panel != null && ageMin > (panel.refresh_s / 60) * 2;
  const asOf = panel
    ? new Date(panel.as_of_ms).toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
      }) + " UTC"
    : null;

  return (
    <section
      id="intelligence"
      className="px-[clamp(16px,4vw,56px)] py-[100px]"
      style={{ background: "linear-gradient(180deg, #09090b 0%, #0f0f12 100%)" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel>Market Intelligence</SectionLabel>
            <SectionHeading>The tape, read properly</SectionHeading>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 rounded-lg border border-atlas-border bg-atlas-card p-1">
              {PRODUCTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setProduct(p)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                    product === p
                      ? "border border-atlas-accent/30 bg-[rgba(59,130,246,0.12)] text-atlas-accent"
                      : "border border-transparent text-atlas-gray-dark hover:text-atlas-gray"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            {asOf ? (
              <span className="text-[11px] tabular-nums text-atlas-gray-dark">
                {stale ? (
                  <span className="text-atlas-orange">updating… last {asOf}</span>
                ) : (
                  <>
                    <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-atlas-pulse rounded-full bg-atlas-green align-middle" />
                    as of {asOf}
                  </>
                )}
              </span>
            ) : null}
          </div>
        </div>
        <p className="mb-9 max-w-[720px] text-[14px] leading-relaxed text-atlas-gray">
          Live microstructure across the venues Atlas captures, derived from
          public exchange data — taker side independently verified against each
          venue&rsquo;s own mid. Descriptive of the tape. Context, not advice.
        </p>

        {panel?.momentum?.coins?.length ? (
          <div className="mb-5 flex flex-wrap gap-x-8 gap-y-2 rounded-xl border border-atlas-border bg-atlas-card px-5 py-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] leading-6 text-atlas-gray-dark">
              Momentum
            </span>
            {panel.momentum.coins.map((c) => (
              <span key={c.product} className="flex items-baseline gap-2 text-[13px]">
                <span className="font-semibold text-atlas-offwhite">
                  {c.product.replace("-USD", "")}
                </span>
                {c.last != null ? (
                  <span className="tabular-nums text-atlas-gray">
                    ${c.last.toLocaleString("en-US", { maximumFractionDigits: c.last >= 1000 ? 0 : 2 })}
                  </span>
                ) : null}
                <span
                  className={`tabular-nums font-semibold ${
                    (c.chg_24h_pct ?? 0) >= 0 ? "text-atlas-green" : "text-atlas-red"
                  }`}
                >
                  {c.chg_24h_pct != null ? `${c.chg_24h_pct > 0 ? "+" : ""}${c.chg_24h_pct.toFixed(1)}%` : "—"}{" "}
                  <span className="font-normal text-atlas-gray-dark">24h</span>
                </span>
                <span
                  className={`tabular-nums ${
                    (c.chg_1h_pct ?? 0) >= 0 ? "text-atlas-green" : "text-atlas-red"
                  }`}
                >
                  {c.chg_1h_pct != null ? `${c.chg_1h_pct > 0 ? "+" : ""}${c.chg_1h_pct.toFixed(1)}%` : "—"}{" "}
                  <span className="text-atlas-gray-dark">1h</span>
                </span>
                {c.chg_weekend_pct != null ? (
                  <span
                    className={`tabular-nums ${
                      c.chg_weekend_pct >= 0 ? "text-atlas-green" : "text-atlas-red"
                    }`}
                  >
                    {`${c.chg_weekend_pct > 0 ? "+" : ""}${c.chg_weekend_pct.toFixed(1)}%`}{" "}
                    <span className="text-atlas-gray-dark">wknd</span>
                  </span>
                ) : null}
              </span>
            ))}
          </div>
        ) : null}

        {!sect ? (
          <div className="animate-pulse rounded-[14px] border border-atlas-border bg-atlas-card/60 p-16 text-center text-sm text-atlas-gray-dark">
            Loading live market data…
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {sect.flow ? (
              <Card
                title="Taker Order Flow"
                badge={
                  <span
                    className={`rounded border px-2 py-0.5 text-[10px] font-bold tracking-wide ${labelTone(sect.flow.label)}`}
                  >
                    {sect.flow.label}
                  </span>
                }
                foot={`Buy = taker lifted the offer (trade above the venue's own mid — reported side fields are not trusted). Labels guarded: BUYERS >52%, SELLERS <48%, else BALANCED. Window: ${sect.flow.window_min}m.`}
              >
                <div className="mb-3 grid grid-cols-3 gap-2">
                  <StatTile label="Taker buying" value={fmtM(sect.flow.buy_usd_m)} tone="up" />
                  <StatTile label="Taker selling" value={fmtM(sect.flow.sell_usd_m)} tone="down" />
                  <StatTile label="Buy share" value={`${sect.flow.buy_share_pct.toFixed(1)}%`} />
                </div>
                <div className="flex flex-col gap-1.5">
                  {sect.flow.venues.slice(0, 7).map((v) => (
                    <div key={v.venue} className="flex items-center gap-2 text-xs">
                      <span className="w-[76px] flex-shrink-0 font-semibold text-atlas-offwhite">
                        {v.venue}
                      </span>
                      <span
                        className={`w-[46px] flex-shrink-0 text-right tabular-nums font-semibold ${
                          v.buy_pct > 52
                            ? "text-atlas-green"
                            : v.buy_pct < 48
                              ? "text-atlas-red"
                              : "text-atlas-gray"
                        }`}
                      >
                        {v.buy_pct.toFixed(1)}%
                      </span>
                      <span className="relative h-2.5 flex-1 overflow-hidden rounded bg-atlas-bg/80">
                        <span className="absolute bottom-0 left-1/2 top-0 w-px bg-atlas-border" />
                        <span
                          className={`absolute bottom-0.5 top-0.5 rounded-sm ${
                            v.buy_pct >= 50 ? "left-1/2 bg-atlas-green" : "right-1/2 bg-atlas-red"
                          }`}
                          style={{
                            width: `${Math.min(Math.abs(v.buy_pct - 50) * 2, 50)}%`,
                          }}
                        />
                      </span>
                      <span className="w-[60px] flex-shrink-0 text-right tabular-nums text-atlas-gray">
                        {fmtM(v.taker_usd_m)}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            ) : null}

            {sect.markout ? (
              <Card
                title="Venue Markout League"
                badge={
                  <span className="rounded border border-atlas-accent/30 bg-[rgba(59,130,246,0.12)] px-2 py-0.5 text-[10px] font-bold text-atlas-accent">
                    +5s / +60s
                  </span>
                }
                foot="Market-wide taker markout vs each venue's own mid. Positive = cost to the aggressor; negative = price reverted in their favor. The number most tapes don't show you."
              >
                <div className="mb-3 grid grid-cols-2 gap-2">
                  <StatTile
                    label="+60s cross-venue (ntl-wtd)"
                    value={`${fmtBps(sect.markout.mk60s_notional_wtd_bps)} bps`}
                  />
                  <StatTile
                    label="Equal-weighted"
                    value={`${fmtBps(sect.markout.mk60s_equal_wtd_bps)} bps`}
                  />
                </div>
                {!sect.markout.weightings_agree ? (
                  <p className="mb-2 text-[10.5px] text-atlas-orange">
                    Weightings disagree — one venue may dominate; read with care.
                  </p>
                ) : null}
                <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-wider text-atlas-gray-dark">
                      <th className="pb-1.5 text-left font-semibold">Venue</th>
                      <th className="pb-1.5 text-right font-semibold">+5s bps</th>
                      <th className="pb-1.5 text-right font-semibold">+60s bps</th>
                      <th className="pb-1.5 text-right font-semibold">Taker vol</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sect.markout.venues.slice(0, 7).map((v) => (
                      <tr key={v.venue} className="border-t border-atlas-border/60">
                        <td className="py-1.5 font-semibold text-atlas-offwhite">{v.venue}</td>
                        <td
                          className={`py-1.5 text-right tabular-nums ${
                            (v.mk5s_bps ?? 0) < 0 ? "text-atlas-green" : "text-atlas-gray"
                          }`}
                        >
                          {fmtBps(v.mk5s_bps)}
                        </td>
                        <td
                          className={`py-1.5 text-right tabular-nums font-semibold ${
                            (v.mk60s_bps ?? 0) < 0 ? "text-atlas-green" : "text-atlas-offwhite"
                          }`}
                        >
                          {fmtBps(v.mk60s_bps)}
                        </td>
                        <td className="py-1.5 text-right tabular-nums text-atlas-gray">
                          {fmtM(v.taker_usd_m)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            ) : null}

            {sect.book ? (
              <Card
                title="Book Imbalance — Absorption"
                badge={
                  sect.book.bid_share_25_pct != null ? (
                    <span
                      className={`rounded border px-2 py-0.5 text-[10px] font-bold tracking-wide ${
                        sect.book.bid_share_25_pct >= 53
                          ? "border-atlas-green/40 bg-atlas-green/15 text-atlas-green"
                          : sect.book.bid_share_25_pct <= 47
                            ? "border-atlas-red/40 bg-atlas-red/15 text-atlas-red"
                            : "border-atlas-border bg-atlas-card text-atlas-gray"
                      }`}
                    >
                      BID {sect.book.bid_share_25_pct}%
                    </span>
                  ) : null
                }
                foot="Resting USD notional within ±25 bps of mid — how much aggressive flow the book can absorb before price moves. Snapshot at publish time."
              >
                <div className="mb-3 grid grid-cols-2 gap-2">
                  <StatTile
                    label="Resting ±25bps · bid"
                    value={fmtM(sect.book.bid25_total_usd_m)}
                    tone="up"
                  />
                  <StatTile
                    label="Resting ±25bps · ask"
                    value={fmtM(sect.book.ask25_total_usd_m)}
                    tone="down"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  {sect.book.venues.slice(0, 7).map((v) => {
                    const bid = v.bid25_usd_m ?? 0;
                    const ask = v.ask25_usd_m ?? 0;
                    const tot = bid + ask;
                    return (
                      <div key={v.venue} className="flex items-center gap-2 text-xs">
                        <span className="w-[76px] flex-shrink-0 font-semibold text-atlas-offwhite">
                          {v.venue}
                        </span>
                        <span className="flex h-2.5 flex-1 gap-[2px] overflow-hidden rounded">
                          <span
                            className="rounded-l-sm bg-atlas-green"
                            style={{ width: `${tot ? (bid / tot) * 100 : 50}%` }}
                          />
                          <span
                            className="rounded-r-sm bg-atlas-red"
                            style={{ width: `${tot ? (ask / tot) * 100 : 50}%` }}
                          />
                        </span>
                        <span className="w-[40px] flex-shrink-0 text-right tabular-nums font-semibold text-atlas-gray">
                          {v.bid_share_25_pct != null ? `${v.bid_share_25_pct}%` : "—"}
                        </span>
                        <span className="w-[64px] flex-shrink-0 text-right tabular-nums text-atlas-gray">
                          {fmtM(tot)}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2 flex gap-4 text-[10px] text-atlas-gray-dark">
                  <span>
                    <span className="mr-1 inline-block h-2 w-2 rounded-sm bg-atlas-green align-middle" />
                    Bid-side resting $
                  </span>
                  <span>
                    <span className="mr-1 inline-block h-2 w-2 rounded-sm bg-atlas-red align-middle" />
                    Ask-side resting $
                  </span>
                </div>
              </Card>
            ) : null}
          </div>
        )}

        {panel?.carry ? (
          <div className="mt-5 rounded-[14px] border border-atlas-border bg-atlas-card p-5">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="font-display m-0 text-[15px] font-bold text-atlas-white">
                Rates &amp; Carry
              </h3>
              <span className="rounded border border-atlas-accent/30 bg-[rgba(59,130,246,0.12)] px-2 py-0.5 text-[10px] font-bold text-atlas-accent">
                annualized
              </span>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-wider text-atlas-gray-dark">
                      <th className="pb-1.5 text-left font-semibold">Perp funding leg</th>
                      <th className="pb-1.5 text-right font-semibold">Funding (ann.)</th>
                      <th className="pb-1.5 text-right font-semibold">vs USDC lend</th>
                      <th className="pb-1.5 text-right font-semibold">Net carry</th>
                    </tr>
                  </thead>
                  <tbody>
                    {panel.carry.net_carry.map((r) => {
                      const f = panel.carry!.funding.find(
                        (x) => x.venue === r.venue && x.symbol === r.symbol,
                      );
                      const best =
                        r.net_pct != null &&
                        r.net_pct ===
                          Math.max(...panel.carry!.net_carry.map((x) => x.net_pct ?? -Infinity));
                      return (
                        <tr key={`${r.venue}-${r.symbol}`} className="border-t border-atlas-border/60">
                          <td className="py-1.5 font-semibold text-atlas-offwhite">
                            {r.symbol} · {r.venue}
                          </td>
                          <td className="py-1.5 text-right tabular-nums text-atlas-gray">
                            {f?.annualized_pct != null ? `${f.annualized_pct > 0 ? "+" : ""}${f.annualized_pct.toFixed(2)}%` : "—"}
                          </td>
                          <td className="py-1.5 text-right tabular-nums text-atlas-gray-dark">
                            {panel.carry!.lend[0] ? `${panel.carry!.lend[0].apy_pct.toFixed(2)}%` : "—"}
                          </td>
                          <td
                            className={`py-1.5 text-right tabular-nums font-bold ${
                              best
                                ? "text-atlas-accent"
                                : (r.net_pct ?? 0) >= 0
                                  ? "text-atlas-green"
                                  : "text-atlas-red"
                            }`}
                          >
                            {r.net_pct != null ? `${r.net_pct > 0 ? "+" : ""}${r.net_pct.toFixed(2)}%` : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col gap-2 text-xs">
                {panel.carry.lend.map((l) => (
                  <div key={l.label} className="flex justify-between border-b border-atlas-border/60 pb-1.5">
                    <span className="text-atlas-gray">{l.label}</span>
                    <span className="tabular-nums font-semibold text-atlas-white">{l.apy_pct.toFixed(2)}%</span>
                  </div>
                ))}
                {panel.carry.staking ? (
                  <div className="flex justify-between border-b border-atlas-border/60 pb-1.5">
                    <span className="text-atlas-gray">{panel.carry.staking.label}</span>
                    <span className="tabular-nums font-semibold text-atlas-white">{panel.carry.staking.apy_pct.toFixed(2)}%</span>
                  </div>
                ) : null}
                {panel.carry.basis.map((b) => (
                  <div key={b.label} className="flex justify-between border-b border-atlas-border/60 pb-1.5">
                    <span className="text-atlas-gray">{b.label}</span>
                    <span className="tabular-nums font-semibold text-atlas-white">
                      {b.annualized_pct > 0 ? "+" : ""}{b.annualized_pct.toFixed(2)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mb-0 mt-3 text-[10.5px] leading-relaxed text-atlas-gray-darker">
              {panel.carry.definition}
            </p>
          </div>
        ) : null}

        <p className="mb-0 mt-6 text-[10.5px] leading-relaxed text-atlas-gray-darker">
          All metrics derived from public exchange market data across the venues
          Atlas captures. Markout convention: positive = cost to the aggressor.
          Reads are descriptive of the tape — context, not advice. Nothing here
          is a trading recommendation or a representation of execution results.
        </p>
      </div>
    </section>
  );
}
