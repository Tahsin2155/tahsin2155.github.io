---
page: "Projects"
route: "/projects/"
html: "projects/index.html"
purpose: "Portfolio page showcasing shipped and deployed projects."
title: "Projects — Tahsin Ali Abtahi"
description: "Projects by Tahsin Ali Abtahi: Handoff, Zipline, Velin, MarkdStudio, and DayMark. Apps built with Python, Flask, Streamlit, and the web platform."
canonical: "https://tahsin2155.github.io/projects/"
nav_active: "Projects"
last_edited: 2026-10-19
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
CHANGE: Reorder the five project cards from latest to oldest: Handoff, Zipline, Velin, MarkdStudio, DayMark. Move the existing cards; do not recreate them. This order applies to this page only; the home page keeps its own order.
-->

<!--
CHANGE: Make the whole project card clickable. Clicking anywhere on a card opens that project's case study, the same page the "Read the case study →" link opens. The "Read the case study →" link stays exactly as it is. The "Live app →" and "GitHub repo →" links keep opening their own destinations in a new tab and must not trigger the case-study link. Do not put links inside a link: stretch the case-study link over the whole card (for example with a ::after overlay on that link, position: relative on the card, and the other links raised above the overlay), so there is still one case-study link per card for keyboard and screen-reader users. Keep a visible keyboard focus outline on the card and keep the existing hover lift. Apply it to every card on this page.
-->

<!--
CHANGE: Every project card on this page must have the project-featured class (the highlight), with no exceptions, in addition to project-card and reveal.
-->


<!--
PROJECT CARD: Handoff
-->

## Handoff

A prototype agent that operates a Windows PC from a plain-language task, using a Gemini computer-use model and PyAutoGUI.

<!-- Project tags -->
`Python` `Gemini` `PyAutoGUI` `Prototype`

<!-- Project links -->
[Read the case study →](handoff)
[GitHub repo →](https://github.com/Tahsin2155/handoff)


<!--
PROJECT CARD: Zipline
-->

## Zipline

A self-hosted file transfer app with login, folders, search, previews and notes, built with Flask and SQLite.

<!-- Project tags -->
`Python` `Flask` `SQLite` `Self-hosted`

<!-- Project links -->
[Read the case study →](zipline)
[GitHub repo →](https://github.com/Tahsin2155/zipline)


<!--
PROJECT CARD: Velin
-->

## Velin

A customizable new-tab page with a clock, Pomodoro timer, to-do list, notes and bookmarks, saved in your browser.

<!-- Project tags -->
`New Tab` `Vanilla web` `Customizable` `Personal Tool` `Vibe Coded`

<!-- Project links -->
[Read the case study →](velin)
[Live app →](https://newvelintab.netlify.app)
[GitHub repo →](https://github.com/Tahsin2155/velin)


<!--
PROJECT CARD: MarkdStudio
-->

## MarkdStudio

A browser-based Markdown editor with live preview and tabs for multiple documents, stored only on your device.

<!-- Project tags -->
`JavaScript` `Markdown` `Editor` `Vibe Coded`

<!-- Project links -->
[Read the case study →](markdstudio)
[Live app →](https://markdstudio.netlify.app)
[GitHub repo →](https://github.com/Tahsin2155/markdstudio)


<!--
PROJECT CARD: DayMark
-->

## DayMark

A habit tracker and daily journal with a to-do list and monthly analytics, built with Streamlit and Firebase.

<!-- Project tags -->
`Python` `Streamlit` `Firebase` `Habit Tracker`

<!-- Project links -->
[Read the case study →](daymark)
[Live app →](https://daymark.streamlit.app)
[GitHub repo →](https://github.com/Tahsin2155/DayMark)


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
