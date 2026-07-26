/**
 * UTILS — Helper Functions
 */

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

function gid() {
  return "dc" + ++DC.idN;
}

function toast(msg, type = "info") {
  const icons = {
    success: "fa-check-circle",
    error: "fa-exclamation-circle",
    info: "fa-info-circle",
  };
  const t = document.createElement("div");
  t.className = `toast ${type}`;
  t.innerHTML = `<i class="fas ${icons[type]}"></i><span>${msg}</span>`;
  $("#toastBox").appendChild(t);
  setTimeout(() => {
    t.style.animation = "toastOut 0.3s ease forwards";
    setTimeout(() => t.remove(), 300);
  }, 2500);
}

function rgb2hex(rgb) {
  if (!rgb || rgb === "transparent" || rgb === "") return null;
  if (rgb.startsWith("#")) return rgb;
  const m = rgb.match(/\d+/g);
  if (!m || m.length < 3) return null;
  return (
    "#" +
    m
      .slice(0.3)
      .map((x) => parseInt(x).toString(16).padStart(2, "0"))
      .join("")
  );
}

function val(id, v) {
  const e = $("#" + id);
  if (e) e.value = v || "";
}

function fmtHTML(html) {
  let f = "",
    ind = 0;
  const tab = "   ";
  const blocks =
    /^<(div|section|article|aside|header|footer|nav|main|form|fieldset|ul|ol|dl|table|thead|tbody|tr|figure|details)/;
  const closes =
    /^<\/(div|section|article|aside|header|footer|nav|main|form|fieldset|ul|ol|dl|table|thead|tbody|tr|figure|details)/;

  html
    .replace(/>\s*</g, ">\n<")
    .split("\n")
    .forEach((line) => {
      line = line.trim();
      if (!line) return;
      if (line.match(closes)) ind = Math.max(0, ind - 1);
      f += tab.repeat(ind) + line + "\n";
      if (line.match(blocks) && !line.match(/\/>/)) ind++;
    });
  return f.trim();
}
