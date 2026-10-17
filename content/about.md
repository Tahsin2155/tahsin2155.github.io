---
page: "About"
route: "/about"
html: "about.html"
purpose: 'Personal portfolio "About Me" page.'
title: "About — Tahsin Ali Abtahi"
description: "About Tahsin Ali Abtahi — 12th standard student, self-taught Python developer, hackathon team lead. My coding journey from Minecraft redstone to shipping web apps."
canonical: "https://tahsin2155.github.io/about"
nav_active: "About"
last_edited: 2026-09-22
---

# Header

<!-- INCLUDE: header -->


---

# About Me


<!-- Section eyebrow -->
`// WHO AM I`

<!-- Main page heading -->
# About Me

<!-- Introductory subtitle -->
A 12th standard student who learns by building things, testing them, and improving them.


---

<!--
SECTION: Personal introduction and quick facts.
The left side contains descriptive paragraphs.
The right side contains four fact cards.
-->

## About Me

I'm 17, still in school, figuring out my life (with a fear of AI replacing me). I spend most of my free time on my computer, 
doing _crawzy_ shit. "Self-taught programmer" wasn't planned - it just sort of happened... 
Programming makes me feel like a god of this virtual world; I can make them do whatever I want. 
I build things really badly, at first ;), then less badly, and I keep improving and learning 
(sometimes or maybe a little bit more often, I hit up AI as well for help, uk!).....


### Quick Facts

<!-- Fact card -->
**SCHOOL**
PM SHRI KV 210 CoBRA CRPF Dalgaon

<!-- Fact card -->
**STREAM**
PCMCs, 12th grade

<!-- Fact card -->
**CURRENTLY**
Boards szn. Pray for me ✌️

<!-- Fact card -->
**ACHIEVEMENT**
Zonal-level, Hackathon [hover: AI Vidyasetu 1.0] 
<!-- with hover text; HTML already has that (using the default) to reveal a clue about which hackathon: "AI Vidyasetu 1.0" -->


---

## Education

<!--
Education card containing the current school and academic history.
-->

### PM SHRI KV 210 CoBRA CRPF Dalgaon, Assam

**Class 12 · now**  
Studying Science with Physics, Chemistry, Mathematics and Computer Science (PCMCs).

**Class 10 · 2024–25**  
Appeared for the 10th board examination from this school.


---

# My Coding Journey

<!-- Section eyebrow -->
`// HOW IT STARTED`

<!-- Main section heading -->
## My Coding Journey

<!--
TIMELINE:
Entries are presented from the most recent experience to the earliest.
-->

#### SEPTEMBER 2026
### Handoff
> Started Handoff, a desktop automation agent that combines Google's Gemini computer-use model with PyAutoGUI to operate a Windows PC. Experimental.


#### AUGUST 2026 - FIRST PUBLISHED FLASK PROJECT
### Zipline
> Started Zipline, a Flask app for moving files between my own devices, which grew into a small personal drive with notes.


#### MARCH 2026
### Velin
> Started Velin, a custom new tab page with a clock, Pomodoro timer, to-do list and notepad, storing data in the browser with IndexedDB.


#### MARCH 2026
### MarkdStudio
> Started MarkdStudio, a browser-based Markdown editor. It has since been rebuilt with the markdown-it parser and a test suite.


#### JANUARY 2026 - THE LAUNCH
### DayMark Goes Live
> Developed and deployed DayMark — a real, live productivity web app. My first proper full-stack project shipped to the world. Still running at daymark.streamlit.app.


#### MID 11TH - THE AHA MOMENT
### Hackathon from School to Zonal
> I led my team in an All-India school-level hackathon. We cleared the school round and reached the Zonal level, placing in the top 120 nationwide. That was the moment I knew I wanted to keep building seriously.
<!-- Achievement badge -->
**🏅 Zonal Level**


#### 11TH STANDARD - THE COMEBACK
### Python Done, Streamlit Added
> I returned to Python and completed it properly. Then I discovered Streamlit and realized I could build real web apps using pure Python, which gave me strong momentum again.


#### 10TH STANDARD - THE PAUSE
### Board Exams Took Priority
> I started a structured Python course, but 10th board exams demanded full focus. Coding had to pause for a while until academics settled down.


#### 8TH-9TH STANDARD - THE DETOUR
### Built a JARVIS Before Learning Python
> I decided to build a Jarvis-style desktop assistant in Python before I properly knew the language. I followed YouTube tutorials line by line, and through that process I picked up Python syntax and kept improving my CSS skills too.


#### 8TH STANDARD - THE BEGINNING
### Minecraft Started the Journey
> Got my first laptop and spent hours building redstone circuits, logic setups, and contraptions in Minecraft. That problem-solving mindset naturally pulled me toward programming, and I started experimenting with HTML projects.


<!-- Timeline control. JavaScript initially folds the seven older entries. -->
[Show full timeline] [+7 earlier]
<!-- Timeline control. JavaScript folds the seven older entries again. -->
[Hide full timeline]


---

# Skills


<!-- Section eyebrow -->
`// TOOLS OF THE TRADE`

## Skills

<!-- Skill tags / badges -->
- Python
- HTML
- CSS
- Streamlit
- Flask (learning)
- Mathematics
- Physics & Science
- Git & GitHub
- Problem Solving


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
- JSON-LD describes Tahsin as a schema.org Person with jobTitle, description, sameAs profiles, image and knowsAbout values.

BEHAVIOR (timeline)
- The timeline contains ten entries and has data-visible="3". JavaScript initially shows only the newest three and sets the button to "Show full timeline" with "+7 earlier" (the "+{{total entries - 3}} earlier" count).
- The toggle is hidden until JavaScript confirms folding is needed, then it exposes the seven older entries and updates aria-expanded and the count.
- Expanding changes the label to "Hide full timeline". Without JavaScript, all entries remain visible.
- When collapsing from lower on the page, JavaScript may scroll the timeline back into view.

ASSETS & ICONS (skills)
- The Python, HTML5, Streamlit, Flask and GitHub icons load lazily from Simple Icons CDN. The CSS icon loads from SVG Repo.
- Mathematics, Physics & Science and Problem Solving use Lucide icons rendered after DOMContentLoaded.
- Image icons have empty alt text because the visible skill names provide the labels.
-->
