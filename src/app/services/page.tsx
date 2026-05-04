import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBand, PageIntro, SectionHeader } from '@/components/PageSections';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'שירותי אלומיניום לבית פרטי',
  description: 'חלונות אלומיניום, ויטרינות, תריסים, רשתות, הצללה ומפתחים גדולים לבתים פרטיים, שיפוצים ופרויקטים.',
};

export default function ServicesPage() {
  return (
    <main>
      <div className='container-main'>
        <PageIntro
          eyebrow='שירותים'
          title='עבודות אלומיניום לפי סוג הפתח והבית'
          text='חלונות, ויטרינות, תריסים, רשתות, הצללה ופתחים גדולים נבחרים לפי הבית, התוכנית, המידות והשימוש היומיומי.'
        >
          <p>לצפייה מסודרת לפי קטגוריות מומלץ להתחיל בעמוד מוצרים ופתרונות.</p>
          <Link className='text-link' href='/products'>
            מעבר למוצרים ופתרונות
          </Link>
        </PageIntro>

        <section className='section-shell'>
          <SectionHeader title='תחומי עבודה מרכזיים' text='כל תחום נבדק לפי סוג הפתח, גודל המפתח, גמרים, תריסים, רשתות ותיאום עם בעלי המקצוע בשטח.' />
          <div className='grid-2'>
            {services.map((service) => (
              <article className='feature-card' key={service.title}>
                <h2>{service.title}</h2>
                <p>{service.desc}</p>
                <p>
                  <strong>מה חשוב לבדוק: </strong>
                  {service.detail}
                </p>
              </article>
            ))}
          </div>
        </section>

        <CtaBand />
      </div>
    </main>
  );
}
