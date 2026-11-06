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
  | {
      type: "points";
      label: string;
      points: string[];
      /** Shown instead of the numbers. */
      icons?: IconName[];
      /** Seconds into the scene when each point appears. */
      pointsAt?: number[];
    }
  | ({ type: "triangle" } & TriangleSpec)
  | {
      /** Cause and effect, top to bottom: each step gets a rising or falling badge. */
      type: "chain";
      kicker: string;
      title: string;
      items: { label: string; direction: "up" | "down"; at?: number }[];
    }
  | {
      /** Purchasing power: the same money buys fewer goods once prices rise at `at`. */
      type: "basket";
      kicker: string;
      title: string;
      money: string;
      items: IconName[];
      lose: number;
      before: string;
      after: string;
      at?: number;
    }
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
      /** A search box that types `text` from `at` seconds into the scene. */
      search?: { text: string; at?: number };
      /** Badge once a row is done; defaults to "✓ Approved". */
      badge?: string;
    }
  | {
      /** A sample certificate whose fields type themselves in as they are read out. */
      type: "form";
      kicker: string;
      title: string;
      fields: { label: string; value: string; at?: number }[];
    }
  | {
      /** Two documents compared row by row: each row gets a match tick or a red flag. */
      type: "crosscheck";
      kicker: string;
      title: string;
      left: string;
      right: string;
      rows: { label: string; status?: "match" | "flag"; at?: number }[];
    }
  | {
      /** An illustrative ownership donut whose slices draw in, with a legend. */
      type: "ownership";
      kicker: string;
      title: string;
      center: string;
      slices: { label: string; value: number; at?: number }[];
    }
  | {
      /** A paper checklist: each item is ticked when read out, then an optional stamp lands. */
      type: "checklist";
      kicker: string;
      title: string;
      items: { label: string; note?: string; at?: number }[];
      stamp?: { text: string; at?: number };
    }
  | {
      /** A market price board: one row per price, each revealed when it is read out. */
      type: "board";
      kicker: string;
      title: string;
      rows: BoardRow[];
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

/** Three linked ideas drawn as a triangle; each corner lights up at its time. */
export type TriangleSpec = {
  title?: string;
  nodes: [TriangleNode, TriangleNode, TriangleNode];
};
export type TriangleNode = { label: string; icon: IconName; at?: number };

export type BoardRow = {
  label: string;
  note?: string;
  icon: IconName;
  value: string;
  change?: string;
  direction?: "up" | "down";
  at?: number;
};

export type VersusSide = { name: string; note?: string; color: string; icon: IconName; logo?: string };

export type SceneArt =
  | { icon: IconName; satellites?: IconName[] }
  | { image: string }
  | { phone: PhoneSpec }
  /** A small organisation chart whose boxes appear top to bottom. */
  | { orgChart: { top: string; middle: string; bottom: [string, string] } }
  /** A generic identity card being scanned, then a verification badge. */
  | { idCard: { title: string; badge: string; badgeAt?: number } }
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
  /** Optional word chips under the lines, e.g. a preview or recap of the episode's vocabulary. */
  keywordsTitle?: string;
  keywords?: { word: string; meaning?: string; at?: number }[];
  /** Optional triangle diagram under the lines. */
  triangle?: TriangleSpec;
};

/**
 * A full-screen branded opener or closer: the channel emblem, name and slogan, with no
 * news screen or text panel. `slogan` appears at `sloganAt` seconds.
 */
export type BrandScene = {
  type: "brand";
  seconds: number;
  kicker: string;
  sloganAt?: number;
  voice?: { from: number; to: number; at?: number };
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

/** Scenes drawn as a news screen above a text panel. */
export type ScreenScene = NewsScene | VerbListScene | PatternScene | CardScene | QuizScene;

export type Scene = ScreenScene | BrandScene;

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
