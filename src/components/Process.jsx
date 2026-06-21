import { asset, processSteps } from '@/data/siteContent'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Process() {
  return (
    <section className="content-section process-section" id="process">
      <SectionHeading
        kicker="תהליך עבודה"
        title="תהליך מסודר שמייצר ביטחון"
        intro="מהרגע ששולחים תוכניות או תמונות ועד התקנה ומסירה, התהליך נשאר פשוט, ברור ומבוסס תיאום."
      />
      <div className="process-layout">
        <Reveal className="process-photo">
          <img
            src={asset('portfolio/sliding-vitrine-balcony.webp')}
            alt="ויטרינת הזזה כהה ביציאה למרפסת"
            loading="lazy"
          />
        </Reveal>
        <div className="process-list">
          {processSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <Reveal className="process-card" key={step.title} delay={index * 0.025}>
                <span className="step-number">{index + 1}</span>
                <Icon aria-hidden="true" />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
