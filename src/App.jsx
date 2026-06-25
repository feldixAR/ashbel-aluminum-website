import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from 'lucide-react'
import { articles, articleRoute, getArticle } from './content/articles'
import { galleryItems } from './content/gallery'
import { contactContent, homeAbout, homeContent, pages } from './content/pages'
import { processIntro, processSteps, solutions, solutionsIntro, trustItems } from './content/solutions'
import {
  asset,
  defaultSeo,
  footerNavItems,
  href,
  navItems,
  routes,
  siteInfo,
  whatsappHref,
  whatsappMessages,
} from './content/siteInfo'
import './App.css'

const ContentEditor = import.meta.env.DEV ? lazy(() => import('./ContentEditor')) : null

const legacyAliases = {
  '/about': routes.about,
  '/process': routes.process,
  '/knowledge': routes.knowledge,
  '/מרכז-הידע-שלנו': routes.knowledge,
  '/contact': routes.contact,
  '/השאירו-פרטים-ונחזור-אליכם': routes.contact,
  '/solutions': routes.systems,
  '/מערכות': routes.systems,
  '/projects': routes.projects,
  '/knowledge/aluminum-pergolas': articleRoute(articles[0]),
  '/knowledge/profiles-and-openings': articleRoute(articles[6]),
  '/knowledge/after-architect': articleRoute(articles[4]),
  '/knowledge/one-supplier': articleRoute(articles[5]),
  '/knowledge/glass-choice': articleRoute(articles[3]),
  '/knowledge/technical-consultation': articleRoute(articles[2]),
}

