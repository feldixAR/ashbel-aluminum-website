import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBand, PageIntro, SectionHeader } from '@/components/PageSections';

export const metadata: Metadata = {
  title: 'איך מתקדמים עם עבודת אלומיניום',
  description: 'תהליך קצר וברור לשליחת תוכניות, תמונות, מידות או כתב כמויות לעבודות חלונות, ויטרינות ופתרונות אלומיניום.',
};

export default function ProcessPage() {
  return (
    <main>
      <div className='container-main'>
        <PageIntro
          eyebrow='איך מתקדמים'
          title='מתחילים משליחת תוכניות, תמונות או מידות'
          text='העמוד הזה מחבר את תהליך העבודה עם שליחת חומרים: שולחים מה שיש, בודקים את הפתחים, משלימים שאלות ומתקדמים למדידה או להצעה.'
        >
          <Link className='btn btn-primary' href='/upload'>
            שליחת חומרים עכשיו
          </Link>
        </PageIntro>

        <section className='section-shell'>
          <SectionHeader title='תהליך קצר וברור' text='מתאים לבית פרטי, שיפוץ, וילה, עבודה מול אדריכל או פרויקט קבלני.' />
          <ol className='process-list'>
            {[
              ['שולחים חומר', 'תוכניות, תמונות, מידות, כתב כמויות או רשימת פתחים.'],
              ['בודקים את הפתחים', 'סוגי חלונות, ויטרינות, תריסים, מסילות, זכוכית והצללה.'],
              ['משלימים שאלות', 'אם חסרים פרטים, מבקשים תמונות נוספות או מידות ממוקדות.'],
              ['מתאמים המשך', 'מדידה, ביקור שטח או הצעה מסודרת לפי מצב הפרויקט.'],
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
