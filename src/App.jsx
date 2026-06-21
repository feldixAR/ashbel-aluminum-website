import { motion } from 'framer-motion'
import {
  ArrowUpLeft,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  DoorOpen,
  DraftingCompass,
  Factory,
  FileText,
  Layers3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
  SunMedium,
  Wrench,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import './App.css'

const base = import.meta.env.BASE_URL
const asset = (path) => `${base}${path}`.replace(/\/{2,}/g, '/')

const phoneDisplay = '+972-55-960-7033 - עמית'
const phoneHref = 'tel:+972559607033'
const whatsappHref =
  'https://wa.me/972559607033?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%A2%D7%9E%D7%99%D7%AA%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%9C%D7%95%D7%97%20%D7%AA%D7%95%D7%9B%D7%A0%D7%99%D7%95%D7%AA%20%D7%90%D7%95%20%D7%AA%D7%9E%D7%95%D7%A0%D7%95%D7%AA%20%D7%9C%D7%91%D7%93%D7%99%D7%A7%D7%94.'
const email = 'alumashbel@gmail.com'

const navItems = [
  { label: 'שירותים', href: '#services' },
  { label: 'פרויקטים', href: '#gallery' },
  { label: 'תהליך עבודה', href: '#process' },
  { label: 'ידע מקצועי', href: '#knowledge' },
  { label: 'צור קשר', href: '#contact' },
]

const services = [
  {
    title: 'חלונות ודלתות אלומיניום',
    icon: DoorOpen,
    image: 'large-sliding-vitrine.webp',
    alt: 'ויטרינה לבנה רחבה בחלל מגורים מואר',
    text: 'ייצור והתקנה של חלונות, דלתות כניסה ופתרונות פתיחה מדויקים לבית פרטי, וילה או פרויקט קבלני.',
  },
  {
    title: 'ויטרינות ומערכות הזזה',
    icon: Building2,
    image: 'black-frame-living-room.webp',
    alt: 'חלל מגורים עם ויטרינות וחלונות אלומיניום שחורים',
    text: 'מערכות הזזה למפתחים גדולים, ויטרינות רחבות ומפתחים עם נוף פתוח, תוך תשומת לב לאיטום ולנוחות שימוש.',
  },
  {
    title: 'פרופיל בלגי ומראה עדין',
    icon: DraftingCompass,
    image: 'belgian-partition.webp',
    alt: 'מחיצת אלומיניום בסגנון בלגי עם חלוקה שחורה',
    text: 'פתרונות בסגנון בלגי לחללים שבהם העיצוב חשוב לא פחות מהביצוע: חלוקות עדינות, קווים נקיים ונוכחות אדריכלית.',
  },
  {
    title: 'תריסים, הצללה ומסתורים',
    icon: SunMedium,
    image: 'pergola-slats.webp',
    alt: 'פרגולת אלומיניום עם סרגלי הצללה',
    text: 'פרגולות אלומיניום, תריסים, מסתורים וחיפויים אדריכליים המותאמים לחזית, לתשתיות ולשימוש היומיומי.',
  },
  {
    title: 'מפתחים מיוחדים ופתרונות הנדסיים',
    icon: Layers3,
    image: 'hero-wide-openings.webp',
    alt: 'ויטרינות אלומיניום שחורות במפתח רחב עם נוף פתוח',
    text: 'התמודדות עם פתחים רחבים, חלוקות מיוחדות, קירות זכוכית ופרטים שדורשים תיאום מוקדם בין תכנון לביצוע.',
  },
  {
    title: 'שירותי מפעל לקבלנים ומתקינים',
    icon: Factory,
    image: 'modern-facade-black-aluminum.webp',
    alt: 'חזית בית מודרני עם מערכות אלומיניום שחורות',
    text: 'ייצור, הכנה, צביעה ואספקה מסודרת לפי מידה עבור קבלנים, מתקינים ופרויקטים שדורשים עבודה עקבית ומדויקת.',
  },
]

const reasons = [
  'בדיקה מקצועית של תוכניות, פתחים וצרכים לפני יציאה לייצור.',
  'עבודה מסודרת משלב המדידה ועד התקנה ובדיקת גמר.',
  'התאמה לאדריכלים, קבלנים ובונים פרטיים בלי להפוך את התהליך למסורבל.',
  'שירות אישי וישיר מול עמית, עם זמינות לתיאום ולשאלות מקצועיות.',
  'ניסיון במפתחים רחבים, תריסים, פרגולות, פרופיל בלגי ופתרונות חזית.',
]

const processSteps = [
  ['שולחים תוכניות או תמונות', 'אפשר לשלוח WhatsApp, תוכנית, תמונות מהשטח או תיאור קצר של העבודה.'],
  ['מבינים את סוג הפרויקט', 'בודקים את שלב הפרויקט, סוג הלקוח, הפתחים והצרכים המקצועיים.'],
  ['מקבלים כיוון ראשוני', 'נותנים הכוונה לגבי מערכות מתאימות, סדר פעולות ומה כדאי לבדוק לפני החלטה.'],
  ['מדידה, הצעה וייצור', 'מתאמים מדידה בשטח, מכינים הצעת מחיר מסודרת ויוצאים לייצור לאחר אישור.'],
  ['התקנה ומסירה', 'מבצעים התקנה, בדיקת גמר ומסירה מסודרת של העבודה.'],
]

const knowledgeItems = [
  ['מה כדאי להכין לפני פנייה', 'תוכנית, מידות פתחים, תמונות מהשטח וכיוון שימוש עוזרים להבין מהר יותר מה נכון לפרויקט.'],
  ['בחירת מערכת למפתח גדול', 'במפתח רחב בודקים משקל כנף, מסילות, איטום, נוחות שימוש והמראה האדריכלי המבוקש.'],
  ['אלומיניום בשלב התכנון', 'ככל שמתאמים מוקדם יותר בין האדריכל, הקבלן והאלומיניום, קל יותר למנוע שינויים מאוחרים.'],
]

const galleryImages = [
  ['hero-wide-openings.webp', 'ויטרינות אלומיניום שחורות במפתח רחב עם נוף פתוח'],
  ['modern-facade-black-aluminum.webp', 'חזית בית מודרני עם מערכות אלומיניום שחורות'],
  ['black-frame-living-room.webp', 'חלל מגורים עם חלונות וויטרינת אלומיניום שחורים'],
  ['large-sliding-vitrine.webp', 'ויטרינה לבנה רחבה בחלל מגורים מואר'],
  ['pergola-slats.webp', 'פרגולת אלומיניום עם סרגלי הצללה'],
  ['belgian-partition.webp', 'מחיצת אלומיניום בסגנון בלגי עם חלוקה שחורה'],
  ['ribbed-glass-door.webp', 'דלת אלומיניום שחורה עם זכוכית מחוספסת'],
  ['sliding-vitrine-balcony.webp', 'ויטרינת הזזה כהה ביציאה למרפסת'],
  ['narrow-window-stone.webp', 'חלון אנתרציט צר בקיר אבן'],
  ['exterior-shutters.webp', 'תריסים שחורים בחזית אבן בהירה'],
]

function FadeIn({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0.96, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.34, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ title, intro }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </div>
  )
}

