import Link from 'next/link';
import type { Metadata } from 'next';
import { CtaBand, SectionHeader } from '@/components/PageSections';
import { VisualMedia } from '@/components/VisualMedia';
import { productFamilies } from '@/data/productFamilies';
import './products.css';

export const metadata: Metadata = {
  title: 'מוצרים',
  description: 'מוצרי אשבל אלומיניום: המראה הכפרי, המראה המודרני, מערכות הצללה, פרגולות אלומיניום ופתרונות משלימים.',
};

export default function ProductsPage() {
  const [firstFamily, secondFamily, ...secondaryFamilies] = productFamilies;

  return (
    <main className='products-page'>
      <section className='products-catalog-hero container-main' aria-labelledby='products-title'>
        <div className='products-catalog-copy'>
          <p className='eyebrow'>מוצרים</p>
          <h1 id='products-title'>מוצרי אלומיניום לבית ולפרויקט</h1>
          <p>
            חלונות, ויטרינות, תריסים, פרגולות ופתרונות משלימים, מסודרים לפי הדרך שבה בוחרים אלומיניום בפועל: סגנון, הצללה, חוץ וגמר.
          </p>
        </div>
      </section>

      <section className='container-main products-catalog' aria-label='קטגוריות מוצרים'>
        <div className='products-catalog-featured'>
          {[firstFamily, secondFamily].map((family) => (
            <Link className='product-catalog-card product-catalog-card-large' href={`/products/${family.slug}`} key={family.slug}>
              <VisualMedia image={family.image} loading='eager' />
              <div className='product-catalog-content'>
                <p>{family.kicker}</p>
                <h2>{family.title}</h2>
                <span>{family.intro}</span>
                <ul>
                  {family.subOptions.map((option) => (
                    <li key={option}>{option}</li>
                  ))}
                </ul>
                <strong>למידע נוסף</strong>
              </div>
            </Link>
          ))}
        </div>

        <div className='products-catalog-secondary'>
          {secondaryFamilies.map((family) => (
            <Link className='product-catalog-card' href={`/products/${family.slug}`} key={family.slug}>
              <VisualMedia image={family.image} />
              <div className='product-catalog-content'>
                <p>{family.kicker}</p>
                <h2>{family.title}</h2>
                <span>{family.intro}</span>
                <ul>
                  {family.subOptions.map((option) => (
                    <li key={option}>{option}</li>
                  ))}
                </ul>
                <strong>למידע נוסף</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className='container-main section-shell product-planning'>
        <SectionHeader
          eyebrow='לפני הצעת מחיר'
          title='מה כדאי להכין'
          text='תוכנית אלומיניום, תוכנית אדריכלית, מידות פתחים, כתב כמויות או תמונות מהשטח יעזרו להבין את העבודה ולתת מענה נכון יותר.'
        />
        <div className='planning-band'>
          {[
            ['תוכנית או מידות', 'תוכנית אלומיניום, תוכנית אדריכלית, חזיתות, חתכים או מידות פתחים.'],
            ['סוג העבודה', 'חלונות, ויטרינות, תריסים, פרגולות, שערים, גדרות או פתרונות משלימים.'],
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
        <CtaBand title='שליחת תוכניות ותיאום פגישה' text='שלחו תוכנית, מידות או תמונות מהשטח. נבדוק את החומר ונחזור לתיאום המשך עבודה.' />
      </div>
    </main>
  );
}
