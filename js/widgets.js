/**
 * WIDGETS — Widget template definitions + panel builder
 */

// Helper creators
function _el(tag, text, css) {
  const e = document.createElement(tag);
  if (text) e.textContent = text;
  if (css) e.style.cssText = css;
  return e;
}

function _inp(type, ph) {
  const e = document.createElement("input");
  e.type = type;
  e.placeholder = ph;
  e.style.cssText =
    "display:block;width:280px;padding:10px 14px;border:1px solid #ddd;border-radius:6px;font-size:14px;margin:8px;outline:none;font-family:inherit;";
  return e;
}

function _media(tag, icon, label, bg, w, h) {
  const dark = !(bg.startsWith("#f") || bg.startsWith("#e"));
  const e = _el(
    "div",
    "",
    `width:${w};height:${h};background:${bg};border-radius:8px;display:flex;align-items:center;justify-content:center;margin:10px;color:${dark ? "white" : "#999"};${dark ? "" : "border:2px solid #ddd;"}`,
  );
  e.innerHTML = `<span style="text-align:center"><i class="fas ${icon}" style="font-size:28px;display:block;margin-bottom:8px"></i>${label}</span>`;
  e.setAttribute("data-tag", tag);
  return e;
}

// All widget templates
const WidgetTemplates = {
  h1: () => _el("h1", "Heading 1", "margin:0;padding:10px;font-size:32px"),
  h2: () => _el("h2", "Heading 2", "margin:0;padding:10px;font-size:26px"),
  h3: () => _el("h3", "Heading 3", "margin:0;padding:10px;font-size:22px"),
  h4: () => _el("h4", "Heading 4", "margin:0;padding:10px;font-size:18px"),
  h5: () => _el("h5", "Heading 5", "margin:0;padding:10px;font-size:16px"),
  h6: () => _el("h6", "Heading 6", "margin:0;padding:10px;font-size:14px"),
  p: () =>
    _el(
      "p",
      "Paragraph text. Edit by double-clicking.",
      "margin:0;padding:10px;line-height:1.6",
    ),
  span: () => _el("span", "Span text", "padding:4px 8px;display:inline-block"),
  a: () => {
    const e = _el(
      "a",
      "Link",
      "padding:4px 8px;display:inline-block;color:#7c6cf0",
    );
    e.href = "#";
    e.onclick = (ev) => ev.preventDefault();
    return e;
  },
  strong: () =>
    _el("strong", "Bold text", "padding:4px 8px;display:inline-block"),
  em: () => _el("em", "Italic text", "padding:4px 8px;display:inline-block"),
  blockquote: () =>
    _el(
      "blockquote",
      '"Something inspiring."',
      "margin:10px;padding:15px 20px;border-left:4px solid #7c6cf0;background:#f8f8ff;font-style:italic",
    ),
  code: () =>
    _el(
      "code",
      "const x = true;",
      "padding:2px 8px;background:#f0f0f0;border-radius:4px;font-family:monospace;display:inline-block",
    ),
  pre: () =>
    _el(
      "pre",
      'function hello() {\n  return "world";\n}',
      "margin:10px;padding:15px;background:#2d2d2d;color:#f8f8f2;border-radius:8px;font-size:13px",
    ),
  abbr: () => {
    const e = _el(
      "abbr",
      "HTML",
      "text-decoration:underline dotted;cursor:help",
    );
    e.title = "HyperText Markup Language";
    return e;
  },
  mark: () => _el("mark", "Highlighted", "padding:2px 6px"),
  small: () => _el("small", "Small text", "padding:4px;display:inline-block"),
  sub: () => {
    const e = _el("span", "", "padding:4px;display:inline-block");
    e.innerHTML = "H<sub>2</sub>O";
    return e;
  },
  sup: () => {
    const e = _el("span", "", "padding:4px;display:inline-block");
    e.innerHTML = "E=mc<sup>2</sup>";
    return e;
  },

  div: () =>
    _el("div", "", "min-height:80px;padding:20px;border:1px dashed #ddd"),
  section: () =>
    _el("section", "", "min-height:100px;padding:30px;background:#fafafa"),
  article: () =>
    _el(
      "article",
      "",
      "min-height:80px;padding:20px;border:1px solid #eee;border-radius:8px",
    ),
  aside: () =>
    _el(
      "aside",
      "",
      "min-height:80px;padding:20px;background:#f5f5f5;border-left:3px solid #7c6cf0",
    ),
  header: () =>
    _el(
      "header",
      "",
      "min-height:60px;padding:15px 20px;border-bottom:1px solid #eee",
    ),
  footer: () =>
    _el(
      "footer",
      "",
      "min-height:60px;padding:15px 20px;background:#333;color:#fff",
    ),
  nav: () =>
    _el(
      "nav",
      "",
      "padding:10px 20px;border-bottom:1px solid #eee;display:flex;gap:15px",
    ),
  main: () => _el("main", "", "min-height:200px;padding:20px"),
  figure: () => {
    const e = _el(
      "figure",
      "",
      "margin:10px;padding:10px;background:#fafafa;border-radius:8px;text-align:center",
    );
    e.innerHTML =
      '<div style="width:100%;height:150px;background:#eee;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#999">Image</div>';
    return e;
  },
  figcaption: () =>
    _el(
      "figcaption",
      "Caption",
      "padding:8px;text-align:center;font-size:14px;color:#666",
    ),
  details: () => {
    const e = _el(
      "details",
      "",
      "margin:10px;padding:10px;border:1px solid #eee;border-radius:8px",
    );
    e.innerHTML =
      '<summary style="cursor:pointer;font-weight:600;padding:5px">Click to expand</summary><p style="padding:10px 5px">Content here.</p>';
    return e;
  },
  summary: () =>
    _el("summary", "Summary", "padding:8px;cursor:pointer;font-weight:600"),
  hr: () => {
    const e = document.createElement("hr");
    e.style.cssText = "margin:10px;border:none;border-top:1px solid #eee";
    return e;
  },
  br: () => {
    const e = _el("div", "", "height:20px");
    e.innerHTML = "<br>";
    return e;
  },

  img: () =>
    _media(
      "img",
      "fa-image",
      "Image",
      "linear-gradient(135deg,#667eea,#764ba2)",
      "300px",
      "200px",
    ),
  video: () => _media("video", "fa-video", "Video", "#111", "400px", "240px"),
  audio: () => {
    const e = _el(
      "div",
      "",
      "width:300px;padding:20px;background:#f0f0f0;border-radius:25px;display:flex;align-items:center;gap:10px;margin:10px",
    );
    e.innerHTML =
      '<i class="fas fa-volume-up" style="font-size:18px;color:#333"></i><div style="flex:1;height:4px;background:#ddd;border-radius:2px"><div style="width:30%;height:100%;background:#7c6cf0;border-radius:2px"></div></div>';
    e.setAttribute("data-tag", "audio");
    return e;
  },
  iframe: () =>
    _media(
      "iframe",
      "fa-window-restore",
      "iFrame",
      "#f5f5f5",
      "400px",
      "300px",
    ),
  "canvas-el": () =>
    _media("canvas", "fa-paint-brush", "Canvas", "#fafafa", "300px", "200px"),
  svg: () => {
    const e = _el("div", "", "width:100px;height:100px;margin:10px");
    e.innerHTML =
      '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#7c6cf0" opacity=".2" stroke="#7c6cf0" stroke-width="2"/><text x="50" y="55" text-anchor="middle" fill="#7c6cf0" font-size="12">SVG</text></svg>';
    return e;
  },
  picture: () =>
    _media(
      "picture",
      "fa-images",
      "Picture",
      "linear-gradient(45deg,#f093fb,#f5576c)",
      "300px",
      "200px",
    ),

  form: () => {
    const e = _el(
      "form",
      "",
      "min-height:100px;padding:20px;border:1px dashed #ccc;border-radius:8px",
    );
    e.onsubmit = (ev) => ev.preventDefault();
    return e;
  },
  "input-text": () => _inp("text", "Text input"),
  "input-email": () => _inp("email", "email@example.com"),
  "input-password": () => _inp("password", "Password"),
  "input-number": () => {
    const e = _inp("number", "0");
    e.style.width = "150px";
    return e;
  },
  "input-tel": () => _inp("tel", "+1 234 567 890"),
  "input-url": () => _inp("url", "https://example.com"),
  "input-date": () => {
    const e = document.createElement("input");
    e.type = "date";
    e.style.cssText =
      "display:block;width:200px;padding:10px 14px;border:1px solid #ddd;border-radius:6px;font-size:14px;margin:8px;outline:none;font-family:inherit";
    return e;
  },
  "input-time": () => {
    const e = document.createElement("input");
    e.type = "time";
    e.style.cssText =
      "display:block;width:160px;padding:10px 14px;border:1px solid #ddd;border-radius:6px;font-size:14px;margin:8px;outline:none;font-family:inherit";
    return e;
  },
  "input-color": () => {
    const e = document.createElement("input");
    e.type = "color";
    e.value = "#7c6cf0";
    e.style.cssText =
      "display:block;width:60px;height:40px;border:1px solid #ddd;border-radius:6px;padding:4px;margin:8px;cursor:pointer";
    return e;
  },
  "input-range": () => {
    const e = document.createElement("input");
    e.type = "range";
    e.style.cssText =
      "display:block;width:280px;margin:8px;accent-color:#7c6cf0";
    return e;
  },
  "input-file": () => {
    const e = document.createElement("input");
    e.type = "file";
    e.style.cssText = "display:block;margin:8px;font-size:14px";
    return e;
  },
  "input-checkbox": () => {
    const e = _el(
      "label",
      "",
      "display:flex;align-items:center;gap:8px;padding:8px;cursor:pointer;font-size:14px",
    );
    e.innerHTML =
      '<input type="checkbox" style="accent-color:#7c6cf0;width:18px;height:18px;cursor:pointer"> Checkbox';
    return e;
  },
  "input-radio": () => {
    const e = _el(
      "label",
      "",
      "display:flex;align-items:center;gap:8px;padding:8px;cursor:pointer;font-size:14px",
    );
    e.innerHTML =
      '<input type="radio" name="radio" style="accent-color:#7c6cf0;width:18px;height:18px;cursor:pointer"> Radio';
    return e;
  },
  textarea: () => {
    const e = document.createElement("textarea");
    e.placeholder = "Enter message...";
    e.rows = 4;
    e.style.cssText =
      "display:block;width:300px;padding:10px 14px;border:1px solid #ddd;border-radius:6px;font-size:14px;margin:8px;outline:none;font-family:inherit;resize:vertical";
    return e;
  },
  select: () => {
    const e = document.createElement("select");
    e.style.cssText =
      "display:block;width:280px;padding:10px 14px;border:1px solid #ddd;border-radius:6px;font-size:14px;margin:8px;outline:none;font-family:inherit;cursor:pointer;background:white";
    e.innerHTML =
      "<option>Option 1</option><option>Option 2</option><option>Option 3</option>";
    return e;
  },
  button: () =>
    _el(
      "button",
      "Button",
      "padding:10px 24px;background:#7c6cf0;color:white;border:none;border-radius:6px;font-size:14px;font-weight:600;cursor:pointer;margin:8px;font-family:inherit",
    ),
  label: () =>
    _el(
      "label",
      "Label",
      "display:block;padding:4px 8px;font-size:14px;font-weight:500;color:#333",
    ),
  fieldset: () => {
    const e = _el(
      "fieldset",
      "",
      "margin:10px;padding:20px;border:1px solid #ddd;border-radius:8px",
    );
    e.innerHTML =
      '<legend style="padding:0 8px;font-weight:600">Fieldset</legend>';
    return e;
  },
  progress: () => {
    const e = document.createElement("progress");
    e.value = 65;
    e.max = 100;
    e.style.cssText =
      "display:block;width:280px;height:20px;margin:8px;accent-color:#7c6cf0";
    return e;
  },
  meter: () => {
    const e = document.createElement("meter");
    e.value = 0.7;
    e.min = 0;
    e.max = 1;
    e.style.cssText = "display:block;width:280px;height:20px;margin:8px";
    return e;
  },
  output: () =>
    _el(
      "output",
      "42",
      "display:inline-block;padding:8px 16px;background:#e8f5e9;color:#2e7d32;border-radius:6px;font-weight:600;margin:8px",
    ),

  ul: () => {
    const e = _el("ul", "", "padding:10px 10px 10px 30px;margin:0");
    e.innerHTML =
      '<li style="padding:4px 0">Item 1</li><li style="padding:4px 0">Item 2</li><li style="padding:4px 0">Item 3</li>';
    return e;
  },
  ol: () => {
    const e = _el("ol", "", "padding:10px 10px 10px 30px;margin:0");
    e.innerHTML =
      '<li style="padding:4px 0">First</li><li style="padding:4px 0">Second</li><li style="padding:4px 0">Third</li>';
    return e;
  },
  dl: () => {
    const e = _el("dl", "", "padding:10px;margin:0");
    e.innerHTML =
      '<dt style="font-weight:600;padding:4px 0">Term</dt><dd style="margin-left:20px;padding:4px 0;color:#666">Definition</dd>';
    return e;
  },
  table: () => {
    const e = document.createElement("table");
    e.style.cssText = "width:100%;border-collapse:collapse;margin:10px 0";
    e.innerHTML =
      '<thead><tr><th style="padding:10px 15px;text-align:left;border-bottom:2px solid #7c6cf0;font-weight:600">H1</th><th style="padding:10px 15px;text-align:left;border-bottom:2px solid #7c6cf0;font-weight:600">H2</th><th style="padding:10px 15px;text-align:left;border-bottom:2px solid #7c6cf0;font-weight:600">H3</th></tr></thead><tbody><tr><td style="padding:10px 15px;border-bottom:1px solid #eee">A</td><td style="padding:10px 15px;border-bottom:1px solid #eee">B</td><td style="padding:10px 15px;border-bottom:1px solid #eee">C</td></tr></tbody>';
    return e;
  },

  // ===== RESPONSIVE COMPONENTS =====

  "comp-navbar": () => {
    const e = _el(
      "nav",
      "",
      "display:flex;align-items:center;justify-content:space-between;padding:12px 24px;background:white;border-bottom:1px solid #eee;position:relative;",
    );
    e.innerHTML = `
            <div style="font-size:20px;font-weight:700;color:#7c6cf0;">Brand</div>
            <div class="rc-nav-links" style="display:flex;gap:20px;align-items:center;">
                <a href="#" style="text-decoration:none;color:#333;font-size:14px;font-weight:500;" onclick="event.preventDefault()">Home</a>
                <a href="#" style="text-decoration:none;color:#666;font-size:14px;" onclick="event.preventDefault()">About</a>
                <a href="#" style="text-decoration:none;color:#666;font-size:14px;" onclick="event.preventDefault()">Services</a>
                <a href="#" style="text-decoration:none;color:#666;font-size:14px;" onclick="event.preventDefault()">Contact</a>
                <button type="button" style="padding:8px 20px;background:#7c6cf0;color:white;border:none;border-radius:6px;font-size:13px;cursor:pointer;font-family:inherit;">Get Started</button>
            </div>
            <button type="button" class="rc-nav-toggle" style="display:none;" onclick="this.parentElement.querySelector('.rc-nav-mobile-menu').classList.toggle('open')">
                <i class="fas fa-bars"></i>
            </button>
            <div class="rc-nav-mobile-menu">
                <a href="#" onclick="event.preventDefault()">Home</a>
                <a href="#" onclick="event.preventDefault()">About</a>
                <a href="#" onclick="event.preventDefault()">Services</a>
                <a href="#" onclick="event.preventDefault()">Contact</a>
                <button type="button" style="padding:10px 20px;background:#7c6cf0;color:white;border:none;border-radius:6px;font-size:14px;cursor:pointer;font-family:inherit;">Get Started</button>
            </div>
        `;
    return e;
  },

  "comp-hero": () => {
    const e = _el(
      "section",
      "",
      "padding:80px 40px;text-align:center;background:linear-gradient(135deg,#667eea,#764ba2);color:white;",
    );
    e.classList.add("rc-hero", "rc-section-padding");
    e.innerHTML = `
            <h1 style="font-size:48px;margin:0 0 16px;font-weight:700;line-height:1.15;">Build Something Amazing</h1>
            <p style="font-size:18px;max-width:600px;margin:0 auto 30px;opacity:0.9;line-height:1.6;">Create beautiful, responsive websites with our powerful design tool. No coding required.</p>
            <div class="rc-hero-buttons" style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
                <button type="button" style="padding:14px 32px;background:white;color:#7c6cf0;border:none;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;font-family:inherit;">Get Started</button>
                <button type="button" style="padding:14px 32px;background:transparent;color:white;border:2px solid rgba(255,255,255,0.4);border-radius:8px;font-size:16px;font-weight:500;cursor:pointer;font-family:inherit;">Learn More</button>
            </div>
        `;
    return e;
  },

  "comp-card": () => {
    const e = _el(
      "div",
      "",
      "width:320px;background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);margin:10px;",
    );
    e.classList.add("rc-card");
    e.innerHTML = `
            <div style="height:180px;background:linear-gradient(135deg,#f093fb,#f5576c);"></div>
            <div style="padding:20px;">
                <h3 style="margin:0 0 8px;font-size:18px;font-weight:600;">Card Title</h3>
                <p style="margin:0 0 16px;color:#666;font-size:14px;line-height:1.5;">Card description text goes here. This adapts to mobile layout.</p>
                <button type="button" style="padding:10px 20px;background:#7c6cf0;color:white;border:none;border-radius:6px;font-size:14px;cursor:pointer;width:100%;font-family:inherit;">Read More</button>
            </div>
        `;
    return e;
  },

  "comp-footer": () => {
    const e = _el(
      "footer",
      "",
      "padding:40px 30px 20px;background:#1a1a2e;color:white;",
    );
    e.classList.add("rc-footer-padding");
    e.innerHTML = `
            <div class="rc-footer-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:30px;margin-bottom:30px;">
                <div>
                    <h4 style="margin:0 0 12px;font-size:16px;">Company</h4>
                    <p style="font-size:13px;color:rgba(255,255,255,0.6);line-height:1.6;margin:0;">Building the future of web design, one pixel at a time.</p>
                </div>
                <div>
                    <h4 style="margin:0 0 12px;font-size:16px;">Quick Links</h4>
                    <div style="display:flex;flex-direction:column;gap:6px;">
                        <a href="#" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:13px;" onclick="event.preventDefault()">Home</a>
                        <a href="#" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:13px;" onclick="event.preventDefault()">About</a>
                        <a href="#" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:13px;" onclick="event.preventDefault()">Services</a>
                        <a href="#" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:13px;" onclick="event.preventDefault()">Contact</a>
                    </div>
                </div>
                <div>
                    <h4 style="margin:0 0 12px;font-size:16px;">Contact</h4>
                    <p style="font-size:13px;color:rgba(255,255,255,0.6);line-height:1.8;margin:0;">
                        hello@company.com<br>+1 234 567 890
                    </p>
                </div>
            </div>
            <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:20px;text-align:center;font-size:12px;color:rgba(255,255,255,0.4);">
                © 2024 Company. All rights reserved.
            </div>
        `;
    return e;
  },

  "comp-grid2": () => {
    const e = _el(
      "div",
      "",
      "display:grid;grid-template-columns:1fr 1fr;gap:20px;padding:20px;",
    );
    e.classList.add("rc-grid-2");
    e.innerHTML = `
            <div style="min-height:120px;background:#f8f8ff;border-radius:8px;padding:24px;border:1px dashed #ddd;display:flex;align-items:center;justify-content:center;color:#999;font-size:14px;">Column 1</div>
            <div style="min-height:120px;background:#f8f8ff;border-radius:8px;padding:24px;border:1px dashed #ddd;display:flex;align-items:center;justify-content:center;color:#999;font-size:14px;">Column 2</div>
        `;
    return e;
  },

  "comp-grid3": () => {
    const e = _el(
      "div",
      "",
      "display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;padding:20px;",
    );
    e.classList.add("rc-grid-responsive");
    e.innerHTML = `
            <div style="min-height:120px;background:#f8f8ff;border-radius:8px;padding:24px;border:1px dashed #ddd;display:flex;align-items:center;justify-content:center;color:#999;font-size:14px;">Column 1</div>
            <div style="min-height:120px;background:#f8f8ff;border-radius:8px;padding:24px;border:1px dashed #ddd;display:flex;align-items:center;justify-content:center;color:#999;font-size:14px;">Column 2</div>
            <div style="min-height:120px;background:#f8f8ff;border-radius:8px;padding:24px;border:1px dashed #ddd;display:flex;align-items:center;justify-content:center;color:#999;font-size:14px;">Column 3</div>
        `;
    return e;
  },
  // Additional responsive components

  "comp-features": () => {
    const e = _el("section", "", "padding:60px 40px;background:white;");
    e.classList.add("rc-section-padding");
    e.innerHTML = `
            <h2 style="text-align:center;margin:0 0 8px;font-size:32px;font-weight:700;">Features</h2>
            <p style="text-align:center;color:#666;margin:0 auto 40px;max-width:500px;font-size:15px;">Everything you need to build amazing websites</p>
            <div class="rc-grid-responsive" style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
                <div style="text-align:center;padding:24px;">
                    <div style="width:56px;height:56px;background:#f0edff;border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;color:#7c6cf0;"><i class="fas fa-bolt"></i></div>
                    <h3 style="margin:0 0 8px;font-size:18px;">Lightning Fast</h3>
                    <p style="margin:0;color:#666;font-size:14px;line-height:1.5;">Optimized for performance and speed.</p>
                </div>
                <div style="text-align:center;padding:24px;">
                    <div style="width:56px;height:56px;background:#e8f5e9;border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;color:#22c55e;"><i class="fas fa-shield-alt"></i></div>
                    <h3 style="margin:0 0 8px;font-size:18px;">Secure</h3>
                    <p style="margin:0;color:#666;font-size:14px;line-height:1.5;">Enterprise-grade security built in.</p>
                </div>
                <div style="text-align:center;padding:24px;">
                    <div style="width:56px;height:56px;background:#fff3e0;border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;color:#f59e0b;"><i class="fas fa-mobile-alt"></i></div>
                    <h3 style="margin:0 0 8px;font-size:18px;">Responsive</h3>
                    <p style="margin:0;color:#666;font-size:14px;line-height:1.5;">Looks great on every device.</p>
                </div>
            </div>
        `;
    return e;
  },

  "comp-cta": () => {
    const e = _el(
      "section",
      "",
      "padding:60px 40px;background:#7c6cf0;color:white;text-align:center;",
    );
    e.classList.add("rc-hero", "rc-section-padding");
    e.innerHTML = `
            <h2 style="margin:0 0 12px;font-size:32px;font-weight:700;">Ready to Get Started?</h2>
            <p style="margin:0 auto 24px;max-width:500px;font-size:16px;opacity:0.9;">Join thousands of designers building amazing websites.</p>
            <div class="rc-hero-buttons" style="display:flex;gap:12px;justify-content:center;">
                <button type="button" style="padding:14px 32px;background:white;color:#7c6cf0;border:none;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;font-family:inherit;">Start Free Trial</button>
                <button type="button" style="padding:14px 32px;background:transparent;color:white;border:2px solid rgba(255,255,255,0.4);border-radius:8px;font-size:16px;cursor:pointer;font-family:inherit;">Contact Sales</button>
            </div>
        `;
    return e;
  },

  "comp-testimonial": () => {
    const e = _el("section", "", "padding:60px 40px;background:#fafafa;");
    e.classList.add("rc-section-padding");
    e.innerHTML = `
            <h2 style="text-align:center;margin:0 0 32px;font-size:28px;font-weight:700;">What People Say</h2>
            <div class="rc-grid-responsive" style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
                <div style="background:white;padding:24px;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.05);">
                    <div style="color:#f59e0b;margin-bottom:12px;">★★★★★</div>
                    <p style="color:#555;font-size:14px;line-height:1.6;margin:0 0 16px;">"Absolutely amazing tool. Changed how I work completely."</p>
                    <div style="display:flex;align-items:center;gap:10px;">
                        <div style="width:40px;height:40px;background:#e8e8ff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;color:#7c6cf0;">A</div>
                        <div><div style="font-weight:600;font-size:14px;">Alice</div><div style="color:#999;font-size:12px;">Designer</div></div>
                    </div>
                </div>
                <div style="background:white;padding:24px;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.05);">
                    <div style="color:#f59e0b;margin-bottom:12px;">★★★★★</div>
                    <p style="color:#555;font-size:14px;line-height:1.6;margin:0 0 16px;">"The responsive preview feature is a game changer."</p>
                    <div style="display:flex;align-items:center;gap:10px;">
                        <div style="width:40px;height:40px;background:#e8f5e9;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;color:#22c55e;">B</div>
                        <div><div style="font-weight:600;font-size:14px;">Bob</div><div style="color:#999;font-size:12px;">Developer</div></div>
                    </div>
                </div>
                <div style="background:white;padding:24px;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.05);">
                    <div style="color:#f59e0b;margin-bottom:12px;">★★★★★</div>
                    <p style="color:#555;font-size:14px;line-height:1.6;margin:0 0 16px;">"Intuitive, fast, and professional results every time."</p>
                    <div style="display:flex;align-items:center;gap:10px;">
                        <div style="width:40px;height:40px;background:#fff3e0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;color:#f59e0b;">C</div>
                        <div><div style="font-weight:600;font-size:14px;">Carol</div><div style="color:#999;font-size:12px;">Founder</div></div>
                    </div>
                </div>
            </div>
        `;
    return e;
  },
};

