---
page: "Home"
route: "/"
html: "index.html"
purpose: "Personal site landing/home page."
title: "Tahsin Ali Abtahi"
description: "Tahsin Ali Abtahi — self-taught programmer, still in school, building things and breaking them first. DayMark, Zipline, Velin, Handoff, and whatever's next."
canonical: "https://tahsin2155.github.io/"
nav_active: "Home"
last_edited: 2026-09-22
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
Boards szn. Pray for me

<!-- Fact card -->
**ACHIEVEMENT**
Zonal-level, Hackathon [hover: AI Vidyasetu 1.0] 
<!-- with hover text; HTML already has that (using the default) to reveal a clue about which hackathon: "AI Vidyasetu 1.0" -->

---

# Projects
<!-- only 3 main projects to show on the homescreen, rest stay only on the projects page. See the CHANGE note right below for the exact implementation instruction. -->

<!--
CHANGE: The Home project grid now shows only 3 cards — Handoff, Zipline, Velin, in that order — instead of all 5. Remove the "keep all five cards in HTML, fold after first CSS grid row" JS behavior entirely; the DOM should only contain these 3 cards. The "Rest of the mess →" link leads to /projects/.
-->

<!-- Section eyebrow -->
`// THINGS I'VE SHIPPED`

<!-- Project card -->
### Handoff

An agent that controls a Windows PC from a plain-language task — it looks at the screen, decides what to do, and moves the mouse and keyboard like a person would. Early prototype, built on Gemini's computer-use model.

**Tags:**  
`AI Agent` `Python` `Automation` `Prototype`

[Read the case study →](/projects/handoff)  
[GitHub repo →](https://github.com/Tahsin2155/handoff)


<!-- Project card -->
### Zipline

A personal file-transfer app I built to move files between my own devices. Grew into a small self-hosted drive — folders, previews, search, and a notes scratchpad. Runs on Flask and SQLite.


**Tags:**  
`Flask` `SQLite` `Self-hosted`

[Read the case study →](/projects/zipline)  
[GitHub repo →](https://github.com/Tahsin2155/zipline)


<!-- Project card -->
### Velin

A custom new tab page with a clock, Pomodoro timer, to-do list, and notepad — because the default new tab screen was doing nothing for me.

**Tags:**  
`New Tab` `Vanilla web` `Customizable` `Personal Tool` `Live`

[Read the case study →](/projects/velin)  
[Live app →](https://newvelintab.netlify.app)  
[Github repo →](https://github.com/Tahsin2155/velin)


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

BEHAVIOR
- The initial role text is "Self-Taught Programmer". JavaScript rotates it through "Hackathon Team Lead" and "Full Time Student, Part Time Builder" with a typing effect; prefers-reduced-motion disables the typing and keeps "Self-Taught Programmer".
- GitHub stats are loaded from the unauthenticated GitHub API for Tahsin2155: the user endpoint, plus a second endpoint for up to 100 repositories. Public repository and follower counts come from the user response. Stars are summed across the repositories, and "Recently Worked" is the repository with the newest pushed_at timestamp.

DATA & STORAGE
- GitHub stats are cached in sessionStorage under gh-stats-cache for 10 minutes. Malformed cache data, storage failures, non-OK responses and fetch failures display an em dash for every value.

ASSETS & ICONS
- Image labels: Velin icon. Handoff and Zipline use decorative Lucide icons with aria-hidden="true".
-->
