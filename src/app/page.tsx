import Link from 'next/link';
import { CtaBand, SectionHeader } from '@/components/PageSections';
import { VisualMedia } from '@/components/VisualMedia';
import { faqs } from '@/data/faqs';
import { productFamilies, visualImages } from '@/data/productFamilies';
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
        <VisualMedia image={visualImages.modernHome} className='hero-media' loading='eager' label='תמונת אווירה אדריכלית, לא פרויקט של אשבל' />
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
        <div className='home-product-strip visual-strip'>
          {productFamilies.map((family) => (
            <Link className='home-product-tile visual-card' href={`/products/${family.slug}`} key={family.slug}>
              <VisualMedia image={family.image} />
              <span>{family.kicker}</span>
              <h3>{family.title}</h3>
              <p>{family.intro}</p>
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
        <div className='split-visual-section'>
          <VisualMedia image={visualImages.plan} label='תוכנית אדריכלית להמחשה בלבד' />
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
        </div>
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
        <div className='grid-3 visual-use-cases'>
          {projects.slice(0, 3).map((project) => (
            <article className='project-card' key={project.title}>
              <div className='image-frame'>
                <img src={project.image.src} alt={project.image.alt} loading='lazy' />
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
