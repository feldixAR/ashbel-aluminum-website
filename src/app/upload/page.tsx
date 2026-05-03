import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'שליחת תוכניות ותמונות' };

export default function UploadPage() {
  return <main className='container-main py-8'><h1 className='text-3xl font-bold'>שליחת תוכניות ותמונות</h1><p className='mt-3'>העלו תוכניות, תמונות, מפרטים וכתב כמויות כדי שנוכל לספק הכוונה מקצועית ראשונית.</p><form className='card mt-5 space-y-2'><input className='w-full border p-2 rounded' placeholder='שם מלא'/><input className='w-full border p-2 rounded' placeholder='טלפון'/><textarea className='w-full border p-2 rounded' placeholder='פירוט הפרויקט'></textarea><p className='text-sm'>TODO: חיבור עתידי ל-API קליטת לידים של AshbelOS.</p><div className='flex gap-3'><a className='btn btn-primary' href='mailto:info@ashbel-aluminum.co.il'>שליחה במייל</a><a className='btn btn-secondary' href='https://wa.me/972559607033'>שליחה בוואטסאפ</a></div></form></main>;
}
