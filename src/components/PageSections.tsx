import Link from 'next/link';
import type { ReactNode } from 'react';
import { site } from '@/data/site';

type CtaProps = {
  title?: string;
  text?: string;
};

export function PageIntro({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: string;
  text: string;
  children?: ReactNode;
}) {
  return (
    <section className='section-shell page-intro'>
      <div>
        <p className='eyebrow'>{eyebrow}</p>
        <h1>{title}</h1>
        <p className='lead'>{text}</p>
      </div>
      {children ? <div className='intro-panel'>{children}</div> : null}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className='section-header'>
      {eyebrow ? <p className='eyebrow'>{eyebrow}</p> : null}
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export function CtaBand({
  title = 'אפשר להתחיל מבדיקה מקצועית ראשונית',
  text = 'שלחו תוכניות, מפרטים, כתב כמויות או תמונות מהשטח, ונכוון אתכם לשלב הבא בצורה מסודרת.',
}: CtaProps) {
  return (
    <section className='cta-band' aria-label='יצירת קשר'>
      <div>
        <p className='eyebrow'>המשך עבודה</p>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className='cta-actions'>
        <Link className='btn btn-primary' href='/upload'>
          שליחת תוכניות או תמונות
        </Link>
        <a className='btn btn-outline' href={site.whatsapp}>
          שליחה בוואטסאפ
        </a>
        <a className='text-link' href={site.phoneHref}>
          {site.phone}
        </a>
      </div>
    </section>
  );
}

export function ArchitecturalVisual({ label = 'מבט אדריכלי על מערכות אלומיניום לבית פרטי' }: { label?: string }) {
  return (
    <div className='architectural-visual' role='img' aria-label={label}>
      <span className='frame frame-a' />
      <span className='frame frame-b' />
      <span className='frame frame-c' />
      <span className='glass-panel glass-a' />
      <span className='glass-panel glass-b' />
      <span className='visual-caption'>תכנון פתחים · מדידה · ייצור · התקנה</span>
    </div>
  );
}
