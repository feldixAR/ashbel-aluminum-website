import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const publicRoot = path.join(repoRoot, 'public')
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg'])

export function publicFileExists(publicPath) {
  if (!publicPath || typeof publicPath !== 'string') return false
  const cleanPath = publicPath.replace(/^\/+/, '')
  return fs.existsSync(path.join(publicRoot, cleanPath))
}

export function listPublicImages() {
  const roots = ['media', 'portfolio']
  const images = []

  for (const root of roots) {
    const absoluteRoot = path.join(publicRoot, root)
    if (!fs.existsSync(absoluteRoot)) continue
    walk(absoluteRoot, (filePath) => {
      if (!imageExtensions.has(path.extname(filePath).toLowerCase())) return
      images.push(path.relative(publicRoot, filePath).replace(/\\/g, '/'))
    })
  }

  return images.sort((a, b) => a.localeCompare(b, 'he'))
}

export async function loadContentModules() {
  const stamp = `?v=${Date.now()}`
  const [siteInfoModule, pagesModule, solutionsModule, galleryModule, articlesModule] = await Promise.all([
    import(pathToFileURL(path.join(repoRoot, 'src/content/siteInfo.js')).href + stamp),
    import(pathToFileURL(path.join(repoRoot, 'src/content/pages.js')).href + stamp),
    import(pathToFileURL(path.join(repoRoot, 'src/content/solutions.js')).href + stamp),
    import(pathToFileURL(path.join(repoRoot, 'src/content/gallery.js')).href + stamp),
    import(pathToFileURL(path.join(repoRoot, 'src/content/articles.js')).href + stamp),
  ])

  return {
    routes: siteInfoModule.routes,
    siteInfo: siteInfoModule.siteInfo,
    whatsappMessages: siteInfoModule.whatsappMessages,
    navItems: siteInfoModule.navItems,
    footerNavItems: siteInfoModule.footerNavItems,
    defaultSeo: siteInfoModule.defaultSeo,
    homeAbout: pagesModule.homeAbout,
    sharedCta: pagesModule.sharedCta || defaultSharedCta,
    homeContent: pagesModule.homeContent || defaultHomeContent,
    contactContent: pagesModule.contactContent || defaultContactContent,
    pages: pagesModule.pages,
    trustItems: solutionsModule.trustItems,
    solutionsIntro: solutionsModule.solutionsIntro,
    solutions: solutionsModule.solutions,
    processIntro: solutionsModule.processIntro,
    processSteps: solutionsModule.processSteps,
    galleryIntro: galleryModule.galleryIntro,
    galleryItems: galleryModule.galleryItems,
    missingImageNeeds: galleryModule.missingImageNeeds || [],
    articles: articlesModule.articles,
  }
}

