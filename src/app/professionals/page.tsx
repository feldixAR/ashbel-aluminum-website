import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'אזור מקצוענים', description: 'עמוד ייעודי לאדריכלים, קבלנים, יזמים ומפקחים לשליחת חומרים מקצועיים.' };

export default function ProfessionalsPage() {
  return (
    <main className='container-main py-8'>
      <h1 className='text-3xl font-bold'>אזור מקצוענים</h1>
      <p className='mt-3'>שלחו תוכניות, מפרטים או תמונות מהשטח, ונבחן את הפרויקט לצורך הכוונה מקצועית ראשונית, בחירת מערכות אלומיניום מתאימות ותיאום המשך עבודה.</p>
      <ul className='mt-4 list-disc me-5'>
        <li>תוכניות אדריכליות</li><li>תמונות שטח</li><li>מפרטים וכתב כמויות</li><li>בקשת ייעוץ טכני</li><li>בקשת הצעת מחיר מסודרת לאחר בחינה ומדידה</li><li>בקשת תיאום מדידה</li>
      </ul>
    </main>
  );
}
