'use client';

import Image from 'next/image';
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

function PhoneIcon() { return <svg viewBox='0 0 24 24' aria-hidden='true'><path d='M6.6 10.8c1.5 3 3.8 5.3 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.3 1.3.4 2.6.6 4 .6.7 0 1.2.5 1.2 1.2v3.5c0 .7-.5 1.2-1.2 1.2C10.8 21.4 2.6 13.2 2.6 3.4c0-.7.5-1.2 1.2-1.2h3.5c.7 0 1.2.5 1.2 1.2 0 1.4.2 2.7.6 4 .1.4 0 .9-.3 1.2l-2.2 2.2Z' /></svg>; }
function WhatsAppIcon() { return <svg viewBox='0 0 24 24' aria-hidden='true'><path d='M12 2.4a9.4 9.4 0 0 0-8.1 14.1L2.8 21l4.6-1.1A9.4 9.4 0 1 0 12 2.4Zm0 1.8a7.6 7.6 0 1 1-3.9 14.1l-.3-.2-2.4.6.6-2.3-.2-.3A7.6 7.6 0 0 1 12 4.2Zm-3.1 3.9c-.2 0-.5.1-.7.3-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 3 4.4 4 .7.3 1.2.4 1.6.5.7.2 1.3.1 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3 0-.1-.2-.2-.5-.4l-1.8-.9c-.3-.1-.5-.2-.7.2l-.8 1c-.1.2-.3.2-.6.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.6-1.5-1.9-.1-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.5-.7-.5h-.6Z' /></svg>; }

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className='site-header'>
      <nav className='container-main nav-bar' aria-label='ניווט ראשי'>
        <Link className='brand ashbel-logo' href='/' onClick={() => setOpen(false)}>
          <Image src='/images/ashbel-logo.svg' alt='לוגו אשבל אלומיניום' width={720} height={180} priority />
        </Link>
        <div className='desktop-links'>{links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}</div>
        <div className='desktop-actions'>
          <a className='icon-action' href={site.phoneHref} aria-label='התקשרו'><PhoneIcon /></a>
          <a className='icon-action whatsapp' href={site.whatsapp} aria-label='וואטסאפ'><WhatsAppIcon /></a>
          <Link className='btn btn-primary compact' href='/upload'>שליחת תוכניות</Link>
        </div>
        <div className='mobile-top-actions'>
          <a className='icon-action' href={site.phoneHref} aria-label='טלפון'><PhoneIcon /></a>
          <a className='icon-action whatsapp' href={site.whatsapp} aria-label='וואטסאפ'><WhatsAppIcon /></a>
        </div>
        <button className='menu-button' type='button' aria-expanded={open} aria-controls='mobile-menu' onClick={() => setOpen((v) => !v)}>
          <span aria-hidden='true'>{open ? '×' : '☰'}</span>
        </button>
      </nav>
      <div id='mobile-menu' className={`mobile-menu ${open ? 'open' : ''}`}>
        <div className='container-main mobile-menu-inner'>
          <div className='mobile-menu-head'>
            <Image src='/images/ashbel-logo.svg' alt='לוגו אשבל אלומיניום' width={300} height={80} />
            <button type='button' className='mobile-close' onClick={() => setOpen(false)}>סגירה</button>
          </div>
          {links.map((l) => <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>)}
          <div className='mobile-actions'>
            <Link className='btn btn-primary' href='/upload' onClick={() => setOpen(false)}>שליחת תוכניות</Link>
            <a className='btn btn-whatsapp' href={site.whatsapp} onClick={() => setOpen(false)}>וואטסאפ</a>
            <a className='btn btn-outline' href={site.phoneHref} onClick={() => setOpen(false)}>טלפון</a>
          </div>
          <p className='mobile-trust'>מתקין מורשה קליל · עבודה מול תוכניות ומידות</p>
        </div>
      </div>
    </header>
  );
}
