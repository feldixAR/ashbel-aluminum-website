import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBand, PageIntro, SectionHeader } from '@/components/PageSections';

export const metadata: Metadata = {
  title: 'אלומיניום לאדריכלים וקבלנים',
  description: 'עמוד פנייה מקצועי לאדריכלים, קבלנים, מפקחים ויזמים לשליחת תוכניות, מפרטים ותמונות שטח לבדיקת אלומיניום ראשונית.',
};

export default function ProfessionalsPage() {
  return (
    <main>
      <div className='container-main'>
        <PageIntro
          eyebrow='אזור מקצוענים'
          title='מענה מקצועי לאדריכלים, קבלנים, מפקחים ויזמים'
          text='שלחו תוכניות, מפרטים או תמונות מהשטח, ונבחן את הפרויקט לצורך הכוונה מקצועית ראשונית, בחירת מערכות אלומיניום מתאימות ותיאום המשך עבודה.'
        >
          <Link className='btn btn-primary' href='/upload'>
            בקשת ייעוץ טכני
          </Link>
        </PageIntro>

        <section className='section-shell'>
          <SectionHeader title='מה כדאי לשלוח' text='ככל שהחומר ברור יותר, כך ניתן להבין מהר יותר את הכיוון המקצועי ואת שאלות התיאום החשובות.' />
          <div className='grid-3'>
            {['תוכניות אדריכליות וחתכים', 'מפרטים או כתב כמויות', 'תמונות מהשטח ומהחזיתות', 'מידות פתחים קיימות אם יש', 'שלב הפרויקט ולוחות זמנים', 'שאלות טכניות פתוחות'].map((item) => (
              <article className='feature-card' key={item}>
                <h2>{item}</h2>
              </article>
            ))}
          </div>
        </section>

        <section className='section-shell body-copy'>
          <SectionHeader title='איך ממשיכים מכאן' text='זו דרך מסודרת לפתוח פנייה מקצועית, להעביר חומר רלוונטי ולקבל הכוונה ראשונית לפני המשך עבודה.' />
          <p>המשך העבודה נקבע אחרי בחינת החומר, השלמת מידע ותיאום מדידה או פגישה לפי הצורך.</p>
        </section>

        <CtaBand title='פתחו פנייה מקצועית' text='שלחו תוכניות, מפרטים או תמונות מהשטח, ונבחן את הכיוון המקצועי הראשוני להמשך.' />
      </div>
    </main>
  );
}
