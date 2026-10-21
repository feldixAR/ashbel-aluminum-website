import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputDirectory = path.join(projectRoot, 'dist')
const siteUrl = 'https://www.alumashbel.co.il'
const buildDate = new Date().toISOString().slice(0, 10)

function escapeAttribute(value) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
}

function escapeXml(value) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;')
}

function canonicalFor(route) {
  let clean = route === '/' ? '/' : route
  while (clean !== '/' && clean.endsWith('/')) clean = clean.slice(0, -1)
  return new URL(clean === '/' ? '/' : clean + '/', siteUrl).href
}

function updateMeta(html, attribute, key, content) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const expression = new RegExp(`<meta\\s+[^>]*${attribute}=["']${escapedKey}["'][^>]*>`, 'i')
  const tag = `<meta ${attribute}="${escapeAttribute(key)}" content="${escapeAttribute(content)}" />`
  if (expression.test(html)) return html.replace(expression, tag)
  return html.replace('</head>', '  ' + tag + '\n  </head>')
}

function updateCanonical(html, canonical) {
  const expression = /<link\s+[^>]*rel=["']canonical["'][^>]*>/i
  const tag = `<link rel="canonical" href="${escapeAttribute(canonical)}" />`
  return expression.test(html) ? html.replace(expression, tag) : html.replace('</head>', '  ' + tag + '\n  </head>')
}

function updateTitle(html, title) {
  const tag = `<title>${escapeAttribute(title)}</title>`
  return html.includes('<title>')
    ? html.replace(/<title>[\s\S]*?<\/title>/i, tag)
    : html.replace('</head>', '  ' + tag + '\n  </head>')
}

function pageMetadata(route, pages, solutions, articles, articleRoute, siteInfo) {
  const page = pages[route]
  if (page) {
    return {
      title: page.seoTitle || page.title,
      description: page.description,
      image: page.hero?.image,
    }
  }

  const solution = solutions.find((item) => `${siteInfo.routes.systems}/${item.slug}` === route)
  if (solution) {
    return {
      title: `${solution.title} | אלומיניום לבית פרטי | אשבל`,
      description: solution.text,
      image: solution.image,
    }
  }

  const article = articles.find((item) => articleRoute(item) === route)
  if (article) {
    return {
      title: `${article.title} | אשבל אלומיניום`,
      description: article.description,
      image: article.image,
    }
  }

  throw new Error(`לא נמצאו פרטי SEO עבור הנתיב: ${route}`)
}

function applyPageMetadata(template, route, metadata, siteInfo, asset) {
  const canonical = canonicalFor(route)
  const image = metadata.image ? new URL(asset(metadata.image), siteUrl).href : ''
  let html = updateTitle(template, metadata.title)
  html = updateMeta(html, 'name', 'description', metadata.description)
  html = updateMeta(html, 'name', 'robots', 'index, follow')
  html = updateMeta(html, 'property', 'og:type', 'website')
  html = updateMeta(html, 'property', 'og:locale', 'he_IL')
  html = updateMeta(html, 'property', 'og:site_name', siteInfo.name)
  html = updateMeta(html, 'property', 'og:title', metadata.title)
  html = updateMeta(html, 'property', 'og:description', metadata.description)
  html = updateMeta(html, 'property', 'og:url', canonical)
  html = updateMeta(html, 'name', 'twitter:card', 'summary_large_image')
  html = updateMeta(html, 'name', 'twitter:title', metadata.title)
  html = updateMeta(html, 'name', 'twitter:description', metadata.description)
  if (image) {
    html = updateMeta(html, 'property', 'og:image', image)
    html = updateMeta(html, 'property', 'og:image:alt', metadata.title)
    html = updateMeta(html, 'name', 'twitter:image', image)
  }
  return updateCanonical(html, canonical)
}

const server = await createServer({
  configFile: path.join(projectRoot, 'vite.config.js'),
  mode: 'production',
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
})

try {
  const [{ default: App }, { pages }, { articles, articleRoute }, { routes, siteInfo, asset }, { solutions }] = await Promise.all([
    server.ssrLoadModule('/src/App.jsx'),
    server.ssrLoadModule('/src/content/pages.js'),
    server.ssrLoadModule('/src/content/articles.js'),
    server.ssrLoadModule('/src/content/siteInfo.js'),
    server.ssrLoadModule('/src/content/solutions.js'),
  ])

  const routeList = [...new Set([
    ...Object.keys(pages),
    ...solutions.map((item) => `${routes.systems}/${item.slug}`),
    ...articles.map((article) => articleRoute(article)),
  ])]
  const template = await readFile(path.join(outputDirectory, 'index.html'), 'utf8')
  if (!template.includes('<div id="root"></div>')) {
    throw new Error('לא נמצא root ריק בתבנית dist/index.html')
  }

  for (const route of routeList) {
    globalThis.__ASHBEL_PRERENDER_PATH__ = route
    const markup = renderToString(createElement(App))
    const metadata = pageMetadata(route, pages, solutions, articles, articleRoute, { ...siteInfo, routes })
    let html = applyPageMetadata(template, route, metadata, { ...siteInfo, name: siteInfo.name }, asset)
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root" data-prerender-route="${escapeAttribute(route)}">${markup}</div>`,
    )

    const segments = decodeURIComponent(route).split('/').filter(Boolean)
    const destination = segments.length
      ? path.join(outputDirectory, ...segments, 'index.html')
      : path.join(outputDirectory, 'index.html')
    await mkdir(path.dirname(destination), { recursive: true })
    await writeFile(destination, html, 'utf8')

    const h1Count = (markup.match(/<h1(?:\s|>)/g) || []).length
    const imageTags = markup.match(/<img\b[^>]*>/g) || []
    const imagesWithoutAlt = imageTags.filter((tag) => !/\balt=["'][^"']*["']/i.test(tag))
    if (h1Count !== 1) throw new Error(`${route}: מצופה H1 אחד, נמצאו ${h1Count}`)
    if (imagesWithoutAlt.length) throw new Error(`${route}: נמצאו תמונות ללא alt`)
    if (!html.includes(`<link rel="canonical" href="${canonicalFor(route)}"`)) {
      throw new Error(`${route}: canonical חסר או שגוי`)
    }
  }

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routeList.map((route) => `  <url><loc>${escapeXml(canonicalFor(route))}</loc><lastmod>${buildDate}</lastmod></url>`),
    '</urlset>',
    '',
  ].join('\n')
  await writeFile(path.join(outputDirectory, 'sitemap.xml'), sitemap, 'utf8')
  await writeFile(
    path.join(outputDirectory, 'robots.txt'),
    'User-agent: *\nAllow: /\n\nSitemap: ' + siteUrl + '/sitemap.xml\n',
    'utf8',
  )

  console.log(`נוצרו ${routeList.length} דפים סטטיים עם metadata, canonical, alt ו-sitemap.`)
} finally {
  await server.close()
}