function normalizeRoute() {
  const hash = decodeURIComponent(window.location.hash.replace(/^#/, ''))
  const route = hash.startsWith('/') ? hash : routes.home
  return legacyAliases[route] || route
}

function useRoute() {
  const [route, setRoute] = useState(normalizeRoute)

  useEffect(() => {
    const onHashChange = () => setRoute(normalizeRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [route])

  return route
}

function setMeta(page) {
  const title = page.seoTitle || page.title || defaultSeo.title
  const description = page.description || defaultSeo.description
  document.title = title

  const currentUrl = `${window.location.origin}${import.meta.env.BASE_URL}#${page.route || routes.home}`
  const updates = [
    ['meta[name="description"]', 'content', description],
    ['meta[property="og:title"]', 'content', title],
    ['meta[property="og:description"]', 'content', description],
    ['meta[property="og:url"]', 'content', currentUrl],
    ['link[rel="canonical"]', 'href', currentUrl],
  ]

  updates.forEach(([selector, attr, value]) => {
    const node = document.querySelector(selector)
    if (node) node.setAttribute(attr, value)
  })
}

function App() {
  const route = useRoute()
  const page = useMemo(() => resolvePage(route), [route])

  useEffect(() => {
    setMeta(page.meta)
  }, [page.meta])

  return (
    <div className="site-shell">
      {page.isEditor ? null : <Header route={route} />}
      <main>{page.node}</main>
      {page.isEditor ? null : <MobileActions />}
      {page.isEditor ? null : <Footer />}
    </div>
  )
}

function resolvePage(route) {
  if (import.meta.env.DEV && route === '/content-editor' && ContentEditor) {
    return {
      isEditor: true,
      meta: {
        route,
        title: 'עורך תוכן מקומי',
        seoTitle: 'עורך תוכן מקומי | אשבל',
        description: 'עורך תוכן מקומי לאתר אשבל.',
      },
      node: (
        <Suspense fallback={<div className="editor-loading">טוען עורך תוכן...</div>}>
          <ContentEditor />
        </Suspense>
      ),
    }
  }

  const solutionMatch = route.match(/^\/(?:מוצרים|מערכות)\/(.+)$/)
  if (solutionMatch) {
    const solution = solutions.find((item) => item.slug === solutionMatch[1] || item.legacySlugs?.includes(solutionMatch[1]))
    if (solution) {
      return {
        meta: {
          route: productRoute(solution),
          seoTitle: `${solution.title} | אשבל מערכות אלומיניום`,
          description: solution.text,
        },
        node: <ProductPage solution={solution} />,
      }
    }
  }

  const articleMatch = route.match(/^\/(?:מהשטח|מרכז-הידע-שלנו)\/(.+)$/)
  if (articleMatch) {
    const article = getArticle(articleMatch[1])
    if (article) {
      return {
        meta: {
          route: articleRoute(article),
          seoTitle: `${article.title} | אשבל מערכות אלומיניום`,
          description: article.description,
        },
        node: <ArticlePage article={article} />,
      }
    }
  }

  if (route === routes.systems) return { meta: pages[routes.systems], node: <SystemsPage /> }
  if (route === routes.projects) return { meta: pages[routes.projects], node: <ProjectsPage /> }
  if (route === routes.about) return { meta: pages[routes.about], node: <AboutPage /> }
  if (route === routes.process) return { meta: pages[routes.process], node: <ProcessPage /> }
  if (route === routes.knowledge) return { meta: pages[routes.knowledge], node: <KnowledgePage /> }
  if (route === routes.contact) return { meta: pages[routes.contact], node: <ContactPage /> }

  return { meta: pages[routes.home], node: <HomePage /> }
}

function Header({ route }) {
  const [open, setOpen] = useState(false)
  const isActive = (itemRoute) =>
    itemRoute === routes.home ? route === routes.home : route.startsWith(itemRoute)

  return (
    <header className="site-header">
      <a className="brand" href={href(routes.home)} aria-label="אשבל מערכות אלומיניום - ראשי" onClick={() => setOpen(false)}>
        <img src={asset(siteInfo.logo)} alt={siteInfo.logoAlt} />
        <strong>
          <span className="brand-full">{siteInfo.name}</span>
          <span className="brand-short">{siteInfo.shortName}</span>
        </strong>
      </a>

      <nav className="desktop-nav" aria-label="ניווט ראשי">
        {navItems.map((item) => (
          <a key={item.route} href={href(item.route)} aria-current={isActive(item.route) ? 'page' : undefined}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header-actions" aria-label="פעולות יצירת קשר">
        <a className="action-link whatsapp-action" href={whatsappHref()} aria-label="שליחה בוואטסאפ">
          <MessageCircle aria-hidden="true" />
          WhatsApp
        </a>
        <a className="action-link" href={`tel:${siteInfo.phone}`} aria-label="התקשרות">
          <Phone aria-hidden="true" />
        </a>
        <a className="action-link" href={`mailto:${siteInfo.email}`} aria-label="שליחת מייל">
          <Mail aria-hidden="true" />
        </a>
      </div>

      <button
        className="mobile-menu-button"
        type="button"
        aria-label={open ? 'סגירת תפריט' : 'פתיחת תפריט'}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      {open ? (
        <nav className="mobile-nav" aria-label="תפריט מובייל">
          {navItems.map((item) => (
            <a key={item.route} href={href(item.route)} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <div className="mobile-contact-row">
            <a href={whatsappHref()} onClick={() => setOpen(false)}>WhatsApp</a>
            <a href={`tel:${siteInfo.phone}`} onClick={() => setOpen(false)}>טלפון</a>
            <a href={`mailto:${siteInfo.email}`} onClick={() => setOpen(false)}>מייל</a>
          </div>
        </nav>
      ) : null}
    </header>
  )
}

function HomePage() {
  return (
    <>
      <Hero page={pages[routes.home]} />
      <TrustStrip />
      <SolutionsSection />
      <ProcessSection preview />
      <ProjectsPreview />
      <AboutPreview />
      <KnowledgePreview />
      <ContactCta />
    </>
  )
}

function productRoute(solution) {
  return `${routes.systems}/${solution.slug}`
}

function Hero({ page }) {
  const primaryHref = resolveCtaHref(page.hero.primaryCtaTarget || homeContent.heroPrimaryCtaTarget)
  const secondaryHref = resolveCtaHref(page.hero.secondaryCtaTarget || homeContent.heroSecondaryCtaTarget)

  return (
    <section className="hero-section">
      <img className="hero-image" src={asset(page.hero.image)} alt={page.hero.alt} />
      <div className="hero-content">
        <h1>{page.hero.title}</h1>
        <strong>{page.hero.subtitle}</strong>
        <p>{page.hero.text || page.hero.subtitle}</p>
        <div className="hero-actions">
          <a className="button button-primary" href={primaryHref}>
            {page.hero.primaryCtaLabel || homeContent.heroPrimaryCtaLabel}
          </a>
          <a className="button button-ghost" href={secondaryHref}>
            {page.hero.secondaryCtaLabel || homeContent.heroSecondaryCtaLabel}
          </a>
        </div>
      </div>
    </section>
  )
}

function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="עיקרי עבודה">
      {trustItems.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </section>
  )
}

function PageHero({ page }) {
  const isContactPage = page.route === routes.contact

  return (
    <section className={`page-hero${isContactPage ? ' contact-page-hero' : ''}`}>
      <img src={asset(page.hero.image)} alt={page.hero.alt} />
      <div>
        <h1>{page.hero.title}</h1>
        <p>{page.hero.subtitle}</p>
      </div>
    </section>
  )
}

function SectionTitle({ title, text, align = 'center' }) {
  return (
    <div className={`section-title align-${align}`}>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  )
}

function SolutionsSection({ compact = false }) {
  const visibleSolutions = sortByOrder(solutions).filter((solution) => solution.showOnHome !== false)

  return (
    <section className="section section-light">
      <SectionTitle title={solutionsIntro.title} text={solutionsIntro.subtitle} />
      <div className={compact ? 'systems-list compact-systems' : 'systems-list'}>
        {visibleSolutions.map((solution) => (
          <a className="system-card" href={href(productRoute(solution))} key={solution.id}>
            <img src={asset(solution.image)} alt={solution.alt} loading="lazy" />
            <div>
              <h3>{solution.title}</h3>
              <p>{solution.text}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

function AboutPreview() {
  return (
    <section className="section about-preview-section">
      <div className="about-preview-layout">
        <img src={asset(pages[routes.about].image.src)} alt={pages[routes.about].image.alt} loading="lazy" />
        <div>
          <SectionTitle title={homeAbout.title} align="start" />
          <p>{homeAbout.text}</p>
          <a className="text-link" href={href(routes.about)}>
            {homeAbout.linkLabel}
            <ArrowLeft aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

function ProcessSection({ preview = false }) {
  const orderedSteps = sortByOrder(processSteps)

  return (
    <section className="section section-muted">
      <SectionTitle title={processIntro.title} text={processIntro.subtitle} />
      <div className="process-timeline">
        {orderedSteps.map((step, index) => {
          const image = getPrimaryImage(step)
          return (
          <article className="process-card" key={step.title}>
            <img src={asset(image.image)} alt={image.alt} loading="lazy" />
            <div>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </article>
          )
        })}
      </div>
      {preview ? (
        <div className="section-action">
          <a className="text-link" href={href(routes.process)}>
            {homeContent.processPreviewLinkLabel}
            <ArrowLeft aria-hidden="true" />
          </a>
        </div>
      ) : null}
    </section>
  )
}

function ProjectsPreview() {
  return (
    <section className="section section-light">
      <SectionTitle
        title={homeContent.projectsPreviewTitle}
        text={homeContent.projectsPreviewText}
      />
      <ProjectGrid items={homeProjects()} />
      <div className="section-action">
        <a className="text-link" href={href(routes.projects)}>
          {homeContent.projectsPreviewLinkLabel}
          <ArrowLeft aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

function KnowledgePreview() {
  return (
    <section className="section section-muted">
      <SectionTitle
        title={homeContent.fieldNotesPreviewTitle}
        text={homeContent.fieldNotesPreviewText}
      />
      <ArticleGrid articlesToShow={homeArticles()} />
      <div className="section-action">
        <a className="text-link" href={href(routes.knowledge)}>
          {homeContent.fieldNotesPreviewLinkLabel}
          <ArrowLeft aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

function SystemsPage() {
  return (
    <>
      <PageHero page={pages[routes.systems]} />
      <section className="section section-light">
        <div className="systems-detail-list">
          {sortByOrder(solutions).map((solution) => (
            <article className="system-detail" id={solution.id} key={solution.id}>
              <img src={asset(solution.image)} alt={solution.alt} loading="lazy" />
              <div>
                <h2>{solution.title}</h2>
                <p>{solution.text}</p>
                <h3>מה זה כולל</h3>
                <ul>
                  {solution.includes.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <h3>מה בודקים לפני ביצוע</h3>
                <ul>
                  {solution.checks.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <a className="button button-primary" href={whatsappHref(solution.id === 'factory' ? whatsappMessages.b2b : whatsappMessages.plans)}>
                  {solution.id === 'factory' ? 'שליחת מפרט / רשימת חיתוך' : 'שליחת תוכניות לבדיקה'}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <FactoryBand />
      <ContactCta />
    </>
  )
}

function ProductPage({ solution }) {
  return (
    <>
      <section className="product-hero">
        <img src={asset(solution.image)} alt={solution.alt} />
        <div>
          <a href={href(routes.systems)}>מוצרים</a>
          <h1>{solution.title}</h1>
          <p>{solution.text}</p>
          <a className="button button-primary" href={whatsappHref(solution.id === 'factory' ? whatsappMessages.b2b : whatsappMessages.plans)}>
            {solution.id === 'factory' ? 'שליחת מפרט / רשימת חיתוך' : 'שליחת תוכניות לבדיקה'}
          </a>
        </div>
      </section>
      <section className="section section-light product-detail-section">
        <div className="product-detail-grid">
          <article>
            <h2>מה זה כולל</h2>
            <ul>
              {solution.includes.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
          <article>
            <h2>מה בודקים לפני ביצוע</h2>
            <ul>
              {solution.checks.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        </div>
      </section>
      {solution.gallery?.length ? (
        <section className="section section-light product-gallery-section">
          <ProjectGrid items={sortByOrder(solution.gallery).map((item) => ({ ...item, title: item.title || solution.title }))} />
        </section>
      ) : null}
      <ProjectsPreview />
      <ContactCta />
    </>
  )
}

function FactoryBand() {
  return (
    <section className="factory-band">
      <div>
        <h2>שירותי מפעל לקבלנים ומתקינים</h2>
        <p>
          חיתוך לפי מידה, עיבוד פרופילים, צביעה, קיטים מוכנים להרכבה ואספקה לפי מפרט,
          רשימת חיתוך או כתב כמויות.
        </p>
      </div>
      <a className="button button-primary" href={whatsappHref(whatsappMessages.b2b)}>
        שליחת מפרט / רשימת חיתוך
      </a>
    </section>
  )
}

function ProjectsPage() {
  const [category, setCategory] = useState('הכל')
  const categories = ['הכל', 'מודרני', 'כפרי / בלגי', 'הצללה', 'פרגולות', 'פתרונות היקפיים', 'ביצוע / מפעל']
  const taggedItems = sortByOrder(galleryItems).map((item) => ({
    ...item,
    category: item.category || 'מודרני',
  }))
  const items = category === 'הכל' ? taggedItems : taggedItems.filter((item) => item.category === category)

  return (
    <>
      <PageHero page={pages[routes.projects]} />
      <section className="section section-light">
        <div className="project-filters" aria-label="סינון פרויקטים">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <ProjectGrid items={items} />
      </section>
      <ContactCta />
    </>
  )
}

function ProjectGrid({ items }) {
  if (!items.length) {
    return <p className="project-empty">אין תמונות זמינות בקטגוריה הזו כרגע.</p>
  }

  return (
    <div className="project-grid">
      {items.map((item) => (
        <figure key={item.image}>
          <img src={asset(item.image)} alt={item.alt} loading="lazy" />
          <figcaption>{item.title}</figcaption>
        </figure>
      ))}
    </div>
  )
}

function AboutPage() {
  const page = pages[routes.about]

  return (
    <>
      <PageHero page={page} />
      <section className="section section-light about-page-section">
        <div className="about-page-layout">
          <div className="about-media">
            <img src={asset(page.image.src)} alt={page.image.alt} loading="lazy" />
          </div>
          <div className="narrative-stack">
            {page.sections.map((section) => (
              <NarrativeBlock section={section} key={section.title} />
            ))}
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  )
}

function ProcessPage() {
  const page = pages[routes.process]

  return (
    <>
      <PageHero page={page} />
      <ProcessSection />
      <section className="section section-light narrative-section">
        {page.sections.map((section) => (
          <NarrativeBlock section={section} key={section.title} />
        ))}
      </section>
      <ContactCta />
    </>
  )
}

function NarrativeBlock({ section }) {
  return (
    <article className="narrative-block">
      <h2>{section.title}</h2>
      {section.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.items ? (
        <div className="info-list">
          {section.items.map((item) => (
            <div key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  )
}

function KnowledgePage() {
  return (
    <>
      <PageHero page={pages[routes.knowledge]} />
      <section className="section section-light">
        <ArticleGrid articlesToShow={articles} />
      </section>
    </>
  )
}

function ArticleGrid({ articlesToShow }) {
  return (
    <div className="article-grid">
      {articlesToShow.map((article) => (
        <article className="article-card" key={article.slug}>
          <a href={href(articleRoute(article))}>
            <img src={asset(article.image)} alt={article.alt} loading="lazy" />
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <small>קרא עוד</small>
          </a>
        </article>
      ))}
    </div>
  )
}

function ArticlePage({ article }) {
  return (
    <>
      <section className="article-hero">
        <div>
          <a href={href(routes.knowledge)}>מהשטח</a>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
        </div>
        <img src={asset(article.image)} alt={article.alt} />
      </section>
      <article className="section section-light article-body">
        {article.sections.map((section, index) => (
          <section key={section.title || index}>
            {section.title ? <h2>{section.title}</h2> : null}
            {section.image ? <ArticleMedia section={section} /> : null}
            {section.body.map((paragraph) => (
              <p className={paragraph.startsWith('•') ? 'bullet-line' : undefined} key={paragraph}>
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </article>
      <ArticleCta />
    </>
  )
}

function ArticleMedia({ section }) {
  return (
    <figure className="article-media">
      <img src={asset(section.image)} alt={section.imageAlt} loading="lazy" />
      {section.caption ? <figcaption>{section.caption}</figcaption> : null}
    </figure>
  )
}

function ArticleCta() {
  return (
    <section className="article-cta">
      <h2>רוצים שנבדוק את התוכנית שלכם?</h2>
      <p>שלחו תוכנית או תמונה מהשטח ונחזור עם כיוון ראשוני.</p>
      <a className="button button-primary" href={whatsappHref()}>
        שליחת תוכנית או תמונה
      </a>
    </section>
  )
}

function ContactPage() {
  return (
    <>
      <PageHero page={pages[routes.contact]} />
      <ContactSection />
    </>
  )
}

function ContactSection({ compact = false }) {
  return (
    <section className={`section contact-section ${compact ? 'compact-contact' : ''}`}>
      <div className="contact-layout">
        <div className="contact-details-card">
          <img className="contact-media" src={asset(pages[routes.contact].hero.image)} alt={pages[routes.contact].hero.alt} loading="lazy" />
          <SectionTitle
            title={contactContent.panelTitle}
            text={contactContent.panelText}
            align="start"
          />
          <div className="contact-buttons">
            <a className="button button-primary whatsapp-button" href={whatsappHref()}>
              <MessageCircle aria-hidden="true" />
              שליחה בוואטסאפ
            </a>
            <a className="button button-outline" href={`tel:${siteInfo.phone}`}>
              <Phone aria-hidden="true" />
              התקשרות
            </a>
            <a className="button button-outline" href={`mailto:${siteInfo.email}`}>
              <Mail aria-hidden="true" />
              שליחת מייל
            </a>
          </div>
          <ul className="contact-list">
            <li>
              <MapPin aria-hidden="true" />
              {siteInfo.location}
            </li>
            <li>{siteInfo.hours}</li>
            <li>
              <Phone aria-hidden="true" />
              <a href={`tel:${siteInfo.phone}`}>{siteInfo.phoneDisplay}</a>
            </li>
            <li>
              <Mail aria-hidden="true" />
              <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
            </li>
          </ul>
          <WhatToSend />
        </div>
        <ContactForm />
      </div>
    </section>
  )
}

function WhatToSend() {
  return (
    <div className="what-to-send">
      <h3>מה כדאי לשלוח</h3>
      <ul>
        {contactContent.whatToSend.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  )
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', inquiryType: contactContent.inquiryTypes[0] || '', message: '' })
  const updateField = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }))
  const message = [
    form.name ? `שם: ${form.name}` : '',
    form.phone ? `טלפון: ${form.phone}` : '',
    form.email ? `מייל: ${form.email}` : '',
    form.inquiryType ? `סוג פנייה: ${form.inquiryType}` : '',
    form.message ? `הודעה: ${form.message}` : '',
  ].filter(Boolean).join('\n')

  const encoded = message || whatsappMessages.details

  return (
    <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
      <h2>שליחת פרטים</h2>
      <label>
        שם*
        <input value={form.name} onChange={updateField('name')} autoComplete="name" />
      </label>
      <label>
        טלפון
        <input value={form.phone} onChange={updateField('phone')} autoComplete="tel" inputMode="tel" />
      </label>
      <label>
        כתובת דואר אלקטרוני
        <input value={form.email} onChange={updateField('email')} autoComplete="email" inputMode="email" />
      </label>
      <label>
        סוג פנייה
        <select value={form.inquiryType} onChange={updateField('inquiryType')}>
          {contactContent.inquiryTypes.map((type) => <option key={type}>{type}</option>)}
        </select>
      </label>
      <label>
        מה תרצו שנבדוק?
        <textarea value={form.message} onChange={updateField('message')} rows="5" />
      </label>
      <div className="form-actions">
        <a className="button button-primary whatsapp-button" href={whatsappHref(encoded)}>
          שליחה בוואטסאפ
        </a>
        <a className="button button-outline" href={`mailto:${siteInfo.email}?subject=${encodeURIComponent('פנייה מאתר אשבל מערכות אלומיניום')}&body=${encodeURIComponent(encoded)}`}>
          שליחה במייל
        </a>
      </div>
      <p>אפשר לשלוח קבצים ישירות בוואטסאפ או במייל.</p>
    </form>
  )
}

function ContactCta() {
  return (
    <section className="contact-cta">
      <div>
        <h2>{homeContent.contactCtaTitle}</h2>
        <p>{homeContent.contactCtaText}</p>
      </div>
      <div className="contact-cta-actions">
        <a className="button button-primary whatsapp-button" href={whatsappHref()}>
          שליחה בוואטסאפ
        </a>
        <a className="button button-outline" href={`tel:${siteInfo.phone}`}>
          התקשרות
        </a>
        <a className="button button-outline" href={`mailto:${siteInfo.email}`}>
          שליחת מייל
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>{siteInfo.name}</strong>
        <p>ייצור, ביצוע ואספקת מערכות אלומיניום לפי תוכנית, מידה ומפרט.</p>
        <p>{siteInfo.location} | {siteInfo.hours}</p>
      </div>
      <nav aria-label="קישורי תחתית">
        {footerNavItems.map((item) => (
          <a key={item.route} href={href(item.route)}>{item.label}</a>
        ))}
      </nav>
      <div className="footer-contact">
        <a href={`tel:${siteInfo.phone}`}>{siteInfo.phoneDisplay}</a>
        <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
        <a href={whatsappHref(whatsappMessages.details)}>WhatsApp</a>
      </div>
      <div className="footer-cta">
        <strong>יש לכם תוכנית או מפרט?</strong>
        <p>שלחו לבדיקה ונחזור עם כיוון ראשוני.</p>
        <a className="text-link" href={whatsappHref()}>שליחה בוואטסאפ</a>
      </div>
      <small>{siteInfo.copyright}</small>
    </footer>
  )
}

function MobileActions() {
  return (
    <div className="mobile-actions" aria-label="פעולות מהירות">
      <a className="whatsapp-mobile-action" href={whatsappHref()}>
        <MessageCircle aria-hidden="true" />
        WhatsApp
      </a>
      <a href={`tel:${siteInfo.phone}`}>
        <Phone aria-hidden="true" />
        התקשרות
      </a>
    </div>
  )
}

function sortByOrder(items = []) {
  return [...items].sort((a, b) => Number(a.order || 0) - Number(b.order || 0))
}

function getPrimaryImage(item) {
  const images = item.images?.length ? sortByOrder(item.images) : [{ image: item.image, alt: item.alt }]
  return images.find((image) => image.primary) || images[0]
}

function homeProjects() {
  return sortByOrder(galleryItems).filter((item) => item.showOnHome !== false).slice(0, 6)
}

function homeArticles() {
  return sortByOrder(articles).filter((article) => article.featured !== false).slice(0, 3)
}

function resolveCtaHref(target) {
  if (!target || target === 'whatsapp') return whatsappHref()
  if (target === 'phone') return `tel:${siteInfo.phone}`
  if (target === 'email') return `mailto:${siteInfo.email}`
  if (target.startsWith('http') || target.startsWith('mailto:') || target.startsWith('tel:')) return target
  return href(target)
}

export default App
