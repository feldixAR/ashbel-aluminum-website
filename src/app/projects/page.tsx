import type { Metadata } from 'next';
import Image from 'next/image';
import { CtaBand, PageIntro, SectionHeader } from '@/components/PageSections';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'פרויקטים ודוגמאות תרחיש',
  description: 'דוגמאות תרחיש לעבודות אלומיניום בבית פרטי, וילה ושיפוץ איכותי, עד להוספת תמונות פרויקט מקוריות של אשבל.',
};

export default function ProjectsPage() {
  return (
    <main>
      <div className='container-main'>
        <PageIntro
          eyebrow='פרויקטים'
          title='מציגים רק מה שאפשר להציג באחריות'
          text='עד להעלאת תמונות מקוריות של פרויקטי אשבל, העמוד מציג תרחישי עבודה אמיתיים מבחינת צורך מקצועי, בלי להמציא לקוחות, כתובות, תעודות או פרטי ביצוע שלא אומתו.'
        />

        <section className='section-shell'>
          <SectionHeader title='דוגמאות תרחיש' text='התרחישים עוזרים להבין איך ניגשים לפרויקט אלומיניום ומה כדאי לשלוח לבדיקה ראשונית.' />
          <div className='grid-3'>
            {projects.map((project) => (
              <article className='project-card' key={project.title}>
                <div className='image-frame'>
                  <Image src='/project-placeholder.svg' alt={project.alt} width={800} height={450} />
                </div>
                <h2>{project.title}</h2>
                <p>{project.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <CtaBand title='יש לכם פרויקט דומה?' text='שלחו תמונות, תוכניות או מפרט, ונבדוק מה נדרש כדי להתקדם בצורה מקצועית.' />
      </div>
    </main>
  );
}
