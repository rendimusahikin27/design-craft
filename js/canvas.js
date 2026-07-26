/* ==========================================
   PAN & ZOOM
   ========================================== */

function initCanvasInteraction() {
  const area = $("#canvasArea");

  centerCanvas();
  createDragGhost();
  createDropIndicator();

  // Wheel zoom
  area.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        const rect = area.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const oldZoom = DC.zoom;
        let newZoom = DC.zoom * (1 + -e.deltaY * 0.002);
        newZoom = clampZoom(newZoom);
        const scale = newZoom / oldZoom;
        DC.panX = mx - scale * (mx - DC.panX);
        DC.panY = my - scale * (my - DC.panY);
        DC.zoom = newZoom;
      } else {
        DC.panX -= e.deltaX;
        DC.panY -= e.deltaY;
      }
      applyTransform();
    },
    { passive: false },
  );

  // Mouse pan
  area.addEventListener("mousedown", (e) => {
    if (_intDrag.active) return;
    const isHand = DC.tool === "hand" || DC.spaceDown || e.button === 1;
    if (isHand) {
      e.preventDefault();
      DC.isPanning = true;
      DC.panStartX = e.clientX;
      DC.panStartY = e.clientY;
      DC.panOriginX = DC.panX;
      DC.panOriginY = DC.panY;
      area.classList.add("panning");
    }
  });

  window.addEventListener("mousemove", (e) => {
    if (DC.isPanning) {
      DC.panX = DC.panOriginX + (e.clientX - DC.panStartX);
      DC.panY = DC.panOriginY + (e.clientY - DC.panStartY);
      applyTransform();
    }
    if (_intDrag.active) {
      handleInternalDragMove(e);
    }
  });

  window.addEventListener("mouseup", (e) => {
    if (DC.isPanning) {
      DC.isPanning = false;
      area.classList.remove("panning");
    }
    if (_intDrag.active) {
      handleInternalDragEnd(e);
    }
  });

  area.addEventListener("auxclick", (e) => {
    if (e.button === 1) e.preventDefault();
  });

  // Touch support
  let lastTouchDist = 0;
  let lastTouchMid = { x: 0, y: 0 };

  area.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length === 2) {
        lastTouchDist = getTouchDist(e.touches);
        lastTouchMid = getTouchMid(e.touches);
      } else if (
        e.touches.length === 1 &&
        (DC.tool === "hand" || DC.spaceDown)
      ) {
        DC.isPanning = true;
        DC.panStartX = e.touches[0].clientX;
        DC.panStartY = e.touches[0].clientY;
        DC.panOriginX = DC.panX;
        DC.panOriginY = DC.panY;
      }
    },
    { passive: false },
  );

  area.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dist = getTouchDist(e.touches);
        const mid = getTouchMid(e.touches);
        const rect = area.getBoundingClientRect();
        const scale = dist / lastTouchDist;
        const newZoom = clampZoom(DC.zoom * scale);
        const zs = newZoom / DC.zoom;
        const mx = mid.x - rect.left;
        const my = mid.y - rect.top;
        DC.panX = mx - zs * (mx - DC.panX) + (mid.x - lastTouchMid.x);
        DC.panY = my - zs * (my - DC.panY) + (mid.y - lastTouchMid.y);
        DC.zoom = newZoom;
        lastTouchDist = dist;
        lastTouchMid = mid;
        applyTransform();
      } else if (DC.isPanning && e.touches.length === 1) {
        DC.panX = DC.panOriginX + (e.touches[0].clientX - DC.panStartX);
        DC.panY = DC.panOriginY + (e.touches[0].clientY - DC.panStartY);
        applyTransform();
      }
    },
    { passive: false },
  );

  area.addEventListener("touchend", () => {
    DC.isPanning = false;
    lastTouchDist = 0;
  });

  // Click to deselect
  area.addEventListener("click", (e) => {
    if (DC.isPanning || _intDrag.didDrag) return;
    const canvas = $("#canvas");
    const hint = $("#canvasHint");
    if (
      e.target === area ||
      e.target === $("#canvasWorld") ||
      e.target === $("#canvasFrame") ||
      e.target === canvas ||
      e.target === hint ||
      hint?.contains(e.target)
    ) {
      deselect();
    }
  });
}

