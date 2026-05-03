import type { Metadata } from 'next';
import { kalilSeries } from '@/data/kalilSeries';

export const metadata: Metadata = { title: 'מוצרים וסדרות', description: 'מידע פרקטי על משפחות מוצרים וסדרות קליל לפרויקטים פרטיים.' };

export default function ProductsPage() {
  return <main className='container-main py-8'><h1 className='text-3xl font-bold'>מוצרים וסדרות</h1><div className='mt-4 grid gap-4 md:grid-cols-2'>{kalilSeries.map((k)=><article key={k.name} className='card'><h2 className='font-bold'>{k.name}</h2><p>{k.exp}</p><p className='mt-2 text-sm'><b>שימוש מתאים:</b> {k.use}</p><p className='text-sm'><b>מה לבדוק:</b> {k.check}</p><a className='btn btn-secondary mt-3' href='/upload'>שליחת תוכניות או תמונות</a></article>)}</div></main>;
}
