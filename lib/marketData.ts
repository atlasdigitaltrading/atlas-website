"use client";

import { useEffect, useState } from "react";

// Verified against CoinGecko's /coins/list — several of these (POL, RENDER,
// STX, ENA, JUP) don't map from ticker symbol the obvious way, so this is a
// hand-checked table, not a derived one.
export const SYMBOL_TO_COINGECKO_ID: Record<string, string> = {
  BTC: "bitcoin",
  ETH: "ethereum",
  XRP: "ripple",
  BNB: "binancecoin",
  SOL: "solana",
  DOGE: "dogecoin",
  ADA: "cardano",
  TRX: "tron",
  AVAX: "avalanche-2",
  SHIB: "shiba-inu",
  TON: "the-open-network",
  LINK: "chainlink",
  SUI: "sui",
  HBAR: "hedera-hashgraph",
  BCH: "bitcoin-cash",
  DOT: "polkadot",
  LTC: "litecoin",
  XLM: "stellar",
  PEPE: "pepe",
  NEAR: "near",
  UNI: "uniswap",
  APT: "aptos",
  AAVE: "aave",
  ICP: "internet-computer",
  ETC: "ethereum-classic",
  KAS: "kaspa",
  POL: "polygon-ecosystem-token",
  MKR: "maker",
  ARB: "arbitrum",
  VET: "vechain",
  ATOM: "cosmos",
  OP: "optimism",
  RENDER: "render-token",
  INJ: "injective-protocol",
  GRT: "the-graph",
  ENA: "ethena",
  JUP: "jupiter-exchange-solana",
  IMX: "immutable-x",
  STX: "blockstack",
  ALGO: "algorand",
  XMR: "monero",
};

const ID_TO_SYMBOL: Record<string, string> = Object.fromEntries(
  Object.entries(SYMBOL_TO_COINGECKO_ID).map(([sym, id]) => [id, sym])
);

const COINGECKO_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${Object.values(
  SYMBOL_TO_COINGECKO_ID
).join(",")}&per_page=100`;

// Market cap and 24h change don't move fast enough to justify hammering
// CoinGecko's free tier — 5 minutes keeps us well under its rate limit.
const POLL_MS = 5 * 60_000;

export type MarketData = { price: number; change24h: number; marketCap: number };
type MarketDataMap = Record<string, MarketData>;

type CoinGeckoRow = {
  id: string;
  current_price: number | null;
  price_change_percentage_24h: number | null;
  market_cap: number | null;
  fully_diluted_valuation: number | null;
};

// Module-level singleton, same reasoning as useTickers: one shared poller
// rather than every consumer hitting CoinGecko independently.
let cache: MarketDataMap = {};
let pollTimer: ReturnType<typeof setInterval> | null = null;
const listeners = new Set<(d: MarketDataMap) => void>();

async function poll() {
  try {
    const res = await fetch(COINGECKO_URL);
    if (!res.ok) return;
    const rows: CoinGeckoRow[] = await res.json();

    const next: MarketDataMap = {};
    for (const row of rows) {
      const symbol = ID_TO_SYMBOL[row.id];
      if (!symbol || row.current_price == null) continue;
      // MKR (post-Sky-rebrand) and a couple others report market_cap: 0 on
      // CoinGecko — fall back to fully-diluted valuation so they don't
      // collapse to an invisible sliver on the map.
      const marketCap = row.market_cap || row.fully_diluted_valuation || 0;
      if (marketCap <= 0) continue;
      next[symbol] = {
        price: row.current_price,
        change24h: row.price_change_percentage_24h ?? 0,
        marketCap,
      };
    }
    cache = next;
    listeners.forEach((l) => l(cache));
  } catch {
    /* ignore */
  }
}

export function useMarketData(): MarketDataMap {
  const [data, setData] = useState<MarketDataMap>(cache);

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