function getTouchDist(t) {
  const dx = t[0].clientX - t[1].clientX,
    dy = t[0].clientY - t[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}
function getTouchMid(t) {
  return {
    x: (t[0].clientX + t[1].clientX) / 2,
    y: (t[0].clientY + t[1].clientY) / 2,
  };
}
function clampZoom(z) {
  return Math.min(DC.zoomMax, Math.max(DC.zoomMin, z));
}

function applyTransform() {
  const world = $("#canvasWorld");
  world.style.transform = `translate(${DC.panX}px, ${DC.panY}px) scale(${DC.zoom})`;
  const area = $("#canvasArea");
  const gs = 20 * DC.zoom;
  area.style.setProperty("--grid-size", gs + "px");
  area.style.setProperty("--grid-ox", (DC.panX % gs) + "px");
  area.style.setProperty("--grid-oy", (DC.panY % gs) + "px");
  const pct = Math.round(DC.zoom * 100);
  const zv = $("#zoomValue");
  if (zv) zv.textContent = pct + "%";
  const czv = $("#czVal");
  if (czv) czv.textContent = pct + "%";
  const slider = $("#czSlider");
  if (slider) slider.value = pct;
  const coords = $("#canvasCoords");
  if (coords)
    coords.textContent = `${Math.round(DC.panX)}, ${Math.round(DC.panY)} · ${pct}%`;
  updateFrameLabel();
  if (DC.sel) posElActions(DC.sel);
}

function centerCanvas() {
  const area = $("#canvasArea");
  const canvas = $("#canvas");
  const r = area.getBoundingClientRect();
  DC.panX = (r.width - canvas.offsetWidth) / 2;
  DC.panY = Math.max(60, (r.height - canvas.offsetHeight) / 2);
  DC.zoom = 1;
  applyTransform();
}

function fitToScreen() {
  const area = $("#canvasArea");
  const canvas = $("#canvas");
  const r = area.getBoundingClientRect();
  const pad = 80;
  const sx = (r.width - pad * 2) / canvas.offsetWidth;
  const sy = (r.height - pad * 2) / canvas.offsetHeight;
  DC.zoom = clampZoom(Math.min(sx, sy));
  DC.panX = (r.width - canvas.offsetWidth * DC.zoom) / 2;
  DC.panY = (r.height - canvas.offsetHeight * DC.zoom) / 2;
  applyTransform();
}

function zoomTo(level) {
  const area = $("#canvasArea");
  const r = area.getBoundingClientRect();
  const cx = r.width / 2,
    cy = r.height / 2;
  const old = DC.zoom;
  const nz = clampZoom(level);
  const s = nz / old;
  DC.panX = cx - s * (cx - DC.panX);
  DC.panY = cy - s * (cy - DC.panY);
  DC.zoom = nz;
  applyTransform();
}

function zoomIn() {
  zoomTo(DC.zoom + DC.zoomStep * 2);
}
function zoomOut() {
  zoomTo(DC.zoom - DC.zoomStep * 2);
}

function updateFrameLabel() {
  const canvas = $("#canvas");
  const label = $("#frameLabel");
  if (!label) return;
  const names = { desktop: "Desktop", tablet: "Tablet", mobile: "Mobile" };
  label.textContent = `${names[DC.viewport] || DC.viewport} — ${canvas.offsetWidth} × ${canvas.offsetHeight}`;
}

function setTool(tool) {
  DC.tool = tool;
  $("#canvasArea").classList.toggle("hand-active", tool === "hand");
  $$("[data-tool]").forEach((b) =>
    b.classList.toggle("active", b.dataset.tool === tool),
  );
}

/* ==========================================
   INTERNAL DRAG & MOVE — with drop indicator
   ========================================== */

const _intDrag = {
  active: false,
  el: null,
  ghost: null,
  indicator: null,
  startX: 0,
  startY: 0,
  didDrag: false,
  dropTarget: null,
  dropPosition: null, // 'before' | 'after' | 'inside'
  threshold: 5,
};

function createDragGhost() {
  const g = document.createElement("div");
  g.id = "canvasDragGhost";
  document.body.appendChild(g);
  _intDrag.ghost = g;
}

function createDropIndicator() {
  const ind = document.createElement("div");
  ind.className = "drop-indicator";
  ind.style.display = "none";
  // Append to canvas so it transforms with it
  $("#canvas").appendChild(ind);
  _intDrag.indicator = ind;
}

function startInternalDrag(el, e) {
  if (DC.tool === "hand" || DC.spaceDown) return;

  _intDrag.active = true;
  _intDrag.el = el;
  _intDrag.startX = e.clientX;
  _intDrag.startY = e.clientY;
  _intDrag.didDrag = false;
  _intDrag.dropTarget = null;
  _intDrag.dropPosition = null;
}

function handleInternalDragMove(e) {
  const d = _intDrag;
  if (!d.active || !d.el) return;

  const dx = e.clientX - d.startX;
  const dy = e.clientY - d.startY;

  // Only start visual drag after threshold
  if (!d.didDrag) {
    if (Math.abs(dx) < d.threshold && Math.abs(dy) < d.threshold) return;
    d.didDrag = true;
    d.el.classList.add("dc-dragging");
    $("#elActions").classList.add("hidden");

    // Build ghost
    buildDragGhost(d.el);
  }

  // Move ghost
  d.ghost.style.left = e.clientX + 12 + "px";
  d.ghost.style.top = e.clientY + 12 + "px";

  // Find drop target
  findDropTarget(e);
}

function handleInternalDragEnd(e) {
  const d = _intDrag;
  if (!d.active) return;

  if (d.didDrag && d.dropTarget && d.dropPosition) {
    performDrop();
  }

  // Cleanup
  if (d.el) d.el.classList.remove("dc-dragging");
  d.ghost.classList.remove("active");
  d.ghost.innerHTML = "";
  d.indicator.style.display = "none";
  d.indicator.className = "drop-indicator";

  // Small delay to prevent click-deselect after drag
  setTimeout(() => {
    d.active = false;
    d.didDrag = false;
    d.el = null;
    d.dropTarget = null;
    d.dropPosition = null;
  }, 50);
}

function buildDragGhost(el) {
  const g = _intDrag.ghost;
  const tag = el.getAttribute("data-dc-tag") || el.tagName.toLowerCase();

  // Create a mini preview
  const clone = el.cloneNode(true);
  clone.classList.remove("dc-sel", "dc-dragging");
  clone.removeAttribute("data-dc");
  clone.style.maxWidth = "380px";
  clone.style.maxHeight = "280px";
  clone.style.overflow = "hidden";
  clone.style.pointerEvents = "none";
  clone.style.margin = "0";

  // Remove all nested design attributes
  clone
    .querySelectorAll("[data-dc]")
    .forEach((c) => c.removeAttribute("data-dc"));

  g.innerHTML = "";
  g.appendChild(clone);

  // Add label
  const label = document.createElement("div");
  label.style.cssText = `
        position:absolute;top:-22px;left:0;
        background:var(--accent);color:white;
        padding:2px 8px;font-size:10px;font-weight:600;
        border-radius:4px 4px 0 0;font-family:var(--font);
        white-space:nowrap;
    `;
  label.textContent = "↕ " + tag;
  g.appendChild(label);

  g.classList.add("active");
}

function findDropTarget(e) {
  const d = _intDrag;
  const canvas = $("#canvas");

  // Hide ghost & indicator temporarily so elementFromPoint works
  const ghostDisplay = d.ghost.style.display;
  const indDisplay = d.indicator.style.display;
  d.ghost.style.display = "none";
  d.indicator.style.display = "none";

  const target = document.elementFromPoint(e.clientX, e.clientY);

  d.ghost.style.display = ghostDisplay;

  // Reset
  d.dropTarget = null;
  d.dropPosition = null;

  if (!target) {
    d.indicator.style.display = "none";
    return;
  }

  // Find closest [data-dc] element (not the one being dragged)
  let dcEl = target.closest("[data-dc]");

  // If we're over the canvas itself (no element), drop at end
  if (!dcEl && (target === canvas || canvas.contains(target))) {
    showInsideIndicator(canvas);
    d.dropTarget = canvas;
    d.dropPosition = "inside";
    return;
  }

  if (!dcEl || dcEl === d.el || d.el.contains(dcEl)) {
    d.indicator.style.display = "none";
    return;
  }

  // Don't drop into own children
  if (dcEl.contains(d.el)) {
    d.indicator.style.display = "none";
    return;
  }

  // Determine position: before, after, or inside
  const rect = dcEl.getBoundingClientRect();
  const relY = e.clientY - rect.top;
  const h = rect.height;
  const tag = dcEl.tagName.toLowerCase();
  const isContainer =
    CONTAINERS.includes(tag) ||
    (dcEl.getAttribute("data-dc-tag") || "").startsWith("comp-");

  if (isContainer && relY > h * 0.25 && relY < h * 0.75) {
    // Inside container
    d.dropTarget = dcEl;
    d.dropPosition = "inside";
    showInsideIndicator(dcEl);
  } else if (relY < h / 2) {
    // Before
    d.dropTarget = dcEl;
    d.dropPosition = "before";
    showLineIndicator(dcEl, "before");
  } else {
    // After
    d.dropTarget = dcEl;
    d.dropPosition = "after";
    showLineIndicator(dcEl, "after");
  }
}

function showLineIndicator(el, pos) {
  const ind = _intDrag.indicator;
  const canvas = $("#canvas");
  const canvasRect = canvas.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();

  // Calculate position relative to canvas (accounting for zoom)
  const left = (elRect.left - canvasRect.left) / DC.zoom;
  const width = elRect.width / DC.zoom;
  let top;

  if (pos === "before") {
    top = (elRect.top - canvasRect.top) / DC.zoom - 1;
  } else {
    top = (elRect.bottom - canvasRect.top) / DC.zoom - 1;
  }

  ind.className = "drop-indicator drop-h";
  ind.style.display = "block";
  ind.style.left = left + "px";
  ind.style.top = top + "px";
  ind.style.width = width + "px";
  ind.style.height = "";
}

function showInsideIndicator(el) {
  const ind = _intDrag.indicator;
  const canvas = $("#canvas");
  const canvasRect = canvas.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();

  const left = (elRect.left - canvasRect.left) / DC.zoom;
  const top = (elRect.top - canvasRect.top) / DC.zoom;
  const width = elRect.width / DC.zoom;
  const height = elRect.height / DC.zoom;

  ind.className = "drop-indicator drop-inside";
  ind.style.display = "block";
  ind.style.left = left + "px";
  ind.style.top = top + "px";
  ind.style.width = width + "px";
  ind.style.height = height + "px";
}

function performDrop() {
  const d = _intDrag;
  if (!d.el || !d.dropTarget) return;

  const el = d.el;
  const target = d.dropTarget;
  const pos = d.dropPosition;
  const canvas = $("#canvas");

  // Remove from current position
  el.parentNode.removeChild(el);

  if (pos === "inside") {
    target.appendChild(el);
  } else if (pos === "before") {
    target.parentNode.insertBefore(el, target);
  } else if (pos === "after") {
    target.parentNode.insertBefore(el, target.nextSibling);
  }

  // Re-select
  selectEl(el);
  updateLayers();
  saveHist();
  toast("Element moved", "success");

  // Hide hint
  if (canvas.querySelector("[data-dc]")) {
    const hint = $("#canvasHint");
    if (hint) hint.classList.add("hidden");
  }
}

/**
 * Smooth pan animation using easing
 */
function animatePan(fromX, toX, fromY, toY, duration, onComplete) {
  const start = performance.now();

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);

    DC.panX = fromX + (toX - fromX) * eased;
    DC.panY = fromY + (toY - fromY) * eased;

    // Apply transform but DON'T call full applyTransform
    // to avoid grid jitter — just move the world
    const world = $("#canvasWorld");
    world.style.transform = `translate(${DC.panX}px, ${DC.panY}px) scale(${DC.zoom})`;

    // Update grid position
    const area = $("#canvasArea");
    const gs = 20 * DC.zoom;
    area.style.setProperty("--grid-ox", (DC.panX % gs) + "px");
    area.style.setProperty("--grid-oy", (DC.panY % gs) + "px");

    // Update coordinates display
    const pct = Math.round(DC.zoom * 100);
    const coords = $("#canvasCoords");
    if (coords)
      coords.textContent = `${Math.round(DC.panX)}, ${Math.round(DC.panY)} · ${pct}%`;

    // Reposition element actions
    if (DC.sel) posElActions(DC.sel);

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      // Final exact position
      DC.panX = toX;
      DC.panY = toY;
      applyTransform();
      if (onComplete) onComplete();
    }
  }

  requestAnimationFrame(tick);
}

