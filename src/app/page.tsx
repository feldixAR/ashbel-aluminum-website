import Image from 'next/image';
import Link from 'next/link';
import { ArchitecturalVisual, CtaBand, SectionHeader } from '@/components/PageSections';
import { faqs } from '@/data/faqs';
import { kalilSeries } from '@/data/kalilSeries';
import { projects } from '@/data/projects';
import { services } from '@/data/services';
import { site } from '@/data/site';

export default function HomePage() {
  return (
    <main>
      <section className='container-main hero'>
        <div className='hero-copy'>
          <p className='eyebrow'>אלומיניום לבתים פרטיים, שיפוצים, וילות ופרויקטים</p>
          <h1>חלונות, ויטרינות ופתרונות אלומיניום שמותאמים לבית ולשטח</h1>
          <p className='lead'>אשבל אלומיניום מבצעת חלונות, ויטרינות, הזזה, תריסים ופתרונות הצללה, משלב התוכניות והמדידה ועד ייצור והתקנה נקייה בבית.</p>
          <div className='hero-actions'>
            <Link className='btn btn-primary' href='/upload'>
              שליחת תוכניות או תמונות
            </Link>
            <a className='btn btn-outline' href={site.whatsapp}>
              דברו איתנו בוואטסאפ
            </a>
            <a className='text-link' href={site.phoneHref}>
              {site.phone}
            </a>
          </div>
        </div>
        <ArchitecturalVisual />
      </section>

      <section className='container-main trust-strip' aria-label='עיקרי עבודה'>
        <span>חלונות, ויטרינות, תריסים והצללה לבית פרטי</span>
        <span>התאמה לתוכניות, מידות ותנאי שטח</span>
        <span>עבודה מול אדריכלים, קבלנים ומפקחים</span>
        <span>שליחת תמונות ומידות בוואטסאפ להתחלה מהירה</span>
      </section>

      <section className='container-main section-shell'>
        <SectionHeader
          eyebrow='מה אנחנו עושים'
          title='עבודות אלומיניום לבית שנראות טוב ועובדות נכון'
          text='האתר מסודר לפי מה שבעלי בתים ואנשי מקצוע מחפשים בפועל: סוג הפתח, הסגנון, התריס או ההצללה, והדרך להעביר חומר לבדיקה.'
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
          eyebrow='מוצרים ופתרונות'
          title='בחירה לפי מראה, פתיחה ושימוש יומיומי'
          text='במקום להתחיל משם של סדרה, מתחילים מהשאלה מה הפתח צריך לעשות: להכניס אור, לפתוח יציאה לגינה, לתת פרטיות, לשמור על קו מודרני או ליצור מראה בלגי.'
        />
        <div className='home-product-strip'>
          {kalilSeries.map((series) => (
            <Link className='home-product-tile' href='/products' key={series.name}>
              <span>{series.category}</span>
              <h3>{series.name}</h3>
              <p>{series.need}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className='container-main section-shell'>
        <SectionHeader
          eyebrow='איך מתחילים'
          title='שולחים חומר, בודקים את הפתחים ומתקדמים מסודר'
          text='שלחו תוכניות, תמונות, מידות או כתב כמויות. נבדוק את סוגי הפתחים, התריסים, המסילות, הזכוכית והפרטים שצריך לסגור לפני מדידה או הצעה מסודרת.'
        />
        <ol className='process-list'>
          {[
            ['שולחים תוכניות או תמונות', 'אפשר לשלוח בוואטסאפ תוכניות, תמונות מהשטח, מידות או רשימת פתחים.'],
            ['מבינים את סוגי הפתחים', 'חלונות, ויטרינות, הזזה, תריסים, הצללה, רשתות ופתחים מיוחדים.'],
            ['מסכמים המשך עבודה', 'אם צריך משלימים מידע, מתאמים מדידה או ממשיכים להצעה מסודרת.'],
          ].map(([title, text]) => (
            <li key={title}>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className='container-main section-shell'>
        <SectionHeader
          eyebrow='לאדריכלים וקבלנים'
          title='תיאום אלומיניום מול תוכניות, פתחים ושטח'
          text='אדריכלים, קבלנים, מפקחים ויזמים יכולים להעביר תוכניות, מפרטים, רשימת פתחים או תמונות מהשטח כדי לבדוק כיוון ביצוע, מדידה ותיאום גמרים.'
        />
        <div className='button-row'>
          <Link className='btn btn-primary' href='/professionals'>
            לאדריכלים וקבלנים
          </Link>
          <Link className='btn btn-outline' href='/upload'>
            שליחת מידות או תמונות לבדיקה
          </Link>
        </div>
      </section>

      <section className='container-main section-shell'>
        <SectionHeader
          eyebrow='דוגמאות מהשטח'
          title='מצבים נפוצים בעבודות אלומיניום לבית'
          text='דוגמאות עבודה שממחישות איך חושבים על פתחים בבית פרטי, שיפוץ, ויטרינה גדולה, עבודה מול אדריכל או התאמת תריסים והצללה.'
        />
        <div className='grid-3'>
          {projects.slice(0, 3).map((project) => (
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
