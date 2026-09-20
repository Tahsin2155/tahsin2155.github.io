<!--
PAGE: Zipline Project Case Study
PURPOSE: Detailed case-study page for the Zipline project.
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

# Zipline

<!-- Breadcrumb navigation -->
[Home](../) / [Projects](./) / Zipline

## Zipline

A personal, self-hosted file transfer app with login, per-user storage, nested folders, search, previews and a notes scratchpad, built with Flask and SQLite.


---

# What it is

Zipline is a personal file transfer app that I run myself. It started as a way to move files between my own devices, and grew into a small private drive: you log in, upload files, organise them into folders, and download them from another device.

It has no external services. Everything runs on Flask with SQLite databases. It is self-hosted, so anyone can run their own copy for themselves and the people they choose.


---

# What it can do

- **Accounts:** a login for each user, with separate storage for each.
- **Folders:** nested folders you can create, rename and delete, with breadcrumbs, and files can be moved between them.
- **Search:** instant filename search across all folders.
- **Previews:** images and PDFs open inline, and text or code files show in a pop-up, with a download link if the file is large.
- **Scratchpad:** a notes page with one autosaving text box per user and a copy button, not tied to any file.


---

# How it grew

The first version was a single file. The current version splits the app into separate parts for login, files and notes (Flask blueprints), keeps its settings in one place, and gives every user their own SQLite database and upload folder.


---

# Security choices

Because it holds private files, I added protections as I went:

- Login lockout after repeated failed attempts.
- CSRF protection on forms.
- A blocklist of dangerous file extensions.
- A storage quota for each user.
- Older plain-text passwords are converted to hashes automatically the first time that user logs in.

The extension list is a blocklist, not an allowlist, because the app is meant to move any kind of file for personal use.


---

# Deployment

My own copy is live on PythonAnywhere, and the project is set up for that platform. PythonAnywhere can't run a background cleanup loop inside a web app, so expired-file cleanup is a separate script that runs once a day on a schedule, instead of a thread inside Flask.

My copy is private, so there is no public demo, but the source is on GitHub for anyone who wants to host their own.


---

<!--
SIDEBAR: Project metadata and quick links.
-->

## Project Details

**STATUS**  
Live on PythonAnywhere (private)

**BUILT WITH**  
Python, Flask, SQLite

**WHEN**  
August 2026

**TOPICS**  
`Python` `Flask` `SQLite` `Self-hosted`

---

<!-- GitHub project link -->
[GitHub repo →](https://github.com/Tahsin2155/zipline)


---

<!--
DRAFT CONTENT NOTICE:
The current write-up was drafted from the project's public README on GitHub.
This notice is intended to be replaced once the case study is rewritten.
-->

> **Draft content.** This write-up was drafted from the project's public README on GitHub.  
> Replace it with your own notes, screenshots, and details.


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
SOURCE DETAILS FROM projects/zipline.html:
- Page title: "Zipline — Tahsin Ali Abtahi".
- SEO description: "A personal, self-hosted file transfer app with login, per-user storage, nested folders, search, previews and a notes scratchpad, built with Flask and SQLite.".
- Canonical URL: https://tahsin2155.github.io/projects/zipline.
- Structured data identifies Zipline as a SoftwareApplication whose source URL is https://github.com/Tahsin2155/zipline.
- Project image alt text: Zipline icon.
- Breadcrumb links: ../ (Home) and ./ (Projects).
- Previous project navigation is velin; next project is handoff.
- Contact form: POST to https://formspree.io/f/xwlpvooz; hidden subject: "New message from tahsin2155.github.io".
- Social URLs: LinkedIn https://www.linkedin.com/in/tahsinaliabtahi/, Instagram https://www.instagram.com/tahsin_2155, GitHub https://github.com/Tahsin2155.
-->