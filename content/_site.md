---
file: _site.md
purpose: "Content and technical notes shared by every page: brand, navigation, contact section, footer. Pages pull these in with INCLUDE markers."
last_edited: 2026-10-22
---

<!--
HOW THIS FILE WORKS
Each page file has markers written as HTML comments, like INCLUDE: header. Wherever a marker appears,
the section of this file with that name belongs at that spot in the page. A page can override the part it
says it overrides (for example the contact blurb); everything else is used as written here.
Editing a section here changes it on every page that includes it.
The sections below are named by the SECTION marker at their start.
-->


# Header

<!-- SECTION: header -->

<!-- Website logo / brand -->
**tahsin2155.github.io**

<!-- Primary navigation. Same four items, same order, on every page. -->
- [Home](/)
- [About](/about)
- [Projects](/projects/)
- [Contact](#contact)

<!-- Link targets are written root-relative here. In the HTML each page uses the form that fits its depth
(see "URLs" in the README); the 404 page uses root paths. On the 404 page the Contact link is /#contact.
The active item on each page is set by nav_active in that page's front matter. -->


---

# Get in Touch

<!-- SECTION: contact -->

<!-- Section eyebrow -->
`// LET'S CONNECT`

## Get in Touch

<!-- Default blurb. A page may override it (index.md does). -->
I'd love to connect with mentors, fellow builders, or anyone curious about the same things I am — always up for a good conversation or a collaboration on something interesting.  
(Still in high school, so I'm not looking for internships or paid work right now — just good people and good ideas.)


### Social Links

<!-- Social links -->
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

# Footer

<!-- SECTION: footer -->

<!-- Footer copyright -->
© 2026 Tahsin Ali Abtahi


<!-- Cursor picker: a labelled select in the bottom-right corner of the footer, on every page. It stays hidden unless the custom cursor is running (see CUSTOM CURSOR in the technical notes below). -->
Cursor

<!-- Picker options (the select's choices), in this order. assets/js/site-cursor.js fills them in from its own list of cursors. -->
- Crosshair
- Snappy ring
- Orbit comet
- Orbit snap
- Dot and ring
- System cursor

<!-- Cursor picker info: an info icon (a button) right after the select. Hovering it, or focusing it with the keyboard, shows this text in a small tooltip. -->
Pick how your pointer looks on this site. Your choice is saved in this browser. Custom cursors need a mouse or trackpad, and are off when your device is set to reduce motion.


<!--
TECHNICAL NOTES (site-wide)
These apply to every page. A page's own TECHNICAL NOTES block only adds to them.

SHARED FILES
- Every page loads the shared stylesheet assets/css/style.css and the shared scripts assets/js/main.js and
  assets/js/site-cursor.js (site-cursor.js has defer and comes after main.js).
  The 404 page loads them with root paths (/assets/...); the other pages use paths relative to their depth.

HEAD & METADATA
- Open Graph and Twitter cards use the page's own title and description plus the shared 1200x630
  assets/img/og-image.png. The Twitter card type is summary_large_image.
- The favicon is a white "t" in DM Mono (medium weight) on a #2563eb rounded square, as image files in
  assets/img/favicons/: favicon.svg (the letter is drawn as a path, so it does not depend on the font loading),
  favicon-16x16.png, favicon-32x32.png, favicon.ico (16, 32 and 48px) and apple-touch-icon.png (180px, a full
  square with no transparency). A copy of favicon.ico also sits at the site root for browsers that ask for
  /favicon.ico. Every page links the files; the 404 page uses root paths (/assets/img/favicons/...) and the other pages
  use paths relative to their depth.

NAVIGATION & ACCESSIBILITY
- Every page has a skip link and a labelled main navigation, and keyboard-visible focus outlines.
- The active nav item carries aria-current="page" (the 404 page has no active item).
- The hamburger menu on small screens is controlled with aria-expanded and aria-controls.

BEHAVIOR
- Lucide icons are rendered after DOMContentLoaded.
- Elements marked .reveal animate into view with IntersectionObserver; without JavaScript they remain
  visible. (The 404 page has no .reveal elements.)
- The custom cursor is described under CUSTOM CURSOR below.
- prefers-reduced-motion turns the custom cursor off (the system cursor stays) and disables reveal movement,
  smooth scrolling and decorative transitions.

CUSTOM CURSOR (every page)
- It is handled by assets/js/site-cursor.js, which has no dependencies. The cursor code that used to be in
  main.js was moved into it; main.js has no cursor code.
- It starts only on devices with a fine pointer ((pointer: fine)) when prefers-reduced-motion is not set.
  Otherwise it does nothing, the system cursor stays and the footer picker stays hidden. It creates the cursor on
  the first mouse move.
- Available cursors: crosshair-pro, snappy-ring, orbit-comet and orbit-snap are drawn on a full-screen fixed
  canvas (aria-hidden, pointer-events none, above everything). dot-ring uses the #cursor and #cursor-ring elements
  that every page has, styled in style.css and moved with the CSS translate property. system is no custom cursor.
- While a custom cursor runs the system cursor is hidden (cursor: none on html.sc-on). It is handed back while a
  modal <dialog> or fullscreen is open, and when the system option is chosen.
- Options are the SETTINGS object at the top of site-cursor.js: default cursor (crosshair-pro), accent color,
  dot-ring hover color, snap delay (150 ms), lean (14 px) and the list of elements the cursor reacts to. A
  data-cursor, data-accent, data-hover-color, data-snap-delay or data-lean attribute on the script tag overrides
  one option for that page; no page uses them.
- Colors default to var(--accent) and var(--accent2) from assets/css/style.css, so changing the site colors changes
  the cursor. They are read once, on the first mouse move (canvas cannot read CSS variables). dot-ring gets them as
  --cursor-accent and --cursor-hover on <html>.
- Cursor picker (footer): a native select (#cursor-select) with a visible label, inside an element marked
  data-cursor-picker that has the hidden attribute until site-cursor.js is running. It sits in the bottom-right
  corner of the footer (absolutely positioned); at 800px wide and below it drops under the copyright, centered. The
  script fills in the options from its list of cursors. Changing the select switches the cursor immediately and saves the choice. The visitor's
  choice wins over SETTINGS and over data-cursor.
- Cursor picker info icon: a button (aria-label "About the cursor picker") with an inline SVG icon, described by a
  role="tooltip" element (aria-describedby). The tooltip is plain text in the HTML; it opens above the icon on
  hover or keyboard focus, stays open while the pointer is over it, and Esc closes it (site-cursor.js sets
  data-dismissed until the pointer or focus leaves). It tells visitors the choice is saved in the browser, that
  custom cursors need a mouse or trackpad, and that they are off when the device is set to reduce motion.
  Visitors with reduced motion do not see the picker at all.

DATA & STORAGE
- The visitor's cursor choice is saved in localStorage under the key site-cursor (the cursor's name, for example
  dot-ring) and read on every page load. A missing or unrecognised value is ignored and the default cursor is used.
  If localStorage is blocked or unavailable nothing breaks; the choice then lasts only until the page is reloaded.
- Only the home page uses sessionStorage (GitHub stats cache). The site uses no IndexedDB.

CONTACT FORM (every page except 404)
- The form submits with POST to https://formspree.io/f/xwlpvooz.
- Name, email, subject and message are required fields.
- Name and email use autocomplete="name" and autocomplete="email".
- A hidden _subject field is submitted with the value "New message from tahsin2155.github.io".
- Submission is handled by the browser and Formspree; there is no JavaScript submission handler or
  local storage.

SOCIAL ICONS (every page except 404)
- The icons are lazy-loaded. LinkedIn uses a local image (assets/img/InBug-White.png); Instagram and
  GitHub use Simple Icons CDN images.
- The images have empty alt text because the adjacent link text provides the accessible name.

CASE-STUDY PAGES (projects/daymark, markdstudio, velin, zipline, handoff)
- The breadcrumb is a navigation landmark with aria-label="Breadcrumb"; the slash separators are aria-hidden.
  Its links go to ../ (Home) and ./ (Projects).
- The project-details sidebar is labelled with aria-label="Project details", sticky above 900px and static
  below 900px. The case-study layout becomes one column below 900px.
- Previous and next links are ordinary HTML links with no JavaScript carousel behavior.
- Open Graph type is "article", with a page-specific title, description and URL.
- The canonical URL has no trailing slash.
- JSON-LD identifies the project as a schema.org SoftwareApplication with Tahsin as author; each page's
  notes say which URL it includes.
-->
