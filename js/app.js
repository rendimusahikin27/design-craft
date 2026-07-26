/**
 * APP — Main entry point
 */

document.addEventListener("DOMContentLoaded", () => {
  // Build dynamic UI
  buildWidgetPanel();
  buildPropsPanel();
  buildAttrsPanel();

  // Init all modules
  initCanvasInteraction(); // Figma-like pan & zoom
  initToolbar();
  initPanels();
  initDragDrop();
  initPropBindings();
  initAttrBindings();
  initExport();
  initKeyboard();

  // Window resize → reposition el-actions
  window.addEventListener("resize", () => {
    if (DC.sel) posElActions(DC.sel);
  });

  // Initial history snapshot
  saveHist();

  // Load saved project (restores zoom/pan too)
  loadProject();

  console.log("🎨 DesignCraft initialized — Figma-like canvas ready!");
});
