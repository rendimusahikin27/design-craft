# ✦ DesignCraft

**Visual website builder. Pure web tech. No bloat.**

A Figma-inspired UI/UX design tool running entirely on HTML, CSS, JavaScript & PHP.
Zero frameworks. Zero build steps. Just open and design.

<img width="1025" height="653" alt="gambar" src="https://github.com/user-attachments/assets/29b7160c-5b72-45d8-8a21-008c1dc5a27b" />


---

## What is this?

DesignCraft lets you design responsive websites visually by dragging widgets onto an infinite canvas, styling them with a property panel, and exporting clean production-ready code.

Think Figma meets a website builder — but you own everything and it runs on any PHP server.

---

## Quick Start

### Option A — Just open it

```bash
git clone https://github.com/rendimusahikin27/design-craft.git
# open index.html in your browser
```

### Option B — With PHP (enables save/load)

```bash
cd /your/webserver/htdocs
git clone https://github.com/rendimusahikin27/design-craft.git
mkdir -p design-craft/projects && chmod 777 design-craft/projects
# visit http://localhost/design-craft
```

### Option C — PHP built-in server

```bash
cd design-craft && php -S localhost:8000
```

**That's it. No npm install. No node_modules. No config files.**

## How to Use

### The Canvas

```text
Action              How
Pan                 Scroll·Middle click· Space + drag
Zoom                Ctrl + Scroll (Targets Cursor)
Fit                 Ctrl + 0
Reset               Ctrl + 1 or click zoom percentage
Switch Viewport     Click Desltop / Tablet / Mobile
```

### Building

```text
Action              How
Add Widget          Drag from left panel → drop on canvas
Quick Add           Double-click any widget
Nest Inside         Drop into a container (div, section, form...)
Move                Drag element on canvas → blue indicator shows target
Edit text           Double-click any text element
Edit Style          Select element → right panel → Style tab
Edit attributes     Select element → right panel → Attrs tab
```

### Managing

```text
Action              How
Duplicate           Ctrl + D or action bar button
Delete              Delete key or action bar button
Undo / Redo         Ctrl + Z / Ctrl + Y
Save                Ctrl + S (server or localStorage fallback)
Preview             Preview button → opens in iframe
Export              Export button → HTML / CSS / Fullpage + Copy
```

### What You Can Drop
**70+ widgets covering every common HTML element:**

```text
Category            Includes
Typography          h1–h6, p, span, a, strong, em, blockquote, code, pre, mark...
Layout              div, section, article, aside, header, footer, nav, main, figure, details...
Media               img, video, audio, iframe, svg (as placeholders — set src in attrs)
Forms               All input types, textarea, select, button, checkbox, radio, progress, meter...
Lists & Table       ul, ol, dl, table
Components          Navbar · Hero · Features · Card · CTA · Testimonials · Footer · 2/3-col grids
```

**All components are responsive — switch to mobile viewport and the navbar gets a working hamburger menu, grids stack, buttons reflow, fonts scale down.**

### Keyboard Cheatsheet

```text
Ctrl + Scroll     Zoom to cursor       V          Select tool
Ctrl + 0          Fit to screen        H          Hand tool
Ctrl + 1          Reset 100%           Space      Temp hand (hold)
Ctrl + Z / Y      Undo / Redo          Delete     Remove element
Ctrl + S          Save                 Escape     Deselect / close
Ctrl + D          Duplicate            Dbl-click  Edit text inline
```

### The Panels
**Left Panel — Widgets & Layers**

```text
Mode            Description
Full            3-column grid with icons + labels, searchable, collapsible groups
Mini            Icon-only strip (56px) — hover for tooltips
Layers          Tree view of all elements, click to select + scroll into view
```

**Toggle mini mode with the ⇄ button. Layers tab always shows full.**

**Right Panel — Style & Attributes**

```text
Tab             What you can edit
Style           Display, Flex, Size, Margin/Padding (visual box), Font, Color, Background, Border, Opacity, Shadow, Transition, Transform, Custom CSS
Attrs           id, class, title, href, src, alt, name, placeholder, value, required, disabled, custom attributes
```

**Both panels float over the canvas, have glassmorphism styling, and are resizable by dragging the edge.**

### Export

```text
Format          You get
HTML            Clean <body> content, formatted with indentation
CSS             Inline styles extracted as class-based rules
Full Page       Complete document with fonts, icons, responsive media queries, and mobile nav script
```

**All design artifacts (data-dc, selection classes, indicators) are stripped. The exported code is ready to ship.**

### Project Structure

```text
designcraft/
├── index.html              ← open this
├── save.php                ← save/load API
├── css/                    ← 10 small stylesheets
│   ├── main.css               variables + reset
│   ├── toolbar.css            top bar
│   ├── panels.css             floating panels + mini
│   ├── canvas.css             infinite canvas
│   ├── widgets.css            widget grid items
│   ├── properties.css         style editor
│   ├── layers.css             layer tree
│   ├── modals.css             preview + export
│   ├── toast.css              notifications
│   └── responsive-canvas.css  in-canvas responsive
├── js/                     ← 16 small modules
│   ├── state.js               global state
│   ├── utils.js               helpers
│   ├── widgets.js             templates + catalog
│   ├── canvas.js              pan/zoom/drag engine
│   ├── selection.js           select/deselect
│   ├── properties.js          style panel
│   ├── attributes.js          attrs panel
│   ├── layers.js              layer tree
│   ├── history.js             undo/redo
│   ├── toolbar.js             toolbar wiring
│   ├── panels.js              panel logic
│   ├── export.js              preview + export
│   ├── storage.js             save/load
│   ├── keyboard.js            shortcuts
│   ├── dragdrop.js            widget drag
│   └── app.js                 init
└── projects/               ← auto-created, stores saves
```

**Every file stays under ~200 lines. Fix one thing → edit one file.**

### Requirements

```text
Minimum: Any modern browser (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
For save/load: PHP 7.4+ with write access to projects/ directory
Without PHP: Everything works — saves go to localStorage instead.
```

### Troubleshooting

```text
Issue	                            Fix
Favicon                             404 in console	Add inline SVG favicon to <head> — see below
"Saved locally" instead of "Saved"	Check PHP is running, projects/ dir is writable
Widgets panel empty	                Check console for JS errors, verify script load order
Mini mode causes horizontal scroll	Use latest css/panels.css with overflow fix
Elements unresponsive after undo	restoreHist() must call bindElement() on restored elements
```

### Favicon fix — add this one line to <head>:

```HTML
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%237c6cf0'/><text x='50' y='68' font-size='50' text-anchor='middle' fill='white' font-family='Arial' font-weight='bold'>D</text></svg>">
```

---

### What's Next
**v1.1 — Multi-page support · Component library · Image upload · Google Fonts browser · Right-click context menu · Rulers & snap-to-grid**

**v2.0 — CSS animation builder · Real-time collaboration · Version history · Plugin system · WordPress export · Tailwind mode · Accessibility checker**

---

### Tech
**v1.1 — Multi-page support · Component library · Image upload · Google Fonts browser · Right-click context menu · Rulers & snap-to-grid**

**v2.0 — CSS animation builder · Real-time collaboration · Version history · Plugin system · WordPress export · Tailwind mode · Accessibility checker**

---

### License
**MIT — do whatever you want with it.**

---

**Built for designers who want to own their tools.**
