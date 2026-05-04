'use client';

import Link from 'next/link';
import { useState } from 'react';
import { site } from '@/data/site';

const links = [
  { href: '/', label: 'ראשי' },
  { href: '/products', label: 'מוצרים' },
  { href: '/about', label: 'אודות' },
  { href: '/professionals', label: 'אדריכלים' },
  { href: '/contact', label: 'צרו קשר' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className='site-header'>
      <nav className='container-main nav-bar' aria-label='ניווט ראשי'>
        <Link className='brand' href='/' onClick={() => setOpen(false)}>
          <span className='brand-mark' aria-hidden='true'>
            <span className='brand-frame frame-one' />
            <span className='brand-frame frame-two' />
            <span className='brand-cut' />
          </span>
          <span>
            <strong>{site.name}</strong>
            <small>חלונות, ויטרינות ופתרונות אלומיניום לבית</small>
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
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div className='mobile-actions'>
            <Link className='btn btn-primary' href='/upload' onClick={() => setOpen(false)}>
              שליחת תוכניות
            </Link>
            <a className='btn btn-outline' href={site.whatsapp} onClick={() => setOpen(false)}>
              וואטסאפ
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
