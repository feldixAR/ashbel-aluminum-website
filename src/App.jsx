import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from 'lucide-react'
import { articles, articleRoute, getArticle } from './content/articles'
import { galleryIntro, galleryItems } from './content/gallery'
import { pages } from './content/pages'
import { processSteps, solutions, solutionsIntro } from './content/solutions'
import {
  asset,
  defaultSeo,
  href,
  navItems,
  routes,
  siteInfo,
  whatsappHref,
  whatsappMessages,
} from './content/siteInfo'
import './App.css'

const legacyAliases = {
  '/about': routes.about,
  '/process': routes.process,
  '/knowledge': routes.knowledge,
  '/contact': routes.contact,
  '/solutions': routes.home,
  '/projects': routes.home,
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

  const updates = [
    ['meta[name="description"]', 'content', description],
    ['meta[property="og:title"]', 'content', title],
    ['meta[property="og:description"]', 'content', description],
    ['meta[property="og:url"]', 'content', `${window.location.origin}${import.meta.env.BASE_URL}#${page.route || routes.home}`],
    ['link[rel="canonical"]', 'href', `${window.location.origin}${import.meta.env.BASE_URL}#${page.route || routes.home}`],
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
      <Header route={route} />
      <main>{page.node}</main>
      <MobileActions />
      <Footer />
    </div>
  )
}

function resolvePage(route) {
  const articleMatch = route.match(/^\/מרכז-הידע-שלנו\/(.+)$/)
  if (articleMatch) {
    const article = getArticle(articleMatch[1])
    if (article) {
      return {
        meta: {
          route: articleRoute(article),
          seoTitle: `${article.title} | אשבל אלומיניום`,
          description: article.description,
        },
        node: <ArticlePage article={article} />,
      }
    }
  }

  if (route === routes.about) {
    return { meta: pages[routes.about], node: <AboutPage /> }
  }

  if (route === routes.process) {
    return { meta: pages[routes.process], node: <ProcessPage /> }
  }

  if (route === routes.knowledge) {
    return { meta: pages[routes.knowledge], node: <KnowledgePage /> }
  }

  if (route === routes.contact) {
    return { meta: pages[routes.contact], node: <ContactPage /> }
  }

  return { meta: pages[routes.home], node: <HomePage /> }
}

