import React from "react";
import { interpolateColors, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";

/** Renders text where **wrapped** segments are highlighted one after another. */
export const RichText: React.FC<{
  text: string;
  highlightStart: number;
  stagger?: number;
}> = ({ text, highlightStart, stagger = 6 }) => {
  const frame = useCurrentFrame();
  const parts = text.split(/\*\*(.+?)\*\*/g);
  let highlightIndex = 0;

  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 0) {
          return <React.Fragment key={i}>{part}</React.Fragment>;
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
