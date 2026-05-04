import Link from 'next/link';
import { CtaBand, SectionHeader } from '@/components/PageSections';
import { VisualMedia } from '@/components/VisualMedia';
import { productFamilies, visualImages } from '@/data/productFamilies';
import { site } from '@/data/site';

export default function HomePage() {
  return (
    <main>
      <section className='hero hero-overlay'>
        <VisualMedia image={visualImages.modernHome} className='hero-media hero-background' loading='eager' />
        <div className='container-main hero-copy hero-overlay-copy'>
          <h1>פתרונות אלומיניום לבית</h1>
          <p className='lead'>חלונות, ויטרינות, תריסים ופרגולות בתכנון מדויק ובביצוע נקי.</p>
          <div className='hero-actions hero-primary-actions'>
            <Link className='btn btn-primary' href='/upload'>
              שליחת תוכניות
            </Link>
            <Link className='btn btn-outline' href='/products'>
              מוצרים
            </Link>
          </div>
          <div className='hero-icon-actions' aria-label='פעולות מהירות'>
            <a href={site.phoneHref} aria-label='התקשרו לאשבל אלומיניום'>טלפון</a>
            <a href={site.whatsapp} aria-label='שליחת וואטסאפ לאשבל אלומיניום'>וואטסאפ</a>
          </div>
        </div>
      </section>

      <section className='container-main trust-strip trust-strip-credibility' aria-label='אמינות ותחומי עבודה'>
        <span>מתקין מורשה קליל</span>
        <span>עבודה מול תוכניות ומידות</span>
        <span>בתים פרטיים ושיפוצים</span>
      </section>

      <section className='container-main section-shell'>
        <SectionHeader
          eyebrow='מוצרים'
          title='בחרו את סוג העבודה'
          text='האתר מסודר לפי חמש קטגוריות ברורות, כדי להגיע מהר לסוג האלומיניום הרלוונטי לבית או לפרויקט.'
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

      <section className='container-main section-shell compact-section'>
        <SectionHeader
          eyebrow='לפני הצעת מחיר'
          title='מה כדאי להכין'
          text='תוכנית אלומיניום, תוכנית אדריכלית, מידות פתחים, כתב כמויות או תמונות מהשטח. גם תיאור קצר מספיק כדי להתחיל שיחה מקצועית.'
        />
        <div className='planning-band'>
          {[
            ['שולחים חומר קיים', 'תוכנית, מידות, כתב כמויות, תמונות מהשטח או תיאור קצר של העבודה.'],
            ['מגדירים את העבודה', 'חלונות, ויטרינות, תריסים, פרגולות, שערים, גדרות או פתרונות משלימים.'],
            ['מתקדמים מסודר', 'בודקים מה חסר, מתאמים פגישה או מדידה ומתקדמים להצעת מחיר לפי הצורך.'],
          ].map(([title, text]) => (
            <article key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='container-main section-shell split-visual-section'>
        <div>
          <SectionHeader
            eyebrow='אדריכלים'
            title='עבודה מול תוכניות ופתחים'
            text='ניתן להעביר תוכניות, חזיתות, חתכים, רשימות פתחים, מפרטים או שאלות מקצועיות לתיאום חלונות, ויטרינות, תריסים, פרגולות ופתרונות חוץ.'
          />
          <div className='button-row'>
            <Link className='btn btn-primary' href='/professionals'>
              לאדריכלים
            </Link>
            <Link className='btn btn-outline' href='/upload'>
              שליחת תוכניות
            </Link>
          </div>
        </div>
        <VisualMedia image={visualImages.planDetail} />
      </section>

      <div className='container-main'>
        <CtaBand title='שליחת תוכניות ותיאום פגישה' text='שלחו תוכנית, מידות או תמונות מהשטח. נבדוק את החומר ונחזור לתיאום המשך עבודה.' />
      </div>
    </main>
  );
}
