# Special Branch — website

Single-page site for Special Branch, tree surgeons in Guernsey. Plain HTML + Tailwind CSS v3 (compiled and committed) + a small vanilla JS file. No frameworks, no runtime CDNs.

## Folder layout

```
index.html              ← the whole site, sections separated by big comment banners
thanks.html             ← shown after the quote form is sent (FormSubmit _next)
404.html                ← GitHub Pages "not found" page
assets/css/styles.css   ← compiled Tailwind – generated, don't edit by hand
assets/js/main.js       ← menu, header, reveals, falling leaves, services explorer, lightbox, form
assets/fonts/           ← self-hosted Zilla Slab + Figtree (woff2) with their OFL licences
images/brand/           ← logo.svg (redrawn roundel) and mark.svg (roundel without lettering, for icons)
images/work/            ← job photos, each as name.webp (~1600px) + name-sm.webp (~800px)
images/                 ← favicons, apple-touch-icon, icon-192/512, og-image.jpg, site.webmanifest
src/input.css           ← Tailwind source: @font-face, components, keyframes
tailwind.config.js      ← brand colours, fonts
sitemap.xml, robots.txt
_fb-pack/               ← the Facebook source pack (not published – leading underscore)
```

## Brand

| Name | Hex | Used for |
|---|---|---|
| `brand-600` (logo red) | `#c92e30` (logo itself `#ec3a3b`) | Call / primary buttons, step numbers, small accents |
| `forest-900` | `#16291f` | Text, outlines on all illustrations, footer, storm band |
| `forest-800` | `#1e3a2c` | Dark buttons, selected service tab, theme colour |
| `leaf-400` / `leaf-300` / `leaf-500` | `#8eb06a` / `#b3c991` / `#6b904c` | Tree crowns, highlights, underline |
| `leaf-50` / `leaf-100` | `#f4f7ee` / `#e8eedc` | Soft section backgrounds, illustration discs |
| `bark-500` / `bark-300` | `#8a6a3c` / `#c9a978` | Trunks, logs, stumps |
| `paper` | `#faf8f2` | Page background |

Colours come from the logo (red, charcoal) and the Facebook cover photo (dark conifer greens, bark/olive).

- **Fonts:** Zilla Slab 600/700 (headings – a slab serif that echoes the logo lettering) and Figtree (body). Both self-hosted.
- **Logo:** the Facebook profile picture was only 200×200, so it was **redrawn as a clean SVG** (`images/brand/logo.svg`) – same red roundel, slab lettering on the arcs, dots and cedar tree.
- **Illustrations:** all trees (oak, beech, pine, cedar, birch, cypress), bush, stump, logs and icons are drawn in one style and live in the `<symbol>` sprite at the top of `index.html`. Use one anywhere with `<svg><use href="#tree-oak"/></svg>`.

## Editing

- **Text:** edit `index.html` directly.
- **Colours / fonts:** change `tailwind.config.js`, then `npm install` (first time) and `npm run build`. Use `npm run watch` while editing.
- **Add a work photo:** export `images/work/new-job.webp` (1600px wide) and `new-job-sm.webp` (800px), then copy one of the `<button class="work-tile …">` blocks in the *Recent work* section and update `data-full`, `data-caption`, the `<img>` src, size and alt. The lightbox picks it up automatically.
- **Services explorer:** each service has a tab (desktop) and a chip (mobile) with `data-svc-tab="key"`, plus a panel `<article id="panel-key">`. Keep the key the same in all three. The "Ask about…" button's `data-ask` must match an option in the form's service list to pre-select it.
- **Before/after:** not included – the pack had no matching before/after pairs. One can be added if the client sends some.

## Before going live — checklist

- [ ] Swap `https://tobygregg.github.io/special-branch/` for the real domain everywhere: canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD, `sitemap.xml`, `robots.txt` and the form's `_next`.
- [ ] **When the client goes ahead, switch the form from Toby's email (`formsubmit.co/toby1@greggs.org`) to the client's email and activate FormSubmit** (first submission sends a confirmation link). Update `_subject` to drop "(website draft)".
- [ ] Confirm the phone number (07781 106445). **No email address was in the pack** – add one to the contact section and footer if they want it shown.
- [ ] Get the client to sign off the services wording. Assumptions to check:
  - *Pruning & crown work* – assumed from "tree surgeon and arboricultural"; no posts showed it. There's no photo, so the panel uses an illustration – ask for one.
  - *Stump & root removal* – based on the crane-lifted root plate photo; check whether they also grind stumps.
  - *Logs cut and stacked on request* – based on a customer review; check it's a standard offer.
  - "Storm Ciarán" and "Storm Goretti" – from a review ("Cairan") and a post ("Goritti"); spellings corrected to the official names.
  - "One of the island's longest-standing" and "fully trained and insured" – from the Facebook bio (truncated in the pack).
- [ ] Ask for a team photo and a few more job photos (pruning, finished sites).
- [ ] Left out on purpose: the two selfies in the photo set, the follower count, the "Always open" hours setting and the "£££" price band (kept only in JSON-LD as `priceRange` – remove if they'd rather not), and the single review (a testimonials section needs at least three).

## Source

Built from the Facebook pack in `_fb-pack/` (BRIEF.md, data.json, images). That folder starts with an underscore so GitHub Pages doesn't publish it.
