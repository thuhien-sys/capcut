import type { IconName } from "./Icons";

export type Stat = {
  label: string;
  prefix?: string;
  value: number;
  decimals?: number;
  suffix?: string;
  change?: string;
  direction?: "up" | "down";
  note?: string;
  /** Seconds into the scene when the card appears, e.g. when the narrator reads it. */
  at?: number;
};

export type VocabItem = {
  word: string;
  pos?: string;
  ipa?: string;
  meaning: string;
};

/** What the news screen (top video area) shows under the lower third. */
export type ScreenVisual =
  | { type: "stats"; stats: Stat[] }
  | { type: "points"; label: string; points: string[]; /** Shown instead of the numbers. */ icons?: IconName[] }
  | { type: "title"; kicker: string; title: string; subtitle?: string; direction?: "up" | "down" }
  | {
      type: "chips";
      kicker: string;
      title: string;
      /** Image in /public shown before the title, e.g. a bank's logo. */
      titleLogo?: string;
      /** `at`: seconds into the scene when the chip appears. */
      chips: { name: string; note?: string; at?: number }[];
    }
  | {
      /** Sample account numbers, one at a time, with their last `highlight` digits in gold. */
      type: "numbers";
      items: { label: string; digits: string; highlight: number; note?: string; at?: number }[];
    }
  | {
      /** A web app window whose rows get approved one by one, beside a donut chart. */
      type: "dashboard";
      kicker: string;
      title: string;
      window: string;
      rows: { label: string; at?: number }[];
      donut?: { value: number; decimals?: number; label: string; at?: number };
    }
  | {
      /** Two sides facing each other with a VS badge, e.g. two banks being compared. */
      type: "versus";
      kicker: string;
      left: VersusSide;
      right: VersusSide;
    }
  | {
      /** Nodes left to right joined by arrows, e.g. who pays whom. */
      type: "flow";
      kicker: string;
      title: string;
      nodes: { label: string; note?: string; icon: IconName; at?: number }[];
      /** Label under each arrow; arrows.length === nodes.length - 1. */
      arrows: string[];
    };

/** Illustration at the top right of the news screen: an animated icon, or a photo in /public. */
export type PhoneSpec = {
  /** App name in the header; replaced by `logo` (a file in /public) when given. */
  app: string;
  logo?: string;
  /** Header colour. */
  color?: string;
  rows: { label: string; amount?: string; at?: number }[];
  /** Notification that pops up at `at` seconds into the scene. */
  toast?: { text: string; at?: number };
};

export type VersusSide = { name: string; note?: string; color: string; icon: IconName; logo?: string };

export type SceneArt =
  | { icon: IconName; satellites?: IconName[] }
  | { image: string }
  | { phone: PhoneSpec }
  /** Partners joining a central bank, with a counter. */
  | { network: { center: string; count: number; label: string; logo?: string } };

type SceneBase = {
  seconds: number;
  category: string;
  location: string;
  headline: string;
  visual: ScreenVisual;
  /** "breaking" plays the BREAKING NEWS opener; "wipe" is a short transition. */
  opener?: "breaking" | "wipe";
  /** Text on the "breaking" opener band; defaults to BREAKING NEWS. */
  openerText?: string;
  art?: SceneArt;
  /**
   * Play only this slice of the episode's narration, `from`–`to` seconds into the file,
   * starting `at` seconds into the scene. When any scene has one, the narration is no
   * longer played straight through.
   */
  voice?: { from: number; to: number; at?: number };
};

/**
 * Text with **double asterisks** marks highlighted words (bold in the Vietnamese).
 * A newline starts a new line.
 */
export type NewsScene = SceneBase & {
  type: "news";
  /** Optional bold heading lines shown above each paragraph. */
  englishTitle?: string;
  vietnameseTitle?: string;
  english: string;
  vietnamese: string;
  vocab: VocabItem[];
};

export type VerbListScene = SceneBase & {
  type: "verbList";
  intro: string;
  title: string;
  /** `at`: seconds into the scene when the item appears. */
  items: { word: string; ipa: string; usage: string; example: string; at?: number }[];
};

export type PatternScene = SceneBase & {
  type: "patterns";
  title: string;
  items: { pattern: string; meaning?: string; example: string; at?: number }[];
};

export type CardScene = SceneBase & {
  type: "card";
  /** `soft`: Vietnamese-style secondary text (regular weight, muted). */
  lines: { text: string; size?: "lg" | "md" | "sm"; accent?: boolean; soft?: boolean; at?: number }[];
};

/**
 * Fill-in-the-blank question: blanks are written [[answer]] in `question`. The answers,
 * the Vietnamese and the vocabulary stay hidden until the reveal, after a countdown.
 */
export type QuizScene = Omit<SceneBase, "visual"> & {
  type: "quiz";
  number: number;
  total: number;
  question: string;
  vietnamese: string;
  vocab: VocabItem[];
  /** Seconds into the scene when the countdown starts. */
  countdownAt: number;
  /** Seconds into the scene when the answers appear; defaults to 5 seconds after the countdown starts. */
  revealAt?: number;
};

export type Scene = NewsScene | VerbListScene | PatternScene | CardScene | QuizScene;

export type Episode = {
  channel: string;
  source: string;
  date: string;
  tickers: string[];
  /** Optional file in /public used as background footage for the news screen. */
  backgroundVideo?: string;
  /** Optional narration file in /public, played from the first frame. */
  audio?: string;
  /** Optional background music in /public, mixed under the narration. */
  music?: string;
  /** Music volume, 0–1; defaults to 0.1, which sits well below a normal narration. */
  musicVolume?: number;
  scenes: Scene[];
};
