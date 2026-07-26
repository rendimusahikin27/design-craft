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
}
