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
import { contactContent, homeAbout, homeContent, pages, sharedCta } from './content/pages'
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
      {page.isEditor ? null : <Header route={route} immersive={route === routes.systems} />}
      <main>{page.node}</main>
      {page.isEditor || route === routes.systems ? null : <MobileActions />}
      {page.isEditor ? null : <Footer compact={route === routes.systems} />}
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

function Header({ route, immersive = false }) {
  const [open, setOpen] = useState(false)
  const isActive = (itemRoute) =>
    itemRoute === routes.home ? route === routes.home : route.startsWith(itemRoute)

  return (
    <header className={`site-header${immersive ? ' immersive-header' : ''}`}>
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
        <a className="action-link whatsapp-action" href={whatsappHref()} aria-label="שליחה בוואטסאפ" title="שליחה בוואטסאפ">
          <MessageCircle aria-hidden="true" />
          <span className="visually-hidden">{sharedCta.primaryButton}</span>
        </a>
        <a className="action-link phone-action" href={`tel:${siteInfo.phone}`} aria-label="התקשרות" title="התקשרות">
          <Phone aria-hidden="true" />
        </a>
        <a className="action-link mail-action" href={`mailto:${siteInfo.email}`} aria-label="שליחת מייל" title="שליחת מייל">
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
            <a href={whatsappHref()} onClick={() => setOpen(false)}>{sharedCta.primaryButton}</a>
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
  const secondaryHref = resolveCtaHref(page.hero.secondaryCtaTarget || sharedCta.shortSecondaryTarget || homeContent.heroSecondaryCtaTarget)
  const primaryLabel = page.hero.primaryCtaLabel || sharedCta.shortPrimaryLabel || homeContent.heroPrimaryCtaLabel
  const secondaryLabel = page.hero.secondaryCtaLabel || sharedCta.shortSecondaryLabel || homeContent.heroSecondaryCtaLabel

  return (
    <section className="hero-section">
      <img className="hero-image" src={asset(page.hero.image)} alt={page.hero.alt} />
      <div className="hero-content">
        <h1>{page.hero.title}</h1>
        <strong>{page.hero.subtitle}</strong>
        <p>{page.hero.text || page.hero.subtitle}</p>
        <div className="hero-actions">
          <a className="button button-primary" href={primaryHref}>
            {primaryLabel}
          </a>
          <a className="button button-ghost" href={secondaryHref}>
            {secondaryLabel}
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
    <section className={`section section-light product-worlds-section${compact ? ' compact-product-worlds-section' : ''}`}>
      <SectionTitle title={solutionsIntro.title} text={solutionsIntro.subtitle} />
      <div className={compact ? 'product-worlds compact-product-worlds' : 'product-worlds'}>
        {visibleSolutions.map((solution) => (
          <ProductWorldCard solution={solution} key={solution.id} />
        ))}
      </div>
    </section>
  )
}

function ProductWorldCard({ solution, eager = false }) {
  const options = sortByOrder(solution.options || []).slice(0, 3)

  return (
    <a className="product-world-card" href={href(productRoute(solution))}>
      <img src={asset(solution.image)} alt={solution.alt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} />
      <div className="product-world-content">
        <span>{String(solution.order || '').padStart(2, '0')}</span>
        <h3>{solution.displayTitle || solution.title}</h3>
        <p>{solution.text}</p>
        {options.length ? (
          <ul>
            {options.map((option) => <li key={option.title}>{option.title}</li>)}
          </ul>
        ) : null}
      </div>
    </a>
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
    <div className="products-reference-page">
      <section className="products-reference-hero" aria-label="עולמות מוצר">
        <div className="product-worlds product-worlds-fullscreen">
          {sortByOrder(solutions).map((solution) => <ProductWorldCard solution={solution} eager key={solution.id} />)}
        </div>
      </section>
    </div>
  )
}

function ProductOptionsPreview({ solution }) {
  const options = sortByOrder(solution.options || [])
  if (!options.length) return null

  return (
    <div className="product-options-preview">
      {options.map((option) => (
        <span key={option.title}>{option.title}</span>
      ))}
    </div>
  )
}

function ProductPage({ solution }) {
  const options = sortByOrder(solution.options || [])
  const leadOption = options[0]
  const secondaryOptions = options.slice(1, 3)
  const otherProducts = sortByOrder(solutions).filter((item) => item.id !== solution.id).slice(0, 5)

  return (
    <>
      <section className="product-hero">
        <img src={asset(solution.image)} alt={solution.alt} />
        <div>
          <a className="product-back-link" href={href(routes.systems)}>
            <ArrowLeft aria-hidden="true" />
            חזרה למוצרים
          </a>
          <h1>{solution.displayTitle || solution.title}</h1>
          <p>{solution.text}</p>
          <div className="product-hero-actions">
            <a className="button button-primary" href={whatsappHref(solution.id === 'factory' ? whatsappMessages.b2b : whatsappMessages.plans)}>
              {sharedCta.shortPrimaryLabel}
            </a>
            <a className="button button-outline" href={href(routes.projects)}>
              {sharedCta.shortSecondaryLabel}
            </a>
          </div>
        </div>
      </section>
      {leadOption ? (
        <section className="section section-light product-showcase">
          <div className="product-showcase-grid">
            <img src={asset(leadOption.image)} alt={leadOption.alt} loading="lazy" />
            <div>
              <span>{solution.displayTitle || solution.title}</span>
              <h2>{leadOption.title}</h2>
              <p>{leadOption.text}</p>
              <ProductOptionsPreview solution={solution} />
            </div>
          </div>
        </section>
      ) : null}
      {secondaryOptions.length ? (
        <section className="product-option-strip" aria-label="אפשרויות מוצר">
          {secondaryOptions.map((option) => (
            <article key={option.title}>
              <img src={asset(option.image)} alt={option.alt} loading="lazy" />
              <div>
                <h2>{option.title}</h2>
                <p>{option.text}</p>
              </div>
            </article>
          ))}
        </section>
      ) : null}
      <section className="section section-muted product-detail-section">
        <div className="product-check-layout">
          <div>
            <h2>מה חשוב לסגור לפני ביצוע</h2>
            <p>כדי לתמחר ולבצע נכון, כדאי לשלוח תוכנית, תמונות או מפרט ולסגור את הפרטים המרכזיים לפני ייצור.</p>
          </div>
          <div className="product-check-grid">
            {solution.checks.map((item, index) => (
              <article key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-light product-includes-section">
        <SectionTitle title="מה זה כולל" text="התחומים המרכזיים שמרכיבים את עולם המוצר הזה." />
        <div className="product-includes-row">
          {solution.includes.map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>
      {solution.gallery?.length ? (
        <section className="section section-light product-gallery-section">
          <ProjectGrid items={sortByOrder(solution.gallery).map((item) => ({ ...item, title: item.title || solution.title }))} />
        </section>
      ) : null}
      <section className="product-page-nav" aria-label="עולמות מוצר נוספים">
        <a className="text-link" href={href(routes.systems)}>
          כל המוצרים
          <ArrowLeft aria-hidden="true" />
        </a>
        <div>
          {otherProducts.map((item) => (
            <a key={item.id} href={href(productRoute(item))}>{item.displayTitle || item.title}</a>
          ))}
        </div>
      </section>
      <ContactCta />
    </>
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
          <a href={href(routes.knowledge)}>מרכז ידע</a>
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
      <div>
        <h2>{sharedCta.title}</h2>
        <p>{sharedCta.text}</p>
      </div>
      <CtaActions />
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
            title={sharedCta.title || contactContent.panelTitle}
            text={sharedCta.text || contactContent.panelText}
            align="start"
          />
          <div className="contact-buttons">
            <a className="button button-primary whatsapp-button" href={whatsappHref()}>
              <MessageCircle aria-hidden="true" />
              {sharedCta.primaryButton}
            </a>
            <a className="button button-outline" href={`tel:${siteInfo.phone}`}>
              <Phone aria-hidden="true" />
              {sharedCta.phoneButton}
            </a>
            <a className="button button-outline" href={`mailto:${siteInfo.email}`}>
              <Mail aria-hidden="true" />
              {sharedCta.emailButton}
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
          {sharedCta.primaryButton}
        </a>
        <a className="button button-outline" href={`mailto:${siteInfo.email}?subject=${encodeURIComponent('פנייה מאתר אשבל מערכות אלומיניום')}&body=${encodeURIComponent(encoded)}`}>
          {sharedCta.emailButton}
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
        <h2>{sharedCta.title || homeContent.contactCtaTitle}</h2>
        <p>{sharedCta.text || homeContent.contactCtaText}</p>
      </div>
      <CtaActions />
    </section>
  )
}

function CtaActions({ className = 'contact-cta-actions' }) {
  return (
    <div className={className}>
      <a className="button button-primary whatsapp-button" href={whatsappHref()}>
        {sharedCta.primaryButton}
      </a>
      <a className="button button-outline" href={`tel:${siteInfo.phone}`}>
        {sharedCta.phoneButton}
      </a>
      <a className="button button-outline" href={`mailto:${siteInfo.email}`}>
        {sharedCta.emailButton}
      </a>
    </div>
  )
}

function Footer({ compact = false }) {
  if (compact) {
    return (
      <footer className="site-footer product-footer">
        <a className="product-footer-link" href={href(routes.contact)}>
          <ArrowLeft aria-hidden="true" />
          {sharedCta.shortPrimaryLabel}
        </a>
        <div className="product-footer-contact" aria-label="פרטי קשר">
          <a href={`tel:${siteInfo.phone}`}>{siteInfo.phoneDisplay}</a>
          <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
          <a className="product-footer-whatsapp" href={whatsappHref()}>
            <MessageCircle aria-hidden="true" />
            {sharedCta.primaryButton}
          </a>
        </div>
        <a className="product-footer-brand" href={href(routes.home)} aria-label={`${siteInfo.name} - ראשי`}>
          <strong>{siteInfo.name}</strong>
          <img src={asset(siteInfo.logo)} alt={siteInfo.logoAlt} />
        </a>
      </footer>
    )
  }

  return (
    <footer className="site-footer">
        <div>
          <strong>{siteInfo.name}</strong>
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
        <a href={whatsappHref(whatsappMessages.details)}>{sharedCta.primaryButton}</a>
      </div>
      <div className="footer-cta">
        <strong>{sharedCta.title}</strong>
        <div className="footer-cta-actions">
          <a className="text-link" href={whatsappHref()}>{sharedCta.primaryButton}</a>
          <a className="text-link" href={`tel:${siteInfo.phone}`}>{sharedCta.phoneButton}</a>
          <a className="text-link" href={`mailto:${siteInfo.email}`}>{sharedCta.emailButton}</a>
        </div>
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
        {sharedCta.primaryButton}
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
