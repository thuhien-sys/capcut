import React from "react";
import { useCurrentFrame } from "remotion";
import { FONT_BODY, FONT_IPA } from "../fonts";
import { COLORS, LAYOUT } from "../theme";
import { fadeUp, progress } from "./anim";
import { RichText } from "./RichText";
import { VocabItem } from "./types";

const PADDING_X = 44;
const DIVIDER_X = 712;

const Vocab: React.FC<{ item: VocabItem; delay: number }> = ({ item, delay }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ ...fadeUp(frame, delay, 16, 0), transform: `translateX(${(1 - progress(frame, delay, 16)) * 30}px)` }}>
      <div style={{ fontFamily: FONT_IPA, fontStyle: "italic", fontWeight: 600, fontSize: 33, color: COLORS.vocab }}>
        {item.word}
        {item.pos ? ` (${item.pos})` : ""}:
      </div>
      <div style={{ fontFamily: FONT_IPA, fontSize: 31, color: COLORS.white, marginTop: 4 }}>{item.ipa}</div>
      <div style={{ fontFamily: FONT_BODY, fontSize: 31, color: COLORS.white, marginTop: 2 }}>{item.meaning}</div>
    </div>
  );
};

export const TextPanel: React.FC<{ english: string; vietnamese: string; vocab: VocabItem[] }> = ({
  english,
  vietnamese,
  vocab,
}) => {
  const frame = useCurrentFrame();
  const divider = progress(frame, 6, 24);

  return (
    <div style={{ position: "absolute", top: LAYOUT.panelTop, left: 0, right: 0, bottom: 0 }}>
      <div
        style={{
          position: "absolute",
          top: 40,
          left: PADDING_X,
          width: DIVIDER_X - PADDING_X - 28,
          fontFamily: FONT_BODY,
        }}
      >
        <div style={{ ...fadeUp(frame, 12, 18), fontWeight: 700, fontSize: 37, lineHeight: 1.36, color: COLORS.white }}>
          <RichText text={english} highlightStart={30} />
        </div>
        <div
          style={{
            ...fadeUp(frame, 45, 18),
            marginTop: 46,
            fontWeight: 400,
            fontSize: 33,
            lineHeight: 1.42,
            color: COLORS.textSoft,
          }}
        >
          {vietnamese}
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
          gap: 34,
        }}
      >
        {vocab.map((item, i) => (
          <Vocab key={item.word} item={item} delay={24 + i * 8} />
        ))}
      </div>
    </div>
  );
};
