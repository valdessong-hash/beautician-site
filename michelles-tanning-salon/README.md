# Michelle's Tanning Lounge — Swindon

A static marketing site for Michelle's Tanning Lounge, an independent tanning
lounge in Swindon, Wiltshire.

No build step, no dependencies, no framework. Open `index.html` in a browser,
or drop the folder onto Netlify / GitHub Pages / any host that serves files.

```
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Homepage — hero, USPs, bed line-up, spray tan, pricing preview, reviews, FAQ, location |
| `sunbeds.html` | The six beds, session times by skin type, how to get more from a session |
| `spray-tan.html` | Shade guide, prep, aftercare, spray tan FAQ |
| `pricing.html` | Minute bundles, spray tan rates, collagen courses, extras, vouchers |
| `safe-tanning.html` | Skin types, UK sunbed law, contraindications, house rules |
| `contact.html` | Booking request form, hours, directions, quick answers |
| `assets/css/style.css` | Whole design system in one file |
| `assets/js/main.js` | All interactions, ~200 lines of vanilla JS |

## Placeholders to replace before this goes live

Search the repo for these — they are the only invented details in the build.

1. **Phone number** — `01793 000 000` / `tel:+441793000000`. Appears in the
   header drawer, footer, homepage, contact page and the JSON-LD block.
   `grep -rn "01793 000 000\|441793000000" .`
2. **Street address and postcode** — currently "Swindon, Wiltshire" plus a
   grey note. In `index.html`, `contact.html` and the JSON-LD `address`.
3. **Opening hours** — 9–8 weekdays, 9–6 Saturday, 10–4 Sunday are assumed.
   Update the `.hours` lists in the footer of every page, on `contact.html`,
   and `openingHoursSpecification` in the JSON-LD.
4. **All prices** — every figure on `pricing.html` and the three cards on
   `index.html` is an example.
5. **Reviews** — the three testimonials on `index.html` are labelled as
   samples. Replace with real Google or Facebook reviews (with permission).
6. **Bed models** — described generically. Name the actual beds if they are
   a recognised brand; people search for them by name.
7. **Domain** — `michellestanninglounge.co.uk` is used in the canonical tags,
   sitemap and JSON-LD. Swap for the real one.
8. **Google Maps embed** — two `.map-frame` containers are sized and styled
   and ready for the iframe.
9. **Photos** — the site is deliberately image-free and loads instantly on
   CSS gradients and SVG alone. Real photos of the rooms and beds will lift
   it further; `assets/img/` is empty and waiting.

## Booking form

`contact.html` has a working front-end form that currently shows a
confirmation and clears. To actually receive submissions, point it at a
service — Formspree, Netlify Forms (`<form netlify>`), or your booking
system's own embed — and delete the `form.addEventListener('submit', …)`
block near the end of `assets/js/main.js`.

## What was built in

**Mobile.** Mobile-first CSS throughout, fluid type via `clamp()`, 44px+ tap
targets, a full-screen slide-down nav drawer, and a sticky bottom dock with
*Call* and *Book* that appears after 420px of scroll — because most tanning
searches happen on a phone and the two things people want are a phone number
and a way to book.

**Motion.** Rotating sun-ray field and drifting glows in the hero, staggered
line-by-line headline reveal, scroll-triggered reveals via
`IntersectionObserver`, animated stat counters, a cursor-following glow on
cards, a USP marquee, a swipeable auto-advancing review slider, an accordion
FAQ, a scroll progress bar, and a pulsing map pin. Every one of them is
switched off under `prefers-reduced-motion: reduce`.

**SEO.** Per-page titles and meta descriptions written around "tanning
Swindon" intent, canonical tags, Open Graph tags, `HealthAndBeautyBusiness`
JSON-LD with hours, geo and service catalogue, a sitemap and robots.txt.

**Accessibility.** Semantic landmarks, labelled form fields, `aria-current`
on the active nav item, visible focus rings, `aria-expanded` on the menu
toggle, decorative elements hidden from screen readers, and text that holds
contrast against the dark background.

**Trust.** A whole page on tanning safely, including the under-18 rule under
the Sunbeds (Regulation) Act 2010 and the 0.3 W/m² irradiance limit under
EN 60335-2-27. Salons that publish this rank better and convert better —
and it is the content a first-time customer actually looks for.

## Licence

All copy, markup and styling here is original work written for this site.
