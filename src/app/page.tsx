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
          <p className='eyebrow'>אשבל אלומיניום</p>
          <h1>חלונות וויטרינות לבית</h1>
          <p className='lead'>עבודות אלומיניום לבתים פרטיים, שיפוצים ופרויקטים: חלונות, ויטרינות, תריסים, פרגולות, שערים, גדרות, מסתורי כביסה, חיפויים, מעקות זכוכית ומקלחונים.</p>
          <div className='hero-actions'>
            <Link className='btn btn-primary' href='/upload'>
              שליחת תוכניות
            </Link>
            <Link className='btn btn-outline' href='/products'>
              מוצרים ושירותים
            </Link>
            <a className='text-link' href={site.phoneHref}>
              {site.phone}
            </a>
          </div>
        </div>
        <VisualMedia image={visualImages.modernHome} className='hero-media' loading='eager' />
      </section>

      <section className='container-main trust-strip' aria-label='תחומי עבודה מרכזיים'>
        <span>חלונות וויטרינות</span>
        <span>תריסים ופרגולות</span>
        <span>גדרות ושערים</span>
        <span>מסתורים, חיפויים וזכוכית</span>
      </section>

      <section className='container-main section-shell'>
        <SectionHeader
          eyebrow='המוצרים והשירותים שלנו'
          title='בחרו את סוג העבודה הרלוונטי עבורכם'
          text='חלונות, ויטרינות, תריסים, פרגולות, שערים, גדרות, מסתורי כביסה, חיפויים, מעקות זכוכית ומקלחונים. בכל תחום אפשר לשלוח תוכנית, מידות או תמונות מהשטח.'
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
          eyebrow='קטגוריות מוצרים'
          title='מראה כפרי, מראה מודרני ופתרונות חוץ'
          text='הקטגוריות מסודרות לפי הדרך שבה לקוחות מחפשים עבודות אלומיניום: סגנון, סוג פתיחה, הצללה ופתרונות משלימים לבית ולחזית.'
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
          eyebrow='פגישת ייעוץ'
          title='מה חשוב להביא לפגישת ייעוץ'
          text='אפשר להתחיל מתוכנית אלומיניום, תוכנית אדריכלית, מידות פתחים, כתב כמויות או תמונות מהשטח. גם תיאור קצר של העבודה מספיק לשיחה ראשונה.'
        />
        <div className='split-visual-section'>
          <VisualMedia image={visualImages.plan} />
          <ol className='process-list'>
          {[
            ['שולחים חומר קיים', 'תוכנית, מידות, כתב כמויות, תמונות מהשטח או תיאור קצר של העבודה.'],
            ['מגדירים את סוג העבודה', 'חלונות, ויטרינות, תריסים, פרגולות, שערים, גדרות או פתרונות משלימים.'],
            ['מתקדמים לפגישה או הצעה', 'לאחר הבנת העבודה מתאמים פגישת ייעוץ, מדידה או הצעת מחיר מסודרת.'],
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
          title='עבודה מול תוכניות ופתחים'
          text='ניתן להעביר תוכניות, חזיתות, חתכים, רשימות פתחים, מפרטים או שאלות מקצועיות לתיאום חלונות, ויטרינות, תריסים, מערכות הזזה ופתרונות חוץ.'
        />
        <div className='button-row'>
          <Link className='btn btn-primary' href='/professionals'>
            לאדריכלים וקבלנים
          </Link>
          <Link className='btn btn-outline' href='/upload'>
            שליחת תוכניות
          </Link>
        </div>
      </section>

      <section className='container-main section-shell'>
        <SectionHeader
          eyebrow='סוגי עבודות'
          title='עבודות אלומיניום נפוצות'
          text='עבודות לבית פרטי, שיפוץ, ויטרינה גדולה, עבודה מול אדריכל, פרגולה, שער, גדר או פתרון חוץ משלים.'
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
        <CtaBand title='שליחת תוכניות ותיאום פגישת ייעוץ' text='שלחו תוכנית, מידות או תמונות מהשטח. נבדוק את החומר ונחזור לתיאום המשך עבודה.' />
      </div>
    </main>
  );
}
