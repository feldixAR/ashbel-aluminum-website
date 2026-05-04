import { chromium } from 'playwright';
import { spawn } from 'node:child_process';

const baseUrl = process.env.E2E_BASE_URL || 'http://127.0.0.1:4173';
const productRoutes = ['/products/belgian-style', '/products/modern-style', '/products/sliding-systems', '/products/shading-systems', '/products/additional-solutions'];
const routes = ['/', '/services', '/styles', '/products', ...productRoutes, '/projects', '/process', '/professionals', '/upload', '/about', '/contact'];
const externalSchemes = ['tel:', 'mailto:', 'https://wa.me/', 'https://commons.wikimedia.org/'];
let serverProcess;

await ensureServer();

const browser = await chromium.launch();
const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 }, locale: 'he-IL' });
const mobile = await browser.newPage({ viewport: { width: 390, height: 900 }, locale: 'he-IL' });

try {
  await checkAllRoutes(desktop);
  await checkNavigation(desktop);
  await checkMobileMenu(mobile);
  await checkHome(desktop, mobile);
  await checkProducts(desktop, mobile);
  await checkProjects(desktop);
  await checkUpload(desktop, mobile);
  await checkProfessionals(desktop);
  await checkContact(desktop);
  await browser.close();
  stopServer();
  console.log('E2E checks passed.');
} catch (error) {
  await browser.close();
  stopServer();
  console.error(error);
  process.exit(1);
}

async function ensureServer() {
  if (await isUp()) return;

  const command = process.platform === 'win32' ? 'cmd.exe' : 'npm';
  const args = process.platform === 'win32'
    ? ['/d', '/s', '/c', 'npm.cmd run start -- -p 4173 -H 127.0.0.1']
    : ['run', 'start', '--', '-p', '4173', '-H', '127.0.0.1'];

  serverProcess = spawn(command, args, {
    stdio: 'ignore',
    shell: false,
  });

  for (let attempt = 0; attempt < 30; attempt += 1) {
    if (await isUp()) return;
    await delay(1000);
  }

  stopServer();
  throw new Error('Local server did not become ready for E2E checks.');
}

async function isUp() {
  try {
    const response = await fetch(baseUrl);
    return response.status < 500;
  } catch {
    return false;
  }
}

function stopServer() {
  if (serverProcess) {
    serverProcess.kill();
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function checkAllRoutes(page) {
  const internalLinks = new Set();

  for (const route of routes) {
    const response = await page.goto(new URL(route, baseUrl).toString(), { waitUntil: 'networkidle' });
    expect(response?.status() < 400, `${route} returned ${response?.status()}`);
    expect(await page.locator('html').getAttribute('dir') === 'rtl', `${route} is not RTL`);
    expect(await page.locator('h1').count() === 1, `${route} does not have exactly one H1`);
    expect(!(await hasHorizontalOverflow(page)), `${route} has horizontal overflow`);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    expect(await waitForImages(page), `${route} has one or more broken images`);
    await page.evaluate(() => window.scrollTo(0, 0));

    const links = await page.locator('a[href]').evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute('href')).filter(Boolean));
    for (const href of links) {
      if (href.startsWith('/')) internalLinks.add(href.split('#')[0]);
      if (!href.startsWith('/') && !externalSchemes.some((scheme) => href.startsWith(scheme))) {
        throw new Error(`Unexpected external link on ${route}: ${href}`);
      }
    }
  }

  for (const link of internalLinks) {
    expect(routes.includes(link), `Internal link is not a public route: ${link}`);
    const response = await page.goto(new URL(link, baseUrl).toString(), { waitUntil: 'domcontentloaded' });
    expect(response?.status() < 400, `Internal link ${link} returned ${response?.status()}`);
  }
}

