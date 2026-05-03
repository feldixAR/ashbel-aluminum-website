# Ashbel Website Completion Source of Truth

## Purpose
This document is the binding source of truth for completing the Ashbel Aluminum website. It connects the original site specification, the approved benchmark sites, the current visual gaps, the agent lanes, and the final visual QA loop.

The goal is not to build a generic aluminum website. The goal is to finish a premium Hebrew RTL marketing website for Ashbel Aluminum that converts private home owners, renovators, architects, contractors and supervisors into high-quality inquiries through plan/photo submission, WhatsApp, phone and contact forms.

## Approved benchmark sources
Only these benchmark sources are approved for this completion cycle:

1. Aleftaf, א.ת אלומיניום: https://aleftaf.co.il/
2. Gruper, גרופר תעשיות אלומיניום: https://www.gruper.co.il/old-home and https://www.gruper.co.il/about-us

Do not use the B144 Gruper local page as a design or content benchmark for this cycle.

## What to extract from Aleftaf
Aleftaf is useful for brand authority, scale, project confidence and industrial/aluminum credibility.

Relevant patterns:
1. Strong hero statement with emotional positioning, not only a service list.
2. Selected projects shown as a credibility layer.
3. Story section that explains experience, innovation, precision, service and professionalism.
4. Trust proof through years of experience, project scale and partner/customer logos.
5. Factory/operation confidence: raw materials, mechanization, deadlines and project delivery.
6. Professional audience language: architects, entrepreneurs, supervisors, aluminum consultants and contractors.

Rules for Ashbel:
1. Do not copy Aleftaf's scale claims.
2. Do not invent project numbers, partner logos, certifications or clients.
3. Translate the useful pattern into Ashbel scale: private homes, villas, renovations, plan review, accurate opening/system fit and installation readiness.

## What to extract from Gruper
Gruper is useful for product breadth, product story and customer flow.

Relevant patterns:
1. A clear statement that the company handles many aluminum product families.
2. Products are presented as custom-made systems based on client need, measurements and selected colors.
3. Product families include windows, vitrines, pergolas, gates, fences, wall cladding and related aluminum envelope elements.
4. The quote process begins by organizing architectural plans, aluminum specs or a list of openings.
5. Personal meeting/consultation and professional advice are part of the customer journey.

Rules for Ashbel:
1. Use the product breadth pattern only where relevant to Ashbel.
2. Keep the site focused on windows, vitrines, sliding systems, Belgian look, shutters, shading, nets and large openings unless the business decides to add more categories.
3. The key conversion path is plan/photo submission for professional review.

## Current Ashbel website status
The current website already has the correct foundation:
1. Hebrew RTL site.
2. Next.js App Router, TypeScript and Tailwind.
3. Routes: home, services, styles, products, projects, process, professionals, upload, about and contact.
4. Clear CTAs to WhatsApp, phone, contact and material upload.
5. Basic SEO, sitemap, robots and LocalBusiness structured data.
6. Visual Review Gateway with screenshots for desktop and mobile.

## Current gaps to fix
These gaps are binding until resolved:

1. Typography is too generic. Arial as the main font weakens the premium feel.
2. Logo/brand mark is too generic. It must feel like an aluminum/window company, not a template mark.
3. Products page is too informational. It must become a visual product category story, closer to the user-provided reference: tall panels, strong visual hierarchy, dark overlay, large category names and short product story.
4. Projects page lacks real proof. Until real photos exist, it must use strong scenario-based proof with context, problem, solution and what to send for review.
5. Homepage must prioritize the upload/review path more strongly.
6. Professional audience flow must be sharper: architects, contractors, supervisors and private builders need to understand exactly what to send and what they get back.
7. Trust layer must be stronger without fake claims: process, experience style, careful review, realistic expectations and field coordination.
8. Visual artifacts must be readable by AI and by humans after every major change.
9. Mobile must remain fully usable with clear CTA and no horizontal overflow.

## Product story requirement
The products page must not be a list of series only.

Required product story:
1. The customer starts with a need, not with a product name.
2. Ashbel checks the opening, use case, measurements, style, sealing needs, shading, nets, shutters, levels and field constraints.
3. Product families are presented visually first, then explained professionally.
4. Every category must connect to a practical question: where is it used, what must be checked, and what should the customer send.
5. Kalil series references are allowed only as general educational information, without implying official authorization or a binding technical specification.

