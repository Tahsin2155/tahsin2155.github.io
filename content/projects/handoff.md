---
page: "Handoff Project Case Study"
route: "/projects/handoff"
html: "projects/handoff.html"
purpose: "Detailed case-study page for the Handoff project."
title: "Handoff — Tahsin Ali Abtahi"
description: "A prototype agent that operates a Windows PC from a plain-language task, using a Gemini computer-use model and PyAutoGUI."
canonical: "https://tahsin2155.github.io/projects/handoff"
nav_active: "Projects"
last_edited: 2026-10-19
---

# Header

<!-- INCLUDE: header -->


---

# Handoff


<!-- Breadcrumb navigation -->
[Home](../) / [Projects](./) / Handoff

## Handoff

A prototype agent that operates a Windows PC from a plain-language task, using a Gemini computer-use model and PyAutoGUI.


---

# What it is

Handoff is an agent that operates a Windows PC. You type a task, like "open the browser and search for the latest Python release", and it looks at the screen, picks the next action, and moves the mouse and keyboard to do it, the way a person would.

It's an early prototype. It only runs on Windows for now, and there's no live demo.


# Why I built it

I already had a plan to build something that lets AI use my PC. It would help me figure things out when I'm stuck, and it could even do some of my work while I'm busy with something else.


# How it works

It runs in a loop: see, decide, act, see again. It takes a screenshot and sends it to a Gemini computer-use model along with the task. The model replies with the next action: a click, a scroll, some typing. Handoff carries that out with PyAutoGUI, takes a new screenshot, and sends it back. That repeats until the model says it's done, and then Handoff asks if I want to give it another instruction.

The model gives coordinates on a 0–999 scale instead of real pixels, so Handoff converts them using the screen size. That way the same output works at any resolution.


# How it's organised

I split the code into three jobs so I can change one without rewriting the others:

- **Vision:** capturing the screen and encoding the image.
- **Reasoning:** the Gemini computer-use model.
- **Execution:** `hands.py`, which turns the model's function calls into mouse and keyboard actions through one dispatch table.

`main.py` ties them together and keeps the conversation going between turns.


# How it's built

Handoff is written in Python. It uses Google's `google-genai` SDK to talk to a Gemini computer-use model through the Interactions API, and `PyAutoGUI` to move the mouse and type. The code currently uses `gemini-3.5-flash-lite`, and the API key goes in a `.env` file. Each turn it passes the previous interaction ID, so the model keeps the context of the task.

**About AI:** I wrote all of the app's code myself: about 930 lines of Python, from the execution layer to the Gemini API calls. The AI in this project is the Gemini model Handoff controls the PC with.


# How it grew

I started with a plain idea: let an AI see my screen and decide what to do. The obvious way is to take a screenshot, ask a general-purpose model where to click, and click there with PyAutoGUI. But general models are bad at working out exact coordinates from an image, so I looked for something better.

I tried a few ideas and dropped them:

- **Windows Voice Access:** I planned to feed it synthetic speech so voice commands could drive the PC with no coordinates. Speech recognition added one more thing that could go wrong, so I dropped it.
- **UI Automation:** I looked at controlling apps through their element trees. It works well for native Windows apps but is patchy or empty for Electron apps, canvas apps and games, and I wanted something that works everywhere.
- **OmniParser:** I planned a vision layer with it. It needs a lot of memory and ideally a GPU, and my laptop has neither. I tried it on Google Colab and it crashed, because I had left Colab on the default CPU runtime.

Then I found that Google's free-tier Gemini models include a computer-use capability. It takes a screenshot and a task and gives back the actions directly, so it replaces the detection and reasoning steps I'd planned as separate pieces. I dropped OmniParser and UI Automation and built the whole thing around that one model. I used Google's SDK directly rather than a model router, because computer-use output formats differ between providers, such as Gemini's 0–999 coordinates.

Once I'd learned the pieces I needed (the SDK and the computer-use tool, the coordinate maths, PyAutoGUI, the agent loop), it worked end to end, and I named it Handoff after the `hands.py` module that does the actions.


# Safety and debugging

Not every action just runs. When the model flags one as needing confirmation, Handoff beeps and waits: `Shift` approves, `Ctrl` denies. Actions the model marks as blocked get rejected. It's a simple safety check for a prototype, not a real security boundary.

It also plays different beeps for errors, finished steps and confirmation requests, so I notice even when I'm not looking at the terminal.

Every run writes a Markdown log of the task and the model's replies, which helps me tell whether a failure came from the model or from my code.


# What I learned

- **The Gemini Python SDK and the Interactions API:** how to send a computer-use model screenshots and keep the context going across turns.
- **Building the logic myself:** I wrote a lot of logic while figuring out how it would all work.


# Limits and next steps

- **It's hit or miss.** The model decides what to do, so how well a task goes depends on how accurate the AI model is. The part I wrote works well: the mouse coordinates are right, and the actions and interactions with the computer are accurate.
- **Windows only,** because it uses the `winsound` module for alerts.
- **It works through the screen,** so results also depend on screen layout and timing.

**Next:** I want to add cross-platform support, sturdier safety checks and better error recovery.


---

<!--
SIDEBAR: Project metadata and quick links.
-->

## Project Details

**STATUS**  
Prototype, Windows only

**BUILT WITH**  
Python, Gemini computer-use API, PyAutoGUI, google-genai

**WHEN**  
September 2026

**TOPICS**  
`Python` `Gemini` `PyAutoGUI` `Prototype`

---

<!-- GitHub project link -->
[GitHub repo →](https://github.com/Tahsin2155/handoff)


---

<!--
PROJECT NAVIGATION:
Next project: Zipline
-->

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
- The project heading uses a decorative Lucide mouse-pointer-click icon with aria-hidden="true" rather than an image, so it has no alt text.

HEAD & METADATA
- JSON-LD includes the repository URL https://github.com/Tahsin2155/handoff.

PROJECT NAVIGATION
- The next-project link points to Zipline.
-->
