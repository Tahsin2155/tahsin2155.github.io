#!/usr/bin/env python3
"""Generates the static portfolio pages so nav/footer/head stay identical everywhere.
Output goes to ./site. Run: python3 build.py"""
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = "https://tahsin2155.github.io"
SITE_NAME = "Tahsin Ali Abtahi"
YEAR = 2026

# ---------------------------------------------------------------- shared partials
NAV_ITEMS = [
    ("home", "Home", "index.html"),
    ("about", "About", "about.html"),
    ("projects", "Projects", "projects/"),
    ("contact", "Contact", "#contact"),  # every content page has a #contact section, so scroll in place
]


def rel(depth: int) -> str:
    """Relative prefix back to site root from a page `depth` folders deep."""
    return "../" * depth


def nav_html(active: str, depth: int) -> str:
    p = rel(depth)
    links = []
    for key, label, href in NAV_ITEMS:
        cur = ' aria-current="page"' if key == active else ""
        # in-page anchors must not get the relative "../" prefix
        target = href if href.startswith("#") else f"{p}{href}"
        links.append(f'<a href="{target}"{cur}>{label}</a>')
    desktop = "\n    ".join(links)
    mobile = "\n  ".join(links)
    return f"""<a class="skip-link" href="#main">Skip to content</a>
<nav aria-label="Main">
  <a class="nav-logo" href="{p}index.html">tahsin2155.github.io</a>
  <div class="nav-links">
    {desktop}
  </div>
  <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobileMenu" type="button">
    <span></span><span></span><span></span>
  </button>
</nav>
<div class="mobile-menu" id="mobileMenu">
  {mobile}
</div>"""


def head_html(title, desc, path, depth, og_type="website", extra_ld=""):
    p = rel(depth)
    url = f"{BASE}/{path}"
    full_title = title if title.startswith(SITE_NAME) else f"{title} — {SITE_NAME}"
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>{full_title}</title>
<meta name="description" content="{desc}"/>
<meta property="og:title" content="{full_title}"/>
<meta property="og:description" content="{desc}"/>
<meta property="og:type" content="{og_type}"/>
<meta property="og:url" content="{url}"/>
<meta property="og:image" content="{BASE}/og-image.png"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="{full_title}"/>
<meta name="twitter:description" content="{desc}"/>
<meta name="twitter:image" content="{BASE}/og-image.png"/>
<link rel="canonical" href="{url}"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link rel="preconnect" href="https://cdn.simpleicons.org"/>
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='16' fill='%232563eb'/><text x='50' y='78' text-anchor='middle' font-family='Sora,system-ui,sans-serif' font-size='80' font-weight='600' fill='%23ffffff'>t</text></svg>">
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,400&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="{p}assets/css/style.css"/>{extra_ld}
</head>"""


PERSON_LD = """
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Tahsin Ali Abtahi",
  "url": "https://tahsin2155.github.io/",
  "image": "https://tahsin2155.github.io/og-image.png",
  "jobTitle": "Student, Python Developer",
  "description": "Python developer and aspiring engineer, currently a 12th standard Science stream student building practical apps and learning through side projects.",
  "sameAs": [
    "https://www.linkedin.com/in/tahsinaliabtahi/",
    "https://github.com/Tahsin2155",
    "https://www.instagram.com/tahsin_2155"
  ],
  "knowsAbout": ["Python", "HTML", "CSS", "Streamlit", "Flask", "Git", "GitHub"]
}
</script>"""


def body_open() -> str:
    return '<body>\n\n<div id="cursor"></div>\n<div id="cursor-ring"></div>\n'


def footer_html(depth: int) -> str:
    p = rel(depth)
    return f"""<footer>© {YEAR} {SITE_NAME}</footer>

