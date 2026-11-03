import { Check, CheckCheck, Landmark, Search, User } from "lucide-react";
import React from "react";
import { Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_BODY, FONT_DISPLAY } from "../fonts";
import { COLORS, VIDEO } from "../theme";
import { fadeUp, progress } from "./anim";
import { ICONS } from "./Icons";
import { BoardRow, PhoneSpec, VersusSide } from "./types";

const atFrame = (at: number | undefined, fallback: number) =>
  at !== undefined ? Math.round(at * VIDEO.fps) : fallback;

/** A floating smartphone running a banking app: rows slide in, then a notification pops. */
export const PhoneMockup: React.FC<{ spec: PhoneSpec; from: number; size: number }> = ({ spec, from, size }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - from, fps, config: { damping: 14 } });
  const bob = Math.sin(frame / 25) * 6;
  const height = size * 1.05;
  const width = height * 0.62;
  const color = spec.color ?? "#0b6b3a";
  const toastAt = spec.toast ? atFrame(spec.toast.at, from + 40 + spec.rows.length * 12) : Infinity;
  const toast = spring({ frame: frame - toastAt, fps, config: { damping: 11 } });

  return (
    <div
      style={{
        position: "absolute",
        left: (size - width) / 2,
        top: (size - height) / 2 + 6,
        width,
        height,
        transform: `translateY(${(1 - enter) * 80 + bob}px) rotate(${-5 + 2 * Math.sin(frame / 40)}deg)`,
        opacity: enter,
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          inset: -30,
          borderRadius: 60,
          background: `radial-gradient(circle, ${COLORS.gold}55, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 30,
          background: "#0b0f17",
          padding: 8,
          boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: 23,
            overflow: "hidden",
            background: "#f2f5fa",
            fontFamily: FONT_BODY,
          }}
        >
          <div
            style={{
              height: 52,
              background: color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 10px",
            }}
          >
            {spec.logo ? (
              <Img src={staticFile(spec.logo)} style={{ maxHeight: 32, maxWidth: "90%", objectFit: "contain" }} />
            ) : (
              <span style={{ color: "#fff", fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 15 }}>{spec.app}</span>
            )}
          </div>
          <div
            style={{
              margin: 10,
              padding: "10px 12px",
              borderRadius: 12,
              background: `linear-gradient(135deg, ${color}, ${COLORS.navyDark})`,
              color: "#fff",
            }}
          >
            <div style={{ fontSize: 11, opacity: 0.8 }}>Balance</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 16 }}>•••••• VND</div>
          </div>
          {spec.rows.map((row, i) => {
            const p = progress(frame, atFrame(row.at, from + 14 + i * 12), 12);
            return (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  margin: "0 10px 7px",
                  padding: "7px 8px",
                  borderRadius: 10,
                  background: "#fff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                  opacity: p,
                  transform: `translateX(${(1 - p) * 60}px)`,
                }}
              >
                <div style={{ width: 20, height: 20, borderRadius: 10, background: `${color}33`, flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: 11, fontWeight: 600, color: "#1d2a3a", whiteSpace: "nowrap" }}>
                  {row.label}
                </div>
                {row.amount ? (
                  <div style={{ fontSize: 10, fontWeight: 700, color: color, whiteSpace: "nowrap" }}>{row.amount}</div>
                ) : null}
              </div>
            );
          })}
          {spec.toast ? (
            <div
              style={{
                position: "absolute",
                left: 10,
                right: 10,
                bottom: 14,
                padding: "8px 10px",
                borderRadius: 12,
                background: COLORS.up,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontWeight: 700,
                opacity: frame >= toastAt ? 1 : 0,
                transform: `translateY(${(1 - toast) * 40}px) scale(${0.8 + 0.2 * toast})`,
              }}
            >
              <CheckCheck size={16} color="#fff" strokeWidth={3} />
              {spec.toast.text}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

/** Partners appearing around a central bank, each joined by a line with a pulse running along it. */
export const NetworkArt: React.FC<{
  spec: { center: string; count: number; label: string; logo?: string };
  from: number;
  size: number;
}> = ({ spec, from, size }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = size / 2;
  const nodes = 14;
  const counted = Math.round(spec.count * progress(frame, from + 6, 70));

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <svg width={size} height={size} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        {Array.from({ length: nodes }).map((_, i) => {
          const angle = (i / nodes) * Math.PI * 2 + 0.3;
          const ring = i % 2 === 0 ? 0.46 : 0.36;
          const x = c + Math.cos(angle) * size * ring;
          const y = c + Math.sin(angle) * size * ring * 0.9;
          const appear = progress(frame, from + 8 + i * 4, 10);
          const pulse = ((frame - from) / 40 + i * 0.37) % 1;
          return (
            <g key={i} opacity={appear}>
              <line x1={c} y1={c} x2={x} y2={y} stroke={COLORS.gold} strokeOpacity={0.45} strokeWidth={2} />
              <circle cx={c + (x - c) * pulse} cy={c + (y - c) * pulse} r={3.5} fill={COLORS.gold} />
              <circle cx={x} cy={y} r={9 * appear} fill={i % 3 === 0 ? COLORS.red : "#2c6db3"} stroke="#fff" strokeWidth={2} />
            </g>
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          left: c - 56,
          top: c - 56,
          width: 112,
          height: 112,
          borderRadius: "50%",
          background: `radial-gradient(circle at 35% 30%, #2c6db3, ${COLORS.navyDark})`,
          border: `5px solid ${COLORS.gold}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${spring({ frame: frame - from, fps, config: { damping: 12 } })})`,
          boxShadow: "0 0 30px rgba(245,196,0,0.4)",
        }}
      >
        {spec.logo ? (
          <Img src={staticFile(spec.logo)} style={{ maxWidth: 80, maxHeight: 60, objectFit: "contain" }} />
        ) : (
          <Landmark size={52} color="#fff" strokeWidth={1.8} />
        )}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -6,
          textAlign: "center",
          fontFamily: FONT_DISPLAY,
          fontWeight: 900,
          fontSize: 26,
          color: COLORS.white,
          textShadow: "0 3px 10px rgba(0,0,0,0.6)",
        }}
      >
        {counted.toLocaleString("en-US")} <span style={{ color: COLORS.gold, fontSize: 20 }}>{spec.label}</span>
      </div>
    </div>
  );
};

