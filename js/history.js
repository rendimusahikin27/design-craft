/**
 * HISTORY — Undo / Redo (updated to rebind internal drag)
 */

function saveHist() {
  const canvas = $("#canvas");
  // Remove drop indicator from saved HTML
  const ind = canvas.querySelector(".drop-indicator");
  const indHTML = ind ? ind.outerHTML : "";
  if (ind) ind.remove();

  DC.hist = DC.hist.slice(0, DC.histIdx + 1);
  DC.hist.push(canvas.innerHTML);
  if (DC.hist.length > DC.maxHist) DC.hist.shift();
  DC.histIdx = DC.hist.length - 1;

  // Re-add indicator
  if (ind) canvas.appendChild(ind);
}

function undo() {
  if (DC.histIdx <= 0) return;
  DC.histIdx--;
  restoreHist();
  toast("Undo", "info");
}

function redo() {
  if (DC.histIdx >= DC.hist.length - 1) return;
  DC.histIdx++;
  restoreHist();
  toast("Redo", "info");
}

function restoreHist() {
  const canvas = $("#canvas");
  deselect();
  canvas.innerHTML = DC.hist[DC.histIdx];

  canvas.querySelectorAll("[data-dc]").forEach((el) => {
    bindElement(el);
    const n = parseInt(el.getAttribute("data-dc")?.replace("dc", ""));
    if (n > DC.idN) DC.idN = n;
  });

  updateLayers();

  if (!canvas.querySelector("[data-dc]")) {
    const hint = $("#canvasHint");
    if (hint) hint.classList.remove("hidden");
  }

  // Re-create drop indicator (it was lost in innerHTML replace)
  createDropIndicator();
}
