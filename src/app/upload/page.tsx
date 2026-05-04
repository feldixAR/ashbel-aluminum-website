import type { Metadata } from 'next';
import { CtaBand, PageIntro, SectionHeader } from '@/components/PageSections';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'שליחת תוכניות ותמונות',
  description: 'שליחת תוכניות, תמונות, מידות, כתב כמויות או רשימת פתחים לבדיקת עבודות אלומיניום לבית פרטי, שיפוץ או פרויקט.',
};

const intakeColumns = [
  {
    title: 'מה לשלוח',
    items: ['תוכניות או חזיתות', 'תמונות מהשטח ומהפתחים', 'מידות קיימות אם יש', 'כתב כמויות או רשימת פתחים', 'תיאור קצר של שלב הפרויקט'],
  },
  {
    title: 'מה בודקים',
    items: ['חלונות, ויטרינות ופתחים גדולים', 'תריסים, הצללה ורשתות', 'מסילות, מפלסים וניקוז', 'זכוכית, צבע וחלוקות', 'נקודות תיאום מול ריצוף וחיפויים'],
  },
  {
    title: 'איך ממשיכים',
    items: ['חוזרים עם שאלות אם חסר מידע', 'מכוונים לפתרון אלומיניום מתאים', 'מתאמים מדידה או ביקור לפי הצורך', 'מתקדמים להצעה מסודרת אחרי הבנת הפרויקט'],
  },
];

export default function UploadPage() {
  return (
    <main>
      <div className='container-main'>
        <PageIntro
          eyebrow='שליחת תוכניות'
          title='שלחו תוכניות, תמונות או מידות ונבין מה מתאים לפתחים'
          text='זו הדרך המהירה להתחיל: מעבירים בוואטסאפ או בטלפון חומר מהבית, מהשיפוץ או מהאתר, ואנחנו בודקים מה צריך כדי להתקדם נכון.'
        >
          <div className='button-row'>
            <a className='btn btn-primary' href={site.whatsapp}>
              שליחת חומרים בוואטסאפ
            </a>
            <a className='btn btn-outline' href={site.phoneHref}>
              התקשרו להתייעצות
            </a>
          </div>
          <p>אפשר לשלוח גם חומר חלקי. אם חסרות מידות או תמונות, נבקש השלמה ונכוון מה לצלם או למדוד.</p>
        </PageIntro>

        <section className='section-shell'>
          <SectionHeader title='מה כדאי להעביר כדי להתחיל' text='לא צריך להכין תיק מושלם. מספיק חומר שמאפשר להבין את סוגי הפתחים, שלב העבודה והכיוון הרצוי.' />
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
            המטרה היא לחסוך ניחושים: להבין את סוגי הפתחים, לראות אם נדרש תריס או הצללה, לזהות נקודות תיאום ולתאם את השלב הבא בצורה מסודרת.
          </div>
        </section>

        <CtaBand title='החומר מוכן לשליחה?' text='שלחו תוכניות, תמונות, מידות או כתב כמויות. נחזור עם שאלות ממוקדות או עם תיאום המשך עבודה.' />
      </div>
    </main>
  );
}
