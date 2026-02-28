/* ═══════════════════════════════════════════════════════
   ADMIN DASHBOARD — JavaScript
   Full editor logic for all portfolio sections.
   ═══════════════════════════════════════════════════════ */

let siteContent = {};   // Full content mirror
let dirty = {};         // { sectionName: true } — marks unsaved changes

document.addEventListener('DOMContentLoaded', () => {
  // Load content passed from server
  const raw = document.getElementById('contentData')?.textContent;
  if (raw) siteContent = JSON.parse(raw);

  // Sidebar navigation
  document.querySelectorAll('.sidebar-nav a[data-section]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      switchSection(a.dataset.section);
    });
  });

  // Mobile sidebar toggle
  document.querySelector('.mobile-sidebar-toggle')?.addEventListener('click', () => {
    document.querySelector('.sidebar')?.classList.toggle('open');
  });

  // Initialise all section editors
  renderSettings();
  renderHero();
  renderAbout();
  renderTimeline();
  renderSkills();
  renderGithub();
  renderNowPlaying();
  renderProjects();
  renderContact();

  // Activate first section
  switchSection('settings');
});

// ── Navigation ─────────────────────────────────────────

function switchSection(name) {
  document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
  document.querySelector(`.sidebar-nav a[data-section="${name}"]`)?.classList.add('active');
  document.querySelectorAll('.section-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-' + name)?.classList.add('active');
  // Close mobile sidebar
  document.querySelector('.sidebar')?.classList.remove('open');
}

// ── Helpers ────────────────────────────────────────────

function markDirty(section) {
  dirty[section] = true;
  document.querySelector('.save-bar')?.classList.add('visible');
}

function toast(msg, type = 'success') {
  const container = document.querySelector('.toast-container') || createToastContainer();
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => { el.remove(); }, 3000);
}

function createToastContainer() {
  const c = document.createElement('div');
  c.className = 'toast-container';
  document.body.appendChild(c);
  return c;
}

