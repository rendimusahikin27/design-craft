/**
 * STATE — Global Application State
 */

const DC = {
  sel: null,
  zoom: 1, // 1 = 100%, 0,5 = 50%, 2 = 200%
  panX: 0,
  panY: 0,
  viewport: "desktop",
  idN: 0,
  hist: [],
  histIdx: -1,
  maxHist: 60,
  exportTab: "html",

  //   Canvas Interaction
  tool: "select", // "select" | "hand"
  isPanning: false,
  panStartX: 0,
  panStartY: 0,
  panOriginX: 0,
  panOriginY: 0,
  spaceDown: false,

  //   Zoom Limits
  zoomMin: 0.1,
  zoomMax: 3,
  zoomStep: 0.05,
};
