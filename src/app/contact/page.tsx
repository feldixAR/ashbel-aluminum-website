import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro, SectionHeader } from '@/components/PageSections';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'צור קשר',
  description: 'יצירת קשר עם אשבל אלומיניום בטלפון, וואטסאפ או מייל לשליחת תוכניות, תמונות, מידות או פרטי פרויקט אלומיניום.',
};

export default function ContactPage() {
  return (
    <main>
      <div className='container-main'>
        <PageIntro
          eyebrow='צור קשר'
          title='דברו איתנו על חלונות, ויטרינות ופתרונות אלומיניום'
          text='אפשר להתקשר, לשלוח וואטסאפ או להעביר תוכניות ותמונות. ספרו לנו מה סוג העבודה, באיזה שלב הבית או השיפוץ, ומה כבר יש לכם ביד.'
        >
          <div className='button-row'>
            <a className='btn btn-primary' href={site.whatsapp}>
              דברו איתנו בוואטסאפ
            </a>
            <a className='btn btn-outline' href={site.phoneHref}>
              התקשרו עכשיו
            </a>
          </div>
          <p>
            טלפון: <a className='text-link' href={site.phoneHref}>{site.phone}</a>
          </p>
        </PageIntro>

        <section className='section-shell'>
          <SectionHeader title='איך הכי נוח להתחיל' text='אם יש תוכניות, תמונות, מידות או כתב כמויות - שלחו אותם. אם עדיין אין, אפשר להתחיל משיחה קצרה.' />
          <div className='grid-2'>
            <form className='feature-card contact-form'>
              <label className='field'>
                שם מלא
                <input name='name' type='text' autoComplete='name' />
              </label>
              <label className='field'>
                טלפון
                <input name='phone' type='tel' autoComplete='tel' />
              </label>
              <label className='field'>
                סוג עבודה
                <select name='projectType' defaultValue=''>
                  <option value='' disabled>בחרו סוג עבודה</option>
                  <option>חלונות לבית פרטי</option>
                  <option>ויטרינה או הזזה</option>
                  <option>תריסים והצללה</option>
                  <option>שיפוץ בית קיים</option>
                  <option>פנייה של אדריכל או קבלן</option>
                </select>
              </label>
              <label className='field'>
                תיאור קצר
                <textarea name='message' />
              </label>
              <p className='notice'>הטופס הוא מבנה עזר לפנייה. לשליחת קבצים בפועל השתמשו בוואטסאפ או במייל.</p>
            </form>
            <div className='feature-card contact-direct'>
              <h2>דרכי פנייה ישירות</h2>
              <p>
                <strong>טלפון: </strong>
                <a className='text-link' href={site.phoneHref}>{site.phone}</a>
              </p>
              <p>
                <strong>וואטסאפ: </strong>
                <a className='text-link' href={site.whatsapp}>שליחת הודעה</a>
              </p>
              <p>
                <strong>מייל: </strong>
                <a className='text-link' href={site.email}>{site.emailLabel}</a>
              </p>
              <Link className='btn btn-primary' href='/upload'>
                שליחת תוכניות או תמונות
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
