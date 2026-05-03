# CODEX IMPLEMENTATION PLAN

## Objective

Implement the Ashbel Aluminum public website from the repository source of truth documents.

Primary source of truth:

1. `ASHBEL_WEBSITE_SPEC.md`
2. `AGENTS.md`
3. `DESIGN_REFERENCES.md`

Do not improvise a generic website. Build from the specification.

## Required workflow

Work in this order:

1. Read `AGENTS.md`.
2. Read `ASHBEL_WEBSITE_SPEC.md`.
3. Read `DESIGN_REFERENCES.md`.
4. Create the Next.js project structure.
5. Implement the design system and layout.
6. Implement data files.
7. Implement all required pages.
8. Implement SEO metadata.
9. Implement professional portal intake flow.
10. Implement mobile sticky CTAs.
11. Run verification.
12. Report exact changes and open items.

## Stack

Use:

- Next.js App Router
- TypeScript
- Tailwind CSS
- ESLint
- Static data files

Do not add:

- CMS
- database
- authentication
- fake quote engine
- fake dashboard
- CRM logic

## Suggested project structure

```text
app/
  layout.tsx
  page.tsx
  services/page.tsx
  styles/page.tsx
  products/page.tsx
  projects/page.tsx
  process/page.tsx
  professionals/page.tsx
  send-plans/page.tsx
  about/page.tsx
  contact/page.tsx
  sitemap.ts
  robots.ts
components/
  site-header.tsx
  site-footer.tsx
  hero.tsx
  section-heading.tsx
  service-card.tsx
  style-card.tsx
  product-card.tsx
  project-card.tsx
  process-steps.tsx
  cta-band.tsx
  mobile-sticky-cta.tsx
  lead-form.tsx
  professional-intake.tsx
data/
  services.ts
  styles.ts
  products.ts
  kalil-series.ts
  projects.ts
  faqs.ts
  seo.ts
lib/
  metadata.ts
  schema.ts
```

## Parallel work streams

If using Codex subagents or parallel tasks, split as follows:

### 1. Architecture Agent

Responsible for:
- Next.js setup
- app router structure
- layout
- RTL foundation
- component skeleton

### 2. Hebrew Content Agent

Responsible for:
- Hebrew page content
- No lorem ipsum
- Correct tone
- Page headings and CTAs

### 3. Product Catalog Agent

Responsible for:
- Products page
- Klil series explanatory cards
- Practical product descriptions
- Avoiding unsupported claims

### 4. SEO Agent

Responsible for:
- metadata per page
- sitemap
- robots
- Open Graph
- JSON LD
- headings structure
- image alt text

### 5. UI Agent

Responsible for:
- premium clean visual direction
- mobile first layout
- cards
- spacing
- sticky CTAs
- forms

### 6. QA Agent

Responsible for:
- install
- lint
- typecheck if available
- build
- route review
- no lorem ipsum
- no broken links
- mobile RTL sanity check

## Required pages

Implement these routes:

- `/`
- `/services`
- `/styles`
- `/products`
- `/projects`
- `/process`
- `/professionals`
- `/send-plans`
- `/about`
- `/contact`

## SEO requirements

Every page must have:

- title
- description
- H1
- Open Graph title
- Open Graph description
- canonical friendly URL

Add:

- `app/sitemap.ts`
- `app/robots.ts`
- JSON LD business schema helper

Use placeholder domain until real domain is provided:

`https://ashbel-aluminum.example`

Make this domain centralized and easy to replace.

## Forms

Phase one form behavior:

- Build accessible forms.
- No database.
- No fake backend.
- For now, forms can either:
  - use `mailto:` fallback
  - show clear instructions to send by WhatsApp
  - be ready for future API endpoint

Do not claim the form sends to AshbelOS unless integration is implemented.

## Phone and WhatsApp

Known phone candidate:

`055-960-7033`

Use as configurable constant and mark for confirmation before launch.

## Design requirements

- Premium bright visual language.
- Hebrew RTL.
- Mobile first.
- Accessible buttons.
- Large touch targets.
- No heavy animation.
- No cheap icon style.
- Use real image placeholders with clear replacement instructions.

## Verification commands

Run the commands that match the actual package manager:

```bash
npm install
npm run lint
npm run build
```

If using pnpm or yarn, report why.

## Completion report

At the end, report:

1. Files created.
2. Pages implemented.
3. SEO implemented.
4. Forms behavior.
5. Verification command outputs.
6. Known placeholders.
7. What still requires real business input.
8. Deployment readiness.

## Hard stop conditions

Stop and report if:

- The repo cannot be initialized.
- Dependencies fail to install because of environment issue.
- Build fails and cannot be fixed safely.
- Real credentials are required.
- Deployment credentials are required.

Do not silently skip verification.
