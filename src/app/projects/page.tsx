import type { Metadata } from 'next';
import { CtaBand, PageIntro, SectionHeader } from '@/components/PageSections';
import { VisualMedia } from '@/components/VisualMedia';
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
          title='סוגי עבודות שבהם כדאי לערב איש אלומיניום מוקדם'
          text='בית בבנייה, שיפוץ, ויטרינה לסלון, עבודה מול אדריכל או קבלן, תריסים והצללה - לכל מצב יש שאלות אחרות של פתחים, מידות, מסילות, זכוכית וגמרים.'
        />

        <section className='section-shell'>
          <SectionHeader title='סוגי עבודות שמומלץ לתאם סביבן פגישה' text='אלו מצבים מעשיים שבהם איש אלומיניום יכול לעזור מוקדם. האיורים בעמוד הם המחשה דקורטיבית בלבד, לא תמונות פרויקט.' />
          <div className='project-proof-list'>
            {projects.map((project) => (
              <article className='proof-case' key={project.title}>
                <VisualMedia image={project.image} label='תמונת המחשה בלבד, לא פרויקט של אשבל' />
                <div className='proof-content'>
                  <p className='eyebrow'>{project.category.title}</p>
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
                  <a className='btn btn-outline' href={`/products/${project.category.slug}`}>
                    פתרונות רלוונטיים
                  </a>
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
