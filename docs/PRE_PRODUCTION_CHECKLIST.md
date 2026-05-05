# Pre Production Checklist

Use this checklist before merging to main or treating the website as launch ready.

## Technical

- GitHub CI is green.
- Vercel Preview is successful.
- npm install completed.
- npm run lint completed.
- npm run typecheck completed.
- npm run build completed.
- No critical dependency warning blocks deployment.
- vercel.json remains valid.
- robots.txt works.
- sitemap.xml works.

## Routes

Check these routes manually in preview:

- /
- /services
- /styles
- /products
- /projects
- /process
- /professionals
- /upload
- /about
- /contact

## Navigation

- Desktop header is clear.
- Mobile menu opens and closes correctly.
- Links go to the right pages.
- CTA actions are visible.
- No crowded or random menu layout.

## Contact actions

- Phone number is correct: 055-960-7033.
- WhatsApp link uses the correct phone number.
- Contact page includes clear action options.
- Upload flow explains what the user should send.
- Professionals page explains what architects and contractors should send.

## Content

- Hebrew is natural and professional.
- No lorem ipsum.
- No copied protected text.
- No unverified claims.
- No fake instant quote promise.
- No fake login or dashboard language.
- No mention of live AshbelOS integration as if already active.

## SEO

- Every page has metadata.
- Every page has one clear H1.
- Titles and descriptions are unique.
- LocalBusiness JSON LD exists.
- Sitemap includes all public routes.
- Robots file is correct.
- Internal links are useful.
- Open Graph basics exist.

## UX and conversion

- Homepage immediately explains the business.
- Homepage has strong CTAs above the fold.
- Every main page tells the user what to do next.
- Professionals and upload flows are clear.
- Final CTA exists on main conversion pages.

## Visual quality

- Site does not look like a scaffold.
- Header looks finished.
- Hero looks premium and intentional.
- Cards and sections have hierarchy.
- Internal pages look designed.
- Mobile layout is clean.
- Spacing, typography and contrast are consistent.

## Owner assets still allowed as TODOs

These may remain open before first production if clearly documented:

- final logo
- real project photos
- final domain
- analytics
- Google Search Console
- exact legal footer details if not yet provided

## Merge rule

Do not merge until technical checks, preview check and product quality check are all acceptable.
