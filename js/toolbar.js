/**
 * TOOLBAR — Toolbar button actions (updated with smooth viewport)
 */

function initToolbar() {
  // Top zoom controls — now with smooth animation
  $("#btnZoomIn").addEventListener("click", () =>
    animateZoomTo(DC.zoom + 0.15, 250),
  );
  $("#btnZoomOut").addEventListener("click", () =>
    animateZoomTo(DC.zoom - 0.15, 250),
  );
  $("#btnZoomFit").addEventListener("click", () => {
    // Animated fit to screen
    const area = $("#canvasArea");
    const canvas = $("#canvas");
    const r = area.getBoundingClientRect();
    const pad = 80;
    const sx = (r.width - pad * 2) / canvas.offsetWidth;
    const sy = (r.height - pad * 2) / canvas.offsetHeight;
    const targetZoom = clampZoom(Math.min(sx, sy));
    const targetPanX = (r.width - canvas.offsetWidth * targetZoom) / 2;
    const targetPanY = (r.height - canvas.offsetHeight * targetZoom) / 2;

    // Animate both zoom and pan together
    const startZoom = DC.zoom;
    const startPanX = DC.panX;
    const startPanY = DC.panY;
    const start = performance.now();
    const duration = 400;

    function ease(t) {
      return 1 - Math.pow(1 - t, 3);
    }
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const e = ease(p);
      DC.zoom = startZoom + (targetZoom - startZoom) * e;
      DC.panX = startPanX + (targetPanX - startPanX) * e;
      DC.panY = startPanY + (targetPanY - startPanY) * e;
      applyTransform();
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });

  // Click zoom value = animated reset to 100%
  const zoomValBtn = $("#btnZoomVal");
  zoomValBtn.addEventListener("click", () => {
    // Animate to 100% + re-center
    const area = $("#canvasArea");
    const canvas = $("#canvas");
    const r = area.getBoundingClientRect();
    const targetZoom = 1;
    const cw = canvas.offsetWidth;
    const ch = canvas.offsetHeight;
    const targetPanX = (r.width - cw * targetZoom) / 2;
    const targetPanY = Math.max(40, (r.height - ch * targetZoom) / 2);

    const startZoom = DC.zoom;
    const startPanX = DC.panX;
    const startPanY = DC.panY;
    const start = performance.now();
    const duration = 350;

    function ease(t) {
      return 1 - Math.pow(1 - t, 3);
    }
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const e = ease(p);
      DC.zoom = startZoom + (targetZoom - startZoom) * e;
      DC.panX = startPanX + (targetPanX - startPanX) * e;
      DC.panY = startPanY + (targetPanY - startPanY) * e;
      applyTransform();
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });

  zoomValBtn.addEventListener("dblclick", () => {
    // Animated fit
    $("#btnZoomFit").click();
  });

  // Bottom zoom bar
  $("#czZoomIn").addEventListener("click", () =>
    animateZoomTo(DC.zoom + 0.15, 250),
  );
  $("#czZoomOut").addEventListener("click", () =>
    animateZoomTo(DC.zoom - 0.15, 250),
  );
  $("#czSlider").addEventListener("input", function () {
    zoomTo(parseInt(this.value) / 100);
  });

  // ===== VIEWPORT TABS — smooth switch =====
  $$(".vp-tab").forEach((t) =>
    t.addEventListener("click", () => {
      switchViewport(t.dataset.vp);
    }),
  );
}

// Compatibility — old applyZoom calls
function applyZoom() {
  applyTransform();
}
