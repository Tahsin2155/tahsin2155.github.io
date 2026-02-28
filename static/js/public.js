/* ═══════════════════════════════════════════════════════
   PUBLIC PORTFOLIO — JavaScript
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Dark Mode ────────────────────────────────────────
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon();
    });
  }

  function updateThemeIcon() {
    if (!themeToggle) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeToggle.textContent = isDark ? '☀️' : '🌙';
  }

  // ── Custom Cursor ────────────────────────────────────
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  // Disable custom cursor on touch devices
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) {
    document.body.style.cursor = 'auto';
    if (cursor) cursor.style.display = 'none';
    if (ring) ring.style.display = 'none';
  } else if (cursor && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });
    (function animateRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animateRing);
    })();
  }

  // ── Hamburger Menu ───────────────────────────────────
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
  }
  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      mobileMenu?.classList.remove('open');
    });
  });

  // ── Typing Effect ────────────────────────────────────
  const typedEl = document.getElementById('typedText');
  if (typedEl) {
    const raw = typedEl.getAttribute('data-phrases');
    const phrases = raw ? JSON.parse(raw) : [];
    if (phrases.length) {
      let pi = 0, ci = 0, deleting = false;
      function type() {
        const phrase = phrases[pi];
        if (!deleting) {
          typedEl.textContent = phrase.slice(0, ++ci);
          if (ci === phrase.length) {
            setTimeout(() => { deleting = true; }, 1800);
            setTimeout(type, 100);
          } else {
            setTimeout(type, 65);
          }
        } else {
          typedEl.textContent = phrase.slice(0, --ci);
          if (ci === 0) {
            deleting = false;
            pi = (pi + 1) % phrases.length;
            setTimeout(type, 400);
          } else {
            setTimeout(type, 35);
          }
        }
      }
      type();
    }
  }

  // ── Scroll Reveal ────────────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 70);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => obs.observe(el));

  // ── Scroll Progress Bar ──────────────────────────────
  const progressBar = document.getElementById('scroll-progress');
  const backToTop   = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = progress + '%';

    // Back to top visibility
    if (backToTop) {
      backToTop.classList.toggle('visible', scrollTop > 500);
    }
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Active Nav Link on Scroll ────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => sectionObs.observe(s));

  // ── GitHub Stats ─────────────────────────────────────
  const ghUsername = document.getElementById('ghStats')?.dataset.username;
  if (ghUsername) {
    loadGHStats(ghUsername);
  }
});

async function loadGHStats(username) {
  try {
    const res  = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    setText('gh-repos', data.public_repos ?? '—');
    setText('gh-followers', data.followers ?? '—');

    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const repos    = await reposRes.json();
    const stars    = Array.isArray(repos)
      ? repos.reduce((a, r) => a + (r.stargazers_count || 0), 0)
      : '—';
    setText('gh-stars', stars);

    ['gh-repos', 'gh-stars', 'gh-followers'].forEach(id => {
      document.getElementById(id)?.classList.remove('gh-loading');
    });
  } catch {
    ['gh-repos', 'gh-stars', 'gh-followers'].forEach(id => setText(id, '—'));
  }
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