<script src="https://unpkg.com/lucide@0.469.0/dist/umd/lucide.min.js"></script>
<script src="{p}assets/js/main.js"></script>
</body>
</html>
"""


CONTACT_INNER = """  <div class="reveal">
    <p class="section-label">// let's connect</p>
    <h2 class="section-title">Get in Touch</h2>
  </div>
  <p class="contact-sub reveal">I'd love to connect with mentors, fellow builders, or anyone curious about the same things I am — always up for a good conversation or a collaboration on something interesting. (Still in high school, so I'm not looking for internships or paid work right now — just good people and good ideas.)</p>
  <div class="contact-links reveal">
    <a href="mailto:tahsindlg@gmail.com" class="contact-link email"><span data-lucide="mail"></span> tahsindlg@gmail.com</a>
    <a href="https://www.linkedin.com/in/tahsinaliabtahi/" target="_blank" rel="noopener noreferrer" class="contact-link linkedin"><img loading="lazy" src="{p}InBug-White.png" alt="" width="16" height="16"> LinkedIn</a>
    <a href="https://www.instagram.com/tahsin_2155" target="_blank" rel="noopener noreferrer" class="contact-link instagram"><img loading="lazy" src="https://cdn.simpleicons.org/instagram/ffffff" alt="" width="16" height="16"> @tahsin_2155</a>
    <a href="https://github.com/Tahsin2155" target="_blank" rel="noopener noreferrer" class="contact-link github-link"><img loading="lazy" src="https://cdn.simpleicons.org/github/ffffff" alt="" width="16" height="16"> Tahsin2155</a>
  </div>"""


def contact_section(depth: int, section_id="contact") -> str:
    inner = CONTACT_INNER.replace("{p}", rel(depth))
    return f'<section id="{section_id}">\n{inner}\n</section>'


# ---------------------------------------------------------------- project data
PROJECTS = [
    {
        "slug": "daymark",
        "title": "DayMark",
        "icon": "https://github.com/Tahsin2155/DayMark/blob/main/assets/logo.png?raw=1",
        "icon_alt": "DayMark logo",
        "short": "A personal productivity web app built entirely with Python & Streamlit. Track your days, mark milestones, and stay organised — all in a clean, minimal interface.",
        "tags": ["Python", "Streamlit", "Productivity"],
        "live": "https://daymark.streamlit.app",
        "repo": "https://github.com/Tahsin2155/DayMark",
        "status": "Live",
        "stack": "Python, Streamlit",
        "when": "Mid 11th standard",
        "summary": "A personal productivity web app for tracking days and marking milestones, built with Python and Streamlit.",
        "sections": [
            ("What it is", [
                "<p>DayMark is a personal productivity web app. You use it to track your days, mark milestones, and keep things organised in a clean, minimal interface.</p>",
                "<p>It is live at <strong>daymark.streamlit.app</strong> and was my first project shipped to the public.</p>",
            ]),
            ("Why I built it", [
                "<p>After finishing Python properly in 11th standard, I found Streamlit and realised I could build a real web app using only Python. DayMark was the project I used to test that idea end to end: design it, build it, and deploy it.</p>",
            ]),
            ("How it's built", [
                "<ul><li><strong>Language:</strong> Python</li><li><strong>Framework:</strong> Streamlit, which handles the UI and hosting</li><li><strong>Source:</strong> public on GitHub, so you can read how it works</li></ul>",
            ]),
            ("What I learned", [
                "<p>Shipping something other people can open is different from writing code that runs on your own machine. Deploying DayMark taught me about dependencies, app state, and keeping a UI simple enough to actually use.</p>",
            ]),
        ],
    },
    {
        "slug": "markdstudio",
        "title": "MarkdStudio",
        "icon": "https://markdstudio.netlify.app/assets/favicon-48.png",
        "icon_alt": "MarkdStudio icon",
        "short": "A markdown editor and writing app focused on clean writing flow and simple formatting. Built for drafting, editing, and shipping content faster.",
        "tags": ["Markdown", "Editor", "Writing"],
        "live": "https://markdstudio.netlify.app",
        "repo": "https://github.com/Tahsin2155/markdstudio",
        "status": "Live",
        "stack": "HTML, CSS, JavaScript",
        "when": "11th–12th standard",
        "summary": "A markdown editor and writing app focused on clean writing flow and simple formatting.",
        "sections": [
            ("What it is", [
                "<p>MarkdStudio is a markdown editor and writing app. It is built around a clean writing flow and simple formatting, so drafting and editing feel quick.</p>",
                "<p>It is live at <strong>markdstudio.netlify.app</strong>.</p>",
            ]),
            ("Why I built it", [
                "<p>I wanted a writing tool that stays out of the way. Many editors do a lot more than I need, so I built one around the things I actually use when I write and format notes.</p>",
            ]),
            ("How it's built", [
                "<ul><li><strong>Front end:</strong> a web app hosted on Netlify</li><li><strong>Source:</strong> public on GitHub</li></ul>",
                "<p>Add the specific technical details here: how the preview renders, how documents are saved, and anything else you want to explain.</p>",
            ]),
            ("What I learned", [
                "<p>Working on an editor showed me how many small details (cursor behaviour, keyboard shortcuts, live preview) decide whether a writing tool feels good to use.</p>",
            ]),
        ],
    },
    {
        "slug": "velin",
        "title": "Velin",
        "icon": "https://newvelintab.netlify.app/favicon-light.svg",
        "icon_alt": "Velin icon",
        "short": "A custom new tab page designed to make your browser start cleaner and more useful. It is live right now and actively in development.",
        "tags": ["New Tab", "Productivity", "In Development"],
        "live": "https://newvelintab.netlify.app",
        "repo": None,
        "status": "Live, in development",
        "stack": "HTML, CSS, JavaScript",
        "when": "12th standard",
        "summary": "A custom browser new tab page built to make starting the browser cleaner and more useful.",
        "sections": [
            ("What it is", [
                "<p>Velin is a custom new tab page. It replaces the default browser start page with something cleaner and more useful.</p>",
                "<p>It is live at <strong>newvelintab.netlify.app</strong> and still in active development.</p>",
            ]),
            ("Why I built it", [
                "<p>The new tab page is the first thing I see every time I open a tab, so I wanted it to be something I would actually enjoy using.</p>",
            ]),
            ("How it's built", [
                "<ul><li><strong>Front end:</strong> a web page hosted on Netlify</li><li><strong>Status:</strong> in development, so features change often</li></ul>",
                "<p>Add the specific technical details here: how settings and data are stored, and what is planned next.</p>",
            ]),
            ("What I learned", [
                "<p>Because Velin is something I use daily, I notice problems fast. That has taught me to fix small annoyances instead of ignoring them.</p>",
            ]),
        ],
    },
    {
        "slug": "handoff",
        "title": "Handoff",
        "icon": None,
        "icon_lucide": "mouse-pointer-click",
        "icon_alt": "",
        "short": "A prototype desktop automation agent. You give it a task in plain language, and it looks at the screen, decides what to do, and operates the mouse and keyboard on Windows.",
        "tags": ["Python", "Gemini", "PyAutoGUI", "Prototype"],
        "live": None,
        "repo": "https://github.com/Tahsin2155/handoff",
        "status": "Prototype, Windows only",
        "stack": "Python, Gemini computer-use API, PyAutoGUI",
        "when": "September 2026",
        "summary": "A prototype agent that operates a Windows PC from a plain-language task, using a Gemini computer-use model and PyAutoGUI.",
        "draft_source": "the project's public README on GitHub",
        "sections": [
            ("What it is", [
                "<p>Handoff is a prototype desktop automation agent. You type a task such as \"open the browser and search for the latest Python release\", and Handoff carries it out by looking at the screen and using the mouse and keyboard, the way a person would.</p>",
                "<p>It is an early prototype and runs on <strong>Windows only</strong> for now. It is not a finished product, and there is no live demo.</p>",
            ]),
            ("How it works", [
                "<p>Handoff runs a repeating loop: <strong>see, decide, act, see again</strong>.</p>",
                "<ul><li>It captures a screenshot of the screen.</li><li>It sends the screenshot and the task to a Gemini model that supports computer use, through the Interactions API.</li><li>The model replies with the next action, such as a click, a scroll, or some typing.</li><li>Handoff carries out that action with PyAutoGUI, then captures a new screenshot and repeats until the model says the task is finished.</li></ul>",
                "<p>The model returns coordinates on a normalized 0 to 999 scale. Handoff converts those to real pixels using the current screen size, so the same output works at any resolution.</p>",
            ]),
            ("How it's organised", [
                "<p>The code is split into three responsibilities, so each part can be changed without rewriting the others:</p>",
                "<ul><li><strong>Vision:</strong> screen capture and image encoding.</li><li><strong>Reasoning:</strong> the Gemini computer-use model.</li><li><strong>Execution:</strong> <code>hands.py</code>, which maps the model's function calls to mouse and keyboard actions through a single dispatch table.</li></ul>",
                "<p><code>main.py</code> ties these together and keeps the conversation state between turns.</p>",
            ]),
            ("Safety and debugging", [
                "<p>Handoff does not run every action blindly. When the model flags an action as needing confirmation, Handoff plays an alert sound and waits: <strong>Shift</strong> approves and <strong>Ctrl</strong> denies. Actions marked as blocked are rejected automatically.</p>",
                "<p>The repository is clear that this is a simple prototype safety mechanism and <strong>not a complete security boundary</strong>.</p>",
                "<p>Every run also writes a Markdown log of the task and the model's responses, which makes it easier to tell whether a failure came from the model or from my code.</p>",
            ]),
            ("Limits and next steps", [
                "<ul><li>It only works on Windows, because it uses the <code>winsound</code> module for alerts.</li><li>It works through the graphical interface, so results depend on screen layout, timing, and how accurate the model is.</li><li>Planned work includes cross-platform support, sturdier safety checks, better error recovery, and more reliable long tasks.</li></ul>",
            ]),
        ],
    },
]


def project_icon(p: dict) -> str:
    """Project image if it has one, otherwise a Lucide icon."""
    if p.get("icon"):
        return f'<img loading="lazy" src="{p["icon"]}" alt="{p["icon_alt"]}" width="40" height="40">'
    return f'<span class="project-glyph" aria-hidden="true"><i data-lucide="{p["icon_lucide"]}"></i></span>'


def live_link(p: dict, label: str) -> str:
    """Live-app link, or nothing for projects that have no live version."""
    if not p.get("live"):
        return ""
    return f'<a href="{p["live"]}" target="_blank" rel="noopener noreferrer" class="project-link">{label}</a>'


def project_card(p: dict, depth: int) -> str:
    base = rel(depth)
    tags = "\n        ".join(f'<span class="project-tag">{t}</span>' for t in p["tags"])
    repo = f'\n        <a href="{p["repo"]}" target="_blank" rel="noopener noreferrer" class="project-link">GitHub repo →</a>' if p["repo"] else ""
    live = f'\n        {live_link(p, "Live app →")}' if p.get("live") else ""
    return f"""    <article class="project-card reveal project-featured">
      <div class="project-emoji">{project_icon(p)}</div>
      <h3 class="project-title">{p['title']}</h3>
      <p class="project-desc">{p['short']}</p>
      <div class="project-tags">
        {tags}
      </div>
      <div class="project-links">
        <a href="{base}projects/{p['slug']}.html" class="project-link">Read the case study →</a>{live}{repo}
      </div>
    </article>"""


def write(path: str, content: str):
    out = ROOT / path
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(content, encoding="utf-8")
    print("wrote", path)


# ---------------------------------------------------------------- home
def build_home():
    desc = "Tahsin Ali Abtahi — Python developer and aspiring engineer. Building DayMark, MarkdStudio, Velin, and other projects while learning to ship real software."
    cards = "\n\n".join(project_card(p, 0) for p in PROJECTS)
    html = head_html(f"{SITE_NAME} — Portfolio", desc, "", 0, extra_ld=PERSON_LD)
    html += "\n" + body_open() + "\n" + nav_html("home", 0) + f"""

