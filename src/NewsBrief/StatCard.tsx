import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { FONT_DISPLAY } from "../fonts";
import { COLORS } from "../theme";
import { progress } from "./anim";
import { Stat } from "./types";

const formatNumber = (value: number, decimals: number) =>
  value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** One key figure, counted up from zero. `frame` is relative to when the card appears. */
export const StatCard: React.FC<{ stat: Stat; from: number; to: number }> = ({ stat, from, to }) => {
  const frame = useCurrentFrame();
  const enter = progress(frame, from, 14);
  const exit = progress(frame, to - 12, 12);
  const count = progress(frame, from + 4, 30);
  const badge = progress(frame, from + 26, 12);

  if (frame < from || frame > to) return null;

  const color = stat.direction === "up" ? COLORS.up : COLORS.down;
  const arrow = stat.direction === "up" ? "▲" : "▼";

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        top: 110,
        opacity: enter * (1 - exit),
        transform: `translateX(${(1 - enter) * -80 + exit * 80}px)`,
      }}
    >
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
        {stat.label}
      </div>
      <div
        style={{
          marginTop: 18,
          display: "flex",
          alignItems: "baseline",
          gap: 14,
          // A stat without a change badge shows its direction through the number's color.
          color: !stat.change && stat.direction ? color : COLORS.white,
          fontFamily: FONT_DISPLAY,
          fontWeight: 900,
          textShadow: "0 6px 24px rgba(0,0,0,0.45)",
        }}
      >
        {stat.prefix ? <span style={{ fontSize: 56 }}>{stat.prefix}</span> : null}
        <span style={{ fontSize: 132, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
          {formatNumber(stat.value * count, stat.decimals ?? 0)}
        </span>
        {stat.suffix ? <span style={{ fontSize: 48 }}>{stat.suffix}</span> : null}
      </div>
      {stat.change || stat.note ? (
        <div
          style={{
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            gap: 18,
            opacity: badge,
            transform: `scale(${interpolate(badge, [0, 1], [0.8, 1])})`,
            transformOrigin: "left center",
          }}
        >
          {stat.change ? (
            <div
              style={{
                padding: "6px 18px",
                borderRadius: 8,
                background: color,
                color: COLORS.white,
                fontFamily: FONT_DISPLAY,
                fontWeight: 800,
                fontSize: 38,
              }}
            >
              {arrow} {stat.change}
            </div>
          ) : null}
          {stat.note ? (
            <div style={{ color: COLORS.textSoft, fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 32 }}>
              {stat.note}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
