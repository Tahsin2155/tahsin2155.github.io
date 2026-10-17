<!--
PAGE: Projects
URL: /projects/
PURPOSE: Portfolio page showcasing shipped and deployed projects.
-->

<!--
SOURCE-ONLY IMPLEMENTATION:
The page includes a skip link, labelled main navigation, keyboard-visible focus outlines, aria-current page indicators, and a responsive hamburger menu controlled with aria-expanded and aria-controls.
Lucide icons are rendered after DOMContentLoaded.
Elements marked .reveal animate into view with IntersectionObserver; without JavaScript, they remain visible.
The custom cursor runs only on hover-capable fine-pointer devices.
prefers-reduced-motion disables cursor movement, reveal movement, smooth scrolling, and decorative transitions.
The shared site uses no localStorage or IndexedDB.
-->

<!--
SOURCE-ONLY HEAD DETAILS:
Title: "Projects — Tahsin Ali Abtahi".
Description: "Projects by Tahsin Ali Abtahi: DayMark, MarkdStudio, and Velin. Live apps built with Python, Streamlit, and the web platform."
Canonical: https://tahsin2155.github.io/projects/
Open Graph and Twitter cards use the same title and description plus the shared 1200x630 og-image.png.
This page has no JSON-LD block.
-->

# Header

<!-- Website brand / logo -->
**tahsin2155.github.io**

<!-- Primary navigation -->
- [Home](../)
- [About](../about)
- [Projects](../projects/)
- [Contact](#contact)


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
SOURCE-ONLY PROJECT-CARD DETAILS:
All five cards are rendered directly in the HTML: DayMark, MarkdStudio, Velin, Zipline, and Handoff.
Unlike the home page, JavaScript does not fold this grid.
Project images are lazy-loaded with fixed 40x40 dimensions and descriptive alt text.
Handoff uses a decorative Lucide icon with aria-hidden="true".
External project links open in a new tab with rel="noopener noreferrer".
-->

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

<!-- Section eyebrow -->
`// LET'S CONNECT`

## Get in Touch

I'd love to connect with mentors, fellow builders, or anyone curious about the same things I am — always up for a good conversation or a collaboration on something interesting.  
(Still in high school, so I'm not looking for internships or paid work right now — just good people and good ideas.)


<!-- Social links -->
[LinkedIn](https://www.linkedin.com/in/tahsinaliabtahi/)

[@tahsin_2155](https://www.instagram.com/tahsin_2155)

[Tahsin2155](https://github.com/Tahsin2155)


## Contact Form

<!--
SOURCE-ONLY FORM DETAILS:
The form submits with POST to https://formspree.io/f/xwlpvooz.
Name, email, subject, and message are required fields.
Name and email use autocomplete="name" and autocomplete="email".
A hidden _subject field is submitted with the value "New message from tahsin2155.github.io".
Submission is handled by the browser and Formspree; there is no JavaScript submission handler or local storage.
-->

<!-- Name field -->
**NAME**

Placeholder: `Your name`


<!-- Email field -->
**EMAIL**

Placeholder: `you@example.com`


<!-- Subject field -->
**SUBJECT**

Placeholder: `What would you like to talk about?`


<!-- Message field -->
**MESSAGE**

Placeholder: `Write your message...`


<!-- Submit button -->
[Send message]


---

<!-- Footer -->
© 2026 Tahsin Ali Abtahi


<!--
SOURCE DETAILS FROM projects/index.html:
- Page title: "Projects — Tahsin Ali Abtahi".
- SEO description: "Projects by Tahsin Ali Abtahi: DayMark, MarkdStudio, and Velin. Live apps built with Python, Streamlit, and the web platform.".
- Canonical URL: https://tahsin2155.github.io/projects/.
- Case-study routes: daymark, markdstudio, velin, zipline, and handoff relative to /projects/.
- Live project URLs: https://daymark.streamlit.app, https://markdstudio.netlify.app, and https://newvelintab.netlify.app.
- GitHub URLs: https://github.com/Tahsin2155/DayMark, https://github.com/Tahsin2155/markdstudio, https://github.com/Tahsin2155/zipline, and https://github.com/Tahsin2155/handoff. Velin has no GitHub link in this page's HTML.
- Contact form: POST to https://formspree.io/f/xwlpvooz; hidden subject: "New message from tahsin2155.github.io".
- Social URLs: LinkedIn https://www.linkedin.com/in/tahsinaliabtahi/, Instagram https://www.instagram.com/tahsin_2155, GitHub https://github.com/Tahsin2155.
-->