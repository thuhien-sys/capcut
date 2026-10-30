import { Composition } from "remotion";
import { goldPrices20261003 } from "./episodes/2026-10-03-gold";
import { gasolinePrices20261008 } from "./episodes/2026-10-08-gasoline";
import { commercialBanks20261011 } from "./episodes/2026-10-11-banks";
import { creditExtension20261018 } from "./episodes/2026-10-18-credit";
import { creditExtensionPart220261019 } from "./episodes/2026-10-19-credit-2";
import { a2aPayments20261020 } from "./episodes/2026-10-20-a2a";
import { currentAccount20261022 } from "./episodes/2026-10-22-current-account";
import { weeklyQuiz20261023 } from "./episodes/2026-10-23-weekly-quiz";
import { creditVsDebit20261025 } from "./episodes/2026-10-25-cards";
import { digitalBanking20261027 } from "./episodes/2026-10-27-digital-banking";
import { mbVsTechcombank20261029 } from "./episodes/2026-10-29-mb-techcombank";
import { episodeFrames, NewsBrief } from "./NewsBrief/NewsBrief";
import { Episode } from "./NewsBrief/types";
import { VIDEO } from "./theme";

// Add each new episode here; the key becomes the composition id.
const EPISODES: Record<string, Episode> = {
  "EP-2026-10-03-gold": goldPrices20261003,
  "EP-2026-10-08-gasoline": gasolinePrices20261008,
  "EP-2026-10-11-banks": commercialBanks20261011,
  "EP-2026-10-18-credit": creditExtension20261018,
  "EP-2026-10-19-credit-2": creditExtensionPart220261019,
  "EP-2026-10-20-a2a": a2aPayments20261020,
  "EP-2026-10-22-current-account": currentAccount20261022,
  "EP-2026-10-23-weekly-quiz": weeklyQuiz20261023,
  "EP-2026-10-25-cards": creditVsDebit20261025,
  "EP-2026-10-27-digital-banking": digitalBanking20261027,
  "EP-2026-10-29-mb-techcombank": mbVsTechcombank20261029,
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {Object.entries(EPISODES).map(([id, episode]) => (
        <Composition
          key={id}
          id={id}
          component={NewsBrief}
          durationInFrames={episodeFrames(episode)}
          fps={VIDEO.fps}
          width={VIDEO.width}
          height={VIDEO.height}
          defaultProps={{ episode }}
        />
      ))}
    </>
  );
};