function App() {
  return (
    <main className="site-shell" id="top">
      <header className="site-header" aria-label="ניווט ראשי">
        <a className="brand" href="#top" aria-label="אשבל אלומיניום - דף הבית">
          <img src={asset('portfolio/ashbel-logo.webp')} alt="" />
          <span>
            <strong>אשבל אלומיניום</strong>
            <small>ייצור וביצוע פרויקטים</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="קישורי האתר">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-contact" href={whatsappHref}>
          <MessageCircle data-icon="inline-start" />
          WhatsApp
        </a>
        <a className="mobile-menu" href={whatsappHref} aria-label="שליחת הודעת WhatsApp">
          <MessageCircle aria-hidden="true" />
        </a>
      </header>

      <section className="hero-section">
        <div className="hero-grid">
          <FadeIn className="hero-copy">
            <h1>אלומיניום מדויק לבתים פרטיים, וילות ופרויקטים איכותיים</h1>
            <p className="hero-lead">
              אשבל אלומיניום בניצני עוז מלווה אדריכלים, קבלנים ובונים פרטיים
              משלב הבנת התוכנית ועד ייצור, התקנה ומסירה בשטח.
            </p>
            <div className="hero-actions" aria-label="פעולות ראשיות">
              <Button asChild size="lg" className="primary-action">
                <a href={whatsappHref}>
                  <MessageCircle data-icon="inline-start" />
                  שליחת תוכניות או תמונות לבדיקה
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={phoneHref}>
                  שיחה עם איש מקצוע
                  <ArrowUpLeft data-icon="inline-end" />
                </a>
              </Button>
            </div>
            <div className="hero-contact-strip">
              <a href={phoneHref}>
                <Phone aria-hidden="true" />
                {phoneDisplay}
              </a>
              <span>
                <MapPin aria-hidden="true" />
                ניצני עוז, ישראל
              </span>
              <span>
                <CalendarCheck aria-hidden="true" />
                ראשון עד חמישי, 08:30-16:30
              </span>
            </div>
          </FadeIn>

          <FadeIn className="hero-photo" delay={0.05}>
            <img
              src={asset('portfolio/hero-wide-openings.webp')}
              alt="ויטרינות אלומיניום שחורות במפתח רחב עם נוף פתוח"
              width="1200"
              height="850"
            />
          </FadeIn>
        </div>
      </section>

      <section className="trust-strip" aria-label="תחומי פעילות">
        {['בתים פרטיים', 'וילות', 'אדריכלים', 'קבלנים', 'מדידה והתקנה', 'ליווי עד גמר'].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>

      <section className="content-section services-section" id="services">
        <SectionHeading
          title="שירותים ופתרונות אלומיניום"
          intro="שירותים מעשיים לפי סוג הפתח, סגנון הבית ושלב הפרויקט. בלי קטלוג עמוס, עם דגש על התאמה וביצוע נכון."
        />
        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <FadeIn className="service-card" key={service.title} delay={index * 0.03}>
                <img src={asset(`portfolio/${service.image}`)} alt={service.alt} loading="lazy" />
                <div className="card-body">
                  <Icon aria-hidden="true" />
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </section>

      <section className="split-section" id="why">
        <FadeIn className="split-photo">
          <img
            src={asset('portfolio/modern-facade-black-aluminum.webp')}
            alt="חזית בית מודרני עם מערכות אלומיניום שחורות"
            loading="lazy"
          />
        </FadeIn>
        <FadeIn className="split-copy">
          <SectionHeading title="למה לבחור באשבל אלומיניום" />
          <ul className="check-list">
            {reasons.map((reason) => (
              <li key={reason}>
                <CheckCircle2 aria-hidden="true" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      <section className="content-section process-section" id="process">
        <SectionHeading
          title="תהליך עבודה ברור"
          intro="התהליך בנוי כדי להפחית אי-ודאות: להבין את הצורך, לבדוק התאמה, למדוד נכון ולבצע נקי."
        />
        <div className="process-layout">
          <img
            src={asset('portfolio/sliding-vitrine-balcony.webp')}
            alt="ויטרינת הזזה כהה ביציאה למרפסת"
            loading="lazy"
          />
          <div className="process-list">
            {processSteps.map(([title, text], index) => (
              <FadeIn className="process-card" key={title} delay={index * 0.03}>
                <div className="step-number">{index + 1}</div>
                {index === 0 && <ClipboardCheck aria-hidden="true" />}
                {index === 1 && <FileText aria-hidden="true" />}
                {index === 2 && <DraftingCompass aria-hidden="true" />}
                {index === 3 && <Ruler aria-hidden="true" />}
                {index === 4 && <Wrench aria-hidden="true" />}
                <h3>{title}</h3>
                <p>{text}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section knowledge-section" id="knowledge">
        <SectionHeading
          title="ידע מקצועי לפני שמתחילים"
          intro="כמה נקודות שכדאי לדעת לפני שבוחרים מערכת, שולחים תוכנית או מתאמים מדידה."
        />
        <div className="knowledge-grid">
          {knowledgeItems.map(([title, text], index) => (
            <FadeIn className="knowledge-card" key={title} delay={index * 0.04}>
              <FileText aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="content-section gallery-section" id="gallery">
        <SectionHeading
          title="תיק עבודות"
          intro="מבחר תמונות עבודה נבחרות. התמונות מוצגות ללא שמות קבצים או סיפורי פרויקט שלא אומתו."
        />
        <div className="gallery-grid">
          {galleryImages.map(([image, alt], index) => (
            <FadeIn className={`gallery-card gallery-card-${index + 1}`} key={image} delay={index * 0.02}>
              <img src={asset(`portfolio/${image}`)} alt={alt} loading="lazy" />
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <FadeIn className="contact-panel">
          <div>
            <h2>לבדיקת תוכניות, תמונות או תיאום פגישה</h2>
            <p>
              אפשר לשלוח ב-WhatsApp תוכנית, תמונות מהשטח או תיאור קצר של העבודה.
              נחזור עם כיוון מקצועי ראשוני ונבין יחד מה השלב הבא.
            </p>
          </div>
          <div className="contact-actions">
            <Button asChild size="lg" className="primary-action">
              <a href={whatsappHref}>
                <MessageCircle data-icon="inline-start" />
                שליחת הודעת WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`mailto:${email}`}>
                <Mail data-icon="inline-start" />
                {email}
              </a>
            </Button>
          </div>
          <div className="contact-details">
            <span>
              <MapPin aria-hidden="true" />
              ניצני עוז, ישראל
            </span>
            <a href={phoneHref}>
              <Phone aria-hidden="true" />
              {phoneDisplay}
            </a>
            <span>
              <CalendarCheck aria-hidden="true" />
              ראשון עד חמישי, 08:30-16:30, בתיאום מראש
            </span>
          </div>
        </FadeIn>
      </section>

      <div className="mobile-sticky-cta" aria-label="פעולות מהירות">
        <a href={whatsappHref}>
          <MessageCircle aria-hidden="true" />
          WhatsApp
        </a>
        <a href={phoneHref}>
          <Phone aria-hidden="true" />
          התקשרות
        </a>
      </div>

      <footer className="site-footer">
        <span>© 2026 כל הזכויות שמורות - אשבל אלומיניום</span>
        <a href={`mailto:${email}`}>{email}</a>
      </footer>
    </main>
  )
}

export default App
