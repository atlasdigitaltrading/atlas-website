// Illustrative Atlas TCA scorecard rendered from synthetic numbers. Nothing on
// this component comes from a client run: fills, venues, symbols and findings
// are invented, and the venues are anonymized on purpose. Markout convention:
// positive = cost to the aggressor.
const HEADLINE = [
  { k: "Orders", v: "18,420", s: "18,420 of 18,420 accepted" },
  { k: "Fills", v: "61,733", s: "61,733 of 61,733 accepted" },
  { k: "Notional", v: "$312.4M", s: "executed" },
  { k: "Arrival slippage", v: "+1.8 bps", s: "fee-inclusive · positive = cost" },
  { k: "Fills benchmarked", v: "98.7%", s: "of executions" },
  { k: "Validation", v: "3 findings", s: "0 rejects" },
];

const STRATEGIES: [string, number, number, number, number][] = [
  // name, spread, impact, timing, opportunity (bps)
  ["RFQ (block)", 0.6, 0.2, 0.0, 0.4],
  ["SOR · Neutral", 1.1, 0.6, 0.3, 0.2],
  ["Liquidity Seeker", 1.3, 0.8, 0.1, 0.1],
  ["TWAP", 0.9, 0.3, 0.9, 0.4],
  ["Direct · single venue", 1.5, 1.2, 0.2, 0.3],
];
const COMP_COLORS = ["#3b82f6", "#a78bfa", "#06b6d4", "#f59e0b"];
const COMP_NAMES = ["Spread", "Impact", "Timing", "Opportunity"];

const VENUES: [string, string, string, string, string, string, string][] = [
  // venue, fills, notional, wtd eff. spread, 1s, 5s, 1m
  ["Venue A", "19,840", "$104.2M", "+3.1", "+0.4", "+0.9", "+1.6"],
  ["Venue B", "14,215", "$78.6M", "+3.8", "+0.7", "+1.4", "+2.3"],
  ["Venue C", "11,902", "$61.9M", "+2.6", "+0.2", "+0.5", "+0.8"],
  ["Venue D", "8,377", "$36.1M", "+4.4", "+1.1", "+2.0", "+3.1"],
  ["Venue E", "4,960", "$21.3M", "+5.2", "+0.9", "+1.7", "+2.9"],
  ["Venue F", "2,439", "$10.3M", "+6.0", "+1.5", "+2.6", "+4.0"],
];

const SYMBOLS: [string, string, string, string][] = [
  ["BTC-USD", "6,210", "$148.7M", "+1.2"],
  ["ETH-USD", "4,980", "$81.3M", "+1.9"],
  ["SOL-USD", "3,105", "$42.6M", "+2.7"],
  ["XRP-USD", "2,410", "$24.1M", "+3.1"],
  ["DOGE-USD", "1,715", "$15.7M", "+3.6"],
];

const FINDINGS: [string, string][] = [
  ["Crossed or locked consolidated book at fill", "118"],
  ["Duplicate fill id (re-sent execution), skipped", "24"],
  ["Fill price outside consolidated band", "9"],
];

const th = "px-3 py-2 text-left text-[9.5px] font-bold uppercase tracking-[0.12em] text-atlas-gray-dark";
const td = "px-3 py-2 text-[12px] text-atlas-offwhite";

