import type { Metadata } from 'next';
import { CtaBand, PageIntro } from '@/components/PageSections';

export const metadata: Metadata = { title: 'אדריכלים ותוכניות', description: 'עבודה מול אדריכלים, מעצבים, קבלנים ומפקחים לפי תוכניות, חזיתות, חתכים ורשימות פתחים.' };

export default function ProfessionalsPage() {
  return <main><div className='container-main'><PageIntro eyebrow='לאנשי מקצוע' title='עבודה מול אדריכלים ותוכניות' text='ביצוע עבודות אלומיניום לפי תוכניות, חזיתות, חתכים, רשימות פתחים, מפרטים ופרטי גמר, עם תיאום מסודר מול האדריכל, הקבלן והשטח.' /><section className='section-shell grid-3'>{[['מה אפשר להעביר','תוכנית אדריכלית, תוכנית אלומיניום, חזיתות וחתכים, רשימת פתחים, כתב כמויות, פרטי גמר.'],['מה אנחנו בודקים','סוגי פתיחה, מפתח וגודל זכוכית, פרופילים וסדרות, תריסים ומנועים, מסילות והכנות, גוון וגמר, התאמה לשטח.'],['איך ממשיכים','בדיקת חומר, שאלות השלמה, פגישה או מדידה, הצעה מסודרת, תיאום ביצוע.']].map(([t,p])=><article className='feature-card' key={t}><h2>{t}</h2><p>{p}</p></article>)}</section><CtaBand title='שליחת תוכניות לאשבל אלומיניום' text='שלחו חומר קיים ונחזור לתיאום המשך עבודה.' /></div></main>;
}