async function saveSection(name) {
  try {
    const res = await fetch(`/api/content/${name}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(siteContent[name]),
    });
    const data = await res.json();
    if (data.ok) {
      delete dirty[name];
      if (Object.keys(dirty).length === 0) {
        document.querySelector('.save-bar')?.classList.remove('visible');
      }
      toast(`${name} saved successfully`);
    } else {
      toast(data.error || 'Save failed', 'error');
    }
  } catch (e) {
    toast('Network error', 'error');
  }
}

async function saveAllDirty() {
  const sections = Object.keys(dirty);
  for (const s of sections) await saveSection(s);
}

function confirmDelete(itemName, onConfirm) {
  if (confirm(`Delete "${itemName}"? This can't be undone.`)) {
    onConfirm();
  }
}

function inputField(label, value, onChange, opts = {}) {
  const type = opts.type || 'text';
  const group = document.createElement('div');
  group.className = 'form-group';
  const lbl = document.createElement('label');
  lbl.textContent = label;
  group.appendChild(lbl);

  if (type === 'textarea') {
    const ta = document.createElement('textarea');
    ta.className = 'form-input';
    ta.value = value || '';
    ta.rows = opts.rows || 3;
    ta.addEventListener('input', () => onChange(ta.value));
    group.appendChild(ta);
  } else {
    const inp = document.createElement('input');
    inp.type = type;
    inp.className = 'form-input';
    inp.value = value || '';
    inp.placeholder = opts.placeholder || '';
    inp.addEventListener('input', () => onChange(inp.value));
    group.appendChild(inp);
  }
  return group;
}

function saveButton(section) {
  const btn = document.createElement('button');
  btn.className = 'btn-admin btn-admin-primary';
  btn.textContent = '💾 Save ' + section.charAt(0).toUpperCase() + section.slice(1);
  btn.style.marginTop = '1rem';
  btn.addEventListener('click', () => saveSection(section));
  return btn;
}

// ── Settings ───────────────────────────────────────────

function renderSettings() {
  const panel = document.getElementById('panel-settings');
  if (!panel) return;
  panel.innerHTML = '';

  const d = siteContent.settings || {};

  const card = editorCard('⚙️ Site Settings');
  card.appendChild(inputField('Site Title', d.site_title, v => { siteContent.settings.site_title = v; markDirty('settings'); }));
  card.appendChild(inputField('Nav Logo Text', d.nav_logo, v => { siteContent.settings.nav_logo = v; markDirty('settings'); }));
  card.appendChild(inputField('Meta Description (SEO)', d.meta_description, v => { siteContent.settings.meta_description = v; markDirty('settings'); }, { type: 'textarea', rows: 2, placeholder: 'Brief description for search engines...' }));
  card.appendChild(inputField('Footer Text', d.footer, v => { siteContent.settings.footer = v; markDirty('settings'); }, { type: 'textarea', rows: 2 }));
  panel.appendChild(card);

  // Password change
  const pwCard = editorCard('🔒 Change Password');
  let newPw = '';
  pwCard.appendChild(inputField('New Password', '', v => { newPw = v; }, { type: 'password' }));
  const pwBtn = document.createElement('button');
  pwBtn.className = 'btn-admin btn-admin-outline';
  pwBtn.textContent = 'Update Password';
  pwBtn.addEventListener('click', async () => {
    if (!newPw || newPw.length < 4) return toast('Password must be ≥ 4 chars', 'error');
    const res = await fetch('/api/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ new_password: newPw }),
    });
    const data = await res.json();
    if (data.ok) toast('Password updated');
    else toast(data.error, 'error');
  });
  pwCard.appendChild(pwBtn);
  panel.appendChild(pwCard);

  // Export / Import
  const backupCard = editorCard('💾 Backup & Restore');
  const backupRow = document.createElement('div');
  backupRow.style.cssText = 'display:flex;gap:0.8rem;flex-wrap:wrap;';

  const exportBtn = document.createElement('button');
  exportBtn.className = 'btn-admin btn-admin-outline';
  exportBtn.textContent = '📥 Export JSON';
  exportBtn.addEventListener('click', () => {
    window.location.href = '/api/export';
  });
  backupRow.appendChild(exportBtn);

  const importBtn = document.createElement('button');
  importBtn.className = 'btn-admin btn-admin-outline';
  importBtn.textContent = '📤 Import JSON';
  importBtn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.addEventListener('change', async () => {
      const file = input.files[0];
      if (!file) return;
      try {
        const text = await file.text();
        const data = JSON.parse(text);
        if (!confirm(`Import backup? This will overwrite current content for ${Object.keys(data).length} sections.`)) return;
        const res = await fetch('/api/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        if (result.ok) {
          toast(`Imported ${result.imported} sections — reloading...`);
          setTimeout(() => location.reload(), 1500);
        } else {
          toast(result.error, 'error');
        }
      } catch (e) {
        toast('Invalid JSON file', 'error');
      }
    });
    input.click();
  });
  backupRow.appendChild(importBtn);
  backupCard.appendChild(backupRow);
  panel.appendChild(backupCard);

  panel.appendChild(saveButton('settings'));
}

// ── Hero ───────────────────────────────────────────────

