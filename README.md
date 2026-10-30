# Fidelity Business Group — Website

*From Thought to Empire.*

Corporate website for Fidelity Business Group (Wolaita Sodo, Ethiopia), covering its three divisions: Architects & Consulting Engineers, Furniture & Interior Design, and Printing & Advertising. It includes a working project-inquiry system and a staff lead-management area.

## Stack
- **Next.js 16** (App Router, TypeScript). Public pages are statically pre-rendered.
- **Tailwind CSS 4**. Design tokens live in `app/globals.css`.
- **Framer Motion** for reveals, masks, parallax and the brand-story sequence. It respects `prefers-reduced-motion`.
- **React Three Fiber / three.js** for the hero, where the Fidelity mark is extruded into architecture. It loads only on large screens without reduced motion, and pauses when off-screen.
- **Zod**: one validation schema shared by the browser and the server.
- **lucide-react** for icons.

## Motion & experience
- **Smooth scrolling** with Lenis: eased wheel scrolling on desktop. Native scroll is kept, so there is no scroll-jacking, and it is off for touch and reduced motion.
- **Brand intro**: the two halves of the mark join together, shown once per session (about 1.6s, can be skipped).
- **Page transitions**: a dark panel lifts off on navigation (`app/(site)/template.tsx`).
- **Self-drawing drawings**: schematic plans, sections and elevations plot themselves as they scroll in (`components/visuals/DrawOnView.tsx`).
- **Cursor companion**: on desktop, a ring that labels project cards ("View") and divisions ("Explore").
- **Materials & Craft**: a procedurally rendered sample board of oak, walnut, travertine, terrazzo, linen, brass, steel and velvet (`components/visuals/Material.tsx`).
- **Identity in Use**: a parallax collage of the Fidelity identity on stationery, a site hoarding and a roll-up banner.

## Getting started
```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Structure
```
app/(site)/          public pages: home, about, divisions, projects, services, contact, privacy
app/admin/           lead management (password protected)
app/api/inquiries    inquiry submission endpoint
content/             site info, divisions/services, projects  ← edit content here
components/          brand, hero (3D), sections, projects, forms, motion
lib/server/          inquiry store, auth, rate limiting (server only)
CONTENT_CHECKLIST.md everything to confirm before launch
```

## Editing content
- **Contact details**: environment variables (see `.env.example`). Empty values are hidden automatically.
- **Divisions and services**: `content/divisions.ts`
- **Projects**: append to `content/projects.ts` and put images in `public/projects/<slug>/`. Unknown fields stay `null` and are hidden. Set `verified: true` only after approval; unverified projects are labelled and `noindex`. Adding a project currently means editing that file and redeploying. All reads go through `getProjects()` / `getProject()`, so moving to a headless CMS later only means changing those two functions.

## Inquiries & lead management
- The form posts to `/api/inquiries`. Validation runs in the browser and again on the server. The endpoint has rate limiting, a honeypot field, and up to 3 attachments (JPG/PNG/WebP/PDF, 5 MB each, checked by file content, not just the extension).
- Inquiries are stored in `DATA_DIR/inquiries.json`, with attachments in `DATA_DIR/uploads/`. Neither is publicly served.
- Staff sign in at **`/admin`** with `ADMIN_PASSWORD`. Sessions use signed httpOnly cookies. From there staff can view, filter, search, set status, assign, add follow-up notes, open attachments and export to CSV.
- **Hosting note:** file storage needs a persistent disk (VPS, or a Docker container with a volume). On serverless platforms (e.g. Vercel), replace `lib/server/inquiries.ts` with a database such as PostgreSQL. The functions it exports are the only interface the rest of the app uses.
- Email/Telegram notifications for new inquiries are not set up yet. They need an email or bot account to send from.

## SEO
Every page has its own title, description, canonical URL and Open Graph data. The site also includes a generated share image, `sitemap.xml` and `robots.txt`. Structured data is Organization on every page, plus Service and FAQPage on division pages, all using verified fields only.
