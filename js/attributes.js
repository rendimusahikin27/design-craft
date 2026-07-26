/**
 * ATTRIBUTES — Attribute panel builder + bindings
 */

function buildAttrsPanel() {
  const editor = $("#attrsEditor");
  editor.innerHTML = `
        <div class="ps"><div class="ps-head"><i class="fas fa-chevron-down"></i><span>General</span></div>
        <div class="ps-body">
            <div class="pr"><label>ID</label><input type="text" id="aId" placeholder="element-id"></div>
            <div class="pr"><label>Class</label><input type="text" id="aClass" placeholder="class-name"></div>
            <div class="pr"><label>Title</label><input type="text" id="aTitle" placeholder="Tooltip"></div>
        </div></div>
        <div class="ps hidden" id="aLink"><div class="ps-head"><i class="fas fa-chevron-down"></i><span>Link</span></div>
        <div class="ps-body">
            <div class="pr"><label>Href</label><input type="text" id="aHref" placeholder="https://..."></div>
            <div class="pr"><label>Target</label><select id="aTarget"><option value="">Default</option><option value="_blank">_blank</option></select></div>
        </div></div>
        <div class="ps hidden" id="aImg"><div class="ps-head"><i class="fas fa-chevron-down"></i><span>Image</span></div>
        <div class="ps-body">
            <div class="pr"><label>Src</label><input type="text" id="aSrc" placeholder="image url"></div>
            <div class="pr"><label>Alt</label><input type="text" id="aAlt" placeholder="alt text"></div>
        </div></div>
        <div class="ps hidden" id="aInput"><div class="ps-head"><i class="fas fa-chevron-down"></i><span>Input</span></div>
        <div class="ps-body">
            <div class="pr"><label>Name</label><input type="text" id="aName" placeholder="name"></div>
            <div class="pr"><label>Placeholder</label><input type="text" id="aPH" placeholder="placeholder"></div>
            <div class="pr"><label>Value</label><input type="text" id="aVal" placeholder="value"></div>
            <div class="pr-chk"><label><input type="checkbox" id="aReq"> Required</label></div>
            <div class="pr-chk"><label><input type="checkbox" id="aDis"> Disabled</label></div>
        </div></div>
        <div class="ps"><div class="ps-head"><i class="fas fa-chevron-down"></i><span>Custom Attributes</span></div>
        <div class="ps-body"><div id="cattrList"></div><button class="btn-apply" id="btnAddA"><i class="fas fa-plus"></i> Add</button></div></div>
    `;

  // Section toggles
  editor.querySelectorAll(".ps-head").forEach((h) => {
    h.addEventListener("click", () => {
      h.classList.toggle("collapsed");
      const body = h.nextElementSibling;
      if (body) body.classList.toggle("collapsed");
    });
  });
}

function loadAttrs(el) {
  const tag = el.tagName.toLowerCase();
  const wt = el.getAttribute("data-dc-tag") || tag;

  val("aId", el.id);
  val(
    "aClass",
    [...el.classList]
      .filter((c) => c !== "dc-sel" && c !== "drop-active")
      .join(" "),
  );
  val("aTitle", el.title);

  const aLink = $("#aLink");
  if (aLink) aLink.classList.toggle("hidden", tag !== "a");
  const aImg = $("#aImg");
  if (aImg) aImg.classList.toggle("hidden", tag !== "img" && wt !== "img");
  const aInput = $("#aInput");
  if (aInput)
    aInput.classList.toggle(
      "hidden",
      !["input", "textarea", "select"].includes(tag),
    );

  if (tag === "a") {
    val("aHref", el.getAttribute("href"));
    val("aTarget", el.getAttribute("target"));
  }
  if (["input", "textarea", "select"].includes(tag)) {
    val("aName", el.name);
    val("aPH", el.placeholder);
    val("aVal", el.value);
    const r = $("#aReq");
    if (r) r.checked = el.required;
    const d = $("#aDis");
    if (d) d.checked = el.disabled;
  }

  const list = $("#cattrList");
  if (list) list.innerHTML = "";
}

function initAttrBindings() {
  $("#aId")?.addEventListener("change", function () {
    if (DC.sel) {
      DC.sel.id = this.value;
      const s = $("#selId");
      if (s) s.textContent = this.value ? "#" + this.value : "";
      updateLayers();
      saveHist();
    }
  });
  $("#aClass")?.addEventListener("change", function () {
    if (DC.sel) {
      const keep = [...DC.sel.classList].filter(
        (c) => c === "dc-sel" || c === "drop-active",
      );
      DC.sel.className = keep.join(" ") + (this.value ? " " + this.value : "");
      saveHist();
    }
  });
  $("#aTitle")?.addEventListener("change", function () {
    if (DC.sel) {
      DC.sel.title = this.value;
      saveHist();
    }
  });
  $("#aHref")?.addEventListener("change", function () {
    if (DC.sel) {
      DC.sel.setAttribute("href", this.value);
      saveHist();
    }
  });
  $("#aTarget")?.addEventListener("change", function () {
    if (DC.sel) {
      DC.sel.setAttribute("target", this.value);
      saveHist();
    }
  });
  $("#aSrc")?.addEventListener("change", function () {
    if (DC.sel && DC.sel.getAttribute("data-dc-tag") === "img") {
      DC.sel.innerHTML = "";
      const img = document.createElement("img");
      img.src = this.value;
      img.style.cssText = "max-width:100%;height:auto;border-radius:8px";
      DC.sel.appendChild(img);
      saveHist();
    }
  });
  $("#aAlt")?.addEventListener("change", function () {
    const img = DC.sel?.querySelector("img");
    if (img) {
      img.alt = this.value;
      saveHist();
    }
  });
  $("#aName")?.addEventListener("change", function () {
    if (DC.sel) {
      DC.sel.name = this.value;
      saveHist();
    }
  });
  $("#aPH")?.addEventListener("change", function () {
    if (DC.sel) {
      DC.sel.placeholder = this.value;
      saveHist();
    }
  });
  $("#aVal")?.addEventListener("change", function () {
    if (DC.sel) {
      DC.sel.value = this.value;
      saveHist();
    }
  });
  $("#aReq")?.addEventListener("change", function () {
    if (DC.sel) {
      DC.sel.required = this.checked;
      saveHist();
    }
  });
  $("#aDis")?.addEventListener("change", function () {
    if (DC.sel) {
      DC.sel.disabled = this.checked;
      saveHist();
    }
  });

  $("#btnAddA")?.addEventListener("click", () => {
    const row = document.createElement("div");
    row.className = "cattr-row";
    row.innerHTML =
      '<input type="text" placeholder="attr"><input type="text" placeholder="value"><button type="button"><i class="fas fa-times"></i></button>';
    $("#cattrList")?.appendChild(row);
    const ins = row.querySelectorAll("input");
    row.querySelector("button").addEventListener("click", () => {
      if (DC.sel && ins[0].value) DC.sel.removeAttribute(ins[0].value);
      row.remove();
      saveHist();
    });
    ins.forEach((i) =>
      i.addEventListener("change", () => {
        if (DC.sel && ins[0].value) {
          DC.sel.setAttribute(ins[0].value, ins[1].value);
          saveHist();
        }
      }),
    );
  });
}
