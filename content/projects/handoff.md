<!--
PAGE: Handoff Project Case Study
PURPOSE: Detailed case-study page for the Handoff project.
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

# Handoff

<!-- Breadcrumb navigation -->
[Home](../) / [Projects](./) / Handoff

## Handoff

A prototype agent that operates a Windows PC from a plain-language task, using a Gemini computer-use model and PyAutoGUI.


---

# What it is

Handoff is a prototype desktop automation agent. You type a task such as **"open the browser and search for the latest Python release"**, and Handoff carries it out by looking at the screen and using the mouse and keyboard, the way a person would.

It is an early prototype and runs on **Windows only** for now. It is not a finished product, and there is no live demo.


# How it works

Handoff runs a repeating loop: **see, decide, act, see again.**

- It captures a screenshot of the screen.
- It sends the screenshot and the task to a Gemini model that supports computer use, through the Interactions API.
- The model replies with the next action, such as a click, a scroll, or some typing.
- Handoff carries out that action with PyAutoGUI, then captures a new screenshot and repeats until the model says the task is finished.

The model returns coordinates on a normalized 0 to 999 scale. Handoff converts those to real pixels using the current screen size, so the same output works at any resolution.


# How it's organised

The code is split into three responsibilities, so each part can be changed without rewriting the others:

- **Vision:** screen capture and image encoding.
- **Reasoning:** the Gemini computer-use model.
- **Execution:** `hands.py`, which maps the model's function calls to mouse and keyboard actions through a single dispatch table.

`main.py` ties these together and keeps the conversation state between turns.


# Safety and debugging

Handoff does not run every action blindly. When the model flags an action as needing confirmation, Handoff plays an alert sound and waits: **Shift** approves and **Ctrl** denies. Actions marked as blocked are rejected automatically.

The repository is clear that this is a simple prototype safety mechanism and **not a complete security boundary**.

Every run also writes a Markdown log of the task and the model's responses, which makes it easier to tell whether a failure came from the model or from my code.


# Limits and next steps

- It only works on Windows, because it uses the `winsound` module for alerts.
- It works through the graphical interface, so results depend on screen layout, timing, and how accurate the model is.
- Planned work includes cross-platform support, sturdier safety checks, better error recovery, and more reliable long tasks.


---

<!--
SIDEBAR: Project metadata and quick links.
-->

## Project Details

**STATUS**  
Prototype, Windows only

**BUILT WITH**  
Python, Gemini computer-use API, PyAutoGUI

**WHEN**  
September 2026

**TOPICS**  
`Python` `Gemini` `PyAutoGUI` `Prototype`

---

<!-- GitHub project link -->
[GitHub repo →](https://github.com/Tahsin2155/handoff)


---

<!--
DRAFT CONTENT NOTICE:
The current write-up was drafted from the project's public README on GitHub.
This notice is intended to be replaced with the author's own case-study
content, screenshots, notes, and technical details.
-->

> **Draft content.** This write-up was drafted from the project's public README on GitHub.  
> Replace it with your own notes, screenshots, and details.


---

<!--
PROJECT NAVIGATION:
Previous project: Zipline
-->

### Previous

[← Zipline](zipline)


---

# Get in Touch

<!-- Section eyebrow -->
`// LET'S CONNECT`

## Get in Touch

I'd love to connect with mentors, fellow builders, or anyone curious about the same things I am — always up for a good conversation or a collaboration on something interesting.  
(Still in high school, so I'm not looking for internships or paid work right now — just good people and good ideas.)


### Social Links

[LinkedIn](https://www.linkedin.com/in/tahsinaliabtahi/)

[@tahsin_2155](https://www.instagram.com/tahsin_2155)

[Tahsin2155](https://github.com/Tahsin2155)


## Contact Form

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
SOURCE DETAILS FROM projects/handoff.html:
- Page title: "Handoff — Tahsin Ali Abtahi".
- SEO description: "A prototype agent that operates a Windows PC from a plain-language task, using a Gemini computer-use model and PyAutoGUI.".
- Canonical URL: https://tahsin2155.github.io/projects/handoff.
- Structured data identifies Handoff as a SoftwareApplication whose source URL is https://github.com/Tahsin2155/handoff.
- The case-study icon is a decorative Lucide mouse-pointer-click icon with aria-hidden="true"; it has no image alt text.
- Breadcrumb links: ../ (Home) and ./ (Projects).
- Previous project navigation is zipline; there is no next-project link.
- Contact form: POST to https://formspree.io/f/xwlpvooz; hidden subject: "New message from tahsin2155.github.io".
- Social URLs: LinkedIn https://www.linkedin.com/in/tahsinaliabtahi/, Instagram https://www.instagram.com/tahsin_2155, GitHub https://github.com/Tahsin2155.
-->