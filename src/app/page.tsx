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
          <h1>עבודות אלומיניום לבית פרטי ולשיפוץ</h1>
          <p className='lead'>חלונות, ויטרינות, תריסים, פרגולות, גדרות, שערים, מסתורי כביסה, מעקות זכוכית ומקלחונים. ניתן לשלוח תוכניות, מידות או תמונות מהשטח ולקבוע פגישת ייעוץ.</p>
          <div className='hero-actions'>
            <Link className='btn btn-primary' href='/upload'>
              שליחת תוכניות
            </Link>
            <Link className='btn btn-outline' href='/products'>
              מוצרים ופתרונות
            </Link>
            <a className='text-link' href={site.phoneHref}>
              {site.phone}
            </a>
          </div>
        </div>
        <VisualMedia image={visualImages.modernHome} className='hero-media' loading='eager' />
      </section>

      <section className='container-main trust-strip' aria-label='עיקרי עבודה'>
        <span>חלונות, ויטרינות, תריסים והצללה</span>
        <span>תוכנית אלומיניום, תוכנית אדריכלית או מידות</span>
        <span>עבודה מול בעלי בתים, אדריכלים וקבלנים</span>
        <span>פגישת ייעוץ לפני הצעת מחיר</span>
      </section>

      <section className='container-main section-shell'>
        <SectionHeader
          eyebrow='המוצרים והשירותים שלנו'
          title='חלונות, ויטרינות ופתרונות אלומיניום לבית'
          text='בחרו את סוג העבודה הרלוונטי עבורכם: חלון, ויטרינה, תריס, פרגולה, שער, גדר או פתרון משלים לבית ולחזית.'
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
          title='בחרו את הקטגוריה המתאימה'
          text='הקטגוריות מסודרות לפי התחומים המרכזיים באלומיניום לבית: מראה כפרי, מראה מודרני, ויטרינות והזזה, הצללה ופתרונות נוספים.'
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
          title='מה חשוב להביא לפגישה'
          text='תוכנית אלומיניום, תוכנית אדריכלית, מידות פתחים, תמונות מהשטח או תיאור קצר של העבודה. ככל שיש יותר חומר, קל יותר להבין את סוג העבודה ולתת מענה נכון.'
        />
        <div className='split-visual-section'>
          <VisualMedia image={visualImages.plan} />
          <ol className='process-list'>
          {[
            ['שולחים תוכנית או מידות', 'תוכנית אלומיניום, תוכנית אדריכלית, מידות, כתב כמויות או תמונות מהשטח.'],
            ['בודקים את סוג העבודה', 'חלונות, ויטרינות, תריסים, פרגולות, שערים, גדרות או פתרונות משלימים.'],
            ['מתקדמים לפגישה והצעה', 'לאחר הבנת העבודה מתאמים פגישת ייעוץ, מדידה או הצעת מחיר מסודרת.'],
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
          title='עבודה מול תוכניות, פתחים ופרטי גמר'
          text='ניתן להעביר תוכניות, מפרטים, רשימת פתחים, חזיתות, חתכים או שאלה מקצועית לתיאום עבודה סביב חלונות, ויטרינות, תריסים, מערכות הזזה ופתרונות חוץ.'
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
          title='עבודות נפוצות באלומיניום'
          text='בתים פרטיים, שיפוצים, ויטרינות גדולות, עבודה מול אדריכל, פרגולות, שערים, גדרות ופתרונות חוץ.'
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
