/**
 * DRAGDROP — Widget drag & drop with proper ghost image
 */

function initDragDrop() {
  // Create reusable ghost element
  const ghost = document.createElement("div");
  ghost.id = "dragGhost";
  ghost.style.cssText = `
        position: fixed;
        top: -1000px;
        left: -1000px;
        padding: 6px 14px;
        background: rgba(124,108,240,0.92);
        color: white;
        font-family: var(--font);
        font-size: 12px;
        font-weight: 600;
        border-radius: 8px;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 16px rgba(124,108,240,0.35);
        display: flex;
        align-items: center;
        gap: 6px;
        pointer-events: none;
        z-index: 99999;
        white-space: nowrap;
        max-width: 180px;
    `;
  document.body.appendChild(ghost);

  // Bind widget items
  $$(".widget-item").forEach((item) => {
    item.addEventListener("dragstart", (e) => {
      const widgetKey = item.dataset.widget;
      const widgetName = item.querySelector("span")?.textContent || widgetKey;
      const iconHTML = item.querySelector(".wi-icon")?.innerHTML || "";

      // Set data
      e.dataTransfer.setData("text/widget", widgetKey);
      e.dataTransfer.effectAllowed = "copy";

      // Build custom ghost
      ghost.innerHTML = `
                <span style="
                    width:22px;height:22px;
                    display:flex;align-items:center;justify-content:center;
                    background:rgba(255,255,255,0.2);
                    border-radius:4px;font-size:10px;
                ">${iconHTML}</span>
                <span>${widgetName}</span>
            `;

      // Position ghost offscreen but visible to browser for capture
      ghost.style.top = "-500px";
      ghost.style.left = "-500px";

      // Set as drag image — offset to center on cursor
      e.dataTransfer.setDragImage(ghost, 20, 18);

      // Add dragging class for visual feedback
      item.classList.add("dragging");
    });

    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
      // Reset ghost position
      ghost.style.top = "-1000px";
      ghost.style.left = "-1000px";
    });

    // Double click to add
    item.addEventListener("dblclick", () => {
      addToCanvas(item.dataset.widget, $("#canvas"));
    });
  });

  // Canvas drop zone
  const canvas = $("#canvas");

  canvas.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  });

  canvas.addEventListener("drop", (e) => {
    e.preventDefault();
    const wt = e.dataTransfer.getData("text/widget");
    if (wt) addToCanvas(wt, canvas);
  });

  // Click canvas empty to deselect — handled in canvas.js initCanvasInteraction
}
