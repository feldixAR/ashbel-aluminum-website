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
    kicker: 'קווים דקים, חלוקות מדויקות ואופי לבית',
    intro: 'המראה הבלגי מתאים כשהחלון הוא חלק מהעיצוב. החלוקות, הגוון, הידיות ועובי הפרופיל צריכים לעבוד יחד, בלי להעמיס על הבית ובלי לאבד את האופי.',
    image: visualImages.belgian,
    gallery: [visualImages.belgian, visualImages.belgianExterior, visualImages.handle, visualImages.steelHandle],
    subOptions: ['חלונות בלגיים', 'דלתות ופתיחה', 'מחיצות פנים', 'פרופילים דקים', 'גמרים וגוונים'],
    planning: ['חלוקה נכונה של הפתח', 'פרופיל דק ביחס לגודל', 'ידיות ופרזול שמתאימים לסגנון', 'גוון שחור, ברונזה או פיין איירון', 'התאמה לבית כפרי או מודרני'],
    components: ['פרופילים דקים', 'ידיות ופרזול', 'זכוכית', 'גומיות ואטימה', 'גווני צבע'],
  },
  {
    slug: 'modern-style',
    title: 'המראה המודרני',
    kicker: 'פתחים רחבים וקווים נקיים',
    intro: 'בבית מודרני האלומיניום צריך להישאר מדויק ושקט. יותר זכוכית, פחות עומס, מסגרות נקיות וחיבור נכון בין הפתח, החזית והגמרים.',
    image: visualImages.modernHome,
    gallery: [visualImages.modernHome, visualImages.modernWindow, visualImages.slidingDoor, visualImages.handle],
    subOptions: ['פתחים רחבים', 'קווים נקיים', 'מסגרות דקות', 'זכוכית בידודית', 'פתרונות הצללה משולבים'],
    planning: ['יחס נכון בין זכוכית למסגרת', 'שמירה על קו חזית נקי', 'שילוב עם בטון, עץ או שליכט', 'התאמה למפתחים גדולים', 'פרטי גמר סביב הפתח'],
    components: ['מסגרות דקות', 'זכוכית בידודית', 'מסילות', 'אטימה', 'פרטי גמר'],
  },
  {
    slug: 'sliding-systems',
    title: 'ויטרינות והזזה',
    kicker: 'יציאה נוחה, פתיחה רחבה וחיבור לחוץ',
    intro: 'ויטרינה טובה לא נמדדת רק בגודל. היא צריכה להיפתח בקלות, להתחבר לריצוף, לאטום נכון ולשמור על קשר טבעי בין הסלון, המרפסת או הגינה.',
    image: visualImages.slidingDoor,
    gallery: [visualImages.slidingDoor, visualImages.slidingDetail, visualImages.modernHome, visualImages.modernWindow],
    subOptions: ['הזזה רגילה', 'הרם הזז', 'מסילה שקועה', 'כנפיים גדולות', 'פתיחה רחבה לגינה', 'רשתות ופתרונות סף'],
    planning: ['בחירת מסילה לפי שימוש', 'משקל כנף וגודל מפתח', 'מפגש עם ריצוף וסף', 'זכוכית בידודית לפי צורך', 'ניקוז ואיטום'],
    components: ['מסילות', 'גלגלים', 'ספים', 'זכוכית', 'רשתות', 'ניקוז'],
  },
  {
    slug: 'shading-systems',
    title: 'מערכות הצללה',
    kicker: 'שליטה באור, פרטיות ונוחות יומיומית',
    intro: 'תריסים והצללות משפיעים על החיים בבית בכל יום. צריך לתכנן אותם בזמן, יחד עם הפתחים, החשמל, הארגזים והחזית.',
    image: visualImages.shutter,
    gallery: [visualImages.shutter, visualImages.shutterClassic, visualImages.slidingDoor, visualImages.modernHomeTall],
    subOptions: ['תריס חשמלי', 'תריס שלב אור', 'תריס משוך', 'ארגז סמוי', 'ארגז חיצוני', 'פרגולות'],
    planning: ['כמות אור ואוורור', 'רמת פרטיות', 'מנוע והכנות חשמל', 'ארגז לפי שלב הבנייה', 'שילוב בתוכנית האלומיניום'],
    components: ['שלבים', 'מנועים', 'ארגזים', 'מסילות', 'פרגולות', 'הכנות חשמל'],
  },
  {
    slug: 'additional-solutions',
    title: 'פתרונות נוספים',
    kicker: 'שערים, גדרות, מסתורים ומעקות זכוכית',
    intro: 'פתרונות החוץ סוגרים את המעטפת של הבית. שער, גדר, מעקה, מסתור או רשת צריכים להתאים לשפה הכללית, לגמרים ולשימוש היומיומי.',
    image: visualImages.gate,
    gallery: [visualImages.gate, visualImages.fence, visualImages.glassRailing, visualImages.steelHandle],
    subOptions: ['שערים', 'גדרות', 'מעקות זכוכית', 'מסתורי כביסה', 'רשתות', 'עבודות משלימות'],
    planning: ['התאמה לחזית הבית', 'בטיחות ושימוש יומיומי', 'פרטיות ואוורור', 'גמרים וגוון', 'חיבור לעבודות האלומיניום המרכזיות'],
    components: ['פרזול', 'זכוכית', 'מסגרות', 'צבע', 'רשתות', 'פרטי חיבור'],
  },
];

export type ProductFamily = (typeof productFamilies)[number];
