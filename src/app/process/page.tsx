import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBand, PageIntro, SectionHeader } from '@/components/PageSections';
import { processSteps } from '@/data/process';

export const metadata: Metadata = {
  title: 'איך מתקדמים בפרויקט אלומיניום',
  description: 'תהליך עבודה מסודר: שיחה, תוכניות ותמונות, בדיקה טכנית, המלצה, מדידה, ייצור, התקנה וגמר.',
};

export default function ProcessPage() {
  return (
    <main>
      <div className='container-main'>
        <PageIntro
          eyebrow='איך מתקדמים'
          title='תהליך עבודה ברור מפחית טעויות לפני הייצור'
          text='באלומיניום לבית פרטי, החלטות מוקדמות משפיעות על פתחים, תריסים, זכוכית, מסילות, רשתות וגמרים. לכן מתקדמים בשלבים ולא מדלגים על בדיקה מקצועית.'
        >
          <Link className='btn btn-primary' href='/upload'>
            שליחת תוכניות או תמונות
          </Link>
        </PageIntro>

        <section className='section-shell'>
          <SectionHeader title='שלבי העבודה' text='השלבים עשויים להשתנות לפי סוג הפרויקט, אבל הסדר המקצועי נשאר: להבין, לבדוק, למדוד, לייצר ולהתקין.' />
          <ol className='process-list'>
            {processSteps.map((step) => (
              <li key={step.title}>
                <div>
                  <h2>{step.title}</h2>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <CtaBand title='רוצים להתחיל נכון?' text='שלחו חומר קיים או תארו את הפרויקט, ונכוון אתכם לשלב הבא בלי הבטחה להצעת מחיר מיידית.' />
      </div>
    </main>
  );
}
