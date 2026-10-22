# tahsin2155.github.io

Personal portfolio site for MD Tahsin Ali Abtahi.

Live site: https://tahsin2155.github.io

## What's inside

- **Home** (`index.html`): hero with animated role text, a short intro, project cards, GitHub stats pulled from the GitHub API, and a contact form.
- **About** (`about.html`): background, education, a coding-journey timeline, and skills.
- **Projects** (`projects/`): an index page plus one case-study page each for DayMark, MarkdStudio, Velin, Zipline and Handoff.
- **404** (`404.html`): a custom not-found page.
- **Sharing and SEO**: favicon image files (SVG, PNG sizes, ICO and an Apple touch icon), Open Graph and Twitter cards, JSON-LD (a Person on Home and About, a SoftwareApplication on each case study), canonical URLs, `sitemap.xml` and `robots.txt`.
- **Accessibility**: skip link, `aria-current` on the active nav link, `prefers-reduced-motion` respected, and content stays visible when JavaScript is off.

## Structure

```
.
├── index.html
├── about.html
├── 404.html
├── favicon.ico             copy of the favicon for browsers that request /favicon.ico
├── projects/               project index and case-study pages
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   ├── js/site-cursor.js   custom cursors, their settings and the footer cursor picker
│   └── img/                project icons, LinkedIn icon, social preview image
│       └── favicons/       favicon.svg, PNG sizes, favicon.ico, Apple touch icon
├── content/                Markdown source of truth for every page (see Content below)
│   └── projects/
├── tools/
│   ├── serve.py            local preview server that behaves like GitHub Pages
│   ├── scaffold.py         old page generator (do not run, see below)
│   ├── content-format.md   how the Markdown in content/ is written and read
│   └── prompt.md           AI prompts: update a page's HTML from its Markdown, update technical notes
├── sitemap.xml
└── robots.txt
```

## Tech stack

- HTML, CSS and plain JavaScript. No framework and no build step.
- Google Fonts (Sora, DM Mono)
- Lucide icons, loaded from unpkg
- Simple Icons (skill chips and social links), loaded from `cdn.simpleicons.org`
- GitHub REST API (the stats on the home page)
- Formspree (the contact form)
- Hosted on GitHub Pages

## Editing

The Markdown in `content/` is the source of truth for what each page says and how it behaves. Content is changed in the Markdown first, and then **one page's HTML** at a time is brought in line with it (see Content below). The HTML is not hand-edited for content. The nav, footer and `<head>` are repeated in every HTML file, so a change to any of them goes into `content/_site.md` (or the page's front matter) and then has to be synced into each page.

### Content

`content/` holds the content of the site as Markdown: `_site.md` for what every page shares (navigation, contact section, footer, site-wide technical notes), plus one file per page (`index.md`, `about.md`, `404.md`, and `projects/` for the projects index and each case study). Each file also carries front matter (title, description, canonical, last-edited date) and a block of technical notes.

The workflow is: edit the Markdown, then ask an AI to update **one page's HTML** from it using the prompt in `tools/prompt.md`. A `CHANGE:` comment in the Markdown asks for a structural or functional change. Every HTML file has a `<!-- content last edited: ... -->` line that should match the Markdown's `last_edited` date, so you can see at a glance whether a page is behind. The full format is in `tools/content-format.md`.

The sync is not only content: when a page's HTML is updated, also check that its date in `sitemap.xml` (see URLs below) matches the HTML's `content last edited` date.

### URLs

Pages are linked without `.html` (`/about`, `/projects/daymark`). GitHub Pages serves `about.html` at `/about`, so the files keep their `.html` names. When you add or rename a page:

- Link to it without `.html`.
- Use the same extensionless URL in its canonical link, its `og:url` and `sitemap.xml`.
- Set its `<lastmod>` in `sitemap.xml` to the date in the page's `<!-- content last edited: ... -->` comment, and update it whenever that comment changes. `robots.txt` allows everything and points at the sitemap, so it only changes if the site's URL changes.
- Keep paths relative and keep pages as files (`about.html`, not `about/index.html`), so `assets/` and `../assets/` keep resolving at each depth.
- The one exception is `404.html`. GitHub Pages serves it at whatever URL was missed (`/about/`, `/a/b/c`), so a relative path would break there. It uses root paths (`/assets/css/style.css`, `/about`, `/`) instead.

### Preview locally

Run this from the repo root and open http://localhost:8000:

```
python3 tools/serve.py
```

`python3 -m http.server` will not do here, because it cannot serve extensionless URLs. `tools/serve.py` follows the GitHub Pages rules: `/about` serves `about.html`, `/projects` redirects to `/projects/`, unknown URLs get `404.html`, and file names are case-sensitive. It accepts `--port` and `--bind` (use `--bind 0.0.0.0` to open the site from a phone on the same Wi-Fi). It never serves dot-files such as `.git`.

Fonts, icons, GitHub stats and the contact form need an internet connection.

## About `tools/scaffold.py`

`tools/scaffold.py` was written to generate every page from one script so the shared parts stayed identical. **It is out of date. Do not run it.**

- It writes straight into the repo root (its docstring says `./site`, but the code writes to the root). Running it overwrites `index.html`, `about.html`, `projects/*.html`, `404.html`, `sitemap.xml` and `robots.txt`, which reverts any hand edits.
- There have been many hand edits to the pages since it was last updated, so its output no longer matches the site. It also still writes `.html` links instead of the extensionless URLs the site now uses.

Update pages through the Markdown workflow described under Content, not by running the script. It is kept only for reference.

## Notes

- The visitor's cursor choice (the footer select) is saved in `localStorage` under `site-cursor`.
- The GitHub stats use the unauthenticated GitHub API, which is limited to 60 requests per hour per IP. Results are cached in `sessionStorage` for 10 minutes, and the stats show a dash if the request fails.
- The DayMark, MarkdStudio, Velin and Zipline icons are local files in `assets/img/`. Handoff uses a decorative Lucide icon instead of an image. The skill and social icons still load from external hosts.
