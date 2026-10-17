<!--
PAGE: About
PURPOSE: Personal portfolio "About Me" page.
NOTE: The comments in this file describe sections, UI elements, and content context.
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

# Header

<!-- Website brand / logo -->
**tahsin2155.github.io**

<!-- Main navigation -->
- [Home](./)
- [About](about)
- [Projects](projects/)
- [Contact](#contact)


---

# About Me

<!--
SOURCE-ONLY HEAD DETAILS:
Open Graph and Twitter cards use the page title "About — Tahsin Ali Abtahi", the page description, and the shared 1200x630 og-image.png.
The canonical URL is https://tahsin2155.github.io/about.
JSON-LD describes Tahsin as a schema.org Person with jobTitle, description, sameAs profiles, image, and knowsAbout values.
-->

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
I built things really badly, at first ; ), then less badly, and I keep improving and learning 
(sometimes, or maybe a little bit more often, I hit up AI as well for help, uk!).....


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

<!--
SOURCE-ONLY TIMELINE DETAILS:
The timeline contains ten entries but JavaScript initially shows only the newest three.
The toggle is hidden until JavaScript confirms folding is needed, then exposes the seven older entries and updates aria-expanded and the "+{{total entries - 3}} earlier" count.
Expanding changes the label to "Hide full timeline".
Without JavaScript, all entries remain visible.
When collapsing from lower on the page, JavaScript may scroll the timeline back into view.
-->


---

# Skills

<!--
SOURCE-ONLY SKILL-ICON DETAILS:
Python, HTML, Streamlit, Flask, and GitHub icons load lazily from Simple Icons CDN.
The CSS icon loads from SVG Repo.
Mathematics, Physics & Science, and Problem Solving use Lucide icons rendered after DOMContentLoaded.
Image icons have empty alt text because the visible skill names provide the labels.
-->

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

<!-- Section eyebrow -->
`// LET'S CONNECT`

## Get in Touch

I'd love to connect with mentors, fellow builders, or anyone curious about the same things I am — always up for a good conversation or a collaboration on something interesting.  
(Still in high school, so I'm not looking for internships or paid work right now — just good people and good ideas.)


<!-- Social / profile links -->
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

<!-- Form field: name -->
**NAME**

Placeholder: `Your name`

<!-- Form field: email -->
**EMAIL**

Placeholder: `you@example.com`

<!-- Form field: subject -->
**SUBJECT**

Placeholder: `What would you like to talk about?`

<!-- Form field: message -->
**MESSAGE**

Placeholder: `Write your message...`

<!-- Form submit button -->
[Send message]


---

<!-- Footer -->
© 2026 Tahsin Ali Abtahi


<!--
SOURCE DETAILS FROM about.html and assets/js/main.js:
- Page title: "About — Tahsin Ali Abtahi".
- SEO description: "About Tahsin Ali Abtahi — 12th standard student, self-taught Python developer, hackathon team lead. My coding journey from Minecraft redstone to shipping web apps.".
- Canonical URL: https://tahsin2155.github.io/about.
- The timeline contains 10 entries and has data-visible="3". JavaScript initially shows the newest three and sets the button to "Show full timeline" with "+7 earlier"; expanding changes it to "Hide full timeline".
- The timeline toggle is hidden until JavaScript confirms that folding is needed.
- Skill icon sources include Simple Icons for Python, HTML5, Streamlit, Flask, and GitHub; CSS uses SVG Repo; Mathematics, Physics & Science, and Problem Solving use Lucide icons.
- Contact form: POST to https://formspree.io/f/xwlpvooz; hidden subject: "New message from tahsin2155.github.io".
- Social URLs: LinkedIn https://www.linkedin.com/in/tahsinaliabtahi/, Instagram https://www.instagram.com/tahsin_2155, GitHub https://github.com/Tahsin2155.
-->