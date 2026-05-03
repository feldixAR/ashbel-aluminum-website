import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const reviewDir = path.join(process.cwd(), 'public', 'visual-review');
const priorityScreenshots = [
  'desktop-home.png',
  'mobile-home.png',
  'mobile-menu-open.png',
  'desktop-upload.png',
  'mobile-upload.png',
  'desktop-professionals.png',
  'mobile-professionals.png',
  'desktop-contact.png',
  'mobile-contact.png',
];

export async function GET() {
  const summary = await readSummary();
  const screenshots = await readScreenshots();

  return new Response(renderGateway({ summary, screenshots }), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

async function readSummary() {
  try {
    return await readFile(path.join(reviewDir, 'summary.md'), 'utf8');
  } catch {
    return 'summary.md is not available yet. Run npm run visual:review to generate the visual review bundle.';
  }
}

async function readScreenshots() {
  try {
    const files = await readdir(reviewDir);
    return files.filter((file) => file.endsWith('.png') && file !== 'contact-sheet.png').sort();
  } catch {
    return [];
  }
}

function renderGateway({ summary, screenshots }: { summary: string; screenshots: string[] }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex,nofollow">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Visual Review Gateway</title>
    <style>
      body { margin: 0; background: #f4f6f8; color: #17212b; font-family: Arial, sans-serif; line-height: 1.55; }
      main { max-width: 1180px; margin-inline: auto; padding: 48px 20px; }
      h1 { margin: 8px 0 16px; font-size: clamp(2rem, 5vw, 4rem); line-height: 1.05; }
      h2 { margin: 36px 0 8px; font-size: 1.7rem; }
      p { color: #52606f; font-size: 18px; max-width: 820px; }
      a { color: #17384d; font-weight: 700; }
      img { background: white; border: 1px solid #d5dde5; display: block; height: auto; max-width: 100%; width: 100%; }
      pre { background: white; border: 1px solid #d5dde5; overflow-x: auto; padding: 20px; white-space: pre-wrap; }
      .eyebrow { color: #2f5f78; font-weight: 800; margin: 0; }
      .links { display: grid; gap: 12px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
      .links a { background: white; border: 1px solid #d5dde5; padding: 14px; }
    </style>
  </head>
  <body>
    <main>
      <p class="eyebrow">Temporary PR visual review gateway</p>
      <h1>Ashbel Aluminum Visual Review</h1>
      <p>Hidden noindex page for reviewers to inspect generated Playwright screenshots directly in the browser. This page is not linked from public navigation and is excluded from the sitemap.</p>

      <h2>Contact Sheet</h2>
      <p><a href="/visual-review/contact-sheet.png">Open contact-sheet.png directly</a></p>
      <img src="/visual-review/contact-sheet.png" alt="Visual QA contact sheet with priority screenshots">

      <h2>Summary</h2>
      <p><a href="/visual-review/summary.md">Open summary.md directly</a></p>
      <pre>${escapeHtml(summary)}</pre>

      <h2>Priority Screenshots</h2>
      <div class="links">${renderLinks(priorityScreenshots)}</div>

      <h2>All Screenshot Files</h2>
      <div class="links">${renderLinks(screenshots)}</div>
    </main>
  </body>
</html>`;
}

function renderLinks(files: string[]) {
  return files.map((file) => `<a href="/visual-review/${file}">${escapeHtml(file)}</a>`).join('');
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