<main id="main">
<!-- HERO -->
<section id="hero">
  <div class="hero-grid-bg"></div>
  <div class="hero-blob"></div>
  <p class="hero-tag">Hey there, I'm</p>
  <h1 class="hero-name">Tahsin<br><span class="accent-word">Ali Abtahi</span></h1>
  <div class="typing-wrapper">
    I'm a <span class="typed-text" id="typedText">Python Developer</span><span class="typing-cursor"></span>
  </div>
  <p class="hero-sub">
    I build, break, and rebuild things until they work better than before.
  </p>
  <div class="hero-cta">
    <a href="projects/" class="btn btn-primary">See my work</a>
    <a href="about.html" class="btn btn-outline">About me</a>
  </div>
</section>

<!-- ABOUT (short) -->
<section id="about">
  <div class="reveal">
    <p class="section-label">// who am i</p>
    <h2 class="section-title">About Me</h2>
  </div>
  <div class="about-grid">
    <div class="about-text reveal">
      <p>I'm a 12th standard Science stream student at <strong>PM SHRI KV 210 CoBRA CRPF Dalgaon</strong>, studying PCMCs — Physics, Chemistry, Mathematics & Computer Science.</p>
      <p>What started as curiosity around logic and systems turned into a real interest in programming. These days I build practical apps, experiment with Python, and keep learning through side projects.</p>
      <p class="section-more"><a class="project-link" href="about.html">Read my full story and skills →</a></p>
    </div>
    <div class="about-facts reveal">
      <div class="fact-card"><div class="fact-emoji"><i data-lucide="school"></i></div><div class="fact-label">School</div><div class="fact-value">PM SHRI KV 210 CoBRA CRPF Dalgaon</div></div>
      <div class="fact-card"><div class="fact-emoji"><i data-lucide="book-open"></i></div><div class="fact-label">Stream</div><div class="fact-value">PCMCs — 12th Standard</div></div>
      <div class="fact-card"><div class="fact-emoji"><i data-lucide="hammer"></i></div><div class="fact-label">Currently Learning</div><div class="fact-value">Flask</div></div>
      <div class="fact-card"><div class="fact-emoji"><i data-lucide="trophy"></i></div><div class="fact-label">Achievement</div><div class="fact-value">Hackathon — Zonal Level</div></div>
    </div>
  </div>
