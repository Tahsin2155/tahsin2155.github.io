// Mark JS as available — CSS uses this so .reveal content is never hidden when JS is off
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();
});

// Custom cursor (fine-pointer devices only; the elements are display:none otherwise)
(function () {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!cursor || !ring) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let mx = 0, my = 0, rx = 0, ry = 0;
  let hasEntered = false;
  let clickTimer;

  root.classList.add('cursor-ready');

  function setPosition(x, y) {
    mx = x;
    my = y;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
    if (reduceMotion) {
      rx = mx;
      ry = my;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
    }
  }

  function setVisible(visible) {
    hasEntered = visible;
    cursor.classList.toggle('is-visible', visible);
    ring.classList.toggle('is-visible', visible);
  }

  function setHovering(target) {
    const interactive = target instanceof Element
      ? target.closest('a, button, input, textarea, select, [role="button"]')
      : null;
    const hovering = Boolean(interactive);
    cursor.classList.toggle('is-hovering', hovering);
    ring.classList.toggle('is-hovering', hovering);
  }

  document.addEventListener('pointermove', e => {
    setPosition(e.clientX, e.clientY);
    if (!hasEntered) setVisible(true);
    setHovering(e.target);
  });
  document.addEventListener('pointerdown', () => {
    cursor.classList.add('is-clicking');
    ring.classList.add('is-clicking');
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
      cursor.classList.remove('is-clicking');
      ring.classList.remove('is-clicking');
    }, 160);
  });
  document.addEventListener('pointerleave', () => setVisible(false));
  document.addEventListener('pointerenter', e => {
    setPosition(e.clientX, e.clientY);
    setVisible(true);
  });

  (function animateRing() {
    if (!reduceMotion) {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
    }
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  })();
})();

// Mobile menu
(function () {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;
  function setOpen(open) {
    hamburger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  }
  hamburger.addEventListener('click', () => setOpen(!mobileMenu.classList.contains('open')));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
})();

// Typing effect (home page only)
(function () {
  const el = document.getElementById('typedText');
  if (!el) return;
  const phrases = ['Python Developer', 'Aspiring Engineer', 'Hackathon Team Lead'];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) { el.textContent = phrases[0]; return; }
  let pi = 0, ci = 0, deleting = false;
  function type() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { setTimeout(() => { deleting = true; type(); }, 1800); }
      else setTimeout(type, 65);
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 400); }
      else setTimeout(type, 35);
    }
  }
  type();
})();

// Scroll reveal
(function () {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 70);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => obs.observe(el));
})();

// GitHub stats (home page only) — cached in sessionStorage for 10 minutes to avoid
// hitting the unauthenticated GitHub API's 60 req/hour limit on every page load
(function () {
  const ids = ['gh-repos', 'gh-stars', 'gh-followers', 'gh-latestrepo'];
  if (!document.getElementById('gh-repos')) return;

  function apply(result) {
    document.getElementById('gh-repos').textContent = result.repos;
    document.getElementById('gh-followers').textContent = result.followers;
    document.getElementById('gh-stars').textContent = result.stars;
    document.getElementById('gh-latestrepo').textContent = result.latestRepo;
    ids.forEach(id => document.getElementById(id).classList.remove('gh-loading'));
  }

  async function load() {
    const CACHE_KEY = 'gh-stats-cache';
    const CACHE_TTL = 10 * 60 * 1000;
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, ts } = JSON.parse(cached);
        if (Date.now() - ts < CACHE_TTL) { apply(data); return; }
      }
    } catch (e) { /* storage unavailable or corrupt cache — fall through to fetch */ }

    try {
      const res = await fetch('https://api.github.com/users/Tahsin2155');
      if (!res.ok) throw new Error('GitHub API returned ' + res.status);
      const data = await res.json();
      const reposRes = await fetch('https://api.github.com/users/Tahsin2155/repos?per_page=100');
      if (!reposRes.ok) throw new Error('GitHub API returned ' + reposRes.status);
      const repos = await reposRes.json();
      const stars = Array.isArray(repos) ? repos.reduce((a, r) => a + (r.stargazers_count || 0), 0) : '—';
      let latestRepo = '—';
      if (Array.isArray(repos) && repos.length) {
        latestRepo = [...repos].sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))[0].name;
      }
      const result = { repos: data.public_repos ?? '—', followers: data.followers ?? '—', stars, latestRepo };
      apply(result);
      try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: result, ts: Date.now() })); } catch (e) { /* non-fatal */ }
    } catch (e) {
      ids.forEach(id => {
        const el = document.getElementById(id);
        el.textContent = '—';
        el.classList.remove('gh-loading');
      });
    }
  }
  load();
})();

// Timeline: show only the newest few entries, with a toggle for the rest.
// Without JS (or with <= visible entries) everything simply stays visible.
(function () {
  const list = document.getElementById('timelineList');
  const btn = document.getElementById('timelineToggle');
  if (!list || !btn) return;
  const visible = parseInt(list.dataset.visible, 10) || 3;
  const items = Array.from(list.querySelectorAll('.tl-item'));
  if (items.length <= visible) return;

  const label = btn.querySelector('.timeline-toggle-label');
  const count = document.getElementById('timelineCount');
  const hiddenCount = items.length - visible;

  function setExpanded(expanded, moveFocus) {
    items.forEach((el, i) => {
      const fold = !expanded && i >= visible;
      el.classList.toggle('is-folded', fold);
      // items revealed by the toggle should not wait for a scroll observer
      if (!fold) el.classList.add('visible');
    });
    list.classList.toggle('is-collapsed', !expanded);
    btn.setAttribute('aria-expanded', String(expanded));
    label.textContent = expanded ? 'Hide full timeline' : 'Show full timeline';
    count.textContent = expanded ? '' : '+' + hiddenCount + ' earlier';
    // when collapsing from far down the page, bring the timeline back into view
    if (!expanded && moveFocus) {
      const top = list.getBoundingClientRect().top;
      if (top < 0) list.scrollIntoView({ block: 'start' });
    }
  }

  btn.hidden = false;
  setExpanded(false, false);
  btn.addEventListener('click', () => setExpanded(btn.getAttribute('aria-expanded') !== 'true', true));
})();

// Home page projects: show only the first row of cards, faded out at the bottom, because the
// "See all projects" link right below leads to the rest. Cards per row follow the CSS grid,
// so the count is re-read on resize. Without JS every card stays visible.
(function () {
  const grid = document.querySelector('#projects .projects-grid');
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll('.project-card'));

  function fold() {
    const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
    cards.forEach((el, i) => {
      const hide = i >= cols;
      // a card revealed by a wider layout should not wait for a scroll observer
      if (!hide && el.classList.contains('is-folded')) el.classList.add('visible');
      el.classList.toggle('is-folded', hide);
    });
    grid.classList.toggle('is-collapsed', cards.length > cols);
  }

  let frame;
  fold();
  window.addEventListener('resize', () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(fold);
  });
})();
