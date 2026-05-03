import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import { seo } from '@/data/seo';

export const metadata: Metadata = {metadataBase:new URL(seo.baseUrl),title:{default:'אשבל אלומיניום',template:'%s | אשבל אלומיניום'},description:'אלומיניום מדויק לבתים פרטיים, וילות ופרויקטים איכותיים.',openGraph:{title:'אשבל אלומיניום',description:'מדידה, ייעוץ, ייצור והתקנה של מערכות אלומיניום.',type:'website',locale:'he_IL'},keywords:seo.keywords};

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang='he' dir='rtl'><body><Nav/>{children}</body></html>}
