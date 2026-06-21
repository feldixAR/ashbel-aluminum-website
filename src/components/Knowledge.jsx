import { FileText } from 'lucide-react'
import { knowledgeItems } from '@/data/siteContent'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Knowledge() {
  return (
    <section className="content-section knowledge-section" id="knowledge">
      <SectionHeading
        kicker="מרכז ידע"
        title="מידע קצר לפני שמתחילים"
        intro="נקודות שימושיות לבונים פרטיים, קבלנים ואדריכלים לפני תמחור, בחירת מערכת או תיאום מדידה."
      />
      <div className="knowledge-grid">
        {knowledgeItems.map((item, index) => (
          <Reveal className="knowledge-card" key={item.title} delay={index * 0.025}>
            <FileText aria-hidden="true" />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
