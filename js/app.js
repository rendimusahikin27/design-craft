/**
 * APP — Main entry point
 */

document.addEventListener("DOMContentLoaded", () => {
  // Build dynamic UI
  buildWidgetPanel();
  // Init all modules
  initCanvasInteraction(); // Figma-like pan & zoom
  initToolbar();
  initPanels();
  initDragDrop();
  initKeyboard();
});
