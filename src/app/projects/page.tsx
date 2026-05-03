import type { Metadata } from 'next';
import { CtaBand, PageIntro, SectionHeader } from '@/components/PageSections';
import { projects } from '@/data/projects';
import './projects.css';
import './project-proof.css';

export const metadata: Metadata = {
  title: 'פרויקטים ודוגמאות תרחיש',
  description: 'דוגמאות תרחיש לעבודות אלומיניום בבית פרטי, וילה ושיפוץ איכותי, עם המחשה אדריכלית עד להוספת תמונות פרויקט מקוריות של אשבל.',
};

export default function ProjectsPage() {
  return (
    <main>
      <div className='container-main projects-page'>
        <PageIntro
          eyebrow='פרויקטים'
          title='הוכחת מקצועיות בלי להמציא פרויקטים'
          text='עד להעלאת תמונות מקוריות של פרויקטי אשבל, העמוד מציג תרחישי עבודה שמדמים החלטות אמיתיות בפרויקט אלומיניום: מה בודקים, איפה הסיכון ומה צריך לשלוח לפני המשך עבודה.'
        />

        <section className='section-shell'>
          <SectionHeader title='תרחישי פרויקט לבדיקה מקצועית' text='כל תרחיש מוצג לפי הקשר, אתגר, כיוון פתרון ומה כדאי להעביר לבדיקה ראשונית.' />
          <div className='project-proof-list'>
            {projects.map((project, index) => (
              <article className='proof-case' key={project.title}>
                <div className={`proof-visual proof-visual-${index + 1}`} aria-label={project.alt} role='img'>
                  <span />
                  <span />
                  <span />
                </div>
                <div className='proof-content'>
                  <p className='eyebrow'>תרחיש {index + 1}</p>
                  <h2>{project.title}</h2>
                  <p>{project.desc}</p>
                  <dl>
                    <div>
                      <dt>הקשר</dt>
                      <dd>{project.context}</dd>
                    </div>
                    <div>
                      <dt>האתגר</dt>
                      <dd>{project.challenge}</dd>
                    </div>
                    <div>
                      <dt>כיוון פתרון</dt>
                      <dd>{project.solution}</dd>
                    </div>
                    <div>
                      <dt>מה לשלוח לבדיקה</dt>
                      <dd>{project.send}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className='project-honesty-note'>
          <h2>כשיהיו תמונות מקוריות, הן יחליפו את התרחישים</h2>
          <p>אין כאן לקוחות, כתובות, מספרים, תעודות או צילומי פרויקט שלא אומתו. עד אז, ההוכחה היא דרך חשיבה מקצועית ותהליך בדיקה ברור.</p>
        </section>

        <CtaBand title='רוצים שנבחן תרחיש דומה?' text='שלחו תמונות, תוכניות, רשימת פתחים או מפרט, ונבדוק מה נדרש כדי להתקדם בצורה מקצועית.' />
      </div>
    </main>
  );
}