export function validateContent(content) {
  const issues = []
  const warnings = []
  const addIssue = (message, pathName) => issues.push({ level: 'error', message, path: pathName })
  const addWarning = (message, pathName) => warnings.push({ level: 'warning', message, path: pathName })

  const requiredText = (value, label, pathName) => {
    if (!value || !String(value).trim()) addIssue(`${label} חסר`, pathName)
  }

  const validateImage = (image, alt, label, pathName) => {
    if (!image || !String(image).trim()) {
      addIssue(`${label}: חסרה תמונה`, pathName)
      return
    }
    if (!publicFileExists(image)) addIssue(`${label}: תמונה לא נמצאה (${image})`, pathName)
    if (!alt || !String(alt).trim()) addIssue(`${label}: חסר alt לתמונה`, pathName)
  }

  requiredText(content.siteInfo?.name, 'שם העסק', 'siteInfo.name')
  requiredText(content.siteInfo?.phone, 'טלפון', 'siteInfo.phone')
  requiredText(content.siteInfo?.email, 'מייל', 'siteInfo.email')
  requiredText(content.sharedCta?.title, 'כותרת CTA כללית', 'sharedCta.title')
  requiredText(content.sharedCta?.text, 'טקסט CTA כללי', 'sharedCta.text')
  requiredText(content.sharedCta?.primaryButton, 'כפתור וואטסאפ CTA', 'sharedCta.primaryButton')
  requiredText(content.sharedCta?.phoneButton, 'כפתור טלפון CTA', 'sharedCta.phoneButton')
  requiredText(content.sharedCta?.emailButton, 'כפתור מייל CTA', 'sharedCta.emailButton')
  requiredText(content.sharedCta?.shortPrimaryLabel, 'כפתור קצר ראשי CTA', 'sharedCta.shortPrimaryLabel')
  requiredText(content.sharedCta?.shortSecondaryLabel, 'כפתור קצר משני CTA', 'sharedCta.shortSecondaryLabel')

  Object.entries(content.pages || {}).forEach(([route, page]) => {
    requiredText(page.title, `כותרת עמוד ${route}`, `pages.${route}.title`)
    requiredText(page.seoTitle, `כותרת SEO לעמוד ${route}`, `pages.${route}.seoTitle`)
    requiredText(page.description, `תיאור SEO לעמוד ${route}`, `pages.${route}.description`)
    if (page.hero) validateImage(page.hero.image, page.hero.alt, `Hero בעמוד ${route}`, `pages.${route}.hero`)
    if (page.image) validateImage(page.image.src, page.image.alt, `תמונת תוכן בעמוד ${route}`, `pages.${route}.image`)
  })

  requiredText(content.homeAbout?.title, 'כותרת אזור על החברה בדף הבית', 'homeAbout.title')
  requiredText(content.homeAbout?.text, 'טקסט אזור על החברה בדף הבית', 'homeAbout.text')

  ;(content.trustItems || []).forEach((item, index) => requiredText(item, `פריט אמון ${index + 1}`, `trustItems.${index}`))

  const productSlugs = new Map()
  ;(content.solutions || []).forEach((product, index) => {
    const pathBase = `solutions.${index}`
    requiredText(product.id, 'מזהה מוצר', `${pathBase}.id`)
    requiredText(product.slug, `slug מוצר ${index + 1}`, `${pathBase}.slug`)
    requiredText(product.title, `כותרת מוצר ${index + 1}`, `${pathBase}.title`)
    requiredText(product.text, `טקסט מוצר ${index + 1}`, `${pathBase}.text`)
    validateImage(product.image, product.alt, `תמונת מוצר ${product.title || index + 1}`, `${pathBase}.image`)
    validateTextArray(product.includes, `מה זה כולל - ${product.title}`, `${pathBase}.includes`, addIssue)
    validateTextArray(product.checks, `מה חשוב לבדוק - ${product.title}`, `${pathBase}.checks`, addIssue)
    validateNumber(product.order, `סדר תצוגה מוצר ${product.title}`, `${pathBase}.order`, addWarning)
    ;(product.options || []).forEach((option, optionIndex) => {
      requiredText(option.title, `כותרת תת־אפשרות במוצר ${product.title}`, `${pathBase}.options.${optionIndex}.title`)
      requiredText(option.text, `טקסט תת־אפשרות במוצר ${product.title}`, `${pathBase}.options.${optionIndex}.text`)
      validateImage(option.image, option.alt, `תמונת תת־אפשרות במוצר ${product.title}`, `${pathBase}.options.${optionIndex}`)
      validateNumber(option.order, `סדר תת־אפשרות במוצר ${product.title}`, `${pathBase}.options.${optionIndex}.order`, addWarning)
    })
    if (product.slug) {
      if (productSlugs.has(product.slug)) addIssue(`slug כפול במוצרים: ${product.slug}`, `${pathBase}.slug`)
      productSlugs.set(product.slug, true)
    }
    ;(product.gallery || []).forEach((item, galleryIndex) => {
      validateImage(item.image, item.alt, `תמונת גלריה למוצר ${product.title}`, `${pathBase}.gallery.${galleryIndex}`)
      validateNumber(item.order, `סדר תמונת גלריה ${product.title}`, `${pathBase}.gallery.${galleryIndex}.order`, addWarning)
    })
  })

  ;(content.galleryItems || []).forEach((item, index) => {
    const pathBase = `galleryItems.${index}`
    validateImage(item.image, item.alt, `פרויקט ${index + 1}`, pathBase)
    requiredText(item.category, `קטגוריית פרויקט ${index + 1}`, `${pathBase}.category`)
    validateNumber(item.order, `סדר פרויקט ${index + 1}`, `${pathBase}.order`, addWarning)
  })

  ;(content.processSteps || []).forEach((step, index) => {
    const pathBase = `processSteps.${index}`
    requiredText(step.title, `כותרת שלב ${index + 1}`, `${pathBase}.title`)
    requiredText(step.text, `טקסט שלב ${index + 1}`, `${pathBase}.text`)
    validateNumber(step.order, `סדר שלב ${index + 1}`, `${pathBase}.order`, addWarning)
    const images = step.images?.length ? step.images : [{ image: step.image, alt: step.alt, order: step.order || index + 1 }]
    images.forEach((image, imageIndex) => {
      validateImage(image.image, image.alt, `תמונה לשלב ${step.title || index + 1}`, `${pathBase}.images.${imageIndex}`)
      validateNumber(image.order, `סדר תמונה לשלב ${step.title || index + 1}`, `${pathBase}.images.${imageIndex}.order`, addWarning)
    })
  })

  const articleSlugs = new Map()
  ;(content.articles || []).forEach((article, index) => {
    const pathBase = `articles.${index}`
    requiredText(article.slug, `slug מאמר ${index + 1}`, `${pathBase}.slug`)
    requiredText(article.title, `כותרת מאמר ${index + 1}`, `${pathBase}.title`)
    requiredText(article.description, `פתיח מאמר ${index + 1}`, `${pathBase}.description`)
    validateImage(article.image, article.alt, `Hero מאמר ${article.title || index + 1}`, `${pathBase}.image`)
    validateNumber(article.order, `סדר מאמר ${article.title || index + 1}`, `${pathBase}.order`, addWarning)
    if (article.slug) {
      if (articleSlugs.has(article.slug)) addIssue(`slug כפול במאמרים: ${article.slug}`, `${pathBase}.slug`)
      articleSlugs.set(article.slug, true)
    }
    ;(article.sections || []).forEach((section, sectionIndex) => {
      if (section.image) validateImage(section.image, section.imageAlt, `תמונה פנימית במאמר ${article.title}`, `${pathBase}.sections.${sectionIndex}.image`)
    })
  })

  validateTextArray(content.contactContent?.inquiryTypes, 'סוגי פנייה', 'contactContent.inquiryTypes', addIssue)
  validateTextArray(content.contactContent?.whatToSend, 'מה כדאי לשלוח', 'contactContent.whatToSend', addIssue)

  return {
    ok: issues.length === 0,
    issues,
    warnings,
  }
}

