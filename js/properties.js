/**
 * PROPERTIES — Style property panel builder + bindings
 */

function buildPropsPanel() {
  const editor = $("#propsEditor");
  editor.innerHTML = `
        <div class="sel-info"><span class="sel-tag" id="selTag">div</span><span class="sel-id" id="selId"></span></div>

        <div class="ps"><div class="ps-head" data-psg="content"><i class="fas fa-chevron-down"></i><span>Content</span></div>
        <div class="ps-body" data-psc="content">
            <div class="pr"><label>Text</label><textarea id="propText" rows="2" placeholder="Text..."></textarea></div>
            <div class="pr"><label>HTML</label><textarea id="propHTML" rows="2" placeholder="HTML..."></textarea></div>
        </div></div>

        <div class="ps"><div class="ps-head" data-psg="layout"><i class="fas fa-chevron-down"></i><span>Layout</span></div>
        <div class="ps-body" data-psc="layout">
            <div class="pr"><label>Display</label><select id="propDisplay"><option value="">Default</option><option value="block">Block</option><option value="inline-block">Inline-Block</option><option value="flex">Flex</option><option value="grid">Grid</option><option value="none">None</option></select></div>
            <div class="pr flex-p hidden"><label>Direction</label><select id="propFlexDir"><option value="row">Row</option><option value="column">Column</option></select></div>
            <div class="pr flex-p hidden"><label>Justify</label><select id="propJC"><option value="">Default</option><option value="flex-start">Start</option><option value="center">Center</option><option value="flex-end">End</option><option value="space-between">Between</option><option value="space-around">Around</option></select></div>
            <div class="pr flex-p hidden"><label>Align</label><select id="propAI"><option value="">Default</option><option value="flex-start">Start</option><option value="center">Center</option><option value="flex-end">End</option><option value="stretch">Stretch</option></select></div>
            <div class="pr flex-p hidden"><label>Gap</label><input type="text" id="propGap" placeholder="10px"></div>
            <div class="pr"><label>Position</label><select id="propPos"><option value="">Default</option><option value="relative">Relative</option><option value="absolute">Absolute</option><option value="fixed">Fixed</option><option value="sticky">Sticky</option></select></div>
            <div class="pr"><label>Overflow</label><select id="propOF"><option value="">Default</option><option value="hidden">Hidden</option><option value="auto">Auto</option><option value="scroll">Scroll</option></select></div>
        </div></div>

        <div class="ps"><div class="ps-head" data-psg="size"><i class="fas fa-chevron-down"></i><span>Size</span></div>
        <div class="ps-body" data-psc="size">
            <div class="pr-2"><div class="pr"><label>W</label><input type="text" id="propW" placeholder="auto"></div><div class="pr"><label>H</label><input type="text" id="propH" placeholder="auto"></div></div>
            <div class="pr-2"><div class="pr"><label>Min W</label><input type="text" id="propMinW" placeholder="auto"></div><div class="pr"><label>Min H</label><input type="text" id="propMinH" placeholder="auto"></div></div>
            <div class="pr-2"><div class="pr"><label>Max W</label><input type="text" id="propMaxW" placeholder="none"></div><div class="pr"><label>Max H</label><input type="text" id="propMaxH" placeholder="none"></div></div>
        </div></div>

        <div class="ps"><div class="ps-head" data-psg="spacing"><i class="fas fa-chevron-down"></i><span>Spacing</span></div>
        <div class="ps-body" data-psc="spacing">
            <label class="sub-label">Margin</label>
            <div class="sp-vis"><div class="sv-top"><input type="text" id="propMT" placeholder="0"></div><div class="sv-mid"><div class="sv-l"><input type="text" id="propML" placeholder="0"></div><div class="sv-c"><label class="sub-label" style="margin:0">Padding</label><div class="sp-vis pad-vis"><div class="sv-top"><input type="text" id="propPT" placeholder="0"></div><div class="sv-mid"><div class="sv-l"><input type="text" id="propPL" placeholder="0"></div><div class="sv-c"><div class="sv-inner"></div></div><div class="sv-r"><input type="text" id="propPR" placeholder="0"></div></div><div class="sv-bot"><input type="text" id="propPB" placeholder="0"></div></div></div><div class="sv-r"><input type="text" id="propMR" placeholder="0"></div></div><div class="sv-bot"><input type="text" id="propMB" placeholder="0"></div></div>
        </div></div>

        <div class="ps"><div class="ps-head collapsed" data-psg="typo"><i class="fas fa-chevron-down"></i><span>Typography</span></div>
        <div class="ps-body collapsed" data-psc="typo">
            <div class="pr"><label>Font</label><select id="propFF"><option value="">Default</option><option value="'Inter',sans-serif">Inter</option><option value="Arial,sans-serif">Arial</option><option value="Georgia,serif">Georgia</option><option value="'Courier New',monospace">Courier</option><option value="system-ui">System UI</option></select></div>
            <div class="pr-2"><div class="pr"><label>Size</label><input type="text" id="propFS" placeholder="16px"></div><div class="pr"><label>Weight</label><select id="propFW"><option value="">Default</option><option value="300">Light</option><option value="400">Normal</option><option value="500">Medium</option><option value="600">Semi</option><option value="700">Bold</option></select></div></div>
            <div class="pr-2"><div class="pr"><label>Line H</label><input type="text" id="propLH" placeholder="normal"></div><div class="pr"><label>Letter Sp</label><input type="text" id="propLS" placeholder="normal"></div></div>
            <div class="pr"><label>Align</label><div class="btn-grp"><button class="bg-btn" data-align="left"><i class="fas fa-align-left"></i></button><button class="bg-btn" data-align="center"><i class="fas fa-align-center"></i></button><button class="bg-btn" data-align="right"><i class="fas fa-align-right"></i></button><button class="bg-btn" data-align="justify"><i class="fas fa-align-justify"></i></button></div></div>
            <div class="pr"><label>Color</label><div class="color-row"><input type="color" id="propClr" value="#000000"><input type="text" id="propClrT" placeholder="#000"></div></div>
        </div></div>

        <div class="ps"><div class="ps-head collapsed" data-psg="bg"><i class="fas fa-chevron-down"></i><span>Background</span></div>
        <div class="ps-body collapsed" data-psc="bg">
            <div class="pr"><label>Color</label><div class="color-row"><input type="color" id="propBgC" value="#ffffff"><input type="text" id="propBgCT" placeholder="transparent"></div></div>
            <div class="pr"><label>Image</label><input type="text" id="propBgI" placeholder="url(...)"></div>
            <div class="pr-2"><div class="pr"><label>Size</label><select id="propBgS"><option value="">Default</option><option value="cover">Cover</option><option value="contain">Contain</option></select></div><div class="pr"><label>Position</label><select id="propBgP"><option value="">Default</option><option value="center">Center</option><option value="top">Top</option></select></div></div>
        </div></div>

        <div class="ps"><div class="ps-head collapsed" data-psg="border"><i class="fas fa-chevron-down"></i><span>Border</span></div>
        <div class="ps-body collapsed" data-psc="border">
            <div class="pr-2"><div class="pr"><label>Width</label><input type="text" id="propBW" placeholder="0"></div><div class="pr"><label>Style</label><select id="propBS"><option value="">None</option><option value="solid">Solid</option><option value="dashed">Dashed</option><option value="dotted">Dotted</option></select></div></div>
            <div class="pr"><label>Color</label><div class="color-row"><input type="color" id="propBC" value="#cccccc"><input type="text" id="propBCT" placeholder="#ccc"></div></div>
            <div class="pr"><label>Radius</label><input type="text" id="propBR" placeholder="0"></div>
        </div></div>

        <div class="ps"><div class="ps-head collapsed" data-psg="fx"><i class="fas fa-chevron-down"></i><span>Effects</span></div>
        <div class="ps-body collapsed" data-psc="fx">
            <div class="pr"><label>Opacity</label><div class="range-row"><input type="range" id="propOp" min="0" max="1" step="0.01" value="1"><span id="opVal">1</span></div></div>
            <div class="pr"><label>Box Shadow</label><input type="text" id="propSh" placeholder="0 2px 10px rgba(0,0,0,.1)"></div>
            <div class="pr"><label>Transition</label><input type="text" id="propTr" placeholder="all 0.3s ease"></div>
            <div class="pr"><label>Transform</label><input type="text" id="propTf" placeholder="none"></div>
            <div class="pr"><label>Z-Index</label><input type="text" id="propZ" placeholder="auto"></div>
        </div></div>

        <div class="ps"><div class="ps-head collapsed" data-psg="css"><i class="fas fa-chevron-down"></i><span>Custom CSS</span></div>
        <div class="ps-body collapsed" data-psc="css">
            <div class="pr"><textarea id="propCSS" rows="4" placeholder="property: value;"></textarea></div>
            <button class="btn-apply" id="btnCSS"><i class="fas fa-check"></i> Apply</button>
        </div></div>
    `;

  // Prop section toggles
  editor.querySelectorAll(".ps-head").forEach((h) => {
    h.addEventListener("click", () => {
      h.classList.toggle("collapsed");
      const body = editor.querySelector(`[data-psc="${h.dataset.psg}"]`);
      if (body) body.classList.toggle("collapsed");
    });
  });
}

