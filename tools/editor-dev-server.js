import fs from 'node:fs'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { Buffer } from 'node:buffer'
import { buildReport, listPublicImages, validateContent } from '../scripts/content-utils.mjs'

const execFileAsync = promisify(execFile)

export function ashbelContentEditorPlugin(rootDir) {
  return {
    name: 'ashbel-content-editor',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, 'http://localhost')
        if (!url.pathname.startsWith('/__ashbel-editor/')) return next()

        try {
          if (req.method === 'GET' && url.pathname === '/__ashbel-editor/media') {
            return sendJson(res, { images: listPublicImages() })
          }

          if (req.method === 'POST' && url.pathname === '/__ashbel-editor/validate') {
            const body = await readJson(req)
            return sendJson(res, validateContent(body.content))
          }

          if (req.method === 'POST' && url.pathname === '/__ashbel-editor/report') {
            const body = await readJson(req)
            const validation = validateContent(body.content)
            return sendJson(res, { report: buildReport(body.content, validation), validation })
          }

          if (req.method === 'POST' && url.pathname === '/__ashbel-editor/save') {
            const body = await readJson(req)
            const content = normalizeContent(body.content)
            const validation = validateContent(content)
            if (!validation.ok) return sendJson(res, validation, 422)
            await saveContentFiles(rootDir, content)
            server.moduleGraph.invalidateAll()
            return sendJson(res, { ok: true, message: 'נשמר בהצלחה', validation })
          }

          if (req.method === 'POST' && url.pathname === '/__ashbel-editor/upload') {
            const body = await readJson(req)
            const result = await saveUploadedImage(rootDir, body)
            return sendJson(res, result)
          }

          if (req.method === 'POST' && url.pathname === '/__ashbel-editor/publish-check') {
            const result = await runPublishCheck(rootDir)
            return sendJson(res, result, result.ok ? 200 : 500)
          }

          return sendJson(res, { ok: false, message: 'פעולה לא מוכרת' }, 404)
        } catch (error) {
          return sendJson(res, { ok: false, message: error.message }, 500)
        }
      })
    },
  }
}

async function saveContentFiles(rootDir, content) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupDir = path.join(rootDir, 'backups', 'content', timestamp)
  fs.mkdirSync(backupDir, { recursive: true })

  const files = [
    ['src/content/siteInfo.js', renderSiteInfo(content)],
    ['src/content/pages.js', renderPages(content)],
    ['src/content/solutions.js', renderSolutions(content)],
    ['src/content/gallery.js', renderGallery(content)],
  ]

  if (content.__writeArticles) {
    files.push(['src/content/articles.js', renderArticles(content)])
  }

  for (const [relativePath] of files) {
    const absolutePath = path.join(rootDir, relativePath)
    if (fs.existsSync(absolutePath)) {
      fs.copyFileSync(absolutePath, path.join(backupDir, path.basename(relativePath)))
    }
  }

  for (const [relativePath, source] of files) {
    const absolutePath = path.join(rootDir, relativePath)
    const tempPath = `${absolutePath}.tmp`
    fs.writeFileSync(tempPath, source, 'utf8')
    fs.renameSync(tempPath, absolutePath)
  }
}

async function saveUploadedImage(rootDir, body) {
  const { fileName, dataUrl, targetFolder = 'projects' } = body
  if (!fileName || !dataUrl) throw new Error('חסר קובץ לשמירה')
  const safeFolder = targetFolder.replace(/[^a-z0-9-_/]/gi, '').replace(/\.\./g, '')
  const safeFileName = path.basename(fileName).replace(/[^a-z0-9._-]/gi, '-').toLowerCase()
  const match = dataUrl.match(/^data:(image\/(?:png|jpeg|jpg|webp|avif|svg\+xml));base64,(.+)$/)
  if (!match) throw new Error('אפשר להעלות רק קובצי תמונה נתמכים')

  const folder = path.join(rootDir, 'public', 'media', safeFolder)
  fs.mkdirSync(folder, { recursive: true })

  const targetPath = uniquePath(path.join(folder, safeFileName))
  fs.writeFileSync(targetPath, Buffer.from(match[2], 'base64'))
  return {
    ok: true,
    image: path.relative(path.join(rootDir, 'public'), targetPath).replace(/\\/g, '/'),
    images: listPublicImages(),
  }
}

async function runPublishCheck(rootDir) {
  try {
    const { stdout, stderr } = await execFileAsync('npm.cmd', ['run', 'publish:check'], {
      cwd: rootDir,
      windowsHide: true,
      maxBuffer: 1024 * 1024 * 10,
    })
    return { ok: true, output: `${stdout}\n${stderr}`.trim() }
  } catch (error) {
    return {
      ok: false,
      output: `${error.stdout || ''}\n${error.stderr || ''}`.trim() || error.message,
    }
  }
}

