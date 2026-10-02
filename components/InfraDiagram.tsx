// The two integration models, rebuilt from the Platform Overview diagrams as
// responsive dark-theme markup rather than flat images, so they stay crisp and
// readable down to phone width.
const GREEN = "#22c55e";

function Node({
  title,
  lines,
  tag,
  accent,
}: {
  title: string;
  lines?: string[];
  tag?: string;
  accent?: boolean;
}) {
  return (
    <div
      className="rounded-lg border p-3.5"
      style={{
        borderColor: accent ? GREEN : "#27272a",
        background: accent ? "rgba(34,197,94,0.08)" : "#18181b",
      }}
    >
      <div
        className="font-display text-[13px] font-bold leading-snug"
        style={{ color: accent ? GREEN : "#f1f5f9" }}
      >
        {title}
        {tag ? (
          <span className="ml-2 align-middle text-[9.5px] font-bold uppercase tracking-[0.1em] text-atlas-gray-dark">
            {tag}
          </span>
        ) : null}
      </div>
      {lines?.length ? (
        <div className="mt-1.5 flex flex-col gap-0.5">
          {lines.map((l) => (
            <span key={l} className="text-[11.5px] leading-snug text-atlas-gray">
              {l}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Zone({
  label,
  accent,
  children,
  className = "",
}: {
  label: string;
  accent?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-xl border border-dashed p-4 pt-5 ${className}`}
      style={{ borderColor: accent ? "rgba(34,197,94,0.45)" : "#3f3f46" }}
    >
      <div
        className="absolute -top-[9px] left-4 bg-atlas-bg px-2 text-[9.5px] font-bold uppercase tracking-[0.14em]"
        style={{ color: accent ? GREEN : "#64748b" }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function Wire({ children, dashed }: { children: React.ReactNode; dashed?: boolean }) {
  return (
    <div className="flex items-center gap-2 py-1">
      <span
        className="h-px flex-1"
        style={{
          background: dashed
            ? "repeating-linear-gradient(90deg,#3f3f46 0 5px,transparent 5px 10px)"
            : "#3f3f46",
        }}
      />
      <span className="whitespace-nowrap text-[10px] text-atlas-gray-dark">{children}</span>
      <span
        className="h-px flex-1"
        style={{
          background: dashed
            ? "repeating-linear-gradient(90deg,#3f3f46 0 5px,transparent 5px 10px)"
            : "#3f3f46",
        }}
      />
    </div>
  );
}

export function OptionADiagram() {
  return (
    <div className="rounded-[14px] border border-atlas-border bg-[#0f0f12] p-5 sm:p-7">
      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <Zone label="Your platform · unchanged">
          <div className="flex flex-col gap-2.5">
            <Node title="Front ends" lines={["Desktop · web · mobile · API clients"]} />
            <Node
              title="Your OMS"
              lines={["Order management · pre-trade risk", "Compliance and reporting"]}
            />
            <Node
              title="Risk & margin"
              lines={["Your existing risk layer, fed by Atlas positions"]}
            />
            <Node
              title="Existing venues"
              lines={["Equities, options, futures", "Routing exactly as today, untouched"]}
            />
          </div>
        </Zone>

        {/* connector */}
        <div className="flex flex-col items-center justify-center gap-2 lg:w-[150px] lg:gap-3">
          <div className="text-center text-[10px] text-atlas-gray-dark">
            digital-asset orders
          </div>
          <div
            className="rounded-lg border px-4 py-2.5 text-center"
            style={{ borderColor: "rgba(34,197,94,0.45)", background: "rgba(34,197,94,0.06)" }}
          >
            <div className="font-display text-[13px] font-bold" style={{ color: GREEN }}>
              FIX 4.4
            </div>
            <div className="text-[10.5px] text-atlas-gray-dark">REST / WS</div>
          </div>
          <div className="text-center text-[10px] leading-snug text-atlas-gray-dark">
            execution reports · drop-copy · position feed
          </div>
        </div>

        <Zone label="Atlas · added, Atlas-hosted" accent>
          <div className="flex flex-col gap-2.5">
            <Node
              title="Atlas execution engine"
              accent
              lines={[
                "Smart Order Router · 8 algorithms",
                "RFQ block liquidity · order manager and risk limits",
                "Firm-specific calibration: models trained on each client's own flow",
              ]}
            />
            <Node
              title="Execution intelligence"
              lines={["Pre-trade cost model · post-trade TCA · markouts"]}
            />
            <Node
              title="Digital-asset venues"
              lines={["16+ CEX and DEX · spot, perps, options"]}
            />
            <Node
              title="Client custody & venue accounts"
              lines={["Assets remain with the client's own venue and custody relationships"]}
            />
          </div>
        </Zone>
      </div>
      <div className="mt-4 border-t border-atlas-border pt-3 text-[11px] text-atlas-gray-dark">
        Your stack is untouched. Only digital-asset orders cross the boundary, and
        everything Atlas does comes back as execution reports, drop-copy, and positions.
      </div>
    </div>
  );
}

export function OptionBDiagram() {
  return (
    <div className="rounded-[14px] border border-atlas-border bg-[#0f0f12] p-5 sm:p-7">
      <Zone label="Your platform">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.45fr_1fr]">
          {/* OMS column */}
          <div className="flex flex-col gap-2.5">
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <Node title="Risk & margin" lines={["Your existing risk layer, fed by Atlas positions"]} />
              <Node title="Trade reporting" lines={["Clearing files and compliance reporting"]} />
            </div>
            <Wire>positions ⇅ reporting</Wire>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-[auto_1fr] sm:items-center">
              <Node title="Front ends" lines={["Desktop · web · mobile · API clients"]} />
              <Node
                title="Your OMS"
                lines={[
                  "Order management · pre-trade risk · compliance and reporting",
                  "Routing and algorithm decisions delegated to the Atlas engine below",
                ]}
              />
            </div>
            <Wire dashed>routing + algo decisions ⇅ order history</Wire>
            <Zone label="Atlas · deployed inside your environment" accent>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <Node
                  title="Atlas execution engine"
                  accent
                  lines={[
                    "Smart Order Router",
                    "TWAP · VWAP · POV · IS · Iceberg · Pegged",
                    "Pre-trade cost model, post-trade TCA, markouts",
                    "Firm-specific calibration loop · order manager and risk limits",
                  ]}
                />
                <Node
                  title="Atlas TCA engine"
                  accent
                  lines={[
                    "Post-trade measurement on the OMS's own order history, every asset class",
                    "Warehouse extract · REST API · your portal",
                  ]}
                />
              </div>
            </Zone>
          </div>

          {/* connectivity column */}
          <div className="flex flex-col gap-2.5">
            <Node
              title="Exchange manager"
              tag="your connectivity"
              lines={["US equities · options · futures"]}
            />
            <Node
              title="Execution destinations"
              lines={["US equities, options, futures: your existing venues"]}
            />
            <div className="h-1" />
            <Node
              title="Exchange manager"
              tag="live today"
              lines={["Digital assets, where you have no connectivity"]}
            />
            <Node
              title="Execution destinations"
              lines={["Digital assets: 16+ CEX and DEX venues, non-custodial"]}
            />
          </div>
        </div>
      </Zone>
      <div className="mt-4 border-t border-atlas-border pt-3 text-[11px] text-atlas-gray-dark">
        Nothing leaves your perimeter. The OMS keeps the order and its exchange
        managers; the Atlas engines run beneath it and render results in your own portal.
      </div>
    </div>
  );
}
