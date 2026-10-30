import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FONT_DISPLAY } from "../fonts";
import { COLORS, LAYOUT } from "../theme";
import { fadeUp, progress } from "./anim";

export const Header: React.FC<{ channel: string }> = ({ channel }) => {
  const frame = useCurrentFrame();
  const line = progress(frame, 8, 20);

  return (
    <AbsoluteFill
      style={{
        top: LAYOUT.headerTop,
        height: LAYOUT.headerHeight,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div
        style={{
          ...fadeUp(frame, 0, 16, -20),
          display: "flex",
          alignItems: "center",
          gap: 18,
          fontFamily: FONT_DISPLAY,
          fontWeight: 900,
          fontSize: 38,
          letterSpacing: 2,
          color: COLORS.white,
        }}
      >
        <div style={{ width: 18, height: 18, borderRadius: 9, background: COLORS.red }} />
        {channel}
      </div>
      <div
        style={{
          width: 700 * line,
          height: 5,
          borderRadius: 3,
          background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
        }}
      />
    </AbsoluteFill>
  );
};
