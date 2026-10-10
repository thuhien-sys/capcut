import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_DISPLAY } from "../fonts";
import { COLORS, LAYOUT } from "../theme";
import { fadeUp, progress } from "./anim";
import { NewsBackground } from "./NewsBackground";
import { StatCard } from "./StatCard";
import { Episode } from "./types";

const INTRO_END = 70;
const TICKER_HEIGHT = 64;

const TopBar: React.FC<{ category: string; date: string }> = ({ category, date }) => {
  const frame = useCurrentFrame();
  const blink = Math.floor(frame / 15) % 2 === 0 ? 1 : 0.25;

  return (
    <div
      style={{
        ...fadeUp(frame, 4, 14, -20),
        position: "absolute",
        top: 26,
        left: 40,
        right: 40,
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontFamily: FONT_DISPLAY,
        fontWeight: 800,
        fontSize: 26,
        letterSpacing: 2,
        color: COLORS.white,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 16px", background: COLORS.red }}>
        <div style={{ width: 14, height: 14, borderRadius: 7, background: COLORS.white, opacity: blink }} />
        LIVE
      </div>
      <div style={{ padding: "6px 16px", background: "rgba(8,22,39,0.75)", border: "1px solid rgba(255,255,255,0.3)" }}>
        {category}
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ padding: "6px 16px", background: "rgba(8,22,39,0.75)" }}>{date.toUpperCase()}</div>
    </div>
  );
};

const BreakingIntro: React.FC<{ headline: string }> = ({ headline }) => {
  const frame = useCurrentFrame();
  const wipe = progress(frame, 0, 14);
  const text = progress(frame, 8, 14);
  const exit = progress(frame, INTRO_END - 14, 14);

  if (frame > INTRO_END) return null;

  return (
    <AbsoluteFill style={{ justifyContent: "center", opacity: 1 - exit }}>
      <div
        style={{
          background: COLORS.red,
          clipPath: `inset(0 ${(1 - wipe) * 100}% 0 0)`,
          padding: "22px 60px",
          transform: `translateY(${exit * -40}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 900,
            fontSize: 92,
            letterSpacing: 4,
            color: COLORS.white,
            opacity: text,
            transform: `translateX(${(1 - text) * 60}px)`,
          }}
        >
          BREAKING NEWS
        </div>
      </div>
      <div
        style={{
          ...fadeUp(frame, 16, 14),
          marginTop: 18,
          padding: "0 60px",
          fontFamily: FONT_DISPLAY,
          fontWeight: 800,
          fontSize: 44,
          color: COLORS.white,
          textShadow: "0 4px 18px rgba(0,0,0,0.5)",
        }}
      >
        {headline}
      </div>
    </AbsoluteFill>
  );
};

const LowerThird: React.FC<{ location: string; headline: string }> = ({ location, headline }) => {
  const frame = useCurrentFrame();
  const tab = progress(frame, INTRO_END - 6, 12);
  const bar = progress(frame, INTRO_END, 16);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: TICKER_HEIGHT + 28,
        height: 84,
        display: "flex",
        fontFamily: FONT_DISPLAY,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 28px 0 40px",
          background: COLORS.red,
          color: COLORS.white,
          fontWeight: 900,
          fontSize: 32,
          letterSpacing: 2,
          transform: `translateX(${(tab - 1) * 400}px)`,
          zIndex: 1,
        }}
      >
        {location}
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          padding: "0 28px",
          background: COLORS.white,
          color: COLORS.navyDeep,
          fontWeight: 800,
          fontSize: 38,
          clipPath: `inset(0 ${(1 - bar) * 100}% 0 0)`,
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {headline}
      </div>
    </div>
  );
};

const Ticker: React.FC<{ source: string; date: string; items: string[] }> = ({ source, date, items }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const speed = 4;
  const copies = Math.ceil((durationInFrames * speed) / 1200) + 2;
  const enter = progress(frame, 10, 14);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: TICKER_HEIGHT,
        display: "flex",
        background: COLORS.navyDeep,
        borderTop: `3px solid ${COLORS.gold}`,
        transform: `translateY(${(1 - enter) * TICKER_HEIGHT}px)`,
        fontFamily: FONT_DISPLAY,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 22px",
          background: COLORS.white,
          color: COLORS.navyDeep,
          fontWeight: 800,
          fontSize: 26,
          whiteSpace: "nowrap",
          zIndex: 1,
        }}
      >
        {source} · {date}
      </div>
      <div style={{ flex: 1, overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div
          style={{
            whiteSpace: "nowrap",
            color: COLORS.white,
            fontWeight: 700,
            fontSize: 28,
            transform: `translateX(${40 - frame * speed}px)`,
          }}
        >
          {Array.from({ length: copies }).flatMap((_, c) =>
            items.map((item, i) => (
              <span key={`${c}-${i}`}>
                {item}
                <span style={{ color: COLORS.gold, margin: "0 26px" }}>◆</span>
              </span>
            )),
          )}
        </div>
      </div>
    </div>
  );
};

export const NewsScreen: React.FC<{ episode: Episode }> = ({ episode }) => {
  const { durationInFrames } = useVideoConfig();
  const statSpan = (durationInFrames - INTRO_END) / Math.max(episode.stats.length, 1);

  return (
    <div
      style={{
        position: "absolute",
        top: LAYOUT.screenTop,
        left: 0,
        width: "100%",
        height: LAYOUT.screenHeight,
        overflow: "hidden",
      }}
    >
      <NewsBackground backgroundVideo={episode.backgroundVideo} />
      {episode.stats.map((stat, i) => {
        const from = Math.round(INTRO_END + i * statSpan);
        const isLast = i === episode.stats.length - 1;
        const to = isLast ? durationInFrames + 30 : Math.round(from + statSpan);
        return <StatCard key={stat.label} stat={stat} from={from} to={to} />;
      })}
      <BreakingIntro headline={episode.headline} />
      <TopBar category={episode.category} date={episode.date} />
      <LowerThird location={episode.location} headline={episode.headline} />
      <Ticker source={episode.source} date={episode.date} items={episode.tickers} />
    </div>
  );
};
