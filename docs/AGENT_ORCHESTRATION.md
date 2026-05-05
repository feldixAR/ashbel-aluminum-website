# Agent Orchestration Model

## Purpose

Use this model for every significant work pass. The goal is to make AI work like a focused website delivery team, not like a single code generator.

## Main orchestrator

The orchestrator owns scope, sequencing and quality. It must keep the website aligned with the business goal and must not drift into unrelated systems.

Before implementation, the orchestrator should split the work into the roles below.

## Required roles

### Product strategist

Checks positioning, audiences, conversion goals and page purpose.

Outputs:

- target audience clarity
- page goals
- CTA map
- trust signals

### UX designer

Checks information architecture, navigation, page flow and mobile usability.

Outputs:

- header and menu structure
- homepage section order
- internal page structure
- mobile menu requirements

### Visual designer

Checks brand feeling and interface quality.

Outputs:

- visual hierarchy
- spacing system
- card and section language
- premium aluminum aesthetic

### Hebrew copywriter

Checks Hebrew business language.

Outputs:

- clear headlines
- concise subheadlines
- practical CTAs
- no weak or exaggerated phrasing

### SEO specialist

Checks metadata, keywords, sitemap, robots, JSON LD, headings and internal links.

Outputs:

- page metadata
- SEO map
- structured data checks
- internal linking suggestions

### Frontend engineer

Implements in Next.js, TypeScript and Tailwind.

Outputs:

- clean components
- reusable section primitives
- responsive RTL layouts
- static Vercel friendly build

### QA agent

Verifies routes, links, CTAs, mobile, RTL, accessibility basics and build results.

Outputs:

- checked route list
- broken link findings
- mobile findings
- final verification commands

### DevOps agent

Keeps CI, Vercel and deployment stable.

Outputs:

- CI status
- Vercel build status
- dependency/security warnings
- no config drift

## Parallel work pattern

When using Codex, Claude or another agentic coding tool, express the work as a coordinated set of internal workstreams:

1. Product and content review
2. UX and navigation review
3. Visual system redesign
4. Frontend implementation
5. SEO and metadata review
6. QA and verification
7. Report update

The agent may implement sequentially, but it must think and validate across all workstreams.

## Hooks and skills guidance

A project agent should always load these fixed documents before acting:

- AGENTS.md
- docs/PROJECT_OPERATING_MODEL.md
- docs/WEBSITE_ACCEPTANCE_SPEC.md
- docs/AGENT_ORCHESTRATION.md
- docs/PRE_PRODUCTION_CHECKLIST.md

Use hooks or rules in agent tools to enforce:

- read project docs before coding
- no merge without checklist
- no fake features
- no AshbelOS coupling in phase one
- run lint, typecheck and build
- update implementation report

## Completion contract

Every implementation pass must end with:

- files changed
- routes affected
- verification results
- known gaps
- next recommended action

Do not report completion only because the build passed.