export function buildReport(content, validation = validateContent(content)) {
  const homepageProjects = (content.galleryItems || []).filter((item) => item.showOnHome !== false)
  const featuredArticles = (content.articles || []).filter((article) => article.featured !== false).slice(0, 3)
  const productOptionsCount = (content.solutions || []).reduce((sum, product) => sum + (product.options || []).length, 0)
  const lines = [
    'דוח תוכן אשבל',
    '---------------',
    `מוצרים: ${(content.solutions || []).length}`,
    `תתי־אפשרויות מוצר: ${productOptionsCount}`,
    `פרויקטים: ${(content.galleryItems || []).length}`,
    `פרויקטים בדף הבית: ${homepageProjects.length}`,
    `מאמרים: ${(content.articles || []).length}`,
    `מאמרים שמופיעים בדף הבית: ${featuredArticles.length}`,
    `סוגי פנייה: ${(content.contactContent?.inquiryTypes || []).length}`,
    `CTA כללי: ${content.sharedCta?.title ? 'מוגדר' : 'חסר'}`,
    `טלפון: ${content.siteInfo?.phoneDisplay || content.siteInfo?.phone || 'חסר'}`,
    `מייל: ${content.siteInfo?.email || 'חסר'}`,
    '',
    'רשימת מוצרים:',
    ...(content.solutions || []).map((item, index) => `${index + 1}. ${item.title} (${item.slug})`),
    '',
    'רשימת מאמרים:',
    ...(content.articles || []).map((item, index) => `${index + 1}. ${item.title} (${item.slug})`),
    '',
    `שגיאות: ${validation.issues.length}`,
    `אזהרות: ${validation.warnings.length}`,
  ]

  if (validation.issues.length) {
    lines.push('', 'שגיאות:')
    validation.issues.forEach((issue) => lines.push(`- ${issue.message} [${issue.path}]`))
  }

  if (validation.warnings.length) {
    lines.push('', 'אזהרות:')
    validation.warnings.forEach((issue) => lines.push(`- ${issue.message} [${issue.path}]`))
  }

  return lines.join('\n')
}

