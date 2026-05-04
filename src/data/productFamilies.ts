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
    alt: 'חלון מחולק בסגנון עדין להמחשת מראה בלגי',
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
    title: 'המראה הבלגי',
    kicker: 'קווים עדינים ואופי עיצובי',
    intro: 'מראה בלגי מתאים לבתים שבהם החלון הוא חלק מהשפה האדריכלית: חלוקות מדויקות, פרופיל דק, גוון נכון ותחושה קלאסית או מודרנית לפי הבית.',
    image: visualImages.belgian,
    gallery: [visualImages.belgian, visualImages.belgianExterior, visualImages.handle, visualImages.steelHandle],
    subOptions: ['חלונות בלגיים', 'דלתות ופתיחה', 'מחיצות פנים', 'פרופילים דקים', 'גמרים וגוונים'],
    planning: ['חלוקות', 'פרופיל דק', 'ידיות', 'גוון שחור / ברונזה / פיין איירון', 'התאמה לבית כפרי או מודרני'],
    components: ['פרופילים דקים', 'ידיות ופרזול', 'זכוכית', 'גומיות ואטימה', 'גווני צבע'],
  },
  {
    slug: 'modern-style',
    title: 'המראה המודרני',
    kicker: 'פתחים רחבים וקווים נקיים',
    intro: 'המראה המודרני שם דגש על זכוכית, אור, מסגרות מדויקות וחיבור שקט בין האלומיניום, החזית והגמרים של הבית.',
    image: visualImages.modernHome,
    gallery: [visualImages.modernHome, visualImages.modernWindow, visualImages.slidingDoor, visualImages.handle],
    subOptions: ['פתחים רחבים', 'קווים נקיים', 'מסגרות דקות', 'זכוכית בידודית', 'פתרונות הצללה משולבים'],
    planning: ['יחס זכוכית למסגרת', 'ניקיון קווים', 'שילוב עם בטון / עץ / שליכט', 'פתחים גדולים', 'פרט גמר'],
    components: ['מסגרות דקות', 'זכוכית בידודית', 'מסילות', 'אטימה', 'פרטי גמר'],
  },
  {
    slug: 'sliding-systems',
    title: 'ויטרינות והזזה',
    kicker: 'חיבור בין הבית לחוץ',
    intro: 'ויטרינה טובה צריכה להרגיש טבעית ביומיום: פתיחה נוחה, מסילה נכונה, זכוכית מתאימה וחיבור נקי לגינה, למרפסת או לאזור האירוח.',
    image: visualImages.slidingDoor,
    gallery: [visualImages.slidingDoor, visualImages.slidingDetail, visualImages.modernHome, visualImages.modernWindow],
    subOptions: ['הזזה רגילה', 'הרם הזז', 'מסילה שקועה', 'כנפיים גדולות', 'פתיחה רחבה לגינה', 'רשתות ופתרונות סף'],
    planning: ['בחירת מסילה', 'משקל כנף', 'סף וריצוף', 'זכוכית בידודית', 'ניקוז ואיטום'],
    components: ['מסילות', 'גלגלים', 'ספים', 'זכוכית', 'רשתות', 'ניקוז'],
  },
  {
    slug: 'shading-systems',
    title: 'מערכות הצללה',
    kicker: 'נוחות, צל ומרחב חוץ מסודר',
    intro: 'הצללה ותריסים משפיעים על אור, פרטיות, חום ונוחות. בפרויקט מסודר מתאמים אותם יחד עם הפתחים והשלב שבו נמצא הבית.',
    image: visualImages.shutter,
    gallery: [visualImages.shutter, visualImages.shutterClassic, visualImages.slidingDoor, visualImages.modernHomeTall],
    subOptions: ['תריס חשמלי', 'תריס שלב אור', 'תריס משוך', 'ארגז סמוי', 'ארגז חיצוני', 'פרגולות'],
    planning: ['אור ואוורור', 'פרטיות', 'מנוע', 'ארגז לפי שלב בנייה', 'שילוב בתוכנית אלומיניום'],
    components: ['שלבים', 'מנועים', 'ארגזים', 'מסילות', 'פרגולות', 'הכנות חשמל'],
  },
  {
    slug: 'additional-solutions',
    title: 'פתרונות נוספים',
    kicker: 'שערים, גדרות, מסתורים ומעקות זכוכית',
    intro: 'פתרונות חוץ משלימים סוגרים את מעטפת הבית: שער, גדר, מעקה זכוכית, מסתור כביסה, רשתות ופרטים שצריכים להתחבר לשפה הכללית.',
    image: visualImages.gate,
    gallery: [visualImages.gate, visualImages.fence, visualImages.glassRailing, visualImages.steelHandle],
    subOptions: ['שערים', 'גדרות', 'מעקות זכוכית', 'מסתורי כביסה', 'רשתות', 'עבודות משלימות'],
    planning: ['התאמה לחזית הבית', 'בטיחות', 'פרטיות', 'גמרים', 'שילוב עם עבודות האלומיניום המרכזיות'],
    components: ['פרזול', 'זכוכית', 'מסגרות', 'צבע', 'רשתות', 'פרטי חיבור'],
  },
];

export type ProductFamily = (typeof productFamilies)[number];
