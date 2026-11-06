import React from "react";
import { AbsoluteFill, Audio, Sequence, Series, staticFile } from "remotion";
import "../fonts";
import { BrandCard } from "./Brand";
import { COLORS, VIDEO } from "../theme";
import { Header } from "./Header";
import { NewsScreen, ScreenBackground, Ticker } from "./NewsScreen";
import { CardPanel, NewsPanel, PatternPanel, QuizPanel, VerbListPanel } from "./Panels";
import { QuizSounds } from "./Quiz";
import { Episode, Scene, ScreenScene } from "./types";

export const sceneFrames = (scene: Scene) => Math.round(scene.seconds * VIDEO.fps);

export const episodeFrames = (episode: Episode) =>
  episode.scenes.reduce((total, scene) => total + sceneFrames(scene), 0);

const ScenePanel: React.FC<{ scene: ScreenScene; durationInFrames: number }> = ({ scene, durationInFrames }) => {
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

const SLOGAN = "Understand the news. Learn the language.";

export const NewsBrief: React.FC<{ episode: Episode }> = ({ episode }) => {
  // Brand scenes cover the whole frame, header and ticker included, so they go on top.
  const starts = episode.scenes.map((_, i) =>
    episode.scenes.slice(0, i).reduce((total, scene) => total + sceneFrames(scene), 0),
  );
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
              {scene.type !== "brand" ? (
                <>
                  <NewsScreen episode={episode} scene={scene} durationInFrames={frames} />
                  <ScenePanel scene={scene} durationInFrames={frames} />
                </>
              ) : null}
              {scene.type === "quiz" ? <QuizSounds scene={scene} /> : null}
              {episode.audio && scene.voice ? <VoiceSlice src={episode.audio} voice={scene.voice} /> : null}
            </Series.Sequence>
          );
        })}
      </Series>
      <Ticker source={episode.source} date={episode.date} items={episode.tickers} totalFrames={episodeFrames(episode)} />
      <Header channel={episode.channel} />
      {episode.scenes.map((scene, i) =>
        scene.type === "brand" ? (
          <Sequence key={`brand-${i}`} from={starts[i]} durationInFrames={sceneFrames(scene)}>
            <BrandCard
              scene={scene}
              channel={episode.channel}
              slogan={SLOGAN}
              date={episode.date}
              durationInFrames={sceneFrames(scene)}
            />
          </Sequence>
        ) : null,
      )}
    </AbsoluteFill>
  );
};
