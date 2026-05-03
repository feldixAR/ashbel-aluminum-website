import type { Metadata } from 'next';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'שירותים',
  description: 'שירותי אלומיניום לבתים פרטיים, וילות ופרויקטים איכותיים.',
};

export default function ServicesPage() {
  return <main className='container-main py-8'><h1 className='text-3xl font-bold'>שירותים</h1><div className='mt-4 grid gap-4 md:grid-cols-2'>{services.map((s)=><article key={s.title} className='card'><h2 className='font-bold'>{s.title}</h2><p>{s.desc}</p></article>)}</div></main>;
}
