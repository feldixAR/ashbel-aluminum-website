import type { Metadata } from 'next';
import { CtaBand, PageIntro, SectionHeader } from '@/components/PageSections';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'שליחת תוכניות ותמונות',
  description: 'שליחת תוכניות, מפרטים, כתב כמויות או תמונות מהשטח לצורך בדיקה ראשונית ותיאום עבודות אלומיניום.',
};

const intakeColumns = [
  {
    title: 'מה לשלוח',
    items: ['תוכניות פתחים או חזיתות', 'תמונות מהשטח ומכל פתח רלוונטי', 'מידות קיימות אם יש', 'מפרט, כתב כמויות או רשימת פתחים', 'שלב הפרויקט ולוחות זמנים כלליים'],
  },
  {
    title: 'מה אשבל בודקת',
    items: ['סוגי פתחים ושימושים', 'התאמת סדרות אלומיניום', 'מפלסים, מסילות, תריסים ורשתות', 'נקודות תיאום מול ריצוף וחיפויים', 'שאלות שצריך לסגור לפני מדידה'],
  },
  {
    title: 'מה קורה אחר כך',
    items: ['חוזרים עם שאלות הבהרה במידת הצורך', 'מגבשים כיוון מקצועי ראשוני', 'מתאמים מדידה או המשך בדיקה', 'רק לאחר הבנה ומדידה מתקדמים להצעה מסודרת'],
  },
];

export default function UploadPage() {
  return (
    <main>
      <div className='container-main'>
        <PageIntro
          eyebrow='שליחת חומרים'
          title='זהו השער המרכזי לבדיקה מקצועית של הפרויקט'
          text='שלחו תוכניות, מפרטים, כתב כמויות או תמונות מהשטח. המטרה היא להבין את הפתחים, לזהות נקודות תיאום ולכוון להמשך עבודה מסודר לפני הבטחות או הצעות מחיר.'
        >
          <div className='button-row'>
            <a className='btn btn-primary' href={site.whatsapp}>
              שליחת חומרים בוואטסאפ
            </a>
            <a className='btn btn-outline' href={site.phoneHref}>
              שיחה עם איש מקצוע
            </a>
          </div>
          <p>אפשר לשלוח גם מפרט חלקי. אם חסר מידע, נבקש השלמה לפני התקדמות.</p>
        </PageIntro>

        <section className='section-shell'>
          <SectionHeader title='פנייה מקצועית במקום טופס גנרי' text='אין כאן העלאת קבצים לאתר. בשלב זה שולחים את החומר דרך וואטסאפ, טלפון או מייל, וממשיכים משם בצורה מסודרת.' />
          <div className='grid-3'>
            {intakeColumns.map((column) => (
              <article className='feature-card' key={column.title}>
                <h2>{column.title}</h2>
                <ul className='body-copy'>
                  {column.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className='section-shell'>
          <div className='notice'>
            אין הבטחה להצעת מחיר מיידית. הצעה מסודרת אפשרית רק אחרי הבנת הפרויקט, בדיקת החומר, השלמת מידע ותיאום מדידה או בדיקת שטח לפי הצורך.
          </div>
        </section>

        <CtaBand title='החומר מוכן לשליחה?' text='שלחו תוכניות, תמונות, מפרט או כתב כמויות, ונבחן את הפרויקט לצורך הכוונה מקצועית ראשונית ותיאום המשך עבודה.' />
      </div>
    </main>
  );
}
