# HTML writer -

```markdown
# Prompt: Update the Website HTML From the Markdown Content

You are working on my personal site.

The repository contains the actual website source code and a set of 
Markdown files that represent the **intended content of each page**. Your 
job is to read those Markdown files carefully and update the actual website 
HTML/templates/components so that the website displays the content defined 
by the Markdown.

## Core Objective

Go through **all provided Markdown content files**, understand the page 
structure and content they describe, and then update the corresponding 
website pages in the source code.

The Markdown files are the **content source of truth**.

Do not simply display the Markdown itself. Use it as a specification and 
update the existing HTML/templates/components accordingly.

---

## Pages

Map the Markdown files to these website routes:

| Markdown Content | Website Route |
|---|---|
| `index.md` | `/` |
| `about.md` | `/about/` |
| `projects.md` | `/projects/` |
| `daymark.md` | `/projects/daymark/` |
| `markdstudio.md` | `/projects/markdstudio/` |
| `velin.md` | `/projects/velin/` |
| `zipline.md` | `/projects/zipline/` |
| `handoff.md` | `/projects/handoff/` |
| `404.md` | `404.html` |

Use the actual filenames and project structure in the repository when 
determining the exact mapping.

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

Only change the content and the HTML/template structure where necessary to 
represent the Markdown accurately.

Do not replace the current design with a generic Markdown renderer.

**Exception:** if a Markdown file explicitly describes a structural change 
(for example, a section going from showing 5 cards to showing 3, or a 
comment block marked `CHANGE:`), implement that structural change. "Preserve 
the design" means don't redesign things the Markdown didn't ask you to 
touch — it does not mean ignore a change the Markdown explicitly calls for. 
When in doubt about whether something is a content change or a design 
change, treat an explicit `CHANGE:` comment as authoritative and flag 
anything else ambiguous for review rather than guessing.

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

## 3. HTML Comments in Markdown Are Instructions

The Markdown files intentionally contain HTML comments. These are not 
decorative — they carry real instructions and technical context you need 
in order to implement the page correctly. Comments can appear:

- At the top of the file (page-level context: PAGE, PURPOSE, NOTE)
- Inline, next to the specific content they describe (e.g. a note next to 
  the GitHub Stats section explaining its caching behavior)
- In a `SOURCE DETAILS` block near the bottom (implementation notes 
  gathered from the real HTML/JS — page titles, meta descriptions, 
  canonical URLs, dynamic behaviors, endpoints, structured data, etc.)

Treat all three the same way: as instructions to follow, not text to 
ignore. A comment like:

    ```html
    <!-- CHANGE: The Home project grid now shows only 3 cards — Handoff, 
    Zipline, Velin, in that order — instead of all 5. Remove the "keep all 
    five cards in HTML, fold after first CSS grid row" JS behavior entirely. -->
    ```

means exactly what it says: change the actual DOM/JS behavior, not just 
the visible card text.

## 4. Sync the Last-Edited Timestamp

Every Markdown file's top comment block includes a line like:

    ```html
    <!-- LAST EDITED: 2026-09-22 -->
    ```

along with an instruction to place a matching comment in the corresponding 
HTML file (near `<!DOCTYPE html>` or the top of `<head>`), for example:

    ```html
    <!-- content last edited: 2026-09-22 -->
    ```

When you update a page's HTML from its Markdown, **add or update this 
comment in the HTML file using the date from the Markdown's `LAST EDITED` 
line** — not today's date, not the date you're doing the implementation 
work. This lets both of us check at a glance whether the live HTML has 
been synced to the latest content edit, or is still behind.

## 5. When Markdown and Code Disagree

If a Markdown file's content instructions conflict with something in the 
existing code that isn't addressed by an explicit `CHANGE:` comment (for 
example, the Markdown implies a route or filename that doesn't match what 
exists in the repo), don't silently pick one — flag the conflict and ask, 
or note it clearly in your output so it can be resolved.

```


================================================================================



# Markdown editor -


```markdown
# Prompt: Add Technical Details to the Markdown Content Files

You are working on my personal site. It has a set of Markdown files (one per 
page) that describe each page's content. These were originally generated 
from screenshots, so they're accurate on visible content and layout, but 
they're missing technical/implementation details that only exist in the 
actual source code — things a screenshot can't show.

## Your Job

1. Read the real website source code: HTML, CSS, and JavaScript files.
2. For each Markdown file, find every place where the real implementation 
   has behavior, data, or logic that the Markdown doesn't currently 
   document — caching, API calls, conditional rendering, animations tied to 
   state, storage mechanisms, form handling, structured data, accessibility 
   attributes, anything a content editor or another AI would need to know 
   but can't infer from the visible page alone.
3. Add that detail as an HTML comment **placed next to the relevant content 
   in the Markdown**, not dumped in one block at the bottom.

Example: if the GitHub stats section caches its data in sessionStorage for 
10 minutes, that comment goes right next to the GitHub Stats section in the 
Markdown, like:

    ```html
    <!-- GitHub stats are cached in sessionStorage under gh-stats-cache for 
    10 minutes. Failed requests display an em dash. -->
    ```

...not folded into a general notes block elsewhere in the file.

## What Counts as a Technical Detail Worth Adding

- API calls and what they fetch, cache, or key on
- Data storage (localStorage/sessionStorage/IndexedDB) and what's kept 
  where
- Dynamic/conditional content (things that change based on state, screen 
  size, reduced-motion settings, etc.)
- Form submission endpoints, hidden fields, and what they're for
- JS-driven behaviors: animations, folding/unfolding, typing effects, 
  rotation logic
- Structured data (JSON-LD, schema.org, Open Graph, Twitter Card tags)
- Accessibility details: aria attributes, alt text, decorative vs. 
  meaningful icons
- Canonical URLs, meta tags, page titles
- Anything else present in the source code that isn't visible in a 
  screenshot but would matter to someone editing content or rebuilding 
  the page

## What NOT to Do

- Do not rewrite, reword, or "improve" any existing content in the 
  Markdown. Your job is additive — you are documenting the implementation, 
  not touching the copy.
- Do not remove existing HTML comments unless they are factually wrong 
  (e.g. describing a role list that's since changed) — in that case, flag 
  the discrepancy rather than silently deleting it, so I can review it.
- Do not consolidate scattered technical comments into a single bottom 
  block — keep them near their relevant content.
- Do not invent details you can't verify by reading the actual source 
  files. If something is ambiguous or you can't find it in code, say so 
  instead of guessing.

## Output

For each Markdown file, show me exactly what comments you're adding and 
where, before/if you apply them directly — I want to be able to review the 
additions.
```