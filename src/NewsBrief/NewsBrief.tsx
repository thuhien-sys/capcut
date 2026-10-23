import React from "react";
import { AbsoluteFill, Audio, Sequence, Series, staticFile } from "remotion";
import "../fonts";
import { COLORS, VIDEO } from "../theme";
import { Header } from "./Header";
import { NewsScreen, ScreenBackground, Ticker } from "./NewsScreen";
import { CardPanel, NewsPanel, PatternPanel, QuizPanel, VerbListPanel } from "./Panels";
import { QuizSounds } from "./Quiz";
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
    case "quiz":
      return <QuizPanel scene={scene} durationInFrames={durationInFrames} />;
  }
};

const VoiceSlice: React.FC<{ src: string; voice: NonNullable<Scene["voice"]> }> = ({ src, voice }) => {
  const fps = VIDEO.fps;
  return (
    <Sequence from={Math.round((voice.at ?? 0.3) * fps)}>
      <Audio
        src={staticFile(src)}
        trimBefore={Math.round(voice.from * fps)}
        durationInFrames={Math.round((voice.to - voice.from) * fps)}
      />
    </Sequence>
  );
};

export const NewsBrief: React.FC<{ episode: Episode }> = ({ episode }) => {
  return (
    <AbsoluteFill style={{ background: COLORS.navy }}>
      {episode.audio && !episode.scenes.some((scene) => scene.voice) ? <Audio src={staticFile(episode.audio)} /> : null}
      {episode.music ? <Audio src={staticFile(episode.music)} volume={episode.musicVolume ?? 0.1} loop /> : null}
      <ScreenBackground backgroundVideo={episode.backgroundVideo} />
      <Series>
        {episode.scenes.map((scene, i) => {
          const frames = sceneFrames(scene);
          return (
            <Series.Sequence key={i} durationInFrames={frames}>
              <NewsScreen episode={episode} scene={scene} durationInFrames={frames} />
              <ScenePanel scene={scene} durationInFrames={frames} />
              {scene.type === "quiz" ? <QuizSounds scene={scene} /> : null}
              {episode.audio && scene.voice ? <VoiceSlice src={episode.audio} voice={scene.voice} /> : null}
            </Series.Sequence>
          );
        })}
      </Series>
      <Ticker source={episode.source} date={episode.date} items={episode.tickers} totalFrames={episodeFrames(episode)} />
      <Header channel={episode.channel} />
    </AbsoluteFill>
  );
};
