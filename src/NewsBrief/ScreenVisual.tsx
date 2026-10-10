import React from "react";
import { useCurrentFrame } from "remotion";
import { FONT_DISPLAY } from "../fonts";
import { COLORS, VIDEO } from "../theme";
import { fadeUp, progress } from "./anim";
import { StatCard } from "./StatCard";
import { ScreenVisual } from "./types";

const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
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
    {children}
  </div>
);

const Points: React.FC<{ label: string; points: string[]; from: number }> = ({ label, points, from }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: 104 }}>
      <div style={fadeUp(frame, from, 14)}>
        <Chip>{label}</Chip>
      </div>
      <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 16 }}>
        {points.map((point, i) => {
          const start = from + 10 + i * 14;
          const p = progress(frame, start, 16);
          return (
            <div
              key={point}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                opacity: p,
                transform: `translateX(${(1 - p) * -60}px)`,
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 56,
                  height: 56,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: COLORS.red,
                  color: COLORS.white,
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 900,
                  fontSize: 30,
                }}
              >
                {i + 1}
              </div>
              <div
                style={{
                  color: COLORS.white,
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 800,
                  fontSize: points.length > 2 ? 36 : 40,
                  lineHeight: 1.2,
                  textShadow: "0 4px 18px rgba(0,0,0,0.5)",
                }}
              >
                {point}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Title: React.FC<{
  kicker: string;
  title: string;
  subtitle?: string;
  direction?: "up" | "down";
  from: number;
}> = ({ kicker, title, subtitle, direction, from }) => {
  const frame = useCurrentFrame();
  const t = progress(frame, from + 6, 18);
  const arrowColor = direction === "down" ? COLORS.down : COLORS.up;

  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: 110 }}>
      <div style={fadeUp(frame, from, 14)}>
        <Chip>{kicker}</Chip>
      </div>
      <div
        style={{
          marginTop: 18,
          display: "flex",
          alignItems: "center",
          gap: 24,
          opacity: t,
          transform: `scale(${0.9 + 0.1 * t})`,
          transformOrigin: "left center",
          fontFamily: FONT_DISPLAY,
          fontWeight: 900,
          fontSize: title.length > 12 ? 80 : 104,
          whiteSpace: "nowrap",
          lineHeight: 1.05,
          color: COLORS.white,
          textShadow: "0 6px 24px rgba(0,0,0,0.45)",
        }}
      >
        {title}
        {direction ? (
          <span style={{ color: arrowColor, transform: `translateY(${(1 - t) * (direction === "up" ? 40 : -40)}px)` }}>
            {direction === "up" ? "▲" : "▼"}
          </span>
        ) : null}
      </div>
      {subtitle ? (
        <div
          style={{
            ...fadeUp(frame, from + 18, 14),
            marginTop: 14,
            color: COLORS.textSoft,
            fontFamily: FONT_DISPLAY,
            fontWeight: 700,
            fontSize: 40,
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
};

export const ScreenVisualView: React.FC<{ visual: ScreenVisual; from: number; durationInFrames: number }> = ({
  visual,
  from,
  durationInFrames,
}) => {
  if (visual.type === "points") {
    return <Points label={visual.label} points={visual.points} from={from} />;
  }
  if (visual.type === "title") {
    return <Title {...visual} from={from} />;
  }

  // Stats with `at` appear when they are read out; the rest share the scene evenly.
  const span = (durationInFrames - from) / Math.max(visual.stats.length, 1);
  const starts = visual.stats.map((stat, i) =>
    stat.at !== undefined ? Math.max(from, Math.round(stat.at * VIDEO.fps)) : Math.round(from + i * span),
  );
  return (
    <>
      {visual.stats.map((stat, i) => {
        const isLast = i === visual.stats.length - 1;
        const end = isLast ? durationInFrames + 30 : starts[i + 1];
        return <StatCard key={stat.label} stat={stat} from={starts[i]} to={end} />;
      })}
    </>
  );
};