async function checkNavigation(page) {
  await page.goto(baseUrl, { waitUntil: 'networkidle' });

  const headerLinks = await page.locator('header a[href^="/"]').filter({ visible: true }).evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute('href')).filter(Boolean));
  expect(headerLinks.length >= 6, 'Header does not expose the expected simplified navigation links.');

  for (const href of [...new Set(headerLinks)]) {
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    const link = page.locator(`header a[href="${href}"]`).filter({ visible: true }).first();
    expect(await link.count() === 1, `Visible header link is missing: ${href}`);
    await link.click();
    await page.waitForURL((url) => new URL(url).pathname === href);
    expect(new URL(page.url()).pathname === href, `Header link did not navigate to ${href}`);
  }

  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  expect(await page.locator('footer').count() === 1, 'Footer is missing.');
  const footerInternalLinks = await page.locator('footer a[href^="/"]').evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute('href')).filter(Boolean));
  for (const href of [...new Set(footerInternalLinks)]) {
    const response = await page.goto(new URL(href, baseUrl).toString(), { waitUntil: 'domcontentloaded' });
    expect(response?.status() < 400, `Footer link ${href} returned ${response?.status()}`);
  }
}

async function checkMobileMenu(page) {
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  const menuButton = page.locator('button[aria-controls="mobile-menu"]');
  await menuButton.click();
  expect(await menuButton.getAttribute('aria-expanded') === 'true', 'Mobile menu did not open.');
  expect(await page.locator('#mobile-menu.open').count() === 1, 'Mobile menu open state is missing.');
  await menuButton.click();
  expect(await menuButton.getAttribute('aria-expanded') === 'false', 'Mobile menu did not close.');

  await menuButton.click();
  await page.locator('#mobile-menu a[href="/products"]').click();
  await page.waitForURL((url) => new URL(url).pathname === '/products');
  expect(new URL(page.url()).pathname === '/products', 'Mobile menu link did not navigate.');
  expect(await hasHorizontalOverflow(page) === false, 'Mobile products page has horizontal overflow.');
}

async function checkHome(page, mobilePage) {
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  const text = await page.locator('body').innerText();
  expectIncludes(text, ['אשבל', 'אלומיניום', 'חלונות', 'ויטרינות', 'תוכנית', 'פגישה'], 'Home business positioning is incomplete.');
  expect(text.includes('חלון') || text.includes('חלונות') || text.includes('ויטרינות'), 'Home does not communicate windows/opening work.');
  expect(await page.locator('main a[href="/upload"], main a[href="/contact"]').count() > 0, 'Home main CTA does not lead to upload/contact.');
  expect(await page.locator('main a[href^="tel:"], main a[href^="https://wa.me/"]').count() > 0, 'Home phone or WhatsApp action is missing.');

  await mobilePage.goto(baseUrl, { waitUntil: 'networkidle' });
  const firstCtaBox = await mobilePage.locator('main a[href="/upload"]').first().boundingBox();
  expect(Boolean(firstCtaBox && firstCtaBox.y < 700), 'Mobile home upload CTA is not visible early.');
}

async function checkProducts(page, mobilePage) {
  await page.goto(new URL('/products', baseUrl).toString(), { waitUntil: 'networkidle' });
  const text = await page.locator('body').innerText();
  expectIncludes(text, ['המראה הבלגי', 'המראה המודרני', 'מערכות הצללה', 'ויטרינות והזזה', 'פתרונות נוספים'], 'Product gallery categories are incomplete.');
  expect(await page.locator('main a[href="/upload"]').count() > 0, 'Products upload CTA is missing.');
  expect(await page.locator('.product-gateway-block').count() === 5, 'Products page does not expose five large product blocks.');

  const oldTitles = ['קליל בלגי 1700', 'קליל בלגי 4300', 'קליל בלגי 7300'];
  const headings = await page.locator('main h2').evaluateAll((nodes) => nodes.map((node) => node.textContent?.trim() ?? ''));
  for (const title of oldTitles) {
    expect(!headings.includes(title), `Old product card title is still visible: ${title}`);
  }

  await mobilePage.goto(new URL('/products', baseUrl).toString(), { waitUntil: 'networkidle' });
  expect(await hasHorizontalOverflow(mobilePage) === false, 'Mobile products page has horizontal overflow.');
  expect(await mobilePage.locator('.product-gateway-block').first().isVisible(), 'Mobile products gallery is not visible.');

  for (const route of productRoutes) {
    const response = await page.goto(new URL(route, baseUrl).toString(), { waitUntil: 'networkidle' });
    expect(response?.status() < 400, `${route} returned ${response?.status()}`);
    expect(await page.locator('main img').count() >= 3, `${route} does not include at least three meaningful images.`);
    expect(await page.locator('main a[href="/upload"]').count() > 0, `${route} upload CTA is missing.`);
  }
}

