# tahsin2155.github.io

Personal portfolio site for MD Tahsin Ali Abtahi.

Live site: https://tahsin2155.github.io

## What's inside

- **Home** (`index.html`): hero with animated role text, a short intro, project cards, GitHub stats pulled from the GitHub API, and a contact form.
- **About** (`about.html`): background, education, a coding-journey timeline, and skills.
- **Projects** (`projects/`): an index page plus one case-study page each for DayMark, MarkdStudio, Velin, Zipline and Handoff.
- **404** (`404.html`): a custom not-found page.
- **Sharing and SEO**: Open Graph and Twitter cards, JSON-LD (Person), canonical URLs, `sitemap.xml` and `robots.txt`.
- **Accessibility**: skip link, `aria-current` on the active nav link, `prefers-reduced-motion` respected, and content stays visible when JavaScript is off.

## Structure

```
.
├── index.html
├── about.html
├── 404.html
├── projects/          project index and case-study pages
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── img/           project icons, LinkedIn icon, social preview image
├── tools/build.py     old page generator (do not run, see below)
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

The pages are edited by hand. The nav, footer and `<head>` are repeated in every page, so a change to any of them has to be made in each file.

To preview locally, run this from the repo root and open http://localhost:8000:

```
python3 -m http.server 8000
```

Fonts, icons, GitHub stats and the contact form need an internet connection.

## About `tools/build.py`

`tools/build.py` was written to generate every page from one script so the shared parts stayed identical. **It is out of date. Do not run it.**

- It writes straight into the repo root (its docstring says `./site`, but the code writes to the root). Running it overwrites `index.html`, `about.html`, `projects/*.html`, `404.html`, `sitemap.xml` and `robots.txt`, which reverts any hand edits.
- There have been many hand edits to the pages since it was last updated, so its output no longer matches the site.

Edit the HTML files directly. The script is kept only for reference.

## Notes

- The GitHub stats use the unauthenticated GitHub API, which is limited to 60 requests per hour per IP. Results are cached in `sessionStorage` for 10 minutes, and the stats show a dash if the request fails.
- The DayMark, MarkdStudio, Velin and Zipline icons are local files in `assets/img/`. The skill and social icons still load from external hosts.