function loadProps(el) {
  const s = el.style;
  const wt = el.getAttribute("data-dc-tag") || el.tagName.toLowerCase();
  val("selTag", null); // special
  const tagEl = $("#selTag");
  if (tagEl) tagEl.textContent = wt;
  const idEl = $("#selId");
  if (idEl) idEl.textContent = el.id ? "#" + el.id : "";

  val("propText", el.childElementCount === 0 ? el.textContent : "");
  val("propHTML", "");
  val("propDisplay", s.display);
  val("propFlexDir", s.flexDirection);
  val("propJC", s.justifyContent);
  val("propAI", s.alignItems);
  val("propGap", s.gap);
  val("propPos", s.position);
  val("propOF", s.overflow);

  const isFlex = s.display === "flex" || s.display === "inline-flex";
  $$(".flex-p").forEach((fp) => fp.classList.toggle("hidden", !isFlex));

  val("propW", s.width);
  val("propH", s.height);
  val("propMinW", s.minWidth);
  val("propMinH", s.minHeight);
  val("propMaxW", s.maxWidth);
  val("propMaxH", s.maxHeight);
  val("propMT", s.marginTop);
  val("propMR", s.marginRight);
  val("propMB", s.marginBottom);
  val("propML", s.marginLeft);
  val("propPT", s.paddingTop);
  val("propPR", s.paddingRight);
  val("propPB", s.paddingBottom);
  val("propPL", s.paddingLeft);
  val("propFF", s.fontFamily);
  val("propFS", s.fontSize);
  val("propFW", s.fontWeight);
  val("propLH", s.lineHeight);
  val("propLS", s.letterSpacing);

  $$(".bg-btn[data-align]").forEach((b) => b.classList.remove("active"));
  if (s.textAlign) {
    const b = $(`.bg-btn[data-align="${s.textAlign}"]`);
    if (b) b.classList.add("active");
  }

  try {
    $("#propClr").value = rgb2hex(s.color) || "#000000";
  } catch (e) {}
  val("propClrT", s.color);
  try {
    $("#propBgC").value = rgb2hex(s.backgroundColor) || "#ffffff";
  } catch (e) {}
  val("propBgCT", s.backgroundColor);
  val("propBgI", s.backgroundImage);
  val("propBgS", s.backgroundSize);
  val("propBgP", s.backgroundPosition);
  val("propBW", s.borderWidth);
  val("propBS", s.borderStyle);
  try {
    $("#propBC").value = rgb2hex(s.borderColor) || "#cccccc";
  } catch (e) {}
  val("propBCT", s.borderColor);
  val("propBR", s.borderRadius);

  const opEl = $("#propOp");
  if (opEl) opEl.value = s.opacity || 1;
  const opV = $("#opVal");
  if (opV) opV.textContent = s.opacity || 1;
  val("propSh", s.boxShadow);
  val("propTr", s.transition);
  val("propTf", s.transform);
  val("propZ", s.zIndex);
  val("propCSS", "");
}

