import React from "react";
import { useCurrentFrame } from "remotion";
import { FONT_DISPLAY } from "../fonts";
import { COLORS, VIDEO } from "../theme";
import { fadeUp, progress } from "./anim";
import { ICONS, IconName } from "./Icons";
import { ART_SIZE } from "./SceneArt";
import { StatCard } from "./StatCard";
import { ScreenVisual } from "./types";

/** Right edge of the visual: leaves room for scene art when there is some. */
const contentRight = (narrow: boolean) => (narrow ? ART_SIZE + 90 : 60);

/** Largest font size (up to `max`) that keeps a one-line title within `width`. */
const fitTitle = (title: string, width: number, max: number) => Math.min(max, Math.floor(width / (title.length * 0.7)));

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

const Points: React.FC<{ label: string; points: string[]; icons?: IconName[]; from: number }> = ({
  label,
  points,
  icons,
  from,
}) => {
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
          const Icon = icons?.[i] ? ICONS[icons[i]] : null;
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
                {Icon ? <Icon size={32} color={COLORS.white} strokeWidth={2.2} /> : i + 1}
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
  narrow: boolean;
}> = ({ kicker, title, subtitle, direction, from, narrow }) => {
  const frame = useCurrentFrame();
  const t = progress(frame, from + 6, 18);
  const arrowColor = direction === "down" ? COLORS.down : COLORS.up;

  return (
    <div style={{ position: "absolute", left: 60, right: contentRight(narrow), top: 110 }}>
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
          fontSize: narrow ? fitTitle(title, 1080 - 60 - contentRight(true), 92) : title.length > 12 ? 80 : 104,
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

const Chips: React.FC<{
  kicker: string;
  title: string;
  chips: { name: string; note?: string }[];
  from: number;
  narrow: boolean;
}> = ({ kicker, title, chips, from, narrow }) => {
  const frame = useCurrentFrame();
  const t = progress(frame, from + 4, 16);

  return (
    <div style={{ position: "absolute", left: 60, right: contentRight(narrow), top: 104 }}>
      <div style={fadeUp(frame, from, 14)}>
        <Chip>{kicker}</Chip>
      </div>
      <div
        style={{
          marginTop: 12,
          opacity: t,
          transform: `translateX(${(1 - t) * -40}px)`,
          fontFamily: FONT_DISPLAY,
          fontWeight: 900,
          fontSize: narrow
            ? fitTitle(title, 1080 - 60 - contentRight(true), 72)
            : title.length > 18
              ? 54
              : title.length > 12
                ? 66
                : 84,
          lineHeight: 1.1,
          whiteSpace: "nowrap",
          color: COLORS.white,
          textShadow: "0 6px 24px rgba(0,0,0,0.45)",
        }}
      >
        {title}
      </div>
      <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 14 }}>
        {chips.map((chip, i) => {
          const p = progress(frame, from + 16 + i * 8, 14);
          return (
            <div
              key={chip.name}
              style={{
                padding: chip.note ? "8px 20px 10px" : "12px 22px",
                background: "rgba(8,22,39,0.82)",
                borderLeft: `6px solid ${COLORS.gold}`,
                opacity: p,
                transform: `scale(${0.85 + 0.15 * p})`,
                transformOrigin: "left center",
                fontFamily: FONT_DISPLAY,
              }}
            >
              <div style={{ fontWeight: 800, fontSize: narrow ? 28 : 34, color: COLORS.white }}>{chip.name}</div>
              {chip.note ? (
                <div style={{ fontWeight: 700, fontSize: narrow ? 18 : 21, color: COLORS.textSoft, marginTop: 2 }}>
                  {chip.note}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ScreenVisualView: React.FC<{
  visual: ScreenVisual;
  from: number;
  durationInFrames: number;
  /** True when scene art takes the right side of the screen. */
  narrow: boolean;
}> = ({ visual, from, durationInFrames, narrow }) => {
  if (visual.type === "points") {
    return <Points label={visual.label} points={visual.points} icons={visual.icons} from={from} />;
  }
  if (visual.type === "chips") {
    return <Chips {...visual} from={from} narrow={narrow} />;
  }
  if (visual.type === "title") {
    return <Title {...visual} from={from} narrow={narrow} />;
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
