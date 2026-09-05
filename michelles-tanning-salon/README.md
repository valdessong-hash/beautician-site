# Michelle's Tanning Lounge — michellestanninglounge.co.uk

A rebuild of the site for Michelle's Tanning Lounge, Unit 1 The Place,
Greenbridge Road, Swindon SN3 3JE.

Static. No build step, no dependencies, no framework.

```
python3 -m http.server 8000    # then open http://localhost:8000
```

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole site — one page, anchored sections |
| `assets/css/style.css` | Design system: tokens, type scale, components |
| `assets/js/main.js` | Sticky nav, mobile sheet, reveals, today's hours |
| `bar.md` | The craft bar this build was judged against |

## Real content in this build

Everything below came off the existing site and is live in the page:

- Address, phone (07777 524148), email, and all seven days of opening hours
- The full price list — £1/min pay as you go, and both block-booking tiers
- Member of The Sunbed Association
- 18+ only, photo ID, bookings in salon only, 12-minute session maximum
- Greenbridge / East Swindon positioning and the "Turn heads. Tan up." line

There are **no invented figures** anywhere in this build. No fake reviews, no
made-up ratings, no placeholder phone number.

## The one thing still outstanding: photos and video

The site's images and video could not be downloaded — `michellestanninglounge.co.uk`
is blocked by this environment's network policy (403 at the egress proxy), so
there was no way to pull the media files.

Every image position is therefore a styled slot with a caption naming the shot
that belongs there. They are designed to look deliberate rather than broken, but
they are placeholders and the site is not finished until they are filled.

To fill them: save each photo into `assets/img/`, then replace the slot markup

```html
<div class="slot slot--45">
  <div class="slot__in">…</div>
</div>
```

with

```html
<img class="slot slot--45" src="assets/img/your-photo.jpg" alt="Describe the photo">
```

The `.slot--45`, `.slot--11` and `.slot--169` classes set the aspect ratios, so
swapping the element keeps the layout intact. The gallery grid takes eight
square images; the video slot at the top of "Explore the Salon" takes the
walkthrough clip.

## Verify before launch

- **The price list.** Prices were read off a photograph of the printed card.
  Check every figure against the real one before this goes live.
- **The map.** The `.map` container is sized and styled for a Google Maps embed.
- **The newsletter form** validates and confirms on the front end only. Point it
  at Mailchimp, Beehiiv or whatever list you use to actually receive sign-ups.

## Design

Metallic gold on true black, taken from the existing wordmark. Cormorant
Garamond for display, Jost for body and UI, Italianno for the script in the
logo lockup only. Gold is deliberately scarce — hairlines, small-caps labels and
a single call to action — so it still reads as gold. Motion is slow and
resolves in one direction; nothing runs under 500ms, and everything is disabled
under `prefers-reduced-motion`.

Structured data is `HealthAndBeautyBusiness` JSON-LD with the real address,
hours, Sunbed Association membership and the full price list as offers.
