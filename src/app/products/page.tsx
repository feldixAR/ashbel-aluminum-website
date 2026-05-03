import type { Metadata } from 'next';
import { CtaBand, PageIntro, SectionHeader } from '@/components/PageSections';
import { kalilSeries } from '@/data/kalilSeries';

export const metadata: Metadata = {
  title: 'מוצרי אלומיניום וסדרות קליל',
  description: 'הסבר שיווקי ומקצועי על חלונות אלומיניום, ויטרינות, פרופיל בלגי, מערכות הזזה וסדרות קליל רלוונטיות לבתים פרטיים.',
};

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

        <section className='section-shell'>
          <SectionHeader title='משפחות מוצרים רלוונטיות' text='הפירוט כאן נועד לעזור ללקוח או לאיש המקצוע להבין מה צריך לבדוק לפני הזמנה ומדידה.' />
          <div className='grid-2'>
            {kalilSeries.map((series) => (
              <article className='feature-card' key={series.name}>
                <h2>{series.name}</h2>
                <p>{series.exp}</p>
                <p>
                  <strong>שימוש מתאים: </strong>
                  {series.use}
                </p>
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
