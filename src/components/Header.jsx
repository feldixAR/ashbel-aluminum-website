import { useState } from 'react'
import { Menu, MessageCircle, X } from 'lucide-react'
import { asset, contact, navItems } from '@/data/siteContent'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header" aria-label="ניווט ראשי">
      <a className="brand" href="#top" aria-label="אשבל אלומיניום - דף הבית">
        <img src={asset('portfolio/ashbel-logo.webp')} alt="" />
        <span>
          <strong>{contact.businessName}</strong>
          <small>{contact.positioning}</small>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="קישורי האתר">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="header-contact" href={contact.whatsappHref}>
        <MessageCircle data-icon="inline-start" />
        WhatsApp
      </a>

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
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
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
