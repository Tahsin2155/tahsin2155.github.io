/*!
 * site-cursor.js: Crosshair Pro, Snappy Ring, Orbit Comet, Orbit Snap, Dot + Ring
 * Drop-in, no dependencies. See SITE-CURSOR-GUIDE.md.
 *
 * Every page just loads it (with defer, after main.js). Visitors can pick their own cursor with the
 * footer select ([data-cursor-picker]); the choice is saved in localStorage ("site-cursor") and wins
 * over every setting below.
 *
 * All options live in SETTINGS below. Colors default to --accent / --accent2 from style.css,
 * so the site theme and the cursor stay in sync. A data-* attribute on the <script> tag
 * overrides one option for that page only:
 *   data-cursor="orbit-snap"      crosshair-pro | snappy-ring | orbit-comet | orbit-snap | dot-ring | system
 *   data-accent="#7c5cff"         any CSS color, or var(--name)
 *   data-hover-color="#f97316"    dot-ring hover color
 *   data-snap-delay="150"         ms to rest on a target before it snaps
 *   data-lean="14"                max px a target leans toward the cursor
 */
(() => {
  'use strict';
  if (window.SiteCursor) return; // loaded twice? ignore the second copy

  const S = document.currentScript;
  const D = (S && S.dataset) || {};
  const num = (v, d) => (v !== undefined && v !== '' && !isNaN(+v) ? +v : d);

  // ===================== SETTINGS: edit here, applies site-wide =====================
  const SETTINGS = {
    cursor: 'dot-ring',                   // crosshair-pro | snappy-ring | orbit-comet | orbit-snap | dot-ring | system (no custom cursor)
    accent: 'var(--accent, #2563eb)',     // any CSS color, or a var(--name, fallback) from style.css
    hoverColor: 'var(--accent2, #f97316)', // dot-ring only: dot/ring color while over a link or button
    snapDelay: 150,                       // ms to rest on a target before it snaps
    lean: 14,                             // max px a target leans toward the cursor (snappy-ring)
    // Elements the cursor reacts to. Edit freely.
    targets: 'a, button, input, select, textarea, summary, [role="button"], [data-hover], [data-label]',
  };

  // A data-* attribute on the <script> tag overrides a setting for that page only.
  const CFG = {
    cursor: D.cursor || SETTINGS.cursor,
    accent: D.accent || SETTINGS.accent,
    hoverColor: D.hoverColor || SETTINGS.hoverColor,
    snapDelay: num(D.snapDelay, SETTINGS.snapDelay),
    lean: num(D.lean, SETTINGS.lean),
    targets: SETTINGS.targets,
  };

  // Touch screens have no cursor; respect reduced-motion. System cursor stays.
  if (!matchMedia('(pointer: fine)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // ---------- shared state + helpers ----------
  const P = { x: -200, y: -200, down: false, hover: null };
  let dt = 1 / 60;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  // Canvas can't read `var(--x)`, so turn a theme variable into the real color it holds.
  const color = (v, fallback) => {
    const m = /^var\(\s*(--[\w-]+)\s*(?:,\s*([^)]+?)\s*)?\)$/.exec(String(v).trim());
    if (!m) return v;
    return getComputedStyle(document.documentElement).getPropertyValue(m[1]).trim() || m[2] || fallback;
  };
  // frame-rate independent smoothing (same feel on 60Hz and 144Hz)
  const ease = (a, b, k) => a + (b - a) * (1 - Math.pow(1 - k, dt * 60));

  const html = document.documentElement;
  const root = document.createElement('div');
  root.setAttribute('aria-hidden', 'true');
  root.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:2147483647;opacity:0;transition:opacity .2s';
  const cv = document.createElement('canvas');
  cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
  root.appendChild(cv);
  const g = cv.getContext('2d');
  const css = document.createElement('style');
  css.textContent = 'html.sc-on, html.sc-on * { cursor: none !important; }';
  html.append(css, root);

  // Canvas size = the real fixed box (excludes the scrollbar), so drawing lines up exactly with clientX/Y.
  let W = 0, H = 0;
  function resize() {
    const r = Math.min(devicePixelRatio || 1, 2);
    const b = root.getBoundingClientRect();
    W = b.width || innerWidth; H = b.height || innerHeight;
    cv.width = Math.round(W * r); cv.height = Math.round(H * r);
    g.setTransform(r, 0, 0, r, 0, 0);
  }
  resize();

  const rrect = (x, y, w, h, r) => (g.roundRect ? g.roundRect(x, y, w, h, r) : g.rect(x, y, w, h));

  // ---------- 1) Crosshair Pro ----------
  function crosshairPro() {
    // s blends the brackets between the pointer (0) and the snapped target (1). Free, they sit exactly on the pointer
    // and move as one body with the crosshair; they only glide when snapping to a target or leaving it.
    let s = 0, he = null, ht = 0;
    let tc = { x: P.x, y: P.y, w: 28, h: 28 }; // last target box, kept so the brackets can ease back out of it
    return {
      tick() {
        const now = performance.now();
        if (P.hover !== he) { he = P.hover; ht = now; }
        const e = he && now - ht > CFG.snapDelay ? he : null; // snap only after resting

        if (e) {
          const b = e.getBoundingClientRect();
          tc = { x: b.left + b.width / 2, y: b.top + b.height / 2, w: b.width + 16, h: b.height + 16 };
        }
        s = ease(s, e ? 1 : 0, .25);
        const bx = P.x + (tc.x - P.x) * s, by = P.y + (tc.y - P.y) * s;
        const bw = 28 + (tc.w - 28) * s, bh = 28 + (tc.h - 28) * s;

        // gapped crosshair lines: exactly on the real pointer position, so clicks land where the dot is
        const x = P.x, y = P.y, gap = P.down ? 6 : 14;
        g.strokeStyle = g.fillStyle = CFG.accent;
        g.lineWidth = 1; g.globalAlpha = .5;
        g.beginPath();
        g.moveTo(0, y); g.lineTo(x - gap, y); g.moveTo(x + gap, y); g.lineTo(W, y);
        g.moveTo(x, 0); g.lineTo(x, y - gap); g.moveTo(x, y + gap); g.lineTo(x, H);
        g.stroke();

        // corner brackets
        g.globalAlpha = 1; g.lineWidth = 2;
        const l = Math.min(14, bw / 3, bh / 3);
        const L = bx - bw / 2, R = bx + bw / 2, T = by - bh / 2, B = by + bh / 2;
        g.beginPath();
        [[L, T, 1, 1], [R, T, -1, 1], [L, B, 1, -1], [R, B, -1, -1]].forEach(([cx, cy, sx, sy]) => {
          g.moveTo(cx + sx * l, cy); g.lineTo(cx, cy); g.lineTo(cx, cy + sy * l);
        });
        g.stroke();

        g.beginPath(); g.arc(x, y, 2.5, 0, Math.PI * 2); g.fill();

        // coords + target name (flips near screen edges)
        const label = (x | 0) + ', ' + (y | 0) +
          (e ? '  \u25B8 ' + (e.dataset.label || e.tagName.toLowerCase()) : '');
        const flip = x > W - 180, up = y > H - 40;
        g.font = '12px ui-monospace, monospace';
        g.textBaseline = 'top'; g.textAlign = flip ? 'right' : 'left';
        g.fillText(label, flip ? x - 18 : x + 18, up ? y - 30 : y + 16);
      },
    };
  }

  // ---------- 2) Snappy Ring ----------
  function snappyRing() {
    let x = P.x, y = P.y, w = 36, h = 36, br = 18;
    let he = null, ht = 0, pe = null, ox = 0, oy = 0;
    const fading = []; // targets easing back to rest after you leave them
    const setT = (el, a, b) => { el.style.translate = a + 'px ' + b + 'px'; };

    function release() {
      if (pe && (ox || oy)) fading.push({ el: pe, x: ox, y: oy });
      else if (pe) pe.style.translate = '';
      pe = null; ox = oy = 0;
    }

    return {
      off() {
        fading.forEach(f => { f.el.style.translate = ''; });
        fading.length = 0;
        if (pe) pe.style.translate = '';
        pe = null;
      },
      tick() {
        const now = performance.now();
        if (P.hover !== he) { he = P.hover; ht = now; }
        const e = he && now - ht > CFG.snapDelay ? he : null; // snap only after resting

        if (e !== pe) {
          release(); pe = e;
          const i = fading.findIndex(f => f.el === e); // re-entered a target that was still easing back
          if (e && i > -1) { ox = fading[i].x; oy = fading[i].y; fading.splice(i, 1); }
        }
        for (let i = fading.length - 1; i >= 0; i--) {
          const f = fading[i];
          f.x = ease(f.x, 0, .2); f.y = ease(f.y, 0, .2);
          if (Math.abs(f.x) + Math.abs(f.y) < .2) { f.el.style.translate = ''; fading.splice(i, 1); }
          else setT(f.el, f.x, f.y);
        }

        let tx = P.x, ty = P.y, tw = 36, th = 36, tb = 18;
        if (e) {
          const b = e.getBoundingClientRect(), cs = getComputedStyle(e);
          // lean: skip inline links (transforms don't apply) and form fields (shifting while typing feels wrong)
          if (CFG.lean > 0 && cs.display !== 'inline' && !e.matches('input, textarea, select')) {
            // read the translate actually on screen (safe even if your CSS has `transition: all`)
            let ax = 0, ay = 0;
            if (cs.translate && cs.translate !== 'none') {
              const m = cs.translate.split(' '); ax = parseFloat(m[0]) || 0; ay = parseFloat(m[1]) || 0;
            }
            const cx = b.left + b.width / 2 - ax, cy = b.top + b.height / 2 - ay; // un-leaned center
            ox = ease(ox, clamp((P.x - cx) * .2, -CFG.lean, CFG.lean), .2);
            oy = ease(oy, clamp((P.y - cy) * .2, -CFG.lean, CFG.lean), .2);
            setT(e, ox, oy); // CSS `translate` does not fight your own `transform`
          }
          // frame wraps the target as it actually appears on screen
          tx = b.left + b.width / 2; ty = b.top + b.height / 2;
          tw = b.width + 14; th = b.height + 14;
          const rad = cs.borderTopLeftRadius || '';
          const r = rad.indexOf('%') > -1 ? Math.min(b.width, b.height) * parseFloat(rad) / 100 : parseFloat(rad) || 0;
          tb = Math.min(r + 7, Math.min(tw, th) / 2); // cap, so pill/round targets (9999px) don't linger
        }
        if (P.down) { tw *= .9; th *= .9; }
        x = ease(x, tx, .22); y = ease(y, ty, .22);
        w = ease(w, tw, .22); h = ease(h, th, .22); br = ease(br, tb, .22);

        g.strokeStyle = g.fillStyle = CFG.accent;
        g.lineWidth = 2;
        g.beginPath(); rrect(x - w / 2, y - h / 2, w, h, Math.min(br, w / 2, h / 2)); g.stroke();
        g.beginPath(); g.arc(P.x, P.y, e ? 3 : 5, 0, Math.PI * 2); g.fill(); // center dot
      },
    };
  }

  // ---------- 3) Orbit Comet ----------
  function orbitComet() {
    const TRAIL = 260; // ms: trail length is time-based, so it looks the same on any refresh rate
    let x = P.x, y = P.y, r = 24, t = 0;
    const tr = [[], [], []];
    return {
      tick() {
        const now = performance.now();
        x = ease(x, P.x, .3); y = ease(y, P.y, .3);
        r = ease(r, P.hover ? 40 : P.down ? 12 : 24, .15);
        t += .08 * dt * 60;
        g.lineCap = 'round'; g.strokeStyle = CFG.accent;
        g.shadowColor = CFG.accent; g.shadowBlur = 10;
        tr.forEach((p, i) => {
          const a = t + i * 2.094;
          p.push([x + Math.cos(a) * r, y + Math.sin(a) * r, now]);
          while (p.length && now - p[0][2] > TRAIL) p.shift();
          for (let j = 1; j < p.length; j++) {
            const k = Math.max(0, 1 - (now - p[j][2]) / TRAIL);
            g.globalAlpha = k; g.lineWidth = k * 5;
            g.beginPath(); g.moveTo(p[j - 1][0], p[j - 1][1]); g.lineTo(p[j][0], p[j][1]); g.stroke();
          }
        });
        g.globalAlpha = 1; g.shadowBlur = 0;
        g.fillStyle = CFG.accent; g.beginPath(); g.arc(P.x, P.y, 4, 0, Math.PI * 2); g.fill();
      },
    };
  }

  // ---------- 4) Orbit Snap ----------
  // Like Orbit Comet, but once you rest on a target the satellites leave you and orbit the target instead.
  function orbitSnap() {
    const TRAIL = 260;
    let x = P.x, y = P.y, rx = 24, ry = 24, n = 2, sp = .08, t = 0, he = null, ht = 0;
    const tr = [[], [], []];
    return {
      tick() {
        const now = performance.now();
        if (P.hover !== he) { he = P.hover; ht = now; }
        const e = he && now - ht > CFG.snapDelay ? he : null; // snap only after resting

        let tx = P.x, ty = P.y, tRx = 24, tRy = 24, tN = 2, tSp = .08, kc = .3;
        if (e) {
          const b = e.getBoundingClientRect();
          tx = b.left + b.width / 2; ty = b.top + b.height / 2;
          tRx = Math.max(b.width / 2 + 10, 18); tRy = Math.max(b.height / 2 + 10, 18);
          const rad = getComputedStyle(e).borderTopLeftRadius || '';
          const r = rad.indexOf('%') > -1 ? Math.min(b.width, b.height) * parseFloat(rad) / 100 : parseFloat(rad) || 0;
          tN = r >= Math.min(b.width, b.height) / 2 - 1 ? 2 : 4; // round target: circle path. Boxy target: rounded-square path
          tSp = .05; kc = .22;
          if (P.down) { tRx *= .9; tRy *= .9; }
        } else if (P.down) { tRx = tRy = 12; }

        x = ease(x, tx, kc); y = ease(y, ty, kc);
        rx = ease(rx, tRx, .2); ry = ease(ry, tRy, .2); n = ease(n, tN, .2); sp = ease(sp, tSp, .15);
        t += sp * dt * 60;

        g.lineCap = 'round'; g.strokeStyle = CFG.accent;
        g.shadowColor = CFG.accent; g.shadowBlur = 10;
        const pw = 2 / n;
        tr.forEach((p, i) => {
          const a = t + i * 2.094, c = Math.cos(a), s = Math.sin(a);
          p.push([x + rx * Math.sign(c) * Math.pow(Math.abs(c), pw), y + ry * Math.sign(s) * Math.pow(Math.abs(s), pw), now]);
          while (p.length && now - p[0][2] > TRAIL) p.shift();
          for (let j = 1; j < p.length; j++) {
            const k = Math.max(0, 1 - (now - p[j][2]) / TRAIL);
            g.globalAlpha = k; g.lineWidth = k * 5;
            g.beginPath(); g.moveTo(p[j - 1][0], p[j - 1][1]); g.lineTo(p[j][0], p[j][1]); g.stroke();
          }
        });
        g.globalAlpha = 1; g.shadowBlur = 0;
        g.fillStyle = CFG.accent; g.beginPath(); g.arc(P.x, P.y, e ? 3 : 4, 0, Math.PI * 2); g.fill();
      },
    };
  }

  // ---------- 5) Dot + Ring ----------
  // The original cursor from main.js: a dot on the pointer and a ring that lags behind it.
  // Unlike the canvas styles it needs the #cursor and #cursor-ring elements in the page
  // and the `html.cursor-ready` rules in style.css.
  function dotRing() {
    const dot = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return { tick() {} };
    const HOVER = 'a, button, input, textarea, select, [role="button"]';
    const both = fn => { fn(dot); fn(ring); };
    let rx = P.x, ry = P.y, clickTimer = 0;

    // Position with the `translate` property (GPU-composited, no layout), leaving `transform` free for the CSS centering and click scale.
    const place = (el, x, y) => { el.style.translate = x + 'px ' + y + 'px'; };

    const setVisible = v => both(el => el.classList.toggle('is-visible', v));
    const onDown = () => {
      both(el => el.classList.add('is-clicking'));
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => both(el => el.classList.remove('is-clicking')), 160);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    html.classList.add('cursor-ready');
    html.style.setProperty('--cursor-accent', CFG.accent);
    html.style.setProperty('--cursor-hover', CFG.hoverColor);
    place(dot, P.x, P.y); place(ring, rx, ry);
    setVisible(true);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerenter', onEnter);

    return {
      off() {
        clearTimeout(clickTimer);
        document.removeEventListener('pointerdown', onDown);
        document.removeEventListener('pointerleave', onLeave);
        document.removeEventListener('pointerenter', onEnter);
        html.classList.remove('cursor-ready');
        html.style.removeProperty('--cursor-accent');
        html.style.removeProperty('--cursor-hover');
        both(el => { el.classList.remove('is-visible', 'is-hovering', 'is-clicking'); el.style.translate = ''; });
      },
      tick() {
        place(dot, P.x, P.y);
        rx += (P.x - rx) * 0.14; ry += (P.y - ry) * 0.14;
        place(ring, rx, ry);
        const hovering = !!(P.hover && P.hover.closest(HOVER));
        both(el => el.classList.toggle('is-hovering', hovering));
      },
    };
  }

  // ---------- 6) System cursor ----------
  // No custom cursor: hands the browser's own pointer back (the picker's "System cursor" option).
  function system() {
    html.classList.remove('sc-on');
    return { tick() {} };
  }

  // ---------- engine ----------
  const CURSORS = {
    'crosshair-pro': crosshairPro, 'snappy-ring': snappyRing,
    'orbit-comet': orbitComet, 'orbit-snap': orbitSnap, 'dot-ring': dotRing, system,
  };
  const has = k => Object.prototype.hasOwnProperty.call(CURSORS, k);

  // The visitor's own pick (footer select) is saved here and wins over SETTINGS and data-cursor.
  // Storage can be blocked (private mode, browser settings): then the pick lasts for this page view only.
  const KEY = 'site-cursor';
  const saved = () => { try { return localStorage.getItem(KEY); } catch (_) { return null; } };
  const save = v => { try { localStorage.setItem(KEY, v); } catch (_) { /* not saved */ } };
  { const s = saved(); if (s && has(s)) CFG.cursor = s; }
  let cur = null, raf = 0, last = performance.now(), started = false, suspended = false, ro = null;

  function use(name) {
    if (!has(name)) { console.warn('[site-cursor] unknown cursor "' + name + '". Options:', Object.keys(CURSORS)); return; }
    CFG.cursor = name;
    if (started) {
      cur && cur.off && cur.off(); cur = suspended ? null : CURSORS[name]();
      html.classList.toggle('sc-on', !suspended && name !== 'system'); // system cursor visible again, or hidden again
    }
  }

  // Modal <dialog>s and fullscreen live in the browser's top layer, above any z-index.
  // While one is open we hand the system cursor back so you're never left without one.
  function topLayerOpen() {
    try { return !!(document.fullscreenElement || document.querySelector('dialog:modal')); }
    catch (_) { return !!document.fullscreenElement; }
  }

  function loop(now) {
    dt = Math.min((now - last) / 1000, .05); last = now;
    const s = topLayerOpen();
    if (s !== suspended) {
      suspended = s;
      html.classList.toggle('sc-on', !s);
      root.style.opacity = s ? 0 : 1;
      if (s) { cur && cur.off && cur.off(); cur = null; g.clearRect(0, 0, W, H); }
      else cur = CURSORS[CFG.cursor]();
    }
    if (cur) { g.clearRect(0, 0, W, H); cur.tick(); }
    raf = requestAnimationFrame(loop);
  }

  const offs = [];
  const on = (t, ty, fn, o) => { t.addEventListener(ty, fn, o); offs.push(() => t.removeEventListener(ty, fn, o)); };
  const pick = el => (el && el.closest ? el.closest(CFG.targets) : null);
  const show = () => { if (!suspended) root.style.opacity = 1; };

  on(document, 'mousemove', e => {
    P.x = e.clientX; P.y = e.clientY;
    P.hover = pick(e.target instanceof Element ? e.target : null);
    if (!started) { // create on first move so nothing swoops in from the corner
      started = true; html.classList.add('sc-on');
      CFG.accent = color(CFG.accent, '#2563eb'); CFG.hoverColor = color(CFG.hoverColor, '#f97316');
      cur = CURSORS[CFG.cursor]();
      last = performance.now(); raf = requestAnimationFrame(loop);
    }
    show();
  }, { passive: true });
  on(document, 'mousedown', () => { P.down = true; });
  on(document, 'mouseup', () => { P.down = false; });
  on(document, 'dragend', () => { P.down = false; }); // mouseup never fires after a native drag
  on(window, 'blur', () => { P.down = false; });
  on(window, 'resize', resize);
  on(window, 'scroll', () => { P.hover = pick(document.elementFromPoint(P.x, P.y)); }, { passive: true });
  on(html, 'mouseleave', () => { root.style.opacity = 0; });
  on(html, 'mouseenter', show);
  if (window.ResizeObserver) { ro = new ResizeObserver(resize); ro.observe(root); } // scrollbar appearing/disappearing

  // ---------- footer picker ----------
  // <div data-cursor-picker hidden><label for="cursor-select">Cursor</label><select id="cursor-select"></select></div>
  // Options come from CURSORS, so adding a cursor needs no HTML change. The block stays hidden
  // unless this script is running (fine pointer, no reduced motion), so nobody sees a dead control.
  const LABELS = {
    'crosshair-pro': 'Crosshair', 'snappy-ring': 'Snappy ring', 'orbit-comet': 'Orbit comet',
    'orbit-snap': 'Orbit snap', 'dot-ring': 'Dot and ring', system: 'System cursor',
  };
  const picker = document.querySelector('[data-cursor-picker]');
  const select = picker && picker.querySelector('select');
  if (select) {
    Object.keys(CURSORS).forEach(k => select.add(new Option(LABELS[k] || k, k)));
    select.value = CFG.cursor;
    picker.hidden = false;
    on(select, 'change', () => { use(select.value); save(select.value); });
  }
  // The info tooltip opens on hover or keyboard focus (CSS). Esc closes it without moving the pointer or focus.
  const info = picker && picker.querySelector('.cursor-info');
  if (info) {
    on(document, 'keydown', e => {
      if (e.key === 'Escape' && (info.matches(':hover') || info.matches(':focus-within'))) info.setAttribute('data-dismissed', '');
    });
    ['mouseleave', 'focusout'].forEach(ev => on(info, ev, () => info.removeAttribute('data-dismissed')));
  }

  window.SiteCursor = {
    use,
    setAccent(c) {
      CFG.accent = color(c, CFG.accent);
      if (CFG.cursor === 'dot-ring') html.style.setProperty('--cursor-accent', CFG.accent);
    },
    destroy() {
      cancelAnimationFrame(raf); cur && cur.off && cur.off(); ro && ro.disconnect();
      offs.forEach(f => f()); html.classList.remove('sc-on'); root.remove(); css.remove();
      if (picker) picker.hidden = true;
      delete window.SiteCursor;
    },
  };
})();
