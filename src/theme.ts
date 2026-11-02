export const COLORS = {
  navy: "#1d3b5c",
  navyDark: "#0f2238",
  navyDeep: "#081627",
  divider: "rgba(255,255,255,0.55)",
  white: "#ffffff",
  textSoft: "rgba(255,255,255,0.88)",
  gold: "#f5c400",
  vocab: "#f2c94c",
  red: "#d7262e",
  redDark: "#9e1219",
  down: "#ff4d57",
  up: "#2ecc71",
};

export const VIDEO = {
  width: 1080,
  height: 1920,
  fps: 30,
};

/**
 * The video fills the whole 9:16 frame, but text keeps clear of its edges: on tall
 * phones TikTok fills the screen by cropping the left and right sides, and its tabs
 * and caption sit over the top and bottom.
 */
export const SAFE = {
  top: 120,
  bottom: 1730,
  left: 96,
  right: 984,
};

export const LAYOUT = {
  headerTop: SAFE.top,
  headerHeight: 76,
  /** The news screen spans the full width; its graphics are drawn slightly smaller so they stay clear of the edges. */
  screenTop: 200,
  screenWidth: 1080,
  screenHeight: 640,
  screenContentScale: 0.85,
  panelTop: 862,
  panelBottom: SAFE.bottom,
};
