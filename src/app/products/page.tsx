import Link from 'next/link';
import type { Metadata } from 'next';
import { CtaBand, SectionHeader } from '@/components/PageSections';
import { VisualMedia } from '@/components/VisualMedia';
import { productFamilies } from '@/data/productFamilies';
import './products.css';

export const metadata: Metadata = {
  title: 'מוצרים ופתרונות אלומיניום',
  description: 'חלונות אלומיניום, ויטרינות, דלתות הזזה, מראה בלגי, הצללות ופתרונות חוץ לבית פרטי, שיפוץ או פרויקט.',
};

export default function ProductsPage() {
  return (
    <main className='products-page'>
      <section className='products-gateway' aria-labelledby='products-title'>
        <div className='products-gateway-copy'>
          <p className='eyebrow'>מוצרים ופתרונות</p>
          <h1 id='products-title'>בוחרים אלומיניום לפי הבית, לא לפי שם סדרה</h1>
          <p>
            מראה בלגי, פתחים מודרניים, ויטרינות רחבות, הצללה ופתרונות חוץ. כל בחירה משפיעה על האור,
            הנוחות, התחזוקה והמראה הסופי של הבית.
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
          title='מה צריך לדעת לפני שמייצרים חלון'
          text='מערכת אלומיניום טובה מתחילה מהבנה של הפתח: איך משתמשים בו, איזה אור נכנס, איפה התריס יושב, איך המסילה פוגשת את הריצוף ומה ייראה נכון בחזית.'
        />
        <div className='planning-band'>
          {[
            ['תוכנית ומידות', 'תוכנית אלומיניום, תוכנית אדריכלית, חזיתות, חתכים או מידות פתחים ראשוניות.'],
            ['שימוש בבית', 'אור, פרטיות, יציאה לגינה, פתיחה רחבה, תחזוקה, ילדים בבית או אזור אירוח.'],
            ['פרטי ביצוע', 'מסילות, תריסים, ניקוז, ריצוף, חיפויים, הכנות חשמל וגמר סביב הפתח.'],
          ].map(([title, text]) => (
            <article key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <div className='container-main'>
        <CtaBand title='יש פתח בתוכנית שכדאי לבדוק?' text='שלחו תוכנית, מידות או שאלה נקודתית. נבין מה חסר, מה חשוב לברר ומה נכון לתאם לפני שמתקדמים.' />
      </div>
    </main>
  );
}
