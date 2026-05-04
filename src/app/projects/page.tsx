import type { Metadata } from 'next';
import { CtaBand, PageIntro, SectionHeader } from '@/components/PageSections';
import { projects } from '@/data/projects';
import './projects.css';
import './project-proof.css';

export const metadata: Metadata = {
  title: 'דוגמאות מהשטח',
  description: 'דוגמאות מצבים בעבודות אלומיניום לבית פרטי, שיפוץ, ויטרינה, עבודה מול אדריכל או קבלן והתאמת תריסים והצללה.',
};

export default function ProjectsPage() {
  return (
    <main>
      <div className='container-main projects-page'>
        <PageIntro
          eyebrow='דוגמאות מהשטח'
          title='מצבים נפוצים שבהם כדאי לערב איש אלומיניום מוקדם'
          text='בית בבנייה, שיפוץ, ויטרינה לסלון, עבודה מול אדריכל או קבלן, תריסים והצללה - לכל מצב יש שאלות אחרות של פתחים, מידות, מסילות, זכוכית וגמרים.'
        />

        <section className='section-shell'>
          <SectionHeader title='סוגי עבודות שמומלץ לתאם סביבן פגישה' text='אלו מצבים מעשיים שבהם איש אלומיניום יכול לעזור מוקדם. האיורים בעמוד הם המחשה דקורטיבית בלבד, לא תמונות פרויקט.' />
          <div className='project-proof-list'>
            {projects.map((project, index) => (
              <article className='proof-case' key={project.title}>
                <div className={`proof-visual proof-visual-${(index % 3) + 1}`} aria-label={project.alt} role='img'>
                  <span />
                  <span />
                  <span />
                </div>
                <div className='proof-content'>
                  <p className='eyebrow'>דוגמה {index + 1}</p>
                  <h2>{project.title}</h2>
                  <p>{project.desc}</p>
                  <dl>
                    <div>
                      <dt>המצב</dt>
                      <dd>{project.context}</dd>
                    </div>
                    <div>
                      <dt>נקודות לתיאום</dt>
                      <dd>{project.challenge}</dd>
                    </div>
                    <div>
                      <dt>כיוון עבודה</dt>
                      <dd>{project.solution}</dd>
                    </div>
                    <div>
                      <dt>מה להכין לפגישה</dt>
                      <dd>{project.send}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </section>

        <CtaBand title='יש לכם מצב דומה בבית או באתר?' text='העלו תוכנית אלומיניום, תוכנית אדריכלית, מידות או רשימת פתחים, ונחזור לתיאום פגישה והמשך טיפול מסודר.' />
      </div>
    </main>
  );
}
