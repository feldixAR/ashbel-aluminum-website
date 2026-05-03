import Image from 'next/image';
import Link from 'next/link';
import { faqs } from '@/data/faqs';
import { kalilSeries } from '@/data/kalilSeries';
import { projects } from '@/data/projects';
import { services } from '@/data/services';
import { styles } from '@/data/styles';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'אשבל אלומיניום',
  telephone: '055-960-7033',
  areaServed: 'ישראל',
  description: 'אלומיניום מדויק לבתים פרטיים, וילות ופרויקטים איכותיים',
};

export default function HomePage() {
  return (
    <main className='container-main space-y-10 py-8'>
      <section className='card'>
        <h1 className='text-3xl font-bold'>אלומיניום מדויק לבתים פרטיים, וילות ופרויקטים איכותיים</h1>
        <p className='mt-3'>מדידה, ייעוץ, ייצור והתקנה של מערכות אלומיניום, עם ליווי מקצועי משלב התוכניות ועד הגמר.</p>
        <div className='mt-4 flex flex-wrap gap-3'>
          <Link className='btn btn-primary' href='/upload'>שליחת תוכניות או תמונות</Link>
          <Link className='btn btn-secondary' href='/contact'>שיחה עם איש מקצוע</Link>
        </div>
      </section>

      <section className='grid gap-4 md:grid-cols-3'>
        {services.slice(0, 3).map((service) => (
          <article key={service.title} className='card'><h2 className='font-bold'>{service.title}</h2><p>{service.desc}</p></article>
        ))}
      </section>

      <section className='grid gap-4 md:grid-cols-3'>
        {styles.map((item) => (
          <article key={item.title} className='card'><h2 className='font-bold'>{item.title}</h2><p>{item.desc}</p></article>
        ))}
      </section>

      <section className='card'>
        <h2 className='text-2xl font-bold'>מוצרים וסדרות קליל - מידע ראשוני</h2>
        <div className='mt-3 grid gap-4 md:grid-cols-2'>
          {kalilSeries.slice(0, 4).map((series) => (
            <article key={series.name} className='rounded-xl border p-3'><h3 className='font-bold'>{series.name}</h3><p>{series.exp}</p></article>
          ))}
        </div>
      </section>

      <section className='card'>
        <h2 className='text-2xl font-bold'>איך מתקדמים</h2>
        <ol className='me-5 mt-2 list-decimal space-y-1'>
          <li>שולחים תוכניות, תמונות או תיאור קצר</li><li>מבינים את סוג הפרויקט והשלב שבו הוא נמצא</li><li>מקבלים כיוון מקצועי ראשוני</li><li>מתאמים מדידה בשטח</li><li>מגבשים הצעת מחיר מסודרת</li><li>יוצאים לייצור</li><li>מתקינים ומבצעים בדיקת גמר</li>
        </ol>
      </section>

      <section className='grid gap-4 md:grid-cols-3'>
        {projects.map((project) => (
          <article key={project.title} className='card'>
            <h2 className='font-bold'>{project.title}</h2><p>{project.desc}</p>
            <Image src='/project-placeholder.svg' alt={project.alt} width={800} height={450} className='mt-2 rounded-lg' />
          </article>
        ))}
      </section>

      <section className='card'>
        <h2 className='text-2xl font-bold'>שאלות נפוצות</h2>
        {faqs.map((faq) => (
          <details key={faq.q} className='mt-2'><summary className='font-semibold'>{faq.q}</summary><p>{faq.a}</p></details>
        ))}
      </section>

      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
    </main>
  );
}
