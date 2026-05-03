import type { Metadata } from 'next';
import { kalilSeries } from '@/data/kalilSeries';
export const metadata: Metadata = { title: 'מוצרים וסדרות' };
export default function ProductsPage(){return <main className='container-main py-8'><h1 className='text-3xl font-bold'>מוצרים וסדרות</h1><div className='grid md:grid-cols-2 gap-4 mt-4'>{kalilSeries.map(k=><article key={k.name} className='card'><h2 className='font-bold'>{k.name}</h2><p>{k.exp}</p><p className='text-sm mt-2'><b>שימוש מתאים:</b> {k.use}</p><p className='text-sm'><b>מה לבדוק:</b> {k.check}</p></article>)}</div></main>}
