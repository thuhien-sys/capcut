import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FONT_DISPLAY } from "../fonts";
import { COLORS, LAYOUT, VIDEO } from "../theme";
import { fadeUp, progress } from "./anim";
import { NewsBackground } from "./NewsBackground";
import { QuizVisual } from "./Quiz";
import { SceneArtView } from "./SceneArt";
import { ScreenVisualView } from "./ScreenVisual";
import { Episode, Scene } from "./types";

export const TICKER_HEIGHT = 64;
export const OPENER_FRAMES = { breaking: 70, wipe: 16 } as const;

/** The 1080x640 news screen, scaled down and centred so it sits inside the safe zone. */
const ScreenArea: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      position: "absolute",
      top: LAYOUT.screenTop,
      left: (VIDEO.width - LAYOUT.screenWidth * LAYOUT.screenScale) / 2,
      width: LAYOUT.screenWidth,
      height: LAYOUT.screenHeight,
      transform: `scale(${LAYOUT.screenScale})`,
      transformOrigin: "top left",
      borderRadius: 22,
      overflow: "hidden",
    }}
  >
    {children}
  </div>
);

const TopBar: React.FC<{ category: string; date: string }> = ({ category, date }) => {
  const frame = useCurrentFrame();
  const blink = Math.floor(frame / 15) % 2 === 0 ? 1 : 0.25;

  return (
    <div
      style={{
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
        whiteSpace: "nowrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 16px", background: COLORS.red }}>
        <div style={{ width: 14, height: 14, borderRadius: 7, background: COLORS.white, opacity: blink }} />
        LIVE
      </div>
      <div
        key={category}
        style={{
          ...fadeUp(frame, 0, 12, -16),
          padding: "6px 16px",
          background: "rgba(8,22,39,0.75)",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        {category}
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ padding: "6px 16px", background: "rgba(8,22,39,0.75)" }}>{date.toUpperCase()}</div>
    </div>
  );
};

const BreakingOpener: React.FC<{ headline: string; text: string }> = ({ headline, text: label }) => {
  const frame = useCurrentFrame();
  const end = OPENER_FRAMES.breaking;
  const wipe = progress(frame, 0, 14);
  const text = progress(frame, 8, 14);
  const exit = progress(frame, end - 14, 14);

  if (frame > end) return null;

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
          {label}
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

/** A red band sweeping across the screen between stories. */
const WipeOpener: React.FC = () => {
  const frame = useCurrentFrame();
  const x = progress(frame, 0, OPENER_FRAMES.wipe) * 2400 - 1300;
  if (frame > OPENER_FRAMES.wipe) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: -100,
        bottom: -100,
        left: x,
        width: 1100,
        transform: "skewX(-18deg)",
        background: `linear-gradient(90deg, transparent, ${COLORS.red} 25%, ${COLORS.red} 75%, transparent)`,
      }}
    />
  );
};

const LowerThird: React.FC<{ location: string; headline: string; start: number }> = ({
  location,
  headline,
  start,
}) => {
  const frame = useCurrentFrame();
  const tab = progress(frame, start - 6, 12);
  const bar = progress(frame, start, 16);

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
          fontSize: headline.length > 38 ? 32 : 38,
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

/** Persistent across scenes: background footage/graphics behind the news screen. */
export const ScreenBackground: React.FC<{ backgroundVideo?: string }> = ({ backgroundVideo }) => (
  <ScreenArea>
    <NewsBackground backgroundVideo={backgroundVideo} />
  </ScreenArea>
);

/** Persistent across scenes: scrolling ticker at the bottom of the news screen. */
export const Ticker: React.FC<{ source: string; date: string; items: string[]; totalFrames: number }> = ({
  source,
  date,
  items,
  totalFrames,
}) => {
  const frame = useCurrentFrame();
  const speed = 4;
  const copies = Math.ceil((totalFrames * speed) / 1200) + 2;
  const enter = progress(frame, 10, 14);

  return (
    <ScreenArea>
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
    </ScreenArea>
  );
};

/** Per-scene overlays on the news screen. */
export const NewsScreen: React.FC<{ episode: Episode; scene: Scene; durationInFrames: number }> = ({
  episode,
  scene,
  durationInFrames,
}) => {
  const opener = scene.opener ?? "wipe";
  const contentStart = OPENER_FRAMES[opener];

  return (
    <ScreenArea>
      {scene.type === "quiz" ? (
        <QuizVisual scene={scene} from={contentStart} />
      ) : (
        <>
          {scene.art ? <SceneArtView art={scene.art} from={contentStart} /> : null}
          <ScreenVisualView
            visual={scene.visual}
            from={contentStart}
            durationInFrames={durationInFrames}
            narrow={Boolean(scene.art)}
          />
        </>
      )}
      {opener === "breaking" ? (
        <BreakingOpener headline={scene.headline} text={scene.openerText ?? "BREAKING NEWS"} />
      ) : null}
      <TopBar category={scene.category} date={episode.date} />
      <LowerThird location={scene.location} headline={scene.headline} start={contentStart} />
      {opener === "wipe" ? <WipeOpener /> : null}
    </ScreenArea>
  );
};