function renderHero() {
  const panel = document.getElementById('panel-hero');
  if (!panel) return;
  panel.innerHTML = '';

  const d = siteContent.hero || {};

  const card = editorCard('🏠 Hero Section');
  card.appendChild(inputField('Tag Line', d.tag, v => { siteContent.hero.tag = v; markDirty('hero'); }));
  card.appendChild(inputField('Name Line 1', d.name_line1, v => { siteContent.hero.name_line1 = v; markDirty('hero'); }));
  card.appendChild(inputField('Name Line 2 (accent)', d.name_line2, v => { siteContent.hero.name_line2 = v; markDirty('hero'); }));
  card.appendChild(inputField('Subtitle', d.subtitle, v => { siteContent.hero.subtitle = v; markDirty('hero'); }, { type: 'textarea', rows: 2 }));

  // Typing phrases
  const phrasesCard = editorCard('⌨️ Typing Phrases');
  const phrasesList = document.createElement('div');
  phrasesList.id = 'hero-phrases-list';
  renderPhrases(phrasesList, d.typing_phrases || []);
  phrasesCard.appendChild(phrasesList);

  const addPhraseBtn = document.createElement('button');
  addPhraseBtn.className = 'add-item-btn';
  addPhraseBtn.textContent = '+ Add Phrase';
  addPhraseBtn.addEventListener('click', () => {
    siteContent.hero.typing_phrases.push('New phrase');
    markDirty('hero');
    renderPhrases(phrasesList, siteContent.hero.typing_phrases);
  });
  phrasesCard.appendChild(addPhraseBtn);
  panel.appendChild(card);
  panel.appendChild(phrasesCard);

  // CTA buttons
  const ctaCard = editorCard('🔗 Call to Action');
  const row = document.createElement('div');
  row.className = 'form-row';
  row.appendChild(inputField('Primary Text', d.cta_primary_text, v => { siteContent.hero.cta_primary_text = v; markDirty('hero'); }));
  row.appendChild(inputField('Primary Link', d.cta_primary_link, v => { siteContent.hero.cta_primary_link = v; markDirty('hero'); }));
  ctaCard.appendChild(row);
  const row2 = document.createElement('div');
  row2.className = 'form-row';
  row2.appendChild(inputField('Secondary Text', d.cta_secondary_text, v => { siteContent.hero.cta_secondary_text = v; markDirty('hero'); }));
  row2.appendChild(inputField('Secondary Link', d.cta_secondary_link, v => { siteContent.hero.cta_secondary_link = v; markDirty('hero'); }));
  ctaCard.appendChild(row2);
  panel.appendChild(ctaCard);

  panel.appendChild(saveButton('hero'));
}

function renderPhrases(container, phrases) {
  container.innerHTML = '';
  phrases.forEach((phrase, i) => {
    const item = document.createElement('div');
    item.className = 'array-item';
    const header = document.createElement('div');
    header.className = 'array-item-header';
    header.innerHTML = `<span class="item-number">Phrase ${i + 1}</span>`;
    const actions = document.createElement('div');
    actions.className = 'array-item-actions';
    const delBtn = document.createElement('button');
    delBtn.className = 'btn-icon delete';
    delBtn.textContent = '✕';
    delBtn.addEventListener('click', () => confirmDelete('phrase', () => {
      siteContent.hero.typing_phrases.splice(i, 1);
      markDirty('hero');
      renderPhrases(container, siteContent.hero.typing_phrases);
    }));
    actions.appendChild(delBtn);
    header.appendChild(actions);
    item.appendChild(header);
    item.appendChild(inputField('', phrase, v => {
      siteContent.hero.typing_phrases[i] = v;
      markDirty('hero');
    }));
    container.appendChild(item);
  });
}

// ── About ──────────────────────────────────────────────

function renderAbout() {
  const panel = document.getElementById('panel-about');
  if (!panel) return;
  panel.innerHTML = '';

  const d = siteContent.about || {};

  // Paragraphs
  const paraCard = editorCard('📝 Bio Paragraphs (HTML allowed)');
  const paraList = document.createElement('div');
  paraList.id = 'about-paras-list';
  renderArrayTextareas(paraList, d.paragraphs || [], 'about', 'paragraphs', 'Paragraph');
  paraCard.appendChild(paraList);
  const addParaBtn = document.createElement('button');
  addParaBtn.className = 'add-item-btn';
  addParaBtn.textContent = '+ Add Paragraph';
  addParaBtn.addEventListener('click', () => {
    siteContent.about.paragraphs.push('New paragraph...');
    markDirty('about');
    renderArrayTextareas(paraList, siteContent.about.paragraphs, 'about', 'paragraphs', 'Paragraph');
  });
  paraCard.appendChild(addParaBtn);
  panel.appendChild(paraCard);

  // Facts
  const factsCard = editorCard('📊 Fact Cards');
  const factsList = document.createElement('div');
  factsList.id = 'about-facts-list';
  renderFacts(factsList, d.facts || []);
  factsCard.appendChild(factsList);
  const addFactBtn = document.createElement('button');
  addFactBtn.className = 'add-item-btn';
  addFactBtn.textContent = '+ Add Fact Card';
  addFactBtn.addEventListener('click', () => {
    siteContent.about.facts.push({ emoji: '📌', label: 'Label', value: 'Value' });
    markDirty('about');
    renderFacts(factsList, siteContent.about.facts);
  });
  factsCard.appendChild(addFactBtn);
  panel.appendChild(factsCard);

  panel.appendChild(saveButton('about'));
}

