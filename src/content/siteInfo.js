export const basePath = import.meta.env.BASE_URL

export function asset(path) {
  return `${basePath}${path}`.replace(/\/{2,}/g, '/')
}

export const routes = {
  home: '/',
  systems: '/מוצרים',
  projects: '/פרויקטים',
  about: '/על-החברה',
  process: '/תהליך-העבודה',
  knowledge: '/מהשטח',
  contact: '/צור-קשר',
}

export const siteInfo = {
  name: 'אשבל מערכות אלומיניום',
  shortName: 'אשבל אלומיניום',
  title: 'אשבל מערכות אלומיניום | ייצור וביצוע פרויקטים',
  positioning: 'ייצור וביצוע פרויקטים',
  description:
    'אשבל מערכות אלומיניום מניצני עוז מייצרת, צובעת ומתקינה מערכות אלומיניום לבתים, אדריכלים, קבלנים ופרויקטים מסחריים.',
  location: 'ניצני עוז, ישראל',
  serviceArea: 'ישראל',
  phone: '+972559607033',
  phoneDisplay: '+972-55-960-7033',
  phoneLabel: '+972-55-960-7033 - עמית',
  email: 'alumashbel@gmail.com',
  hours: 'ראשון עד חמישי - 08:30-16:30',
  hoursNote: 'בתיאום מראש, תודה.',
  logo: 'portfolio/ashbel-logo.webp',
  logoAlt: 'לוגו אשבל מערכות אלומיניום',
  copyright: 'זכויות יוצרים © 2026 כל הזכויות שמורות - אשבל מערכות אלומיניום',
}

export const whatsappMessages = {
  plans:
    'שלום עמית, אשמח לשלוח תוכנית / מפרט / תמונות מהשטח לבדיקה ולקבל כיוון ראשוני לפרויקט אלומיניום.',
  details:
    'שלום, אשמח לקבל פרטים לגבי עבודות אלומיניום לבית או לפרויקט שבביצוע. יש לי תוכנית / תמונות / מפרט לבדיקה.',
  b2b:
    'שלום עמית, אשמח לשלוח מפרט / רשימת חיתוך / כתב כמויות לקבלת כיוון לשירותי מפעל.',
}

export function whatsappHref(message = whatsappMessages.plans) {
  return `https://wa.me/972559607033?text=${encodeURIComponent(message)}`
}

export const navItems = [
  { label: 'ראשי', route: routes.home },
  { label: 'מוצרים', route: routes.systems },
  { label: 'פרויקטים', route: routes.projects },
  { label: 'תהליך', route: routes.process },
  { label: 'מהשטח', route: routes.knowledge },
  { label: 'צור קשר', route: routes.contact },
]

export const footerNavItems = [
  ...navItems,
  { label: 'על החברה', route: routes.about },
]

export function href(route) {
  return `#${route}`
}

export const defaultSeo = {
  title: siteInfo.title,
  description:
    'מערכות אלומיניום לבתים, אדריכלים, קבלנים ופרויקטים - חלונות, ויטרינות, פרגולות, תריסים, ייצור, התקנה ואספקה לפי מידה.',
}
