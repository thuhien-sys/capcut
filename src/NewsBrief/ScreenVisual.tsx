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
  chips: { name: string; note?: string; at?: number }[];
  from: number;
  narrow: boolean;
}> = ({ kicker, title, chips, from, narrow }) => {
  const frame = useCurrentFrame();
  const t = progress(frame, from + 4, 16);
  // Many chips: smaller ones so three rows still clear the lower third.
  const small = narrow || chips.length > 6;

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
          const start = chip.at !== undefined ? Math.round(chip.at * VIDEO.fps) : from + 16 + i * 8;
          const p = progress(frame, start, 14);
          return (
            <div
              key={chip.name}
              style={{
                padding: chip.note ? "8px 20px 10px" : small ? "9px 18px" : "12px 22px",
                background: "rgba(8,22,39,0.82)",
                borderLeft: `6px solid ${COLORS.gold}`,
                opacity: p,
                transform: `scale(${0.85 + 0.15 * p})`,
                transformOrigin: "left center",
                fontFamily: FONT_DISPLAY,
              }}
            >
              <div style={{ fontWeight: 800, fontSize: small ? 28 : 34, color: COLORS.white }}>{chip.name}</div>
              {chip.note ? (
                <div style={{ fontWeight: 700, fontSize: small ? 18 : 21, color: COLORS.textSoft, marginTop: 2 }}>
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

/** Frames at which each timed item appears; untimed items share the scene evenly. */
const scheduleItems = (items: { at?: number }[], from: number, durationInFrames: number) => {
  const span = (durationInFrames - from) / Math.max(items.length, 1);
  return items.map((item, i) =>
    item.at !== undefined ? Math.max(from, Math.round(item.at * VIDEO.fps)) : Math.round(from + i * span),
  );
};

const NumberCard: React.FC<{
  item: { label: string; digits: string; highlight: number; note?: string };
  from: number;
  to: number;
}> = ({ item, from, to }) => {
  const frame = useCurrentFrame();
  if (frame < from || frame > to) return null;
  const enter = progress(frame, from, 14);
  const exit = progress(frame, to - 12, 12);
  const typed = progress(frame, from + 4, 16);
  const pop = progress(frame, from + 20, 12);

  const total = item.digits.replace(/\s/g, "").length;
  let seen = 0;
  const shown = Math.ceil(typed * total);

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        top: 100,
        opacity: enter * (1 - exit),
        transform: `translateX(${(1 - enter) * -80 + exit * 80}px)`,
      }}
    >
      <Chip>{item.label}</Chip>
      <div
        style={{
          marginTop: 18,
          padding: "22px 30px",
          borderRadius: 22,
          background: "linear-gradient(135deg, rgba(44,109,179,0.55), rgba(8,22,39,0.85))",
          border: "2px solid rgba(255,255,255,0.18)",
          boxShadow: "0 14px 40px rgba(0,0,0,0.45)",
          fontFamily: FONT_DISPLAY,
          fontWeight: 900,
          fontSize: 84,
          letterSpacing: 4,
          whiteSpace: "nowrap",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {item.digits.split("").map((ch, i) => {
          if (/\s/.test(ch)) return <span key={i}> </span>;
          const index = seen++;
          const highlighted = index >= total - item.highlight;
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity: index < shown ? 1 : 0,
                color: highlighted ? COLORS.gold : "rgba(255,255,255,0.72)",
                transform: highlighted ? `scale(${1 + 0.18 * Math.sin(pop * Math.PI)})` : undefined,
                textShadow: highlighted ? `0 0 ${24 * pop}px rgba(245,196,0,0.7)` : undefined,
              }}
            >
              {ch}
            </span>
          );
        })}
      </div>
      {item.note ? (
        <div
          style={{
            ...fadeUp(frame, from + 22, 12),
            marginTop: 16,
            color: COLORS.textSoft,
            fontFamily: FONT_DISPLAY,
            fontWeight: 700,
            fontSize: 30,
          }}
        >
          {item.note}
        </div>
      ) : null}
    </div>
  );
};

const FLOW_NODE = 220;
const FLOW_CIRCLE = 108;

