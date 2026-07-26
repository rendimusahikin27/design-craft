/**
 * KEYBOARD — Shortcut handler with animated zoom
 */

function initKeyboard() {
  document.addEventListener("keydown", (e) => {
    const t = e.target;
    const inInput =
      ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName) ||
      t.contentEditable === "true";

    // Space for hand tool
    if (e.code === "Space" && !inInput) {
      e.preventDefault();
      if (!DC.spaceDown) {
        DC.spaceDown = true;
        $("#canvasArea").classList.add("hand-active");
      }
      return;
    }

    if (inInput) return;

    const mod = e.ctrlKey || e.metaKey;

    // Animated zoom shortcuts
    if (mod && (e.key === "=" || e.key === "+")) {
      e.preventDefault();
      animateZoomTo(DC.zoom + 0.15, 200);
    }
    if (mod && e.key === "-") {
      e.preventDefault();
      animateZoomTo(DC.zoom - 0.15, 200);
    }
    if (mod && e.key === "0") {
      e.preventDefault();
      $("#btnZoomFit").click();
    }
    if (mod && e.key === "1") {
      e.preventDefault();
      $("#btnZoomVal").click();
    }

    // Undo/Redo/Save
    if (mod && e.key === "z") {
      e.preventDefault();
      undo();
    }
    if (mod && e.key === "y") {
      e.preventDefault();
      redo();
    }
    if (mod && e.key === "s") {
      e.preventDefault();
      saveProject();
    }
    if (mod && e.key === "d") {
      e.preventDefault();
      if (DC.sel) dupEl(DC.sel);
    }

    // Delete
    if (e.key === "Delete" || (e.key === "Backspace" && !mod)) {
      if (DC.sel) {
        e.preventDefault();
        deleteEl(DC.sel);
      }
    }

    // Escape
    if (e.key === "Escape") {
      deselect();
      $$(".modal-overlay").forEach((m) => m.classList.add("hidden"));
    }

    // Tool shortcuts
    if (e.key === "v" || e.key === "V") setTool("select");
    if (e.key === "h" || e.key === "H") setTool("hand");
  });

  document.addEventListener("keyup", (e) => {
    if (e.code === "Space") {
      DC.spaceDown = false;
      if (DC.tool !== "hand") {
        $("#canvasArea").classList.remove("hand-active");
      }
      if (DC.isPanning) {
        DC.isPanning = false;
        $("#canvasArea").classList.remove("panning");
      }
    }
  });
}
