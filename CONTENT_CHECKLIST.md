# Fidelity Business Group — Pre-launch content checklist

The site is built so that **nothing unverified is presented as fact**. Every item below is either hidden, labelled "pending", or shown as a schematic illustration until Fidelity supplies and approves it.

## 1. Brand assets
- [ ] **Official vector logo files** (SVG / AI / PDF) for the group mark and the three division marks. The current marks in `components/brand/Logo.tsx` are hand-traced from the supplied logo images and should be swapped for the originals.
- [ ] Confirm exact brand colours (HEX/CMYK). Current values were sampled from the logo images: red `#c8222a`, yellow `#e5bf00`, green `#1f5c3d` (`app/globals.css`).
- [ ] Confirm brand typeface, if one is specified in the brand guidelines.

## 2. Contact details (set in `.env` — see `.env.example`)
Each item stays hidden on the site until it is set.
- [ ] Main phone number → `NEXT_PUBLIC_CONTACT_PHONE`
- [ ] WhatsApp business number → `NEXT_PUBLIC_CONTACT_WHATSAPP`
- [ ] Email address → `NEXT_PUBLIC_CONTACT_EMAIL`
- [ ] Street address / building in Wolaita Sodo → `NEXT_PUBLIC_OFFICE_ADDRESS`
- [ ] Business hours → `NEXT_PUBLIC_BUSINESS_HOURS`
- [ ] Social media URLs (Facebook, Instagram, LinkedIn, Telegram, TikTok)

## 3. Company information (About page)
- [ ] Confirm the service list for each division (`content/divisions.ts`, `servicesConfirmed`)
- [ ] Is metalwork / steel fabrication an active service? If so, which services exist and under which division? (Not shown on the site yet.)
- [ ] Mission and vision statements
- [ ] Core values (the About page shows "approach" principles, not official values)
- [ ] Founding year and verified milestones (no history is shown yet)
- [ ] Current number of permanent staff (brief says "more than 25", not published yet)
- [ ] Leadership/team names, roles and photos, with permission
- [ ] Any licences, registrations or certifications that can be published

## 4. Portfolio (`content/projects.ts`)
**Alex Hotel (B+G+7, Wolaita Sodo)** — currently published with a "Details pending" notice and excluded from search engines:
- [ ] Fidelity's exact scope of work (architecture? structural? both?)
- [ ] Project status (design / under construction / completed) and year
- [ ] Owner's permission to publish and to name the client
- [ ] Approved renders, drawings and/or photographs
- [ ] Short overview, design challenge and design approach
- Then set `verified: true`.

Further projects for each division:
- [ ] Architecture & engineering projects
- [ ] Interior design and custom furniture projects (photography)
- [ ] Printing & advertising samples (photos of printed work, signage)

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
