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
- All five cards are rendered directly in the HTML, in this order (latest to oldest): Handoff, Zipline, Velin, MarkdStudio, and DayMark. This order applies to this page only; the home page keeps its own. Unlike the home page, JavaScript does not fold this grid.
- Every card has the project-card, reveal and project-featured classes.
- The whole card is clickable. The "Read the case study →" link (class project-case-link) is stretched over the card with a ::after overlay, so a click anywhere on the card opens that project's case study. The Live app and GitHub repo links are raised above the overlay and still open their own destinations in a new tab. Each card keeps a single case-study link for keyboard and screen-reader users. Keyboard focus shows an outline around the card, and the existing hover lift is unchanged.
- Project images are lazy-loaded with fixed 40x40 dimensions and descriptive alt text. Handoff uses a decorative Lucide icon with aria-hidden="true".
- External project links open in a new tab with rel="noopener noreferrer".
- Velin has Read the case study, Live app and GitHub repo links.
- The case-study routes (handoff, zipline, velin, markdstudio, daymark) are relative to /projects/.
-->
