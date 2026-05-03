import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'אזור מקצוענים' };

export default function ProfessionalsPage() {
  return <main className='container-main py-8'><h1 className='text-3xl font-bold'>אזור מקצוענים</h1><p className='mt-3'>שלחו תוכניות, מפרטים או תמונות מהשטח, ונבחן את הפרויקט לצורך הכוונה מקצועית ראשונית, בחירת מערכות אלומיניום מתאימות ותיאום המשך עבודה.</p></main>;
}
