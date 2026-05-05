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
  description: 'חלונות אלומיניום, ויטרינות, תריסים, פרגולות ופתרונות אלומיניום לבתים פרטיים, שיפוצים, וילות ופרויקטים. תיאום מקצועי מתוכנית אלומיניום או תוכנית אדריכלית ועד ביצוע בשטח.',
  keywords: seo.keywords,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'אשבל אלומיניום',
    description: 'חלונות, ויטרינות, תריסים, פרגולות ופתרונות אלומיניום לבתים פרטיים, וילות, שיפוצים ופרויקטים.',
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
              <Link href='/'><h2>אשבל אלומיניום</h2></Link>
              <p>חברת אלומיניום לבתים פרטיים, שיפוצים ופרויקטים, עם עבודה מול תוכניות, מידות ותנאי שטח.</p>
            </div>
            <div>
              <h3>מוצרים</h3>
              {productFamilies.map((family) => (
                <p key={family.slug}><Link href={`/products/${family.slug}`}>{family.title}</Link></p>
              ))}
            </div>
            <div>
              <h3>מידע</h3>
              <p><Link href='/about'>אודות</Link></p>
              <p><a href={site.email}>{site.emailLabel}</a></p>
              <p><Link href='/contact'>צרו קשר</Link></p>
            </div>
            <div>
              <h3>יצירת קשר</h3>
              <p><a href={site.phoneHref}>{site.phone}</a></p>
              <p><a href={site.whatsapp}>וואטסאפ</a></p>
              <p><Link href='/upload'>שליחת תוכניות</Link></p>
              <p><a href={site.email}>{site.emailLabel}</a></p>
            </div>
          </div>
        </footer>
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      </body>
    </html>
  );
}
