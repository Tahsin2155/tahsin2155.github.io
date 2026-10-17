---
page: "Projects"
route: "/projects/"
html: "projects/index.html"
purpose: "Portfolio page showcasing shipped and deployed projects."
title: "Projects — Tahsin Ali Abtahi"
description: "Projects by Tahsin Ali Abtahi: DayMark, MarkdStudio, and Velin. Live apps built with Python, Streamlit, and the web platform."
canonical: "https://tahsin2155.github.io/projects/"
nav_active: "Projects"
last_edited: 2026-07-01
---

# Header

<!-- INCLUDE: header -->


---

# Projects

<!-- Section eyebrow -->
`// THINGS I'VE SHIPPED`

## Projects

<!-- Introductory description -->
Live apps I've built and deployed. Each one has a short write-up covering what it is, why I made it, and what I learned.


---

# Project List


<!--
PROJECT CARD: DayMark
-->

## DayMark

A personal productivity web app built entirely with Python & Streamlit. Track your days, mark milestones, and stay organised — all in a clean, minimal interface.

<!-- Project tags -->
`Python` `Streamlit` `Productivity`

<!-- Project links -->
[Read the case study →](daymark)
[Live app →](https://daymark.streamlit.app)
[GitHub repo →](https://github.com/Tahsin2155/DayMark)


<!--
PROJECT CARD: MarkdStudio
-->

## MarkdStudio

A markdown editor and writing app focused on clean writing flow and simple formatting. Built for drafting, editing, and shipping content faster.

<!-- Project tags -->
`Markdown` `Editor` `Writing`

<!-- Project links -->
[Read the case study →](markdstudio)
[Live app →](https://markdstudio.netlify.app)
[GitHub repo →](https://github.com/Tahsin2155/markdstudio)


<!--
PROJECT CARD: Velin
-->

## Velin

A custom new tab page designed to make your browser start cleaner and more useful. It is live right now and actively in development.

<!-- Project tags -->
`New Tab` `Productivity` `In Development`

<!-- Project links -->
[Read the case study →](velin)
[Live app →](https://newvelintab.netlify.app)


<!--
PROJECT CARD: Zipline
-->

## Zipline

A personal, self-hosted file transfer and storage app built with Flask and SQLite. Log in from any device to upload, organise, preview and download your files, with a scratchpad for quick notes.

<!-- Project tags -->
`Python` `Flask` `SQLite` `Self-hosted`

<!-- Project links -->
[Read the case study →](zipline)
[GitHub repo →](https://github.com/Tahsin2155/zipline)


<!--
PROJECT CARD: Handoff
-->

## Handoff

A prototype desktop automation agent. You give it a task in plain language, and it looks at the screen, decides what to do, and operates the mouse and keyboard on Windows.

<!-- Project tags -->
`Python` `Gemini` `PyAutoGUI` `Prototype`

<!-- Project links -->
[Read the case study →](handoff)
[GitHub repo →](https://github.com/Tahsin2155/handoff)


---

# Get in Touch

<!-- INCLUDE: contact -->


---

# Footer

<!-- INCLUDE: footer -->


<!--
TECHNICAL NOTES
(Adds to the site-wide notes in _site.md.)

HEAD & METADATA
- This page has no JSON-LD block.

PROJECT CARDS
- All five cards are rendered directly in the HTML: DayMark, MarkdStudio, Velin, Zipline, and Handoff. Unlike the home page, JavaScript does not fold this grid.
- Project images are lazy-loaded with fixed 40x40 dimensions and descriptive alt text. Handoff uses a decorative Lucide icon with aria-hidden="true".
- External project links open in a new tab with rel="noopener noreferrer".
- Velin has no GitHub link in this page's HTML.
- The case-study routes (daymark, markdstudio, velin, zipline, handoff) are relative to /projects/.
-->
