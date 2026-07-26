/**
 * EXPORT — Preview & code export (updated to exclude indicator)
 */

function openPreview() {
  const html = genFullPage();
  const frame = $("#previewFrame");
  frame.src = URL.createObjectURL(new Blob([html], { type: "text/html" }));
  $("#previewModal").classList.remove("hidden");
}

function openExport() {
  DC.exportTab = "html";
  $$(".exp-tab").forEach((t) =>
    t.classList.toggle("active", t.dataset.exp === "html"),
  );
  updateExport();
  $("#exportModal").classList.remove("hidden");
}

function initExport() {
  $$(".exp-tab").forEach((t) =>
    t.addEventListener("click", () => {
      $$(".exp-tab").forEach((x) => x.classList.remove("active"));
      t.classList.add("active");
      DC.exportTab = t.dataset.exp;
      updateExport();
    }),
  );
  $("#btnCopy").addEventListener("click", () => {
    navigator.clipboard
      .writeText($("#expCode").textContent)
      .then(() => toast("Copied!", "success"));
  });
}

function updateExport() {
  const code = $("#expCode");
  if (DC.exportTab === "html") code.textContent = genBodyHTML();
  else if (DC.exportTab === "css") code.textContent = genCSS();
  else code.textContent = genFullPage();
}

function cleanCanvas() {
  const cl = $("#canvas").cloneNode(true);
  const hint = cl.querySelector(".canvas-hint");
  if (hint) hint.remove();
  const ind = cl.querySelector(".drop-indicator");
  if (ind) ind.remove();

  cl.querySelectorAll("[data-dc]").forEach((el) => {
    el.removeAttribute("data-dc");
    el.removeAttribute("data-dc-tag");
    el.removeAttribute("data-tag");
    el.classList.remove("dc-sel", "drop-active", "dc-dragging");
    el.removeAttribute("contenteditable");
    if (el.className === "") el.removeAttribute("class");
  });

  // Close mobile menus in export
  cl.querySelectorAll(".rc-nav-mobile-menu").forEach((m) =>
    m.classList.remove("open"),
  );

  return cl.innerHTML;
}

function genBodyHTML() {
  return fmtHTML(cleanCanvas());
}

function genCSS() {
  let css =
    "* { margin:0; padding:0; box-sizing:border-box; }\nbody { font-family:'Inter',sans-serif; }\n\n";
  $("#canvas")
    .querySelectorAll("[data-dc]")
    .forEach((el, i) => {
      const s = el.getAttribute("style");
      if (s) {
        css += `.el-${i + 1} {\n`;
        s.split(";").forEach((r) => {
          const t = r.trim();
          if (t) css += `    ${t};\n`;
        });
        css += "}\n\n";
      }
    });
  return css;
}

function genFullPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family:'Inter',sans-serif; }
        img { max-width:100%; height:auto; }

        /* Responsive */
        @media(max-width:768px) {
            .rc-nav-links { display:none !important; }
            .rc-nav-toggle { display:flex !important; align-items:center; justify-content:center; width:36px; height:36px; background:transparent; border:1px solid #eee; border-radius:6px; cursor:pointer; color:#333; font-size:18px; }
            .rc-nav-mobile-menu { display:none; position:absolute; top:100%; left:0; right:0; background:white; border-bottom:1px solid #eee; box-shadow:0 8px 24px rgba(0,0,0,0.08); z-index:100; flex-direction:column; padding:8px 0; }
            .rc-nav-mobile-menu.open { display:flex !important; }
            .rc-nav-mobile-menu a { padding:12px 20px !important; display:block !important; border-bottom:1px solid #f5f5f5; font-size:14px !important; color:#333 !important; text-decoration:none !important; }
            .rc-nav-mobile-menu button { margin:8px 16px !important; width:calc(100% - 32px) !important; }
            .rc-grid-responsive { grid-template-columns:1fr !important; }
            .rc-grid-2 { grid-template-columns:1fr !important; }
            .rc-hero h1 { font-size:28px !important; }
            .rc-hero p { font-size:14px !important; }
            .rc-hero-buttons { flex-direction:column !important; align-items:stretch !important; }
            .rc-hero-buttons button { width:100% !important; }
            .rc-footer-grid { grid-template-columns:1fr !important; }
            .rc-section-padding { padding:32px 16px !important; }
            .rc-card { width:100% !important; max-width:100% !important; margin:0 !important; }
        }

        @media(min-width:769px) and (max-width:1024px) {
            .rc-grid-responsive { grid-template-columns:repeat(2,1fr) !important; }
            .rc-hero h1 { font-size:36px !important; }
            .rc-section-padding { padding:40px 24px !important; }
            .rc-footer-grid { grid-template-columns:repeat(2,1fr) !important; }
        }

        @media(min-width:769px) {
            .rc-nav-toggle { display:none !important; }
            .rc-nav-mobile-menu { display:none !important; }
        }
    </style>
</head>
<body>
${genBodyHTML()}
<script>
    // Mobile nav toggle
    document.querySelectorAll('.rc-nav-toggle').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var menu = this.parentElement.querySelector('.rc-nav-mobile-menu');
            if (menu) menu.classList.toggle('open');
        });
    });
</script>
</body>
</html>`;
}
