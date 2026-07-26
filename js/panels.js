/**
 * PANELS — Floating panel toggles, resize, mini mode
 */

// Track mini mode state
let _widgetsMini = false;
let _activeLeftTab = "widgets";

function initPanels() {
  // ===== LEFT PANEL TABS =====
  $$(".fp-tab[data-lp]").forEach((t) =>
    t.addEventListener("click", () => {
      _activeLeftTab = t.dataset.lp;

      // Activate tab
      $$(".fp-tab[data-lp]").forEach((x) => x.classList.remove("active"));
      t.classList.add("active");

      // Show/hide bodies
      $("#panelWidgets").classList.toggle("hidden", t.dataset.lp !== "widgets");
      $("#panelLayers").classList.toggle("hidden", t.dataset.lp !== "layers");

      // Apply mini mode logic
      applyMiniState();

      if (t.dataset.lp === "layers") updateLayers();
    }),
  );

  // ===== RIGHT PANEL TABS =====
  $$(".fp-tab[data-rp]").forEach((t) =>
    t.addEventListener("click", () => {
      $$(".fp-tab[data-rp]").forEach((x) => x.classList.remove("active"));
      t.classList.add("active");
      $("#panelStyle").classList.toggle("hidden", t.dataset.rp !== "style");
      $("#panelAttrs").classList.toggle("hidden", t.dataset.rp !== "attrs");
    }),
  );

  // ===== OPEN / CLOSE =====
  $("#closeLeft").addEventListener("click", () =>
    $("#panelLeft").classList.remove("open"),
  );
  $("#closeRight").addEventListener("click", () =>
    $("#panelRight").classList.remove("open"),
  );
  $("#btnToggleLeft").addEventListener("click", () =>
    $("#panelLeft").classList.toggle("open"),
  );
  $("#btnToggleRight").addEventListener("click", () =>
    $("#panelRight").classList.toggle("open"),
  );

  // ===== MINI TOGGLE =====
  $("#btnMiniToggle").addEventListener("click", toggleMini);

  // ===== SEARCH =====
  $("#widgetSearch").addEventListener("input", function () {
    const q = this.value.toLowerCase();
    $$(".widget-item").forEach((i) => {
      const name = i.querySelector("span")?.textContent.toLowerCase() || "";
      i.style.display =
        name.includes(q) || i.dataset.widget.includes(q) ? "" : "none";
    });
    if (q) {
      $$(".wg-body").forEach((b) => b.classList.remove("collapsed"));
      $$(".wg-head").forEach((h) => h.classList.remove("collapsed"));
    }
  });

  // ===== RESIZE =====
  initResize();
}

/**
 * Toggle mini sidebar mode
 */
function toggleMini() {
  _widgetsMini = !_widgetsMini;
  applyMiniState();
}

/**
 * Apply mini/full state based on active tab
 * - Widgets tab: respects _widgetsMini
 * - Layers tab: always full
 */
function applyMiniState() {
  const panel = $("#panelLeft");
  const icon = $("#miniToggleIcon");
  const toggleBtn = $("#btnMiniToggle");

  if (_activeLeftTab === "layers") {
    // Layers = always full, hide mini toggle
    panel.classList.remove("mini-mode");
    toggleBtn.style.display = "none";
  } else {
    // Widgets = respect mini state
    toggleBtn.style.display = "";

    if (_widgetsMini) {
      panel.classList.add("mini-mode");
      icon.className = "fas fa-expand-alt";
      toggleBtn.title = "Expand Sidebar";
    } else {
      panel.classList.remove("mini-mode");
      icon.className = "fas fa-compress-alt";
      toggleBtn.title = "Collapse Sidebar";
    }
  }
}

/**
 * Panel resize via drag handle
 */
function initResize() {
  let dragging = null,
    startX,
    startW;

  const setup = (handleSel, panelSel) => {
    const handle = $(handleSel);
    if (!handle) return;

    handle.addEventListener("mousedown", (e) => {
      const panel = $(panelSel);
      // Don't resize in mini mode
      if (panel.classList.contains("mini-mode")) return;

      e.preventDefault();
      dragging = panel;
      startX = e.clientX;
      startW = dragging.offsetWidth;
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    });
  };

  setup("#resizeLeft", "#panelLeft");
  setup("#resizeRight", "#panelRight");

  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    const isLeft = dragging.id === "panelLeft";
    const delta = e.clientX - startX;
    const newW = isLeft ? startW + delta : startW - delta;
    dragging.style.width = Math.max(220, Math.min(450, newW)) + "px";
  });

  document.addEventListener("mouseup", () => {
    dragging = null;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  });
}
