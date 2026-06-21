import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowUpLeft, CalendarCheck, CheckCircle2, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { MobileActions } from '@/components/MobileActions'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import {
  about,
  articles,
  asset,
  contact,
  getArticle,
  getSolution,
  galleryGroups,
  hero,
  processSteps,
  solutionCategories,
  trustItems,
} from '@/data/siteContent'
import './App.css'

const pageMeta = {
  '/': {
    title: 'אשבל אלומיניום | ייצור וביצוע פרויקטים באלומיניום',
    description: 'אשבל אלומיניום מניצני עוז - ויטרינות, חלונות, תריסים, פרגולות ופתרונות אלומיניום לפי תוכנית.',
  },
  '/solutions': {
    title: 'פתרונות אלומיניום | אשבל אלומיניום',
    description: 'פתרונות אלומיניום לפי סוג מוצר: ויטרינות, חלונות, בלגי, תריסים, הצללות ופתרונות מיוחדים.',
  },
  '/projects': {
    title: 'תיק עבודות | אשבל אלומיניום',
    description: 'תיק עבודות מחולק לפי פתרונות אלומיניום ותמונות אמיתיות מהשטח.',
  },
  '/knowledge': {
    title: 'מרכז ידע | אשבל אלומיניום',
    description: 'מדריכים קצרים לבחירת חלונות, ויטרינות, פרופילים, זכוכית ופתרונות אלומיניום.',
  },
  '/process': {
    title: 'תהליך עבודה | אשבל אלומיניום',
    description: 'תהליך עבודה מסודר: בדיקת תוכניות, הצעת מחיר, ייצור, התקנה ומסירה.',
  },
  '/contact': {
    title: 'ייעוץ טכני ותיאום פגישה | אשבל אלומיניום',
    description: 'שלחו תוכניות, תמונות או תיאור קצר לבדיקה ראשונית מול עמית מאשבל אלומיניום.',
  },
}

function normalizeHash() {
  const hash = window.location.hash.replace(/^#/, '')
  return hash.startsWith('/') ? hash : '/'
}

function useHashRoute() {
  const [route, setRoute] = useState(normalizeHash)

  useEffect(() => {
    const onHashChange = () => setRoute(normalizeHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [route])

  return route
}

function setMeta(route, title, description) {
  document.title = title
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) metaDescription.setAttribute('content', description)

  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) ogTitle.setAttribute('content', title)

  const ogDescription = document.querySelector('meta[property="og:description"]')
  if (ogDescription) ogDescription.setAttribute('content', description)

  const canonical = document.querySelector('link[rel="canonical"]')
  if (canonical) canonical.setAttribute('href', `${window.location.origin}${import.meta.env.BASE_URL}#${route}`)
}

function App() {
  const route = useHashRoute()
  const page = useMemo(() => resolvePage(route), [route])

  useEffect(() => {
    setMeta(route, page.title, page.description)
  }, [page.description, page.title, route])

  return (
    <main className="site-shell" id="top">
      <Header currentRoute={route} />
      {page.node}
      <MobileActions />
      <Footer />
    </main>
  )
}

function resolvePage(route) {
  const solutionMatch = route.match(/^\/solutions\/([^/]+)$/)
  if (solutionMatch) {
    const solution = getSolution(solutionMatch[1])
    if (solution) {
      return {
        title: `${solution.title} | אשבל אלומיניום`,
        description: solution.short,
        node: <SolutionPage solution={solution} />,
      }
    }
  }

  const articleMatch = route.match(/^\/knowledge\/([^/]+)$/)
  if (articleMatch) {
    const article = getArticle(articleMatch[1])
    if (article) {
      return {
        title: `${article.title} | אשבל אלומיניום`,
        description: article.intro,
        node: <ArticlePage article={article} />,
      }
    }
  }

  const staticPages = {
    '/': { ...pageMeta['/'], node: <HomePage /> },
    '/solutions': { ...pageMeta['/solutions'], node: <SolutionsPage /> },
    '/projects': { ...pageMeta['/projects'], node: <ProjectsPage /> },
    '/knowledge': { ...pageMeta['/knowledge'], node: <KnowledgePage /> },
    '/process': { ...pageMeta['/process'], node: <ProcessPage /> },
    '/contact': { ...pageMeta['/contact'], node: <ContactPage /> },
  }

  return staticPages[route] || staticPages['/']
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <SolutionsPreview />
      <AboutSection />
      <ProcessSection compact />
      <ProjectsPreview />
      <KnowledgePreview />
      <ConsultationBand />
    </>
  )
}