function renderArrayTextareas(container, items, section, key, label) {
  container.innerHTML = '';
  items.forEach((text, i) => {
    const item = document.createElement('div');
    item.className = 'array-item';
    const header = document.createElement('div');
    header.className = 'array-item-header';
    header.innerHTML = `<span class="item-number">${label} ${i + 1}</span>`;
    const actions = document.createElement('div');
    actions.className = 'array-item-actions';
    const delBtn = document.createElement('button');
    delBtn.className = 'btn-icon delete';
    delBtn.textContent = '✕';
    delBtn.addEventListener('click', () => confirmDelete(label.toLowerCase(), () => {
      siteContent[section][key].splice(i, 1);
      markDirty(section);
      renderArrayTextareas(container, siteContent[section][key], section, key, label);
    }));
    actions.appendChild(delBtn);
    header.appendChild(actions);
    item.appendChild(header);
    item.appendChild(inputField('', text, v => {
      siteContent[section][key][i] = v;
      markDirty(section);
    }, { type: 'textarea', rows: 3 }));
    container.appendChild(item);
  });
}

function renderFacts(container, facts) {
  container.innerHTML = '';
  facts.forEach((fact, i) => {
    const item = document.createElement('div');
    item.className = 'array-item';
    const header = document.createElement('div');
    header.className = 'array-item-header';
    header.innerHTML = `<span class="item-number">Fact ${i + 1}</span>`;
    const actions = document.createElement('div');
    actions.className = 'array-item-actions';
    const delBtn = document.createElement('button');
    delBtn.className = 'btn-icon delete';
    delBtn.textContent = '✕';
    delBtn.addEventListener('click', () => confirmDelete('fact', () => {
      siteContent.about.facts.splice(i, 1);
      markDirty('about');
      renderFacts(container, siteContent.about.facts);
    }));
    actions.appendChild(delBtn);
    header.appendChild(actions);
    item.appendChild(header);
    const row = document.createElement('div');
    row.className = 'form-row-3';
    row.appendChild(inputField('Emoji', fact.emoji, v => { siteContent.about.facts[i].emoji = v; markDirty('about'); }));
    row.appendChild(inputField('Label', fact.label, v => { siteContent.about.facts[i].label = v; markDirty('about'); }));
    row.appendChild(inputField('Value', fact.value, v => { siteContent.about.facts[i].value = v; markDirty('about'); }));
    item.appendChild(row);
    container.appendChild(item);
  });
}

// ── Timeline ───────────────────────────────────────────

function renderTimeline() {
  const panel = document.getElementById('panel-timeline');
  if (!panel) return;
  panel.innerHTML = '';

  const d = siteContent.timeline || {};
  const card = editorCard('🗓️ Timeline Items');
  const list = document.createElement('div');
  list.id = 'timeline-items-list';
  renderTimelineItems(list, d.items || []);
  card.appendChild(list);

  const addBtn = document.createElement('button');
  addBtn.className = 'add-item-btn';
  addBtn.textContent = '+ Add Timeline Item';
  addBtn.addEventListener('click', () => {
    siteContent.timeline.items.push({ year: 'YEAR', title: 'Title', description: 'Description...', badge: '' });
    markDirty('timeline');
    renderTimelineItems(list, siteContent.timeline.items);
  });
  card.appendChild(addBtn);
  panel.appendChild(card);
  panel.appendChild(saveButton('timeline'));
}