// Widget catalog for panel generation
const WidgetCatalog = [
  {
    id: "typography",
    label: "Typography",
    icon: "fa-font",
    items: [
      { key: "h1", icon: "<b>H1</b>", name: "Heading 1" },
      { key: "h2", icon: "<b>H2</b>", name: "Heading 2" },
      { key: "h3", icon: "<b>H3</b>", name: "Heading 3" },
      { key: "h4", icon: "<b>H4</b>", name: "Heading 4" },
      { key: "h5", icon: "<b>H5</b>", name: "Heading 5" },
      { key: "h6", icon: "<b>H6</b>", name: "Heading 6" },
      { key: "p", icon: '<i class="fas fa-paragraph"></i>', name: "Paragraph" },
      { key: "span", icon: '<i class="fas fa-font"></i>', name: "Span" },
      { key: "a", icon: '<i class="fas fa-link"></i>', name: "Link" },
      { key: "strong", icon: '<i class="fas fa-bold"></i>', name: "Bold" },
      { key: "em", icon: '<i class="fas fa-italic"></i>', name: "Italic" },
      {
        key: "blockquote",
        icon: '<i class="fas fa-quote-left"></i>',
        name: "Blockquote",
      },
      { key: "code", icon: '<i class="fas fa-code"></i>', name: "Code" },
      { key: "pre", icon: '<i class="fas fa-file-code"></i>', name: "Pre" },
      {
        key: "mark",
        icon: '<i class="fas fa-highlighter"></i>',
        name: "Highlight",
      },
      {
        key: "small",
        icon: '<i class="fas fa-text-height"></i>',
        name: "Small",
      },
    ],
  },
  {
    id: "layout",
    label: "Layout",
    icon: "fa-columns",
    items: [
      { key: "div", icon: '<i class="fas fa-square"></i>', name: "Div" },
      {
        key: "section",
        icon: '<i class="fas fa-layer-group"></i>',
        name: "Section",
      },
      {
        key: "article",
        icon: '<i class="fas fa-newspaper"></i>',
        name: "Article",
      },
      { key: "aside", icon: '<i class="fas fa-indent"></i>', name: "Aside" },
      {
        key: "header",
        icon: '<i class="fas fa-window-maximize"></i>',
        name: "Header",
      },
      {
        key: "footer",
        icon: '<i class="fas fa-window-minimize"></i>',
        name: "Footer",
      },
      { key: "nav", icon: '<i class="fas fa-bars"></i>', name: "Nav" },
      { key: "main", icon: '<i class="fas fa-expand"></i>', name: "Main" },
      { key: "figure", icon: '<i class="fas fa-image"></i>', name: "Figure" },
      {
        key: "details",
        icon: '<i class="fas fa-caret-square-down"></i>',
        name: "Details",
      },
      { key: "hr", icon: '<i class="fas fa-minus"></i>', name: "HR" },
    ],
  },
  {
    id: "media",
    label: "Media",
    icon: "fa-photo-video",
    items: [
      { key: "img", icon: '<i class="fas fa-image"></i>', name: "Image" },
      { key: "video", icon: '<i class="fas fa-video"></i>', name: "Video" },
      { key: "audio", icon: '<i class="fas fa-volume-up"></i>', name: "Audio" },
      {
        key: "iframe",
        icon: '<i class="fas fa-window-restore"></i>',
        name: "iFrame",
      },
      { key: "svg", icon: '<i class="fas fa-bezier-curve"></i>', name: "SVG" },
    ],
  },
  {
    id: "forms",
    label: "Forms",
    icon: "fa-edit",
    collapsed: true,
    items: [
      { key: "form", icon: '<i class="fas fa-file-alt"></i>', name: "Form" },
      {
        key: "input-text",
        icon: '<i class="fas fa-i-cursor"></i>',
        name: "Text",
      },
      {
        key: "input-email",
        icon: '<i class="fas fa-envelope"></i>',
        name: "Email",
      },
      {
        key: "input-password",
        icon: '<i class="fas fa-key"></i>',
        name: "Password",
      },
      {
        key: "input-number",
        icon: '<i class="fas fa-hashtag"></i>',
        name: "Number",
      },
      {
        key: "input-date",
        icon: '<i class="fas fa-calendar"></i>',
        name: "Date",
      },
      {
        key: "input-color",
        icon: '<i class="fas fa-palette"></i>',
        name: "Color",
      },
      {
        key: "input-range",
        icon: '<i class="fas fa-sliders-h"></i>',
        name: "Range",
      },
      {
        key: "input-file",
        icon: '<i class="fas fa-upload"></i>',
        name: "File",
      },
      {
        key: "input-checkbox",
        icon: '<i class="fas fa-check-square"></i>',
        name: "Checkbox",
      },
      {
        key: "input-radio",
        icon: '<i class="fas fa-dot-circle"></i>',
        name: "Radio",
      },
      {
        key: "textarea",
        icon: '<i class="fas fa-align-justify"></i>',
        name: "Textarea",
      },
      { key: "select", icon: '<i class="fas fa-list"></i>', name: "Select" },
      {
        key: "button",
        icon: '<i class="fas fa-hand-pointer"></i>',
        name: "Button",
      },
      { key: "label", icon: '<i class="fas fa-tag"></i>', name: "Label" },
      {
        key: "fieldset",
        icon: '<i class="fas fa-object-group"></i>',
        name: "Fieldset",
      },
      {
        key: "progress",
        icon: '<i class="fas fa-tasks"></i>',
        name: "Progress",
      },
    ],
  },
  {
    id: "liststable",
    label: "Lists & Table",
    icon: "fa-list",
    collapsed: true,
    items: [
      { key: "ul", icon: '<i class="fas fa-list-ul"></i>', name: "UL" },
      { key: "ol", icon: '<i class="fas fa-list-ol"></i>', name: "OL" },
      { key: "dl", icon: '<i class="fas fa-th-list"></i>', name: "DL" },
      { key: "table", icon: '<i class="fas fa-table"></i>', name: "Table" },
    ],
  },
  {
    id: "components",
    label: "Components",
    icon: "fa-puzzle-piece",
    collapsed: true,
    items: [
      {
        key: "comp-navbar",
        icon: '<i class="fas fa-window-maximize"></i>',
        name: "Navbar",
      },
      { key: "comp-hero", icon: '<i class="fas fa-star"></i>', name: "Hero" },
      {
        key: "comp-features",
        icon: '<i class="fas fa-th"></i>',
        name: "Features",
      },
      {
        key: "comp-card",
        icon: '<i class="fas fa-id-card"></i>',
        name: "Card",
      },
      { key: "comp-cta", icon: '<i class="fas fa-bullhorn"></i>', name: "CTA" },
      {
        key: "comp-testimonial",
        icon: '<i class="fas fa-comments"></i>',
        name: "Testimonials",
      },
      {
        key: "comp-footer",
        icon: '<i class="fas fa-shoe-prints"></i>',
        name: "Footer",
      },
      {
        key: "comp-grid2",
        icon: '<i class="fas fa-th-large"></i>',
        name: "2-Col",
      },
      { key: "comp-grid3", icon: '<i class="fas fa-th"></i>', name: "3-Col" },
    ],
  },
];

