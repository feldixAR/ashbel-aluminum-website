import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro, SectionHeader } from '@/components/PageSections';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'צור קשר',
  description: 'יצירת קשר עם אשבל אלומיניום לשיחה, וואטסאפ או שליחת תוכניות ותמונות לבדיקת פרויקט אלומיניום.',
};

export default function ContactPage() {
  return (
    <main>
      <div className='container-main'>
        <PageIntro
          eyebrow='צור קשר'
          title='ספרו לנו על הפרויקט ונבין מה נכון לבדוק קודם'
          text='אפשר להתקשר, לשלוח וואטסאפ או להעביר תוכניות ותמונות. המטרה היא להבין את הפרויקט ולתאם המשך עבודה מקצועי, לא להבטיח הצעת מחיר מיידית.'
        >
          <div className='button-row'>
            <a className='btn btn-primary' href={site.phoneHref}>
              שיחה עם איש מקצוע
            </a>
            <a className='btn btn-outline' href={site.whatsapp}>
              שליחה בוואטסאפ
            </a>
          </div>
          <p>
            טלפון: <a className='text-link' href={site.phoneHref}>{site.phone}</a>
          </p>
        </PageIntro>

        <section className='section-shell'>
          <SectionHeader title='פרטים שיעזרו לנו לכוון אתכם' text='הטופס הוא מבנה עזר לפנייה. לשליחת קבצים בפועל השתמשו בוואטסאפ או במייל.' />
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
                סוג פרויקט
                <select name='projectType' defaultValue=''>
                  <option value='' disabled>בחרו סוג פרויקט</option>
                  <option>בית פרטי חדש</option>
                  <option>וילה</option>
                  <option>שיפוץ</option>
                  <option>פנייה מקצועית</option>
                  <option>פרויקט קבלני או יזמי</option>
                </select>
              </label>
              <label className='field'>
                תיאור קצר
                <textarea name='message' />
              </label>
              <p className='notice'>אין שליחה אוטומטית מהטופס בשלב זה. השתמשו בכפתורי הטלפון, הוואטסאפ או המייל כדי להעביר את הפרטים.</p>
            </form>
            <div className='feature-card'>
              <h2>דרכי פנייה ישירות</h2>
              <p>
                <strong>טלפון: </strong>
                <a className='text-link' href={site.phoneHref}>{site.phone}</a>
              </p>
              <p>
                <strong>וואטסאפ: </strong>
                <a className='text-link' href={site.whatsapp}>שליחה בוואטסאפ</a>
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
