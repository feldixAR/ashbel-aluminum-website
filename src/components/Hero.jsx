import { ArrowUpLeft, CalendarCheck, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { asset, contact, hero, trustItems } from '@/data/siteContent'
import { Reveal } from './Reveal'

export function Hero() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-grid">
          <Reveal className="hero-copy">
            <h1>{hero.title}</h1>
            <p className="hero-subtitle">{hero.subtitle}</p>
            <p className="hero-lead">{hero.text}</p>
            <div className="hero-actions" aria-label="פעולות ראשיות">
              <Button asChild size="lg" className="primary-action">
                <a href={contact.whatsappHref}>
                  <MessageCircle data-icon="inline-start" />
                  דברו איתנו בוואטסאפ
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={contact.phoneHref}>
                  התקשרו לעמית
                  <ArrowUpLeft data-icon="inline-end" />
                </a>
              </Button>
            </div>
            <div className="hero-contact-strip">
              <a href={contact.phoneHref}>
                <Phone aria-hidden="true" />
                {contact.phoneDisplay}
              </a>
              <span>
                <MapPin aria-hidden="true" />
                {contact.location}
              </span>
              <span>
                <CalendarCheck aria-hidden="true" />
                ראשון עד חמישי, 08:30-16:30
              </span>
            </div>
          </Reveal>

          <Reveal className="hero-photo" delay={0.05}>
            <img src={asset(`portfolio/${hero.image}`)} alt={hero.alt} width="1200" height="850" />
          </Reveal>
        </div>
      </section>

      <section className="trust-strip" aria-label="תחומי פעילות">
        {trustItems.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>
    </>
  )
}
