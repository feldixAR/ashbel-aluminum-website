import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro, SectionHeader } from '@/components/PageSections';
import { VisualMedia } from '@/components/VisualMedia';
import { visualImages } from '@/data/productFamilies';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'צור קשר',
  description: 'יצירת קשר עם אשבל אלומיניום לתיאום פגישת ייעוץ לעבודות אלומיניום, שליחת תוכניות, מידות או תמונות מהשטח.',
};

export default function ContactPage() {
  return (
    <main>
      <div className='container-main'>
        <PageIntro
          eyebrow='צור קשר'
          title='דברו איתנו על עבודת האלומיניום שלכם'
          text='חלונות, ויטרינות, תריסים, פרגולות, שערים, גדרות או פתרון אלומיניום אחר. אפשר לפנות בטלפון, בוואטסאפ או להשאיר פרטים.'
        >
          <div className='button-row'>
            <a className='btn btn-primary' href={site.whatsapp}>
              וואטסאפ
            </a>
            <a className='btn btn-outline' href={site.phoneHref}>
              התקשרו עכשיו
            </a>
          </div>
          <p>
            טלפון: <a className='text-link' href={site.phoneHref}>{site.phone}</a>
          </p>
          <VisualMedia image={visualImages.modernHomeTall} />
        </PageIntro>

        <section className='section-shell'>
          <SectionHeader title='איך נוח להתחיל' text='אפשר לשלוח תוכנית, מידות או תמונות מהשטח. אם עדיין אין חומר מסודר, אפשר להתחיל משיחה קצרה.' />
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
                  <option>חלונות וויטרינות</option>
                  <option>תריסים והצללה</option>
                  <option>פרגולה</option>
                  <option>גדר או שער</option>
                  <option>מסתור, חיפוי או זכוכית</option>
                  <option>פנייה של אדריכל או קבלן</option>
                </select>
              </label>
              <label className='field'>
                תיאור קצר
                <textarea name='message' />
              </label>
              <p className='notice'>להעלאת תוכנית או קובץ מומלץ להשתמש בוואטסאפ או בעמוד שליחת תוכניות.</p>
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
                שליחת תוכניות
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