</section>

<!-- FEATURED PROJECTS -->
<section id="projects">
  <div class="reveal">
    <p class="section-label">// things i've shipped</p>
    <h2 class="section-title">Projects</h2>
  </div>
  <div class="projects-grid">
{cards}
  </div>
  <p class="section-more reveal"><a class="project-link" href="projects/">See all projects →</a></p>
</section>

<!-- GITHUB STATS -->
<section id="github">
  <div class="reveal">
    <p class="section-label">// open source</p>
    <h2 class="section-title">GitHub Stats</h2>
  </div>
  <div class="github-stats-grid" id="ghStats">
    <div class="gh-card reveal">
      <div class="gh-icon"><i data-lucide="package"></i></div>
      <div class="gh-value gh-loading" id="gh-repos">...</div>
      <div class="gh-label">Public Repos</div>
    </div>
    <div class="gh-card reveal">
      <div class="gh-icon"><i data-lucide="star"></i></div>
      <div class="gh-value gh-loading" id="gh-stars">...</div>
      <div class="gh-label">Total Stars</div>
    </div>
    <div class="gh-card reveal">
      <div class="gh-icon"><i data-lucide="users"></i></div>
      <div class="gh-value gh-loading" id="gh-followers">...</div>
      <div class="gh-label">Followers</div>
    </div>
    <div class="gh-card reveal">
      <div class="gh-icon"><i data-lucide="git-branch"></i></div>
      <div class="gh-value gh-loading" id="gh-latestrepo">...</div>
      <div class="gh-label">Latest Repo</div>
    </div>
  </div>
  <a href="https://github.com/Tahsin2155" target="_blank" rel="noopener noreferrer" class="gh-profile-link reveal">
    Visit GitHub profile →
  </a>