/**
 * Animated zoom to level (smooth)
 */
function animateZoomTo(targetZoom, duration) {
  const area = $("#canvasArea");
  const r = area.getBoundingClientRect();
  const cx = r.width / 2;
  const cy = r.height / 2;

  const startZoom = DC.zoom;
  const startPanX = DC.panX;
  const startPanY = DC.panY;

  // Calculate target pan
  const tz = clampZoom(targetZoom);
  const scale = tz / startZoom;
  const targetPanX = cx - scale * (cx - startPanX);
  const targetPanY = cy - scale * (cy - startPanY);

  const start = performance.now();
  duration = duration || 300;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);

    DC.zoom = startZoom + (tz - startZoom) * eased;
    DC.panX = startPanX + (targetPanX - startPanX) * eased;
    DC.panY = startPanY + (targetPanY - startPanY) * eased;

    applyTransform();

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      DC.zoom = tz;
      DC.panX = targetPanX;
      DC.panY = targetPanY;
      applyTransform();
    }
  }

  requestAnimationFrame(tick);
}

/**
 * Animated center canvas (smooth)
 */
function animateCenterCanvas(duration) {
  const area = $("#canvasArea");
  const canvas = $("#canvas");
  const r = area.getBoundingClientRect();

  // Target: zoom stays, just re-center pan
  const vpWidths = { desktop: 1200, tablet: 768, mobile: 375 };
  const cw = vpWidths[DC.viewport] || canvas.offsetWidth;
  const ch = canvas.offsetHeight;

  const targetPanX = (r.width - cw * DC.zoom) / 2;
  const targetPanY = Math.max(40, (r.height - ch * DC.zoom) / 2);

  animatePan(DC.panX, targetPanX, DC.panY, targetPanY, duration || 400);
}
