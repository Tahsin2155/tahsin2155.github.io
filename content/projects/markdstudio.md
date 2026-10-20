---
page: "MarkdStudio Project Case Study"
route: "/projects/markdstudio"
html: "projects/markdstudio.html"
purpose: "Detailed case-study page for the MarkdStudio project."
title: "MarkdStudio — Tahsin Ali Abtahi"
description: "A browser-based Markdown editor with live preview and tabs for multiple documents, stored only on your device."
canonical: "https://tahsin2155.github.io/projects/markdstudio"
nav_active: "Projects"
last_edited: 2026-10-18
---

# Header

<!-- INCLUDE: header -->


---

# MarkdStudio

<!-- Breadcrumb navigation -->
[Home](../) / [Projects](./) / MarkdStudio

## MarkdStudio


A browser-based Markdown editor with live preview and tabs for multiple documents, stored only on your device.


---

# What it is

MarkdStudio is a Markdown editor that runs entirely in your browser. You write on one side and see the rendered result live on the other, and you can keep several documents open at once in tabs, like browser tabs.

There's no account and no server. Your documents are stored on your own device, in the browser.


# Why I built it

I wanted a Markdown editor that was fast, rendered live and was simple to start, with my data stored only on my device and no account to create.

The thing I cared about most was tabs. I wanted several documents open at once, browser-tab style, with an easy way to start a new one or delete one. Most of the features I wanted already existed in other editors, but I couldn't find one that had them all together, and none had the tab system. (Maybe one does and I just never found it.)

A few extras were on my wish list too: editing a file on my disk straight from the browser without installing an app, and different themes and styles.


# What it can do

- **Tabs:** keep several documents open at once, with an unsaved-changes indicator on each tab, and start a new one or close one easily.
- **Four modes:** Split, Write, Preview and Inline, where you edit right inside the rendered text.
- **Code editor:** syntax highlighting, line numbers, bracket matching, multi-cursor, and find/replace with regex.
- **Rich Markdown:** Mermaid diagrams, KaTeX math, callouts, footnotes, task lists, tables, emoji shortcodes and highlighted code blocks.
- **Table of contents:** it builds from your headings and tracks where you are.
- **Edit files on your disk:** open and save real files straight from the browser, in browsers that support it.
- **Preview styles:** five to pick from (GitHub, Documentation, Blog, Minimal and Academic), plus light and dark.
- **Export:** HTML, PDF (margin, orientation and paper size), print, an embeddable HTML snippet, or a plain Markdown file.


# How it's built

MarkdStudio is a static site with no backend: plain HTML, CSS and JavaScript, hosted on Netlify. The editor is CodeMirror 5, and the rendering uses marked.js, highlight.js, KaTeX, Mermaid and DOMPurify. PDF export uses html2pdf.js. All of those load from CDNs.

Your documents are saved in your browser's IndexedDB, and your settings in localStorage, so your documents never leave your device.

**About AI:** MarkdStudio is entirely vibe coded. AI wrote all of the code. The idea and the list of features I wanted came from me, and I use it regularly.


# What I learned

- **Working with AI:** how to use it efficiently to get the best output, how to manage its work, and how to approach a problem even when AI is writing the code.
- **Browser storage:** how localStorage and IndexedDB work.
- **SEO and launching:** a lot about SEO, getting indexed by search engines, optimizing a site, and Google Analytics.


# Limits and next steps

- **Deleted documents are gone for good.** There's no trash or undo.
- **Your documents only live in your browser.** If the browser clears its data, they're lost.
- **The Inline mode isn't good.**
- **Print and PDF export are still a bit glitchy.** Print works a little better than PDF download.

My next step, maybe, is a v2 built a better way, with a better Markdown engine and rendering that looks more like GitHub's.


---

<!--
SIDEBAR: Project metadata and quick links.
-->

## Project Details

**STATUS**  
Live

**BUILT WITH**  
HTML, CSS, JavaScript, CodeMirror 5, marked.js, highlight.js, KaTeX, Mermaid, DOMPurify, html2pdf.js, IndexedDB, Netlify

**WHEN**  
March 2026

**TOPICS**  
`JavaScript` `Markdown` `Editor` `Vibe Coded`

---

<!-- External project links -->
[Open live app →](https://markdstudio.netlify.app)

[GitHub repo →](https://github.com/Tahsin2155/markdstudio)


---

<!--
PROJECT NAVIGATION:
Previous project: Velin
Next project: DayMark
-->

### Previous

[← Velin](velin)


### Next

[DayMark →](daymark)


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
- The project icon is lazy-loaded with fixed dimensions and meaningful alt text ("MarkdStudio icon").

HEAD & METADATA
- JSON-LD includes the live URL https://markdstudio.netlify.app.
-->
