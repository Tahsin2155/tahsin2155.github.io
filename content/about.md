---
page: "About"
route: "/about"
html: "about.html"
purpose: 'Personal portfolio "About Me" page.'
title: "About — Tahsin Ali Abtahi"
description: "About Tahsin Ali Abtahi — 12th standard student, self-taught Python developer, hackathon team lead. My coding journey from Minecraft redstone to shipping web apps."
canonical: "https://tahsin2155.github.io/about"
nav_active: "About"
last_edited: 2026-10-19
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

No big plan, honestly. Most things I build start with a "wait, can I actually make this work?" 
and then I keep poking at it until it does, or until boards remind me I have other things to do. 
Half the time I'm reading docs I don't fully get yet and figuring it out as I go.

Yes, I know, I'm scared of AI (sometimes) and I use it to build things. Don't judge me! 
I'd rather say it straight than pretend I did everything alone. Most of the things on this site are 
something I actually built, planned or learned, with the help of AI.

When I'm not staring at a code editor, I'm trying to get into the MCU, and it's not as easy as it sounds. 
I started really late, so the backlog is huge, and that's honestly what makes getting in so hard. 
I'm already a fan of F1: For Constructor I support RedBull, but for Drivers I support Max Verstappen (Mad Max) 
and Charles Leclerc (Banana Leclerc). I follow it every race week, and if I can't watch a race 
I still make sure I'm up to date.

This site is basically my little corner of the internet: the stuff I've made, how I ended up here, 
and whatever I'm figuring out next. Scroll down for the full story, from Minecraft redstone to... 
whatever Handoff turns out to be.


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
> Started MarkdStudio, a browser-based Markdown editor.


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
### First Laptop Started the Journey
> Got my first laptop in 8th, interest in technology, experience in Minecraft redstone and circuit, and problem-solving mindset was 
already there. And that problem-solving mindset naturally pulled me toward programming, and I started experimenting with HTML projects.

#### EARLIER - BEFORE 8TH
### My interest and Minecraft
> I was already interested in technology, figuring out how things work and all that. I was playing Minecraft (the cracked - pirated one) a lot back then. I liked working with redstone, which pulled my interest more into this tech field.

<!-- Timeline control. JavaScript initially folds the older entries. Unfold them -->
[Show full timeline] [+{{total entries - 3}} earlier]
<!-- Timeline control. JavaScript folds the older entries again. -->
[Fold the timeline]


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

LAYOUT (introduction and quick facts)
- In the HTML the four fact cards come before the About Me paragraphs, so screen readers read the cards first. On desktop (wider than 768px) the cards float to the top-right as a 2x2 block about half the section width, level with the top of the text; the paragraphs wrap around them and continue at full width below them (no max-width cap).
- On mobile (768px and below) the layout is one column with the text first and the four cards after it, using CSS order.
- This applies only to the About page's .about-section; the home page's About grid is unchanged.
- The Achievement card's hover text, "AI Vidyasetu 1.0", is a native title attribute on the card's value text, so it appears on mouse hover only (not on touch or keyboard focus).

BEHAVIOR (timeline)
- The timeline contains eleven entries and has data-visible="3". JavaScript initially shows only the newest three and sets the button to "Show full timeline" with "+8 earlier" (the "+{{total entries - 3}} earlier" count).
- The toggle is hidden until JavaScript confirms folding is needed, then it exposes the eight older entries and updates aria-expanded and the count.
- Expanding changes the label to "Fold the timeline". Without JavaScript, all entries remain visible.
- When collapsing from lower on the page, JavaScript may scroll the timeline back into view.

ASSETS & ICONS (skills)
- The Python, HTML5, Streamlit, Flask and GitHub icons load lazily from Simple Icons CDN. The CSS icon loads from SVG Repo.
- Mathematics, Physics & Science and Problem Solving use Lucide icons rendered after DOMContentLoaded.
- Image icons have empty alt text because the visible skill names provide the labels.
-->
