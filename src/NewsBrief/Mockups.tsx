import { CheckCheck, Landmark } from "lucide-react";
import React from "react";
import { Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_BODY, FONT_DISPLAY } from "../fonts";
import { COLORS, VIDEO } from "../theme";
import { fadeUp, progress } from "./anim";
import { PhoneSpec } from "./types";

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

/** A web app window whose rows are approved one by one, next to a donut chart that fills up. */
export const DashboardVisual: React.FC<{
  kicker: string;
  title: string;
  window: string;
  rows: { label: string; at?: number }[];
  donut: { value: number; decimals?: number; label: string; at?: number };
  from: number;
}> = ({ kicker, title, window, rows, donut, from }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const win = spring({ frame: frame - from - 6, fps, config: { damping: 14 } });
  const donutStart = atFrame(donut.at, from + 30);
  const fill = interpolate(frame, [donutStart, donutStart + 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
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
            width: 600,
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
          <div style={{ padding: "10px 14px 12px" }}>
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
                    padding: "9px 12px",
                    marginBottom: 7,
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
                    {done ? "✓ Approved" : "Pending"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
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
              strokeDashoffset={circumference * (1 - (fill * donut.value) / 100)}
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
            <div style={{ fontWeight: 900, fontSize: 40 }}>{(donut.value * fill).toFixed(donut.decimals ?? 0)}%</div>
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
      </div>
    </div>
  );
};