function Header({ route }) {
  const [open, setOpen] = useState(false)

  const isActive = (itemRoute) =>
    itemRoute === routes.home ? route === routes.home : route.startsWith(itemRoute)

  return (
    <header className="site-header">
      <a className="brand" href={href(routes.home)} aria-label="אשבל אלומיניום - בית" onClick={() => setOpen(false)}>
        <img src={asset(siteInfo.logo)} alt={siteInfo.logoAlt} />
        <span>
          <strong>{siteInfo.name}</strong>
          <small>{siteInfo.positioning}</small>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="ניווט ראשי">
        {navItems.map((item) => (
          <a key={item.route} href={href(item.route)} aria-current={isActive(item.route) ? 'page' : undefined}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="header-contact" href={whatsappHref()}>
        לבדיקת תוכנית האלומיניום שלך
      </a>

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
          <a href={whatsappHref()} onClick={() => setOpen(false)}>
            שליחה בוואטסאפ
          </a>
        </nav>
      ) : null}
    </header>
  )
}

function HomePage() {
  const home = pages[routes.home]

  return (
    <>
      <Hero page={home} primaryHref={whatsappHref()} primaryLabel="לבדיקת תוכנית האלומיניום שלך" secondaryRoute={routes.process} secondaryLabel="איך אנחנו עובדים" />
      <SolutionsSection />
      <ProcessSection preview />
      <GallerySection />
      <ContactSection compact />
    </>
  )
}

function Hero({ page, primaryHref, primaryLabel, secondaryRoute, secondaryLabel }) {
  return (
    <section className="hero-section">
      <img className="hero-image" src={asset(page.hero.image)} alt={page.hero.alt} />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-content">
        <h1>{page.hero.title}</h1>
        <p>{page.hero.subtitle}</p>
        <div className="hero-actions">
          <a className="button button-primary" href={primaryHref || href(routes.contact)}>
            {primaryLabel || 'השאירו פרטים ונחזור אליכם'}
          </a>
          {secondaryRoute ? (
            <a className="button button-ghost" href={href(secondaryRoute)}>
              {secondaryLabel}
            </a>
          ) : null}
        </div>
        <div className="hero-contact" aria-label="פרטי קשר מהירים">
          <span>
            <MapPin aria-hidden="true" />
            {siteInfo.location}
          </span>
          <a href={`tel:${siteInfo.phone}`}>
            <Phone aria-hidden="true" />
            {siteInfo.phoneLabel}
          </a>
          <a href={`mailto:${siteInfo.email}`}>
            <Mail aria-hidden="true" />
            {siteInfo.email}
          </a>
        </div>
      </div>
    </section>
  )
}

function PageHero({ page }) {
  return (
    <section className="page-hero">
      <img src={asset(page.hero.image)} alt={page.hero.alt} />
      <div className="page-hero-overlay" aria-hidden="true" />
      <div>
        <h1>{page.hero.title}</h1>
        <p>{page.hero.subtitle}</p>
      </div>
    </section>
  )
}

function SolutionsSection() {
  return (
    <section className="section section-light">
      <SectionTitle title={solutionsIntro.title} text={solutionsIntro.subtitle} />
      <div className="solutions-grid">
        {solutions.map((solution) => (
          <article className="solution-card" key={solution.title}>
            <img src={asset(solution.image)} alt={solution.alt} loading="lazy" />
            <div>
              <h3>{solution.title}</h3>
              <p>{solution.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ProcessSection({ preview = false }) {
  return (
    <section className="section section-muted">
      <SectionTitle title="תהליך העבודה" text="ניהול פרויקט מסודר משלב בדיקת התוכניות ועד למסירה" />
      <div className="process-grid">
        {processSteps.map((step, index) => (
          <article className="process-card" key={step.title}>
            <span>{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
      {preview ? (
        <div className="section-action">
          <a className="text-link" href={href(routes.process)}>
            לפירוט תהליך העבודה
            <ArrowLeft aria-hidden="true" />
          </a>
        </div>
      ) : null}
    </section>
  )
}

function GallerySection() {
  const [index, setIndex] = useState(0)
  const maxIndex = galleryItems.length - 1
  const active = galleryItems[index]

  const next = () => setIndex((current) => (current === maxIndex ? 0 : current + 1))
  const previous = () => setIndex((current) => (current === 0 ? maxIndex : current - 1))

  return (
    <section className="section gallery-section">
      <div className="gallery-copy">
        <SectionTitle title={galleryIntro.title} text={galleryIntro.text} align="start" />
        <div className="gallery-controls" aria-label="בקרת גלריה">
          <button type="button" onClick={previous} aria-label="תמונה קודמת">
            <ChevronRight aria-hidden="true" />
          </button>
          <span>{index + 1} / {galleryItems.length}</span>
          <button type="button" onClick={next} aria-label="תמונה הבאה">
            <ChevronLeft aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="gallery-stage">
        <img src={asset(active.image)} alt={active.alt} />
        <strong>{active.title}</strong>
      </div>
      <div className="gallery-thumbs" aria-label="בחירת תמונה">
        {galleryItems.map((item, itemIndex) => (
          <button
            type="button"
            key={item.image}
            aria-label={item.title}
            aria-current={itemIndex === index ? 'true' : undefined}
            onClick={() => setIndex(itemIndex)}
          >
            <img src={asset(item.image)} alt={item.alt} loading="lazy" />
          </button>
        ))}
      </div>
    </section>
  )
}

function AboutPage() {
  const page = pages[routes.about]

  return (
    <>
      <PageHero page={page} />
      <section className="section section-light narrative-section">
        {page.sections.map((section) => (
          <article className="narrative-block" key={section.title}>
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
        ))}
      </section>
      <ContactBand />
    </>
  )
}

function ProcessPage() {
  return (
    <>
      <PageHero page={pages[routes.process]} />
      <ProcessSection />
      <ContactBand />
    </>
  )
}

function KnowledgePage() {
  return (
    <>
      <PageHero page={pages[routes.knowledge]} />
      <section className="section section-light">
        <div className="article-grid">
          {articles.map((article) => (
            <article className="article-card" key={article.slug}>
              <a href={href(articleRoute(article))}>
                <img src={asset(article.image)} alt={article.alt} loading="lazy" />
                <span>{article.readTime}</span>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <small>קרא עוד</small>
              </a>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function ArticlePage({ article }) {
  return (
    <>
      <section className="article-hero">
        <div>
          <a href={href(routes.knowledge)}>מרכז הידע שלנו</a>
          <h1>{article.title}</h1>
          <p>{article.readTime}</p>
        </div>
        <img src={asset(article.image)} alt={article.alt} />
      </section>
      <article className="section section-light article-body">
        {article.sections.map((section, index) => (
          <section key={section.title || index}>
            {section.title ? <h2>{section.title}</h2> : null}
            {section.body.map((paragraph) => (
              <p className={paragraph.startsWith('•') ? 'bullet-line' : undefined} key={paragraph}>
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </article>
      <ContactBand />
    </>
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
          <SectionTitle
            title="לייעוץ טכני ותיאום פגישה"
            text="לבדיקת תוכניות אלומיניום, תיאום פגישה או קבלת הצעה טכנית, שלחו תוכניות, תמונות או תיאור קצר ונחזור אליכם בהקדם."
            align="start"
          />
          <ul className="contact-list">
            <li>
              <MapPin aria-hidden="true" />
              {siteInfo.location}
            </li>
            <li>{siteInfo.name} | מערכות אלומיניום מתקדמות</li>
            <li>
              <Phone aria-hidden="true" />
              <a href={`tel:${siteInfo.phone}`}>{siteInfo.phoneLabel}</a>
            </li>
            <li>
              <Mail aria-hidden="true" />
              <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
            </li>
            <li>{siteInfo.hours}</li>
            <li>{siteInfo.hoursNote}</li>
          </ul>
          <div className="contact-buttons">
            <a className="button button-primary" href={whatsappHref()}>
              <MessageCircle aria-hidden="true" />
              שליחת תוכניות בוואטסאפ
            </a>
            <a className="button button-outline" href={`mailto:${siteInfo.email}`}>
              <Mail aria-hidden="true" />
              שליחת מייל
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const updateField = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }))
  const message = [
    form.name ? `שם: ${form.name}` : '',
    form.phone ? `טלפון: ${form.phone}` : '',
    form.email ? `מייל: ${form.email}` : '',
    form.message ? `הודעה: ${form.message}` : '',
  ].filter(Boolean).join('\n')

  const encoded = message || whatsappMessages.details

  return (
    <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
      <h2>צור קשר</h2>
      <label>
        שם*
        <input value={form.name} onChange={updateField('name')} autoComplete="name" />
      </label>
      <label>
        טלפון
        <input value={form.phone} onChange={updateField('phone')} autoComplete="tel" inputMode="tel" />
      </label>
      <label>
        כתובת הדואר האלקטרוני שלך*
        <input value={form.email} onChange={updateField('email')} autoComplete="email" inputMode="email" />
      </label>
      <label>
        הודעה
        <textarea value={form.message} onChange={updateField('message')} rows="5" />
      </label>
      <div className="form-actions">
        <a className="button button-primary" href={whatsappHref(encoded)}>
          שליחה בוואטסאפ
        </a>
        <a className="button button-outline" href={`mailto:${siteInfo.email}?subject=${encodeURIComponent('פנייה מאתר אשבל אלומיניום')}&body=${encodeURIComponent(encoded)}`}>
          שליחה במייל
        </a>
      </div>
      <p>הטופס מכין הודעה לשליחה בוואטסאפ או במייל. ניתן לצרף שם תוכניות ותמונות לפני השליחה.</p>
    </form>
  )
}

function ContactBand() {
  return (
    <section className="contact-band">
      <div>
        <h2>שלחו תוכניות, תמונות או תיאור קצר של העבודה</h2>
        <p>נבדוק את החומר ונחזור עם כיוון ראשוני לשלב הבא.</p>
      </div>
      <a className="button button-primary" href={whatsappHref()}>
        שליחת תוכניות לוואטסאפ
      </a>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>{siteInfo.name}</strong>
        <p>{siteInfo.positioning}</p>
        <p>{siteInfo.location} | {siteInfo.hours}</p>
      </div>
      <nav aria-label="קישורי תחתית">
        {navItems.map((item) => (
          <a key={item.route} href={href(item.route)}>{item.label}</a>
        ))}
      </nav>
      <div className="footer-contact">
        <a href={`tel:${siteInfo.phone}`}>{siteInfo.phoneLabel}</a>
        <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
        <a href={whatsappHref(whatsappMessages.details)}>WhatsApp</a>
      </div>
      <small>{siteInfo.copyright}</small>
    </footer>
  )
}

function MobileActions() {
  return (
    <div className="mobile-actions" aria-label="פעולות מהירות">
      <a href={whatsappHref()}>
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

function SectionTitle({ title, text, align = 'center' }) {
  return (
    <div className={`section-title align-${align}`}>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  )
}

export default App
