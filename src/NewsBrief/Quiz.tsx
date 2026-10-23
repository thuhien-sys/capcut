import { Check } from "lucide-react";
import React from "react";
import { Audio, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_DISPLAY } from "../fonts";
import { COLORS, VIDEO } from "../theme";
import { fadeUp, progress } from "./anim";
import { ART_SIZE, SceneArtView } from "./SceneArt";
import { QuizScene } from "./types";

const COUNTDOWN_SECONDS = 5;

/** Countdown start and reveal, in frames from the start of the scene. */
export const quizFrames = (scene: QuizScene) => {
  const countdown = Math.round(scene.countdownAt * VIDEO.fps);
  const reveal = Math.round((scene.revealAt ?? scene.countdownAt + COUNTDOWN_SECONDS) * VIDEO.fps);
  return { countdown, reveal };
};

/** The answers, in order, from a question written with [[answer]] blanks. */
export const quizAnswers = (question: string) => [...question.matchAll(/\[\[(.+?)\]\]/g)].map((m) => m[1]);

/**
 * Question text with each blank sized to its answer, so nothing moves when it is revealed.
 * Before `reveal` the answer is hidden behind a dashed line; then it pops in, in gold.
 */
export const QuizText: React.FC<{ question: string; reveal: number }> = ({ question, reveal }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const parts = question.split(/\[\[(.+?)\]\]/g);
  let blank = 0;

  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 0) return <React.Fragment key={i}>{part}</React.Fragment>;
        const start = reveal + blank++ * 6;
        const shown = frame >= start;
        const pop = shown ? spring({ frame: frame - start, fps, config: { damping: 10 } }) : 0;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              padding: "0 6px",
              borderRadius: 6,
              borderBottom: `4px ${shown ? "solid" : "dashed"} ${COLORS.gold}`,
              background: shown ? "rgba(245,196,0,0.16)" : "rgba(245,196,0,0.08)",
              color: shown ? COLORS.gold : "transparent",
              transform: shown ? `scale(${interpolate(pop, [0, 1], [0.6, 1])})` : undefined,
            }}
          >
            {part}
          </span>
        );
      })}
    </>
  );
};

const RING = 220;
const STROKE = 16;

const Countdown: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const elapsed = (frame - start) / fps;
  const remaining = Math.max(1, COUNTDOWN_SECONDS - Math.floor(elapsed));
  const r = (RING - STROKE) / 2;
  const circumference = 2 * Math.PI * r;
  const left = Math.max(0, 1 - elapsed / COUNTDOWN_SECONDS);
  const color = remaining <= 2 ? COLORS.red : COLORS.gold;
  // Each second the number bumps in.
  const bump = spring({ frame: (frame - start) % fps, fps, config: { damping: 12 } });

  return (
    <div
      style={{
        position: "absolute",
        left: (ART_SIZE - RING) / 2,
        top: (ART_SIZE - RING) / 2,
        width: RING,
        height: RING,
        transform: `scale(${progress(frame, start, 8)})`,
      }}
    >
      <svg width={RING} height={RING} style={{ position: "absolute", inset: 0 }}>
        <circle cx={RING / 2} cy={RING / 2} r={r} fill={COLORS.navyDeep} stroke="rgba(255,255,255,0.15)" strokeWidth={STROKE} />
        <circle
          cx={RING / 2}
          cy={RING / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - left)}
          transform={`rotate(-90 ${RING / 2} ${RING / 2})`}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT_DISPLAY,
          fontWeight: 900,
          fontSize: 120,
          color: COLORS.white,
          transform: `scale(${interpolate(bump, [0, 1], [1.35, 1])})`,
        }}
      >
        {remaining}
      </div>
    </div>
  );
};

const Solved: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - start, fps, config: { damping: 9 } });
  return (
    <div
      style={{
        position: "absolute",
        left: (ART_SIZE - RING) / 2,
        top: (ART_SIZE - RING) / 2,
        width: RING,
        height: RING,
        borderRadius: "50%",
        background: COLORS.up,
        boxShadow: "0 0 50px rgba(46,204,113,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${pop})`,
      }}
    >
      <Check size={130} color={COLORS.white} strokeWidth={3} />
    </div>
  );
};

/** Top screen of a quiz scene: question number, answer chips, and the countdown. */
export const QuizVisual: React.FC<{ scene: QuizScene; from: number }> = ({ scene, from }) => {
  const frame = useCurrentFrame();
  const { countdown, reveal } = quizFrames(scene);
  const answers = quizAnswers(scene.question);

  return (
    <>
      <div style={{ position: "absolute", left: 60, right: ART_SIZE + 90, top: 104 }}>
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
            FILL IN THE BLANKS
          </div>
        </div>
        <div
          style={{
            ...fadeUp(frame, from + 4, 16),
            marginTop: 12,
            fontFamily: FONT_DISPLAY,
            fontWeight: 900,
            fontSize: 76,
            whiteSpace: "nowrap",
            color: COLORS.white,
            textShadow: "0 6px 24px rgba(0,0,0,0.45)",
          }}
        >
          QUESTION {scene.number}
          <span style={{ color: COLORS.textSoft, fontSize: 44 }}> / {scene.total}</span>
        </div>
        <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 14 }}>
          {answers.map((answer, i) => {
            const start = reveal + i * 6;
            const shown = frame >= start;
            const p = progress(frame, from + 14 + i * 6, 12);
            return (
              <div
                key={answer}
                style={{
                  padding: "10px 22px",
                  background: shown ? COLORS.gold : "rgba(8,22,39,0.82)",
                  border: `3px ${shown ? "solid" : "dashed"} ${COLORS.gold}`,
                  color: shown ? COLORS.navyDeep : COLORS.gold,
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 900,
                  fontSize: 34,
                  opacity: p,
                  transform: shown ? `scale(${1 + 0.15 * Math.sin(progress(frame, start, 10) * Math.PI)})` : undefined,
                }}
              >
                {shown ? answer : `${i + 1} · ???`}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ position: "absolute", right: 40, top: 92, width: ART_SIZE, height: ART_SIZE }}>
        {frame < countdown ? (
          <SceneArtView art={{ icon: "question", satellites: ["bookOpen", "sparkles"] }} from={from} />
        ) : frame < reveal ? (
          <Countdown start={countdown} />
        ) : (
          <Solved start={reveal} />
        )}
      </div>
    </>
  );
};

/** One tick per second of the countdown, then a chime on the reveal. */
export const QuizSounds: React.FC<{ scene: QuizScene }> = ({ scene }) => {
  const { countdown, reveal } = quizFrames(scene);
  const ticks = Math.floor((reveal - countdown) / VIDEO.fps);
  return (
    <>
      {Array.from({ length: ticks }).map((_, i) => (
        <Sequence key={i} from={countdown + i * VIDEO.fps} durationInFrames={VIDEO.fps}>
          <Audio src={staticFile(i % 2 === 0 ? "sfx/tick.wav" : "sfx/tock.wav")} volume={0.45} />
        </Sequence>
      ))}
      <Sequence from={reveal} durationInFrames={2 * VIDEO.fps}>
        <Audio src={staticFile("sfx/chime.wav")} volume={0.4} />
      </Sequence>
    </>
  );
};
