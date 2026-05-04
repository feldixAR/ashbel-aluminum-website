import Link from 'next/link';
import type { Metadata } from 'next';
import { PageIntro, SectionHeader } from '@/components/PageSections';
import { kalilSeries } from '@/data/kalilSeries';
import './products.css';

export const metadata: Metadata = {
  title: 'מוצרים ופתרונות אלומיניום',
  description: 'קטלוג פתרונות אלומיניום לבית פרטי: המראה הבלגי, המראה המודרני, ויטרינות והזזה, מערכות הצללה ופתרונות משלימים.',
};

export default function ProductsPage() {
  return (
    <main>
      <div className='container-main products-page'>
        <PageIntro
          eyebrow='מוצרים ופתרונות'
          title='חלונות, ויטרינות ופתרונות אלומיניום לפי סוג הפתח'
          text='בחירת אלומיניום לבית מתחילה מהפתחים עצמם: גודל, כיוון פתיחה, יציאה לגינה, תריס, הצללה, פרטיות, סגנון הבית ותיאום עם הגמרים.'
        >
          <p>אפשר לשלוח תוכניות, תמונות או מידות ונבדוק איזה כיוון מתאים לפני מדידה והצעה מסודרת.</p>
          <Link className='text-link' href='/upload'>
            שליחת מידות או תמונות לבדיקה
          </Link>
        </PageIntro>

        <section className='section-shell product-catalog-section'>
          <SectionHeader
            eyebrow='קטלוג לפי קטגוריות'
            title='מבט מהיר על משפחות המוצרים'
            text='הקטגוריות מסודרות לפי שפה עיצובית ושימוש: מראה בלגי, מראה מודרני, ויטרינות גדולות, הצללה ופתרונות משלימים.'
          />
          <div className='product-gallery' aria-label='קטגוריות מוצרי אלומיניום'>
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
                  <Link className='panel-link' href='/upload'>
                    שליחת תוכניות לבדיקה
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className='section-shell product-story'>
          <SectionHeader
            eyebrow='איך בוחרים נכון'
            title='בודקים את השימוש, הפתח והפרטים הקטנים'
            text='מערכת טובה היא שילוב של מראה, תפעול, זכוכית, מסילות, תריסים, רשתות ותיאום התקנה. לכן בודקים את הפתח לפני שמתקבעים על פתרון.'
          />
          <div className='story-flow'>
            {[
              ['שימוש', 'חלון לחדר, ויטרינה לסלון, יציאה לגינה, פרטיות בחדר שינה או פתיחה רחבה לאזור אירוח.'],
              ['שטח ומידות', 'רוחב וגובה הפתח, מפלסים, כיוון פתיחה, מסילות, ניקוז, תריסים ורשתות.'],
              ['גמר והתקנה', 'צבע, זכוכית, חלוקות, מפגש עם ריצוף וחיפויים, ותיאום עבודה נקייה בבית.'],
            ].map(([title, text]) => (
              <article key={title}>
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className='section-shell product-checklist'>
          <SectionHeader title='מה כדאי להכין לפני פנייה' text='לא חייבים לשלוח הכול. גם תמונות ומידות בסיסיות יכולות לעזור להבין כיוון ולהחליט מה צריך להשלים.' />
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
            <p className='eyebrow'>מתחילים מהחומר שיש לכם</p>
            <h2>שלחו תוכניות, מידות, תמונות או כתב כמויות</h2>
            <p>נבדוק את סוגי הפתחים והפתרונות המתאימים: חלונות, ויטרינות, תריסים, הצללה, רשתות ופרטים משלימים.</p>
          </div>
          <Link className='btn btn-primary' href='/upload'>
            שליחת תוכניות או תמונות
          </Link>
        </section>
      </div>
    </main>
  );
}
