import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Nav from '@/components/Nav';
import { seo } from '@/data/seo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(seo.baseUrl),
  title: { default: 'אשבל אלומיניום', template: '%s | אשבל אלומיניום' },
  description: 'אלומיניום מדויק לבתים פרטיים, וילות ופרויקטים איכותיים.',
  openGraph: {
    title: 'אשבל אלומיניום',
    description: 'מדידה, ייעוץ, ייצור והתקנה של מערכות אלומיניום.',
    type: 'website',
    locale: 'he_IL',
  },
  keywords: seo.keywords,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='he' dir='rtl'>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
