/**
 * SELECTION — Element select/deselect with canvas-aware positioning
 */

function selectEl(el) {
  if (DC.sel) DC.sel.classList.remove("dc-sel");
  DC.sel = el;
  el.classList.add("dc-sel");

  $("#propsEmpty").style.display = "none";
  $("#propsEditor").classList.remove("hidden");
  $("#attrsEmpty").style.display = "none";
  $("#attrsEditor").classList.remove("hidden");

  loadProps(el);
  loadAttrs(el);
  updateLayers();
  posElActions(el);
}

function deselect() {
  if (DC.sel) DC.sel.classList.remove("dc-sel");
  DC.sel = null;

  $("#propsEmpty").style.display = "";
  $("#propsEditor").classList.add("hidden");
  $("#attrsEmpty").style.display = "";
  $("#attrsEditor").classList.add("hidden");
  $("#elActions").classList.add("hidden");

  updateLayers();
}

function posElActions(el) {
  const ea = $("#elActions");
  if (!el) {
    ea.classList.add("hidden");
    return;
  }

  // Get element rect relative to viewport
  const r = el.getBoundingClientRect();

  // Position action bar above element
  const top = Math.max(52, r.top - 36);
  const left = Math.max(4, r.left);

  ea.classList.remove("hidden");
  ea.style.top = top + "px";
  ea.style.left = left + "px";
}
