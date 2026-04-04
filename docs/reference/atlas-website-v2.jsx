import { useState, useEffect, useRef } from "react";

// ─── BRAND SYSTEM ───
const B = {
  bg: "#09090b",
  bgAlt: "#0f0f12",
  card: "#18181b",
  cardHover: "#1f1f23",
  border: "#27272a",
  borderHover: "rgba(59,130,246,0.35)",
  accent: "#3b82f6",
  accentLight: "#60a5fa",
  accentDim: "rgba(59,130,246,0.12)",
  accentGlow: "rgba(59,130,246,0.25)",
  white: "#f1f5f9",
  offwhite: "#e2e8f0",
  gray: "#94a3b8",
  grayDark: "#64748b",
  grayDarker: "#475569",
  green: "#22c55e",
  red: "#ef4444",
  orange: "#f59e0b",
  purple: "#a78bfa",
  cyan: "#06b6d4",
};

const font = "'DM Sans', sans-serif";
const fontDisplay = "'Instrument Sans', 'DM Sans', sans-serif";

// ─── LOGO ───
function Logo({ size = 24 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <polygon points="20,2 38,34 2,34" fill="none" stroke={B.accent} strokeWidth="2.5" />
        <polygon points="20,12 30,30 10,30" fill={B.accent} opacity="0.2" />
        <line x1="20" y1="2" x2="20" y2="30" stroke={B.accent} strokeWidth="1.5" opacity="0.4" />
        <line x1="10" y1="30" x2="30" y2="30" stroke={B.accent} strokeWidth="1.5" opacity="0.4" />
      </svg>
      <span style={{
        fontSize: size * 0.68, fontFamily: fontDisplay, fontWeight: 700,
        color: B.white, letterSpacing: "0.12em", textTransform: "uppercase",
      }}>Atlas</span>
    </div>
  );
}

// ─── ANIMATED COUNTER ───
function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGo(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!go) return;
    let v = 0;
    const step = end / (duration / 16);
    const t = setInterval(() => { v += step; if (v >= end) { setCount(end); clearInterval(t); } else setCount(Math.floor(v)); }, 16);
    return () => clearInterval(t);
  }, [go, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── SECTION LABEL ───
function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 12, color: B.accent, fontFamily: font, fontWeight: 700,
      letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16,
    }}>{children}</div>
  );
}

// ─── SECTION HEADING ───
function SectionHeading({ children, center }) {
  return (
    <h2 style={{
      fontSize: "clamp(28px, 3.5vw, 48px)", fontFamily: fontDisplay,
      fontWeight: 800, color: B.white, lineHeight: 1.1, margin: 0,
      letterSpacing: "-0.025em", textAlign: center ? "center" : "left",
    }}>{children}</h2>
  );
}

