import { contact, navItems } from '@/data/siteContent'

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>{contact.businessName}</strong>
        <span>{contact.positioning}</span>
      </div>
      <nav aria-label="קישורי תחתית">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <div>
        <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </div>
      <small>© 2026 כל הזכויות שמורות - אשבל אלומיניום</small>
    </footer>
  )
}