function _bs(id, prop) {
  const el = $("#" + id);
  if (!el) return;
  const handler = () => {
    if (DC.sel) {
      DC.sel.style[prop] = el.value;
      saveHist();
    }
  };
  el.addEventListener("input", handler);
  el.addEventListener("change", handler);
}

function initPropBindings() {
  $("#propText")?.addEventListener("input", function () {
    if (DC.sel && DC.sel.childElementCount === 0) {
      DC.sel.textContent = this.value;
      updateLayers();
      saveHist();
    }
  });
  $("#propHTML")?.addEventListener("change", function () {
    if (DC.sel) {
      DC.sel.innerHTML = this.value;
      DC.sel.querySelectorAll("[data-dc]").forEach(bindElement);
      updateLayers();
      saveHist();
    }
  });
  $("#propDisplay")?.addEventListener("change", function () {
    if (DC.sel) DC.sel.style.display = this.value;
    $$(".flex-p").forEach((fp) =>
      fp.classList.toggle(
        "hidden",
        this.value !== "flex" && this.value !== "inline-flex",
      ),
    );
    saveHist();
  });

  _bs("propFlexDir", "flexDirection");
  _bs("propJC", "justifyContent");
  _bs("propAI", "alignItems");
  _bs("propGap", "gap");
  _bs("propPos", "position");
  _bs("propOF", "overflow");
  _bs("propW", "width");
  _bs("propH", "height");
  _bs("propMinW", "minWidth");
  _bs("propMinH", "minHeight");
  _bs("propMaxW", "maxWidth");
  _bs("propMaxH", "maxHeight");
  _bs("propMT", "marginTop");
  _bs("propMR", "marginRight");
  _bs("propMB", "marginBottom");
  _bs("propML", "marginLeft");
  _bs("propPT", "paddingTop");
  _bs("propPR", "paddingRight");
  _bs("propPB", "paddingBottom");
  _bs("propPL", "paddingLeft");
  _bs("propFF", "fontFamily");
  _bs("propFS", "fontSize");
  _bs("propFW", "fontWeight");
  _bs("propLH", "lineHeight");
  _bs("propLS", "letterSpacing");

  $$(".bg-btn[data-align]").forEach((b) =>
    b.addEventListener("click", () => {
      $$(".bg-btn[data-align]").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      if (DC.sel) {
        DC.sel.style.textAlign = b.dataset.align;
        saveHist();
      }
    }),
  );

  $("#propClr")?.addEventListener("input", function () {
    if (DC.sel) {
      DC.sel.style.color = this.value;
      saveHist();
    }
    val("propClrT", this.value);
  });
  $("#propClrT")?.addEventListener("change", function () {
    if (DC.sel) {
      DC.sel.style.color = this.value;
      saveHist();
    }
    try {
      $("#propClr").value = this.value;
    } catch (e) {}
  });
  $("#propBgC")?.addEventListener("input", function () {
    if (DC.sel) {
      DC.sel.style.backgroundColor = this.value;
      saveHist();
    }
    val("propBgCT", this.value);
  });
  $("#propBgCT")?.addEventListener("change", function () {
    if (DC.sel) {
      DC.sel.style.backgroundColor = this.value;
      saveHist();
    }
    try {
      $("#propBgC").value = this.value;
    } catch (e) {}
  });

  _bs("propBgI", "backgroundImage");
  _bs("propBgS", "backgroundSize");
  _bs("propBgP", "backgroundPosition");
  _bs("propBW", "borderWidth");
  _bs("propBS", "borderStyle");

  $("#propBC")?.addEventListener("input", function () {
    if (DC.sel) {
      DC.sel.style.borderColor = this.value;
      saveHist();
    }
    val("propBCT", this.value);
  });
  $("#propBCT")?.addEventListener("change", function () {
    if (DC.sel) {
      DC.sel.style.borderColor = this.value;
      saveHist();
    }
    try {
      $("#propBC").value = this.value;
    } catch (e) {}
  });

  _bs("propBR", "borderRadius");

  $("#propOp")?.addEventListener("input", function () {
    if (DC.sel) {
      DC.sel.style.opacity = this.value;
      saveHist();
    }
    const v = $("#opVal");
    if (v) v.textContent = parseFloat(this.value).toFixed(2);
  });

  _bs("propSh", "boxShadow");
  _bs("propTr", "transition");
  _bs("propTf", "transform");
  _bs("propZ", "zIndex");

  $("#btnCSS")?.addEventListener("click", () => {
    if (!DC.sel) return;
    ($("#propCSS")?.value || "")
      .split(";")
      .filter((l) => l.trim())
      .forEach((line) => {
        const [p, v] = line.split(":").map((s) => s.trim());
        if (p && v)
          DC.sel.style[p.replace(/-([a-z])/g, (m, c) => c.toUpperCase())] = v;
      });
    saveHist();
    toast("CSS applied", "success");
  });
}
