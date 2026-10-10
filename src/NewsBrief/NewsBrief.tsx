import React from "react";
import { AbsoluteFill } from "remotion";
import "../fonts";
import { COLORS } from "../theme";
import { Header } from "./Header";
import { NewsScreen } from "./NewsScreen";
import { TextPanel } from "./TextPanel";
import { Episode } from "./types";

export const NewsBrief: React.FC<{ episode: Episode }> = ({ episode }) => {
  return (
    <AbsoluteFill style={{ background: COLORS.navy }}>
      <Header channel={episode.channel} />
      <NewsScreen episode={episode} />
      <TextPanel english={episode.english} vietnamese={episode.vietnamese} vocab={episode.vocab} />
    </AbsoluteFill>
  );
};
