import Link from 'next/link';
import type { Metadata } from 'next';
import { CtaBand, SectionHeader } from '@/components/PageSections';
import { VisualMedia } from '@/components/VisualMedia';
import { productFamilies } from '@/data/productFamilies';
import './products.css';

export const metadata: Metadata = {
  title: 'מוצרים ופתרונות אלומיניום',
  description: 'קטלוג חזותי של פתרונות אלומיניום לבית: המראה הבלגי, המראה המודרני, ויטרינות והזזה, מערכות הצללה ופתרונות חוץ משלימים.',
};

export default function ProductsPage() {
  return (
    <main className='products-page'>
      <section className='products-gateway' aria-labelledby='products-title'>
        <div className='products-gateway-copy'>
          <p className='eyebrow'>מוצרים ופתרונות</p>
          <h1 id='products-title'>קטלוג אלומיניום לפי מראה, פתיחה ושימוש בבית</h1>
          <p>
            בחירת אלומיניום מתחילה מסוג הפתח ומהתכנון של הבית: חלון בלגי, מפתח מודרני, ויטרינה לגינה,
            תריס או פתרון חוץ. בחרו משפחת פתרונות והמשיכו לעמוד שמסביר מה חשוב לתאם בפגישה.
          </p>
        </div>

        <div className='product-gateway-row' aria-label='משפחות מוצרי אלומיניום'>
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
                <span>לצפייה בפתרונות</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className='container-main section-shell product-planning'>
        <SectionHeader
          eyebrow='לפני שבוחרים מערכת'
          title='מה מביאים לפגישה כדי לבחור נכון'
          text='הפגישה המקצועית מחברת בין התוכנית, הפתחים והחיים בבית. המטרה אינה לבחור שם של סדרה על הנייר, אלא להבין את המפתח, השימוש, הגמר והביצוע.'
        />
        <div className='planning-band'>
          {[
            ['תוכנית ומידות', 'תוכנית אלומיניום, תוכנית אדריכלית, חזיתות, חתכים או מידות פתחים ראשוניות.'],
            ['שימוש יומיומי', 'אור, פרטיות, יציאה לגינה, פתיחה רחבה, תחזוקה, ילדים בבית או אזור אירוח.'],
            ['תיאום ביצוע', 'מסילות, תריסים, ניקוז, ריצוף, חיפויים, הכנות חשמל ופרטי גמר.'],
          ].map(([title, text]) => (
            <article key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <div className='container-main'>
        <CtaBand title='העלאת תוכניות ותיאום פגישה' text='העלו תוכנית אלומיניום, תוכנית אדריכלית, מידות או שאלה מקצועית, ונחזור לתיאום פגישה והמשך טיפול מסודר.' />
      </div>
    </main>
  );
}