const Flow: React.FC<{
  kicker: string;
  title: string;
  nodes: { label: string; note?: string; icon: IconName; at?: number }[];
  arrows: string[];
  from: number;
}> = ({ kicker, title, nodes, arrows, from }) => {
  const frame = useCurrentFrame();
  const starts = nodes.map((node, i) =>
    node.at !== undefined ? Math.round(node.at * VIDEO.fps) : from + 14 + i * 16,
  );
  const gap = (1080 - 120 - nodes.length * FLOW_NODE) / Math.max(nodes.length - 1, 1);

  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: 104 }}>
      <div style={fadeUp(frame, from, 14)}>
        <Chip>{kicker}</Chip>
      </div>
      <div
        style={{
          ...fadeUp(frame, from + 4, 16),
          marginTop: 10,
          fontFamily: FONT_DISPLAY,
          fontWeight: 900,
          fontSize: fitTitle(title, 960, 64),
          whiteSpace: "nowrap",
          color: COLORS.white,
          textShadow: "0 6px 24px rgba(0,0,0,0.45)",
        }}
      >
        {title}
      </div>
      <div style={{ position: "relative", marginTop: 20, height: 200 }}>
        {arrows.map((label, i) => {
          // An arrow draws once both of its ends are on screen.
          const start = Math.max(starts[i], starts[i + 1]) + 6;
          const draw = progress(frame, start, 18);
          const x1 = (i + 1) * FLOW_NODE + i * gap - 50;
          const width = gap + 100 - 2 * 24;
          return (
            <div key={label} style={{ position: "absolute", left: x1 + 24, top: FLOW_CIRCLE / 2 - 14, width }}>
              <svg width={width} height={28} style={{ overflow: "visible" }}>
                <line
                  x1={0}
                  y1={14}
                  x2={(width - 16) * draw}
                  y2={14}
                  stroke={COLORS.gold}
                  strokeWidth={6}
                  strokeLinecap="round"
                />
                {draw > 0.95 ? <polygon points={`${width - 20},2 ${width},14 ${width - 20},26`} fill={COLORS.gold} /> : null}
              </svg>
              <div
                style={{
                  marginTop: 6,
                  textAlign: "center",
                  opacity: draw,
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 700,
                  fontSize: 21,
                  lineHeight: 1.2,
                  color: COLORS.gold,
                }}
              >
                {label}
              </div>
            </div>
          );
        })}
        {nodes.map((node, i) => {
          const Icon = ICONS[node.icon];
          const p = progress(frame, starts[i], 16);
          return (
            <div
              key={node.label}
              style={{
                position: "absolute",
                left: i * (FLOW_NODE + gap),
                top: 0,
                width: FLOW_NODE,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                opacity: p,
                transform: `scale(${0.7 + 0.3 * p})`,
              }}
            >
              <div
                style={{
                  width: FLOW_CIRCLE,
                  height: FLOW_CIRCLE,
                  borderRadius: "50%",
                  background: `radial-gradient(circle at 35% 30%, #2c6db3 0%, ${COLORS.navyDark} 70%)`,
                  border: `5px solid ${COLORS.gold}`,
                  boxShadow: "0 0 28px rgba(245,196,0,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={54} color={COLORS.white} strokeWidth={1.8} />
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 800,
                  fontSize: 30,
                  color: COLORS.white,
                  textShadow: "0 4px 14px rgba(0,0,0,0.5)",
                }}
              >
                {node.label}
              </div>
              {node.note ? (
                <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 20, color: COLORS.textSoft }}>
                  {node.note}
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
  if (visual.type === "flow") {
    return <Flow {...visual} from={from} />;
  }
  if (visual.type === "numbers") {
    const starts = scheduleItems(visual.items, from, durationInFrames);
    return (
      <>
        {visual.items.map((item, i) => (
          <NumberCard
            key={item.label + item.digits}
            item={item}
            from={starts[i]}
            to={i === visual.items.length - 1 ? durationInFrames + 30 : starts[i + 1]}
          />
        ))}
      </>
    );
  }
  if (visual.type === "title") {
    return <Title {...visual} from={from} narrow={narrow} />;
  }

  // Stats with `at` appear when they are read out; the rest share the scene evenly.
  const starts = scheduleItems(visual.stats, from, durationInFrames);
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