// ─── NAVBAR ───
function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const nav = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const linkStyle = {
    color: B.grayDark, fontSize: 13, fontFamily: font, fontWeight: 500,
    textDecoration: "none", cursor: "pointer", transition: "color 0.2s",
    letterSpacing: "0.01em",
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(9,9,11,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${B.border}` : "1px solid transparent",
      transition: "all 0.3s", padding: "0 clamp(16px, 4vw, 56px)",
    }}>
      <div style={{
        maxWidth: 1260, margin: "0 auto", display: "flex",
        alignItems: "center", justifyContent: "space-between", height: 68,
      }}>
        <Logo />
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {[
            ["Platform", "platform"], ["Solutions", "solutions"],
            ["Clients", "clients"], ["Why Atlas", "why-atlas"], ["Insights", "blog"],
          ].map(([label, id]) => (
            <span key={id} style={linkStyle} onClick={() => nav(id)}
              onMouseEnter={e => e.target.style.color = B.accent}
              onMouseLeave={e => e.target.style.color = B.grayDark}>
              {label}
            </span>
          ))}
          <span onClick={() => nav("demo")} style={{
            background: B.accent, color: "#fff", padding: "9px 22px", borderRadius: 6,
            fontSize: 13, fontWeight: 700, fontFamily: font, cursor: "pointer",
            transition: "all 0.2s", letterSpacing: "0.01em",
          }}
            onMouseEnter={e => { e.target.style.background = B.accentLight; e.target.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.target.style.background = B.accent; e.target.style.transform = "none"; }}>
            Book a Demo
          </span>
        </div>
      </div>
    </nav>
  );
}

// ─── HERO ───
function Hero() {
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 100); }, []);

  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center",
      padding: "120px clamp(16px, 4vw, 56px) 80px",
      background: `radial-gradient(ellipse 80% 50% at 50% 20%, ${B.accentDim} 0%, transparent 50%), ${B.bg}`,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(${B.accent}06 1px, transparent 1px), linear-gradient(90deg, ${B.accent}06 1px, transparent 1px)`,
        backgroundSize: "56px 56px",
        maskImage: "radial-gradient(ellipse 65% 65% at 50% 40%, black 15%, transparent 65%)",
        WebkitMaskImage: "radial-gradient(ellipse 65% 65% at 50% 40%, black 15%, transparent 65%)",
      }} />

      <div style={{
        maxWidth: 880, textAlign: "center", position: "relative", zIndex: 1,
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          background: B.accentDim, border: `1px solid ${B.accent}30`,
          borderRadius: 100, padding: "5px 14px", marginBottom: 28,
          fontSize: 12, color: B.accent, fontFamily: font, fontWeight: 600,
          letterSpacing: "0.03em",
        }}>
          <span style={{
            width: 5, height: 5, borderRadius: "50%", background: B.accent,
            boxShadow: `0 0 8px ${B.accent}`, animation: "pulse 2s infinite",
          }} />
          Now Live — Design Partner Program
        </div>

        <h1 style={{
          fontSize: "clamp(38px, 5.2vw, 68px)", fontFamily: fontDisplay,
          fontWeight: 800, color: B.white, lineHeight: 1.08, margin: "0 0 24px 0",
          letterSpacing: "-0.03em",
        }}>
          Institutional{" "}
          <span style={{ color: B.accent }}>Execution</span>
          <br />for Digital Assets
        </h1>

        <p style={{
          fontSize: "clamp(15px, 1.4vw, 18px)", fontFamily: font,
          color: B.gray, lineHeight: 1.7, maxWidth: 660, margin: "0 auto 36px",
        }}>
          The institutional execution infrastructure for digital assets: Smart Order Routing,
          Execution Algorithms, and Pre-trade/Post-Trade Transaction Cost Analysis (TCA) —
          unified in a single platform.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#demo" style={{
            background: B.accent, color: "#fff", padding: "13px 30px", borderRadius: 7,
            fontSize: 15, fontWeight: 700, fontFamily: font, textDecoration: "none",
            boxShadow: `0 0 30px ${B.accentGlow}`, transition: "all 0.2s",
          }}>Book a Demo →</a>
          <a href="#platform" style={{
            background: "transparent", color: B.white, padding: "13px 30px", borderRadius: 7,
            fontSize: 15, fontWeight: 600, fontFamily: font, textDecoration: "none",
            border: `1px solid ${B.border}`, transition: "all 0.2s",
          }}>See the Platform</a>
        </div>

        <div style={{
          display: "flex", justifyContent: "center", gap: "clamp(28px, 5vw, 60px)",
          marginTop: 56, paddingTop: 36, borderTop: `1px solid ${B.border}`,
        }}>
          {[
            { v: 10, s: "+", l: "Connected Exchanges" },
            { v: 3, s: "", l: "Execution Modes" },
            { v: 25, s: "+", l: "Years TradFi Expertise" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "clamp(26px, 2.8vw, 38px)", fontWeight: 800,
                fontFamily: fontDisplay, color: B.accent, letterSpacing: "-0.02em",
              }}><Counter end={s.v} suffix={s.s} /></div>
              <div style={{ fontSize: 12, color: B.grayDarker, fontFamily: font, marginTop: 4, fontWeight: 500 }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PLATFORM SHOWCASE ───
function Platform() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      label: "Trading",
      desc: "Multi-venue price charts with real-time data from Binance, Coinbase, Kraken, OKX and more. Consolidated order book (CLOB) aggregates liquidity across all venues. Smart Order Router with Aggressive, Passive, and Neutral execution modes. Full order ticket with market, limit, and stop-limit order types.",
      features: ["Multi-venue price charts & order books", "Consolidated Limit Order Book (CLOB)", "Smart Order Router (SOR) with 3 execution modes", "Real-time trade history across all venues", "Standard & TWAP execution strategies"],
      imgIndex: 0,
    },
    {
      label: "Pre-Trade Analytics",
      desc: "Comprehensive pre-trade cost estimation powered by Almgren-Chriss impact models. Analyze spread, temporary impact, book depth walk, timing risk, and opportunity cost — broken down by basis points and USD. Includes per-venue 24h volume data and illustrative execution schedules for TWAP orders.",
      features: ["Almgren-Chriss cost decomposition", "Per-venue volume & ADV analysis", "Trade difficulty assessment", "Illustrative execution schedule", "Multi-venue constraint selection"],
      imgIndex: 1,
    },
    {
      label: "Post-Trade TCA",
      desc: "Post-trade Transaction Cost Analysis with implementation shortfall decomposition, strategy comparison (Direct vs SOR vs TWAP), venue volume mix visualization, and slippage benchmarking. Drill into order-level detail with full execution audit trails.",
      features: ["Strategy comparison (Direct / SOR / TWAP)", "Venue volume breakdown with drill-down", "Slippage comparison charts (bps)", "VWAP slippage benchmarking", "Exchange-level execution detail"],
      imgIndex: 2,
    },
    {
      label: "Orders & Execution",
      desc: "Complete order lifecycle management with real-time fill tracking, parent/child order relationships, multi-exchange execution detail, and full audit trail. View trades, closed orders, balances, positions, and cancelled orders in one unified blotter.",
      features: ["Real-time fill tracking across venues", "Parent/child order relationships", "Multi-exchange execution routing", "Full order lifecycle audit trail", "Trade history with venue attribution"],
      imgIndex: 3,
    },
    {
      label: "Venue Analytics",
      desc: "Post-trade venue analysis showing volume distribution across exchanges, per-instrument execution metrics, and average price comparisons. Understand where your liquidity is sourced and optimize venue selection for future trades.",
      features: ["Volume distribution by venue", "Per-instrument execution metrics", "Average price comparison by exchange", "Venue selection optimization data", "Time-filtered analysis (7d/30d/MTD/YTD)"],
      imgIndex: 4,
    },
  ];

  const screenshots = [
    "Trading view — multi-venue charts, order books, CLOB, order ticket, trade history",
    "Pre-Trade analytics — cost estimation with execution schedule",
    "Post-Trade TCA — strategy comparison, venue mix, slippage",
    "Orders & Executions — fill tracking, multi-exchange routing",
    "Exchange Information — venue volume, per-instrument detail",
  ];

  return (
    <section id="platform" style={{ padding: "100px clamp(16px, 4vw, 56px)", background: B.bg }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionLabel>The Platform</SectionLabel>
        <SectionHeading>
          One platform for the<br />entire trade lifecycle
        </SectionHeading>

        <div style={{
          display: "flex", gap: 3, marginTop: 40, marginBottom: 36,
          background: `${B.card}cc`, borderRadius: 9, padding: 3,
          border: `1px solid ${B.border}`, width: "fit-content", flexWrap: "wrap",
        }}>
          {tabs.map((t, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{
              padding: "8px 18px", borderRadius: 7,
              background: activeTab === i ? B.accentDim : "transparent",
              color: activeTab === i ? B.accent : B.grayDark,
              border: activeTab === i ? `1px solid ${B.accent}30` : "1px solid transparent",
              fontSize: 13, fontWeight: 600, fontFamily: font,
              cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
            }}>{t.label}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 40, alignItems: "start" }}>
          <div>
            <h3 style={{
              fontSize: 26, fontWeight: 700, color: B.white, fontFamily: fontDisplay,
              margin: "0 0 14px 0", letterSpacing: "-0.01em",
            }}>{tabs[activeTab].label}</h3>
            <p style={{
              fontSize: 15, color: B.gray, lineHeight: 1.7, fontFamily: font, margin: "0 0 28px 0",
            }}>{tabs[activeTab].desc}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {tabs[activeTab].features.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: B.offwhite, fontFamily: font }}>
                  <span style={{
                    width: 18, height: 18, borderRadius: 4, background: B.accentDim, flexShrink: 0, marginTop: 2,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, color: B.accent, fontWeight: 700,
                  }}>✓</span>
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Screenshot area */}
          <div style={{
            background: `linear-gradient(135deg, ${B.card} 0%, ${B.bg} 100%)`,
            borderRadius: 14, border: `1px solid ${B.border}`,
            padding: 16,
            boxShadow: `0 16px 50px rgba(0,0,0,0.4), 0 0 60px ${B.accentGlow}`,
            position: "relative", overflow: "hidden",
          }}>
            {/* Simulated screenshot header bar */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "6px 10px", background: `${B.accent}08`, borderRadius: 7, marginBottom: 10,
            }}>
              <span style={{ color: B.accent, fontSize: 11, fontWeight: 700, fontFamily: font }}>Atlas EMS</span>
              <div style={{ display: "flex", gap: 4 }}>
                {["Account", "Pre-Trade", "Trading", "Post-Trade", "Portfolio", "Margin", "Allocation"].map((t, i) => {
                  const isActive = (activeTab === 0 && i === 2) || (activeTab === 1 && i === 1) ||
                    (activeTab >= 2 && activeTab <= 4 && i === 3) ;
                  return (
                    <span key={t} style={{
                      padding: "3px 8px", borderRadius: 3,
                      background: isActive ? B.accent : "transparent",
                      color: isActive ? "#fff" : B.grayDark,
                      fontSize: 8, fontWeight: 600, fontFamily: font,
                      border: isActive ? "none" : `1px solid ${B.border}`,
                    }}>{t}</span>
                  );
                })}
              </div>
            </div>

            {/* Screenshot content area */}
            <div style={{
              background: B.bg, borderRadius: 8, border: `1px solid ${B.border}`,
              minHeight: 320, display: "flex", flexDirection: "column",
              justifyContent: "center", alignItems: "center", padding: 24, gap: 12,
              position: "relative",
            }}>
              {/* Render a faithful approximation of each screenshot */}
              {activeTab === 0 && <TradingScreenMock />}
              {activeTab === 1 && <PreTradeScreenMock />}
              {activeTab === 2 && <PostTradeTCAMock />}
              {activeTab === 3 && <OrdersScreenMock />}
              {activeTab === 4 && <VenueAnalyticsMock />}
            </div>

            <div style={{
              textAlign: "center", marginTop: 10,
              fontSize: 10, color: B.grayDarker, fontFamily: font, fontStyle: "italic",
            }}>
              {screenshots[activeTab]}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SCREEN MOCKS (faithful recreations from the actual screenshots) ───

