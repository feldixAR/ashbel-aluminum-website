import type { Metadata } from 'next';
import { CtaBand, PageIntro, SectionHeader } from '@/components/PageSections';
import { kalilSeries } from '@/data/kalilSeries';
import './products.css';

export const metadata: Metadata = {
  title: 'מוצרי אלומיניום וסדרות קליל',
  description: 'מוצרי אלומיניום לבית פרטי: מראה בלגי, מערכות הזזה, ויטרינות, הצללה ופתחים גדולים, עם הסבר מקצועי לבחירת מערכת לפי הפתח.',
};

const productStory = [
  {
    title: 'מתחילים בצורך',
    text: 'הלקוח לא באמת מחפש שם של סדרה. הוא רוצה להבין מה מתאים לבית שלו, מה נראה נכון, מה יחזיק לאורך זמן ומה לא ייצור בעיות בשטח.',
  },
  {
    title: 'בודקים את הפתח',
    text: 'לפני המלצה בודקים מידות, שימוש יומיומי, כיוון פתיחה, תריסים, רשתות, זכוכית, גמר ותנאי שטח.',
  },
  {
    title: 'מחברים למערכת אחת',
    text: 'חלון, ויטרינה, תריס או מראה בלגי הם לא פריט בודד, אלא חלק ממערכת אחת של בית, תכנון וביצוע.',
  },
];

export default function ProductsPage() {
  return (
    <main>
      <div className='container-main'>
        <PageIntro
          eyebrow='מוצרים וסדרות'
          title='לא בוחרים סדרה לפני שמבינים את הפתח'
          text='סדרת האלומיניום צריכה להתאים למידות, לשימוש, לאטימה, לסגנון ולתנאי השטח. לכן מתחילים מבדיקת התוכנית או התמונות, ורק אחר כך ממליצים על כיוון מתאים.'
        >
          <p>האזכור של סדרות קליל הוא מידע כללי לבחינה מקצועית. אין כאן טענה להרשאה רשמית או מפרט טכני מחייב.</p>
        </PageIntro>

        <section className='products-showcase section-shell'>
          <SectionHeader title='עולמות מוצר מרכזיים' text='כניסה ויזואלית לעולמות המרכזיים בבית פרטי: מראה בלגי, פתחים רחבים, הצללה, ויטרינות וחיבור פנים וחוץ.' />
          <div className='products-gallery' aria-label='גלריית מוצרי אלומיניום'>
            {kalilSeries.map((series, index) => (
              <article className={`product-panel product-panel-${index + 1}`} key={series.name}>
                <div className='product-panel-visual' aria-hidden='true'>
                  <span className='product-photo-base' />
                  <span className='product-line product-line-a' />
                  <span className='product-line product-line-b' />
                  <span className='product-line product-line-c' />
                  <span className='product-glass product-glass-a' />
                  <span className='product-glass product-glass-b' />
                </div>
                <div className='product-panel-overlay'>
                  <p className='product-index'>0{index + 1}</p>
                  <h2>{series.name}</h2>
                  <p>{series.exp}</p>
                  <strong>{series.use}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className='products-story section-shell'>
          <SectionHeader title='הסיפור של המוצרים' text='אשבל לא מוכרת רק רשימת פריטים. המוצר הנכון נבחר מתוך הבנה של הבית, הפתח, השימוש והשלבים הבאים בשטח.' />
          <div className='products-story-grid'>
            {productStory.map((item, index) => (
              <article className='intro-panel' key={item.title}>
                <p className='product-index'>0{index + 1}</p>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className='section-shell products-checklist-section'>
          <SectionHeader title='מה בודקים לפני בחירת מערכת' text='הבחירה הנכונה לא מתחילה בשם הסדרה, אלא בשאלות המעשיות שימנעו טעויות במדידה, ייצור והתקנה.' />
          <div className='grid-2'>
            {kalilSeries.map((series) => (
              <article className='feature-card' key={`${series.name}-check`}>
                <h2>{series.name}</h2>
                <p>
                  <strong>מה לבדוק: </strong>
                  {series.check}
                </p>
              </article>
            ))}
          </div>
        </section>

        <CtaBand title='רוצים לדעת איזו מערכת מתאימה?' text='שלחו תוכניות, מידות, תמונות או כתב כמויות, ונבחן את הכיוון המקצועי להמשך.' />
      </div>
    </main>
  );
}
