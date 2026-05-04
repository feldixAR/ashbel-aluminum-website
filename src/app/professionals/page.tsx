import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBand, PageIntro, SectionHeader } from '@/components/PageSections';
import { VisualMedia } from '@/components/VisualMedia';
import { visualImages } from '@/data/productFamilies';

export const metadata: Metadata = {
  title: 'לאדריכלים וקבלנים',
  description: 'עבודה מול אדריכלים, מעצבים וקבלנים סביב תוכניות, חזיתות, חתכים, רשימות פתחים ופרטי אלומיניום.',
};

const professionalNeeds = [
  ['תוכניות ופתחים', 'תוכנית אדריכלית, תוכנית אלומיניום, חזיתות, חתכים ורשימת פתחים.'],
  ['מידות ומפרט', 'מידות פתחים, כתב כמויות, סוג זכוכית, צבע, תריסים ורשתות.'],
  ['שלב העבודה', 'בית לפני ביצוע, שיפוץ קיים, שלב מדידה, שלב ייצור או הכנה להצעת מחיר.'],
  ['פרטי גמר', 'מסילות, בתי תריס, ארגזים, ריצוף, חיפויים, ניקוז והכנות חשמל.'],
  ['תיאום מול קבלן', 'שאלות פתוחות לפני מדידה, ייצור, התקנה וסגירת פרטים באתר.'],
  ['המשך עבודה', 'שיחת בירור, פגישת ייעוץ, השלמת חומר, מדידה או הצעת מחיר מסודרת.'],
];

export default function ProfessionalsPage() {
  return (
    <main>
      <div className='container-main'>
        <PageIntro
          eyebrow='לאדריכלים וקבלנים'
          title='עבודה מול תוכניות, פתחים ופרטי גמר'
          text='ניתן לשלוח תוכניות, חזיתות, חתכים, רשימות פתחים, מפרטים או שאלות מקצועיות לתיאום עבודות אלומיניום לבית ולפרויקט.'
        >
          <Link className='btn btn-primary' href='/upload'>
            שליחת תוכניות
          </Link>
          <p>מיועד לאדריכלים, מעצבים, קבלנים, מפקחים ובעלי בתים עם חומר תכנוני.</p>
          <VisualMedia image={visualImages.planDetail} />
        </PageIntro>

        <section className='section-shell split-intake'>
          <div>
          <SectionHeader title='מה כדאי להעביר' text='ככל שהחומר ברור יותר, קל יותר לבדוק את הפתחים, סוגי המערכות, הגמרים והשלב הבא בעבודה.' />
          <div className='grid-3'>
            {professionalNeeds.map(([title, text]) => (
              <article className='feature-card' key={title}>
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </div>
          </div>
          <div className='stacked-visuals'>
            <VisualMedia image={visualImages.handle} />
          </div>
        </section>

        <section className='section-shell body-copy'>
          <SectionHeader title='איך העבודה מתקדמת' text='שולחים חומר, בודקים מה חסר, מתאמים פגישת ייעוץ ומתקדמים למדידה או הצעת מחיר לפי הצורך.' />
          <p>הדגש הוא על התאמה בין התוכנית לבין הביצוע בפועל: פתחים, מסילות, תריסים, זכוכית, צבע, פרזול ופרטי גמר.</p>
        </section>

        <CtaBand title='שליחת תוכניות לאשבל אלומיניום' text='שלחו תוכנית, מפרט, רשימת פתחים או מידות. נבדוק את החומר ונחזור לתיאום המשך עבודה.' />
      </div>
    </main>
  );
}