function TradingScreenMock() {
  const venues = ["Binance", "Coinbase", "Kraken", "OKX", "CLOB"];
  return (
    <div style={{ width: "100%", fontSize: 0 }}>
      {/* Price charts row */}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${venues.length}, 1fr)`, gap: 4, marginBottom: 4 }}>
        {venues.map((v, i) => (
          <div key={v} style={{ background: B.card, borderRadius: 6, border: `1px solid ${B.border}`, padding: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 7, color: B.gray, fontFamily: font }}>{v}</span>
              <span style={{ fontSize: 7, color: B.accent, fontFamily: "monospace" }}>${(2050 + i * 0.5).toFixed(2)}</span>
            </div>
            <svg viewBox="0 0 100 24" style={{ width: "100%", height: 20 }}>
              <polyline points={`0,${18-i} 20,${16-i*0.5} 40,${19-i} 60,${14-i*0.3} 80,${12+i*0.5} 100,${8+i}`}
                fill="none" stroke={B.accent} strokeWidth="1.2" opacity="0.7" />
            </svg>
          </div>
        ))}
      </div>
      {/* Order books row */}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${venues.length}, 1fr)`, gap: 4 }}>
        {venues.map((v, i) => (
          <div key={v} style={{ background: B.card, borderRadius: 6, border: `1px solid ${B.border}`, padding: 5 }}>
            <div style={{ fontSize: 6, color: B.grayDark, fontFamily: font, marginBottom: 2 }}>Order Book — {v}</div>
            {[0,1,2].map(j => (
              <div key={j} style={{ display: "flex", justifyContent: "space-between", fontSize: 6, fontFamily: "monospace", color: B.red, padding: "0.5px 0" }}>
                <span>{(2051 - j * 0.03).toFixed(2)}</span>
                <span style={{ color: B.grayDarker }}>{(0.5 + j * 0.3 + i * 0.1).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ fontSize: 5, color: B.green, fontFamily: font, padding: "1px 0", textAlign: "center" }}>Spread: 0.01</div>
            {[0,1,2].map(j => (
              <div key={j} style={{ display: "flex", justifyContent: "space-between", fontSize: 6, fontFamily: "monospace", color: B.green, padding: "0.5px 0" }}>
                <span>{(2050.9 - j * 0.03).toFixed(2)}</span>
                <span style={{ color: B.grayDarker }}>{(1.2 + j * 0.5 + i * 0.2).toFixed(2)}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function PreTradeScreenMock() {
  return (
    <div style={{ width: "100%", fontSize: 0 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: B.white, fontFamily: font, marginBottom: 8 }}>Pre-Trade Analytics</div>
      <div style={{ display: "flex", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
        {["BTC-USD", "Buy", "Notional USD", "$10,000,000", "Medium"].map((t, i) => (
          <span key={i} style={{
            padding: "3px 8px", borderRadius: 4, fontSize: 8, fontFamily: font, fontWeight: 600,
            background: i < 3 ? B.accentDim : B.card, color: i < 3 ? B.accent : B.gray,
            border: `1px solid ${i < 3 ? B.accent + "30" : B.border}`,
          }}>{t}</span>
        ))}
      </div>
      <div style={{ fontSize: 8, fontWeight: 700, color: B.white, fontFamily: font, marginBottom: 6 }}>Pre-trade cost estimator</div>
      <div style={{ background: B.card, borderRadius: 6, border: `1px solid ${B.border}`, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", padding: "4px 8px", borderBottom: `1px solid ${B.border}` }}>
          {["Component", "bps", "USD (est.)"].map(h => (
            <span key={h} style={{ fontSize: 7, color: B.grayDark, fontFamily: font, fontWeight: 600 }}>{h}</span>
          ))}
        </div>
        {[
          ["Spread", "0.0075", "$7.48"],
          ["Temporary impact", "0.1588", "$158.81"],
          ["Book depth walk", "0", "$0.00"],
          ["Timing risk", "0.1313", "$131.25"],
          ["Opportunity cost", "0.1582", "$158.16"],
        ].map(([c, b, u], i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", padding: "3px 8px", borderBottom: `1px solid ${B.border}22` }}>
            <span style={{ fontSize: 7, color: B.gray, fontFamily: font }}>{c}</span>
            <span style={{ fontSize: 7, color: B.offwhite, fontFamily: "monospace" }}>{b}</span>
            <span style={{ fontSize: 7, color: B.offwhite, fontFamily: "monospace" }}>{u}</span>
          </div>
        ))}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", padding: "4px 8px", background: `${B.accent}08` }}>
          <span style={{ fontSize: 7, color: B.accent, fontFamily: font, fontWeight: 700 }}>Total implicit</span>
          <span style={{ fontSize: 7, color: B.accent, fontFamily: "monospace", fontWeight: 700 }}>0.4557</span>
          <span style={{ fontSize: 7, color: B.accent, fontFamily: "monospace", fontWeight: 700 }}>$455.70</span>
        </div>
      </div>
      {/* Execution schedule bar chart */}
      <div style={{ marginTop: 8, fontSize: 8, fontWeight: 700, color: B.white, fontFamily: font, marginBottom: 4 }}>Execution schedule (illustrative)</div>
      <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 40 }}>
        {[0.6,0.8,0.9,1,1,1,1,0.95,0.9,0.85,0.7,0.5].map((h, i) => (
          <div key={i} style={{
            flex: 1, height: `${h * 100}%`, background: B.accent, opacity: 0.5 + h * 0.3,
            borderRadius: "2px 2px 0 0",
          }} />
        ))}
      </div>
    </div>
  );
}

function PostTradeTCAMock() {
  return (
    <div style={{ width: "100%", fontSize: 0 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: B.white, fontFamily: font, marginBottom: 8 }}>Post-Trade TCA</div>
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        {[["Volume", "$653,572"], ["Parent orders", "3"], ["Fills", "501"], ["Avg slippage", "+1.55 bps"], ["Fill rate", "1.3%"], ["Avg exec span", "2394 ms"]].map(([l, v], i) => (
          <div key={i} style={{ background: B.card, borderRadius: 5, border: `1px solid ${B.border}`, padding: "5px 8px", flex: 1 }}>
            <div style={{ fontSize: 6, color: B.grayDark, fontFamily: font }}>{l}</div>
            <div style={{ fontSize: 9, color: B.white, fontFamily: font, fontWeight: 700 }}>{v}</div>
          </div>
        ))}
      </div>
      {/* Venue donut + Strategy table */}
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 12 }}>
        <div>
          <div style={{ fontSize: 7, fontWeight: 700, color: B.white, fontFamily: font, marginBottom: 4 }}>Venue volume</div>
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="22" fill="none" stroke={B.orange} strokeWidth="8" strokeDasharray="50 88" strokeDashoffset="0" />
            <circle cx="30" cy="30" r="22" fill="none" stroke={B.purple} strokeWidth="8" strokeDasharray="44 94" strokeDashoffset="-50" />
            <circle cx="30" cy="30" r="22" fill="none" stroke={B.green} strokeWidth="8" strokeDasharray="38 100" strokeDashoffset="-94" />
            <circle cx="30" cy="30" r="22" fill="none" stroke={B.cyan} strokeWidth="8" strokeDasharray="6 132" strokeDashoffset="-132" />
          </svg>
          <div style={{ marginTop: 4 }}>
            {[["Binance", B.orange, "35.1%"], ["OKX", B.purple, "32.4%"], ["Kraken", B.green, "27.7%"], ["Coinbase", B.cyan, "4.8%"]].map(([n, c, p]) => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 1 }}>
                <span style={{ width: 5, height: 5, borderRadius: 1, background: c }} />
                <span style={{ fontSize: 6, color: B.gray, fontFamily: font }}>{n} {p}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 7, fontWeight: 700, color: B.white, fontFamily: font, marginBottom: 4 }}>Strategy comparison</div>
          <div style={{ background: B.card, borderRadius: 5, border: `1px solid ${B.border}`, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr 1fr", padding: "3px 6px", borderBottom: `1px solid ${B.border}` }}>
              {["Strategy", "# Orders", "Volume", "Avg slip", "VWAP slip", "Fill %"].map(h => (
                <span key={h} style={{ fontSize: 6, color: B.grayDark, fontFamily: font }}>{h}</span>
              ))}
            </div>
            {[["DIRECT", "2", "$417,557", "+0.01", "+0.01", "67.7%"], ["SOR", "1", "$236,015", "+2.65", "+2.65", "11.5%"]].map(([s, ...vals], i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr 1fr", padding: "3px 6px" }}>
                <span style={{ fontSize: 6, color: B.accent, fontFamily: font, fontWeight: 600 }}>{s}</span>
                {vals.map((v, j) => (
                  <span key={j} style={{ fontSize: 6, color: B.offwhite, fontFamily: "monospace" }}>{v}</span>
                ))}
              </div>
            ))}
          </div>
          {/* Slippage bars */}
          <div style={{ marginTop: 8, fontSize: 7, fontWeight: 700, color: B.white, fontFamily: font, marginBottom: 4 }}>Slippage comparison (bps)</div>
          <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 30 }}>
            {[{ l: "Mid-quote", v: 1.5, c: B.accent }, { l: "VWAP", v: 0.4, c: B.green }, { l: "Fill rate", v: -3.5, c: B.red }, { l: "Pre-Trade Δ", v: 0, c: B.grayDark }].map((b, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div style={{
                  height: Math.abs(b.v) * 5 + 2, background: b.c, borderRadius: 2,
                  marginTop: b.v < 0 ? 0 : "auto", opacity: 0.7,
                }} />
                <div style={{ fontSize: 5, color: B.grayDark, fontFamily: font, marginTop: 2 }}>{b.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function OrdersScreenMock() {
  const orders = [
    ["Apr 3, 6:08 PM", "ETH-USD", "BUY", "market", "Binance", "100.0000", "2054.82", "$205,482"],
    ["Apr 3, 6:07 PM", "ETH-USD", "BUY", "market", "OKX", "200.0000", "2056.05", "$212,075"],
    ["Apr 3, 6:05 PM", "ETH-USD", "BUY", "market", "MULTI", "1000.0000", "2057.38", "$236,014"],
  ];
  return (
    <div style={{ width: "100%", fontSize: 0 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: B.white, fontFamily: font, marginBottom: 8 }}>Orders & Executions</div>
      <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
        {["Open Orders (0)", "Trades (5)", "Closed Orders (10)", "Positions", "Balances"].map((t, i) => (
          <span key={t} style={{
            padding: "3px 8px", borderRadius: 4, fontSize: 7, fontFamily: font, fontWeight: 600,
            background: i === 1 ? B.accentDim : "transparent", color: i === 1 ? B.accent : B.grayDark,
            border: `1px solid ${i === 1 ? B.accent + "30" : "transparent"}`,
          }}>{t}</span>
        ))}
      </div>
      <div style={{ background: B.card, borderRadius: 6, border: `1px solid ${B.border}`, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 0.6fr 0.8fr 1fr 1fr 1fr 1.2fr", padding: "4px 8px", borderBottom: `1px solid ${B.border}` }}>
          {["Time", "Product", "Side", "Type", "Exchange", "Filled", "Avg Price", "Est. notional"].map(h => (
            <span key={h} style={{ fontSize: 6, color: B.grayDark, fontFamily: font, fontWeight: 600 }}>{h}</span>
          ))}
        </div>
        {orders.map((row, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 0.6fr 0.8fr 1fr 1fr 1fr 1.2fr", padding: "3px 8px", borderBottom: `1px solid ${B.border}11` }}>
            {row.map((cell, j) => (
              <span key={j} style={{
                fontSize: 6.5, fontFamily: j === 0 ? font : "monospace",
                color: j === 2 ? B.green : B.offwhite,
                fontWeight: j === 2 ? 700 : 400,
              }}>{cell}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function VenueAnalyticsMock() {
  return (
    <div style={{ width: "100%", fontSize: 0 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: B.white, fontFamily: font, marginBottom: 8 }}>Exchange Information</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <div>
          <svg width="65" height="65" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="22" fill="none" stroke={B.orange} strokeWidth="8" strokeDasharray="48 90" strokeDashoffset="0" />
            <circle cx="30" cy="30" r="22" fill="none" stroke={B.purple} strokeWidth="8" strokeDasharray="44 94" strokeDashoffset="-48" />
            <circle cx="30" cy="30" r="22" fill="none" stroke={B.green} strokeWidth="8" strokeDasharray="38 100" strokeDashoffset="-92" />
            <circle cx="30" cy="30" r="22" fill="none" stroke={B.cyan} strokeWidth="8" strokeDasharray="8 130" strokeDashoffset="-130" />
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          {[["Binance", B.orange, "35.1%", "$229,103"], ["OKX", B.purple, "32.4%", "$212,075"], ["Kraken", B.green, "27.7%", "$181,300"], ["Coinbase", B.cyan, "4.8%", "$31,093"]].map(([n, c, p, v]) => (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
              <span style={{ width: 6, height: 6, borderRadius: 1, background: c }} />
              <span style={{ fontSize: 7, color: B.gray, fontFamily: font, flex: 1 }}>{n}</span>
              <span style={{ fontSize: 7, color: B.offwhite, fontFamily: "monospace" }}>{p}</span>
              <span style={{ fontSize: 7, color: B.offwhite, fontFamily: "monospace" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ fontSize: 8, fontWeight: 700, color: B.white, fontFamily: font, marginBottom: 4 }}>Group by instrument</div>
      <div style={{ background: B.card, borderRadius: 6, border: `1px solid ${B.border}`, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1.2fr 0.7fr 1fr 1.2fr 1.2fr", padding: "4px 8px", borderBottom: `1px solid ${B.border}` }}>
          {["Instrument", "Exchange", "Side", "Exec qty", "Avg price", "Notional"].map(h => (
            <span key={h} style={{ fontSize: 6, color: B.grayDark, fontFamily: font, fontWeight: 600 }}>{h}</span>
          ))}
        </div>
        {[
          ["ETH-USD", "Binance", "buy", "111.486", "2,054.99", "$229,103"],
          ["ETH-USD", "Coinbase", "buy", "15.112", "2,057.41", "$31,093"],
          ["ETH-USD", "Kraken", "buy", "88.117", "2,057.49", "$181,300"],
          ["ETH-USD", "OKX", "buy", "103.147", "2,056.04", "$212,075"],
        ].map((row, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1.5fr 1.2fr 0.7fr 1fr 1.2fr 1.2fr", padding: "3px 8px", borderBottom: `1px solid ${B.border}11` }}>
            {row.map((c, j) => (
              <span key={j} style={{
                fontSize: 6.5, fontFamily: j <= 2 ? font : "monospace",
                color: j === 2 ? B.green : j === 0 ? B.accent : B.offwhite,
                fontWeight: j === 0 ? 600 : 400,
              }}>{c}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SOLUTIONS ───
function Solutions() {
  const items = [
    { icon: "⚡", title: "Smart Order Routing", desc: "Route orders across 10+ venues with Aggressive, Passive, and Neutral execution modes. Real-time venue scoring on fill probability, latency, fees, and market impact." },
    { icon: "📊", title: "Execution Algorithms", desc: "TWAP and VWAP algorithms with adaptive scheduling, participation rate capping, and catch-up logic. Minimize market impact on large orders." },
    { icon: "🔍", title: "Pre-Trade Analytics", desc: "Almgren-Chriss impact models, spread cost estimation, book depth analysis, per-venue ADV data, and illustrative execution schedules." },
    { icon: "📈", title: "Post-Trade TCA", desc: "Implementation shortfall decomposition, strategy comparison, venue analysis, markout analytics, and slippage benchmarking." },
    { icon: "🏦", title: "Order Management", desc: "Full OMS with multi-venue state management, parent/child order tracking, partial fill handling, and sub-account allocation." },
    { icon: "🛡️", title: "Margin & Collateral", desc: "Real-time margin monitoring with health scores across all venues. Proactive alerts and one-click collateral transfers via Fireblocks." },
  ];

  return (
    <section id="solutions" style={{
      padding: "100px clamp(16px, 4vw, 56px)",
      background: `linear-gradient(180deg, ${B.bgAlt} 0%, ${B.bg} 100%)`,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SectionLabel>Solutions</SectionLabel>
          <SectionHeading center>The complete execution stack</SectionHeading>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {items.map((s, i) => (
            <div key={i} style={{
              background: B.card, borderRadius: 14, border: `1px solid ${B.border}`,
              padding: 28, transition: "all 0.3s", cursor: "default",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = B.borderHover; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = B.border; e.currentTarget.style.transform = "none"; }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10, background: B.accentDim,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, marginBottom: 16,
              }}>{s.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: B.white, fontFamily: fontDisplay, margin: "0 0 10px" }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: B.gray, lineHeight: 1.6, fontFamily: font, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CLIENTS ───
function Clients() {
  const segs = [
    { title: "Buy Side", color: B.accent, list: ["Asset Managers", "ETF Issuers", "Hedge Funds", "Crypto Funds", "Proprietary Trading Firms", "Token Holders & Projects"] },
    { title: "Sell Side", color: B.cyan, list: ["Banks", "Retail Investment Platforms", "OTC Desks", "Broker-Dealers", "Prime Brokers"] },
    { title: "Service Providers", color: B.purple, list: ["Custodians", "Payment Service Providers"] },
  ];
  return (
    <section id="clients" style={{ padding: "100px clamp(16px, 4vw, 56px)", background: B.bg }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SectionLabel>Who We Serve</SectionLabel>
          <SectionHeading center>Built for every side of the market</SectionHeading>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {segs.map((s, i) => (
            <div key={i} style={{
              background: B.card, borderRadius: 14, border: `1px solid ${B.border}`,
              padding: 32, position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: s.color }} />
              <h3 style={{ fontSize: 20, fontWeight: 700, color: s.color, fontFamily: fontDisplay, margin: "0 0 20px" }}>{s.title}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {s.list.map((c, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: B.offwhite, fontFamily: font }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.color, opacity: 0.5, flexShrink: 0 }} />
                    {c}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHY ATLAS ───
function WhyAtlas() {
  const diffs = [
    { t: "Pre-Trade ↔ Post-Trade Feedback Loop", d: "Our pre-trade cost models are continuously calibrated from post-trade TCA outcomes. The more you trade, the more accurate your cost predictions become — a compounding moat." },
    { t: "Venue-Agnostic Smart Routing", d: "Not tied to any single exchange or liquidity pool. Atlas routes across 10+ CEXs and DEXs, scoring venues in real-time on fill probability, latency, fees, and market impact." },
    { t: "Modular Architecture", d: "Use the full stack or integrate individual modules. Need just SOR? Just TCA? Atlas's microservices architecture lets you deploy what you need." },
    { t: "Transparent, Unconflicted", d: "Atlas is a pure technology provider — no prop trading desk, no internalization, no conflicts of interest. Agency-only execution aligned with your best outcome." },
  ];
  return (
    <section id="why-atlas" style={{
      padding: "100px clamp(16px, 4vw, 56px)",
      background: `linear-gradient(180deg, ${B.bg} 0%, ${B.bgAlt} 100%)`,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}>
          <div>
            <SectionLabel>Why Atlas</SectionLabel>
            <SectionHeading>Built by a practitioner,<br />not a pitch deck</SectionHeading>
            <p style={{ fontSize: 15, color: B.gray, lineHeight: 1.7, fontFamily: font, margin: "20px 0 28px" }}>
              Atlas is founded by Kiran Pingali, who spent 25 years building electronic trading
              infrastructure at Citigroup, Thomson Reuters/Refinitiv, and Bloomberg — then
              brought that expertise to institutional crypto as a CEO and CPO.
            </p>
            <p style={{ fontSize: 15, color: B.gray, lineHeight: 1.7, fontFamily: font, margin: "0 0 28px" }}>
              This isn't a repackaged TradFi system or a crypto-native tool that ignores
              decades of execution science. Atlas combines quantitative execution models
              with crypto-native infrastructure — real-time CLOB aggregation, cross-venue
              margin monitoring, and Almgren-Chriss impact modeling.
            </p>
            <div style={{
              background: B.card, borderRadius: 12, border: `1px solid ${B.border}`, padding: 22,
            }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: B.white, fontFamily: font, marginBottom: 10 }}>Kiran Pingali</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5, fontSize: 13, color: B.gray, fontFamily: font }}>
                <span>Cornell M.Eng · Columbia MBA · CFA</span>
                <span>Ex-Citigroup · Ex-Thomson Reuters/Refinitiv · Ex-Bloomberg</span>
                <span>25+ years in electronic trading & market structure</span>
              </div>
              <a href="https://www.linkedin.com/in/kiran-pingali/" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 12, fontSize: 13, color: B.accent, fontFamily: font, fontWeight: 600, textDecoration: "none" }}>
                LinkedIn Profile →
              </a>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {diffs.map((d, i) => (
              <div key={i} style={{
                background: B.card, borderRadius: 12, border: `1px solid ${B.border}`,
                padding: 22, transition: "all 0.3s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = B.borderHover}
                onMouseLeave={e => e.currentTarget.style.borderColor = B.border}>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: B.white, fontFamily: fontDisplay, margin: "0 0 8px" }}>{d.t}</h4>
                <p style={{ fontSize: 13, color: B.gray, lineHeight: 1.6, fontFamily: font, margin: 0 }}>{d.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── BLOG ───
function Blog() {
  return (
    <section id="blog" style={{ padding: "100px clamp(16px, 4vw, 56px)", background: B.bg }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionLabel>Insights</SectionLabel>
        <SectionHeading>From the founder's desk</SectionHeading>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 40 }}>
          <div style={{
            background: B.card, borderRadius: 14, border: `1px solid ${B.border}`,
            overflow: "hidden", transition: "all 0.3s", cursor: "pointer",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = B.borderHover; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = B.border; e.currentTarget.style.transform = "none"; }}>
            <div style={{
              height: 140, background: `linear-gradient(135deg, ${B.accentDim} 0%, rgba(167,139,250,0.08) 100%)`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}><Logo size={36} /></div>
            <div style={{ padding: 22 }}>
              <span style={{
                display: "inline-block", padding: "3px 8px", borderRadius: 4,
                background: B.accentDim, color: B.accent, fontSize: 10, fontWeight: 700, fontFamily: font,
                letterSpacing: "0.04em", marginBottom: 10,
              }}>Founding Story</span>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: B.white, fontFamily: fontDisplay, margin: "0 0 8px", lineHeight: 1.3 }}>Why We Built Atlas</h3>
              <p style={{ fontSize: 13, color: B.gray, lineHeight: 1.6, fontFamily: font, margin: "0 0 14px" }}>
                After 25 years building electronic trading infrastructure on Wall Street, I saw the same
                liquidity fragmentation problem emerge in crypto — but without the institutional tooling
                to solve it. Here's why Atlas exists.
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: B.grayDarker, fontFamily: font }}>
                <span>April 2026</span><span>8 min read</span>
              </div>
            </div>
          </div>
          {[1, 2].map(i => (
            <div key={i} style={{
              background: B.card, borderRadius: 14, border: `1px dashed ${B.border}`,
              display: "flex", alignItems: "center", justifyContent: "center", minHeight: 340, flexDirection: "column", gap: 8,
            }}>
              <span style={{ fontSize: 28, opacity: 0.2 }}>📝</span>
              <span style={{ fontSize: 13, color: B.grayDarker, fontFamily: font }}>More insights coming soon</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── DEMO FORM ───
function DemoForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", company: "", role: "", message: "" });
  const [done, setDone] = useState(false);
  const up = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const valid = form.email && form.firstName;

  const inp = {
    width: "100%", padding: "11px 14px", borderRadius: 7,
    background: "rgba(0,0,0,0.4)", border: `1px solid ${B.border}`,
    color: B.white, fontSize: 14, fontFamily: font, outline: "none",
    transition: "border-color 0.2s", boxSizing: "border-box",
  };
  const lbl = { fontSize: 12, color: B.gray, fontFamily: font, fontWeight: 600, marginBottom: 5, display: "block" };

  return (
    <section id="demo" style={{
      padding: "100px clamp(16px, 4vw, 56px)",
      background: `radial-gradient(ellipse 55% 45% at 50% 50%, ${B.accentDim} 0%, transparent 55%), ${B.bgAlt}`,
    }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <SectionLabel>Get Started</SectionLabel>
          <SectionHeading center>Book a demo</SectionHeading>
          <p style={{ fontSize: 16, color: B.gray, lineHeight: 1.6, fontFamily: font, margin: "14px 0 0" }}>
            See how Atlas can transform your digital asset execution.
            <br />Design partner pricing available for early adopters.
          </p>
        </div>

        {done ? (
          <div style={{ background: B.card, borderRadius: 14, border: `1px solid ${B.borderHover}`, padding: 44, textAlign: "center" }}>
            <div style={{ fontSize: 44, marginBottom: 14 }}>✓</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: B.white, fontFamily: fontDisplay, margin: "0 0 10px" }}>
              Thank you, {form.firstName}
            </h3>
            <p style={{ fontSize: 15, color: B.gray, fontFamily: font }}>We'll be in touch within 24 hours to schedule your demo.</p>
          </div>
        ) : (
          <div style={{ background: B.card, borderRadius: 14, border: `1px solid ${B.border}`, padding: "36px 36px 28px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={lbl}>First Name *</label>
                <input style={inp} placeholder="Jane" value={form.firstName}
                  onChange={e => up("firstName", e.target.value)}
                  onFocus={e => e.target.style.borderColor = B.accent}
                  onBlur={e => e.target.style.borderColor = B.border} />
              </div>
              <div>
                <label style={lbl}>Last Name</label>
                <input style={inp} placeholder="Smith" value={form.lastName}
                  onChange={e => up("lastName", e.target.value)}
                  onFocus={e => e.target.style.borderColor = B.accent}
                  onBlur={e => e.target.style.borderColor = B.border} />
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>Work Email *</label>
              <input style={inp} type="email" placeholder="jane@hedgefund.com" value={form.email}
                onChange={e => up("email", e.target.value)}
                onFocus={e => e.target.style.borderColor = B.accent}
                onBlur={e => e.target.style.borderColor = B.border} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={lbl}>Company</label>
                <input style={inp} placeholder="Acme Capital" value={form.company}
                  onChange={e => up("company", e.target.value)}
                  onFocus={e => e.target.style.borderColor = B.accent}
                  onBlur={e => e.target.style.borderColor = B.border} />
              </div>
              <div>
                <label style={lbl}>Role</label>
                <input style={inp} placeholder="Head of Trading" value={form.role}
                  onChange={e => up("role", e.target.value)}
                  onFocus={e => e.target.style.borderColor = B.accent}
                  onBlur={e => e.target.style.borderColor = B.border} />
              </div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={lbl}>Anything specific you'd like to discuss?</label>
              <textarea style={{ ...inp, minHeight: 70, resize: "vertical" }}
                placeholder="Tell us about your trading needs..." value={form.message}
                onChange={e => up("message", e.target.value)}
                onFocus={e => e.target.style.borderColor = B.accent}
                onBlur={e => e.target.style.borderColor = B.border} />
            </div>
            <button onClick={() => valid && setDone(true)} style={{
              width: "100%", padding: "13px 28px", borderRadius: 7,
              background: B.accent, color: "#fff", fontSize: 15, fontWeight: 700,
              fontFamily: font, border: "none", cursor: valid ? "pointer" : "default",
              boxShadow: `0 0 28px ${B.accentGlow}`, transition: "all 0.2s",
              opacity: valid ? 1 : 0.5,
            }}>Request Demo</button>
            <p style={{ fontSize: 11, color: B.grayDarker, fontFamily: font, textAlign: "center", marginTop: 14, marginBottom: 0 }}>
              We'll respond within 24 hours. No spam, no sales automation.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── FOOTER ───
function Footer() {
  return (
    <footer style={{
      padding: "40px clamp(16px, 4vw, 56px) 28px",
      background: "#050507", borderTop: `1px solid ${B.border}`,
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20,
      }}>
        <div>
          <Logo size={20} />
          <p style={{ fontSize: 12, color: B.grayDarker, fontFamily: font, margin: "10px 0 0" }}>
            Atlas Digital Markets LLC · Jersey City, NJ
          </p>
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {[["LinkedIn", "https://www.linkedin.com/in/kiran-pingali/"], ["Contact", "mailto:kiran@atlasdigitaltrading.com"]].map(([l, h]) => (
            <a key={l} href={h} target={l === "LinkedIn" ? "_blank" : undefined} rel="noopener noreferrer"
              style={{ color: B.grayDarker, fontSize: 12, fontFamily: font, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = B.accent}
              onMouseLeave={e => e.target.style.color = B.grayDarker}>{l}</a>
          ))}
        </div>
        <div style={{ fontSize: 11, color: B.grayDarker, fontFamily: font }}>
          © 2026 Atlas Digital Markets LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ─── APP ───
export default function AtlasWebsite() {
  return (
    <div style={{ background: B.bg, minHeight: "100vh", color: B.white, fontFamily: font }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=Instrument+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #09090b; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        input::placeholder, textarea::placeholder { color: #475569; }
        ::-webkit-scrollbar { width: 7px; }
        ::-webkit-scrollbar-track { background: #09090b; }
        ::-webkit-scrollbar-thumb { background: #27272a; border-radius: 4px; }
        @media (max-width: 900px) {
          nav > div > div:nth-child(2) > span:not(:last-child) { display: none !important; }
        }
      `}</style>
      <NavBar />
      <Hero />
      <Platform />
      <Solutions />
      <Clients />
      <WhyAtlas />
      <Blog />
      <DemoForm />
      <Footer />
    </div>
  );
}
