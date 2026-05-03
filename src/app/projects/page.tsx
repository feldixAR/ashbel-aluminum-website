import type { Metadata } from 'next';
import Image from 'next/image';
import { projects } from '@/data/projects';

export const metadata: Metadata = { title: 'פרויקטים', description: 'דוגמאות לפרויקטים באלומיניום לבתים פרטיים ווילות.' };

export default function ProjectsPage() {
  return <main className='container-main py-8'><h1 className='text-3xl font-bold'>פרויקטים</h1><p className='mt-3 text-sm'>TODO: החלפת תמונות placeholder בתמונות מקוריות של פרויקטי אשבל.</p><div className='mt-4 grid gap-4 md:grid-cols-3'>{projects.map((p)=><article key={p.title} className='card'><h2 className='font-bold'>{p.title}</h2><p>{p.desc}</p><Image className='mt-2 rounded-lg' src='/project-placeholder.svg' alt={p.alt} width={800} height={450} /></article>)}</div></main>;
}
