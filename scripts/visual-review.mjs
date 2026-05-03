import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const baseUrl = process.env.VISUAL_BASE_URL || 'http://127.0.0.1:4173';
const outputDir = path.resolve('artifacts/visual-review');
const routes = ['/', '/services', '/styles', '/products', '/projects', '/process', '/professionals', '/upload', '/about', '/contact'];
const viewports = [
  { name: 'desktop', width: 1440, height: 1100 },
  { name: 'mobile', width: 390, height: 900 },
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
await browser.close();

const failed = findings.filter((finding) => finding.status >= 400 || finding.direction !== 'rtl' || finding.h1Count !== 1 || finding.overflow || finding.pageErrors.length || finding.consoleErrors.length);
await writeFile(path.join(outputDir, 'visual-review.json'), `${JSON.stringify({ baseUrl, findings, brokenLinks, failed }, null, 2)}\n`, 'utf8');

if (failed.length || brokenLinks.length) {
  console.error(JSON.stringify({ failed, brokenLinks }, null, 2));
  process.exit(1);
}

console.log(`Visual review completed for ${routes.length} routes across ${viewports.length} viewports.`);
