import { Composition } from "remotion";
import { goldPrices20261003 } from "./episodes/2026-10-03-gold";
import { NewsBrief } from "./NewsBrief/NewsBrief";
import { Episode } from "./NewsBrief/types";
import { VIDEO } from "./theme";

// Add each new episode here; the key becomes the composition id.
const EPISODES: Record<string, Episode> = {
  "EP-2026-10-03-gold": goldPrices20261003,
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {Object.entries(EPISODES).map(([id, episode]) => (
        <Composition
          key={id}
          id={id}
          component={NewsBrief}
          durationInFrames={episode.durationInSeconds * VIDEO.fps}
          fps={VIDEO.fps}
          width={VIDEO.width}
          height={VIDEO.height}
          defaultProps={{ episode }}
        />
      ))}
    </>
  );
};
