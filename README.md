# Loud Hands Studio (`next-agency-bold`)

A bold creative and marketing agency website built as a static Next.js export for the Jamstacks gallery. **Loud Hands Studio** (fictitious sample business on Stevenson Square, Manchester) showcases a wheatpasted work wall, priced services, a five-step running order and a hosted Jamstacks enquiry form on Contact.

## Local preview and checks

Requires Node 24+ and npm.

```sh
npm ci
npm run dev          # Local Next.js dev server
npm run check        # Unit tests, TypeScript check, static export to out/
npm start            # Preview the static export from out/ at http://localhost:3000/
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Hero with availability sticker, client marquee, featured paste-up wall (4 projects), service specimen rows, mixing-desk process teaser, studio numbers, quote, closing call and `ProfessionalService` JSON-LD |
| `/work/` | Full paste-up wall (all 8 projects), shareable `?discipline=` filter, sectors band |
| `/services/` | Expanded service specimen rows with deliverables, starting fees (`+ VAT`) and availability stamps, pricing panel, "What we don't do" |
| `/process/` | Five-step running order setlist, 12-week timeline strip, native `<details>` FAQ |
| `/contact/` | Hosted Jamstacks enquiry form (or visible email fallback), message checklist, direct email/phone lines, by-appointment studio hours with browser `OpenBadge`, time-zone note and Google Map |
| `/404.html` | Static 404 poster ("Shh.") with links to Home and Work |

## Make it yours (file ownership)

Page-specific headings, prose and labels live directly in each route's `app/**/page.tsx` file as JSX children of named React components. Shared contact details and structured collections live in `content/`:

| File | Owns |
| --- | --- |
| `content/business.ts` | Studio name, wordmark, email, phone, Stevenson Square address, 7-day `hours`, `availability.nextStart` (`YYYY-MM`, **most frequent edit**), `availability.note` and `enquiries` copy |
| `content/projects.ts` | All work wall projects (`id`, `client`, `title`, `disciplines`, `year`, `sector`, `brief`, `outcome`, `poster`, `featured`, `order`). Feeds Home wall (4 featured), marquee clients, `/work/` wall and sectors band |
| `content/services.ts` | Five studio services (`id`, `number`, `name`, `pitch`, `deliverables`, `weeks`, `fromFee` GBP ex-VAT, `availability`). Feeds Home specimen rows, `/services/` and schema `makesOffer` |
| `content/process.ts` | Five process steps (`id`, `step`, `name`, `weeks`, `summary`, `youGet`, `weNeed`). Feeds Home mixing desk, `/process/` setlist and 12-week timeline |
| `app/page.tsx` | Home page section order, hero copy, studio numbers, client quote and closing call |
| `public/agency-light.webp`, `public/agency-dark.webp` | Matching home hero artwork for light and dark mode |
| `app/work/page.tsx` | Work page head and closing call |
| `app/services/page.tsx` | Services page head, "How we price", "What we don't do" and closing call |
| `app/process/page.tsx` | Process page head, timeline heading, FAQ questions/answers and closing call |
| `app/contact/page.tsx` | Contact page head, enquiry guidance and studio visit note |
| `app/not-found.tsx` | 404 headline, message and links |
| `site.config.json` | Public site `name`, `description`, `domain`, `timeZone` (`Europe/London`) and `jamstacks.siteId` / `cdnUrl` (never store business data here; the Jamstacks provisioner owns this shape) |
| `app/tailwind.input.css` | Light/dark palette tokens, paper/plywood/halftone textures, typography mappings, motion, reduced-motion and print rules |
| `lib/structured-data.ts` | `ProfessionalService` JSON-LD derived from `content/business.ts` and `content/services.ts` |
| `app/sitemap.ts` | Static sitemap entries for all public routes |

### Common owner edits

- **Change next project start month:** Edit `business.availability.nextStart` (e.g. `'2027-04'`) in `content/business.ts`. Both the Home availability sticker and the Process FAQ update automatically.
- **Replace the hero artwork:** Use matching 43:24 images with the subject on the right and space for the headline on the left. The desktop studio status text sits over the yellow paper near the lower centre.
- **Update service fees or availability:** Edit `fromFee` (whole GBP) or `availability` (`'open' | 'limited' | 'waitlist'`) in `content/services.ts`. Home, `/services/` (including the "Fees start" sticker, which shows the lowest `fromFee`) and JSON-LD `makesOffer` stay in sync.
- **Add a project:** Append a new `Project` entry to `content/projects.ts` with a unique kebab-case `id`, unique `order`, allowed `disciplines` and `poster.motif`, and keep exactly four items marked `featured: true`. Run `npm test` to validate.

## Typography and licences

All fonts are self-hosted via `@fontsource` (SIL Open Font License 1.1):

- **Anton** (`@fontsource/anton`, 400) — display headlines, wordmark, numerals, marquee
- **DM Sans** (`@fontsource-variable/dm-sans`) — body copy, navigation, buttons
- **Space Mono** (`@fontsource/space-mono`, 400 and 700) — poster metadata, fees, week ranges, stickers
- **Caveat Brush** (`@fontsource/caveat-brush`, 400) — marker handwriting on tape labels, the setlist and the map caption (used sparingly)

## Public configuration and Contact contract

`site.config.json` and build-time environment variables (`JAMSTACKS_SITE`, `NEXT_PUBLIC_JAMSTACKS_CDN_URL`, `NEXT_PUBLIC_SITE_DOMAIN`, `SITE_TIME_ZONE`, `PAGES_BASE_PATH`, `PAGES_BASE_URL`, `JAMSTACKS_ALLOW_LOCAL_CDN`) are resolved through `lib/config.mjs`.

- Only `/contact/` renders `<jamstacks-support-form>` and loads one `{cdn}/sites/{siteId}/embed.js` bootstrap when `siteId` is configured.
- Without a `siteId`, `/contact/` renders no embed host or script and displays the direct email fallback (`hello@loudhands.studio`).
- `SiteLink` enforces full-document navigation to and from `/contact/`.
- All form and closing-band wording describes enquiries only; nothing implies a project, start date or quote is booked or confirmed.

## Project-path preview and deployment

```sh
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

`.github/workflows/pages.yml` builds and publishes static exports to GitHub Pages while preserving the `provisioning_id` dispatch contract. Do not add `public/CNAME`.

## Gallery assets

`jamstacks/` contains optional gallery-only publishing metadata and screenshots. Run `node --test jamstacks/config.test.mjs` separately after regenerating captures. Customer websites can delete `jamstacks/`, `plan/` and `.claude/skills/` without affecting builds or tests.
