import Image from 'next/image';
import Link from 'next/link';
import { ArchitecturalVisual, CtaBand, SectionHeader } from '@/components/PageSections';
import { faqs } from '@/data/faqs';
import { kalilSeries } from '@/data/kalilSeries';
import { processSteps } from '@/data/process';
import { projects } from '@/data/projects';
import { services } from '@/data/services';
import { site } from '@/data/site';

export default function HomePage() {
  return (
    <main>
      <section className='container-main hero'>
        <div className='hero-copy'>
          <p className='eyebrow'>אלומיניום מדויק לבתים פרטיים, וילות ופרויקטים איכותיים</p>
          <h1>מערכות אלומיניום לבית שנמדדות נכון, מתוכננות בשקט ומותקנות עד הגמר</h1>
          <p className='lead'>מדידה, ייעוץ, ייצור והתקנה של מערכות אלומיניום, עם ליווי מקצועי משלב התוכניות ועד הגמר.</p>
          <div className='hero-actions'>
            <Link className='btn btn-primary' href='/upload'>
              שליחת תוכניות או תמונות
            </Link>
            <a className='btn btn-outline' href={site.phoneHref}>
              שיחה עם איש מקצוע
            </a>
            <a className='text-link' href={site.whatsapp}>
              שליחה בוואטסאפ
            </a>
          </div>
        </div>
        <ArchitecturalVisual />
      </section>

      <section className='container-main trust-strip' aria-label='נקודות אמון'>
        <span>בחירת מערכות לפי פרויקט, לא לפי רשימת מוצרים קבועה</span>
        <span>תיאום מול תוכניות, שטח ובעלי מקצוע</span>
        <span>התאמה לבתים פרטיים, וילות ופרויקטים איכותיים</span>
        <span>המשך עבודה מסודר אחרי בדיקה ראשונית</span>
      </section>

      <section className='container-main section-shell'>
        <SectionHeader
          eyebrow='שירותים'
          title='פתרונות אלומיניום שמתחילים בהבנת הבית'
          text='העבודה מתמקדת בפתחים, שימושים, סגנון ותיאום ביצוע. לא מתחילים מהבטחות, אלא מהחומר המקצועי ומהשטח.'
        />
        <div className='grid-3'>
          {services.slice(0, 6).map((service) => (
            <article className='feature-card' key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='container-main section-shell'>
        <SectionHeader
          eyebrow='מוצרים וסדרות'
          title='בחירת מערכת מתחילה מבדיקת פתחים'
          text='שלחו תוכניות, מידות, תמונות או כתב כמויות, ואפשר יהיה להבין אם הכיוון הוא בלגי, הזזה, ויטרינה, תריסים או שילוב מערכות.'
        />
        <div className='grid-2'>
          {kalilSeries.slice(0, 4).map((series) => (
            <article className='feature-card' key={series.name}>
              <h3>{series.name}</h3>
              <p>{series.exp}</p>
              <p>
                <strong>מתאים ל: </strong>
                {series.use}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className='container-main section-shell'>
        <SectionHeader eyebrow='תהליך' title='איך מתקדמים בלי לנחש' text='תהליך העבודה בנוי כדי להבין את הפרויקט לפני התחייבות מקצועית או הצעת מחיר מסודרת.' />
        <ol className='process-list'>
          {processSteps.map((step) => (
            <li key={step.title}>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className='container-main section-shell'>
        <SectionHeader
          eyebrow='לאנשי מקצוע'
          title='אדריכלים, קבלנים, מפקחים ויזמים'
          text='שלחו תוכניות, מפרטים או תמונות מהשטח, ונבחן את הפרויקט לצורך הכוונה מקצועית ראשונית, בחירת מערכות אלומיניום מתאימות ותיאום המשך עבודה.'
        />
        <div className='button-row'>
          <Link className='btn btn-primary' href='/professionals'>
            בקשת ייעוץ טכני
          </Link>
          <Link className='btn btn-outline' href='/upload'>
            שליחת חומרים לבדיקה
          </Link>
        </div>
      </section>

      <section className='container-main section-shell'>
        <SectionHeader
          eyebrow='פרויקטים'
          title='תרחישי עבודה שמראים איך בודקים פרויקט'
          text='אין באתר הצגה של לקוחות, מיקומים או פרויקטים שלא אומתו. כרגע מוצגים תרחישים מקצועיים שמסבירים מה צריך לבדוק ומה לשלוח.'
        />
        <div className='grid-3'>
          {projects.map((project) => (
            <article className='project-card' key={project.title}>
              <div className='image-frame'>
                <Image src='/project-placeholder.svg' alt={project.alt} width={800} height={450} />
              </div>
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='container-main section-shell'>
        <SectionHeader eyebrow='שאלות נפוצות' title='לפני שמתקדמים' />
        <div className='grid-3'>
          {faqs.map((faq) => (
            <details className='feature-card' key={faq.q}>
              <summary>
                <strong>{faq.q}</strong>
              </summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className='container-main'>
        <CtaBand />
      </div>
    </main>
  );
}
