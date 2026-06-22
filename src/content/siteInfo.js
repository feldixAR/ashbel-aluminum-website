export const basePath = import.meta.env.BASE_URL

export function asset(path) {
  return `${basePath}${path}`.replace(/\/{2,}/g, '/')
}

export const routes = {
  home: '/',
  about: '/על-החברה',
  process: '/תהליך-העבודה',
  knowledge: '/מרכז-הידע-שלנו',
  contact: '/השאירו-פרטים-ונחזור-אליכם',
}

export const siteInfo = {
  name: 'אשבל אלומיניום',
  title: 'אשבל אלומיניום | ייצור וביצוע פרויקטים',
  positioning: 'מפעל לייצור והתקנה של מערכות אלומיניום',
  description:
    'אשבל אלומיניום מניצני עוז מייצרת, צובעת ומתקינה מערכות אלומיניום לבתים פרטיים, אדריכלים, קבלנים ומנהלי פרויקטים.',
  location: 'ניצני עוז, ישראל',
  serviceArea: 'ישראל',
  phone: '+972559607033',
  phoneDisplay: '+972-55-960-7033 - לתיאום פגישה',
  phoneLabel: '+972-55-960-7033 - עמית',
  email: 'alumashbel@gmail.com',
  hours: 'ראשון עד חמישי - 08:30-16:30',
  hoursNote: 'בתיאום מראש, תודה.',
  logo: 'portfolio/ashbel-logo.webp',
  logoAlt: 'לוגו אשבל אלומיניום',
  copyright: 'זכויות יוצרים © 2026 כל הזכויות שמורות - אשבל אלומיניום',
}

export const whatsappMessages = {
  plans:
    'שלום עמית אשמח לתאם פגישת היכרות קצרה לבחינת התוכניות והתאמת פתרון אלומיניום לפרויקט שלי',
  details:
    'שלום, מעוניין לקבל פרטים לגבי עבודות אלומיניום לבית או לפרויקט שבביצוע. אשמח לבדוק התאמה ולקבל הכוונה ראשונית.',
}

export function whatsappHref(message = whatsappMessages.plans) {
  return `https://wa.me/972559607033?text=${encodeURIComponent(message)}`
}

export const navItems = [
  { label: 'בית', route: routes.home },
  { label: 'על החברה', route: routes.about },
  { label: 'תהליך העבודה', route: routes.process },
  { label: 'מרכז הידע שלנו', route: routes.knowledge },
  { label: 'השאירו פרטים ונחזור אליכם', route: routes.contact },
]

export function href(route) {
  return `#${route}`
}

export const defaultSeo = {
  title: siteInfo.title,
  description:
    'ייצור והתקנה של מערכות אלומיניום בניצני עוז עבור אדריכלים, קבלנים ובונים פרטיים - משלב בקרת התוכנית ועד למסירה בשטח.',
}
