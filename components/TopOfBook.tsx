"use client";

import { useEffect, useState } from "react";
import { useBtcTopOfBook } from "@/lib/btcTopOfBook";

// Fixed order so the venue rows don't reshuffle between polls.
const VENUE_ORDER = ["Binance", "Coinbase", "Kraken"] as const;

function fmtPrice(n: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtTime(ms: number) {
  return new Date(ms).toLocaleTimeString("en-US", { hour12: false });
}

// CoinGecko gives a spread percentage, not separate bid/ask prices — split
// it evenly around the last trade price to get a bid and an ask.
function bidAsk(price: number, spreadPct: number): { bid: number; ask: number } {
  const half = (price * spreadPct) / 100 / 2;
  return { bid: price - half, ask: price + half };
}

export function TopOfBook() {
  const real = useBtcTopOfBook();

  const venueRows = VENUE_ORDER.map((venue) => {
    const quote = real?.byVenue[venue];
    return quote ? { venue, ...bidAsk(quote.price, quote.spreadPct) } : { venue, bid: null, ask: null };
  });

  // BBO means the best (highest) bid and best (lowest) ask across venues —
  // not an average of them — so this is always the max/min of the rows
  // below, never a number that disagrees with all of them.
  const validBids = venueRows.map((r) => r.bid).filter((b): b is number => b != null);
  const validAsks = venueRows.map((r) => r.ask).filter((a): a is number => a != null);
  const bestBid = validBids.length ? Math.max(...validBids) : null;
  const bestAsk = validAsks.length ? Math.min(...validAsks) : null;
  // A real BBO spread is never negative — a crossed market gets arbitraged
  // away in milliseconds. Here it can dip slightly below 0 because each
  // venue's bid/ask is derived from its *last trade price*, not a live
  // quote, and trades on different venues land at slightly different
  // instants. That's a measurement artifact, not a real crossed book, so
  // floor the display at 0 rather than show a nonsensical negative spread.
  const spreadBps =
    bestBid != null && bestAsk != null
      ? Math.max(0, ((bestAsk - bestBid) / ((bestAsk + bestBid) / 2)) * 10000)
      : null;

  // Stays null until mount so the server-rendered markup has no clock
  // value to mismatch against on hydration. Ticks every second on its own
  // so the header reads as live between (5s) polls, not just on a poll.
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mx-auto w-full max-w-[440px] overflow-hidden rounded-xl border border-atlas-border bg-atlas-card/60 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-atlas-border px-4 py-3">
        <span className="text-[11px] font-semibold tracking-wide text-atlas-gray">
          BTC-USD <span className="text-atlas-gray-darker">· BBO</span>
        </span>
        <span className="flex items-center gap-2 text-[10px] font-semibold tracking-wide text-atlas-accent">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-atlas-pulse rounded-full bg-atlas-accent" />
            LIVE BBO
          </span>
          {now != null ? (
            <span
              className="font-normal text-atlas-gray-darker"
              style={{ fontFamily: "monospace" }}
            >
              {fmtTime(now)}
            </span>
          ) : null}
        </span>
      </div>

      <div
        className="grid grid-cols-3 items-center gap-2 border-b border-atlas-border px-4 py-3"
        style={{ fontFamily: "monospace" }}
      >
        <div className="text-left">
          <div className="text-[10px]" style={{ fontFamily: "inherit" }}>
            <span className="text-atlas-gray-darker">Best Bid</span>
          </div>
          <div className="text-[15px] font-semibold tabular-nums text-atlas-green">
            {bestBid != null ? fmtPrice(bestBid) : "—"}
          </div>
        </div>
        <div className="text-center">
          <div className="text-[10px]" style={{ fontFamily: "inherit" }}>
            <span className="text-atlas-gray-darker">Spread</span>
          </div>
          <div className="text-[13px] font-semibold tabular-nums text-atlas-offwhite">
            {spreadBps != null ? `${spreadBps.toFixed(1)} bps` : "—"}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px]" style={{ fontFamily: "inherit" }}>
            <span className="text-atlas-gray-darker">Best Ask</span>
          </div>
          <div className="text-[15px] font-semibold tabular-nums text-atlas-red">
            {bestAsk != null ? fmtPrice(bestAsk) : "—"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1 border-b border-atlas-border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide text-atlas-gray-darker">
        <span>Venue</span>
        <span>Bid</span>
        <span>Ask</span>
        <span className="text-right">Spread</span>
      </div>

      <div className="py-1">
        {venueRows.map(({ venue, bid, ask }) => {
          const isBestBid = bid != null && bid === bestBid;
          const isBestAsk = ask != null && ask === bestAsk;
          return (
            <div
              key={venue}
              className={`grid h-[22px] grid-cols-4 items-center gap-1 px-2.5 ${
                isBestBid || isBestAsk ? "bg-atlas-accent/[0.06]" : ""
              }`}
              style={{ fontFamily: "monospace" }}
            >
              <span className="flex items-center gap-1 text-[10.5px] text-atlas-offwhite/80">
                {venue}
                {(isBestBid || isBestAsk) && (
                  <span className="h-1 w-1 rounded-full bg-atlas-accent" />
                )}
              </span>
              <span
                className={`rounded-sm px-1 text-[10.5px] tabular-nums text-atlas-green ${
                  isBestBid ? "bg-atlas-green/15 font-bold" : "font-normal"
                }`}
              >
                {bid != null ? fmtPrice(bid) : "—"}
              </span>
              <span
                className={`rounded-sm px-1 text-[10.5px] tabular-nums text-atlas-red ${
                  isBestAsk ? "bg-atlas-red/15 font-bold" : "font-normal"
                }`}
              >
                {ask != null ? fmtPrice(ask) : "—"}
              </span>
              <span className="text-right text-[10px] tabular-nums text-atlas-gray-dark">
                {bid != null && ask != null
                  ? `${(((ask - bid) / ((ask + bid) / 2)) * 10000).toFixed(1)} bps`
                  : "—"}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-1 border-t border-atlas-border px-2.5 py-2 text-[10px] text-atlas-gray-darker">
        {VENUE_ORDER.length} venues monitored · BBO via CoinGecko · L2 depth coming soon
      </div>
    </div>
  );
}
