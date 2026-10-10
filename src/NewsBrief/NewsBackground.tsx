import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame, Video } from "remotion";
import { COLORS } from "../theme";

/** Rotating wireframe globe drawn with ellipses. */
const Globe: React.FC<{ size: number }> = ({ size }) => {
  const frame = useCurrentFrame();
  const r = size / 2;
  const meridians = 8;
  const turn = (frame / 240) * Math.PI;

  return (
    <svg width={size} height={size} viewBox={`${-r - 2} ${-r - 2} ${size + 4} ${size + 4}`}>
      <circle r={r} fill="none" stroke={COLORS.white} strokeWidth={2} />
      {Array.from({ length: meridians }).map((_, i) => {
        const angle = (i / meridians) * Math.PI + turn;
        return (
          <ellipse
            key={`m${i}`}
            rx={Math.abs(Math.cos(angle)) * r}
            ry={r}
            fill="none"
            stroke={COLORS.white}
            strokeWidth={1.2}
          />
        );
      })}
      {[-0.66, -0.33, 0, 0.33, 0.66].map((t) => {
        const y = t * r;
        const half = Math.sqrt(r * r - y * y);
        return (
          <line key={`p${t}`} x1={-half} x2={half} y1={y} y2={y} stroke={COLORS.white} strokeWidth={1.2} />
        );
      })}
    </svg>
  );
};

export const NewsBackground: React.FC<{ backgroundVideo?: string }> = ({ backgroundVideo }) => {
  const frame = useCurrentFrame();

  if (backgroundVideo) {
    return (
      <AbsoluteFill>
        <Video src={staticFile(backgroundVideo)} muted loop style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <AbsoluteFill
          style={{ background: `linear-gradient(180deg, ${COLORS.navyDeep}cc 0%, ${COLORS.navyDeep}66 45%, ${COLORS.navyDeep}dd 100%)` }}
        />
      </AbsoluteFill>
    );
  }

  const gridShift = (frame * 0.6) % 60;
  const sweep = ((frame * 6) % 2400) - 600;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 75% 40%, #1f4f86 0%, ${COLORS.navyDark} 45%, ${COLORS.navyDeep} 100%)`,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          opacity: 0.1,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          backgroundPosition: `${gridShift}px ${gridShift}px`,
        }}
      />
      <div style={{ position: "absolute", right: -60, top: 30, opacity: 0.16 }}>
        <Globe size={520} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: sweep,
          width: 260,
          transform: "skewX(-20deg)",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)",
        }}
      />
    </AbsoluteFill>
  );
};
