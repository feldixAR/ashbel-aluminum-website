import Link from 'next/link';
import type { Metadata } from 'next';
import { CtaBand, SectionHeader } from '@/components/PageSections';
import { VisualMedia } from '@/components/VisualMedia';
import { productFamilies } from '@/data/productFamilies';
import './products.css';

export const metadata: Metadata = {
  title: 'מוצרים ושירותים',
  description: 'מוצרים ושירותים באשבל אלומיניום: מראה כפרי, מראה מודרני, ויטרינות והזזה, מערכות הצללה ופתרונות נוספים לבית.',
};

export default function ProductsPage() {
  return (
    <main className='products-page'>
      <section className='products-gateway' aria-labelledby='products-title'>
        <div className='products-gateway-copy'>
          <p className='eyebrow'>מוצרים ושירותים</p>
          <h1 id='products-title'>המוצרים והשירותים שלנו</h1>
          <p>
            בחרו את סוג העבודה הרלוונטי עבורכם. ניתן למצוא מידע על מראה כפרי, מראה מודרני,
            ויטרינות והזזה, תריסים והצללה, פרגולות ופתרונות נוספים לבית ולחזית.
          </p>
        </div>

        <div className='product-gateway-row' aria-label='קטגוריות מוצרים ושירותים'>
          {productFamilies.map((family) => (
            <Link className='product-gateway-block' href={`/products/${family.slug}`} key={family.slug}>
              <VisualMedia image={family.image} loading='eager' />
              <div className='product-gateway-overlay'>
                <p>{family.kicker}</p>
                <h2>{family.title}</h2>
                <ul>
                  {family.subOptions.slice(0, 5).map((option) => (
                    <li key={option}>{option}</li>
                  ))}
                </ul>
                <span>למידע נוסף</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className='container-main section-shell product-planning'>
        <SectionHeader
          eyebrow='פגישת ייעוץ'
          title='מה כדאי להכין לפני פגישה'
          text='תוכנית אלומיניום, תוכנית אדריכלית, מידות פתחים, כתב כמויות או תמונות מהשטח יעזרו להבין את העבודה ולתת מענה נכון יותר.'
        />
        <div className='planning-band'>
          {[
            ['תוכנית או מידות', 'תוכנית אלומיניום, תוכנית אדריכלית, חזיתות, חתכים או מידות פתחים.'],
            ['סוג העבודה', 'חלונות, ויטרינות, תריסים, פרגולות, שערים, גדרות או פתרונות נוספים.'],
            ['פרטים בשטח', 'ריצוף, חיפויים, הכנות חשמל, בתי תריס, מסילות, גמרים ותנאי התקנה.'],
          ].map(([title, text]) => (
            <article key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <div className='container-main'>
        <CtaBand title='שליחת תוכניות ותיאום פגישת ייעוץ' text='שלחו תוכנית, מידות או תמונות מהשטח. נבדוק את החומר ונחזור לתיאום המשך עבודה.' />
      </div>
    </main>
  );
}
