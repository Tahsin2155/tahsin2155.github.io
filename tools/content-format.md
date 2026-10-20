# Content format

How the Markdown in `content/` describes the site, and how the HTML is kept in line with it.

## The idea

- `content/*.md` is the source of truth for **what each page says** and for **how it behaves** (technical notes).
- The HTML is not edited by hand for content. You edit the Markdown, then ask an AI to update **one page's HTML** from it (prompts in `tools/prompt.md`).
- You can also ask for a functional change by writing a `CHANGE:` comment in the Markdown (see below).

## Files

| Markdown | HTML file | Route |
|---|---|---|
| `content/_site.md` | shared by every page | — |
| `content/index.md` | `index.html` | `/` |
| `content/about.md` | `about.html` | `/about` |
| `content/projects/projects.md` | `projects/index.html` | `/projects/` |
| `content/projects/daymark.md` | `projects/daymark.html` | `/projects/daymark` |
| `content/projects/markdstudio.md` | `projects/markdstudio.html` | `/projects/markdstudio` |
| `content/projects/velin.md` | `projects/velin.html` | `/projects/velin` |
| `content/projects/zipline.md` | `projects/zipline.html` | `/projects/zipline` |
| `content/projects/handoff.md` | `projects/handoff.html` | `/projects/handoff` |
| `content/404.md` | `404.html` | any URL that does not exist |

`_site.md` holds everything that is the same on every page: the logo and navigation, the Get in Touch section (default blurb, social links, contact form), the footer, and the site-wide technical notes.

## Anatomy of a page file

1. **Front matter** (between `---` lines): `page`, `route`, `html`, `purpose`, `title`, `description`, `canonical`, `nav_active`, `last_edited`. The 404 page also has `robots` and `og_url`. `title`, `description` and `canonical` are what goes into the page's `<head>`; `nav_active` is the nav item marked `aria-current="page"`.
2. **Body**: one `# Section` heading per section of the page, in page order, separated by `---`. This is the content.
3. **Include markers**: `<!-- INCLUDE: header -->`, `<!-- INCLUDE: contact -->`, `<!-- INCLUDE: footer -->`. At that spot the page uses the section with the same name from `_site.md`. A page may override part of it when it says so (the home page has its own contact blurb).
4. **Technical notes**: one `<!-- TECHNICAL NOTES ... -->` block at the end of the file.

## Reading the body

- Plain Markdown text is visible page content.
- A few headings are **structural labels** that do not show as text on the page: `Header`, `Footer`, `Social Links`, `Contact Form`, `Project List`, `Project Details`. The existing HTML decides how those areas look.
- Conventions used in the files: `` `// EYEBROW` `` is a section eyebrow; backticked words are tags/badges; `**LABEL**` followed by text is a fact card; `[Text →](url)` is a link or button; `[Text]` with no URL is a button (form submit, timeline toggle); `Placeholder: ...` is input placeholder text; `[hover: ...]` is hover text; `{{...}}` is a computed value.
- The comment right above a block says what kind of element it is (`<!-- Fact card -->`, `<!-- Project tags -->`). Trust it.

## Comments

| Comment | Meaning |
|---|---|
| Short label, e.g. `<!-- Section eyebrow -->` | What the next piece of content is. |
| `SECTION:`, `SIDEBAR:`, `TIMELINE:`, `PROJECT NAVIGATION:`, `DRAFT CONTENT NOTICE:` | Context about a section of content. |
| `CHANGE: ...` | An instruction to change the page's structure or behavior. Authoritative. |
| `INCLUDE: name` | Use that section of `_site.md` here. |
| `TECHNICAL NOTES` | How the page is built and behaves. Describes the intended current state. |

### CHANGE

A `CHANGE:` comment sits next to the content it affects. When the HTML has been updated to match it, the AI removes the comment and rewrites the TECHNICAL NOTES so they describe the new behavior. Open `CHANGE:` comments are the list of things the HTML is still missing.

### Technical notes

One block per file, with these headings where they apply: `HEAD & METADATA`, `BEHAVIOR`, `DATA & STORAGE`, `ASSETS & ICONS`, `NAVIGATION & ACCESSIBILITY`, `PROJECT CARDS`, `LINKS`, and so on. Each bullet is one fact. Site-wide facts live once in `_site.md`; a page's block only adds to them. The block describes what the HTML and JS actually do (verified against the code), not wishes; wishes go in `CHANGE:`.

## Timestamps

- Markdown: `last_edited: YYYY-MM-DD` in the front matter. Set it to the real date whenever you change the page's content or add a `CHANGE:`. When you change `_site.md`, update its `last_edited` too.
- HTML: `<!-- content last edited: YYYY-MM-DD -->` on the line after `<!DOCTYPE html>`.
- After updating a page, the AI copies the date into the HTML: the **later** of the page's `last_edited` and `_site.md`'s `last_edited`. Never today's date.
- If the HTML date is older than that, the HTML is behind. The stamp is a quick signal only; the AI still compares the actual content.

## Updating a page

1. Edit the Markdown and bump `last_edited`.
2. Run the HTML writer prompt and name the page.
3. The AI reads `_site.md` and that page's Markdown, updates that page's HTML (and nothing else), updates the technical notes if behavior changed, removes finished `CHANGE:` comments, sets the HTML stamp, and reports what it did and anything unclear.
