"use client";

import { useEffect, useState } from "react";

// CoinGecko has no L2/depth endpoint — it's a price aggregator, not an
// exchange, so there's no order book to pull. This fetches each venue's
// last trade price and bid/ask spread (the closest real signal CoinGecko
// exposes) for a real top-of-book view. Real L2 depth will need to come
// from the exchanges directly later.
const EXCHANGE_IDS = ["binance", "gdax", "kraken"] as const;
const VENUE_BY_EXCHANGE_ID: Record<string, string> = {
  binance: "Binance",
  gdax: "Coinbase",
  kraken: "Kraken",
};
const USD_TARGETS = new Set(["USD", "USDT", "USDC"]);
// Kraken reports BTC under the legacy "XBT" ticker.
const BTC_BASES = new Set(["BTC", "XBT"]);

const TICKERS_URL = `https://api.coingecko.com/api/v3/coins/bitcoin/tickers?exchange_ids=${EXCHANGE_IDS.join(",")}`;

// CoinGecko's free, unauthenticated, browser-direct API rate-limits well
// below its documented ~30/min when hit at high frequency — 5s (12
// req/min) reliably triggered 429s in testing, which silently freeze the
// widget on stale data since poll() swallows fetch errors. 20s keeps
// comfortable headroom.
const POLL_MS = 20_000;

export type VenueQuote = { price: number; spreadPct: number };
export type BtcTopOfBook = {
  byVenue: Record<string, VenueQuote>;
  updatedAt: number;
};

type CoinGeckoTicker = {
  base: string;
  target: string;
  last: number;
  bid_ask_spread_percentage: number;
  market: { identifier: string };
};

function targetRank(target: string): number {
  return target === "USD" ? 0 : target === "USDT" ? 1 : 2;
}

// Module-level singleton, same reasoning as the ticker strip's poller: one
// shared fetch rather than every consumer hitting CoinGecko independently.
let cache: BtcTopOfBook | null = null;
let pollTimer: ReturnType<typeof setInterval> | null = null;
const listeners = new Set<(d: BtcTopOfBook | null) => void>();

async function poll() {
  try {
    const res = await fetch(TICKERS_URL);
    if (!res.ok) return;
    const data: { tickers: CoinGeckoTicker[] } = await res.json();

    // One ticker per venue: prefer USD, then USDT, then USDC if a venue
    // quotes BTC against more than one of them.
    const byVenue = new Map<string, CoinGeckoTicker>();
    for (const t of data.tickers) {
      if (!BTC_BASES.has(t.base) || !USD_TARGETS.has(t.target)) continue;
      const venue = VENUE_BY_EXCHANGE_ID[t.market.identifier];
      if (!venue) continue;
      const existing = byVenue.get(venue);
      if (!existing || targetRank(t.target) < targetRank(existing.target)) {
        byVenue.set(venue, t);
      }
    }

    const picked = [...byVenue.entries()];
    if (picked.length === 0) return;

    const venueQuotes: Record<string, VenueQuote> = {};
    for (const [venue, t] of picked) {
      venueQuotes[venue] = { price: t.last, spreadPct: t.bid_ask_spread_percentage };
    }

    cache = { byVenue: venueQuotes, updatedAt: Date.now() };
    listeners.forEach((l) => l(cache));
  } catch {
    /* ignore */
  }
}

export function useBtcTopOfBook(): BtcTopOfBook | null {
  const [data, setData] = useState<BtcTopOfBook | null>(cache);

  useEffect(() => {
    listeners.add(setData);
    if (!pollTimer) {
      poll();
      pollTimer = setInterval(poll, POLL_MS);
    }
    return () => {
      listeners.delete(setData);
      if (listeners.size === 0 && pollTimer) {
        clearInterval(pollTimer);
        pollTimer = null;
      }
    };
  }, []);

  return data;
}
