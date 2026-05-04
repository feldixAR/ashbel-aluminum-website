import type { Metadata } from 'next';
import { CtaBand, PageIntro, SectionHeader } from '@/components/PageSections';
import { VisualMedia } from '@/components/VisualMedia';
import { visualImages } from '@/data/productFamilies';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'העלאת תוכניות ותיאום פגישה',
  description: 'העלאת תוכנית אלומיניום, תוכנית אדריכלית, מידות, כתב כמויות או שאלה מקצועית לתיאום פגישה סביב עבודות אלומיניום.',
};

const intakeColumns = [
  {
    title: 'מה אפשר להעלות',
    items: ['תוכנית אלומיניום', 'תוכנית אדריכלית, חזיתות או חתכים', 'מידות פתחים ראשוניות', 'כתב כמויות או רשימת פתחים', 'שאלה מקצועית או תיאור קצר של שלב הפרויקט'],
  },
  {
    title: 'על מה עוברים בפגישה',
    items: ['חלונות, ויטרינות ופתחים גדולים', 'תריסים, פרגולות והצללות', 'מסילות, מפלסים וניקוז', 'זכוכית, צבע וחלוקות', 'נקודות תיאום מול ריצוף, חיפויים ובעלי מקצוע'],
  },
  {
    title: 'איך ממשיכים',
    items: ['חוזרים לתיאום פגישה מקצועית', 'משלימים שאלות פתוחות אם צריך', 'מתאמים מדידה או ביקור לפי הצורך', 'מתקדמים להצעה מסודרת רק אחרי הבנת הפרויקט'],
  },
];

export default function UploadPage() {
  return (
    <main>
      <div className='container-main'>
        <PageIntro
          eyebrow='שליחת תוכניות'
          title='העלאת תוכניות ותיאום פגישה'
          text='יש לכם תוכנית אלומיניום מוכנה, תוכנית אדריכלית, מידות ראשוניות או צורך בעבודת אלומיניום? העלו את החומר הקיים, ונחזור אליכם לתיאום פגישה מקצועית. בפגישה נעבור על סוג העבודה, הפתחים, המידות, השלב שבו נמצא הפרויקט והמשך הטיפול הנכון.'
        >
          <div className='button-row'>
            <a className='btn btn-primary' href={site.whatsapp}>
              העלאת תוכניות ותיאום פגישה
            </a>
            <a className='btn btn-outline' href={site.phoneHref}>
              התקשרו לתיאום פגישה
            </a>
          </div>
          <p>המטרה היא לתאם פגישה ולהתקדם בצורה מסודרת. אין כאן הצעת מחיר אוטומטית.</p>
          <VisualMedia image={visualImages.plan} label='תוכנית אדריכלית להמחשת חומר לפגישה' />
        </PageIntro>

        <section className='section-shell split-intake'>
          <div>
          <SectionHeader title='מה כדאי להעביר לקראת פגישה' text='אפשר להתחיל גם מחומר חלקי. תמונות מתאימות בעיקר לצורך נקודתי או לשאלה ראשונית, אבל תוכנית ומידות הן הבסיס לתיאום מקצועי יותר.' />
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
          </div>
          <div className='stacked-visuals'>
            <VisualMedia image={visualImages.slidingDetail} label='פרט אלומיניום ומסילה להמחשה' />
          </div>
        </section>

        <section className='section-shell'>
          <div className='notice'>
            המטרה היא לתאם פגישה ולהתקדם בצורה מסודרת. אין כאן הצעת מחיר אוטומטית, אלא התחלה מקצועית שמובילה להבנה עמוקה יותר של העבודה.
          </div>
        </section>

        <CtaBand title='החומר מוכן להעלאה?' text='העלו תוכנית אלומיניום, תוכנית אדריכלית, מידות או שאלה מקצועית, ונחזור לתיאום פגישה והמשך טיפול מסודר.' />
      </div>
    </main>
  );
}
