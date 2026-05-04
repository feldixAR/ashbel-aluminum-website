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
    kicker: 'חלונות בלגיים, דלתות בלגיות וחלוקות זכוכית',
    intro: 'חלונות ודלתות במראה כפרי ובלגי לבית. מתאים למי שמחפש חלוקות זכוכית, פרופילים עדינים, ידיות וגוונים עם אופי עיצובי ברור.',
    image: visualImages.belgian,
    gallery: [visualImages.belgian, visualImages.belgianExterior, visualImages.handle, visualImages.steelHandle],
    subOptions: ['חלונות בלגיים', 'דלתות בלגיות', 'מחיצות פנים', 'חלוקות זכוכית', 'גוונים ופרזול'],
    planning: ['חלוקה נכונה של הפתח', 'עובי פרופיל ביחס לגודל החלון', 'ידיות ופרזול שמתאימים לסגנון', 'גוון שחור, ברונזה או פיין איירון', 'התאמה לבית כפרי או מודרני'],
    components: ['פרופילים דקים', 'ידיות ופרזול', 'זכוכית', 'גומיות ואטימה', 'גווני צבע'],
  },
  {
    slug: 'modern-style',
    title: 'המראה המודרני',
    kicker: 'באוהאוס, קליל נוף, אופיס ומינימל',
    intro: 'פתרונות אלומיניום בקו מודרני ונקי לבית ולפרויקט. מתאים למפתחים רחבים, קווים ישרים, פרופילים דקים, זכוכית גדולה וגמרים מודרניים.',
    image: visualImages.modernHome,
    gallery: [visualImages.modernHome, visualImages.modernWindow, visualImages.slidingDoor, visualImages.handle],
    subOptions: ['באוהאוס', 'קליל נוף', 'דגמי אופיס', 'סדרת מינימל', 'פרופילים דקים וגמרים מודרניים'],
    planning: ['מפתח רחב או קו חזית נקי', 'יחס נכון בין זכוכית למסגרת', 'שילוב עם תריס או הצללה', 'התאמה לקו אדריכלי מודרני', 'פרטי גמר סביב הפתח'],
    components: ['פרופילים דקים', 'זכוכית בידודית', 'מסילות', 'פרזול', 'אטימה', 'פרטי גמר'],
  },
  {
    slug: 'sliding-systems',
    title: 'ויטרינות והזזה',
    kicker: 'דלתות הזזה, ויטרינות ומפתחים גדולים',
    intro: 'ויטרינות, דלתות הזזה ומפתחים גדולים לסלון, מרפסת, גינה וחללי אירוח. הבחירה נעשית לפי גודל הפתח, סוג המסילה, הזכוכית, הרשת והניקוז.',
    image: visualImages.slidingDoor,
    gallery: [visualImages.slidingDoor, visualImages.slidingDetail, visualImages.modernHome, visualImages.modernWindow],
    subOptions: ['ויטרינות לסלון', 'דלתות הזזה', 'הרם הזז', 'מפתחים גדולים', 'מסילות ורשתות'],
    planning: ['בחירת מסילה לפי שימוש', 'משקל כנף וגודל מפתח', 'מפגש עם ריצוף וסף', 'זכוכית בידודית לפי צורך', 'ניקוז ואיטום'],
    components: ['מסילות', 'גלגלים', 'ספים', 'זכוכית', 'רשתות', 'ניקוז'],
  },
  {
    slug: 'shading-systems',
    title: 'מערכות הצללה',
    kicker: 'תריסים, בתי תריס, מנועים ופרגולות',
    intro: 'תריסים, בתי תריס, ארגזים סמויים, מנועים ופרגולות אלומיניום. חשוב לתאם אותם לפי שלב הבנייה, הכנות החשמל, כיוון השמש ונראות החזית.',
    image: visualImages.shutter,
    gallery: [visualImages.shutter, visualImages.shutterClassic, visualImages.slidingDoor, visualImages.modernHomeTall],
    subOptions: ['תריסים חשמליים', 'תריס שלב אור', 'בתי תריס וארגזים', 'מנועים ובית חכם', 'פרגולות אלומיניום'],
    planning: ['כמות אור ואוורור', 'רמת פרטיות', 'מנוע והכנות חשמל', 'ארגז לפי שלב הבנייה', 'שילוב בתוכנית האלומיניום'],
    components: ['שלבים', 'מנועים', 'בתי תריס', 'ארגזים', 'מסילות', 'פרגולות', 'הכנות חשמל', 'בית חכם'],
  },
  {
    slug: 'additional-solutions',
    title: 'פתרונות נוספים',
    kicker: 'גדרות, שערים, מסתורים, חיפויים וזכוכית',
    intro: 'פתרונות משלימים לבית ולחזית: גדרות, שערים, מסתורי כביסה, חיפויי אלומיניום, מעקות זכוכית ומקלחונים.',
    image: visualImages.gate,
    gallery: [visualImages.gate, visualImages.fence, visualImages.glassRailing, visualImages.steelHandle],
    subOptions: ['גדרות ושערים', 'מסתורי כביסה', 'חיפויי אלומיניום', 'מעקות זכוכית', 'מקלחונים'],
    planning: ['התאמה לחזית הבית', 'בטיחות ושימוש יומיומי', 'פרטיות ואוורור', 'גמרים וגוון', 'חיבור לעבודות האלומיניום המרכזיות'],
    components: ['פרזול', 'זכוכית', 'מסגרות', 'צבע', 'רשתות', 'פרטי חיבור', 'מנועים'],
  },
];

export type ProductFamily = (typeof productFamilies)[number];
