import React from "react";
import { interpolateColors, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";

/**
 * Renders text where **wrapped** segments are highlighted one after another,
 * or, with variant "bold", simply set in bold white.
 */
export const RichText: React.FC<{
  text: string;
  highlightStart?: number;
  stagger?: number;
  variant?: "highlight" | "bold";
}> = ({ text, highlightStart = 0, stagger = 6, variant = "highlight" }) => {
  const frame = useCurrentFrame();
  const parts = text.split(/\*\*(.+?)\*\*/g);
  let highlightIndex = 0;

  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 0) {
          return <React.Fragment key={i}>{part}</React.Fragment>;
        }
        if (variant === "bold") {
          return (
            <span key={i} style={{ color: COLORS.white, fontWeight: 700 }}>
              {part}
            </span>
          );
        }
        const start = highlightStart + highlightIndex++ * stagger;
        const color = interpolateColors(frame, [start, start + 10], [COLORS.white, COLORS.gold]);
        return (
          <span key={i} style={{ color }}>
            {part}
          </span>
        );
      })}
    </>
  );
};
