import Link from 'next/link';

const links = [
  { href: '/', label: 'ראשי' },
  { href: '/services', label: 'שירותים' },
  { href: '/styles', label: 'סגנונות' },
  { href: '/products', label: 'מוצרים וסדרות' },
  { href: '/projects', label: 'פרויקטים' },
  { href: '/process', label: 'איך מתקדמים' },
  { href: '/professionals', label: 'אזור מקצוענים' },
  { href: '/about', label: 'אודות' },
  { href: '/contact', label: 'צור קשר' },
];

export default function Nav() {
  return (
    <nav className='border-b bg-white'>
      <div className='container-main flex flex-wrap gap-4 py-4'>
        {links.map((link) => (
          <Link key={link.href} href={link.href} className='font-semibold'>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
