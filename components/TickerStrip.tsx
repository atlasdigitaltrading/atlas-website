'use client';

import { useEffect, useRef, useState } from 'react';

const API_URL =
  process.env.NEXT_PUBLIC_TICKER_API ??
  'https://mainnet.atlasdigitalmarkets.xyz/public/ticker/24h';

const POLL_MS = 60_000;

type Ticker = { last_price?: number; change_24h_pct?: number };

function fmtPrice(sym: string, price: number): string {
  if (sym === 'BTC' || sym === 'ETH')
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (price >= 1000) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (price >= 1) return price.toFixed(3);
  return price.toFixed(4);
}

function CoinIcon({ sym }: { sym: string }) {
  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color/${sym.toLowerCase()}.svg`}
      alt={sym}
      width={16}
      height={16}
      className="rounded-full shrink-0"
      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
    />
  );
}

function Tile({ product, ticker }: { product: string; ticker: Ticker }) {
  const sym = product.replace('-USD', '');
  const price = ticker.last_price ?? null;
  const chg = ticker.change_24h_pct ?? null;
  const isUp = chg != null ? chg >= 0 : null;

  return (
    <div className="flex items-center gap-2 px-4 h-full shrink-0 border-r border-atlas-border">
      <CoinIcon sym={sym} />
      <span className="text-[11px] font-semibold text-atlas-gray tracking-wide">{sym}</span>
      {/* Fixed min-width (right-aligned): a digit-count change on refresh (e.g. 999.99 ->
          1,000.00) must not resize the tile — the marquee's -50% loop animation is relative
          to the row's own width, so any width change snaps the running animation. */}
      <span className="text-[12px] font-semibold tabular-nums text-atlas-white min-w-[64px] text-right">
        {price != null ? `$${fmtPrice(sym, price)}` : '—'}
      </span>
      {chg != null ? (
        <span
          className={`text-[11px] font-semibold tabular-nums min-w-[48px] text-right ${isUp ? 'text-atlas-green' : 'text-atlas-red'}`}
        >
          {chg >= 0 ? '+' : ''}{chg.toFixed(2)}%
        </span>
      ) : (
        <span className="text-[11px] font-semibold tabular-nums min-w-[48px] text-right text-atlas-gray">·</span>
      )}
    </div>
  );
}

export function TickerStrip() {
  const [tickers, setTickers] = useState<Record<string, Ticker>>({});
  const products = Object.keys(tickers);
  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;
    const poll = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok || !aliveRef.current) return;
        const data = await res.json();
        if (aliveRef.current) setTickers(data);
      } catch { /* ignore */ }
    };
    poll();
    const id = setInterval(poll, POLL_MS);
    return () => { aliveRef.current = false; clearInterval(id); };
  }, []);

  if (products.length === 0) return null;

  const tiles = (prefix: string) =>
    products.map((p) => <Tile key={`${prefix}-${p}`} product={p} ticker={tickers[p] ?? {}} />);

  return (
    <div className="w-full h-9 bg-atlas-bg-alt border-b border-atlas-border overflow-hidden">
      <div className="flex items-center h-full w-max animate-marquee hover:[animation-play-state:paused]">
        {tiles('a')}
        {tiles('b')}
      </div>
    </div>
  );
}
