import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { FONT_BODY, FONT_DISPLAY, FONT_IPA } from "../fonts";
import { COLORS, LAYOUT, SAFE, VIDEO } from "../theme";
import { fadeUp, progress } from "./anim";
import { RichText } from "./RichText";
import { useFitScale } from "./useFitScale";
import { QuizText, quizFrames } from "./Quiz";
import { CardScene, NewsScene, PatternScene, QuizScene, VerbListScene, VocabItem } from "./types";

const PADDING_X = SAFE.left;
const DIVIDER_X = 664;
/** Height the bilingual text may fill, so it ends above TikTok's caption. */
const TEXT_HEIGHT = LAYOUT.panelBottom - LAYOUT.panelTop - 50;

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
        width: VIDEO.width,
        height: LAYOUT.panelBottom - LAYOUT.panelTop,
        opacity: 1 - exit,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Stress marks (ˈ ˌ) allow a line break before them; glue them to the preceding letter. */
const keepIpaWords = (ipa: string) => ipa.replace(/(\S)([ˈˌ])/g, "$1\u2060$2");

/** Vocabulary density: 0 normal, 1 for long entries, 2 for many entries. */
type Density = 0 | 1 | 2;
const VOCAB_SIZE = [27, 25, 21] as const;
const VOCAB_GAP = [28, 22, 10] as const;

const Vocab: React.FC<{ item: VocabItem; delay: number; density: Density }> = ({ item, delay, density }) => {
  const frame = useCurrentFrame();
  const p = progress(frame, delay, 16);
  // Sized against the column's --fit, so a long vocabulary list shrinks to fit.
  const size = (n: number) => `calc(${n}px * var(--fit, 1))`;
  const base = VOCAB_SIZE[density];
  return (
    <div style={{ opacity: p, transform: `translateX(${(1 - p) * 30}px)` }}>
      <div style={{ fontFamily: FONT_IPA, fontStyle: "italic", fontWeight: 600, fontSize: size(base + 2), color: COLORS.vocab }}>
        {item.word}
        {item.pos ? ` (${item.pos})` : ""}:
      </div>
      {item.ipa ? (
        <div style={{ fontFamily: FONT_IPA, fontSize: size(base), color: COLORS.white, marginTop: 4 }}>
          {keepIpaWords(item.ipa)}
        </div>
      ) : null}
      <div style={{ fontFamily: FONT_BODY, fontSize: size(base), color: COLORS.white, marginTop: 2 }}>{item.meaning}</div>
    </div>
  );
};

export const NewsPanel: React.FC<{ scene: NewsScene; durationInFrames: number }> = ({ scene, durationInFrames }) => {
  const frame = useCurrentFrame();
  const divider = progress(frame, 6, 24);
  const vocabChars = scene.vocab.reduce((n, v) => n + v.word.length + (v.ipa ?? "").length + v.meaning.length, 0);
  const density: Density = scene.vocab.length > 5 ? 2 : vocabChars > 150 ? 1 : 0;
  // Without vocabulary the text spans the whole panel.
  const hasVocab = scene.vocab.length > 0;
  const textWidth = hasVocab ? DIVIDER_X - PADDING_X - 24 : SAFE.right - SAFE.left;
  // Size the bilingual text to fill the panel, leaving the bottom clear of TikTok's caption.
  const fit = useFitScale(TEXT_HEIGHT);
  const vocabFit = useFitScale(TEXT_HEIGHT, 0.6, 1);
  const px = (n: number) => `calc(${n}px * var(--fit))`;

  return (
    <PanelArea durationInFrames={durationInFrames}>
      <div
        style={{
          position: "absolute",
          top: 40,
          left: PADDING_X,
          width: textWidth,
          fontFamily: FONT_BODY,
          whiteSpace: "pre-line",
          ...fit.style,
        }}
        ref={fit.ref}
      >
        <div style={{ ...fadeUp(frame, 8, 18), fontWeight: 700, fontSize: px(37), lineHeight: 1.36, color: COLORS.white }}>
          {scene.englishTitle ? (
            <div style={{ color: COLORS.gold, fontWeight: 800, marginBottom: px(12) }}>{scene.englishTitle}</div>
          ) : null}
          <RichText text={scene.english} highlightStart={26} />
        </div>
        <div
          style={{
            ...fadeUp(frame, 40, 18),
            marginTop: px(46),
            fontWeight: 400,
            fontSize: px(33),
            lineHeight: 1.42,
            color: COLORS.textSoft,
          }}
        >
          {scene.vietnameseTitle ? (
            <div style={{ color: COLORS.white, fontWeight: 700, marginBottom: px(10) }}>{scene.vietnameseTitle}</div>
          ) : null}
          <RichText text={scene.vietnamese} variant="bold" />
        </div>
      </div>
      {hasVocab ? (
        <div
          style={{
            position: "absolute",
            left: DIVIDER_X,
            top: 40,
            width: 3,
            height: (TEXT_HEIGHT + 20) * divider,
            background: COLORS.divider,
          }}
        />
      ) : null}
      <div
        style={{
          position: "absolute",
          top: 44,
          left: DIVIDER_X + 24,
          width: SAFE.right - DIVIDER_X - 24,
          display: "flex",
          flexDirection: "column",
          gap: VOCAB_GAP[density],
          ...vocabFit.style,
        }}
        ref={vocabFit.ref}
      >
        {scene.vocab.map((item, i) => (
          <Vocab key={item.word} item={item} delay={20 + i * 8} density={density} />
        ))}
      </div>
    </PanelArea>
  );
};