</section>

{contact_section(0)}
</main>

""" + footer_html(0)
    write("index.html", html)


# ---------------------------------------------------------------- about
def build_about():
    desc = "About Tahsin Ali Abtahi — 12th standard student, self-taught Python developer, hackathon team lead. My coding journey from Minecraft redstone to shipping web apps."
    html = head_html("About", desc, "about.html", 0, extra_ld=PERSON_LD)
    html += "\n" + body_open() + "\n" + nav_html("about", 0) + """

<main id="main">
<header class="page-header">
  <div class="hero-grid-bg"></div>
  <p class="section-label">// who am i</p>
  <h1 class="page-title">About Me</h1>
  <p class="page-lead">A 12th standard student who learns by building things, testing them, and improving them.</p>
</header>

<section class="about-section">
  <div class="about-grid">
    <div class="about-text reveal">
      <p>I'm a 12th standard Science stream student at <strong>PM SHRI KV 210 CoBRA CRPF Dalgaon</strong>, studying PCMCs — Physics, Chemistry, Mathematics & Computer Science.</p>
      <p>What started as curiosity around logic and systems turned into a real interest in programming. These days I build practical apps, experiment with Python, and keep learning through side projects.</p>
      <p>I'm a hackathon participant and team leader, and I seriously believe the fastest way to learn is to build things, test them, and improve them as I go.</p>
    </div>
    <div class="about-facts reveal">
      <div class="fact-card"><div class="fact-emoji"><i data-lucide="school"></i></div><div class="fact-label">School</div><div class="fact-value">PM SHRI KV 210 CoBRA CRPF Dalgaon</div></div>
      <div class="fact-card"><div class="fact-emoji"><i data-lucide="book-open"></i></div><div class="fact-label">Stream</div><div class="fact-value">PCMCs — 12th Standard</div></div>
      <div class="fact-card"><div class="fact-emoji"><i data-lucide="hammer"></i></div><div class="fact-label">Currently Learning</div><div class="fact-value">Flask</div></div>
      <div class="fact-card"><div class="fact-emoji"><i data-lucide="trophy"></i></div><div class="fact-label">Achievement</div><div class="fact-value">Hackathon — Zonal Level</div></div>
    </div>
  </div>

  <aside class="education reveal" aria-labelledby="education-title">
    <div class="education-head">
      <span class="education-icon"><i data-lucide="graduation-cap"></i></span>
      <h2 class="education-title" id="education-title">Education</h2>
    </div>
    <p class="education-school">PM SHRI KV 210 CoBRA CRPF Dalgaon, Assam</p>
    <ul class="education-list">
      <li>
        <span class="education-when">Class 10</span>
        <span class="education-what">Appeared for the 10th board examination from this school.</span>
      </li>
      <li>
        <span class="education-when">Class 12 · now</span>
        <span class="education-what">Studying Science with Physics, Chemistry, Mathematics and Computer Science (PCMCs).</span>
      </li>
    </ul>
  </aside>
