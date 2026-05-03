import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBand, PageIntro, SectionHeader } from '@/components/PageSections';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'שירותי אלומיניום לבית פרטי',
  description: 'חלונות אלומיניום, ויטרינות, פרופיל בלגי, תריסים, רשתות ומפתחים גדולים לבתים פרטיים, וילות ופרויקטים איכותיים.',
};

export default function ServicesPage() {
  return (
    <main>
      <div className='container-main'>
        <PageIntro
          eyebrow='שירותים'
          title='עבודות אלומיניום שמתחילות מהתוכנית ומהשטח'
          text='אשבל אלומיניום מתמקדת בביצוע מערכות אלומיניום לבתים פרטיים, וילות ופרויקטים איכותיים, עם התאמה בין אדריכלות, שימוש יומיומי ותיאום ביצוע.'
        >
          <p>חלונות אלומיניום, ויטרינות אלומיניום, פרופיל בלגי, תריסים לבית פרטי, רשתות ומפתחים גדולים.</p>
          <Link className='text-link' href='/upload'>
            שליחת תוכניות אלומיניום לבדיקה
          </Link>
        </PageIntro>

        <section className='section-shell'>
          <SectionHeader title='תחומי עבודה מרכזיים' text='כל שירות נבחן לפי סוג הפרויקט, מידות הפתחים, גמרים, שימושים ותיאום עם בעלי המקצוע.' />
          <div className='grid-2'>
            {services.map((service) => (
              <article className='feature-card' key={service.title}>
                <h2>{service.title}</h2>
                <p>{service.desc}</p>
                <p>
                  <strong>מה בודקים: </strong>
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
