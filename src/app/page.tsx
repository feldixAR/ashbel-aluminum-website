import Link from 'next/link';
import { CtaBand, SectionHeader } from '@/components/PageSections';
import { VisualMedia } from '@/components/VisualMedia';
import { productFamilies, visualImages } from '@/data/productFamilies';

export default function HomePage() {
  return (
    <main>
      <section className='hero hero-overlay'>
        <VisualMedia image={visualImages.modernHome} className='hero-media hero-background' loading='eager' />
        <div className='container-main hero-copy hero-overlay-copy'>
          <h1>אלומיניום לבית פרטי ולשיפוץ</h1>
          <p className='lead'>אשבל אלומיניום מתמחה בחלונות, ויטרינות, תריסים, פרגולות ופתרונות אלומיניום בהתאמה לתוכנית, למידות ולשטח.</p>
          <div className='hero-actions hero-primary-actions'>
            <Link className='btn btn-primary' href='/upload'>שליחת תוכניות</Link>
            <Link className='btn btn-outline' href='/products'>מוצרים</Link>
          </div>
        </div>
      </section>

      <section className='container-main trust-strip trust-strip-credibility'><span>מתקין מורשה קליל</span><span>עבודה מול תוכניות ומידות</span><span>בתים פרטיים ושיפוצים</span></section>

      <section className='container-main section-shell'>
        <SectionHeader title='אשבל אלומיניום' text='אשבל אלומיניום מתמחה בתכנון, ייצור והתקנה של מערכות אלומיניום לבית פרטי, לשיפוץ ולפרויקטים. העבודה מתבצעת מול תוכניות, מידות ותנאי השטח, עם דגש על התאמה נכונה, גמר נקי וביצוע מסודר.' />
      </section>

      <section className='container-main section-shell compact-section'>
        <SectionHeader title='יכולות ביצוע' />
        <div className='grid-2'>
          {['פתחים ומערכות אלומיניום: חלונות, דלתות, ויטרינות, פרופילים דקים.','מעטפת וחוץ: פרגולות, גדרות, שערים, מסתורי כביסה, חיפויי אלומיניום.','פנים וזכוכית: מעקות זכוכית, מקלחונים, פתרונות זכוכית משלימים.','הצללה ובית חכם: תריסים, מנועים, שליטה חכמה והכנות לבית חכם.'].map((t)=><article className='feature-card' key={t}><p>{t}</p></article>)}
        </div>
      </section>

      <section className='container-main section-shell'>
        <SectionHeader eyebrow='קטלוג' title='קטגוריות מוצרים' />
        <div className='home-product-strip visual-strip'>{productFamilies.map((family)=><Link className='home-product-tile visual-card' href={`/products/${family.slug}`} key={family.slug}><VisualMedia image={family.image} /><span>{family.kicker}</span><h3>{family.title}</h3><p>{family.intro}</p></Link>)}</div>
      </section>

      <section className='container-main section-shell compact-section'>
        <SectionHeader title='איך מתחילים' />
        <div className='planning-band'>{[['שולחים תוכניות, מידות או תמונות',''],['בודקים את סוג העבודה והפרטים החסרים',''],['מתקדמים לפגישה, מדידה או הצעת מחיר','']].map(([title])=><article key={title}><h2>{title}</h2></article>)}</div>
      </section>

      <section className='container-main section-shell split-visual-section'>
        <div><SectionHeader title='עבודה מול אדריכלים ותוכניות' text='תוכניות, חזיתות, חתכים, רשימות פתחים, מפרטים ופרטי גמר לתיאום עבודות אלומיניום.' /><div className='button-row'><Link className='btn btn-primary' href='/professionals'>לאדריכלים</Link><Link className='btn btn-outline' href='/upload'>שליחת תוכניות</Link></div></div>
        <VisualMedia image={visualImages.planDetail} />
      </section>

      <div className='container-main'><CtaBand title='יש לכם תוכניות או מידות?' text='שלחו את החומר הקיים ונחזור לתיאום המשך עבודה.' /></div>
    </main>
  );
}
