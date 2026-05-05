import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBand, PageIntro, SectionHeader } from '@/components/PageSections';

export const metadata: Metadata = {
  title: 'איך מתקדמים עם עבודת אלומיניום',
  description: 'תהליך קצר וברור להעלאת תוכנית אלומיניום, תוכנית אדריכלית, מידות או שאלה מקצועית ותיאום פגישה לעבודות חלונות, ויטרינות ופתרונות אלומיניום.',
};

export default function ProcessPage() {
  return (
    <main>
      <div className='container-main'>
        <PageIntro
          eyebrow='איך מתקדמים'
          title='מתחילים מהעלאת תוכניות ותיאום פגישה'
          text='העמוד הזה מחבר את תהליך העבודה עם פנייה מסודרת: מעלים תוכנית אלומיניום, תוכנית אדריכלית, מידות או שאלה מקצועית, מתאמים פגישה וממשיכים לפי מצב הפרויקט.'
        >
          <Link className='btn btn-primary' href='/upload'>
            העלאת תוכניות ותיאום פגישה
          </Link>
        </PageIntro>

        <section className='section-shell'>
          <SectionHeader title='תהליך קצר וברור' text='מתאים לבית פרטי, שיפוץ, וילה, עבודה מול אדריכל או פרויקט קבלני.' />
          <ol className='process-list'>
            {[
              ['מעלים חומר מקצועי', 'תוכנית אלומיניום, תוכנית אדריכלית, מידות, כתב כמויות או רשימת פתחים.'],
              ['מתאמים פגישה', 'עוברים על חלונות, ויטרינות, תריסים, מסילות, זכוכית, הצללה ופרטי חוץ.'],
              ['משלימים שאלות', 'אם חסרים פרטים, מסמנים מה צריך להשלים לפני מדידה או המשך טיפול.'],
              ['ממשיכים מסודר', 'מדידה, ביקור שטח או הצעה מסודרת לפי מצב הפרויקט ורק אחרי הבנה מקצועית.'],
            ].map(([title, text]) => (
              <li key={title}>
                <div>
                  <h2>{title}</h2>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <CtaBand />
      </div>
    </main>
  );
}
