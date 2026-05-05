const commons = (file: string, width = 1600) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
const pexels = (id: string, width = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

export const visualImages = {
  modernHome: {
    src: pexels('1643383', 1800),
    alt: 'בית מודרני עם פתחים רחבים וזכוכית גדולה להמחשת עבודות אלומיניום',
  },
  modernHomeTall: {
    src: pexels('259588', 1200),
    alt: 'חזית בית מודרני עם חלונות גדולים ותאורה טבעית',
  },
  slidingDoor: {
    src: pexels('1643383', 1600),
    alt: 'דלת הזזה מזכוכית במסגרת אלומיניום להמחשת ויטרינה רחבה',
  },
  slidingDetail: {
    src: pexels('1571460', 1200),
    alt: 'תקריב של מסילת דלת הזזה ופרופיל אלומיניום',
  },
  handle: {
    src: pexels('276724', 1200),
    alt: 'תקריב ידית חלון כחלק מתיאום פרזול וגמר',
  },
  steelHandle: {
    src: pexels('276724', 1200),
    alt: 'ידית מתכת ופרזול בגמר נקי',
  },
  belgian: {
    src: commons('Ein Kerem Palestinian vernacular - architectural detail - photo Ron Havilio.JPG', 1400),
    alt: 'חלון מחולק בסגנון עדין להמחשת מראה כפרי ובלגי',
  },
  belgianExterior: {
    src: commons('Ein Kerem Palestinian vernacular - architectural detail - photo Ron Havilio.JPG', 1400),
    alt: 'פרט אדריכלי של חלון מחולק בחזית אבן',
  },
  modernWindow: {
    src: pexels('1643383', 1600),
    alt: 'בית מודרני עם חלונות רחבים וקווים נקיים',
  },
  shutter: {
    src: commons('Plantation shutters our work3.jpg', 1400),
    alt: 'תריסי שלבים בהירים להמחשת הצללה ושליטה באור',
  },
  shutterClassic: {
    src: commons('Window shutter.jpg', 1200),
    alt: 'תריס חלון להמחשת פתרונות הצללה',
  },
  pergola: {
    src: commons('Aluminium pergola in garden.jpg', 1200),
    alt: 'פרגולת אלומיניום לחצר או מרפסת',
  },
  glassRailing: {
    src: pexels('2102587', 1200),
    alt: 'מעקה זכוכית נקי למרפסת או חזית',
  },
  gate: {
    src: commons('A stylish metal gate of a house.jpg', 1200),
    alt: 'שער מתכת לבית פרטי להמחשת פתרונות חוץ משלימים',
  },
  fence: {
    src: commons('Boundary gate and fence.jpg', 1200),
    alt: 'שער וגדר מתכת להמחשת מעטפת חוץ',
  },
  plan: {
    src: commons('(Blue Hill architectural plan) (3990639054).jpg', 1200),
    alt: 'תוכנית אדריכלית להמחשת העלאת תוכניות לפני פגישה מקצועית',
  },
  planDetail: {
    src: commons('1 design.jpg', 1200),
    alt: 'שרטוט ותוכנית עבודה להמחשת תיאום פתחים ומידות',
  },
};

export const productFamilies = [
  {
    slug: 'belgian-style',
    title: 'המראה הכפרי',
    kicker: 'חלונות, דלתות וויטרינות בלגיות',
    intro: 'חלונות ודלתות במראה בלגי, פרופילים עדינים, ידיות וגוונים שמתאימים לבית חם, כפרי או קלאסי.',
    image: visualImages.belgian,
    gallery: [visualImages.belgian, visualImages.belgianExterior, visualImages.handle, visualImages.steelHandle],
    subOptions: ['חלונות בלגיים', 'דלתות בלגיות', 'ויטרינות בלגיות', 'פרופילים בלגיים', 'גוונים ופרזול'],
    planning: ['חלוקה נכונה של הפתח', 'עובי פרופיל ביחס לגודל החלון', 'ידיות ופרזול שמתאימים לסגנון', 'גוון שחור, ברונזה או פיין איירון', 'התאמה לבית כפרי או קלאסי'],
    components: ['פרופילים בלגיים', 'ידיות ופרזול', 'זכוכית', 'גומיות ואטימה', 'גווני צבע'],
  },
  {
    slug: 'modern-style',
    title: 'המראה המודרני',
    kicker: 'באוהאוס, קליל נוף, אופיס ומינימל',
    intro: 'חלונות, ויטרינות ומפתחים רחבים בקווים נקיים, עם פרופילים דקים, זכוכית גדולה וגמר מודרני לבתים פרטיים, וילות ושיפוצים.',
    image: visualImages.modernHome,
    gallery: [visualImages.modernHome, visualImages.modernWindow, visualImages.slidingDoor, visualImages.handle],
    subOptions: ['באוהאוס', 'קליל נוף', 'דגמי אופיס', 'סדרת מינימל', 'פרופילים דקים'],
    planning: ['מפתח רחב או קו חזית נקי', 'יחס נכון בין זכוכית למסגרת', 'שילוב עם תריס או הצללה', 'התאמה לקו אדריכלי מודרני', 'פרטי גמר סביב הפתח'],
    components: ['פרופילים דקים', 'זכוכית בידודית', 'מסילות', 'פרזול', 'אטימה', 'פרטי גמר'],
  },
  {
    slug: 'shading-systems',
    title: 'מערכות הצללה',
    kicker: 'תריסים, ארגזים, מנועים ובית חכם',
    intro: 'תריסים ומערכות הצללה לשליטה באור, פרטיות ונוחות שימוש יומיומית, כולל מנועים חכמים לתריסים ולמערכות הצללה עם אפשרות לשליטה נוחה מהטלפון ובהתאמה להכנות החשמל והבית החכם.',
    image: visualImages.shutter,
    gallery: [visualImages.shutter, visualImages.shutterClassic, visualImages.slidingDoor, visualImages.modernHomeTall],
    subOptions: ['תריסים חשמליים', 'תריס שלב אור', 'בתי תריס וארגזים', 'מנועים', 'הכנות לבית חכם'],
    planning: ['כמות אור ואוורור', 'רמת פרטיות', 'מנוע והכנות חשמל', 'ארגז לפי שלב הבנייה', 'שילוב בתוכנית האלומיניום'],
    components: ['שלבים', 'מנועים', 'בתי תריס', 'ארגזים', 'מסילות', 'הכנות חשמל', 'בית חכם'],
  },
  {
    slug: 'aluminum-pergolas',
    title: 'פרגולות אלומיניום',
    kicker: 'פרגולות לחצר, למרפסת ולכניסה',
    intro: 'פרגולות אלומיניום לחצר, מרפסת, כניסה לבית ואזורי אירוח. פתרון עמיד ונקי שמוסיף הצללה, שימושיות ומראה מסודר לחוץ הבית.',
    image: visualImages.pergola,
    gallery: [visualImages.pergola, visualImages.modernHomeTall, visualImages.gate, visualImages.fence],
    subOptions: ['פרגולות לחצר', 'פרגולות למרפסת', 'פרגולות כניסה', 'קירוי והצללה', 'גוון וגמר'],
    planning: ['מיקום הפרגולה וכיוון השמש', 'חיבור לקיר או עמודים עצמאיים', 'ניקוז וקירוי', 'גוון וגמר', 'התאמה לחזית הבית'],
    components: ['קורות אלומיניום', 'עמודים', 'קירוי', 'פרטי חיבור', 'צבע וגמר'],
  },
  {
    slug: 'additional-solutions',
    title: 'פתרונות משלימים',
    kicker: 'גדרות, שערים, מסתורי כביסה וזכוכית',
    intro: 'גדרות, שערים, מסתורי כביסה, מעקות זכוכית ומקלחונים. פתרונות אלומיניום וזכוכית שמשלימים את מעטפת הבית ואת השימוש היומיומי.',
    image: visualImages.gate,
    gallery: [visualImages.gate, visualImages.fence, visualImages.glassRailing, visualImages.steelHandle],
    subOptions: ['גדרות ושערים', 'מסתורי כביסה', 'מעקות זכוכית', 'מקלחונים', 'חיפויי אלומיניום'],
    planning: ['התאמה לחזית הבית', 'בטיחות ושימוש יומיומי', 'פרטיות ואוורור', 'גמרים וגוון', 'חיבור לעבודות האלומיניום המרכזיות'],
    components: ['פרזול', 'זכוכית', 'מסגרות', 'צבע', 'רשתות', 'פרטי חיבור', 'מנועים'],
  },
];

export type ProductFamily = (typeof productFamilies)[number];
