---
page: "Home"
route: "/"
html: "index.html"
purpose: "Personal site landing/home page."
title: "Tahsin Ali Abtahi"
description: "Tahsin Ali Abtahi — self-taught programmer, still in school, building things and breaking them first. DayMark, Zipline, Velin, Handoff, and whatever's next."
canonical: "https://tahsin2155.github.io/"
nav_active: "Home"
last_edited: 2026-10-19
---

# Header

<!-- INCLUDE: header -->


---


# Hero

<!-- Small introductory eyebrow -->
`ME!? I'M`

# Tahsin

## Ali Abtahi

<!--
Typing-effect role line.
The highlighted text rotates between:
"Self-Taught Programmer"
"Hackathon Team Lead"
"Full Time Student, Part Time Builder"

With prefers-reduced-motion enabled.
-->

I'm a **[Self-Taught Programmer / Hackathon Team Lead / Full Time Student, Part Time Builder]**

<!-- Supporting introduction -->
Still figuring out how most of this works. Building anyway - even if bad at first.

<!-- Primary CTA -->
[See my work](projects/)

<!-- Secondary CTA -->
[About me](about)


---

# About Me
<!-- This is meant to fade/truncate into a teaser on the homepage. Full version is great raw material, but we'll trim for the home page and let the About page carry the whole thing -->

<!-- Section eyebrow -->
`// WHO AM I`

## About Me

I'm 17, still in school, figuring out my life. I spend most of my free time on my computer, 
doing _crawzy_ shit. "Self-taught programmer" wasn't planned - it just sort of happened... 
Programming makes me feel like a god of this virtual world; I can make them do whatever I want. 
I build things really badly, at first ;), then less badly, and I keep improving and learning 
(sometimes or maybe a little bit more often, I hit up AI as well for help, uk!).....
<!-- fades out here -->

<!-- Link to the full About page -->
[Wanna know more about me? →](about)


### Quick Facts

<!-- Fact card -->
**SCHOOL**
PM SHRI KV 210 CoBRA CRPF Dalgaon

<!-- Fact card -->
**STREAM**
PCMCs, 12th grade

<!-- Fact card -->
**CURRENTLY**
Boards szn. Pray for me ✌️😭

<!-- Fact card -->
**ACHIEVEMENT**
Zonal-level, Hackathon [hover: AI Vidyasetu 1.0] 
<!-- with hover text; HTML already has that (using the default) to reveal a clue about which hackathon: "AI Vidyasetu 1.0" -->

---

# Projects

<!-- Section eyebrow -->
`// THINGS I'VE SHIPPED`

<!-- Project card -->
### Handoff

A prototype agent that operates a Windows PC from a plain-language task, using a Gemini computer-use model and PyAutoGUI.

**Tags:**  
`Python` `Gemini` `PyAutoGUI` `Prototype`

[Read the case study →](/projects/handoff)  
[GitHub repo →](https://github.com/Tahsin2155/handoff)


<!-- Project card -->
### Zipline

A self-hosted file transfer app with login, folders, search, previews and notes, built with Flask and SQLite.


**Tags:**  
`Python` `Flask` `SQLite` `Self-hosted`

[Read the case study →](/projects/zipline)  
[GitHub repo →](https://github.com/Tahsin2155/zipline)


<!-- Project card -->
### Velin

A customizable new-tab page with a clock, Pomodoro timer, to-do list, notes and bookmarks, saved in your browser.

**Tags:**  
`New Tab` `Vanilla web` `Customizable` `Personal Tool` `Vibe Coded`

[Read the case study →](/projects/velin)  
[Live app →](https://newvelintab.netlify.app)  
[GitHub repo →](https://github.com/Tahsin2155/velin)


<!-- Link to the complete projects page -->
[Rest of the mess →](/projects/)


---

# GitHub Stats

<!-- Section eyebrow -->
`// OPEN SOURCE`

## GitHub Stats

<!--
These statistics appear to be dynamically fetched from GitHub.
-->

### Public Repos

**...**

Public Repos


### Total Stars

**...**

Total Stars


### Followers

**...**

Followers


### Recently Worked

**...**


<!-- GitHub profile CTA -->
[Visit GitHub profile →](https://github.com/Tahsin2155)


---

# Get in Touch

<!-- INCLUDE: contact -->

<!-- Contact blurb for this page. Use it instead of the default blurb in _site.md. -->
Always down to talk to people who build stuff, mentors, or anyone into the same things I am. Hit me up if you want to nerd out about a project or just say hi.
(Still in school, so no internships or paid work rn — just good people and good ideas.)


---

# Footer

<!-- INCLUDE: footer -->


<!--
TECHNICAL NOTES
(Adds to the site-wide notes in _site.md.)

HEAD & METADATA
- The JSON-LD block describes Tahsin as a schema.org Person with jobTitle "Student and Self-Taught Programmer" and a description that matches the page: a self-taught programmer and 12th standard Science stream student who builds web apps and tools and learns by shipping side projects.

BEHAVIOR
- The About Me paragraph fades out at its end: the last two lines (about 3.6em) fade into transparency with a CSS mask, ahead of the "Wanna know more about me? →" link. The full text stays in the page for screen readers.
- The initial role text is "Self-Taught Programmer". JavaScript rotates it through "Hackathon Team Lead" and "Full Time Student, Part Time Builder" with a typing effect; prefers-reduced-motion disables the typing and keeps "Self-Taught Programmer".
- The Achievement fact card shows the hover text "AI Vidyasetu 1.0" anywhere over the whole card, using a native title attribute on the card itself.
- GitHub stats are loaded from the unauthenticated GitHub API for Tahsin2155: the user endpoint, plus a second endpoint for up to 100 repositories. Public repository and follower counts come from the user response. Stars are summed across the repositories, and "Recently Worked" is the repository with the newest pushed_at timestamp.
- On screens 1200px wide and up, the four GitHub stat cards sit in one row. The first three share the space equally and the Recently Worked card is as wide as its repository name needs (names wrap after about 22 characters), so when that name needs more room the card grows and the other three shrink. Below 1200px the cards use the auto-fit grid (two columns on small screens) and a long repository name wraps inside its card instead of overflowing.

PROJECT CARDS
- The home page has exactly three project cards in the DOM, in this order: Handoff, Zipline, Velin. There is no fold or collapse script; the "Rest of the mess →" link leads to /projects/.
- Every card has the project-card, reveal and project-featured classes.
- The whole card is clickable. The "Read the case study →" link (class project-case-link) is stretched over the card with a ::after overlay; the Live app and GitHub repo links are raised above the overlay and still open their own destinations in a new tab. Each card keeps a single case-study link for keyboard and screen-reader users. Keyboard focus shows an outline around the card, and the existing hover lift is unchanged.
- Velin has Read the case study, Live app and GitHub repo links; Handoff and Zipline have Read the case study and GitHub repo links.

DATA & STORAGE
- GitHub stats are cached in sessionStorage under gh-stats-cache for 10 minutes. If the cache is malformed or sessionStorage is unavailable, the stats are fetched again instead. If either GitHub request returns a non-OK response or fails, every value displays an em dash.

ASSETS & ICONS
- Image labels: Velin icon. Handoff and Zipline use decorative Lucide icons with aria-hidden="true".
-->
