import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBand, PageIntro, SectionHeader } from '@/components/PageSections';

export const metadata: Metadata = {
  title: 'אודות אשבל אלומיניום',
  description: 'אשבל אלומיניום מבצעת חלונות, ויטרינות ופתרונות אלומיניום לבתים פרטיים, וילות, שיפוצים ופרויקטים.',
};

export default function AboutPage() {
  return (
    <main>
      <div className='container-main'>
        <PageIntro
          eyebrow='אודות'
          title='חברת אלומיניום שמחברת בין תוכנית, שטח וגמר נקי'
          text='אשבל אלומיניום עוסקת בחלונות, ויטרינות, תריסים ופתרונות אלומיניום לבתים פרטיים, שיפוצים, וילות ופרויקטים, עם דגש על תיאום מדויק והתקנה נקייה.'
        >
          <Link className='btn btn-primary' href='/contact'>
            שיחה עם איש מקצוע
          </Link>
        </PageIntro>

        <section className='section-shell'>
          <SectionHeader title='מה חשוב לנו בעבודה' text='עבודת אלומיניום טובה מתחילה בהבנת הפתח, ממשיכה במדידה מסודרת ונגמרת בהתקנה שמתאימה לבית ולגמרים.' />
          <div className='grid-3'>
            {[
              ['דיוק במדידה', 'פתחים, מפלסים, מסילות, זכוכית, תריסים ורשתות מתואמים לפני ייצור.'],
              ['שפה שמתאימה לבית', 'המראה הבלגי, המראה המודרני, ויטרינות גדולות ופתרונות הצללה נבחרים לפי הבית.'],
              ['תיאום עם השטח', 'עבודה מול בעלי בתים, אדריכלים, קבלנים ומפקחים כדי לסגור פרטים בזמן.'],
            ].map(([title, text]) => (
              <article className='feature-card' key={title}>
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className='section-shell body-copy'>
          <SectionHeader title='למי האתר מתאים' />
          <p>לבעלי בתים פרטיים, בוני וילות, משפצים, אדריכלים, קבלנים, מפקחים ויזמים שמחפשים פתרונות אלומיניום לבית או לפרויקט.</p>
          <p>הדרך הנוחה להתחיל היא להעלות תוכנית אלומיניום, תוכנית אדריכלית, מידות או רשימת פתחים, ולתאם פגישה מקצועית להמשך טיפול מסודר.</p>
        </section>

        <CtaBand />
      </div>
    </main>
  );
}
