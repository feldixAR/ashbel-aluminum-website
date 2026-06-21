import { asset, galleryImages } from '@/data/siteContent'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Gallery() {
  return (
    <section className="content-section gallery-section" id="gallery">
      <SectionHeading
        kicker="תיק עבודות"
        title="תמונות נבחרות מהשטח"
        intro="גלריה נקייה של עבודות אלומיניום נבחרות. ללא שמות קבצים, מספרים או סיפורי פרויקט שלא אומתו."
      />
      <div className="gallery-grid">
        {galleryImages.map(([image, alt], index) => (
          <Reveal className="gallery-card" key={image} delay={index * 0.018}>
            <img src={asset(`portfolio/${image}`)} alt={alt} loading="lazy" />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