function renderTimelineItems(container, items) {
  container.innerHTML = '';
  items.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'array-item';
    const header = document.createElement('div');
    header.className = 'array-item-header';
    header.innerHTML = `<span class="item-number">Event ${i + 1}</span>`;
    const actions = document.createElement('div');
    actions.className = 'array-item-actions';

    if (i > 0) {
      const upBtn = document.createElement('button');
      upBtn.className = 'btn-icon';
      upBtn.textContent = '↑';
      upBtn.addEventListener('click', () => {
        [siteContent.timeline.items[i - 1], siteContent.timeline.items[i]] = [siteContent.timeline.items[i], siteContent.timeline.items[i - 1]];
        markDirty('timeline');
        renderTimelineItems(container, siteContent.timeline.items);
      });
      actions.appendChild(upBtn);
    }
    if (i < items.length - 1) {
      const downBtn = document.createElement('button');
      downBtn.className = 'btn-icon';
      downBtn.textContent = '↓';
      downBtn.addEventListener('click', () => {
        [siteContent.timeline.items[i], siteContent.timeline.items[i + 1]] = [siteContent.timeline.items[i + 1], siteContent.timeline.items[i]];
        markDirty('timeline');
        renderTimelineItems(container, siteContent.timeline.items);
      });
      actions.appendChild(downBtn);
    }

    const delBtn = document.createElement('button');
    delBtn.className = 'btn-icon delete';
    delBtn.textContent = '✕';
    delBtn.addEventListener('click', () => confirmDelete('timeline entry', () => {
      siteContent.timeline.items.splice(i, 1);
      markDirty('timeline');
      renderTimelineItems(container, siteContent.timeline.items);
    }));
    actions.appendChild(delBtn);
    header.appendChild(actions);
    el.appendChild(header);

    el.appendChild(inputField('Year / Period', item.year, v => { siteContent.timeline.items[i].year = v; markDirty('timeline'); }));
    el.appendChild(inputField('Title', item.title, v => { siteContent.timeline.items[i].title = v; markDirty('timeline'); }));
    el.appendChild(inputField('Description', item.description, v => { siteContent.timeline.items[i].description = v; markDirty('timeline'); }, { type: 'textarea', rows: 3 }));
    el.appendChild(inputField('Badge (optional)', item.badge, v => { siteContent.timeline.items[i].badge = v; markDirty('timeline'); }));
    container.appendChild(el);
  });
}

// ── Skills ─────────────────────────────────────────────

function renderSkills() {
  const panel = document.getElementById('panel-skills');
  if (!panel) return;
  panel.innerHTML = '';

  const d = siteContent.skills || {};
  const card = editorCard('🛠️ Skills');
  const list = document.createElement('div');
  list.id = 'skills-items-list';
  renderSkillItems(list, d.items || []);
  card.appendChild(list);

  const addBtn = document.createElement('button');
  addBtn.className = 'add-item-btn';
  addBtn.textContent = '+ Add Skill';
  addBtn.addEventListener('click', () => {
    siteContent.skills.items.push({ emoji: '🔧', name: 'New Skill' });
    markDirty('skills');
    renderSkillItems(list, siteContent.skills.items);
  });
  card.appendChild(addBtn);
  panel.appendChild(card);
  panel.appendChild(saveButton('skills'));
}

function renderSkillItems(container, items) {
  container.innerHTML = '';
  items.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'array-item';
    const header = document.createElement('div');
    header.className = 'array-item-header';
    header.innerHTML = `<span class="item-number">Skill ${i + 1}</span>`;
    const actions = document.createElement('div');
    actions.className = 'array-item-actions';
    const delBtn = document.createElement('button');
    delBtn.className = 'btn-icon delete';
    delBtn.textContent = '✕';
    delBtn.addEventListener('click', () => confirmDelete('skill', () => {
      siteContent.skills.items.splice(i, 1);
      markDirty('skills');
      renderSkillItems(container, siteContent.skills.items);
    }));
    actions.appendChild(delBtn);
    header.appendChild(actions);
    el.appendChild(header);
    const row = document.createElement('div');
    row.className = 'form-row';
    row.appendChild(inputField('Emoji', item.emoji, v => { siteContent.skills.items[i].emoji = v; markDirty('skills'); }));
    row.appendChild(inputField('Name', item.name, v => { siteContent.skills.items[i].name = v; markDirty('skills'); }));
    el.appendChild(row);
    container.appendChild(el);
  });
}

// ── GitHub ─────────────────────────────────────────────