/** A search box that types its text, with a blinking caret. */
const SearchBox: React.FC<{ search: { text: string; at?: number }; from: number }> = ({ search, from }) => {
  const frame = useCurrentFrame();
  const start = atFrame(search.at, from + 14);
  const typed = Math.max(0, Math.min(search.text.length, Math.floor((frame - start) / 1.6)));
  const caret = Math.floor(frame / 12) % 2 === 0 && typed < search.text.length + 1;
  return (
    <div
      style={{
        margin: "10px 14px 6px",
        padding: "8px 14px",
        borderRadius: 22,
        background: "#fff",
        border: "2px solid #c9d3e0",
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: 18,
        fontWeight: 600,
        color: "#1d2a3a",
      }}
    >
      <Search size={20} color="#5b6b80" strokeWidth={2.4} />
      <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
        {search.text.slice(0, typed)}
        <span style={{ opacity: caret ? 1 : 0, color: "#1d5fa8" }}>|</span>
      </span>
    </div>
  );
};

/** A generic identity card: a scan line sweeps across it, then a verification badge pops. */
export const IdCardArt: React.FC<{
  spec: { title: string; badge: string; badgeAt?: number };
  from: number;
  size: number;
}> = ({ spec, from, size }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - from, fps, config: { damping: 13 } });
  const bob = Math.sin(frame / 26) * 5;
  const badgeAt = atFrame(spec.badgeAt, from + 60);
  const badge = spring({ frame: frame - badgeAt, fps, config: { damping: 9 } });
  const scanning = frame < badgeAt;
  const scan = ((frame - from) % 45) / 45;
  const w = size;
  const h = size * 0.63;

  return (
    <div style={{ position: "absolute", inset: 0, transform: `translateY(${(1 - enter) * 60 + bob}px)`, opacity: enter }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 20,
          width: w,
          height: h,
          borderRadius: 18,
          overflow: "hidden",
          background: "linear-gradient(135deg, #2c6db3, #0f2f5e)",
          border: "2px solid rgba(255,255,255,0.35)",
          boxShadow: "0 16px 36px rgba(0,0,0,0.5)",
          transform: "rotate(-4deg)",
          fontFamily: FONT_DISPLAY,
          color: "#fff",
        }}
      >
        <div style={{ padding: "12px 16px 0", fontWeight: 800, fontSize: 15, letterSpacing: 2, opacity: 0.9 }}>
          {spec.title}
        </div>
        <div style={{ display: "flex", gap: 14, padding: "10px 16px" }}>
          <div
            style={{
              width: 70,
              height: 86,
              borderRadius: 10,
              background: "rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <User size={44} color="#fff" strokeWidth={1.8} />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 9, paddingTop: 6 }}>
            {[0.95, 0.7, 0.85, 0.5].map((f, i) => (
              <div key={i} style={{ height: 9, width: `${f * 100}%`, borderRadius: 5, background: "rgba(255,255,255,0.45)" }} />
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", right: 16, bottom: 14, width: 42, height: 32, borderRadius: 6, background: COLORS.gold }} />
        {/* Holographic shine */}
        <div
          style={{
            position: "absolute",
            top: -40,
            bottom: -40,
            width: 60,
            left: `${((frame * 2) % 400) - 80}px`,
            transform: "skewX(-20deg)",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
          }}
        />
        {scanning ? (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: `${scan * 100}%`,
              height: 4,
              background: COLORS.up,
              boxShadow: `0 0 16px 4px ${COLORS.up}`,
            }}
          />
        ) : null}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 20 + h + 26,
          display: "flex",
          justifyContent: "center",
          opacity: frame >= badgeAt ? 1 : 0,
          transform: `scale(${frame >= badgeAt ? badge : 0})`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            borderRadius: 24,
            background: COLORS.up,
            color: "#fff",
            fontFamily: FONT_DISPLAY,
            fontWeight: 900,
            fontSize: 22,
            boxShadow: "0 0 24px rgba(46,204,113,0.6)",
          }}
        >
          <CheckCheck size={22} color="#fff" strokeWidth={3} />
          {spec.badge}
        </div>
      </div>
    </div>
  );
};

