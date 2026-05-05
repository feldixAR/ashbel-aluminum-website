import type { Metadata } from 'next';
import { PageIntro } from '@/components/PageSections';
import { site } from '@/data/site';

export const metadata: Metadata = { title: 'שליחת תוכניות ומידות', description: 'שלחו תוכנית אלומיניום, תוכנית אדריכלית, רשימת פתחים, מידות או תמונות מהשטח לתיאום המשך עבודה.' };

export default function UploadPage() {
  return <main><div className='container-main'><PageIntro eyebrow='שליחת תוכניות' title='שליחת תוכניות ומידות' text='שלחו תוכנית אלומיניום, תוכנית אדריכלית, רשימת פתחים, מידות או תמונות מהשטח. נבדוק את החומר ונחזור אליכם להמשך תיאום.'><div className='button-row'><a className='btn btn-primary' href={site.whatsapp}>שליחה בוואטסאפ</a><a className='btn btn-outline' href={site.phoneHref}>התקשרו לתיאום</a></div></PageIntro><section className='section-shell grid-3'>{[['מה אפשר לשלוח','תוכנית אלומיניום, תוכנית אדריכלית, רשימת פתחים, מידות או תמונות מהשטח.'],['מה כדאי לציין','סוג העבודה, שלב הפרויקט, מיקום העבודה, דגשים חשובים ושאלות פתוחות.'],['איך ממשיכים','בדיקת החומר, שאלות השלמה, פגישה או מדידה, והמשך לתיאום עבודה.']].map(([t,p])=><article className='feature-card' key={t}><h2>{t}</h2><p>{p}</p></article>)}</section></div></main>;
}
