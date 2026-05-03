import { chromium } from 'playwright';
import { readFile, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dir = path.resolve('artifacts/visual-review');
const commit = (process.env.GITHUB_SHA || 'local').slice(0, 8);
const run = process.env.GITHUB_RUN_NUMBER || 'local';
const stamp = `${commit}-run-${run}`;
const jpgName = `ai-review-contact-sheet-${stamp}.jpg`;
const htmlName = `ai-review-embedded-${stamp}.html`;

const files = [
  'desktop-home.png','desktop-services.png','desktop-styles.png','desktop-products.png','desktop-projects.png','desktop-process.png','desktop-professionals.png','desktop-upload.png','desktop-about.png','desktop-contact.png',
  'mobile-home.png','mobile-services.png','mobile-styles.png','mobile-products.png','mobile-projects.png','mobile-process.png','mobile-professionals.png','mobile-upload.png','mobile-about.png','mobile-contact.png','mobile-menu-open.png'
];

const cards = files.map((file) => `<article><h2>${file}</h2><img src="${pathToFileURL(path.join(dir, file)).href}" alt="${file}"></article>`).join('');
const html = `<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;background:#e8eef3;color:#121820;font-family:Arial,sans-serif}main{padding:18px}h1{font-size:26px;margin:0 0 6px}p{font-size:14px;margin:0 0 16px;color:#52606f}.meta{padding:10px 12px;background:#fff;border:1px solid #ccd6df;margin-bottom:14px;direction:ltr;text-align:left}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}article{background:white;border:1px solid #ccd6df;overflow:hidden}h2{margin:0;padding:7px 9px;background:#17212b;color:white;font-size:12px;direction:ltr;text-align:left}img{display:block;width:100%;height:240px;object-fit:contain;object-position:top center;background:#f4f6f8}</style></head><body><main><h1>Ashbel AI Visual Review</h1><p>Compressed all-page screenshot sheet for AI inspection.</p><div class="meta">commit: ${commit}<br>run: ${run}<br>artifact: ${jpgName}</div><section class="grid">${cards}</section></main></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 1500 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'load' });
await page.screenshot({ path: path.join(dir, jpgName), fullPage: true, type: 'jpeg', quality: 58 });
await browser.close();

const jpg = await readFile(path.join(dir, jpgName), 'base64');
const embedded = `<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ashbel AI Visual Review ${stamp}</title><style>body{margin:0;background:#eef3f6;font-family:Arial,sans-serif;color:#111827}main{max-width:1200px;margin:auto;padding:20px}.meta{direction:ltr;text-align:left;background:white;border:1px solid #d6dee6;padding:12px;margin:0 0 14px}img{width:100%;height:auto;border:1px solid #d6dee6;background:white}</style></head><body><main><h1>Ashbel AI Visual Review</h1><div class="meta">commit: ${commit}<br>run: ${run}<br>artifact: ${jpgName}</div><img src="data:image/jpeg;base64,${jpg}" alt="Ashbel AI visual review ${stamp}"></main></body></html>\n`;

await writeFile(path.join(dir, htmlName), embedded, 'utf8');
await copyFile(path.join(dir, jpgName), path.join(dir, 'ai-review-contact-sheet.jpg'));
await writeFile(path.join(dir, 'ai-review-embedded.html'), embedded, 'utf8');
await writeFile(path.join(dir, 'ai-review-latest.txt'), `commit=${commit}\nrun=${run}\nimage=${jpgName}\nhtml=${htmlName}\n`, 'utf8');

console.log(`AI visual review artifacts created: ${jpgName}, ${htmlName}`);