/** A paper checklist: items tick as they are read, then a stamp slams down. */
export const ChecklistVisual: React.FC<{
  kicker: string;
  title: string;
  items: { label: string; note?: string; at?: number }[];
  stamp?: { text: string; at?: number };
  from: number;
  narrow: boolean;
}> = ({ kicker, title, items, stamp, from, narrow }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const paper = spring({ frame: frame - from - 4, fps, config: { damping: 14 } });
  const stampAt = stamp ? atFrame(stamp.at, from + 30 + items.length * 18) : Infinity;
  const slam = frame >= stampAt ? spring({ frame: frame - stampAt, fps, config: { damping: 10, mass: 0.6 } }) : 0;
  // Four items with notes would crowd the paper; without notes they fit at full size.
  const compact = items.length > 3 && items.some((item) => item.note);

  return (
    <div style={{ position: "absolute", left: 60, width: narrow ? 640 : 960, top: 96 }}>
      <div style={{ ...fadeUp(frame, from, 14), display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            padding: "6px 16px",
            background: COLORS.gold,
            color: COLORS.navyDeep,
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 24,
            letterSpacing: 3,
            whiteSpace: "nowrap",
          }}
        >
          {kicker}
        </div>
      </div>
      <div
        style={{
          position: "relative",
          marginTop: 14,
          borderRadius: 14,
          background: "#fbfaf6",
          boxShadow: "0 18px 40px rgba(0,0,0,0.5)",
          padding: compact ? "12px 22px 10px" : "16px 22px 14px",
          transform: `translateY(${(1 - paper) * 70}px) rotate(${-1.2 * paper}deg)`,
          opacity: paper,
          fontFamily: FONT_BODY,
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 900,
            fontSize: compact ? 26 : 30,
            color: COLORS.navyDeep,
            borderBottom: "3px solid #1d3b5c",
            paddingBottom: 6,
            marginBottom: compact ? 4 : 8,
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </div>
        {items.map((item, i) => {
          const start = atFrame(item.at, from + 20 + i * 18);
          const done = frame >= start;
          const tick = done ? spring({ frame: frame - start, fps, config: { damping: 10 } }) : 0;
          return (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: compact ? "6px 0" : "9px 0",
                borderBottom: i < items.length - 1 ? "1px dashed #c9d0da" : undefined,
                background: done ? `rgba(46,204,113,${0.14 * Math.max(0, 1 - (frame - start) / 25)})` : undefined,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  flexShrink: 0,
                  border: `3px solid ${done ? COLORS.up : "#9aa7b8"}`,
                  background: done ? COLORS.up : "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {done ? (
                  <div style={{ transform: `scale(${tick})`, display: "flex" }}>
                    <Check size={24} color="#fff" strokeWidth={4} />
                  </div>
                ) : null}
              </div>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: compact ? 23 : 26,
                    color: done ? COLORS.navyDeep : "#6b7a8f",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </div>
                {item.note ? (
                  <div style={{ fontSize: compact ? 16 : 18, color: "#5b6b80", whiteSpace: "nowrap" }}>{item.note}</div>
                ) : null}
              </div>
            </div>
          );
        })}
        {stamp && frame >= stampAt ? (
          <div
            style={{
              position: "absolute",
              right: 26,
              bottom: 22,
              padding: "6px 18px",
              border: `5px solid ${COLORS.red}`,
              borderRadius: 10,
              color: COLORS.red,
              fontFamily: FONT_DISPLAY,
              fontWeight: 900,
              fontSize: 38,
              letterSpacing: 3,
              opacity: 0.88 * Math.min(1, slam * 1.4),
              transform: `rotate(-12deg) scale(${2.2 - 1.2 * slam})`,
              background: "rgba(255,255,255,0.6)",
            }}
          >
            {stamp.text}
          </div>
        ) : null}
      </div>
    </div>
  );
};

