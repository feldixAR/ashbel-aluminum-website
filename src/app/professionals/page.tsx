import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBand, PageIntro, SectionHeader } from '@/components/PageSections';

export const metadata: Metadata = {
  title: 'אלומיניום לאדריכלים וקבלנים',
  description: 'עמוד פנייה לאדריכלים, מעצבים, קבלנים, מפקחים ויזמים לתיאום חלונות, ויטרינות, פתחים, תריסים והתקנות אלומיניום.',
};

const professionalNeeds = [
  ['תוכניות ופתחים', 'תוכניות אדריכליות, חזיתות, חתכים, רשימת פתחים וסימוני גובה.'],
  ['מפרטים וכמויות', 'כתב כמויות, דרישות זכוכית, צבע, תריסים, רשתות והצללה.'],
  ['תיאום שטח', 'מידות קיימות, תמונות אתר, שלב ביצוע, גישה להתקנה ולוחות זמנים.'],
  ['פרטי גמר', 'מפגש עם ריצוף, חיפויים, מסילות, ארגזי תריס, ניקוז והכנות חשמל.'],
  ['עבודה מול קבלן', 'סגירת שאלות פתוחות לפני מדידה, ייצור והתקנה נקייה באתר.'],
  ['המשך תקשורת', 'שיחה ממוקדת, וואטסאפ או תיאום פגישה לפי מורכבות הפרויקט.'],
];

export default function ProfessionalsPage() {
  return (
    <main>
      <div className='container-main'>
        <PageIntro
          eyebrow='לאדריכלים וקבלנים'
          title='תיאום אלומיניום ברור מול תוכניות, פתחים ושטח'
          text='אדריכלים, מעצבים, קבלנים, מפקחים ויזמים יכולים לשלוח תוכניות, מפרטים, כתב כמויות או תמונות אתר כדי לבדוק כיוון ביצוע, מדידה והמשך תיאום.'
        >
          <Link className='btn btn-primary' href='/upload'>
            שליחת תוכניות לבדיקה
          </Link>
        </PageIntro>

        <section className='section-shell'>
          <SectionHeader title='מה עוזר לנו לכוון מהר יותר' text='ככל שהחומר ברור יותר, קל יותר לזהות שאלות פתוחות לפני מדידה והתקנה.' />
          <div className='grid-3'>
            {professionalNeeds.map(([title, text]) => (
              <article className='feature-card' key={title}>
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className='section-shell body-copy'>
          <SectionHeader title='איך העבודה מתקדמת' text='אוספים חומר, בודקים פתחים, מסמנים שאלות תיאום ומחליטים אם השלב הבא הוא השלמת מידע, מדידה, ביקור שטח או הצעה מסודרת.' />
          <p>הדגש הוא על תיאום ביצוע: חלונות, ויטרינות, תריסים, מסילות, זכוכית, צבע, גמרים והתקנה שמתאימה לשטח.</p>
        </section>

        <CtaBand title='שלחו חומר מקצועי או תמונות מהאתר' text='תוכניות, מפרטים, רשימת פתחים, תמונות, מידות או כתב כמויות יעזרו להבין את הפרויקט ולהתקדם מסודר.' />
      </div>
    </main>
  );
}