</section>

<section id="timeline">
  <div class="reveal">
    <p class="section-label">// how it started</p>
    <h2 class="section-title">My Coding Journey</h2>
  </div>
  <div class="timeline">
    <div class="tl-item reveal">
      <div class="tl-dot"></div>
      <div class="tl-year">8TH STANDARD • THE BEGINNING</div>
      <div class="tl-title">Minecraft Started the Journey</div>
      <div class="tl-desc">Got my first laptop and spent hours building redstone circuits, logic setups, and contraptions in Minecraft. That problem-solving mindset naturally pulled me toward programming, and I started experimenting with HTML projects.</div>
    </div>
    <div class="tl-item reveal">
      <div class="tl-dot"></div>
      <div class="tl-year">8TH–9TH STANDARD • THE DETOUR</div>
      <div class="tl-title">Built a JARVIS Before Learning Python</div>
      <div class="tl-desc">I decided to build a Jarvis-style desktop assistant in Python before I properly knew the language. I followed YouTube tutorials line by line, and through that process I picked up Python syntax and kept improving my CSS skills too.</div>
    </div>
    <div class="tl-item reveal">
      <div class="tl-dot"></div>
      <div class="tl-year">10TH STANDARD • THE PAUSE</div>
      <div class="tl-title">Board Exams Took Priority</div>
      <div class="tl-desc">I started a structured Python course, but 10th board exams demanded full focus. Coding had to pause for a while until academics settled down.</div>
    </div>
    <div class="tl-item reveal">
      <div class="tl-dot"></div>
      <div class="tl-year">11TH STANDARD • THE COMEBACK</div>
      <div class="tl-title">Python Done, Streamlit Added</div>
      <div class="tl-desc">I returned to Python and completed it properly. Then I discovered Streamlit and realized I could build real web apps using pure Python, which gave me strong momentum again.</div>
    </div>
    <div class="tl-item reveal" data-type="achievement">
      <div class="tl-dot"></div>
      <div class="tl-year">MID 11TH • THE AHA MOMENT</div>
      <div class="tl-title">Hackathon from School to Zonal</div>
      <div class="tl-desc">I led my team in an All-India school-level hackathon. We cleared the school round and reached the Zonal level, placing in the top 120 nationwide. That was the moment I knew I wanted to keep building seriously.</div>
      <div class="tl-badge">🏅 Top 120 Nationwide</div>
    </div>
    <div class="tl-item reveal" data-type="launch">
      <div class="tl-dot"></div>
      <div class="tl-year">MID 11TH • THE LAUNCH</div>
      <div class="tl-title">DayMark Goes Live</div>
      <div class="tl-desc">Developed and deployed DayMark — a real, live productivity web app. My first proper full-stack project shipped to the world. Still running at daymark.streamlit.app.</div>
    </div>
    <div class="tl-item reveal">
      <div class="tl-dot"></div>
      <div class="tl-year">MARCH 2026 • MARKDSTUDIO</div>
      <div class="tl-title">MarkdStudio Repo Created</div>
      <div class="tl-desc">Started MarkdStudio, a browser-based Markdown editor. It has since been rebuilt with the markdown-it parser and a test suite.</div>
    </div>
    <div class="tl-item reveal">
      <div class="tl-dot"></div>
      <div class="tl-year">MARCH 2026 • VELIN</div>
      <div class="tl-title">Velin Repo Created</div>
      <div class="tl-desc">Started Velin, a custom new tab page with a clock, Pomodoro timer, to-do list and notepad, storing data in the browser with IndexedDB.</div>
    </div>
    <div class="tl-item reveal">
      <div class="tl-dot"></div>
      <div class="tl-year">AUGUST 2026 • ZIPLINE</div>
      <div class="tl-title">Zipline Repo Created</div>
      <div class="tl-desc">Started Zipline, a Flask app for moving files between my own devices, which grew into a small personal drive with notes.</div>
    </div>
    <div class="tl-item reveal">
      <div class="tl-dot"></div>
      <div class="tl-year">SEPTEMBER 2026 • HANDOFF</div>
      <div class="tl-title">Handoff Repo Created</div>
      <div class="tl-desc">Started Handoff, a desktop automation agent that combines Google's Gemini computer-use model with PyAutoGUI to operate a Windows PC. Experimental.</div>
    </div>
  </div>
