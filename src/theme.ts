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
 * Everything that must stay readable sits inside TikTok's safe zone: clear of the
 * "Following | For you" tabs at the top, the like/comment/share buttons on the right
 * and the caption at the bottom.
 */
export const SAFE = {
  top: 150,
  bottom: 1490,
  left: 60,
  right: 940,
};

export const LAYOUT = {
  headerTop: SAFE.top,
  headerHeight: 66,
  /** The news screen is designed at 1080x640 and drawn scaled down. */
  screenTop: 222,
  screenWidth: 1080,
  screenHeight: 640,
  screenScale: 0.78,
  panelTop: 735,
  panelBottom: SAFE.bottom,
};
