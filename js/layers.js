/**
 * LAYERS — Layer tree panel
 */

function updateLayers() {
  const canvas = $("#canvas");
  const list = $("#layersList");
  const els = canvas.querySelectorAll("[data-dc]");

  if (!els.length) {
    list.innerHTML =
      '<div class="layers-empty"><i class="fas fa-layer-group"></i><p>No elements yet</p></div>';
    return;
  }

  list.innerHTML = "";

  els.forEach((el) => {
    const wt = el.getAttribute("data-dc-tag") || el.tagName.toLowerCase();
    const txt = (el.textContent || "").substring(0, 20);

    let indent = 0;
    let p = el.parentElement;
    while (p && p !== canvas) {
      if (p.hasAttribute("data-dc")) indent++;
      p = p.parentElement;
    }

    const item = document.createElement("div");
    item.className = "layer-item" + (DC.sel === el ? " selected" : "");
    item.style.marginLeft = indent * 12 + "px";
    item.innerHTML = `
            <span class="layer-icon"><i class="fas fa-code"></i></span>
            <span class="layer-tag">${wt}</span>
            <span class="layer-info">${txt}</span>
            <div class="layer-acts">
                <button title="Select"><i class="fas fa-mouse-pointer"></i></button>
                <button class="danger" title="Delete"><i class="fas fa-trash"></i></button>
            </div>
        `;

    item.addEventListener("click", () => {
      selectEl(el);
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    item.querySelectorAll("button")[1].addEventListener("click", (ev) => {
      ev.stopPropagation();
      deleteEl(el);
    });

    list.appendChild(item);
  });
}
