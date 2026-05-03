import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'צור קשר' };
export default function ContactPage(){return <main className='container-main py-8'><h1 className='text-3xl font-bold'>צור קשר</h1><p className='mt-3'>טלפון: 055-960-7033</p><div className='mt-3 flex gap-3'><a className='btn btn-primary' href='tel:0559607033'>שיחה עם איש מקצוע</a><a className='btn btn-secondary' href='https://wa.me/972559607033'>שליחה בוואטסאפ</a></div></main>}
