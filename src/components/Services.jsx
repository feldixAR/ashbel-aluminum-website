import { services } from '@/data/siteContent'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Services() {
  return (
    <section className="content-section services-section" id="services">
      <SectionHeading
        kicker="שירותים"
        title="פתרונות אלומיניום לפי צורך ותוכנית"
        intro="שירותים מעשיים וברורים, בלי להעמיס קטלוג טכני. כל פרויקט מתחיל מהבנת הפתח, השימוש והסגנון הרצוי."
      />
      <div className="services-grid">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <Reveal className="service-card" key={service.title} delay={index * 0.025}>
              <Icon aria-hidden="true" />
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