function validateTextArray(items, label, pathName, addIssue) {
  if (!Array.isArray(items) || items.length === 0) {
    addIssue(`${label}: חסרה רשימה`, pathName)
    return
  }
  items.forEach((item, index) => {
    if (!item || !String(item).trim()) addIssue(`${label}: פריט ${index + 1} ריק`, `${pathName}.${index}`)
  })
}

function validateNumber(value, label, pathName, addWarning) {
  if (value === undefined || value === null || value === '') return
  if (!Number.isFinite(Number(value))) addWarning(`${label}: ערך הסדר אינו מספר`, pathName)
}

function walk(dir, onFile) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(fullPath, onFile)
    if (entry.isFile()) onFile(fullPath)
  }
}

const defaultHomeContent = {
  heroPrimaryCtaLabel: 'שליחת תוכניות לבדיקה',
  heroPrimaryCtaTarget: 'whatsapp',
  heroSecondaryCtaLabel: 'צפייה בפרויקטים',
  heroSecondaryCtaTarget: '/פרויקטים',
  processPreviewLinkLabel: 'לפירוט התהליך',
  projectsPreviewTitle: 'פרויקטים',
  projectsPreviewText: 'מבט נקי על פתחים, ויטרינות, הצללות ופרטי אלומיניום שבוצעו בשטח.',
  projectsPreviewLinkLabel: 'לכל הפרויקטים',
  fieldNotesPreviewTitle: 'מהשטח',
  fieldNotesPreviewText: 'דברים שכדאי לדעת לפני שסוגרים אלומיניום לבית או לפרויקט.',
  fieldNotesPreviewLinkLabel: 'לכל המאמרים',
  contactCtaTitle: 'יש לכם תוכנית, מפרט או תמונות מהשטח?',
  contactCtaText: 'שלחו לנו את החומר ונבדוק מה נכון לבצע — לפי הפתחים, הסגנון, המידה והמפרט.',
}

const defaultSharedCta = {
  title: 'יש לכם תוכנית, מפרט או תמונות מהשטח?',
  text: 'שלחו לנו את החומר ונבדוק מה נכון לבצע — לפי הפתחים, הסגנון, המידה והמפרט.',
  primaryButton: 'שליחה בוואטסאפ',
  phoneButton: 'התקשרות',
  emailButton: 'שליחת מייל',
  shortPrimaryLabel: 'שליחת תוכניות לבדיקה',
  shortSecondaryLabel: 'צפייה בפרויקטים',
  shortSecondaryTarget: '/פרויקטים',
}

const defaultContactContent = {
  panelTitle: 'יש לכם תוכנית, מפרט או תמונות מהשטח?',
  panelText: 'שלחו לנו את החומר ונבדוק מה נכון לבצע — לפי הפתחים, הסגנון, המידה והמפרט.',
  inquiryTypes: ['בית / שיפוץ', 'אדריכל', 'קבלן / מתקין', 'פרויקט מסחרי', 'שירותי מפעל'],
  whatToSend: [
    'תוכנית אלומיניום / תוכנית אדריכלית',
    'כתב כמויות',
    'תמונות מהשטח',
    'מידות כלליות',
    'שלב הבנייה',
    'מפרט / רשימת חיתוך לקבלנים',
  ],
}
