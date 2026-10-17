# HTML writer

Use this to update **one page's HTML** from its Markdown. Tell it which page.

```markdown
# Prompt: Update One Page's HTML From the Markdown

You are working on my personal website. The repository contains the real
website source (HTML, CSS, JS) and a set of Markdown files in `content/` that
are the **source of truth** for what each page says and how it behaves.

Read `tools/content-format.md` first. It explains the file layout, front
matter, `INCLUDE:` markers, `CHANGE:` directives, technical notes and
timestamps. Everything below assumes you have read it.

## One page at a time

I will tell you which page to update. If I haven't named one, ask me which
page and wait. Update only that page's HTML (the `html` field in its front
matter). Do not touch other pages' HTML.

## What to read

1. `content/_site.md` (shared header, contact section, footer, site-wide
   technical notes).
2. The Markdown file for the page I named.
3. The page's current HTML, plus `assets/css/style.css` and `assets/js/main.js`
   where behavior is involved.

## What to do

1. Compare the Markdown with the HTML and make the HTML show exactly what the
   Markdown says: every visible piece of text, link, tag, label, placeholder
   and button, in the right order. Always compare the real content. Do not skip
   a page because its timestamps match.
2. Apply the front matter: `title`, `description` and `canonical` go into the
   page's `<head>` (and the matching Open Graph, Twitter and JSON-LD values);
   `nav_active` is the item that gets `aria-current="page"`.
3. Resolve each `INCLUDE:` marker with the section of the same name in
   `_site.md`. Use the page's own override where the page gives one.
4. Treat the `CHANGE:` comments as authoritative instructions and implement
   them, including JS and DOM behavior, not only visible text.
5. Treat the TECHNICAL NOTES (the page's own block and the site-wide block in
   `_site.md`) as the specification for behavior, accessibility, metadata and
   storage. If the code does something different and no `CHANGE:` explains it,
   do not guess: report the difference.
6. Preserve the existing design. Do not redesign layout, spacing, typography,
   colors, cards, buttons, icons, animations, hover states or responsive
   behavior. Change only what the Markdown asks for. Edit shared CSS or JS only
   when the page truly needs it, keep the edit minimal, and tell me which other
   pages it could affect.

## Afterwards

- Remove each `CHANGE:` comment you implemented, and update the page's
  TECHNICAL NOTES so they describe the new behavior. Do not change anything
  else in the Markdown. In particular, do not reword content and do not change
  `last_edited`.
- Set the HTML comment `<!-- content last edited: YYYY-MM-DD -->` (right after
  `<!DOCTYPE html>`) to the later of the page's `last_edited` and `_site.md`'s
  `last_edited`. Never use today's date.

## Report back

Give me a short summary: what you changed in the HTML, which `CHANGE:` comments
you implemented, and anything ambiguous or conflicting (Markdown versus code,
Markdown versus the site's URL conventions, missing information). If something
is unclear, flag it instead of guessing.
```


---


# Markdown technical-notes editor

Use this to bring a page's **TECHNICAL NOTES** in line with what the real code does. Tell it which page (or `_site.md`).

```markdown
# Prompt: Update the Technical Notes in a Markdown Content File

You are working on my personal website. Each file in `content/` has a
TECHNICAL NOTES block that records implementation details a screenshot cannot
show. `content/_site.md` holds the notes that apply to every page.

Read `tools/content-format.md` first. It explains the file layout and the
format of the notes block.

## One file at a time

I will tell you which Markdown file to work on. If I haven't named one, ask me
which and wait.

## What to do

1. Read the real source for that page: its HTML, `assets/css/style.css` and
   `assets/js/main.js`.
2. Compare what the code does with the file's TECHNICAL NOTES block (and, for a
   page, with the site-wide notes in `_site.md`).
3. Add anything the notes are missing, and fix anything that is now wrong:
   API calls and caching, storage, conditional or dynamic content, JS-driven
   behavior, form handling, structured data and meta tags, accessibility
   attributes, icon sources and alt text, anything else an editor or another AI
   would need and cannot see on the page.
4. Keep the format: one block per file, using the headings from
   `tools/content-format.md`, one fact per bullet. A fact that is true on every
   page belongs once in `_site.md`, not repeated per page.

## Rules

- Do not change any page content (visible text, headings, links, tags,
  placeholders) and do not change front matter or `last_edited`.
- Do not delete comments that are not technical notes (element labels,
  `CHANGE:`, `INCLUDE:`, section notes). If an existing note is wrong, correct
  it and tell me what you changed.
- Do not invent anything you cannot verify by reading the source. If something
  is ambiguous or you cannot find it in the code, say so.
- If the code and the notes disagree and the Markdown has a `CHANGE:` for it,
  leave the notes as they are: the HTML has not caught up yet.

## Output

Show me exactly which lines you added, changed or removed in the notes before
you apply them, so I can review them.
```
