# Prompt: Update the Website HTML From the Markdown Content

You are working on my personal portfolio website.

The repository contains the actual website source code and a set of Markdown files that represent the **intended content of each page**. Your job is to read those Markdown files carefully and update the actual website HTML/templates/components so that the website displays the content defined by the Markdown.

## Core Objective

Go through **all provided Markdown content files**, understand the page structure and content they describe, and then update the corresponding website pages in the source code.

The Markdown files are the **content source of truth**.

Do not simply display the Markdown itself. Use it as a specification and update the existing HTML/templates/components accordingly.

---

## Pages

Map the Markdown files to these website routes:

| Markdown Content | Website Route |
|---|---|
| `home.md` | `/` |
| `about.md` | `/about/` |
| `projects.md` | `/projects/` |
| `daymark.md` | `/projects/daymark/` |
| `markdstudio.md` | `/projects/markdstudio/` |
| `velin.md` | `/projects/velin/` |
| `zipline.md` | `/projects/zipline/` |
| `handoff.md` | `/projects/handoff/` |

Use the actual filenames and project structure in the repository when determining the exact mapping.

---

# Important Rules

## 1. Preserve the Existing Design

The screenshots and existing website already establish the visual design.

**Do not redesign the website.**

Preserve:

- Layout
- Spacing
- Typography
- Font sizes
- Font weights
- Colors
- Borders
- Cards
- Buttons
- Navigation
- Footer
- Responsive behavior
- Existing animations
- Existing icons
- Existing background/grid effects
- Existing hover states
- Existing transitions

Only change the content and the HTML/template structure where necessary to represent the Markdown accurately.

Do not replace the current design with a generic Markdown renderer.

---

## 2. Markdown Is the Content Source of Truth

For every page:

1. Read the complete Markdown file.
2. Identify every visible piece of content.
3. Locate the corresponding element in the existing HTML/template/component.
4. Replace/update the existing content.
5. Preserve the surrounding design.

The Markdown may contain:

- Large headings
- Small headings
- Eyebrow text
- Paragraphs
- Lists
- Tags
- Buttons
- Links
- Breadcrumbs
- Form labels
- Placeholder text
- Metadata
- Footer text
- Navigation labels
- Project information
- Dynamic content descriptions

Every piece of actual page text should be represented correctly.

---

# 3. HTML Comments in Markdown Are Instructions

The Markdown files intentionally contain HTML comments such as:

```html
<!--
PAGE: Projects
PURPOSE: Portfolio page showcasing shipped and deployed projects.
-->