import type { Metadata } from 'next';
import { projects } from '@/data/projects';
export const metadata: Metadata = { title: 'פרויקטים' };
export default function ProjectsPage(){return <main className='container-main py-8'><h1 className='text-3xl font-bold'>פרויקטים</h1><div className='grid md:grid-cols-3 gap-4 mt-4'>{projects.map(p=><article key={p.title} className='card'><h2 className='font-bold'>{p.title}</h2><p>{p.desc}</p><img className='mt-2 rounded-lg' src='https://placehold.co/800x450' alt={p.alt}/></article>)}</div></main>}
