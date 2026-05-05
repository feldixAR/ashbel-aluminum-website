import type { Metadata } from 'next';
import { CtaBand, PageIntro } from '@/components/PageSections';

export const metadata: Metadata = { title: 'אודות אשבל אלומיניום', description: 'אודות אשבל אלומיניום: חלונות, ויטרינות, תריסים, פרגולות ופתרונות אלומיניום לבתים פרטיים ושיפוצים.' };

export default function AboutPage() {
  return <main><div className='container-main'><PageIntro eyebrow='אודות' title='אודות אשבל אלומיניום' text='חברת אלומיניום לבתים פרטיים, שיפוצים ופרויקטים, עם התמחות בחלונות, ויטרינות, תריסים, פרגולות ופתרונות אלומיניום משלימים.' /><section className='section-shell body-copy'><h2>דיוק בשטח, גמר נקי ותיאום מסודר</h2><p>עבודת אלומיניום טובה מתחילה בהבנת התוכנית והפתח, ממשיכה במדידה מדויקת ומסתיימת בהתקנה נקייה שמתאימה לבית, לגמרים ולתנאי השטח.</p><div className='grid-2'>{['מדידה ודיוק','יכולת ביצוע בשטח','שפה שמתאימה לבית','תיאום מול אנשי מקצוע'].map((t)=><article key={t} className='feature-card'><h3>{t}</h3></article>)}</div><p>אשבל אלומיניום פועלת כמתקין מורשה קליל ועובדת בתיאום עם בעלי בתים, אדריכלים, קבלנים ומפקחים.</p></section><CtaBand /></div></main>;
}
