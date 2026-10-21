export const basePath = import.meta.env?.BASE_URL || '/'

export function asset(path) {
  return `${basePath}${path}`.replace(/\/{2,}/g, '/')
}

export const routes = {
  "home": "/",
  "systems": "/מוצרים",
  "projects": "/פרויקטים",
  "about": "/על-החברה",
  "process": "/תהליך-העבודה",
  "knowledge": "/מהשטח",
  "contact": "/צור-קשר"
}

export const siteInfo = {
  "url": "https://www.alumashbel.co.il",
  "name": "אשבל מערכות אלומיניום",
  "shortName": "אשבל אלומיניום",
  "title": "אשבל מערכות אלומיניום | ייצור וביצוע פרויקטים",
  "positioning": "ייצור וביצוע פרויקטים",
  "description": "אשבל מערכות אלומיניום מניצני עוז מייצרת, צובעת ומתקינה מערכות אלומיניום לבתים, אדריכלים, קבלנים ופרויקטים מסחריים.",
  "location": "ניצני עוז, ישראל",
  "serviceArea": "ישראל",
  "phone": "+972552523454",
  "phoneDisplay": "055-252-3454",
  "phoneLabel": "055-252-3454 - עמית",
  "email": "ashbeloffice@gmail.com",
  "hours": "ראשון עד חמישי - 08:30-16:30",
  "hoursNote": "בתיאום מראש, תודה.",
  "logo": "media/site/ashbel-logo.webp",
  "logoAlt": "לוגו אשבל מערכות אלומיניום",
  "copyright": "זכויות יוצרים © 2026 כל הזכויות שמורות - אשבל מערכות אלומיניום"
}

export const whatsappMessages = {
  "plans": "שלום עמית, אשמח לשלוח תוכנית / מפרט / תמונות מהשטח לבדיקה ולקבל כיוון ראשוני לפרויקט אלומיניום.",
  "details": "שלום, אשמח לקבל פרטים לגבי עבודות אלומיניום לבית או לפרויקט שבביצוע. יש לי תוכנית / תמונות / מפרט לבדיקה.",
  "b2b": "שלום עמית, אשמח לשלוח מפרט / רשימת חיתוך / כתב כמויות לקבלת כיוון לשירותי מפעל."
}

export function whatsappHref(message = whatsappMessages.plans) {
  const rawNumber = siteInfo.whatsapp || siteInfo.phone || ''
  const number = rawNumber.replace(/[^0-9]/g, '').replace(/^0/, '972')
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export const navItems = [
  {
    "label": "ראשי",
    "route": "/"
  },
  {
    "label": "מוצרים",
    "route": "/מוצרים"
  },
  {
    "label": "פרויקטים",
    "route": "/פרויקטים"
  },
  {
    "label": "תהליך העבודה",
    "route": "/תהליך-העבודה"
  },
  {
    "label": "מרכז ידע",
    "route": "/מהשטח"
  },
  {
    "label": "צור קשר",
    "route": "/צור-קשר"
  }
]

export const footerNavItems = [
  {
    "label": "ראשי",
    "route": "/"
  },
  {
    "label": "מוצרים",
    "route": "/מוצרים"
  },
  {
    "label": "פרויקטים",
    "route": "/פרויקטים"
  },
  {
    "label": "תהליך העבודה",
    "route": "/תהליך-העבודה"
  },
  {
    "label": "מרכז ידע",
    "route": "/מהשטח"
  },
  {
    "label": "צור קשר",
    "route": "/צור-קשר"
  },
  {
    "label": "על החברה",
    "route": "/על-החברה"
  }
]

export function href(route) {
  let cleanRoute = String(route || routes.home)
  if (!cleanRoute.startsWith('/')) cleanRoute = `/${cleanRoute}`
  while (cleanRoute.length > 1 && cleanRoute.endsWith('/')) {
    cleanRoute = cleanRoute.slice(0, -1)
  }
  return cleanRoute === '/' ? '/' : `${cleanRoute}/`
}

export const defaultSeo = {
  "title": "עבודות אלומיניום לבית פרטי | חלונות וויטרינות | אשבל",
  "description": "עבודות אלומיניום לבתים פרטיים: חלונות, ויטרינות, דלתות, תריסים והצללה. בדיקת תוכניות, ייצור והתקנה."
}
