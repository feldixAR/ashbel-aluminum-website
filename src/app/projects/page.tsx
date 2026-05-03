import type { Metadata } from 'next';
import { CtaBand, PageIntro, SectionHeader } from '@/components/PageSections';
import { projects } from '@/data/projects';
import './projects.css';

export const metadata: Metadata = {
  title: 'פרויקטים ודוגמאות תרחיש',
  description: 'דוגמאות תרחיש לעבודות אלומיניום בבית פרטי, וילה ושיפוץ איכותי, עם המחשה אדריכלית עד להוספת תמונות פרויקט מקוריות של אשבל.',
};

export default function ProjectsPage() {
  return (
    <main>
      <div className='container-main'>
        <PageIntro
          eyebrow='פרויקטים'
          title='דוגמאות תרחיש שמראות איך ניגשים לפרויקט נכון'
          text='העמוד מציג סוגי עבודות נפוצים בבית פרטי ובשיפוץ: מעטפת פתחים, שדרוג מערכות ומראה אדריכלי. התמונות הן המחשה תכנונית בלבד, עד להעלאת תיעוד מקורי מפרויקטים שניתן לפרסם באחריות.'
        />

        <section className='section-shell'>
          <SectionHeader title='דוגמאות תרחיש' text='כך נראה תהליך חשיבה מקצועי לפני מדידה, ייצור והתקנה: לא רק סוג חלון, אלא התאמה בין הפתח, הסדרה, התריסים, הרשתות, הגמר והעבודה בשטח.' />
          <div className='grid-3'>
            {projects.map((project, index) => (
              <article className='project-card project-card-elevated' key={project.title}>
                <div className={`project-visual project-visual-${index + 1}`} aria-label={project.alt}>
                  <span className='project-skyline' />
                  <span className='project-frame project-frame-main' />
                  <span className='project-frame project-frame-side' />
                  <span className='project-glass project-glass-main' />
                  <span className='project-glass project-glass-side' />
                  <span className='project-floor' />
                </div>
                <p className='project-kicker'>תרחיש עבודה</p>
                <h2>{project.title}</h2>
                <p>{project.desc}</p>
                <dl className='project-proof-list'>
                  <div>
                    <dt>הקשר</dt>
                    <dd>{project.context}</dd>
                  </div>
                  <div>
                    <dt>אתגר</dt>
                    <dd>{project.challenge}</dd>
                  </div>
                  <div>
                    <dt>כיוון פתרון</dt>
                    <dd>{project.solution}</dd>
                  </div>
                  <div>
                    <dt>מה לשלוח</dt>
                    <dd>{project.send}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <CtaBand title='יש לכם פרויקט דומה?' text='שלחו תמונות, תוכניות או מפרט, ונבדוק מה נדרש כדי להתקדם בצורה מקצועית.' />
      </div>
    </main>
  );
}