export function TcaScorecard() {
  return (
    <figure className="m-0">
      <div
        className="overflow-hidden rounded-[14px] border border-atlas-border shadow-[0_16px_50px_rgba(0,0,0,0.4),0_0_60px_rgba(167,139,250,0.14)]"
        style={{ background: "linear-gradient(135deg, #18181b 0%, #09090b 100%)" }}
      >
        {/* portal header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-atlas-border px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="font-display text-[13px] font-bold text-atlas-white">Atlas TCA</span>
            <span className="text-[11px] text-atlas-gray-dark">Execution Quality Scorecard</span>
          </div>
          <div className="flex items-center gap-3 text-[10.5px] text-atlas-gray-dark">
            <span>Run 2026-09-28</span>
            <span>·</span>
            <span>Digital assets · spot</span>
            <span>·</span>
            <span className="rounded border border-atlas-purple/40 px-1.5 py-0.5 text-atlas-purple">
              illustrative
            </span>
          </div>
        </div>

        {/* headline tiles */}
        <div className="grid grid-cols-2 gap-px border-b border-atlas-border bg-atlas-border sm:grid-cols-3 lg:grid-cols-6">
          {HEADLINE.map((h) => (
            <div key={h.k} className="bg-[#0f0f12] px-4 py-3">
              <div className="text-[9.5px] font-bold uppercase tracking-[0.12em] text-atlas-gray-dark">{h.k}</div>
              <div className="font-display mt-1 text-[18px] font-bold text-atlas-white">{h.v}</div>
              <div className="text-[10px] text-atlas-gray-dark">{h.s}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-px bg-atlas-border lg:grid-cols-[1fr_1.25fr]">
          {/* cost decomposition by strategy */}
          <div className="bg-[#0f0f12] p-5">
            <div className="mb-1 text-[11px] font-bold text-atlas-white">Cost decomposition by strategy</div>
            <div className="mb-4 text-[10.5px] text-atlas-gray-dark">
              Implementation shortfall vs arrival, notional-weighted, bps
            </div>
            <div className="flex flex-col gap-3">
              {STRATEGIES.map(([name, ...parts]) => {
                const total = parts.reduce((a, b) => a + b, 0);
                return (
                  <div key={name}>
                    <div className="mb-1 flex items-baseline justify-between text-[11px]">
                      <span className="text-atlas-offwhite">{name}</span>
                      <span className="font-semibold text-atlas-white">+{total.toFixed(1)}</span>
                    </div>
                    <div className="flex h-[9px] w-full overflow-hidden rounded-sm bg-[#18181b]">
                      {parts.map((p, i) => (
                        <div
                          key={i}
                          style={{ width: `${(p / 3.4) * 100}%`, background: COMP_COLORS[i] }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-atlas-gray-dark">
              {COMP_NAMES.map((n, i) => (
                <span key={n} className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-sm" style={{ background: COMP_COLORS[i] }} />
                  {n}
                </span>
              ))}
            </div>
          </div>

          {/* venue attribution */}
          <div className="overflow-x-auto bg-[#0f0f12] p-5">
            <div className="mb-1 text-[11px] font-bold text-atlas-white">Venue attribution</div>
            <div className="mb-3 text-[10.5px] text-atlas-gray-dark">
              Effective spread per fill and markout at three horizons, bps · positive = cost to the aggressor
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-atlas-border">
                  <th className={th}>Venue</th>
                  <th className={`${th} text-right`}>Fills</th>
                  <th className={`${th} text-right`}>Notional</th>
                  <th className={`${th} text-right`}>Eff. spread</th>
                  <th className={`${th} text-right`}>1s</th>
                  <th className={`${th} text-right`}>5s</th>
                  <th className={`${th} text-right`}>1m</th>
                </tr>
              </thead>
              <tbody>
                {VENUES.map((r) => (
                  <tr key={r[0]} className="border-b border-atlas-border/60">
                    <td className={`${td} font-semibold`}>{r[0]}</td>
                    {r.slice(1).map((c, i) => (
                      <td key={i} className={`${td} text-right tabular-nums ${i >= 3 ? "text-atlas-orange" : ""}`}>
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px border-t border-atlas-border bg-atlas-border lg:grid-cols-[1.25fr_1fr]">
          {/* by symbol */}
          <div className="overflow-x-auto bg-[#0f0f12] p-5">
            <div className="mb-1 text-[11px] font-bold text-atlas-white">By symbol</div>
            <div className="mb-3 text-[10.5px] text-atlas-gray-dark">
              Ranked by notional; slippage weighted by benchmarked notional
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-atlas-border">
                  <th className={th}>Symbol</th>
                  <th className={`${th} text-right`}>Orders</th>
                  <th className={`${th} text-right`}>Notional</th>
                  <th className={`${th} text-right`}>Arrival slippage (bps)</th>
                </tr>
              </thead>
              <tbody>
                {SYMBOLS.map((r) => (
                  <tr key={r[0]} className="border-b border-atlas-border/60">
                    <td className={`${td} font-semibold text-atlas-accent`}>{r[0]}</td>
                    <td className={`${td} text-right tabular-nums`}>{r[1]}</td>
                    <td className={`${td} text-right tabular-nums`}>{r[2]}</td>
                    <td className={`${td} text-right tabular-nums text-atlas-orange`}>{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* validation */}
          <div className="bg-[#0f0f12] p-5">
            <div className="mb-1 text-[11px] font-bold text-atlas-white">Data validation</div>
            <div className="mb-3 text-[10.5px] text-atlas-gray-dark">
              Findings are flags on measured rows, not rejections
            </div>
            <div className="flex flex-col gap-2">
              {FINDINGS.map(([f, n]) => (
                <div key={f} className="flex items-center justify-between gap-3 rounded-md border border-atlas-border px-3 py-2">
                  <span className="text-[11.5px] text-atlas-offwhite">{f}</span>
                  <span className="rounded bg-atlas-card px-2 py-0.5 text-[11px] font-semibold tabular-nums text-atlas-white">{n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-1">
        <span className="text-xs text-atlas-gray">
          The scorecard a desk receives: headline, cost decomposition, venue attribution, per-symbol view, and the validation report
        </span>
        <span className="text-[10px] text-atlas-gray-darker">
          Shown: illustrative output on synthetic fills · venues anonymized
        </span>
      </figcaption>
    </figure>
  );
}
