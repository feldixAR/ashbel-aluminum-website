import Link from 'next/link';
import type { Metadata } from 'next';
import { PageIntro, SectionHeader } from '@/components/PageSections';
import { kalilSeries } from '@/data/kalilSeries';
import './products.css';

export const metadata: Metadata = {
  title: 'מוצרי אלומיניום וסדרות קליל',
  description: 'מוצרי אלומיניום לבית פרטי: מראה בלגי, מערכות הזזה, ויטרינות, הצללה ופתחים גדולים, עם הסבר מקצועי לבחירת מערכת לפי הפתח.',
};

export default function ProductsPage() {
  return (
    <main>
      <div className='container-main products-page'>
        <PageIntro
          eyebrow='מוצרים וסדרות'
          title='בחירת מערכת מתחילה מהפתח, לא מהשם של הסדרה'
          text='חלון, ויטרינה, פרופיל בלגי או תריס נבחרים לפי המפתח, השימוש, תנאי השטח, הגמרים והאדריכלות. רק אחרי שמבינים את הפתח אפשר להתאים מערכת אלומיניום בצורה אחראית.'
        >
          <p>האזכור של סדרות קליל הוא מידע כללי לבחינה מקצועית. אין כאן טענה להרשאה רשמית או מפרט טכני מחייב.</p>
          <Link className='text-link' href='/upload'>
            שליחת תוכניות, מידות או כתב כמויות
          </Link>
        </PageIntro>

        <section className='section-shell'>
          <SectionHeader
            eyebrow='גלריית קטגוריות'
            title='משפחות מוצרים עם תחושה של זכוכית, פרופיל ופתח'
            text='החלוקה כאן עוזרת להבין את אופי הבחירה: צורך, בדיקת פתח, התאמת מערכת ותיאום לפני מדידה.'
          />
          <div className='product-gallery' aria-label='גלריית קטגוריות מוצרי אלומיניום'>
            {kalilSeries.map((series, index) => (
              <article className={`product-panel product-panel-${index + 1}`} key={series.name}>
                <div className='panel-visual' aria-hidden='true'>
                  <span className='panel-rail rail-a' />
                  <span className='panel-rail rail-b' />
                  <span className='panel-glass glass-a' />
                  <span className='panel-glass glass-b' />
                </div>
                <div className='panel-content'>
                  <p>{series.category}</p>
                  <h2>{series.name}</h2>
                  <span>{series.need}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className='section-shell product-story'>
          <SectionHeader
            eyebrow='דרך הבחירה'
            title='מהצורך אל המערכת המתאימה'
            text='במקום לבחור מוצר מתוך רשימה, בוחנים את התפקיד של הפתח ואת נקודות הסיכון לפני שמתקדמים.'
          />
          <div className='story-flow'>
            {[
              ['צורך', 'אור, פרטיות, מעבר לגינה, מראה בלגי, בידוד או תיאום עם חזית.'],
              ['בדיקת פתח', 'מידות, מפלסים, כיוון פתיחה, ניקוז, תריסים, רשתות ומפגש עם גמרים.'],
              ['התאמת מערכת', 'בחירת סדרה, זכוכית, צבע, חלוקות ופרטי התקנה לפי הפרויקט.'],
            ].map(([title, text]) => (
              <article key={title}>
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className='section-shell product-checklist'>
          <SectionHeader title='מה לבדוק לפני שבוחרים מערכת' text='הבדיקות האלה חוסכות החלטות מאוחרות ומקטינות פערים בין תוכנית, ייצור והתקנה.' />
          <div className='checklist-grid'>
            {kalilSeries.map((series) => (
              <article key={series.name}>
                <h2>{series.name}</h2>
                <p>{series.check}</p>
              </article>
            ))}
          </div>
        </section>

        <section className='products-cta' aria-label='שליחת חומרים לבדיקת מוצרי אלומיניום'>
          <div>
            <p className='eyebrow'>בדיקה מקצועית ראשונית</p>
            <h2>שלחו תוכניות, מידות, תמונות או כתב כמויות</h2>
            <p>נבחן את סוגי הפתחים, נזהה נקודות תיאום ונכוון למערכות אלומיניום שמתאימות לבית ולשלב הפרויקט.</p>
          </div>
          <Link className='btn btn-primary' href='/upload'>
            שליחת חומרים לבדיקה
          </Link>
        </section>
      </div>
    </main>
  );
}
