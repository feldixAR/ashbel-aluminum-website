import type { Metadata } from 'next';
import { styles } from '@/data/styles';

export const metadata: Metadata = { title: 'סגנונות', description: 'סגנונות תכנון וביצוע למערכות אלומיניום בבתים פרטיים.' };

export default function StylesPage() {
  return <main className='container-main py-8'><h1 className='text-3xl font-bold'>סגנונות</h1><div className='mt-4 grid gap-4 md:grid-cols-3'>{styles.map((s)=><article key={s.title} className='card'><h2 className='font-bold'>{s.title}</h2><p>{s.desc}</p></article>)}</div></main>;
}
