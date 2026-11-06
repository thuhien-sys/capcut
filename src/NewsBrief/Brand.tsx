import { TrendingUp } from "lucide-react";
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_BODY, FONT_DISPLAY } from "../fonts";
import { COLORS, SAFE, VIDEO } from "../theme";
import { fadeUp, progress } from "./anim";
import { Globe } from "./NewsBackground";
import { BrandScene } from "./types";

const EMBLEM = 340;

/** Full-screen channel opener/closer: emblem, channel name and slogan, like a TV news ident. */
export const BrandCard: React.FC<{
  scene: BrandScene;
  channel: string;
  slogan: string;
  date: string;
  durationInFrames: number;
}> = ({ scene, channel, slogan, date, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ring = progress(frame, 4, 26);
  const emblem = spring({ frame: frame - 2, fps, config: { damping: 13 } });
  const name = progress(frame, 16, 18);
  const line = progress(frame, 26, 20);
  const sloganStart = Math.round((scene.sloganAt ?? 2.5) * fps);
  const exit = progress(frame, durationInFrames - 10, 10);
  const sweep = interpolate(frame, [0, durationInFrames], [-400, 1500]);
  const words = channel.split(" ");
  const half = Math.ceil(words.length / 2);
  const lines = [words.slice(0, half).join(" "), words.slice(half).join(" ")];
  const r = EMBLEM / 2 - 8;
  const circumference = 2 * Math.PI * r;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 38%, #24558f 0%, ${COLORS.navyDark} 45%, ${COLORS.navyDeep} 100%)`,
        opacity: 1 - exit,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          opacity: 0.08,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Light sweep */}
      <div
        style={{
          position: "absolute",
          top: -200,
          bottom: -200,
          left: sweep,
          width: 300,
          transform: "skewX(-20deg)",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />
      {/* Emblem */}
      <div
        style={{
          position: "absolute",
          left: (VIDEO.width - EMBLEM) / 2,
          top: 430,
          width: EMBLEM,
          height: EMBLEM,
          transform: `scale(${emblem})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: `radial-gradient(circle at 35% 30%, #2c6db3, ${COLORS.navyDark} 70%)`,
            boxShadow: `0 0 80px rgba(245,196,0,${0.35 * ring})`,
          }}
        />
        <div style={{ position: "absolute", left: 40, top: 40, opacity: 0.55 }}>
          <Globe size={EMBLEM - 80} />
        </div>
        <svg width={EMBLEM} height={EMBLEM} style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
          <circle
            cx={EMBLEM / 2}
            cy={EMBLEM / 2}
            r={r}
            fill="none"
            stroke={COLORS.gold}
            strokeWidth={10}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - ring)}
            strokeLinecap="round"
          />
        </svg>
        {[0, 1, 2].map((i) => {
          const a = frame / 30 + (i * Math.PI * 2) / 3;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: EMBLEM / 2 + Math.cos(a) * (r + 2) - 9,
                top: EMBLEM / 2 + Math.sin(a) * (r + 2) - 9,
                width: 18,
                height: 18,
                borderRadius: 9,
                background: i === 0 ? COLORS.red : COLORS.gold,
                opacity: ring,
              }}
            />
          );
        })}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: progress(frame, 10, 14),
            transform: `scale(${0.8 + 0.2 * progress(frame, 10, 14)})`,
          }}
        >
          <TrendingUp size={130} color={COLORS.white} strokeWidth={2.4} />
        </div>
      </div>
      {/* Kicker, name, slogan */}
      <div
        style={{
          position: "absolute",
          left: SAFE.left,
          right: VIDEO.width - SAFE.right,
          top: 830,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            ...fadeUp(frame, 10, 16),
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: 30,
            letterSpacing: 10,
            color: COLORS.gold,
          }}
        >
          {scene.kicker}
        </div>
        {lines.map((text, i) => (
          <div
            key={text}
            style={{
              marginTop: i === 0 ? 18 : 0,
              fontFamily: FONT_DISPLAY,
              fontWeight: 900,
              fontSize: 84,
              lineHeight: 1.08,
              color: COLORS.white,
              whiteSpace: "nowrap",
              clipPath: `inset(0 ${(1 - progress(frame, 16 + i * 6, 18)) * 100}% 0 0)`,
              transform: `translateY(${(1 - name) * 20}px)`,
            }}
          >
            {text}
          </div>
        ))}
        <div
          style={{
            marginTop: 26,
            width: 620 * line,
            height: 6,
            borderRadius: 3,
            background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
          }}
        />
        <div
          style={{
            ...fadeUp(frame, sloganStart, 18),
            marginTop: 28,
            fontFamily: FONT_BODY,
            fontWeight: 700,
            fontSize: 40,
            color: COLORS.white,
          }}
        >
          {slogan}
        </div>
      </div>
      {/* Date line */}
      <div
        style={{
          ...fadeUp(frame, 30, 16),
          position: "absolute",
          left: 0,
          right: 0,
          top: 1560,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 14,
          fontFamily: FONT_DISPLAY,
          fontWeight: 800,
          fontSize: 26,
          letterSpacing: 3,
          color: COLORS.textSoft,
        }}
      >
        <div style={{ width: 14, height: 14, borderRadius: 7, background: COLORS.red }} />
        {date.toUpperCase()}
      </div>
    </AbsoluteFill>
  );
};
