import type { Metadata } from 'next';
import { CtaBand, PageIntro, SectionHeader } from '@/components/PageSections';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'שליחת תוכניות ותמונות',
  description: 'שליחת תוכניות, מפרטים, כתב כמויות או תמונות מהשטח לצורך בדיקה ראשונית ותיאום עבודות אלומיניום.',
};

export default function UploadPage() {
  return (
    <main>
      <div className='container-main'>
        <PageIntro
          eyebrow='שליחת חומרים'
          title='שלחו חומר קיים לבדיקה ראשונית'
          text='אפשר לשלוח תוכניות, מפרטים, כתב כמויות או תמונות מהשטח לצורך בדיקה ראשונית ותיאום המשך עבודה.'
        >
          <div className='button-row'>
            <a className='btn btn-primary' href={site.whatsapp}>
              שליחה בוואטסאפ
            </a>
            <a className='btn btn-outline' href={site.phoneHref}>
              שיחה עם איש מקצוע
            </a>
          </div>
        </PageIntro>

        <section className='section-shell'>
          <SectionHeader title='מה לצרף בפנייה' text='אין כאן העלאת קבצים לאתר. בשלב זה שולחים את החומר דרך וואטסאפ, טלפון או מייל, וממשיכים משם בצורה מסודרת.' />
          <div className='grid-3'>
            {['תוכניות או חזיתות', 'תמונות מהשטח', 'כתב כמויות או מפרט', 'סוג הפרויקט והשלב שלו', 'עיר או אזור כללי', 'שאלות טכניות חשובות'].map((item) => (
              <article className='feature-card' key={item}>
                <h2>{item}</h2>
              </article>
            ))}
          </div>
        </section>

        <section className='section-shell'>
          <div className='notice'>
            לאחר קבלת החומר נבחן את הכיוון המקצועי הראשוני. הצעת מחיר מסודרת תינתן רק אחרי הבנת הפרויקט, השלמת מידע ומדידה או תיאום נדרש.
          </div>
        </section>

        <CtaBand title='החומר מוכן?' text='שלחו בוואטסאפ או התקשרו, ונבין יחד מה השלב הבא הנכון לפרויקט.' />
      </div>
    </main>
  );
}