async function checkProjects(page) {
  await page.goto(new URL('/projects', baseUrl).toString(), { waitUntil: 'networkidle' });
  const text = await page.locator('body').innerText();
  expectIncludes(text, ['דוגמאות מהשטח', 'המצב', 'נקודות לתיאום', 'כיוון עבודה', 'מה להכין לפגישה'], 'Field examples page is incomplete.');
  expectIncludes(text, ['בית פרטי בבנייה', 'שיפוץ בית קיים', 'ויטרינה לסלון'], 'Field examples do not cover realistic aluminum work scenarios.');
  expect(await page.locator('main a[href="/upload"], main a[href="/contact"]').count() > 0, 'Projects page does not lead to upload/contact.');
}

async function checkUpload(page, mobilePage) {
  await page.goto(new URL('/upload', baseUrl).toString(), { waitUntil: 'networkidle' });
  const text = await page.locator('body').innerText();
  expectIncludes(text, ['תוכנית אלומיניום', 'תוכנית אדריכלית', 'מידות', 'כתב כמויות', 'פגישה מקצועית', 'אין כאן הצעת מחיר אוטומטית'], 'Upload intake explanation is incomplete.');
  expect(await page.locator('main a[href^="tel:"], main a[href^="https://wa.me/"], main a[href^="mailto:"]').count() > 0, 'Upload action fallback is missing.');

  await mobilePage.goto(new URL('/upload', baseUrl).toString(), { waitUntil: 'networkidle' });
  expect(await hasHorizontalOverflow(mobilePage) === false, 'Mobile upload page has horizontal overflow.');
  expect(await mobilePage.locator('main a[href^="https://wa.me/"], main a[href^="tel:"]').first().isVisible(), 'Mobile upload CTA is not visible.');
}

async function checkProfessionals(page) {
  await page.goto(new URL('/professionals', baseUrl).toString(), { waitUntil: 'networkidle' });
  const text = await page.locator('body').innerText();
  expectIncludes(text, ['אדריכלים', 'מעצבים', 'קבלנים', 'תוכניות', 'לא מערכת חשבון'], 'Professionals page does not address the required audiences.');
  expect(await page.locator('main a[href="/upload"]').count() > 0, 'Professionals action path is missing.');
}

async function checkContact(page) {
  await page.goto(new URL('/contact', baseUrl).toString(), { waitUntil: 'networkidle' });
  expect(await page.locator('a[href^="tel:"]').count() > 0, 'Contact phone link is missing.');
  expect(await page.locator('a[href^="https://wa.me/"]').count() > 0, 'Contact WhatsApp link is missing.');
  expect(await page.locator('a[href^="mailto:"]').count() > 0, 'Contact email fallback is missing.');
}

async function hasHorizontalOverflow(page) {
  return page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
}

async function waitForImages(page) {
  return page.evaluate(() =>
    Promise.all(
      [...document.images].map((image) => {
        if (image.complete) {
          return image.naturalWidth > 0 && image.naturalHeight > 0;
        }

        return new Promise((resolve) => {
          const finish = () => resolve(image.naturalWidth > 0 && image.naturalHeight > 0);
          image.addEventListener('load', finish, { once: true });
          image.addEventListener('error', finish, { once: true });
          setTimeout(finish, 4000);
        });
      }),
    ).then((results) => results.every(Boolean)),
  );
}

function expect(value, message) {
  if (!value) throw new Error(message);
}

function expectIncludes(text, terms, message) {
  const missing = terms.filter((term) => !text.includes(term));
  if (missing.length) throw new Error(`${message} Missing: ${missing.join(', ')}`);
}
