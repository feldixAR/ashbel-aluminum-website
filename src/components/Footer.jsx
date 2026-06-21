import { contact, navItems, solutionCategories } from '@/data/siteContent'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <strong>{contact.businessName}</strong>
        <span>{contact.positioning}</span>
        <small>{contact.location} · {contact.hours}</small>
      </div>
      <nav aria-label="קישורי תחתית">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <nav aria-label="פתרונות אלומיניום">
        {solutionCategories.slice(0, 5).map((item) => (
          <a key={item.slug} href={`#/solutions/${item.slug}`}>
            {item.title}
          </a>
        ))}
      </nav>
      <div className="footer-contact">
        <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        <a href={contact.whatsappHref}>WhatsApp</a>
      </div>
      <small className="footer-rights">© 2026 כל הזכויות שמורות - אשבל אלומיניום</small>
    </footer>
  )
}
