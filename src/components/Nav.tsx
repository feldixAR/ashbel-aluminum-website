'use client';

import Link from 'next/link';
import { useState } from 'react';
import { site } from '@/data/site';

const links = [
  { href: '/', label: 'ראשי' },
  { href: '/services', label: 'שירותים' },
  { href: '/products', label: 'מוצרים וסדרות' },
  { href: '/projects', label: 'פרויקטים' },
  { href: '/process', label: 'איך מתקדמים' },
  { href: '/professionals', label: 'אזור מקצוענים' },
  { href: '/contact', label: 'צור קשר' },
];

const secondaryLinks = [
  { href: '/styles', label: 'סגנונות' },
  { href: '/upload', label: 'שליחת חומרים' },
  { href: '/about', label: 'אודות' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className='site-header'>
      <nav className='container-main nav-bar' aria-label='ניווט ראשי'>
        <Link className='brand' href='/' onClick={() => setOpen(false)}>
          <span className='brand-mark' aria-hidden='true'>
            <svg viewBox='0 0 44 44' width='34' height='34' role='presentation' focusable='false'>
              <rect x='5' y='7' width='20' height='30' fill='none' stroke='white' strokeWidth='4' />
              <rect x='25' y='12' width='14' height='20' fill='none' stroke='#d6b36e' strokeWidth='4' />
              <path d='M25 7v30' stroke='rgba(255,255,255,0.62)' strokeWidth='2' />
            </svg>
          </span>
          <span>
            <strong>{site.name}</strong>
            <small>אלומיניום לבתים פרטיים ופרויקטים איכותיים</small>
          </span>
        </Link>

        <div className='desktop-links'>
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className='desktop-actions'>
          <a className='phone-link' href={site.phoneHref}>
            {site.phone}
          </a>
          <Link className='btn btn-primary compact' href='/upload'>
            שליחת תוכניות
          </Link>
        </div>

        <button
          className='menu-button'
          type='button'
          aria-expanded={open}
          aria-controls='mobile-menu'
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden='true'>{open ? '×' : '☰'}</span>
          <span>תפריט</span>
        </button>
      </nav>

      <div id='mobile-menu' className={`mobile-menu ${open ? 'open' : ''}`}>
        <div className='container-main mobile-menu-inner'>
          {[...links, ...secondaryLinks].map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div className='mobile-actions'>
            <Link className='btn btn-primary' href='/upload' onClick={() => setOpen(false)}>
              שליחת תוכניות או תמונות
            </Link>
            <a className='btn btn-outline' href={site.whatsapp} onClick={() => setOpen(false)}>
              שליחה בוואטסאפ
            </a>
            <a className='phone-link' href={site.phoneHref}>
              {site.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
