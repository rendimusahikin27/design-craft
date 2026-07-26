/**
 * STORAGE — Save / Load project
 */

function saveProject() {
  const data = {
    html: $("#canvas").innerHTML,
    viewport: DC.viewport,
    zoom: DC.zoom,
    panX: DC.panX,
    panY: DC.panY,
    ts: new Date().toISOString(),
  };

  fetch("save.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((r) => r.json())
    .then((r) => {
      if (r.success) toast("Saved!", "success");
      else saveLocal(data);
    })
    .catch(() => saveLocal(data));
}

function saveLocal(data) {
  try {
    localStorage.setItem("dc_project", JSON.stringify(data));
    toast("Saved locally!", "success");
  } catch (e) {
    toast("Save failed", "error");
  }
}

function loadProject() {
  fetch("save.php?load=1")
    .then((r) => r.json())
    .then((r) => {
      if (r.success && r.data) restoreProject(r.data);
      else loadLocal();
    })
    .catch(loadLocal);
}

function loadLocal() {
  try {
    const s = localStorage.getItem("dc_project");
    if (s) restoreProject(JSON.parse(s));
  } catch (e) {}
}

function restoreProject(data) {
  const canvas = $("#canvas");

  if (data.html) {
    canvas.innerHTML = data.html;
    canvas.querySelectorAll("[data-dc]").forEach((el) => {
      bindElement(el);
      const n = parseInt(el.getAttribute("data-dc")?.replace("dc", ""));
      if (n > DC.idN) DC.idN = n;
    });

    if (canvas.querySelector("[data-dc]")) {
      const hint = $("#canvasHint");
      if (hint) hint.classList.add("hidden");
    }

    updateLayers();
    saveHist();
  }

  if (data.viewport) {
    DC.viewport = data.viewport;
    canvas.setAttribute("data-vp", data.viewport);
    $$(".vp-tab").forEach((t) =>
      t.classList.toggle("active", t.dataset.vp === data.viewport),
    );
  }

  // Restore zoom & pan
  if (typeof data.zoom === "number") {
    DC.zoom = data.zoom;
  }
  if (typeof data.panX === "number") DC.panX = data.panX;
  if (typeof data.panY === "number") DC.panY = data.panY;

  applyTransform();
  updateFrameLabel();
}
