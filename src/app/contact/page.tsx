import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro, SectionHeader } from '@/components/PageSections';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'צור קשר',
  description: 'יצירת קשר עם אשבל אלומיניום לתיאום פגישה לעבודת אלומיניום, תוכנית אדריכלית, מידות או שאלה מקצועית.',
};

export default function ContactPage() {
  return (
    <main>
      <div className='container-main'>
        <PageIntro
          eyebrow='צור קשר'
          title='מתאמים פגישה לעבודת אלומיניום'
          text='יש לכם תוכנית אלומיניום, תוכנית אדריכלית, מידות או צורך בעבודת אלומיניום? השאירו פרטים או פנו בוואטסאפ, ונחזור לתיאום פגישה מקצועית.'
        >
          <div className='button-row'>
            <a className='btn btn-primary' href={site.whatsapp}>
              תיאום פגישה בוואטסאפ
            </a>
            <a className='btn btn-outline' href={site.phoneHref}>
              התקשרו לתיאום
            </a>
          </div>
          <p>
            טלפון: <a className='text-link' href={site.phoneHref}>{site.phone}</a>
          </p>
        </PageIntro>

        <section className='section-shell'>
          <SectionHeader title='איך הכי נוח להתחיל' text='אם יש תוכנית אלומיניום, תוכנית אדריכלית, מידות או כתב כמויות - העלו אותם דרך וואטסאפ או מייל. אם עדיין אין חומר מסודר, אפשר להתחיל משיחה קצרה לתיאום פגישה.' />
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
              <p className='notice'>הטופס הוא מבנה עזר לפנייה. להעלאת תוכנית או קובץ בפועל השתמשו בוואטסאפ או במייל.</p>
            </form>
            <div className='feature-card contact-direct'>
              <h2>דרכי פנייה ישירות</h2>
              <p>
                <strong>טלפון: </strong>
                <a className='text-link' href={site.phoneHref}>{site.phone}</a>
              </p>
              <p>
                <strong>וואטסאפ: </strong>
                <a className='text-link' href={site.whatsapp}>תיאום פגישה</a>
              </p>
              <p>
                <strong>מייל: </strong>
                <a className='text-link' href={site.email}>{site.emailLabel}</a>
              </p>
              <Link className='btn btn-primary' href='/upload'>
                העלאת תוכנית
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