function renderGithub() {
  const panel = document.getElementById('panel-github');
  if (!panel) return;
  panel.innerHTML = '';

  const d = siteContent.github || {};
  const card = editorCard('🐙 GitHub Settings');
  card.appendChild(inputField('GitHub Username', d.username, v => { siteContent.github.username = v; markDirty('github'); }));

  const toggleRow = document.createElement('div');
  toggleRow.className = 'toggle-row';
  const toggleLabel = document.createElement('span');
  toggleLabel.textContent = 'Show Stats on Public Site';
  toggleLabel.style.fontSize = '0.88rem';
  const toggle = document.createElement('div');
  toggle.className = 'toggle' + (d.show_stats ? ' on' : '');
  toggle.addEventListener('click', () => {
    siteContent.github.show_stats = !siteContent.github.show_stats;
    toggle.classList.toggle('on');
    markDirty('github');
  });
  toggleRow.appendChild(toggleLabel);
  toggleRow.appendChild(toggle);
  card.appendChild(toggleRow);
  panel.appendChild(card);
  panel.appendChild(saveButton('github'));
}

// ── Now Playing ────────────────────────────────────────

function renderNowPlaying() {
  const panel = document.getElementById('panel-nowplaying');
  if (!panel) return;
  panel.innerHTML = '';

  const d = siteContent.nowplaying || {};
  const card = editorCard('🎵 Now Playing');
  card.appendChild(inputField('Track Name', d.track, v => { siteContent.nowplaying.track = v; markDirty('nowplaying'); }));
  card.appendChild(inputField('Artist / Subtitle', d.artist, v => { siteContent.nowplaying.artist = v; markDirty('nowplaying'); }));
  card.appendChild(inputField('Note', d.note, v => { siteContent.nowplaying.note = v; markDirty('nowplaying'); }, { type: 'textarea', rows: 2 }));
  panel.appendChild(card);
  panel.appendChild(saveButton('nowplaying'));
}

// ── Projects ───────────────────────────────────────────

function renderProjects() {
  const panel = document.getElementById('panel-projects');
  if (!panel) return;
  panel.innerHTML = '';

  const d = siteContent.projects || {};
  const card = editorCard('🚀 Projects');
  const list = document.createElement('div');
  list.id = 'projects-items-list';
  renderProjectItems(list, d.items || []);
  card.appendChild(list);

  const addBtn = document.createElement('button');
  addBtn.className = 'add-item-btn';
  addBtn.textContent = '+ Add Project';
  addBtn.addEventListener('click', () => {
    siteContent.projects.items.push({
      emoji: '📦', title: 'New Project', description: 'Description...',
      tags: [], links: [], featured: false,
    });
    markDirty('projects');
    renderProjectItems(list, siteContent.projects.items);
  });
  card.appendChild(addBtn);
  panel.appendChild(card);
  panel.appendChild(saveButton('projects'));
}