function normalizeContent(content) {
  const currentById = new Map((content._currentSolutions || []).map((item) => [item.id, item]))
  const normalized = structuredClone(content)
  const writeArticles = Boolean(normalized._articlesChanged)
  delete normalized._currentSolutions
  delete normalized._articlesChanged
  normalized.__writeArticles = writeArticles

  normalized.solutions = (normalized.solutions || []).map((item, index) => {
    const previous = currentById.get(item.id)
    const legacySlugs = new Set(item.legacySlugs || [])
    if (previous?.slug && previous.slug !== item.slug) legacySlugs.add(previous.slug)
    return {
      ...item,
      order: Number(item.order || index + 1),
      showOnHome: item.showOnHome !== false,
      options: (item.options || []).map((option, optionIndex) => ({
        ...option,
        order: Number(option.order || optionIndex + 1),
      })),
      legacySlugs: Array.from(legacySlugs),
    }
  })

  normalized.galleryItems = (normalized.galleryItems || []).map((item, index) => ({
    ...item,
    order: Number(item.order || index + 1),
    featured: Boolean(item.featured),
    showOnHome: item.showOnHome !== false,
  }))

  normalized.processSteps = (normalized.processSteps || []).map((step, index) => {
    const images = step.images?.length ? step.images : [{ image: step.image, alt: step.alt, order: 1, primary: true }]
    const orderedImages = images.map((image, imageIndex) => ({
      ...image,
      order: Number(image.order || imageIndex + 1),
      primary: Boolean(image.primary),
    }))
    const primary = orderedImages.find((image) => image.primary) || orderedImages.toSorted((a, b) => a.order - b.order)[0]
    return {
      ...step,
      order: Number(step.order || index + 1),
      image: primary?.image || step.image,
      alt: primary?.alt || step.alt,
      images: orderedImages,
    }
  })

  normalized.articles = (normalized.articles || []).map((article, index) => ({
    ...article,
    order: Number(article.order || index + 1),
    featured: article.featured !== false,
  }))

  return normalized
}

function renderSiteInfo(content) {
  return `export const basePath = import.meta.env?.BASE_URL || '/'

export function asset(path) {
  return \`\${basePath}\${path}\`.replace(/\\/{2,}/g, '/')
}

export const routes = ${toJs(content.routes)}

export const siteInfo = ${toJs(content.siteInfo)}

export const whatsappMessages = ${toJs(content.whatsappMessages)}

export function whatsappHref(message = whatsappMessages.plans) {
  const rawNumber = siteInfo.whatsapp || siteInfo.phone || ''
  const number = rawNumber.replace(/[^0-9]/g, '').replace(/^0/, '972')
  return \`https://wa.me/\${number}?text=\${encodeURIComponent(message)}\`
}

export const navItems = ${toJs(content.navItems)}

export const footerNavItems = ${toJs(content.footerNavItems)}

export function href(route) {
  return \`#\${route}\`
}

export const defaultSeo = ${toJs(content.defaultSeo)}
`
}

function renderPages(content) {
  return `export const homeAbout = ${toJs(content.homeAbout)}

export const sharedCta = ${toJs(content.sharedCta)}

export const homeContent = ${toJs(content.homeContent)}

export const contactContent = ${toJs(content.contactContent)}

export const pages = ${toJs(content.pages)}
`
}

function renderSolutions(content) {
  return `export const trustItems = ${toJs(content.trustItems)}

export const solutionsIntro = ${toJs(content.solutionsIntro)}

export const solutions = ${toJs(content.solutions)}

export const processIntro = ${toJs(content.processIntro)}

export const processSteps = ${toJs(content.processSteps)}
`
}

function renderGallery(content) {
  return `export const galleryIntro = ${toJs(content.galleryIntro)}

export const galleryItems = ${toJs(content.galleryItems)}

export const missingImageNeeds = ${toJs(content.missingImageNeeds || [])}
`
}

function renderArticles(content) {
  return `import { routes } from './siteInfo.js'

export const articles = ${toJs(content.articles)}

export const articleMediaNeeds = ${toJs(content.articleMediaNeeds || [])}

export function articleRoute(article) {
  return \`\${routes.knowledge}/\${article.slug}\`
}

export function getArticle(slug) {
  return articles.find((article) => article.slug === slug)
}
`
}

function toJs(value) {
  return JSON.stringify(value, null, 2)
}

function sendJson(res, payload, status = 200) {
  res.statusCode = status
  res.setHeader('content-type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8') || '{}'
        resolve(JSON.parse(raw))
      } catch (error) {
        reject(error)
      }
    })
    req.on('error', reject)
  })
}

function uniquePath(filePath) {
  if (!fs.existsSync(filePath)) return filePath
  const dir = path.dirname(filePath)
  const ext = path.extname(filePath)
  const name = path.basename(filePath, ext)
  let counter = 2
  let candidate = path.join(dir, `${name}-${counter}${ext}`)
  while (fs.existsSync(candidate)) {
    counter += 1
    candidate = path.join(dir, `${name}-${counter}${ext}`)
  }
  return candidate
}