/** A web app window whose rows are approved one by one, next to a donut chart that fills up. */
export const DashboardVisual: React.FC<{
  kicker: string;
  title: string;
  window: string;
  rows: { label: string; at?: number }[];
  donut?: { value: number; decimals?: number; label: string; at?: number };
  search?: { text: string; at?: number };
  badge?: string;
  from: number;
}> = ({ kicker, title, window, rows, donut, search, badge = "✓ Approved", from }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const win = spring({ frame: frame - from - 6, fps, config: { damping: 14 } });
  const donutStart = donut ? atFrame(donut.at, from + 30) : 0;
  const fill = interpolate(frame, [donutStart, donutStart + 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const value = donut?.value ?? 0;
  const r = 78;
  const circumference = 2 * Math.PI * r;

  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: 100 }}>
      <div style={{ ...fadeUp(frame, from, 14), display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            padding: "6px 16px",
            background: COLORS.gold,
            color: COLORS.navyDeep,
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 24,
            letterSpacing: 3,
          }}
        >
          {kicker}
        </div>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 46, color: COLORS.white }}>{title}</div>
      </div>
      <div style={{ display: "flex", gap: 30, marginTop: 16, alignItems: "center" }}>
        <div
          style={{
            width: donut ? 600 : 960,
            borderRadius: 14,
            overflow: "hidden",
            background: "#f2f5fa",
            boxShadow: "0 18px 40px rgba(0,0,0,0.5)",
            transform: `translateY(${(1 - win) * 60}px)`,
            opacity: win,
            fontFamily: FONT_BODY,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 14px", background: "#dfe5ee" }}>
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <div key={c} style={{ width: 11, height: 11, borderRadius: 6, background: c }} />
            ))}
            <div style={{ marginLeft: 12, fontSize: 15, fontWeight: 700, color: "#3b4a5e" }}>{window}</div>
          </div>
          {search ? <SearchBox search={search} from={from} /> : null}
          <div style={{ padding: search ? "4px 14px 8px" : "10px 14px 12px" }}>
            {rows.map((row, i) => {
              const start = atFrame(row.at, from + 20 + i * 18);
              const done = frame >= start;
              const tick = spring({ frame: frame - start, fps, config: { damping: 10 } });
              return (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: search ? "6px 12px" : "9px 12px",
                    marginBottom: search ? 5 : 7,
                    borderRadius: 9,
                    background: "#fff",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                  }}
                >
                  <span style={{ fontSize: 19, fontWeight: 700, color: "#1d2a3a" }}>{row.label}</span>
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      padding: "4px 10px",
                      borderRadius: 14,
                      color: "#fff",
                      background: done ? COLORS.up : "#9aa7b8",
                      transform: done ? `scale(${0.7 + 0.3 * tick})` : undefined,
                    }}
                  >
                    {done ? badge : "Pending"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        {donut ? (
        <div style={{ position: "relative", width: 200, height: 200, opacity: progress(frame, donutStart - 6, 10) }}>
          <svg width={200} height={200}>
            <circle cx={100} cy={100} r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={22} />
            <circle
              cx={100}
              cy={100}
              r={r}
              fill="none"
              stroke={COLORS.gold}
              strokeWidth={22}
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - (fill * value) / 100)}
              transform="rotate(-90 100 100)"
            />
          </svg>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONT_DISPLAY,
              color: COLORS.white,
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 40 }}>{(value * fill).toFixed(donut.decimals ?? 0)}%</div>
          </div>
          <div
            style={{
              position: "absolute",
              left: -20,
              right: -20,
              top: 206,
              textAlign: "center",
              fontFamily: FONT_DISPLAY,
              fontWeight: 700,
              fontSize: 17,
              color: COLORS.textSoft,
            }}
          >
            {donut.label}
          </div>
        </div>
        ) : null}
      </div>
    </div>
  );
};