function renderProjectItems(container, items) {
  container.innerHTML = '';
  items.forEach((proj, i) => {
    const el = document.createElement('div');
    el.className = 'array-item';
    const header = document.createElement('div');
    header.className = 'array-item-header';
    header.innerHTML = `<span class="item-number">Project ${i + 1}</span>`;
    const actions = document.createElement('div');
    actions.className = 'array-item-actions';
    const delBtn = document.createElement('button');
    delBtn.className = 'btn-icon delete';
    delBtn.textContent = '✕';
    delBtn.addEventListener('click', () => confirmDelete('project', () => {
      siteContent.projects.items.splice(i, 1);
      markDirty('projects');
      renderProjectItems(container, siteContent.projects.items);
    }));
    actions.appendChild(delBtn);
    header.appendChild(actions);
    el.appendChild(header);

    const row1 = document.createElement('div');
    row1.className = 'form-row';
    row1.appendChild(inputField('Emoji', proj.emoji, v => { siteContent.projects.items[i].emoji = v; markDirty('projects'); }));
    row1.appendChild(inputField('Title', proj.title, v => { siteContent.projects.items[i].title = v; markDirty('projects'); }));
    el.appendChild(row1);

    el.appendChild(inputField('Description', proj.description, v => { siteContent.projects.items[i].description = v; markDirty('projects'); }, { type: 'textarea', rows: 3 }));

    // Featured toggle
    const toggleRow = document.createElement('div');
    toggleRow.className = 'toggle-row';
    const toggleLabel = document.createElement('span');
    toggleLabel.textContent = 'Featured';
    toggleLabel.style.fontSize = '0.85rem';
    const toggle = document.createElement('div');
    toggle.className = 'toggle' + (proj.featured ? ' on' : '');
    toggle.addEventListener('click', () => {
      siteContent.projects.items[i].featured = !siteContent.projects.items[i].featured;
      toggle.classList.toggle('on');
      markDirty('projects');
    });
    toggleRow.appendChild(toggleLabel);
    toggleRow.appendChild(toggle);
    el.appendChild(toggleRow);

    // Tags
    el.appendChild(renderTagsEditor(proj.tags || [], i));

    // Links
    const linksSection = document.createElement('div');
    linksSection.style.marginTop = '0.8rem';
    const linksLabel = document.createElement('label');
    linksLabel.style.cssText = 'display:block;font-size:0.78rem;font-weight:600;color:var(--a-muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.4rem;';
    linksLabel.textContent = 'Links';
    linksSection.appendChild(linksLabel);
    const linksList = document.createElement('div');
    renderProjectLinks(linksList, proj.links || [], i);
    linksSection.appendChild(linksList);
    const addLinkBtn = document.createElement('button');
    addLinkBtn.className = 'add-item-btn';
    addLinkBtn.style.marginTop = '0.4rem';
    addLinkBtn.textContent = '+ Add Link';
    addLinkBtn.addEventListener('click', () => {
      if (!siteContent.projects.items[i].links) siteContent.projects.items[i].links = [];
      siteContent.projects.items[i].links.push({ label: 'Link →', url: 'https://' });
      markDirty('projects');
      renderProjectLinks(linksList, siteContent.projects.items[i].links, i);
    });
    linksSection.appendChild(addLinkBtn);
    el.appendChild(linksSection);

    container.appendChild(el);
  });
}

function renderTagsEditor(tags, projectIdx) {
  const wrapper = document.createElement('div');
  wrapper.style.marginTop = '0.5rem';
  const label = document.createElement('label');
  label.style.cssText = 'display:block;font-size:0.78rem;font-weight:600;color:var(--a-muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.4rem;';
  label.textContent = 'Tags';
  wrapper.appendChild(label);

  const tagsDiv = document.createElement('div');
  tagsDiv.className = 'tags-editor';
  tags.forEach((tag, ti) => {
    const chip = document.createElement('span');
    chip.className = 'tag-chip';
    chip.textContent = tag + ' ';
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '✕';
    removeBtn.addEventListener('click', () => {
      siteContent.projects.items[projectIdx].tags.splice(ti, 1);
      markDirty('projects');
      wrapper.replaceWith(renderTagsEditor(siteContent.projects.items[projectIdx].tags, projectIdx));
    });
    chip.appendChild(removeBtn);
    tagsDiv.appendChild(chip);
  });
  wrapper.appendChild(tagsDiv);

  const addRow = document.createElement('div');
  addRow.style.display = 'flex';
  addRow.style.gap = '0.4rem';
  const tagInput = document.createElement('input');
  tagInput.className = 'form-input';
  tagInput.placeholder = 'Add tag...';
  tagInput.style.fontSize = '0.82rem';
  const addTagBtn = document.createElement('button');
  addTagBtn.className = 'btn-admin btn-admin-outline';
  addTagBtn.textContent = '+';
  addTagBtn.style.padding = '0.4rem 0.8rem';
  const addTag = () => {
    const v = tagInput.value.trim();
    if (!v) return;
    if (!siteContent.projects.items[projectIdx].tags) siteContent.projects.items[projectIdx].tags = [];
    siteContent.projects.items[projectIdx].tags.push(v);
    markDirty('projects');
    wrapper.replaceWith(renderTagsEditor(siteContent.projects.items[projectIdx].tags, projectIdx));
  };
  addTagBtn.addEventListener('click', addTag);
  tagInput.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } });
  addRow.appendChild(tagInput);
  addRow.appendChild(addTagBtn);
  wrapper.appendChild(addRow);

  return wrapper;
}

