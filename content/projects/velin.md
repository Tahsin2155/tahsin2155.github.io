---
page: "Velin Project Case Study"
route: "/projects/velin"
html: "projects/velin.html"
purpose: "Detailed case-study page for the Velin project."
title: "Velin — Tahsin Ali Abtahi"
description: "A customizable new-tab page with a clock, Pomodoro timer, to-do list, notes and bookmarks, saved in your browser."
canonical: "https://tahsin2155.github.io/projects/velin"
nav_active: "Projects"
last_edited: 2026-10-18
---

# Header

<!-- INCLUDE: header -->


---

# Velin

<!-- Breadcrumb navigation -->
[Home](../) / [Projects](./) / Velin

## Velin


A customizable new-tab page with a clock, Pomodoro timer, to-do list, notes and bookmarks, saved in your browser.


---

<!--
CHANGE: Add a new section "What it can do" after "Why I built it". It is a bullet list where each item starts with a bold label. Use the same section styling as the other sections.
-->

# What it is

Velin is a custom new-tab page. Instead of the browser's default blank screen, you get a canvas where you place widgets (a clock, a Pomodoro timer, a to-do list, notes and bookmarks) and free-floating text, over a background you choose.

It runs entirely in the browser with no account and no backend, and everything is saved on your own device. I use a browser extension to set it as my new tab page.


# Why I built it

The default new tab screen was boring and bloated: random bookmarks and nothing I really cared about. I wanted a page I could set up myself, with a clock, a Pomodoro timer, a to-do list and a notepad on it, in whatever layout, theme and background I like.

It's my new tab now, with my preferred layout and widgets.


# What it can do

- **Widgets:** Clock (click it to switch between digital and analog), Bookmarks (with each site's icon), Todo, Note and Pomodoro. You drag them around and resize them.
- **Notes:** a small Markdown editor with a live preview, including tables.
- **Pomodoro:** 25 minutes of focus, 5 of break, and a 15-minute break every fourth session. It sends a notification when a session ends and stays in sync if you have Velin open in more than one tab.
- **Free-floating text:** drop text anywhere on the canvas, then resize, rotate, bold or recolour it.
- **View and edit mode:** view mode locks everything in place so nothing moves by accident, and `E` toggles between the two.
- **Looks:** four themes (dark, light, glass and black and white), and a solid, gradient or image background with brightness and blur settings.
- **Saves automatically:** there's no save button.
- **Backup:** export your whole setup to a JSON file and import it again.


<!--
CHANGE: "How it's built" is now short paragraphs instead of a bullet list. The paragraph that starts with the bold label "About AI:" is a normal paragraph with a bold lead-in.
-->

# How it's built

Velin is a static site with no backend: plain HTML, CSS and JavaScript in four files, with no framework and no build step. It's hosted on Netlify.

Everything is saved in your browser's IndexedDB. Each widget, bookmark, note and image is stored as its own record, and it warns you when storage is running low. You can export your whole setup to a JSON file as a backup.

**About AI:** Velin is entirely vibe coded. AI wrote the code, including the fixes. The thinking was mine: I planned out what it should do, and I found the glitches, reliability problems and real-world issues by using and testing it myself, then decided how they should be fixed.


<!--
CHANGE: Add a new section "How it grew" after "How it's built". It is plain paragraphs, no bullets. Use the same section styling as the other sections.
-->

# How it grew

Velin started as a single HTML file, and it worked fine at first. Then the usual stuff started breaking. Some widgets stopped saving. Bookmark favicons quit loading, which I fixed with caching. Once I added more widgets, I hit localStorage's limit, so I moved everything to IndexedDB, and that ran smoothly for a while.

Then it broke again, and this one needed a rebuild of the storage system, not a patch.

My new tab was sometimes just blank, or only the widgets I'd added most recently were gone. I refreshed a few times, thinking it was nothing, but it kept happening. I checked the storage: IndexedDB was empty, with no errors and nothing in the console. So it wasn't a display problem. Something was actually wiping my data.

It took me 1–2 hours to work out why. One save() function wrote every widget's data to IndexedDB at once. IndexedDB loads asynchronously, so if a save fired before the first load finished, it wrote default values over everything, because it didn't know the real data existed yet. The newest widgets got hit most, since they were the most likely to trigger a save before the load caught up.

The fix was splitting save() into per-key functions, so widgets can't overwrite each other, plus a _saveGuard flag that blocks saving until the load is done. Figuring out what was happening took far longer than fixing it.


<!--
CHANGE: Remove the "What I learned" section from this page. Velin no longer has one.
-->

<!--
CHANGE: Add a new section "Limits and next steps" after "How it grew". It is a bullet list where each item starts with a bold label, followed by one closing paragraph of plain text. Use the same section styling as the other sections.
-->

# Limits and next steps

- **Pomodoro notifications only work while a Velin tab is open,** though it can be in the background.
- **It only saves to one browser.** The JSON export is the only backup.
- **It doesn't work offline,** since it's a website.

Next, I want to make the browser extension public so it works offline. I've already packaged it as an extension, but I haven't published it, because extension stores charge a fee and I'm a broke high schooler lol.


---

<!--
SIDEBAR: Project metadata and quick links.
-->

## Project Details

**STATUS**  
Live, in development

**BUILT WITH**  
HTML, CSS, JavaScript, IndexedDB, Netlify

**WHEN**  
March 2026

**TOPICS**  
`New Tab` `Vanilla web` `Customizable` `Personal Tool` `Vibe Coded`

---

<!--
CHANGE: Add a "GitHub repo →" link under the live app link, in the same style as the GitHub link on the other case-study pages.
-->

<!-- External project links -->
[Open live app →](https://newvelintab.netlify.app)

[GitHub repo →](https://github.com/Tahsin2155/velin)


---

<!--
PROJECT NAVIGATION:
Previous project: MarkdStudio
Next project: Zipline
-->

### Previous

[← MarkdStudio](markdstudio)


### Next

[Zipline →](zipline)


---

# Get in Touch

<!-- INCLUDE: contact -->


---

# Footer

<!-- INCLUDE: footer -->


<!--
TECHNICAL NOTES
(Adds to the site-wide notes in _site.md.)

ASSETS & ICONS
- The project icon is lazy-loaded with fixed dimensions and meaningful alt text ("Velin icon").

HEAD & METADATA
- JSON-LD includes the live URL https://newvelintab.netlify.app.

LINKS
- The page has no GitHub repository link in its HTML.
-->
