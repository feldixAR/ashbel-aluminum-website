import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBand, PageIntro, SectionHeader } from '@/components/PageSections';

export const metadata: Metadata = {
  title: 'אודות אשבל אלומיניום',
  description: 'אשבל אלומיניום מתמקדת בביצוע מדויק של מערכות אלומיניום לבתים פרטיים, וילות ופרויקטים איכותיים.',
};

export default function AboutPage() {
  return (
    <main>
      <div className='container-main'>
        <PageIntro
          eyebrow='אודות'
          title='חברת ביצוע שמבינה את הקשר בין תוכנית, שטח וגמר'
          text='אשבל אלומיניום מתמקדת בעבודות אלומיניום לבתים פרטיים, וילות ופרויקטים איכותיים, עם דגש על דיוק, תיאום מקצועי וליווי משלב התוכניות ועד הגמר.'
        >
          <Link className='btn btn-primary' href='/contact'>
            שיחה עם איש מקצוע
          </Link>
        </PageIntro>

        <section className='section-shell'>
          <SectionHeader title='מה חשוב לנו בעבודה' text='האתר מציג את דרך העבודה בלי להבטיח דברים שאי אפשר לבדוק לפני תוכנית, שטח ומדידה.' />
          <div className='grid-3'>
            {[
              ['דיוק לפני מהירות', 'בדיקה מקצועית של הפתחים והצרכים לפני התחייבות לפרטים שלא נבדקו.'],
              ['שפה אדריכלית נקייה', 'התאמה בין מערכת האלומיניום, גוון, חלוקות וגמרים.'],
              ['תיאום ביצוע', 'עבודה מסודרת מול בעלי בתים, אדריכלים, קבלנים, מפקחים ויזמים.'],
            ].map(([title, text]) => (
              <article className='feature-card' key={title}>
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className='section-shell body-copy'>
          <SectionHeader title='למי האתר מיועד' />
          <p>לבעלי בתים פרטיים, בוני וילות, משפצים, אדריכלים, קבלנים, מפקחים ויזמים שמחפשים קבלן אלומיניום מקצועי לפרויקט איכותי.</p>
          <p>הפנייה המרכזית היא שליחת תוכניות, תמונות או פרטים מקצועיים כדי לקבל הכוונה ראשונית ולתאם המשך עבודה.</p>
        </section>

        <CtaBand />
      </div>
    </main>
  );
}