## Required products page structure
1. Page intro: explains that series choice starts from the opening.
2. Visual product category gallery: tall panels similar in spirit to the provided reference image.
3. Product story section: explains how Ashbel moves from need to opening review to system recommendation.
4. Checklist section: what to check before choosing each system.
5. CTA: send plans, dimensions, photos or bill of quantities for review.

## Brand and typography requirement
1. Use a modern Hebrew font direction. Prefer Noto Sans Hebrew or Assistant if feasible without unstable external dependencies.
2. Keep RTL correct.
3. Improve logo/brand mark to suggest a window frame, aluminum profile or architectural opening.
4. Header must feel stable, professional and premium.
5. Avoid decorative overload.

## Projects requirement
Until real project images are available:
1. Do not use generic grey placeholders.
2. Use scenario cards with architectural/aluminum visuals.
3. Each scenario must include context, challenge, professional response and what the customer should send.
4. Do not invent addresses, customer names, certifications or claims.

## Upload path requirement
The upload page is the primary conversion path.
It should feel like a professional review intake, not a generic contact form.

Required emphasis:
1. What to upload: plans, photos, openings list, bill of quantities, aluminum specification.
2. What Ashbel checks: dimensions, opening type, series direction, shutters, nets, glass, field constraints and next step.
3. What not to promise: no instant quote guarantee without review.

## Agent lanes and non-overlap rules
Agents should work in parallel where possible, but with clear ownership to avoid overwrites.

1. Benchmark agent
   Owns: competitor benchmark document and extracted patterns.
   Must not edit UI code.

2. Spec agent
   Owns: ASHBEL_WEBSITE_SPEC.md and completion source-of-truth docs.
   Must not edit runtime code unless explicitly assigned.

3. Products UI agent
   Owns: src/app/products/page.tsx, products CSS and product data if required.
   Must not change unrelated pages.

4. Brand/typography agent
   Owns: global typography, header, logo/brand mark and layout tokens.
   Must coordinate before editing globals.css if another agent is editing it.

5. Projects/trust agent
   Owns: projects page, project data and homepage trust/project sections.
   Must not invent proof.

6. Upload/conversion agent
   Owns: upload page, contact paths and CTA clarity.

7. Visual QA agent
   Owns: npm run lint, npm run typecheck, npm run build, npm run visual:review, artifact generation and screenshot review.
   Must not approve completion without inspecting the latest screenshots.

8. Fix loop agent
   Owns: targeted fixes after visual QA.
   Must not start a redesign unless the visual QA proves the page is still materially below benchmark.

## Token efficiency rules
1. Read only the files needed for the current lane.
2. Avoid full repository scans unless diagnosing a global issue.
3. Prefer targeted CSS files for page-specific work to avoid large globals.css conflicts.
4. Keep documents concise but complete.
5. Do not repeat benchmark text in every prompt. Reference this file as the source of truth.
6. Commit small, reviewable changes by lane.

## Validation commands
Every completion pass must run:

```bash
npm run lint
npm run typecheck
npm run build
npm run visual:review
```

After visual review, inspect at minimum:
1. desktop-home.png
2. desktop-products.png
3. desktop-projects.png
4. desktop-upload.png
5. desktop-professionals.png
6. mobile-home.png
7. mobile-products.png
8. mobile-projects.png
9. mobile-upload.png
10. mobile-menu-open.png

## Completion definition
The website is not complete until:
1. The spec is updated.
2. Benchmark document exists.
3. Products page matches the required visual category story.
4. Projects page no longer looks like placeholder content.
5. Header/logo/typography are improved.
6. Upload path is prominent and professional.
7. Visual review passes automated checks.
8. Latest screenshots are inspected.
9. Any visible critical issue is fixed and visual review is rerun.

## Hard limits
Do not:
1. Merge to main.
2. Change DNS.
3. Publish production outside the current PR/preview flow.
4. Use paid external services.
5. Generate AI images for the site unless explicitly requested.
6. Invent customers, certifications, project photos or unsupported claims.
