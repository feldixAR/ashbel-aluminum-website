# Visual Review Gateway

## Purpose

The visual review gateway gives external reviewers a direct browser view of Playwright screenshots for the current PR. It avoids manual transfer of ZIP artifacts when reviewers need to inspect the rendered site.

## Generated files

Running `npm run visual:review` writes the review bundle to:

- `artifacts/visual-review/`
- `public/visual-review/`

The bundle includes:

- individual desktop and mobile screenshots for every current public route
- mobile menu open-state screenshot
- `contact-sheet.png`
- `summary.md`
- `visual-review.json`

## Browser gateway

The hidden review route is:

- `/visual-review`

It shows:

- the generated contact sheet
- the generated Markdown summary
- direct browser links to priority screenshots
- direct browser links to all generated screenshot files

## SEO and public visibility

- `/visual-review` is not linked from public navigation.
- `/visual-review` is excluded from the sitemap.
- `/visual-review` sets `noindex,nofollow`.
- The route is only a temporary PR visual review gateway and is not part of the public marketing website.

## Reviewer workflow

1. Open the Vercel Preview deployment for the PR.
2. Visit `/visual-review`.
3. Review `contact-sheet.png` first for the high-priority screens.
4. Open `summary.md` for automated route and viewport checks.
5. Use the individual screenshot links when a closer view is needed.

GitHub Actions artifacts remain secondary evidence. The primary review path is the browser-visible gateway.
