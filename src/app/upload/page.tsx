import type { Metadata } from 'next';
import { CtaBand, PageIntro, SectionHeader } from '@/components/PageSections';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'שליחת תוכניות ותמונות',
  description: 'שליחת תוכניות, מפרטים, כתב כמויות או תמונות מהשטח לצורך בדיקה ראשונית ותיאום עבודות אלומיניום.',
};

const materials = [
  { title: 'תוכניות פתחים או חזיתות', text: 'קובץ תוכניות, חזיתות או צילום מסך ברור שמראה את מיקום הפתחים והמידות.' },
  { title: 'תמונות מהשטח', text: 'צילום פנים וחוץ של הפתח, כולל רצפה, קירות, מסילות קיימות או אזורי גמר רגישים.' },
  { title: 'כתב כמויות או מפרט', text: 'אם יש מפרט אדריכלי או רשימת פתחים, הוא עוזר להבין סדרות, זכוכית, תריסים ורשתות.' },
  { title: 'שלב הפרויקט', text: 'תכנון, לפני מדידה, לפני ייצור, שיפוץ פעיל או החלפה של מערכת קיימת.' },
  { title: 'אזור כללי', text: 'יישוב או אזור שירות כללי לצורך הבנת זמינות, מדידה ותיאום המשך.' },
  { title: 'שאלה מקצועית פתוחה', text: 'התלבטות לגבי סדרה, תריס, רשת, מראה בלגי, פתחים גדולים או התאמה לתוכנית.' },
];

const reviewSteps = [
  'בודקים מה חסר כדי להבין את הפתח בצורה אחראית.',
  'מזהים כיוון מערכת אפשרי לפי שימוש, מידה, גמר ותנאי שטח.',
  'מגדירים מה השלב הבא: השלמת מידע, שיחה, בדיקה מקצועית או מדידה.'
];

export default function UploadPage() {
  return (
    <main>
      <div className='container-main'>
        <PageIntro
          eyebrow='שליחת חומרים'
          title='בדיקה מקצועית מתחילה מתוכנית, תמונה או רשימת פתחים'
          text='זה נתיב ההמרה המרכזי באתר: שולחים חומר קיים, אנחנו מבינים מה מצב הפרויקט, מה חסר לבדיקה ומה נכון לעשות לפני הצעת מחיר או מדידה.'
        >
          <div className='button-row'>
            <a className='btn btn-primary' href={site.whatsapp}>
              שליחת חומרים בוואטסאפ
            </a>
            <a className='btn btn-outline' href={site.phoneHref}>
              שיחה עם איש מקצוע
            </a>
          </div>
        </PageIntro>

        <section className='section-shell'>
          <SectionHeader title='מה לצרף בפנייה' text='אין כאן העלאת קבצים לאתר. בשלב זה שולחים את החומר דרך וואטסאפ, טלפון או מייל, וממשיכים משם בצורה מסודרת.' />
          <div className='grid-3'>
            {materials.map((item) => (
              <article className='feature-card' key={item.title}>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className='section-shell'>
          <SectionHeader title='מה אנחנו בודקים אחרי השליחה' text='המטרה היא לא לזרוק מחיר לפני שהפרטים ברורים, אלא לצמצם טעויות לפני מדידה, ייצור והתקנה.' />
          <ol className='process-list'>
            {reviewSteps.map((step) => (
              <li key={step}>
                <p>{step}</p>
              </li>
            ))}
          </ol>
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
