import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { asset, contact, navItems } from '@/data/siteContent'

export function Header({ currentRoute = '/' }) {
  const [open, setOpen] = useState(false)
  const isActive = (href) => {
    const route = href.replace('#', '')
    return route === '/' ? currentRoute === '/' : currentRoute.startsWith(route)
  }

  return (
    <header className="site-header" aria-label="ניווט ראשי">
      <a className="brand" href="#/" aria-label="אשבל אלומיניום - דף הבית" onClick={() => setOpen(false)}>
        <img src={asset('portfolio/ashbel-logo.webp')} alt="" />
        <span>
          <strong>{contact.businessName}</strong>
          <small>{contact.positioning}</small>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="קישורי האתר">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} aria-current={isActive(item.href) ? 'page' : undefined}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="header-contact" href="#/contact">לקביעת ייעוץ טכני</a>

      <button
        className="mobile-menu-button"
        type="button"
        aria-label={open ? 'סגירת תפריט' : 'פתיחת תפריט'}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      {open ? (
        <nav className="mobile-nav" aria-label="תפריט מובייל">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href={contact.whatsappHref} onClick={() => setOpen(false)}>
            דברו איתנו בוואטסאפ
          </a>
          <a href={contact.phoneHref} onClick={() => setOpen(false)}>
            התקשרו לעמית
          </a>
        </nav>
      ) : null}
    </header>
  )
}
