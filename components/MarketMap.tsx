"use client";

import { useMarketData } from "@/lib/marketData";
import { squarify, TreemapRect } from "@/lib/treemap";
import { CoinIcon, fmtPrice } from "./TickerStrip";
import { SectionHeading } from "./SectionHeading";
import { SectionLabel } from "./SectionLabel";

// Real market caps span ~10,000x between BTC and a long-tail altcoin — a
// fixed grid of size tiers can't represent that, but tile *area* can. Layout
// is a squarified treemap (see lib/treemap.ts) over a fixed virtual
// MAP_WIDTH x MAP_HEIGHT box, expressed as percentages so it stays
// responsive without a resize observer.
const TOTAL_TILES = 30;
const MAP_WIDTH = 1000;
const MAP_HEIGHT = 420;

// BTC alone is ~35% of total cap across these symbols and the smallest
// long-tail coin is ~0.01% — sizing strictly linearly buries everything
// outside the top 3-4 coins under illegibly thin slivers. sqrt() keeps the
// ordering (bigger cap is always a bigger tile) while compressing that range
// enough that the rest of the market stays readable.
function buildRects(data: Record<string, { marketCap: number }>): TreemapRect[] {
  const items = Object.entries(data)
    .sort((a, b) => b[1].marketCap - a[1].marketCap)
    .slice(0, TOTAL_TILES);
  if (items.length === 0) return [];

  const weights = items.map(([symbol, v]) => [symbol, Math.sqrt(v.marketCap)] as const);
  const total = weights.reduce((s, [, w]) => s + w, 0);
  const scaled = weights.map(([symbol, w]) => ({
    id: symbol,
    value: (w / total) * (MAP_WIDTH * MAP_HEIGHT),
  }));
  return squarify(scaled, 0, 0, MAP_WIDTH, MAP_HEIGHT);
}

function fmtMarketCap(v: number): string {
  if (v >= 1e12) return `$${(v / 1e12).toFixed(2)}T`;
  if (v >= 1e9) return `$${(v / 1e9).toFixed(2)}B`;
  return `$${(v / 1e6).toFixed(1)}M`;
}

type Tier = "lg" | "md" | "sm";

function tierFor(rect: TreemapRect): Tier {
  const frac = (rect.w * rect.h) / (MAP_WIDTH * MAP_HEIGHT);
  if (frac > 0.05) return "lg";
  if (frac > 0.015) return "md";
  return "sm";
}

function MapTile({
  rect,
  symbol,
  price,
  chg,
  marketCap,
}: {
  rect: TreemapRect;
  symbol: string;
  price: number;
  chg: number;
  marketCap: number;
}) {
  const isUp = chg >= 0;
  // Saturate the color at a 6% move so a handful of big movers don't wash
  // out everything else on the map.
  const intensity = Math.min(Math.abs(chg) / 6, 1);
  const bg = isUp
    ? `rgba(34,197,94,${(0.1 + intensity * 0.45).toFixed(2)})`
    : `rgba(239,68,68,${(0.1 + intensity * 0.45).toFixed(2)})`;
  const border = isUp ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)";
  const tier = tierFor(rect);
  // Tooltip flips below the tile for the top row, since "above" would run
  // off the top of the section.
  const tooltipBelow = rect.y < MAP_HEIGHT * 0.1;

  return (
    <div
      className="group absolute"
      style={{
        left: `${(rect.x / MAP_WIDTH) * 100}%`,
        top: `${(rect.y / MAP_HEIGHT) * 100}%`,
        width: `${(rect.w / MAP_WIDTH) * 100}%`,
        height: `${(rect.h / MAP_HEIGHT) * 100}%`,
      }}
    >
      <div
        className="absolute inset-[1.5px] flex flex-col gap-1 overflow-hidden rounded-md border p-2"
        style={{ backgroundColor: bg, borderColor: border }}
      >
        <span className="flex items-center gap-1.5">
          <CoinIcon sym={symbol} size={tier === "lg" ? 18 : tier === "md" ? 14 : 12} />
          <span
            className={`truncate font-semibold tracking-wide text-atlas-white ${
              tier === "lg" ? "text-[15px]" : tier === "md" ? "text-[12px]" : "text-[10px]"
            }`}
          >
            {symbol}
          </span>
        </span>
        {tier !== "sm" && (
          <span
            className={`truncate font-semibold tabular-nums text-atlas-gray-dark ${
              tier === "lg" ? "text-[14px]" : "text-[12px]"
            }`}
          >
            ${fmtPrice(symbol, price)}
          </span>
        )}
        <span
          className={`truncate font-bold tabular-nums ${
            isUp ? "text-atlas-green" : "text-atlas-red"
          } ${tier === "lg" ? "text-[20px]" : tier === "md" ? "text-[13px]" : "text-[11px]"}`}
        >
          {chg >= 0 ? "+" : ""}
          {chg.toFixed(2)}%
        </span>
      </div>

      <div
        className={`pointer-events-none absolute left-1/2 z-50 w-max -translate-x-1/2 whitespace-nowrap rounded-md border border-atlas-border bg-atlas-card px-3 py-2 opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-opacity duration-150 group-hover:opacity-100 ${
          tooltipBelow ? "top-full mt-2" : "bottom-full mb-2"
        }`}
      >
        <div className="mb-1 flex items-center gap-1.5">
          <CoinIcon sym={symbol} size={14} />
          <span className="text-[11px] font-semibold text-atlas-white">{symbol}</span>
        </div>
        <div className="text-[11px] tabular-nums text-atlas-offwhite">
          ${fmtPrice(symbol, price)}{" "}
          <span className={isUp ? "text-atlas-green" : "text-atlas-red"}>
            {chg >= 0 ? "+" : ""}
            {chg.toFixed(2)}%
          </span>
        </div>
        <div className="mt-0.5 text-[12px] tabular-nums text-atlas-gray">
          Mkt Cap {fmtMarketCap(marketCap)}
        </div>
      </div>
    </div>
  );
}

export function MarketMap() {
  const data = useMarketData();
  const rects = buildRects(data);

  return (
    <section
      id="market-map"
      className="px-[clamp(16px,4vw,56px)] py-[100px]"
      style={{ background: "#09090b" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionLabel>Live Markets</SectionLabel>
        <SectionHeading>Market at a glance</SectionHeading>
        <p className="mb-10 mt-4 max-w-[560px] text-[15px] leading-relaxed text-atlas-gray">
          Tile size scales with the square root of market cap; color tracks
          24h price change.
        </p>

        <div
          className="relative w-full"
          style={{ aspectRatio: `${MAP_WIDTH} / ${MAP_HEIGHT}` }}
        >
          {rects.length === 0 ? (
            <div className="absolute inset-0 animate-pulse rounded-lg border border-atlas-border bg-atlas-card/60" />
          ) : (
            rects.map((r) => (
              <MapTile
                key={r.id}
                rect={r}
                symbol={r.id}
                price={data[r.id].price}
                chg={data[r.id].change24h}
                marketCap={data[r.id].marketCap}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
