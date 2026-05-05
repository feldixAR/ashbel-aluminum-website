# Ashbel Website Project Operating Model

## Project identity

This repository is the public Hebrew RTL marketing website for Ashbel Aluminum. It is separate from AshbelOS.

AshbelOS may later receive leads from this website, but the website remains a public lead generation and trust building asset.

## Current state

The project has a working Next.js preview, CI and Vercel deployment path. The remaining gap is product quality: UI, navigation, conversion flow, SEO completeness and launch readiness.

A green build is not completion. It proves deployability only.

## Business goal

Create a premium professional website for private homes, villas, architects, contractors, supervisors, developers and quality renovation projects.

Primary conversion action: send plans, photos or project details for initial professional direction.

Secondary actions: call, WhatsApp, contact form and professional consultation request.

## Positioning

The site should feel professional, accurate, practical, premium, trustworthy and architecturally aware.

The site must not become a CRM, a customer dashboard, a live pricing system, a CMS project or a technology product.

## Visual direction

Use white, light silver, soft gray, charcoal and steel blue accents. Keep the feeling clean, architectural and premium. Avoid cartoon visuals, overloaded gradients and generic scaffold layouts.

## Stack

Keep the stack stable: Next.js App Router, TypeScript, Tailwind CSS, static data files, Vercel and GitHub Actions.

Do not add CMS, authentication, database, live AshbelOS integration, paid services or automatic quote logic without explicit approval.

## Work rule

Every implementation pass must read:

1. AGENTS.md
2. docs/PROJECT_OPERATING_MODEL.md
3. docs/WEBSITE_ACCEPTANCE_SPEC.md
4. docs/AGENT_ORCHESTRATION.md
5. docs/PRE_PRODUCTION_CHECKLIST.md

Work on the existing PR branch unless explicitly told otherwise. Push directly to the branch. Do not leave changes waiting for a manual Codex Update branch action when direct push is available.

## Definition of ready

The website is ready only when CI is green, Vercel Preview works, the homepage looks finished, the header and mobile menu are strong, internal pages are designed, every page has CTAs and metadata, contact channels work, RTL and mobile are checked and remaining TODOs are only owner assets such as logo, project photos, domain, analytics and Search Console.
