---
page: "Zipline Project Case Study"
route: "/projects/zipline"
html: "projects/zipline.html"
purpose: "Detailed case-study page for the Zipline project."
title: "Zipline — Tahsin Ali Abtahi"
description: "A self-hosted file transfer app with login, folders, search, previews and notes, built with Flask and SQLite."
canonical: "https://tahsin2155.github.io/projects/zipline"
nav_active: "Projects"
last_edited: 2026-10-18
---

# Header

<!-- INCLUDE: header -->


---

# Zipline

<!-- Breadcrumb navigation -->
[Home](../) / [Projects](./) / Zipline

## Zipline


A self-hosted file transfer app with login, folders, search, previews and notes, built with Flask and SQLite.


---

# What it is

Zipline is a personal file transfer app that I run myself. It started as a way to move files between my own devices, and grew into a small private drive: you log in, upload files, organise them into folders, and download them from another device.

The server needs no external services: everything runs on Flask with SQLite. It is self-hosted, so anyone can run their own copy for themselves and the people they choose, for noncommercial use.


---

<!--
CHANGE: Add a new section "Why I built it" after "What it is". It is plain paragraphs. Use the same section styling as the other sections.
-->

# Why I built it

I needed an easy way to share files between two computers over the internet. If I had a file on my computer and needed it on my school's computer, and vice versa, there was no simple way to get it there. That's where the idea came from.


---

# What it can do

- **Accounts:** a login for each user, with separate storage for each. There's no sign-up page. Whoever runs the app creates users with a command-line script.
- **Folders:** nested folders you can create, rename and delete, with breadcrumbs, and files can be moved between them.
- **Search:** instant filename search across all folders.
- **Previews:** images and PDFs open inline, and text or code files show in a pop-up, with a download link if the file is large. There's a fullscreen preview too.
- **Notes:** a scratchpad page where you can keep multiple notes, each with its own title. They autosave, and there's a copy button in the editor.
- **Auto-delete:** files are deleted after 5 days by default (you can change it), by a cleanup script you schedule.
- **Small things:** inline delete confirmations instead of pop-ups, and app icons with a web manifest.


---

<!--
CHANGE: Add a new section "How it's built" after "What it can do". It is plain paragraphs, no bullets. The paragraph that starts with the bold label "About AI:" is a normal paragraph with a bold lead-in. Use the same section styling as the other sections.
-->

# How it's built

Zipline is a Flask app with Jinja templates, and Bootstrap for the front end, loaded from a CDN. The code is split into Flask blueprints (login, files and notes), created by an app factory. Data lives in SQLite, uploaded files sit on disk, and users and their login-lockout counters are stored in a `users.json` file. Passwords are hashed with Werkzeug.

**About AI:** there's no clean split. The first prototype was mine, and the UI is AI's. I did the feature planning and worked out how to carry things out, and after planning, AI did the heavy lifting of writing the code, though I also made a lot of small changes in the code myself.


---

# How it grew

I was learning Flask and got curious about moving a file with a form's file upload and a POST request. I prototyped it myself, and it was really glitchy, full of bugs and full of security problems. At that point I handed it to AI to work on.

From there it kept growing. I came up with ideas, and AI and I both made changes, finalised them and pushed them. The first version was simple, with no app factory. Now the app is split into separate parts for login, files and notes (Flask blueprints), keeps its settings in one place, and has folders and a scratchpad.


---

# Security choices

Because it holds private files, I added protections as I went:

- Passwords are stored as hashes.
- Login lockout after repeated failed attempts.
- CSRF protection on forms.
- A blocklist of dangerous file extensions.
- A storage quota for each user.
- Older plain-text passwords are converted to hashes automatically the first time that user logs in.

The extension list is a blocklist, not an allowlist, because the app is meant to move any kind of file for personal use.


---

# Deployment

My own copy is live on PythonAnywhere, and the project is set up for that platform. PythonAnywhere can't run a background cleanup loop inside a web app, so expired-file cleanup is a separate script that runs once a day on a schedule, instead of a thread inside Flask.

My copy is private, so there is no public demo, but the source is on GitHub for anyone who wants to host their own, and there's a self-hosting guide in the repo. The licence is PolyForm Noncommercial.


---

<!--
CHANGE: Add a new section "What I learned" after "Deployment". It is a bullet list where each item starts with a bold label. Use the same section styling as the other sections.
-->

# What I learned

- **Flask:** a lot about how it works, including blueprints and the app factory.
- **Security:** authentication and password hashing.
- **Databases:** a small bit of SQL and database management.


---

<!--
CHANGE: Add a new section "Limits and next steps" after "What I learned". It is a bullet list where each item starts with a bold label, followed by one closing line of plain text. Use the same section styling as the other sections.
-->

# Limits and next steps

- **Files are deleted after 5 days by default.** It's for moving files, not for keeping them.
- **Size limits:** 100 MB per file and 100 MB per user by default, both adjustable.
- **File previews need a security fix.**

Next, I want to fix the preview security, and after that add folder download as a zip.


---

<!--
SIDEBAR: Project metadata and quick links.
-->

## Project Details

**STATUS**  
Live on PythonAnywhere (private)

**BUILT WITH**  
Python, Flask, SQLite, Jinja, Bootstrap, Werkzeug

**WHEN**  
August 2026

**TOPICS**  
`Python` `Flask` `SQLite` `Self-hosted`

---

<!-- GitHub project link -->
[GitHub repo →](https://github.com/Tahsin2155/zipline)


---

<!--
PROJECT NAVIGATION:
Previous project: Velin
Next project: Handoff
-->

### Previous

[← Velin](velin)


### Next

[Handoff →](handoff)


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
- The project icon is lazy-loaded with fixed dimensions and meaningful alt text ("Zipline icon").

HEAD & METADATA
- JSON-LD includes the repository URL https://github.com/Tahsin2155/zipline.
-->
