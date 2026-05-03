import Link from 'next/link';
const links=[['/','ראשי'],['/services','שירותים'],['/styles','סגנונות'],['/products','מוצרים וסדרות'],['/projects','פרויקטים'],['/process','איך מתקדמים'],['/professionals','אזור מקצוענים'],['/about','אודות'],['/contact','צור קשר']];
export default function Nav(){return <nav className='border-b bg-white'><div className='container-main py-4 flex flex-wrap gap-4'>{links.map(([h,l])=><Link key={h} href={h} className='font-semibold'>{l}</Link>)}</div></nav>}
