# Fidelity Business Group — Pre-launch content checklist

The site is built so that **nothing unverified is presented as fact**. Every item below is either hidden, labelled "pending", or shown as a schematic illustration until Fidelity supplies and approves it.

## 1. Brand assets
- [ ] **Official vector logo files** (SVG / AI / PDF) for the group mark and the three division marks. The current marks in `components/brand/Logo.tsx` are hand-traced from the supplied logo images and should be swapped for the originals.
- [ ] Confirm exact brand colours (HEX/CMYK). Current values were sampled from the logo images: red `#c8222a`, yellow `#e5bf00`, green `#1f5c3d` (`app/globals.css`).
- [ ] Confirm brand typeface, if one is specified in the brand guidelines.

## 2. Contact details — verified 31 Oct 2026 from Fidelity's public pages
- [x] Phone: **0911 97 18 00** (group page, all division pages, both TikTok accounts)
- [x] Email: **fidelityarchitects@gmail.com** (Architects page). Is there a group-wide email?
- [x] Offices: **Addis Ababa** and **Wolaita Sodo** (Architects page). The group page lists Addis Ababa as its address.
- [x] Social: group Facebook, the three division Facebook pages, TikTok @fidelity_architects, Telegram t.me/FidelityEmpire (from an Architects post); founder's Facebook and TikTok
- [ ] A second phone, **0916 41 12 37**, appears on older Printing & Advertising posts. Is it still in use?
- [ ] **Which city is headquarters?** The original brief said Wolaita Sodo, but the group's Facebook page lists Addis Ababa. The site shows both offices equally until this is confirmed.
- [ ] Street addresses for each office → `NEXT_PUBLIC_OFFICE_ADDRESS`
- [ ] Is 0911 97 18 00 also on WhatsApp? If so set `NEXT_PUBLIC_CONTACT_WHATSAPP=251911971800`. (Not shown until confirmed.)
- [ ] Business hours. The Facebook page says "Always open", which looks like a default setting, so it isn't shown.

## 3. Company information
- [x] Divisions and official taglines (founder's pinned post, 31 Aug 2026):
  Group: *From thought to Empire!* · Architects: *Building a legacy!* · Furniture & Interior: *For elegant spaces!* · Branding & Advertising: *Stand out!*
- [x] **The third division is now "Fidelity Branding & Advertising".** The older logo image says "Printing & Advertising". The site uses the current name, and `/divisions/printing` redirects to `/divisions/branding`.
- [x] Architects services: architectural design, supervision, construction ("from design up to construction")
- [x] Furniture & Interior: architect-designed furniture and interiors, on-time delivery promise, repair & upholstery, **metalwork** (Oct 2026 post)
- [x] Branding & Advertising: branding, graphic design, printing, signs & banners, neon light signage
- [x] Founder & CEO: **Fidel Gebremedhin**, architect. CEO of the group, founder and CEO of the Architects, Creative Director of Furniture & Interior, General Manager of Branding & Advertising, lecturer at Wolaita Sodo University, studied at EiABC. Please confirm he is happy with this on the About page and send a portrait photo.
- [ ] Mission and vision statements
- [ ] Founding year and milestones
- [ ] Current number of permanent staff
- [ ] Other team members to feature

## 4. Portfolio (`content/projects.ts`)
Nine projects are published, all taken from Fidelity's own Facebook posts. Their images are stored in `public/projects/<slug>/`:

| Project | Division | Images |
|---|---|---|
| Alex Hotel (B+G+7), Wolaita Sodo | Architects | 10 renders (Dec 2024) |
| Dicha Boys Sneakers, Wolaita Sodo | Branding + Architects | logo + 5 interior renders (Sep 2026) |
| Wolaita Sodo City Brand (logo + statue) | Architects + Branding | 2 logos, statue render, photo of built statue |
| Wolaita Liga School entrance | Architects | 6 renders (Sep 2024) |
| Wogeta FM 96.6 — 6th anniversary campaign | Branding | 5 campaign graphics |
| I Love Wolaita — Land of 50+ Kings | Architects | 1 render (from "Works proposed & executed" poster) |
| Gifata Square (ongoing proposal) | Architects | 1 render (same poster) |
| Ligaba Park | Architects | 3 renders (same poster) |
| Neon light signage | Branding | none yet. The post is a video, so a drawing is shown |

Renders are labelled **"3D render"** on the site and are never presented as completed buildings.

- [ ] Confirm the status of each project (designed / under construction / completed) and add completion years
- [ ] Confirm Fidelity's exact scope on Alex Hotel (architectural only, or also structural / supervision?)
- [ ] Confirm the school's name spelling: "Wolaita Liga School" on the render sign, "Wolaita Liqa School" in a fundraising post
- [ ] Higher-resolution originals for the "Works proposed & executed" projects (currently cropped from one poster)
- [ ] Photos of the neon signage (stills from the video)
- [ ] Permission check: the clients named (Adonai Birhane / Dicha Boys, Wogeta FM 96.6) were named in Fidelity's own public posts
- [ ] More projects for the Furniture & Interior Design division. Its Facebook album wasn't reachable without signing in.

## 5. Photography
- [ ] Office and team photos
- [ ] Workshop / production photos (furniture, printing)
- [ ] High-resolution project photography (landscape, at least 2400 px wide)

**Current imagery:** 15 licensed stock photographs (Unsplash License, free for commercial use) set the mood for each discipline. They live in `public/images/reference/` and are registered in `content/imagery.ts`. Every placement shows a **"Reference image"** tag, and none is used on a project page. Replace them one by one with real Fidelity photography (and set `reference: false`). Project pages still show labelled schematic drawings until approved project images exist.

- [ ] Replace reference photos with Fidelity's own photography, starting with the division heroes (`divisionImagery` in `content/imagery.ts`)
- [ ] The brand-application mockups (business card, letterhead, hoarding, banner) are concepts using the Fidelity identity — replace them with photos of real printed pieces when available

## 6. Legal & operations
- [ ] Review the privacy policy (`app/(site)/privacy/page.tsx`) against applicable Ethiopian law
- [ ] Decide who receives and follows up website inquiries; set `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`
- [ ] Choose the production domain → `NEXT_PUBLIC_SITE_URL`
- [ ] Register the domain in Google Search Console → `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- [ ] Optional: privacy-friendly analytics → `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- [ ] Amharic / Wolaytta versions — wanted at launch or later?
