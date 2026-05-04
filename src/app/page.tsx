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
          <h1>חלונות, ויטרינות ופתרונות אלומיניום שמגשימים את התכנון של הבית</h1>
          <p className='lead'>מהתוכנית האדריכלית ותוכנית האלומיניום ועד הביצוע בשטח: חלונות, ויטרינות, מערכות הזזה, פרגולות, שערים, גדרות, מסתורי כביסה, מעקות זכוכית והצללות לבית ולפרויקט.</p>
          <div className='hero-actions'>
            <Link className='btn btn-primary' href='/upload'>
              העלאת תוכניות ותיאום פגישה
            </Link>
            <Link className='btn btn-outline' href='/professionals'>
              כניסה מקצועית לאדריכלים וקבלנים
            </Link>
            <a className='text-link' href={site.phoneHref}>
              {site.phone}
            </a>
          </div>
        </div>
        <ArchitecturalVisual />
      </section>

      <section className='container-main trust-strip' aria-label='עיקרי עבודה'>
        <span>חלונות, ויטרינות, תריסים והצללה לבית פרטי</span>
        <span>תוכנית אלומיניום, תוכנית אדריכלית או מידות</span>
        <span>עבודה מול אדריכלים, קבלנים ומפקחים</span>
        <span>פגישה מקצועית לפני הצעה מסודרת</span>
      </section>

      <section className='container-main section-shell'>
        <SectionHeader
          eyebrow='מה אנחנו עושים'
          title='עבודות אלומיניום לבית שנראות טוב ועובדות נכון'
          text='האתר מסודר לפי מה שבעלי בתים ואנשי מקצוע צריכים בפועל: חלון, ויטרינה, תריס, פרגולה, שער או פתרון חוץ, עם דרך ברורה להעביר תוכנית ולקבוע פגישה.'
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
          title='מעלים תוכנית, מתאמים פגישה וממשיכים בצורה מסודרת'
          text='מתחילים מתוכנית אלומיניום, תוכנית אדריכלית, מידות או שאלה מקצועית. בפגישה עוברים על סוג העבודה, הפתחים, השלב שבו נמצא הפרויקט והמשך הטיפול הנכון.'
        />
        <ol className='process-list'>
          {[
            ['מעלים תוכנית או שאלה מקצועית', 'תוכנית אלומיניום, תוכנית אדריכלית, מידות, כתב כמויות או צורך נקודתי בעבודת אלומיניום.'],
            ['מתאמים פגישה מקצועית', 'עוברים על החלונות, הוויטרינות, התריסים, ההצללות, פרטי החוץ ושלב העבודה בשטח.'],
            ['ממשיכים להצעה וביצוע אם רלוונטי', 'אחרי הבנה עמוקה יותר מתאמים מדידה, השלמת מידע, הצעה מסודרת או המשך עבודה.'],
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
          text='אדריכלים, קבלנים, מפקחים ויזמים יכולים להעביר תוכניות, מפרטים, רשימת פתחים, חזיתות, חתכים או שאלה מקצועית כדי לתאם פגישה סביב ביצוע, מדידה וגמרים.'
        />
        <div className='button-row'>
          <Link className='btn btn-primary' href='/professionals'>
            כניסה מקצועית לאדריכלים וקבלנים
          </Link>
          <Link className='btn btn-outline' href='/upload'>
            העלאת תוכנית אלומיניום או תוכנית אדריכלית
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
