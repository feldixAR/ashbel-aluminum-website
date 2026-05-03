import { chromium } from 'playwright';
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const baseUrl = process.env.VISUAL_BASE_URL || 'http://127.0.0.1:4173';
const outputDir = path.resolve('artifacts/visual-review');
const publicOutputDir = path.resolve('public/visual-review');
const routes = ['/', '/services', '/styles', '/products', '/projects', '/process', '/professionals', '/upload', '/about', '/contact'];
const viewports = [
  { name: 'desktop', width: 1440, height: 1100 },
  { name: 'mobile', width: 390, height: 900 },
];
const contactSheetItems = [
  { file: 'desktop-home.png', label: 'Desktop home' },
  { file: 'mobile-home.png', label: 'Mobile home' },
  { file: 'mobile-menu-open.png', label: 'Mobile menu open' },
  { file: 'desktop-upload.png', label: 'Desktop upload' },
  { file: 'mobile-upload.png', label: 'Mobile upload' },
  { file: 'desktop-professionals.png', label: 'Desktop professionals' },
  { file: 'mobile-professionals.png', label: 'Mobile professionals' },
  { file: 'desktop-contact.png', label: 'Desktop contact' },
  { file: 'mobile-contact.png', label: 'Mobile contact' },
];

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();
const findings = [];
const internalLinks = new Set();

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport, locale: 'he-IL' });
  const pageErrors = [];
  const consoleErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });

  for (const route of routes) {
    const url = new URL(route, baseUrl).toString();
    const response = await page.goto(url, { waitUntil: 'networkidle' });
    const status = response?.status() ?? 0;
    const direction = await page.locator('html').getAttribute('dir');
    const h1Count = await page.locator('h1').count();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    const links = await page.locator('a[href^="/"]').evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute('href')).filter(Boolean));
    for (const link of links) {
      internalLinks.add(link.split('#')[0]);
    }
    const screenshotName = `${viewport.name}-${route === '/' ? 'home' : route.slice(1)}.png`;
    await page.screenshot({ path: path.join(outputDir, screenshotName), fullPage: true });

    findings.push({
      route,
      viewport: viewport.name,
      status,
      direction,
      h1Count,
      overflow,
      screenshot: screenshotName,
      pageErrors: [...pageErrors],
      consoleErrors: [...consoleErrors],
    });

    pageErrors.length = 0;
    consoleErrors.length = 0;
  }

  await page.close();
}

const mobilePage = await browser.newPage({ viewport: { width: 390, height: 900 }, locale: 'he-IL' });
await mobilePage.goto(new URL('/', baseUrl).toString(), { waitUntil: 'networkidle' });
await mobilePage.getByRole('button', { name: /תפריט/ }).click();
await mobilePage.screenshot({ path: path.join(outputDir, 'mobile-menu-open.png'), fullPage: true });
await mobilePage.close();

const brokenLinks = [...internalLinks].filter((link) => !routes.includes(link));
const failed = findings.filter((finding) => finding.status >= 400 || finding.direction !== 'rtl' || finding.h1Count !== 1 || finding.overflow || finding.pageErrors.length || finding.consoleErrors.length);
await writeFile(path.join(outputDir, 'visual-review.json'), `${JSON.stringify({ baseUrl, findings, brokenLinks, failed }, null, 2)}\n`, 'utf8');
await writeFile(path.join(outputDir, 'summary.md'), buildSummary({ baseUrl, findings, brokenLinks, failed }), 'utf8');

const contactSheetPage = await browser.newPage({ viewport: { width: 1800, height: 2400 }, deviceScaleFactor: 1 });
await contactSheetPage.setContent(buildContactSheetHtml(), { waitUntil: 'load' });
await contactSheetPage.screenshot({ path: path.join(outputDir, 'contact-sheet.png'), fullPage: true });
await contactSheetPage.close();
await browser.close();
await syncPublicReviewOutput();

if (failed.length || brokenLinks.length) {
  console.error(JSON.stringify({ failed, brokenLinks }, null, 2));
  process.exit(1);
}

console.log(`Visual review completed for ${routes.length} routes across ${viewports.length} viewports.`);

async function syncPublicReviewOutput() {
  await rm(publicOutputDir, { recursive: true, force: true });
  await mkdir(publicOutputDir, { recursive: true });
  await cp(outputDir, publicOutputDir, { recursive: true });
}

function buildSummary({ baseUrl: reviewedBaseUrl, findings: reviewFindings, brokenLinks: reviewBrokenLinks, failed: reviewFailed }) {
  const rows = reviewFindings
    .map((finding) => `| ${finding.viewport} | ${finding.route} | ${finding.status} | ${finding.direction} | ${finding.h1Count} | ${finding.overflow ? 'Yes' : 'No'} | ${finding.screenshot} |`)
    .join('\n');
  const status = reviewFailed.length || reviewBrokenLinks.length ? 'FAIL' : 'PASS';

  return `# Visual Review Summary

- Status: ${status}
- Base URL: ${reviewedBaseUrl}
- Routes checked: ${routes.length}
- Viewports checked: ${viewports.map((viewport) => viewport.name).join(', ')}
- Contact sheet: contact-sheet.png
- Full JSON report: visual-review.json

## External Review Shortlist

The contact sheet combines the highest-priority review screens:

${contactSheetItems.map((item) => `- ${item.label}: ${item.file}`).join('\n')}

## Automated Checks

- HTTP status under 400
- RTL document direction
- Exactly one H1 per route
- No horizontal overflow
- No page errors or console errors
- No broken internal links discovered from rendered pages

## Route Results

| Viewport | Route | Status | Direction | H1 count | Overflow | Screenshot |
| --- | --- | --- | --- | --- | --- | --- |
${rows}

## Broken Internal Links

${reviewBrokenLinks.length ? reviewBrokenLinks.map((link) => `- ${link}`).join('\n') : '- None'}

## Failed Checks

${reviewFailed.length ? reviewFailed.map((finding) => `- ${finding.viewport} ${finding.route}`).join('\n') : '- None'}
`;
}

function buildContactSheetHtml() {
  const cards = contactSheetItems
    .map((item) => {
      const url = pathToFileURL(path.join(outputDir, item.file)).href;
      return `<article class="card"><h2>${item.label}</h2><img src="${url}" alt="${item.label}"></article>`;
    })
    .join('');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <style>
      body {
        margin: 0;
        background: #f4f6f8;
        color: #18202a;
        font-family: Arial, sans-serif;
      }
      main {
        padding: 36px;
      }
      h1 {
        margin: 0 0 8px;
        font-size: 34px;
      }
      p {
        margin: 0 0 28px;
        color: #5c6673;
        font-size: 18px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 22px;
      }
      .card {
        overflow: hidden;
        border: 1px solid #d5dde5;
        background: white;
        box-shadow: 0 12px 35px rgb(24 32 42 / 10%);
      }
      h2 {
        margin: 0;
        border-bottom: 1px solid #d5dde5;
        padding: 12px 14px;
        background: #17212b;
        color: white;
        font-size: 18px;
      }
      img {
        display: block;
        width: 100%;
        height: 460px;
        object-fit: contain;
        object-position: top center;
        background: #eef2f5;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Ashbel Aluminum Visual QA Contact Sheet</h1>
      <p>Priority screenshots for external review. Full-size images and JSON details are included in the same artifact folder.</p>
      <section class="grid">${cards}</section>
    </main>
  </body>
</html>`;
}
