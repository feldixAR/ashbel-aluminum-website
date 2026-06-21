import { CheckCircle2 } from 'lucide-react'
import { asset, about } from '@/data/siteContent'
import { Reveal } from './Reveal'

export function About() {
  return (
    <section className="content-section about-section" id="about">
      <div className="about-layout">
        <Reveal className="about-copy">
          <p className="section-kicker">על החברה</p>
          <h2>עבודת אלומיניום מדויקת, מהתוכנית ועד השטח</h2>
          <p>{about.intro}</p>
          <div className="about-points">
            {about.points.map((point) => (
              <div className="about-point" key={point.title}>
                <CheckCircle2 aria-hidden="true" />
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="about-photo" delay={0.05}>
          <img src={asset(`portfolio/${about.image}`)} alt={about.alt} loading="lazy" />
        </Reveal>
      </div>
    </section>
  )
}