function HeroSection() {
  return (
    <section className="hero-section">
      <img className="hero-background" src={asset(`portfolio/${hero.image}`)} alt="" aria-hidden="true" />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-inner">
        <Reveal className="hero-copy">
          <h1>{hero.title}</h1>
          <p className="hero-subtitle">{hero.subtitle}</p>
          <p className="hero-lead">{hero.text}</p>
          <div className="hero-actions" aria-label="פעולות ראשיות">
            <Button asChild size="lg" className="primary-action">
              <a href="#/contact">לקביעת ייעוץ טכני</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={contact.whatsappHref}>
                דברו עם עמית בוואטסאפ
                <MessageCircle data-icon="inline-end" />
              </a>
            </Button>
          </div>
          <div className="hero-contact-strip">
            <a href={contact.phoneHref}>
              <Phone aria-hidden="true" />
              {contact.phoneDisplay}
            </a>
            <span>
              <MapPin aria-hidden="true" />
              {contact.location}
            </span>
            <span>
              <CalendarCheck aria-hidden="true" />
              ראשון עד חמישי, 08:30-16:30
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="תחומי פעילות">
      {trustItems.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </section>
  )
}

function SolutionsPreview() {
  return (
    <section className="content-section white-section">
      <SectionHeading
        kicker="פתרונות אלומיניום"
        title="בחירה לפי פתח, שימוש ותוכנית"
        intro="האתר מחולק לפי סוגי פתרונות כדי שתוכלו לראות את העבודה בהקשר הנכון, ולא כאוסף תמונות אקראי."
      />
      <div className="solutions-grid">
        {solutionCategories.map((solution, index) => {
          const Icon = solution.icon
          return (
            <Reveal className="solution-card" key={solution.slug} delay={index * 0.025}>
              <a href={`#/solutions/${solution.slug}`}>
                <img src={asset(`portfolio/${solution.image}`)} alt={solution.alt} loading="lazy" />
                <span className="solution-overlay" aria-hidden="true" />
                <span className="solution-content">
                  <Icon aria-hidden="true" />
                  <strong>{solution.title}</strong>
                  <small>{solution.short}</small>
                </span>
              </a>
            </Reveal>
          )
        })}
      </div>
      <div className="section-action">
        <Button asChild className="primary-action">
          <a href="#/solutions">
            לכל הפתרונות
            <ArrowLeft data-icon="inline-end" />
          </a>
        </Button>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="content-section about-section">
      <div className="about-layout">
        <Reveal className="about-copy">
          <p className="section-kicker">על החברה</p>
          <h2>ייצור וביצוע מסודר, מהתוכנית ועד השטח</h2>
          <p>{about.intro}</p>
          <div className="about-points">
            {about.points.map((point) => (
              <div className="about-point" key={point.title}>
                <CheckCircle2 aria-hidden="true" />
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="about-photo" delay={0.05}>
          <img src={asset(`portfolio/${about.image}`)} alt={about.alt} loading="lazy" />
        </Reveal>
      </div>
    </section>
  )
}

function ProcessSection({ compact = false }) {
  return (
    <section className={`content-section process-section ${compact ? 'compact-process' : ''}`}>
      <SectionHeading
        kicker="תהליך עבודה"
        title="תהליך ברור שמייצר ביטחון"
        intro="מהרגע ששולחים תוכניות או תמונות ועד התקנה ומסירה, התהליך נשאר פשוט, מקצועי ומבוסס תיאום."
      />
      <div className="process-layout">
        <Reveal className="process-photo">
          <img src={asset('portfolio/sliding-vitrine-balcony.webp')} alt="ויטרינת הזזה כהה ביציאה למרפסת" loading="lazy" />
        </Reveal>
        <div className="process-list">
          {processSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <Reveal className="process-card" key={step.title} delay={index * 0.025}>
                <span className="step-number">{index + 1}</span>
                <Icon aria-hidden="true" />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ProjectsPreview() {
  const featured = galleryGroups.slice(0, 4)
  return (
    <section className="content-section projects-section">
      <SectionHeading
        kicker="תיק עבודות"
        title="תמונות נבחרות לפי סוג פתרון"
        intro="מעט תמונות חזקות, מוצגות בהקשר שלהן. בלי שמות קבצים, בלי מספרים ובלי סיפורי פרויקט שלא אומתו."
      />
      <div className="project-category-grid">
        {featured.map((group, index) => (
          <Reveal className="project-category-card" key={group.slug} delay={index * 0.025}>
            <a href={`#/solutions/${group.slug}`}>
              <img src={asset(`portfolio/${group.image}`)} alt={group.alt} loading="lazy" />
              <span>
                <strong>{group.title}</strong>
                <small>{group.short}</small>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
      <div className="section-action">
        <Button asChild variant="outline">
          <a href="#/projects">לתיק העבודות המלא</a>
        </Button>
      </div>
    </section>
  )
}

function KnowledgePreview() {
  return (
    <section className="content-section white-section">
      <SectionHeading
        kicker="מרכז ידע"
        title="מידע קצר לפני שמתחילים"
        intro="מאמרים קצרים מתוך אתר אשבל המקורי, מסודרים מחדש לקריאה נוחה וברורה."
      />
      <div className="knowledge-grid">
        {articles.slice(0, 4).map((article, index) => (
          <Reveal className="knowledge-card" key={article.slug} delay={index * 0.025}>
            <a href={`#/knowledge/${article.slug}`}>
              <span>{article.readTime}</span>
              <h3>{article.title}</h3>
              <p>{article.intro}</p>
              <small>קראו עוד</small>
            </a>
          </Reveal>
        ))}
      </div>
      <div className="section-action">
        <Button asChild variant="outline">
          <a href="#/knowledge">למרכז הידע</a>
        </Button>
      </div>
    </section>
  )
}

function ConsultationBand() {
  return (
    <section className="consultation-band">
      <div>
        <p className="section-kicker">ייעוץ טכני</p>
        <h2>שלחו תוכניות, תמונות או תיאור קצר של העבודה</h2>
        <p>נבדוק את החומר ונחזור עם כיוון ראשוני לשלב הבא.</p>
      </div>
      <div className="contact-actions">
        <Button asChild size="lg" className="primary-action">
          <a href="#/contact">לקביעת ייעוץ טכני</a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href={contact.whatsappHref}>
            WhatsApp
            <MessageCircle data-icon="inline-end" />
          </a>
        </Button>
      </div>
    </section>
  )
}

function SolutionsPage() {
  return (
    <>
      <InnerHero title="פתרונות אלומיניום" text="פתרונות לפי סוג מוצר, שימוש ותוכנית - עם תמונות אמיתיות והקשר מקצועי." image="modern-facade-black-aluminum.webp" />
      <SolutionsPreview />
      <ConsultationBand />
    </>
  )
}

function SolutionPage({ solution }) {
  const related = solutionCategories.filter((item) => item.slug !== solution.slug).slice(0, 3)
  return (
    <>
      <InnerHero title={solution.title} text={solution.short} image={solution.image} />
      <section className="content-section solution-detail-section">
        <div className="detail-layout">
          <Reveal className="detail-copy">
            <p className="section-kicker">פתרון אלומיניום</p>
            <h2>מה חשוב לדעת לפני ביצוע</h2>
            <p>{solution.approach}</p>
            <DetailList title="למי זה מתאים" items={solution.suitable} />
            <DetailList title="מה בודקים לפני הצעה" items={solution.checks} />
          </Reveal>
          <Reveal className="detail-aside" delay={0.05}>
            <h3>העבירו חומר לבדיקה</h3>
            <p>תוכנית, מידות פתחים, תמונות מהשטח או תיאור קצר יעזרו להבין את הכיוון.</p>
            <Button asChild className="primary-action">
              <a href={contact.whatsappHref}>שלחו תוכניות לבדיקה</a>
            </Button>
          </Reveal>
        </div>
        <ImageStory images={solution.gallery} />
        <RelatedSolutions solutions={related} />
      </section>
    </>
  )
}

function DetailList({ title, items }) {
  return (
    <div className="detail-list">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

function ImageStory({ images }) {
  return (
    <div className="image-story">
      {images.map(([image, alt], index) => (
        <Reveal className="story-image" key={image} delay={index * 0.025}>
          <img src={asset(`portfolio/${image}`)} alt={alt} loading="lazy" />
        </Reveal>
      ))}
    </div>
  )
}

function RelatedSolutions({ solutions }) {
  return (
    <div className="related-strip">
      <h2>פתרונות קרובים</h2>
      <div>
        {solutions.map((solution) => (
          <a href={`#/solutions/${solution.slug}`} key={solution.slug}>
            {solution.title}
            <ArrowUpLeft aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  )
}

function ProjectsPage() {
  return (
    <>
      <InnerHero title="תיק עבודות" text="העבודות מוצגות לפי סוג פתרון כדי לתת הקשר מקצועי לכל תמונה." image="black-frame-living-room.webp" />
      <section className="content-section projects-section">
        <div className="project-category-grid large">
          {galleryGroups.map((group, index) => (
            <Reveal className="project-category-card" key={group.slug} delay={index * 0.025}>
              <a href={`#/solutions/${group.slug}`}>
                <img src={asset(`portfolio/${group.image}`)} alt={group.alt} loading="lazy" />
                <span>
                  <strong>{group.title}</strong>
                  <small>{group.short}</small>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}

function KnowledgePage() {
  return (
    <>
      <InnerHero title="מרכז ידע" text="נקודות מעשיות לפני בחירת חלונות, ויטרינות, פרופילים ופתרונות אלומיניום." image="pergola-slats.webp" />
      <section className="content-section white-section">
        <div className="article-grid">
          {articles.map((article, index) => (
            <Reveal className="article-card" key={article.slug} delay={index * 0.02}>
              <a href={`#/knowledge/${article.slug}`}>
                <span>{article.readTime}</span>
                <h2>{article.title}</h2>
                <p>{article.intro}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}

function ArticlePage({ article }) {
  const relatedSolutions = article.related.map(getSolution).filter(Boolean)
  return (
    <>
      <InnerHero title={article.title} text={article.intro} image="hero-wide-openings.webp" compact />
      <article className="content-section article-page">
        <div className="article-body">
          <p className="article-time">{article.readTime}</p>
          {article.sections.map(([title, text]) => (
            <section key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </section>
          ))}
        </div>
        <RelatedSolutions solutions={relatedSolutions} />
      </article>
      <ConsultationBand />
    </>
  )
}

function ProcessPage() {
  return (
    <>
      <InnerHero title="תהליך העבודה" text="ניהול פרויקט מסודר משלב בדיקת התוכניות ועד למסירה." image="sliding-vitrine-balcony.webp" />
      <ProcessSection />
      <ConsultationBand />
    </>
  )
}

function ContactPage() {
  return (
    <>
      <InnerHero title="ייעוץ טכני ותיאום פגישה" text="שלחו תוכניות, תמונות או תיאור קצר ונחזור אליכם בהקדם." image="modern-facade-black-aluminum.webp" compact />
      <section className="contact-section" id="contact">
        <Reveal className="contact-panel">
          <div>
            <p className="section-kicker">צור קשר</p>
            <h2>העבירו חומר לבדיקה ראשונית</h2>
            <p>אפשר לפנות ב-WhatsApp או במייל. נחזור עם כיוון מקצועי ונבין יחד מה נדרש לשלב הבא.</p>
          </div>
          <div className="contact-actions">
            <Button asChild size="lg" className="primary-action">
              <a href={contact.whatsappHref}>
                <MessageCircle data-icon="inline-start" />
                WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`mailto:${contact.email}`}>
                <Mail data-icon="inline-start" />
                שליחת מייל
              </a>
            </Button>
          </div>
          <div className="contact-details">
            <span>
              <MapPin aria-hidden="true" />
              {contact.location}
            </span>
            <a href={contact.phoneHref}>
              <Phone aria-hidden="true" />
              {contact.phoneDisplay}
            </a>
            <a href={`mailto:${contact.email}`}>
              <Mail aria-hidden="true" />
              {contact.email}
            </a>
            <span>
              <CalendarCheck aria-hidden="true" />
              {contact.hours}
            </span>
          </div>
        </Reveal>
      </section>
    </>
  )
}

function InnerHero({ title, text, image, compact = false }) {
  return (
    <section className={`inner-hero ${compact ? 'compact' : ''}`}>
      <img src={asset(`portfolio/${image}`)} alt="" aria-hidden="true" />
      <div className="inner-hero-shade" aria-hidden="true" />
      <Reveal className="inner-hero-copy">
        <h1>{title}</h1>
        <p>{text}</p>
      </Reveal>
    </section>
  )
}

export default App