function buildWidgetPanel() {
  const container = $("#wgContainer");
  container.innerHTML = "";

  WidgetCatalog.forEach((group) => {
    const g = document.createElement("div");
    g.className = "widget-group";

    const head = document.createElement("div");
    head.className = "wg-head" + (group.collapsed ? " collapsed" : "");
    head.setAttribute("data-group", group.id);
    head.innerHTML = `<i class="fas fa-chevron-down wg-arrow"></i><i class="fas ${group.icon} wg-icon"></i><span>${group.label}</span><span class="wg-count">${group.items.length}</span>`;

    const body = document.createElement("div");
    body.className = "wg-body" + (group.collapsed ? " collapsed" : "");
    body.setAttribute("data-group-body", group.id);

    group.items.forEach((item) => {
      const wi = document.createElement("div");
      wi.className = "widget-item";
      wi.draggable = true;
      wi.setAttribute("data-widget", item.key);
      wi.innerHTML = `<div class="wi-icon">${item.icon}</div><span>${item.name}</span>`;
      body.appendChild(wi);
    });

    head.addEventListener("click", () => {
      head.classList.toggle("collapsed");
      body.classList.toggle("collapsed");
    });

    g.appendChild(head);
    g.appendChild(body);
    container.appendChild(g);
  });
}