/** Bottom panel of a quiz: the question with blanks; translation and vocabulary after the reveal. */
export const QuizPanel: React.FC<{ scene: QuizScene; durationInFrames: number }> = ({ scene, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { reveal } = quizFrames(scene);
  const after = progress(frame, reveal + 12, 18);
  const vocabChars = scene.vocab.reduce((n, v) => n + v.word.length + (v.ipa ?? "").length + v.meaning.length, 0);
  const density: Density = scene.vocab.length > 5 ? 2 : vocabChars > 150 ? 1 : 0;
  // While viewers guess, the question alone fills the panel; at the reveal it shrinks
  // to make room for the translation.
  const fitQuestion = useFitScale(TEXT_HEIGHT, 0.6, 1.5);
  const fitAll = useFitScale(TEXT_HEIGHT);
  const vocabFit = useFitScale(TEXT_HEIGHT, 0.6, 1);
  const fitNow = interpolate(frame, [reveal, reveal + 15], [fitQuestion.scale, fitAll.scale], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const px = (n: number) => `calc(${n}px * var(--fit))`;
  const column: React.CSSProperties = {
    position: "absolute",
    top: 40,
    left: PADDING_X,
    width: DIVIDER_X - PADDING_X - 24,
    fontFamily: FONT_BODY,
  };
  const questionStyle: React.CSSProperties = { fontWeight: 700, fontSize: px(37), lineHeight: 1.5, color: COLORS.white };

  return (
    <PanelArea durationInFrames={durationInFrames}>
      {/* Invisible copy of the question alone, measured for the guessing phase. */}
      <div ref={fitQuestion.ref} aria-hidden style={{ ...column, ...fitQuestion.style, visibility: "hidden" }}>
        <div style={questionStyle}>
          <QuizText question={scene.question} reveal={Number.MAX_SAFE_INTEGER} />
        </div>
      </div>
      <div ref={fitAll.ref} style={{ ...column, ...({ "--fit": fitNow } as React.CSSProperties) }}>
        <div style={{ ...fadeUp(frame, 8, 18), ...questionStyle }}>
          <QuizText question={scene.question} reveal={reveal} />
        </div>
        {/* Laid out from the start so the fit accounts for it; shown only after the reveal. */}
        <div
          style={{
            opacity: after,
            transform: `translateY(${(1 - after) * 20}px)`,
            marginTop: px(40),
            fontWeight: 400,
            fontSize: px(33),
            lineHeight: 1.42,
            color: COLORS.textSoft,
          }}
        >
          <RichText text={scene.vietnamese} variant="bold" />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: DIVIDER_X,
          top: 40,
          width: 3,
          height: (TEXT_HEIGHT + 20) * progress(frame, 6, 24),
          background: COLORS.divider,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 44,
          left: DIVIDER_X + 24,
          width: SAFE.right - DIVIDER_X - 24,
          display: "flex",
          flexDirection: "column",
          gap: VOCAB_GAP[density],
          ...vocabFit.style,
        }}
        ref={vocabFit.ref}
      >
        {scene.vocab.map((item, i) => (
          <Vocab key={item.word} item={item} delay={reveal + 18 + i * 8} density={density} />
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
    <PanelArea durationInFrames={durationInFrames} style={{ padding: `36px ${VIDEO.width - SAFE.right}px 0 ${SAFE.left}px` }}>
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
    <PanelArea durationInFrames={durationInFrames} style={{ padding: `40px ${VIDEO.width - SAFE.right}px 0 ${SAFE.left}px` }}>
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
  const height = LAYOUT.panelBottom - LAYOUT.panelTop;
  // Card text is sized to fit between the news screen and TikTok's caption.
  const fit = useFitScale(height - 40, 0.55, 1);
  const px = (n: number) => `calc(${n}px * var(--fit))`;
  return (
    <PanelArea durationInFrames={durationInFrames}>
      <div
        style={{
          position: "absolute",
          left: SAFE.left,
          width: SAFE.right - SAFE.left,
          top: 0,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          ref={fit.ref}
          style={{
            ...fit.style,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: px(30),
            textAlign: "center",
          }}
        >
          {scene.lines.map((line, i) => (
            <div
              key={line.text}
              style={{
                ...fadeUp(frame, itemStart(line.at, 10 + i * 14), 18),
                fontFamily: line.size === "lg" ? FONT_DISPLAY : FONT_BODY,
                fontWeight: line.size === "lg" ? 900 : line.soft ? 400 : 700,
                fontSize: px(CARD_SIZES[line.size ?? "md"]),
                lineHeight: 1.3,
                color: line.accent ? COLORS.gold : line.soft ? COLORS.textSoft : COLORS.white,
              }}
            >
              <RichText text={line.text} highlightStart={itemStart(line.at, 10 + i * 14) + 10} />
            </div>
          ))}
        </div>
      </div>
    </PanelArea>
  );
};
