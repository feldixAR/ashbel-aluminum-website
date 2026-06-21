import { CalendarCheck, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { contact } from '@/data/siteContent'
import { Reveal } from './Reveal'

export function Contact() {
  return (
    <section className="contact-section" id="contact">
      <Reveal className="contact-panel">
        <div>
          <p className="section-kicker">צור קשר</p>
          <h2>שלחו תוכניות, תמונות או תיאור קצר של העבודה</h2>
          <p>
            אפשר לפנות ב-WhatsApp או במייל. נחזור עם כיוון מקצועי ראשוני ונבין יחד מה
            נדרש לשלב הבא.
          </p>
        </div>
        <div className="contact-actions">
          <Button asChild size="lg" className="primary-action">
            <a href={contact.whatsappHref}>
              <MessageCircle data-icon="inline-start" />
              WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={`mailto:${contact.email}`}>
              <Mail data-icon="inline-start" />
              שליחת מייל
            </a>
          </Button>
        </div>
        <div className="contact-details">
          <span>
            <MapPin aria-hidden="true" />
            {contact.location}
          </span>
          <a href={contact.phoneHref}>
            <Phone aria-hidden="true" />
            {contact.phoneDisplay}
          </a>
          <a href={`mailto:${contact.email}`}>
            <Mail aria-hidden="true" />
            {contact.email}
          </a>
          <span>
            <CalendarCheck aria-hidden="true" />
            {contact.hours}
          </span>
        </div>
      </Reveal>
    </section>
  )
}
