import React from "react";
import { useCurrentFrame } from "remotion";
import { FONT_BODY, FONT_DISPLAY, FONT_IPA } from "../fonts";
import { COLORS, LAYOUT, VIDEO } from "../theme";
import { fadeUp, progress } from "./anim";
import { RichText } from "./RichText";
import { CardScene, NewsScene, PatternScene, VerbListScene, VocabItem } from "./types";

const PADDING_X = 44;
const DIVIDER_X = 712;

/** Frame an item appears: its `at` time if set, otherwise a stagger. */
const itemStart = (at: number | undefined, fallback: number) =>
  at !== undefined ? Math.round(at * VIDEO.fps) : fallback;

/** Once the narrator moves on to the next timed item, earlier ones dim. */
const dimmed = (frame: number, nextAt: number | undefined) =>
  nextAt !== undefined && frame >= Math.round(nextAt * VIDEO.fps) ? 0.5 : 1;

/** The lower half of the frame; fades out over the last frames of its scene. */
const PanelArea: React.FC<{ durationInFrames: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  durationInFrames,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const exit = progress(frame, durationInFrames - 10, 10);
  return (
    <div
      style={{
        position: "absolute",
        top: LAYOUT.panelTop,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 1 - exit,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const Vocab: React.FC<{ item: VocabItem; delay: number; compact: boolean }> = ({ item, delay, compact }) => {
  const frame = useCurrentFrame();
  const p = progress(frame, delay, 16);
  const size = compact ? 28 : 31;
  return (
    <div style={{ opacity: p, transform: `translateX(${(1 - p) * 30}px)` }}>
      <div style={{ fontFamily: FONT_IPA, fontStyle: "italic", fontWeight: 600, fontSize: size + 2, color: COLORS.vocab }}>
        {item.word}
        {item.pos ? ` (${item.pos})` : ""}:
      </div>
      {item.ipa ? (
        <div style={{ fontFamily: FONT_IPA, fontSize: size, color: COLORS.white, marginTop: 4 }}>{item.ipa}</div>
      ) : null}
      <div style={{ fontFamily: FONT_BODY, fontSize: size, color: COLORS.white, marginTop: 2 }}>{item.meaning}</div>
    </div>
  );
};

export const NewsPanel: React.FC<{ scene: NewsScene; durationInFrames: number }> = ({ scene, durationInFrames }) => {
  const frame = useCurrentFrame();
  const divider = progress(frame, 6, 24);
  const vocabChars = scene.vocab.reduce((n, v) => n + v.word.length + (v.ipa ?? "").length + v.meaning.length, 0);
  const compact = vocabChars > 150;

  return (
    <PanelArea durationInFrames={durationInFrames}>
      <div
        style={{
          position: "absolute",
          top: 40,
          left: PADDING_X,
          width: DIVIDER_X - PADDING_X - 28,
          fontFamily: FONT_BODY,
        }}
      >
        <div style={{ ...fadeUp(frame, 8, 18), fontWeight: 700, fontSize: 37, lineHeight: 1.36, color: COLORS.white }}>
          <RichText text={scene.english} highlightStart={26} />
        </div>
        <div
          style={{
            ...fadeUp(frame, 40, 18),
            marginTop: 46,
            fontWeight: 400,
            fontSize: 33,
            lineHeight: 1.42,
            color: COLORS.textSoft,
          }}
        >
          {scene.vietnamese}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: DIVIDER_X,
          top: 40,
          width: 3,
          height: 980 * divider,
          background: COLORS.divider,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 44,
          left: DIVIDER_X + 30,
          right: 24,
          display: "flex",
          flexDirection: "column",
          gap: compact ? 28 : 34,
        }}
      >
        {scene.vocab.map((item, i) => (
          <Vocab key={item.word} item={item} delay={20 + i * 8} compact={compact} />
        ))}
      </div>
    </PanelArea>
  );
};

const SectionTitle: React.FC<{ children: React.ReactNode; delay: number }> = ({ children, delay }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        ...fadeUp(frame, delay, 16),
        display: "flex",
        alignItems: "center",
        gap: 18,
        fontFamily: FONT_DISPLAY,
        fontWeight: 900,
        fontSize: 40,
        letterSpacing: 1,
        color: COLORS.gold,
      }}
    >
      <div style={{ width: 10, height: 44, background: COLORS.red }} />
      {children}
    </div>
  );
};

