import { MessageCircle, Phone } from 'lucide-react'
import { contact } from '@/data/siteContent'

export function MobileActions() {
  return (
    <div className="mobile-sticky-cta" aria-label="פעולות מהירות">
      <a href={contact.whatsappHref}>
        <MessageCircle aria-hidden="true" />
        WhatsApp
      </a>
      <a href={contact.phoneHref}>
        <Phone aria-hidden="true" />
        התקשרות
      </a>
    </div>
  )
}