</section>

<section id="skills">
  <div class="reveal">
    <p class="section-label">// tools of the trade</p>
    <h2 class="section-title">Skills</h2>
  </div>
  <div class="skills-grid reveal">
    <div class="skill-chip"><img loading="lazy" src="https://cdn.simpleicons.org/python/3776AB" alt="" width="16" height="16"> Python</div>
    <div class="skill-chip"><img loading="lazy" src="https://cdn.simpleicons.org/html5/E34F26" alt="" width="16" height="16"> HTML</div>
    <div class="skill-chip"><img loading="lazy" src="https://www.svgrepo.com/show/452185/css-3.svg" alt="" width="16" height="16"> CSS</div>
    <div class="skill-chip"><img loading="lazy" src="https://cdn.simpleicons.org/streamlit/FF4B4B" alt="" width="16" height="16"> Streamlit</div>
    <div class="skill-chip"><img loading="lazy" src="https://cdn.simpleicons.org/flask/000000" alt="" width="16" height="16"> Flask (learning)</div>
    <div class="skill-chip"><span data-lucide="calculator"></span> Mathematics</div>
    <div class="skill-chip"><span data-lucide="flask-conical"></span> Physics & Science</div>
    <div class="skill-chip"><img loading="lazy" src="https://cdn.simpleicons.org/github/181717" alt="" width="16" height="16"> Git & GitHub</div>
    <div class="skill-chip"><span data-lucide="brain"></span> Problem Solving</div>
  </div>
</section>

""" + contact_section(0) + """
</main>

""" + footer_html(0)
    write("about.html", html)


# ---------------------------------------------------------------- projects
def build_projects_index():
    desc = "Projects by Tahsin Ali Abtahi: DayMark, MarkdStudio, and Velin. Live apps built with Python, Streamlit, and the web platform."
    cards = "\n\n".join(project_card(p, 1) for p in PROJECTS)
    html = head_html("Projects", desc, "projects/", 1)
    html += "\n" + body_open() + "\n" + nav_html("projects", 1) + f"""

<main id="main">
<header class="page-header">
  <div class="hero-grid-bg"></div>
  <p class="section-label">// things i've shipped</p>
  <h1 class="page-title">Projects</h1>
  <p class="page-lead">Live apps I've built and deployed. Each one has a short write-up covering what it is, why I made it, and what I learned.</p>
</header>

<section class="projects-section">
  <div class="projects-grid">
{cards}
  </div>
</section>

{contact_section(1)}
</main>

""" + footer_html(1)
    write("projects/index.html", html)


def build_case_study(i: int):
    p = PROJECTS[i]
    prev_p = PROJECTS[i - 1] if i > 0 else None
    next_p = PROJECTS[i + 1] if i < len(PROJECTS) - 1 else None

    body = ""
    for heading, blocks in p["sections"]:
        body += f"      <h2>{heading}</h2>\n" + "\n".join("      " + b for b in blocks) + "\n"

    tags = "".join(f'<span class="project-tag">{t}</span>' for t in p["tags"])
    repo_link = f'\n        <a href="{p["repo"]}" target="_blank" rel="noopener noreferrer" class="project-link">GitHub repo →</a>' if p["repo"] else ""
    open_live = live_link(p, "Open live app →")
    if not open_live:                       # no live app: repo link becomes the first child
        repo_link = repo_link.lstrip("\n ")

    nav_prev = f'<a href="{prev_p["slug"]}.html"><small>Previous</small>← {prev_p["title"]}</a>' if prev_p else "<span></span>"
    nav_next = f'\n        <a class="next" href="{next_p["slug"]}.html"><small>Next</small>{next_p["title"]} →</a>' if next_p else ""

    ld = f"""
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "{p['title']}",
  "description": "{p['summary']}",
  "url": "{p['live'] or p['repo']}",
  "applicationCategory": "WebApplication",
  "author": {{ "@type": "Person", "name": "{SITE_NAME}", "url": "{BASE}/" }}
}}
</script>"""

    html = head_html(p["title"], p["summary"], f"projects/{p['slug']}.html", 1, og_type="article", extra_ld=ld)
    html += "\n" + body_open() + "\n" + nav_html("projects", 1) + f"""