export const VerbListPanel: React.FC<{ scene: VerbListScene; durationInFrames: number }> = ({
  scene,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  return (
    <PanelArea durationInFrames={durationInFrames} style={{ padding: `36px ${PADDING_X}px 0` }}>
      <div
        style={{
          ...fadeUp(frame, 6, 16),
          fontFamily: FONT_BODY,
          fontWeight: 700,
          fontSize: 34,
          lineHeight: 1.35,
          color: COLORS.white,
        }}
      >
        <RichText text={scene.intro} highlightStart={20} />
      </div>
      <div style={{ marginTop: 26 }}>
        <SectionTitle delay={16}>{scene.title}</SectionTitle>
      </div>
      <div style={{ marginTop: 18 }}>
        {scene.items.map((item, i) => {
          const start = itemStart(item.at, 26 + i * 12);
          const p = progress(frame, start, 16);
          return (
            <div
              key={item.word}
              style={{
                padding: "14px 0",
                borderBottom: i < scene.items.length - 1 ? "1px solid rgba(255,255,255,0.18)" : undefined,
                opacity: p,
                transform: `translateX(${(1 - p) * 40}px)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
                <span style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 38, color: COLORS.gold }}>
                  {item.word}
                </span>
                <span style={{ fontFamily: FONT_IPA, fontSize: 30, color: COLORS.white }}>{item.ipa}</span>
                <span style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 30, color: COLORS.textSoft }}>
                  → {item.usage}
                </span>
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontFamily: FONT_IPA,
                  fontStyle: "italic",
                  fontSize: 30,
                  color: COLORS.white,
                }}
              >
                <RichText text={item.example} highlightStart={start + 8} />
              </div>
            </div>
          );
        })}
      </div>
    </PanelArea>
  );
};

export const PatternPanel: React.FC<{ scene: PatternScene; durationInFrames: number }> = ({
  scene,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  return (
    <PanelArea durationInFrames={durationInFrames} style={{ padding: `40px ${PADDING_X}px 0` }}>
      <SectionTitle delay={6}>{scene.title}</SectionTitle>
      <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 24 }}>
        {scene.items.map((item, i) => {
          const start = itemStart(item.at, 16 + i * 14);
          const p = progress(frame, start, 16) * dimmed(frame, scene.items[i + 1]?.at);
          return (
            <div
              key={item.pattern}
              style={{
                paddingLeft: 24,
                borderLeft: `6px solid ${COLORS.gold}`,
                opacity: p,
                transform: `translateX(${(1 - p) * 40}px)`,
              }}
            >
              <div style={{ fontFamily: FONT_BODY, fontWeight: 800, fontSize: 38, color: COLORS.gold }}>
                {item.pattern}
              </div>
              {item.meaning ? (
                <div style={{ fontFamily: FONT_BODY, fontSize: 31, color: COLORS.white, marginTop: 4 }}>
                  {item.meaning}
                </div>
              ) : null}
              <div
                style={{
                  fontFamily: FONT_IPA,
                  fontStyle: "italic",
                  fontSize: 31,
                  color: COLORS.textSoft,
                  marginTop: 4,
                }}
              >
                <RichText text={item.example} highlightStart={start + 10} />
              </div>
            </div>
          );
        })}
      </div>
    </PanelArea>
  );
};

const CARD_SIZES = { lg: 62, md: 44, sm: 34 } as const;

export const CardPanel: React.FC<{ scene: CardScene; durationInFrames: number }> = ({ scene, durationInFrames }) => {
  const frame = useCurrentFrame();
  return (
    <PanelArea
      durationInFrames={durationInFrames}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 34,
        padding: `0 ${PADDING_X + 20}px 220px`,
        textAlign: "center",
      }}
    >
      {scene.lines.map((line, i) => (
        <div
          key={line.text}
          style={{
            ...fadeUp(frame, itemStart(line.at, 10 + i * 14), 18),
            fontFamily: line.size === "lg" ? FONT_DISPLAY : FONT_BODY,
            fontWeight: line.size === "lg" ? 900 : 700,
            fontSize: CARD_SIZES[line.size ?? "md"],
            lineHeight: 1.3,
            color: line.accent ? COLORS.gold : COLORS.white,
          }}
        >
          <RichText text={line.text} highlightStart={itemStart(line.at, 10 + i * 14) + 10} />
        </div>
      ))}
    </PanelArea>
  );
};