/** Two cards sliding in from either side, with a VS badge between them. */
export const VersusVisual: React.FC<{ kicker: string; left: VersusSide; right: VersusSide; from: number }> = ({
  kicker,
  left,
  right,
  from,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inL = spring({ frame: frame - from - 4, fps, config: { damping: 14 } });
  const inR = spring({ frame: frame - from - 10, fps, config: { damping: 14 } });
  const vs = spring({ frame: frame - from - 20, fps, config: { damping: 8 } });
  const pulse = 1 + 0.05 * Math.sin(frame / 8);

  const card = (side: VersusSide, enter: number, dir: -1 | 1) => {
    const Icon = ICONS[side.icon];
    return (
      <div
        style={{
          width: 400,
          height: 250,
          borderRadius: 22,
          padding: "22px 26px",
          background: `linear-gradient(145deg, ${side.color}, ${COLORS.navyDeep})`,
          border: "2px solid rgba(255,255,255,0.25)",
          boxShadow: "0 18px 40px rgba(0,0,0,0.5)",
          transform: `translateX(${(1 - enter) * dir * 500}px) rotate(${dir * -2}deg)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: FONT_DISPLAY,
          color: COLORS.white,
        }}
      >
        <div
          style={{
            width: 74,
            height: 74,
            borderRadius: 37,
            background: "rgba(255,255,255,0.16)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {side.logo ? (
            <Img src={staticFile(side.logo)} style={{ maxWidth: 60, maxHeight: 50, objectFit: "contain" }} />
          ) : (
            <Icon size={40} color="#fff" strokeWidth={2} />
          )}
        </div>
        <div>
          <div style={{ fontWeight: 900, fontSize: side.name.length > 10 ? 44 : 56, lineHeight: 1.05 }}>{side.name}</div>
          {side.note ? (
            <div style={{ marginTop: 8, fontWeight: 700, fontSize: 24, color: "rgba(255,255,255,0.85)" }}>{side.note}</div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: 100 }}>
      <div style={fadeUp(frame, from, 14)}>
        <div
          style={{
            display: "inline-block",
            padding: "8px 18px",
            background: COLORS.gold,
            color: COLORS.navyDeep,
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 28,
            letterSpacing: 3,
          }}
        >
          {kicker}
        </div>
      </div>
      <div style={{ position: "relative", marginTop: 22, display: "flex", justifyContent: "space-between" }}>
        {card(left, inL, -1)}
        {card(right, inR, 1)}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 120,
            height: 120,
            marginLeft: -60,
            marginTop: -60,
            borderRadius: 60,
            background: COLORS.gold,
            border: `6px solid ${COLORS.navyDeep}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT_DISPLAY,
            fontWeight: 900,
            fontSize: 48,
            color: COLORS.navyDeep,
            transform: `scale(${vs * pulse})`,
            boxShadow: "0 0 40px rgba(245,196,0,0.6)",
          }}
        >
          VS
        </div>
      </div>
    </div>
  );
};

/** A market price board: rows flip in as they are read, with coloured change badges. */
export const BoardVisual: React.FC<{ kicker: string; title: string; rows: BoardRow[]; from: number }> = ({
  kicker,
  title,
  rows,
  from,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const board = spring({ frame: frame - from - 4, fps, config: { damping: 15 } });

  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: 98 }}>
      <div style={{ ...fadeUp(frame, from, 14), display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            padding: "6px 16px",
            background: COLORS.gold,
            color: COLORS.navyDeep,
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 24,
            letterSpacing: 3,
            whiteSpace: "nowrap",
          }}
        >
          {kicker}
        </div>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 48, color: COLORS.white, whiteSpace: "nowrap" }}>
          {title}
        </div>
      </div>
      <div
        style={{
          marginTop: 16,
          borderRadius: 18,
          padding: "10px 18px",
          background: "rgba(5,14,26,0.88)",
          border: "2px solid rgba(255,255,255,0.14)",
          boxShadow: "0 16px 36px rgba(0,0,0,0.45)",
          opacity: board,
          transform: `translateY(${(1 - board) * 40}px)`,
        }}
      >
        {rows.map((row, i) => {
          const start = atFrame(row.at, from + 14 + i * 16);
          const shown = frame >= start;
          const flip = spring({ frame: frame - start, fps, config: { damping: 13 } });
          const pill = spring({ frame: frame - start - 8, fps, config: { damping: 9 } });
          const Icon = ICONS[row.icon];
          const color = row.direction === "up" ? COLORS.up : COLORS.down;
          // The newest row glows briefly when it lands.
          const glow = shown ? Math.max(0, 1 - (frame - start) / 30) : 0;
          return (
            <div
              key={row.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                height: 84,
                borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,0.12)" : undefined,
                background: `rgba(245,196,0,${0.12 * glow})`,
                opacity: shown ? 1 : 0.28,
              }}
            >
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 27,
                  flexShrink: 0,
                  background: shown ? COLORS.gold : "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={30} color={shown ? COLORS.navyDeep : "#fff"} strokeWidth={2.2} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 30, color: COLORS.white, whiteSpace: "nowrap" }}>
                  {row.label}
                </div>
                {row.note ? (
                  <div style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 19, color: COLORS.textSoft, whiteSpace: "nowrap" }}>
                    {row.note}
                  </div>
                ) : null}
              </div>
              <div style={{ overflow: "hidden", height: 56 }}>
                <div
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontWeight: 900,
                    fontSize: 44,
                    lineHeight: "56px",
                    color: COLORS.white,
                    fontVariantNumeric: "tabular-nums",
                    whiteSpace: "nowrap",
                    transform: `translateY(${(1 - (shown ? flip : 0)) * 56}px)`,
                  }}
                >
                  {row.value}
                </div>
              </div>
              {row.change ? (
                <div
                  style={{
                    width: 128,
                    textAlign: "center",
                    padding: "6px 0",
                    borderRadius: 10,
                    background: color,
                    color: "#fff",
                    fontFamily: FONT_DISPLAY,
                    fontWeight: 800,
                    fontSize: 26,
                    transform: `scale(${shown ? pill : 0})`,
                  }}
                >
                  {row.direction === "up" ? "▲" : "▼"} {row.change}
                </div>
              ) : (
                <div style={{ width: 128 }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
