import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Nav from '@/components/Nav';
import { productFamilies } from '@/data/productFamilies';
import { seo } from '@/data/seo';
import { site } from '@/data/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(seo.baseUrl),
  title: {
    default: 'אשבל אלומיניום | חלונות, ויטרינות ופתרונות אלומיניום לבית',
    template: '%s | אשבל אלומיניום',
  },
  description: 'חלונות אלומיניום, ויטרינות, תריסים, הצללה ופתרונות אלומיניום לבתים פרטיים, שיפוצים, וילות ופרויקטים. תיאום מקצועי מתוכנית אלומיניום או תוכנית אדריכלית ועד ביצוע בשטח.',
  keywords: seo.keywords,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'אשבל אלומיניום',
    description: 'חלונות, ויטרינות, תריסים ופתרונות אלומיניום לבתים פרטיים, וילות, שיפוצים ופרויקטים.',
    url: seo.baseUrl,
    siteName: 'אשבל אלומיניום',
    locale: 'he_IL',
    type: 'website',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: site.name,
  telephone: site.phone,
  url: seo.baseUrl,
  areaServed: 'ישראל',
  description: 'חלונות, ויטרינות ופתרונות אלומיניום לבתים פרטיים, וילות ופרויקטים.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='he' dir='rtl'>
      <body>
        <Nav />
        {children}
        <footer className='site-footer'>
          <div className='container-main footer-grid'>
            <div className='footer-brand'>
              <h2>אשבל אלומיניום</h2>
              <p>חלונות, ויטרינות, תריסים, הצללה ופתרונות אלומיניום לבית פרטי, וילה ושיפוץ, עם פגישה מקצועית ותיאום מסודר משלב התוכניות ועד ההתקנה.</p>
            </div>
            <div>
              <h3>מוצרים ופתרונות</h3>
              {productFamilies.map((family) => (
                <p key={family.slug}><Link href={`/products/${family.slug}`}>{family.title}</Link></p>
              ))}
            </div>
            <div>
              <h3>יצירת קשר</h3>
              <p><a href={site.phoneHref}>{site.phone}</a></p>
              <p><a href={site.whatsapp}>תיאום פגישה בוואטסאפ</a></p>
              <p><Link href='/upload'>העלאת תוכניות ותיאום פגישה</Link></p>
              <p><Link href='/projects'>סוגי עבודות</Link></p>
            </div>
          </div>
        </footer>
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      </body>
    </html>
  );
}