<main id="main">
<header class="page-header">
  <div class="hero-grid-bg"></div>
  <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../index.html">Home</a><span aria-hidden="true">/</span><a href="index.html">Projects</a><span aria-hidden="true">/</span>{p['title']}</nav>
  <h1 class="page-title">{p['title']}</h1>
  <p class="page-lead">{p['summary']}</p>
</header>

<section>
  <div class="case-layout">
    <article class="case-body">
{body}
      <p class="case-note"><strong>Draft content.</strong> This write-up was drafted from {p.get('draft_source', 'the project descriptions on the old site')}. Replace it with your own notes, screenshots, and details.</p>

      <div class="case-nav">
        {nav_prev}{nav_next}
      </div>
    </article>

    <aside class="case-aside" aria-label="Project details">
      <dl>
        <div><dt>Status</dt><dd>{p['status']}</dd></div>
        <div><dt>Built with</dt><dd>{p['stack']}</dd></div>
        <div><dt>When</dt><dd>{p['when']}</dd></div>
        <div><dt>Topics</dt><dd><div class="project-tags">{tags}</div></dd></div>
      </dl>
      <div class="project-links">
        {open_live}{repo_link}
      </div>
    </aside>
  </div>
</section>

{contact_section(1)}
</main>

""" + footer_html(1)
    write(f"projects/{p['slug']}.html", html)


# ---------------------------------------------------------------- 404
def build_404():
    desc = "Page not found."
    # 404.html is served from arbitrary paths on GitHub Pages, so it must use ABSOLUTE urls.
    html = head_html("Page not found", desc, "404.html", 0).replace('<link rel="canonical" href="' + BASE + '/404.html"/>', '<meta name="robots" content="noindex"/>')
    html = html.replace('href="assets/css/style.css"', 'href="/assets/css/style.css"')
    nav = nav_html("", 0)
    nav = nav.replace('href="#contact"', 'href="/index.html#contact"')  # no contact section on the 404 page
    for old in ('href="index.html', 'href="about.html', 'href="projects/'):
        nav = nav.replace(old, old.replace('href="', 'href="/'))
    html += "\n" + body_open() + "\n" + nav + """

<main id="main">
<section class="page-header error-page">
  <div class="hero-grid-bg"></div>
  <p class="error-code">404</p>
  <h1 class="page-title">This page doesn't exist</h1>
  <p class="page-lead">The link may be old, or the address may have a typo. Go back to the home page, or look through the projects.</p>
  <div class="hero-cta" style="opacity:1;animation:none">
    <a href="/" class="btn btn-primary">Go to home</a>
    <a href="/projects/" class="btn btn-outline">See projects</a>
  </div>
</section>
</main>

<footer>© """ + str(YEAR) + " " + SITE_NAME + """</footer>

<script src="https://unpkg.com/lucide@0.469.0/dist/umd/lucide.min.js"></script>
<script src="/assets/js/main.js"></script>
</body>
</html>
"""
    write("404.html", html)


# ---------------------------------------------------------------- sitemap + robots
def build_sitemap():
    urls = ["", "about.html", "projects/"] + [f"projects/{p['slug']}.html" for p in PROJECTS]
    items = "\n".join(f"  <url><loc>{BASE}/{u}</loc></url>" for u in urls)
    write("sitemap.xml", f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{items}\n</urlset>\n')
    write("robots.txt", f"User-agent: *\nAllow: /\n\nSitemap: {BASE}/sitemap.xml\n")


if __name__ == "__main__":
    build_home()
    build_about()
    build_projects_index()
    for i in range(len(PROJECTS)):
        build_case_study(i)
    build_404()
    build_sitemap()
    print("done")
