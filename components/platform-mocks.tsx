const font = "font-body";

const B = {
  accent: "#3b82f6",
  card: "#18181b",
  border: "#27272a",
  gray: "#94a3b8",
  grayDark: "#64748b",
  grayDarker: "#475569",
  offwhite: "#e2e8f0",
  white: "#f1f5f9",
  green: "#22c55e",
  red: "#ef4444",
  orange: "#f59e0b",
  purple: "#a78bfa",
  cyan: "#06b6d4",
};

export function TradingScreenMock() {
  const venues = ["Binance", "Coinbase", "Kraken", "OKX", "CLOB"];
  return (
    <div className="w-full text-[0]">
      <div
        className="mb-1 grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${venues.length}, minmax(0, 1fr))`,
        }}
      >
        {venues.map((v, i) => (
          <div
            key={v}
            className="rounded-md border border-atlas-border bg-atlas-card p-1.5"
          >
            <div className="mb-0.5 flex justify-between">
              <span className="text-[7px] text-atlas-gray" style={{ fontFamily: "inherit" }}>
                {v}
              </span>
              <span
                className="text-[7px] text-atlas-accent"
                style={{ fontFamily: "monospace" }}
              >
                ${(2050 + i * 0.5).toFixed(2)}
              </span>
            </div>
            <svg viewBox="0 0 100 24" className="h-5 w-full">
              <polyline
                points={`0,${18 - i} 20,${16 - i * 0.5} 40,${19 - i} 60,${14 - i * 0.3} 80,${12 + i * 0.5} 100,${8 + i}`}
                fill="none"
                stroke={B.accent}
                strokeWidth="1.2"
                opacity="0.7"
              />
            </svg>
          </div>
        ))}
      </div>
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${venues.length}, minmax(0, 1fr))`,
        }}
      >
        {venues.map((v, i) => (
          <div
            key={v}
            className="rounded-md border border-atlas-border bg-atlas-card p-1"
          >
            <div
              className={`mb-0.5 text-[6px] text-atlas-gray-dark ${font}`}
            >
              Order Book — {v}
            </div>
            {[0, 1, 2].map((j) => (
              <div
                key={j}
                className={`flex justify-between px-0 py-px text-[6px] text-atlas-red`}
                style={{ fontFamily: "monospace" }}
              >
                <span>{(2051 - j * 0.03).toFixed(2)}</span>
                <span className="text-atlas-gray-darker">
                  {(0.5 + j * 0.3 + i * 0.1).toFixed(2)}
                </span>
              </div>
            ))}
            <div
              className={`py-px text-center text-[5px] text-atlas-green ${font}`}
            >
              Spread: 0.01
            </div>
            {[0, 1, 2].map((j) => (
              <div
                key={j}
                className={`flex justify-between px-0 py-px text-[6px] text-atlas-green`}
                style={{ fontFamily: "monospace" }}
              >
                <span>{(2050.9 - j * 0.03).toFixed(2)}</span>
                <span className="text-atlas-gray-darker">
                  {(1.2 + j * 0.5 + i * 0.2).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PreTradeScreenMock() {
  return (
    <div className="w-full text-[0]">
      <div className={`mb-2 text-[11px] font-bold text-atlas-white ${font}`}>
        Pre-Trade Analytics
      </div>
      <div className="mb-2.5 flex flex-wrap gap-2.5">
        {["BTC-USD", "Buy", "Notional USD", "$10,000,000", "Medium"].map(
          (t, i) => (
            <span
              key={t}
              className={`rounded px-2 py-0.5 text-[8px] font-semibold ${font} ${
                i < 3
                  ? "border border-atlas-accent/30 bg-[rgba(59,130,246,0.12)] text-atlas-accent"
                  : "border border-atlas-border bg-atlas-card text-atlas-gray"
              }`}
            >
              {t}
            </span>
          ),
        )}
      </div>
      <div className={`mb-1.5 text-[8px] font-bold text-atlas-white ${font}`}>
        Pre-trade cost estimator
      </div>
      <div className="overflow-hidden rounded-md border border-atlas-border bg-atlas-card">
        <div
          className={`grid grid-cols-[2fr_1fr_1fr] border-b border-atlas-border px-2 py-1 ${font}`}
        >
          {["Component", "bps", "USD (est.)"].map((h) => (
            <span key={h} className="text-[7px] font-semibold text-atlas-gray-dark">
              {h}
            </span>
          ))}
        </div>
        {[
          ["Spread", "0.0075", "$7.48"],
          ["Temporary impact", "0.1588", "$158.81"],
          ["Book depth walk", "0", "$0.00"],
          ["Timing risk", "0.1313", "$131.25"],
          ["Opportunity cost", "0.1582", "$158.16"],
        ].map(([c, b, u], i) => (
          <div
            key={i}
            className="grid grid-cols-[2fr_1fr_1fr] border-b border-atlas-border/10 px-2 py-0.5"
          >
            <span className={`text-[7px] text-atlas-gray ${font}`}>{c}</span>
            <span className="text-[7px] text-atlas-offwhite" style={{ fontFamily: "monospace" }}>
              {b}
            </span>
            <span className="text-[7px] text-atlas-offwhite" style={{ fontFamily: "monospace" }}>
              {u}
            </span>
          </div>
        ))}
        <div className="grid grid-cols-[2fr_1fr_1fr] bg-[rgba(59,130,246,0.08)] px-2 py-1">
          <span className={`text-[7px] font-bold text-atlas-accent ${font}`}>
            Total implicit
          </span>
          <span
            className="text-[7px] font-bold text-atlas-accent"
            style={{ fontFamily: "monospace" }}
          >
            0.4557
          </span>
          <span
            className="text-[7px] font-bold text-atlas-accent"
            style={{ fontFamily: "monospace" }}
          >
            $455.70
          </span>
        </div>
      </div>
      <div className={`mt-2 mb-1 text-[8px] font-bold text-atlas-white ${font}`}>
        Execution schedule (illustrative)
      </div>
      <div className="flex h-10 gap-0.5" style={{ alignItems: "flex-end" }}>
        {[0.6, 0.8, 0.9, 1, 1, 1, 1, 0.95, 0.9, 0.85, 0.7, 0.5].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-atlas-accent"
            style={{
              height: `${h * 100}%`,
              opacity: 0.5 + h * 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function PostTradeTCAMock() {
  return (
    <div className="w-full text-[0]">
      <div className={`mb-2 text-[11px] font-bold text-atlas-white ${font}`}>
        Post-Trade TCA
      </div>
      <div className="mb-2.5 flex flex-wrap gap-1.5">
        {[
          ["Volume", "$653,572"],
          ["Parent orders", "3"],
          ["Fills", "501"],
          ["Avg slippage", "+1.55 bps"],
          ["Fill rate", "1.3%"],
          ["Avg exec span", "2394 ms"],
        ].map(([l, v]) => (
          <div
            key={l}
            className="min-w-0 flex-1 rounded border border-atlas-border bg-atlas-card px-2 py-1"
          >
            <div className={`text-[6px] text-atlas-gray-dark ${font}`}>{l}</div>
            <div className={`text-[9px] font-bold text-atlas-white ${font}`}>
              {v}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-3">
        <div>
          <div className={`mb-1 text-[7px] font-bold text-atlas-white ${font}`}>
            Venue volume
          </div>
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="22" fill="none" stroke={B.orange} strokeWidth="8" strokeDasharray="50 88" strokeDashoffset="0" />
            <circle cx="30" cy="30" r="22" fill="none" stroke={B.purple} strokeWidth="8" strokeDasharray="44 94" strokeDashoffset="-50" />
            <circle cx="30" cy="30" r="22" fill="none" stroke={B.green} strokeWidth="8" strokeDasharray="38 100" strokeDashoffset="-94" />
            <circle cx="30" cy="30" r="22" fill="none" stroke={B.cyan} strokeWidth="8" strokeDasharray="6 132" strokeDashoffset="-132" />
          </svg>
          <div className="mt-1">
            {(
              [
                ["Binance", B.orange, "35.1%"],
                ["OKX", B.purple, "32.4%"],
                ["Kraken", B.green, "27.7%"],
                ["Coinbase", B.cyan, "4.8%"],
              ] as const
            ).map(([n, c, p]) => (
              <div key={n} className="mb-px flex items-center gap-1">
                <span
                  className="h-1 w-1 rounded-[1px]"
                  style={{ background: c }}
                />
                <span className={`text-[6px] text-atlas-gray ${font}`}>
                  {n} {p}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className={`mb-1 text-[7px] font-bold text-atlas-white ${font}`}>
            Strategy comparison
          </div>
          <div className="overflow-hidden rounded border border-atlas-border bg-atlas-card">
            <div className="grid grid-cols-6 border-b border-atlas-border px-1.5 py-0.5">
              {["Strategy", "# Orders", "Volume", "Avg slip", "VWAP slip", "Fill %"].map(
                (h) => (
                  <span key={h} className={`text-[6px] text-atlas-gray-dark ${font}`}>
                    {h}
                  </span>
                ),
              )}
            </div>
            {[
              ["DIRECT", "2", "$417,557", "+0.01", "+0.01", "67.7%"],
              ["SOR", "1", "$236,015", "+2.65", "+2.65", "11.5%"],
            ].map(([s, ...vals], i) => (
              <div key={i} className="grid grid-cols-6 px-1.5 py-0.5">
                <span className={`text-[6px] font-semibold text-atlas-accent ${font}`}>
                  {s}
                </span>
                {vals.map((v, j) => (
                  <span
                    key={j}
                    className="text-[6px] text-atlas-offwhite"
                    style={{ fontFamily: "monospace" }}
                  >
                    {v}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className={`mt-2 mb-1 text-[7px] font-bold text-atlas-white ${font}`}>
            Slippage comparison (bps)
          </div>
          <div className="flex h-8 gap-1.5" style={{ alignItems: "flex-end" }}>
            {(
              [
                { l: "Mid-quote", v: 1.5, c: B.accent },
                { l: "VWAP", v: 0.4, c: B.green },
                { l: "Fill rate", v: -3.5, c: B.red },
                { l: "Pre-Trade Δ", v: 0, c: B.grayDark },
              ] as const
            ).map((b) => (
              <div key={b.l} className="flex-1 text-center">
                <div
                  className="rounded-sm opacity-70"
                  style={{
                    height: Math.abs(b.v) * 5 + 2,
                    background: b.c,
                    marginTop: b.v < 0 ? 0 : "auto",
                  }}
                />
                <div className={`mt-0.5 text-[5px] text-atlas-gray-dark ${font}`}>
                  {b.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrdersScreenMock() {
  const orders = [
    ["Apr 3, 6:08 PM", "ETH-USD", "BUY", "market", "Binance", "100.0000", "2054.82", "$205,482"],
    ["Apr 3, 6:07 PM", "ETH-USD", "BUY", "market", "OKX", "200.0000", "2056.05", "$212,075"],
    ["Apr 3, 6:05 PM", "ETH-USD", "BUY", "market", "MULTI", "1000.0000", "2057.38", "$236,014"],
  ];
  return (
    <div className="w-full text-[0]">
      <div className={`mb-2 text-[11px] font-bold text-atlas-white ${font}`}>
        Orders & Executions
      </div>
      <div className="mb-2 flex flex-wrap gap-1">
        {["Open Orders (0)", "Trades (5)", "Closed Orders (10)", "Positions", "Balances"].map(
          (t, i) => (
            <span
              key={t}
              className={`rounded px-2 py-0.5 text-[7px] font-semibold ${font} ${
                i === 1
                  ? "border border-atlas-accent/30 bg-[rgba(59,130,246,0.12)] text-atlas-accent"
                  : "border border-transparent text-atlas-gray-dark"
              }`}
            >
              {t}
            </span>
          ),
        )}
      </div>
      <div className="overflow-hidden rounded-md border border-atlas-border bg-atlas-card">
        <div className="grid grid-cols-[1.8fr_1fr_0.6fr_0.8fr_1fr_1fr_1fr_1.2fr] border-b border-atlas-border px-2 py-1">
          {["Time", "Product", "Side", "Type", "Exchange", "Filled", "Avg Price", "Est. notional"].map(
            (h) => (
              <span key={h} className={`text-[6px] font-semibold text-atlas-gray-dark ${font}`}>
                {h}
              </span>
            ),
          )}
        </div>
        {orders.map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-[1.8fr_1fr_0.6fr_0.8fr_1fr_1fr_1fr_1.2fr] border-b border-atlas-border/10 px-2 py-0.5"
          >
            {row.map((cell, j) => (
              <span
                key={j}
                className="text-[6.5px] text-atlas-offwhite"
                style={{
                  fontFamily: j === 0 ? "inherit" : "monospace",
                  color: j === 2 ? B.green : undefined,
                  fontWeight: j === 2 ? 700 : 400,
                }}
              >
                {cell}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function VenueAnalyticsMock() {
  return (
    <div className="w-full text-[0]">
      <div className={`mb-2 text-[11px] font-bold text-atlas-white ${font}`}>
        Exchange Information
      </div>
      <div className="mb-2.5 flex gap-2">
        <div>
          <svg width="65" height="65" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="22" fill="none" stroke={B.orange} strokeWidth="8" strokeDasharray="48 90" strokeDashoffset="0" />
            <circle cx="30" cy="30" r="22" fill="none" stroke={B.purple} strokeWidth="8" strokeDasharray="44 94" strokeDashoffset="-48" />
            <circle cx="30" cy="30" r="22" fill="none" stroke={B.green} strokeWidth="8" strokeDasharray="38 100" strokeDashoffset="-92" />
            <circle cx="30" cy="30" r="22" fill="none" stroke={B.cyan} strokeWidth="8" strokeDasharray="8 130" strokeDashoffset="-130" />
          </svg>
        </div>
        <div className="flex-1">
          {(
            [
              ["Binance", B.orange, "35.1%", "$229,103"],
              ["OKX", B.purple, "32.4%", "$212,075"],
              ["Kraken", B.green, "27.7%", "$181,300"],
              ["Coinbase", B.cyan, "4.8%", "$31,093"],
            ] as const
          ).map(([n, c, p, v]) => (
            <div key={n} className="mb-0.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-[1px]" style={{ background: c }} />
              <span className={`flex-1 text-[7px] text-atlas-gray ${font}`}>{n}</span>
              <span className="text-[7px] text-atlas-offwhite" style={{ fontFamily: "monospace" }}>
                {p}
              </span>
              <span className="text-[7px] text-atlas-offwhite" style={{ fontFamily: "monospace" }}>
                {v}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className={`mb-1 text-[8px] font-bold text-atlas-white ${font}`}>
        Group by instrument
      </div>
      <div className="overflow-hidden rounded-md border border-atlas-border bg-atlas-card">
        <div className="grid grid-cols-6 border-b border-atlas-border px-2 py-1">
          {["Instrument", "Exchange", "Side", "Exec qty", "Avg price", "Notional"].map((h) => (
            <span key={h} className={`text-[6px] font-semibold text-atlas-gray-dark ${font}`}>
              {h}
            </span>
          ))}
        </div>
        {[
          ["ETH-USD", "Binance", "buy", "111.486", "2,054.99", "$229,103"],
          ["ETH-USD", "Coinbase", "buy", "15.112", "2,057.41", "$31,093"],
          ["ETH-USD", "Kraken", "buy", "88.117", "2,057.49", "$181,300"],
          ["ETH-USD", "OKX", "buy", "103.147", "2,056.04", "$212,075"],
        ].map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-6 border-b border-atlas-border/10 px-2 py-0.5"
          >
            {row.map((c, j) => (
              <span
                key={j}
                className="text-[6.5px] text-atlas-offwhite"
                style={{
                  fontFamily: j <= 2 ? "inherit" : "monospace",
                  color: j === 2 ? B.green : j === 0 ? B.accent : undefined,
                  fontWeight: j === 0 ? 600 : 400,
                }}
              >
                {c}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
