import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Nav from '@/components/Nav';
import { seo } from '@/data/seo';
import { site } from '@/data/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(seo.baseUrl),
  title: {
    default: 'אשבל אלומיניום | אלומיניום מדויק לבתים פרטיים',
    template: '%s | אשבל אלומיניום',
  },
  description: 'אלומיניום מדויק לבתים פרטיים, וילות ופרויקטים איכותיים. מדידה, ייעוץ, ייצור והתקנה משלב התוכניות ועד הגמר.',
  keywords: seo.keywords,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'אשבל אלומיניום',
    description: 'מדידה, ייעוץ, ייצור והתקנה של מערכות אלומיניום לבתים פרטיים, וילות ופרויקטים איכותיים.',
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
  description: 'אלומיניום מדויק לבתים פרטיים, וילות ופרויקטים איכותיים.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='he' dir='rtl'>
      <body>
        <Nav />
        {children}
        <footer className='site-footer'>
          <div className='container-main footer-grid'>
            <div>
              <h2>אשבל אלומיניום</h2>
              <p>ביצוע מערכות אלומיניום לבית פרטי, וילה ופרויקט איכותי, עם תיאום מקצועי משלב התוכניות ועד הגמר.</p>
            </div>
            <div>
              <h3>יצירת קשר</h3>
              <p>
                <a href={site.phoneHref}>{site.phone}</a>
              </p>
              <p>
                <a href={site.whatsapp}>שליחה בוואטסאפ</a>
              </p>
            </div>
            <div>
              <h3>התחלת תהליך</h3>
              <p>שלחו תוכניות, מפרטים או תמונות מהשטח לבדיקה ראשונית ותיאום המשך עבודה.</p>
            </div>
          </div>
        </footer>
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      </body>
    </html>
  );
}