function renderProjectLinks(container, links, projectIdx) {
  container.innerHTML = '';
  links.forEach((link, li) => {
    const row = document.createElement('div');
    row.className = 'form-row';
    row.style.marginBottom = '0.4rem';
    row.appendChild(inputField('Label', link.label, v => { siteContent.projects.items[projectIdx].links[li].label = v; markDirty('projects'); }));
    row.appendChild(inputField('URL', link.url, v => { siteContent.projects.items[projectIdx].links[li].url = v; markDirty('projects'); }));

    const delBtn = document.createElement('button');
    delBtn.className = 'btn-icon delete';
    delBtn.textContent = '✕';
    delBtn.style.alignSelf = 'end';
    delBtn.style.marginBottom = '1.2rem';
    delBtn.addEventListener('click', () => confirmDelete('link', () => {
      siteContent.projects.items[projectIdx].links.splice(li, 1);
      markDirty('projects');
      renderProjectLinks(container, siteContent.projects.items[projectIdx].links, projectIdx);
    }));
    row.appendChild(delBtn);
    container.appendChild(row);
  });
}

// ── Contact ────────────────────────────────────────────

function renderContact() {
  const panel = document.getElementById('panel-contact');
  if (!panel) return;
  panel.innerHTML = '';

  const d = siteContent.contact || {};
  const card = editorCard('📬 Contact Info');
  card.appendChild(inputField('Tagline', d.tagline, v => { siteContent.contact.tagline = v; markDirty('contact'); }, { type: 'textarea', rows: 2 }));
  card.appendChild(inputField('Email', d.email, v => { siteContent.contact.email = v; markDirty('contact'); }));
  panel.appendChild(card);

  // Social links
  const socialCard = editorCard('🔗 Social Links');
  const socialList = document.createElement('div');
  socialList.id = 'contact-socials-list';
  renderSocials(socialList, d.socials || []);
  socialCard.appendChild(socialList);
  const addSocialBtn = document.createElement('button');
  addSocialBtn.className = 'add-item-btn';
  addSocialBtn.textContent = '+ Add Social Link';
  addSocialBtn.addEventListener('click', () => {
    if (!siteContent.contact.socials) siteContent.contact.socials = [];
    siteContent.contact.socials.push({ platform: 'website', label: '🌐 My Site', url: 'https://' });
    markDirty('contact');
    renderSocials(socialList, siteContent.contact.socials);
  });
  socialCard.appendChild(addSocialBtn);
  panel.appendChild(socialCard);
  panel.appendChild(saveButton('contact'));
}

function renderSocials(container, socials) {
  container.innerHTML = '';
  socials.forEach((social, i) => {
    const el = document.createElement('div');
    el.className = 'array-item';
    const header = document.createElement('div');
    header.className = 'array-item-header';
    header.innerHTML = `<span class="item-number">Link ${i + 1}</span>`;
    const actions = document.createElement('div');
    actions.className = 'array-item-actions';
    const delBtn = document.createElement('button');
    delBtn.className = 'btn-icon delete';
    delBtn.textContent = '✕';
    delBtn.addEventListener('click', () => confirmDelete('social link', () => {
      siteContent.contact.socials.splice(i, 1);
      markDirty('contact');
      renderSocials(container, siteContent.contact.socials);
    }));
    actions.appendChild(delBtn);
    header.appendChild(actions);
    el.appendChild(header);

    const row = document.createElement('div');
    row.className = 'form-row-3';
    row.appendChild(inputField('Platform', social.platform, v => { siteContent.contact.socials[i].platform = v; markDirty('contact'); }));
    row.appendChild(inputField('Label', social.label, v => { siteContent.contact.socials[i].label = v; markDirty('contact'); }));
    row.appendChild(inputField('URL', social.url, v => { siteContent.contact.socials[i].url = v; markDirty('contact'); }));
    el.appendChild(row);
    container.appendChild(el);
  });
}

// ── Utility ────────────────────────────────────────────

function editorCard(title) {
  const card = document.createElement('div');
  card.className = 'editor-card';
  const heading = document.createElement('div');
  heading.className = 'editor-card-title';
  heading.textContent = title;
  card.appendChild(heading);
  return card;
}
