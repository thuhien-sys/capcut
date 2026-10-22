import React from "react";
import { AbsoluteFill, Audio, Series, staticFile } from "remotion";
import "../fonts";
import { COLORS, VIDEO } from "../theme";
import { Header } from "./Header";
import { NewsScreen, ScreenBackground, Ticker } from "./NewsScreen";
import { CardPanel, NewsPanel, PatternPanel, VerbListPanel } from "./Panels";
import { Episode, Scene } from "./types";

export const sceneFrames = (scene: Scene) => Math.round(scene.seconds * VIDEO.fps);

export const episodeFrames = (episode: Episode) =>
  episode.scenes.reduce((total, scene) => total + sceneFrames(scene), 0);

const ScenePanel: React.FC<{ scene: Scene; durationInFrames: number }> = ({ scene, durationInFrames }) => {
  switch (scene.type) {
    case "news":
      return <NewsPanel scene={scene} durationInFrames={durationInFrames} />;
    case "verbList":
      return <VerbListPanel scene={scene} durationInFrames={durationInFrames} />;
    case "patterns":
      return <PatternPanel scene={scene} durationInFrames={durationInFrames} />;
    case "card":
      return <CardPanel scene={scene} durationInFrames={durationInFrames} />;
  }
};

export const NewsBrief: React.FC<{ episode: Episode }> = ({ episode }) => {
  return (
    <AbsoluteFill style={{ background: COLORS.navy }}>
      {episode.audio ? <Audio src={staticFile(episode.audio)} /> : null}
      {episode.music ? <Audio src={staticFile(episode.music)} volume={episode.musicVolume ?? 0.1} loop /> : null}
      <ScreenBackground backgroundVideo={episode.backgroundVideo} />
      <Series>
        {episode.scenes.map((scene, i) => {
          const frames = sceneFrames(scene);
          return (
            <Series.Sequence key={i} durationInFrames={frames}>
              <NewsScreen episode={episode} scene={scene} durationInFrames={frames} />
              <ScenePanel scene={scene} durationInFrames={frames} />
            </Series.Sequence>
          );
        })}
      </Series>
      <Ticker source={episode.source} date={episode.date} items={episode.tickers} totalFrames={episodeFrames(episode)} />
      <Header channel={episode.channel} />
    </AbsoluteFill>
  );
};
