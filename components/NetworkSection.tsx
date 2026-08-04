import Link from "next/link";
import { SectionHeading } from "./SectionHeading";
import { SectionLabel } from "./SectionLabel";

// The two-sided network, shown as the life of one directed order — not a logo
// wall. Every step below is built and working today (AtlasX -> DESK directed
// order round trip, tested end-to-end).
const STEPS = [
  {
    side: "AtlasX · buy side",
    color: "#3b82f6",
    t: "Order entered, routed direct to broker",
    d: "A fund's trader picks “Direct to broker” on the AtlasX ticket — same blotter, same analytics, broker execution.",
  },
  {
    side: "Atlas DESK · sell side",
    color: "#06b6d4",
    t: "The broker's rules engine decides",
    d: "In-policy flow auto-executes at the client's streamed, tiered price. Above-threshold orders go to the desk, held for a human.",
  },
  {
    side: "Atlas DESK · sell side",
    color: "#06b6d4",
    t: "The desk nets, crosses, and covers",
    d: "Opposing client flow crosses internally; the residual is covered in the market on the broker's own keys, best-ex across venues.",
  },
  {
    side: "AtlasX · buy side",
    color: "#3b82f6",
    t: "Fills stream back to the client",
    d: "Executions relay to the fund's own blotter in real time — with the same post-trade measurement applied to every fill.",
  },
];

export function NetworkSection() {
  return (
    <section
      id="network"
      className="px-[clamp(16px,4vw,56px)] py-[100px]"
      style={{ background: "#09090b" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-4 text-center">
          <SectionLabel>The Network</SectionLabel>
          <SectionHeading center>
            Two products. Both sides of the trade.
            <br />
            One engine.
          </SectionHeading>
          <p className="mx-auto mb-0 mt-4 max-w-[680px] text-[14.5px] leading-relaxed text-atlas-gray">
            A buy-side order on AtlasX can route straight to a broker running
            Atlas DESK — and both sides measure the trade with the same engine.
            This is not venue connectivity. It is the first execution network
            where both sides of the trade run on the same intelligence.
          </p>
        </div>

        <div className="relative mt-12 grid grid-cols-1 gap-4 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.t} className="relative">
              <div className="flex h-full flex-col rounded-[14px] border border-atlas-border bg-atlas-card p-5">
                <div
                  className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em]"
                  style={{ color: s.color }}
                >
                  {s.side}
                </div>
                <div className="font-display mb-2 text-[15px] font-bold leading-snug text-atlas-white">
                  {s.t}
                </div>
                <p className="m-0 text-[12.5px] leading-relaxed text-atlas-gray">
                  {s.d}
                </p>
              </div>
              {i < STEPS.length - 1 ? (
                <div className="absolute -right-3.5 top-1/2 hidden -translate-y-1/2 text-lg text-atlas-accent md:block">
                  →
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <p className="mb-0 mt-8 text-center text-[12px] text-atlas-gray-dark">
          Built and working today — the directed-order round trip runs
          end-to-end in the Atlas demo environment.{" "}
          <Link href="/atlasx" className="text-atlas-accent no-underline hover:underline">
            Explore AtlasX
          </Link>{" "}
          ·{" "}
          <Link href="/atlas-desk" className="text-atlas-accent no-underline hover:underline">
            Explore Atlas DESK
          </Link>
        </p>
      </div>
    </section>
  );
}
