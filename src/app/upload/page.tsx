import type { Metadata } from 'next';
import { CtaBand, PageIntro, SectionHeader } from '@/components/PageSections';
import { VisualMedia } from '@/components/VisualMedia';
import { visualImages } from '@/data/productFamilies';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'שליחת תוכניות ומידות',
  description: 'שליחת תוכנית אלומיניום, תוכנית אדריכלית, מידות, כתב כמויות או תמונות מהשטח לתיאום פגישת ייעוץ.',
};

const intakeColumns = [
  {
    title: 'מה אפשר לשלוח',
    items: ['תוכנית אלומיניום', 'תוכנית אדריכלית', 'מידות פתחים', 'כתב כמויות או רשימת פתחים', 'תמונות מהשטח'],
  },
  {
    title: 'מה כדאי לציין',
    items: ['סוג העבודה', 'בית חדש או שיפוץ', 'שלב הבנייה', 'מיקום הפתחים', 'שאלה או בקשה מיוחדת'],
  },
  {
    title: 'איך ממשיכים',
    items: ['בודקים את החומר', 'חוזרים לשיחה קצרה', 'מתאמים פגישת ייעוץ', 'משלימים מידע אם צריך', 'מתקדמים למדידה או הצעה'],
  },
];

export default function UploadPage() {
  return (
    <main>
      <div className='container-main'>
        <PageIntro
          eyebrow='שליחת תוכניות'
          title='שליחת תוכניות ומידות'
          text='יש לכם תוכנית אלומיניום, תוכנית אדריכלית, מידות פתחים או תמונות מהשטח? שלחו את החומר הקיים ונחזור אליכם לתיאום פגישת ייעוץ.'
        >
          <div className='button-row'>
            <a className='btn btn-primary' href={site.whatsapp}>
              שליחה בוואטסאפ
            </a>
            <a className='btn btn-outline' href={site.phoneHref}>
              התקשרו לתיאום
            </a>
          </div>
          <p>
            טלפון: <a className='text-link' href={site.phoneHref}>{site.phone}</a>
          </p>
          <VisualMedia image={visualImages.plan} />
        </PageIntro>

        <section className='section-shell split-intake'>
          <div>
          <SectionHeader title='מה כדאי לשלוח' text='אפשר להתחיל גם מחומר חלקי. תוכנית ומידות עוזרות לדייק, אבל גם תמונות ותיאור קצר מספיקים לשיחה ראשונה.' />
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
            <VisualMedia image={visualImages.slidingDetail} />
          </div>
        </section>

        <section className='section-shell'>
          <div className='notice'>
            לאחר קבלת החומר נבין את סוג העבודה, שלב הפרויקט והפרטים החסרים, ואז נחזור לתיאום המשך עבודה.
          </div>
        </section>

        <CtaBand title='שליחת תוכניות ותיאום פגישת ייעוץ' text='שלחו תוכנית, מידות או תמונות מהשטח. נבדוק את החומר ונחזור לתיאום המשך עבודה.' />
      </div>
    </main>
  );
}
