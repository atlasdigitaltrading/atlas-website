'use client';

import { MarketData, useMarketData } from '@/lib/marketData';

const TOP_N = 20;

export function fmtPrice(sym: string, price: number): string {
  if (sym === 'BTC' || sym === 'ETH')
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (price >= 1000) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (price >= 1) return price.toFixed(3);
  return price.toFixed(4);
}

export function CoinIcon({ sym, size = 16 }: { sym: string; size?: number }) {
  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color/${sym.toLowerCase()}.svg`}
      alt={sym}
      width={size}
      height={size}
      className="rounded-full shrink-0"
      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
    />
  );
}

function Tile({ symbol, data }: { symbol: string; data: MarketData }) {
  const isUp = data.change24h >= 0;

  return (
    <div className="flex items-center gap-2 px-4 h-full shrink-0 border-r border-atlas-border">
      <CoinIcon sym={symbol} />
      <span className="text-[11px] font-semibold text-atlas-gray tracking-wide">{symbol}</span>
      <span className="text-[12px] font-semibold tabular-nums text-atlas-white">
        ${fmtPrice(symbol, data.price)}
      </span>
      <span
        className={`text-[11px] font-semibold tabular-nums ${isUp ? 'text-atlas-green' : 'text-atlas-red'}`}
      >
        {data.change24h >= 0 ? '+' : ''}{data.change24h.toFixed(2)}%
      </span>
    </div>
  );
}

export function TickerStrip() {
  const data = useMarketData();
  const symbols = Object.entries(data)
    .sort((a, b) => b[1].marketCap - a[1].marketCap)
    .slice(0, TOP_N)
    .map(([symbol]) => symbol);

  if (symbols.length === 0) return null;

  const tiles = (prefix: string) =>
    symbols.map((s) => <Tile key={`${prefix}-${s}`} symbol={s} data={data[s]} />);

  return (
    <div className="w-full h-9 bg-atlas-bg-alt border-b border-atlas-border overflow-hidden">
      <div className="flex items-center h-full w-max animate-marquee hover:[animation-play-state:paused]">
        {tiles('a')}
        {tiles('b')}
      </div>
    </div>
  );
}
