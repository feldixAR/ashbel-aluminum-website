import { useEffect, useState } from 'react'
import { articles } from './content/articles'
import { galleryIntro, galleryItems, missingImageNeeds } from './content/gallery'
import { contactContent, homeAbout, homeContent, pages, sharedCta } from './content/pages'
import { processIntro, processSteps, solutions, solutionsIntro, trustItems } from './content/solutions'
import { defaultSeo, footerNavItems, navItems, routes, siteInfo, whatsappMessages } from './content/siteInfo'
import './ContentEditor.css'

const editorSections = [
  ['home', 'ראשי'],
  ['products', 'מוצרים'],
  ['projects', 'פרויקטים'],
  ['process', 'תהליך'],
  ['fieldNotes', 'מהשטח'],
  ['articles', 'מאמרים'],
  ['contact', 'צור קשר'],
  ['settings', 'הגדרות אתר'],
  ['publish', 'בדיקה ופרסום'],
]

const projectCategories = ['הכל', 'מודרני', 'כפרי / בלגי', 'הצללה', 'פרגולות', 'פתרונות היקפיים', 'ביצוע / מפעל']
function ContentEditor() {
  const [activeSection, setActiveSection] = useState('home')
  const [content, setContent] = useState(() => buildInitialContent())
  const [media, setMedia] = useState([])
  const [status, setStatus] = useState({ type: 'info', text: 'עורך מקומי. השינויים נשמרים רק במחשב הזה.' })
  const [validation, setValidation] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(0)
  const [selectedProject, setSelectedProject] = useState(0)
  const [selectedStep, setSelectedStep] = useState(0)
  const [selectedArticle, setSelectedArticle] = useState(0)

  useEffect(() => {
    fetch('/__ashbel-editor/media')
      .then((response) => response.json())
      .then((data) => setMedia(data.images || []))
      .catch(() => setStatus({ type: 'error', text: 'לא ניתן לטעון את רשימת התמונות המקומית.' }))
  }, [])

  const selectedProductItem = content.solutions[selectedProduct] || content.solutions[0]
  const selectedProjectItem = content.galleryItems[selectedProject] || content.galleryItems[0]
  const selectedStepItem = content.processSteps[selectedStep] || content.processSteps[0]
  const selectedArticleItem = content.articles[selectedArticle] || content.articles[0]

  const update = (path, value) => {
    setContent((current) => {
      const next = setPath(current, path, value)
      if (path[0] === 'articles') next._articlesChanged = true
      return next
    })
    setValidation(null)
  }

  const validate = async () => {
    const result = await postJson('/__ashbel-editor/validate', { content })
    setValidation(result)
    setStatus(result.ok ? { type: 'success', text: 'הבדיקה עברה' } : { type: 'error', text: 'יש שגיאות לפני פרסום' })
    return result
  }

  const save = async () => {
    setStatus({ type: 'info', text: 'שומר...' })
    const result = await postJson('/__ashbel-editor/save', { content })
    if (!result.ok) {
      setValidation(result)
      setStatus({ type: 'error', text: result.message || 'יש שגיאות לפני שמירה' })
      return
    }
    setStatus({ type: 'success', text: 'נשמר בהצלחה' })
  }

  const publishCheck = async () => {
    setStatus({ type: 'info', text: 'מריץ בדיקת פרסום: תוכן, lint ו-build...' })
    const result = await postJson('/__ashbel-editor/publish-check', { content })
    setStatus(result.ok ? { type: 'success', text: 'build עבר. אפשר לפרסם דרך Git.' } : { type: 'error', text: 'יש שגיאות לפני פרסום' })
    setValidation({ ok: result.ok, issues: result.ok ? [] : [{ message: result.output || 'בדיקת פרסום נכשלה', path: 'publish' }], warnings: [] })
  }

  const openPreview = () => window.open('#/', '_blank', 'noopener,noreferrer')

  const renderSection = () => {
    if (activeSection === 'home') {
      return (
        <EditorPanel title="ראשי">
          <Field label="Hero title" value={content.pages[routes.home].hero.title} onChange={(value) => update(['pages', routes.home, 'hero', 'title'], value)} required />
          <Field label="Hero subtitle" value={content.pages[routes.home].hero.subtitle} onChange={(value) => update(['pages', routes.home, 'hero', 'subtitle'], value)} required />
          <TextArea label="טקסט תומך" value={content.pages[routes.home].hero.text} onChange={(value) => update(['pages', routes.home, 'hero', 'text'], value)} />
          <ImageField label="תמונת Hero ראשית" value={content.pages[routes.home].hero.image} alt={content.pages[routes.home].hero.alt} media={media} folder="hero" onImage={(value) => update(['pages', routes.home, 'hero', 'image'], value)} onAlt={(value) => update(['pages', routes.home, 'hero', 'alt'], value)} onUpload={(file, folder) => uploadImage(file, folder, setMedia, setStatus, (image) => update(['pages', routes.home, 'hero', 'image'], image))} />
          <Field label="כפתור ראשי" value={content.pages[routes.home].hero.primaryCtaLabel || content.homeContent.heroPrimaryCtaLabel} onChange={(value) => update(['pages', routes.home, 'hero', 'primaryCtaLabel'], value)} required />
          <Field label="יעד כפתור ראשי" value={content.pages[routes.home].hero.primaryCtaTarget || content.homeContent.heroPrimaryCtaTarget} onChange={(value) => update(['pages', routes.home, 'hero', 'primaryCtaTarget'], value)} helper="whatsapp / phone / email / route כמו /פרויקטים" />
          <Field label="כפתור משני" value={content.pages[routes.home].hero.secondaryCtaLabel || content.homeContent.heroSecondaryCtaLabel} onChange={(value) => update(['pages', routes.home, 'hero', 'secondaryCtaLabel'], value)} required />
          <Field label="יעד כפתור משני" value={content.pages[routes.home].hero.secondaryCtaTarget || content.homeContent.heroSecondaryCtaTarget} onChange={(value) => update(['pages', routes.home, 'hero', 'secondaryCtaTarget'], value)} />
          <StringList title="שורת אמון" items={content.trustItems} onChange={(items) => update(['trustItems'], items)} />
          <Field label="כותרת פרויקטים בדף הבית" value={content.homeContent.projectsPreviewTitle} onChange={(value) => update(['homeContent', 'projectsPreviewTitle'], value)} />
          <TextArea label="טקסט פרויקטים בדף הבית" value={content.homeContent.projectsPreviewText} onChange={(value) => update(['homeContent', 'projectsPreviewText'], value)} />
          <Field label="כותרת על החברה בדף הבית" value={content.homeAbout.title} onChange={(value) => update(['homeAbout', 'title'], value)} />
          <TextArea label="טקסט על החברה בדף הבית" value={content.homeAbout.text} onChange={(value) => update(['homeAbout', 'text'], value)} />
          <Field label="כותרת מהשטח בדף הבית" value={content.homeContent.fieldNotesPreviewTitle} onChange={(value) => update(['homeContent', 'fieldNotesPreviewTitle'], value)} />
          <TextArea label="טקסט מהשטח בדף הבית" value={content.homeContent.fieldNotesPreviewText} onChange={(value) => update(['homeContent', 'fieldNotesPreviewText'], value)} />
        </EditorPanel>
      )
    }

    if (activeSection === 'products') {
      const productPath = ['solutions', selectedProduct]
      return (
        <EditorPanel title="מוצרים">
          <Picker items={content.solutions} selected={selectedProduct} onSelect={setSelectedProduct} labelKey="title" />
          {selectedProductItem ? (
            <>
              <Field label="כותרת" value={selectedProductItem.title} onChange={(value) => update([...productPath, 'title'], value)} required />
              <Field label="Slug" value={selectedProductItem.slug} onChange={(value) => update([...productPath, 'slug'], value)} helper="לא לשנות בלי סיבה. אם משתנה, העורך ישמור את הישן כתאימות." required />
              <TextArea label="פתיח" value={selectedProductItem.text} onChange={(value) => update([...productPath, 'text'], value)} required />
              <NumberField label="סדר תצוגה" value={selectedProductItem.order} onChange={(value) => update([...productPath, 'order'], value)} />
              <Toggle label="להציג בדף הבית" checked={selectedProductItem.showOnHome !== false} onChange={(value) => update([...productPath, 'showOnHome'], value)} />
              <ImageField label="תמונת מוצר ראשית" value={selectedProductItem.image} alt={selectedProductItem.alt} media={media} folder={`products/${folderForProduct(selectedProductItem.id)}`} onImage={(value) => update([...productPath, 'image'], value)} onAlt={(value) => update([...productPath, 'alt'], value)} onUpload={(file, folder) => uploadImage(file, folder, setMedia, setStatus, (image) => update([...productPath, 'image'], image))} />
              <StringList title="מה זה כולל" items={selectedProductItem.includes || []} onChange={(items) => update([...productPath, 'includes'], items)} />
              <StringList title="מה חשוב לבדוק" items={selectedProductItem.checks || []} onChange={(items) => update([...productPath, 'checks'], items)} />
              <ProductOptionsList title="תתי־אפשרויות בעולם המוצר" items={selectedProductItem.options || []} media={media} folder={`products/${folderForProduct(selectedProductItem.id)}`} onChange={(items) => update([...productPath, 'options'], items)} onUpload={(file, folder, done) => uploadImage(file, folder, setMedia, setStatus, done)} />
              <ImageList title="תמונות לדף מוצר" items={selectedProductItem.gallery || []} media={media} folder={`products/${folderForProduct(selectedProductItem.id)}`} onChange={(items) => update([...productPath, 'gallery'], items)} onUpload={(file, folder, done) => uploadImage(file, folder, setMedia, setStatus, done)} />
            </>
          ) : null}
        </EditorPanel>
      )
    }

    if (activeSection === 'projects') {
      const projectPath = ['galleryItems', selectedProject]
      return (
        <EditorPanel title="פרויקטים">
          <div className="editor-inline-actions">
            <button type="button" onClick={() => addProject(content, setContent, setSelectedProject)}>הוספת פרויקט</button>
            <button type="button" className="danger" onClick={() => removeAt(['galleryItems'], selectedProject, setContent, setSelectedProject)}>מחיקת פרויקט</button>
          </div>
          <Picker items={content.galleryItems} selected={selectedProject} onSelect={setSelectedProject} labelKey="title" />
          {selectedProjectItem ? (
            <>
              <Field label="שם פנימי לניהול" value={selectedProjectItem.internalLabel || selectedProjectItem.title || ''} onChange={(value) => update([...projectPath, 'internalLabel'], value)} helper="לא מוצג באתר הציבורי." />
              <Field label="כותרת ציבורית קצרה" value={selectedProjectItem.title || ''} onChange={(value) => update([...projectPath, 'title'], value)} />
              <SelectField label="קטגוריה" value={selectedProjectItem.category || 'מודרני'} options={projectCategories.filter((item) => item !== 'הכל')} onChange={(value) => update([...projectPath, 'category'], value)} />
              <NumberField label="סדר תצוגה" value={selectedProjectItem.order} onChange={(value) => update([...projectPath, 'order'], value)} />
              <Toggle label="מוצג בדף הבית" checked={selectedProjectItem.showOnHome !== false} onChange={(value) => update([...projectPath, 'showOnHome'], value)} />
              <Toggle label="מסומן כחשוב" checked={Boolean(selectedProjectItem.featured)} onChange={(value) => update([...projectPath, 'featured'], value)} />
              <ImageField label="תמונת פרויקט" value={selectedProjectItem.image} alt={selectedProjectItem.alt} media={media} folder="projects" onImage={(value) => update([...projectPath, 'image'], value)} onAlt={(value) => update([...projectPath, 'alt'], value)} onUpload={(file, folder) => uploadImage(file, folder, setMedia, setStatus, (image) => update([...projectPath, 'image'], image))} />
            </>
          ) : null}
        </EditorPanel>
      )
    }

    if (activeSection === 'process') {
      const stepPath = ['processSteps', selectedStep]
      return (
        <EditorPanel title="תהליך">
          <Field label="כותרת אזור התהליך" value={content.processIntro.title} onChange={(value) => update(['processIntro', 'title'], value)} />
          <TextArea label="פתיח אזור התהליך" value={content.processIntro.subtitle} onChange={(value) => update(['processIntro', 'subtitle'], value)} />
          <Picker items={content.processSteps} selected={selectedStep} onSelect={setSelectedStep} labelKey="title" />
          {selectedStepItem ? (
            <>
              <Field label="כותרת שלב" value={selectedStepItem.title} onChange={(value) => update([...stepPath, 'title'], value)} required />
              <TextArea label="טקסט שלב" value={selectedStepItem.text} onChange={(value) => update([...stepPath, 'text'], value)} required />
              <NumberField label="סדר שלב" value={selectedStepItem.order} onChange={(value) => update([...stepPath, 'order'], value)} />
              <ImageList title="תמונות לשלב" items={selectedStepItem.images || [{ image: selectedStepItem.image, alt: selectedStepItem.alt, order: 1, primary: true }]} media={media} folder="process" onChange={(items) => update([...stepPath, 'images'], items)} onUpload={(file, folder, done) => uploadImage(file, folder, setMedia, setStatus, done)} />
            </>
          ) : null}
        </EditorPanel>
      )
    }

    if (activeSection === 'fieldNotes') {
      return (
        <EditorPanel title="מהשטח">
          <Field label="שם העמוד" value={content.pages[routes.knowledge].title} onChange={(value) => update(['pages', routes.knowledge, 'title'], value)} helper="להשאיר: מהשטח" />
          <Field label="כותרת Hero" value={content.pages[routes.knowledge].hero.title} onChange={(value) => update(['pages', routes.knowledge, 'hero', 'title'], value)} />
          <TextArea label="פתיח Hero" value={content.pages[routes.knowledge].hero.subtitle} onChange={(value) => update(['pages', routes.knowledge, 'hero', 'subtitle'], value)} />
          <ImageField label="תמונת Hero" value={content.pages[routes.knowledge].hero.image} alt={content.pages[routes.knowledge].hero.alt} media={media} folder="articles" onImage={(value) => update(['pages', routes.knowledge, 'hero', 'image'], value)} onAlt={(value) => update(['pages', routes.knowledge, 'hero', 'alt'], value)} onUpload={(file, folder) => uploadImage(file, folder, setMedia, setStatus, (image) => update(['pages', routes.knowledge, 'hero', 'image'], image))} />
        </EditorPanel>
      )
    }

    if (activeSection === 'articles') {
      const articlePath = ['articles', selectedArticle]
      return (
        <EditorPanel title="מאמרים">
          <Picker items={content.articles} selected={selectedArticle} onSelect={setSelectedArticle} labelKey="title" />
          {selectedArticleItem ? (
            <>
              <Field label="כותרת" value={selectedArticleItem.title} onChange={(value) => update([...articlePath, 'title'], value)} required />
              <Field label="Slug" value={selectedArticleItem.slug} onChange={() => {}} readOnly helper="לא משנים slug של מאמרים קיימים." />
              <TextArea label="פתיח" value={selectedArticleItem.description} onChange={(value) => update([...articlePath, 'description'], value)} required />
              <NumberField label="סדר תצוגה" value={selectedArticleItem.order} onChange={(value) => update([...articlePath, 'order'], value)} />
              <Toggle label="להציג בדף הבית" checked={selectedArticleItem.featured !== false} onChange={(value) => update([...articlePath, 'featured'], value)} />
              <ImageField label="תמונת Hero למאמר" value={selectedArticleItem.image} alt={selectedArticleItem.alt} media={media} folder="articles" onImage={(value) => update([...articlePath, 'image'], value)} onAlt={(value) => update([...articlePath, 'alt'], value)} onUpload={(file, folder) => uploadImage(file, folder, setMedia, setStatus, (image) => update([...articlePath, 'image'], image))} />
              <ArticleSections article={selectedArticleItem} onChange={(sections) => update([...articlePath, 'sections'], sections)} media={media} />
            </>
          ) : null}
        </EditorPanel>
      )
    }

    if (activeSection === 'contact') {
      return (
        <EditorPanel title="צור קשר">
          <Field label="טלפון" value={content.siteInfo.phone} onChange={(value) => update(['siteInfo', 'phone'], value)} required />
          <Field label="טלפון להצגה" value={content.siteInfo.phoneDisplay} onChange={(value) => update(['siteInfo', 'phoneDisplay'], value)} />
          <Field label="WhatsApp" value={content.siteInfo.whatsapp || content.siteInfo.phone} onChange={(value) => update(['siteInfo', 'whatsapp'], value)} />
          <Field label="מייל" value={content.siteInfo.email} onChange={(value) => update(['siteInfo', 'email'], value)} required />
          <Field label="אזור" value={content.siteInfo.serviceArea} onChange={(value) => update(['siteInfo', 'serviceArea'], value)} />
          <Field label="שעות פעילות" value={content.siteInfo.hours} onChange={(value) => update(['siteInfo', 'hours'], value)} />
          <Field label="כותרת עמוד צור קשר" value={content.pages[routes.contact].hero.title} onChange={(value) => update(['pages', routes.contact, 'hero', 'title'], value)} />
          <TextArea label="פתיח צור קשר" value={content.pages[routes.contact].hero.subtitle} onChange={(value) => update(['pages', routes.contact, 'hero', 'subtitle'], value)} />
          <ImageField label="תמונת צור קשר" value={content.pages[routes.contact].hero.image} alt={content.pages[routes.contact].hero.alt} media={media} folder="contact" onImage={(value) => update(['pages', routes.contact, 'hero', 'image'], value)} onAlt={(value) => update(['pages', routes.contact, 'hero', 'alt'], value)} onUpload={(file, folder) => uploadImage(file, folder, setMedia, setStatus, (image) => update(['pages', routes.contact, 'hero', 'image'], image))} />
          <StringList title="סוגי פנייה" items={content.contactContent.inquiryTypes} onChange={(items) => update(['contactContent', 'inquiryTypes'], items)} />
          <StringList title="מה כדאי לשלוח" items={content.contactContent.whatToSend} onChange={(items) => update(['contactContent', 'whatToSend'], items)} />
        </EditorPanel>
      )
    }

    if (activeSection === 'settings') {
      return (
        <EditorPanel title="הגדרות אתר">
          <Field label="שם העסק" value={content.siteInfo.name} onChange={(value) => update(['siteInfo', 'name'], value)} required />
          <Field label="שם קצר" value={content.siteInfo.shortName} onChange={(value) => update(['siteInfo', 'shortName'], value)} />
          <Field label="שורת מיצוב" value={content.siteInfo.positioning} onChange={(value) => update(['siteInfo', 'positioning'], value)} />
          <TextArea label="תיאור כללי" value={content.siteInfo.description} onChange={(value) => update(['siteInfo', 'description'], value)} />
          <Field label="כותרת SEO ברירת מחדל" value={content.defaultSeo.title} onChange={(value) => update(['defaultSeo', 'title'], value)} />
          <TextArea label="תיאור SEO ברירת מחדל" value={content.defaultSeo.description} onChange={(value) => update(['defaultSeo', 'description'], value)} />
          <div className="editor-help editor-wide">
            ה־CTA הבא הוא ברירת המחדל של כל האתר. מומלץ לשנות אותו כאן בלבד ולא ליצור ניסוח שונה לכל מוצר או עמוד.
          </div>
          <Field label="כותרת CTA כללית" value={content.sharedCta.title} onChange={(value) => update(['sharedCta', 'title'], value)} required />
          <TextArea label="טקסט CTA כללי" value={content.sharedCta.text} onChange={(value) => update(['sharedCta', 'text'], value)} required />
          <Field label="כפתור וואטסאפ" value={content.sharedCta.primaryButton} onChange={(value) => update(['sharedCta', 'primaryButton'], value)} required />
          <Field label="כפתור טלפון" value={content.sharedCta.phoneButton} onChange={(value) => update(['sharedCta', 'phoneButton'], value)} required />
          <Field label="כפתור מייל" value={content.sharedCta.emailButton} onChange={(value) => update(['sharedCta', 'emailButton'], value)} required />
          <Field label="כפתור קצר ראשי" value={content.sharedCta.shortPrimaryLabel} onChange={(value) => update(['sharedCta', 'shortPrimaryLabel'], value)} required />
          <Field label="כפתור קצר משני" value={content.sharedCta.shortSecondaryLabel} onChange={(value) => update(['sharedCta', 'shortSecondaryLabel'], value)} required />
          <Field label="יעד כפתור קצר משני" value={content.sharedCta.shortSecondaryTarget} onChange={(value) => update(['sharedCta', 'shortSecondaryTarget'], value)} helper="בדרך כלל להשאיר: /פרויקטים" />
          <Field label="טקסט תחתית" value={content.siteInfo.copyright} onChange={(value) => update(['siteInfo', 'copyright'], value)} />
          <ImageField label="לוגו" value={content.siteInfo.logo} alt={content.siteInfo.logoAlt} media={media} folder="site" onImage={(value) => update(['siteInfo', 'logo'], value)} onAlt={(value) => update(['siteInfo', 'logoAlt'], value)} onUpload={(file, folder) => uploadImage(file, folder, setMedia, setStatus, (image) => update(['siteInfo', 'logo'], image))} />
        </EditorPanel>
      )
    }

    return (
      <EditorPanel title="בדיקה ופרסום">
        <p className="editor-help">הסדר המומלץ: שמירה, תצוגה מקדימה, בדיקה, ואז פרסום דרך Git רק אם הכל עבר.</p>
        <div className="publish-steps">
          <button type="button" onClick={validate}>בדיקת תוכן</button>
          <button type="button" onClick={publishCheck}>בדיקת פרסום מלאה</button>
          <button type="button" onClick={openPreview}>תצוגה מקדימה</button>
        </div>
        <ValidationBox validation={validation} />
      </EditorPanel>
    )
  }

  return (
    <div className="content-editor" dir="rtl">
      <aside className="editor-sidebar">
        <strong>עורך תוכן אשבל</strong>
        <nav>
          {editorSections.map(([key, label]) => (
            <button key={key} type="button" className={activeSection === key ? 'active' : ''} onClick={() => setActiveSection(key)}>
              {label}
            </button>
          ))}
        </nav>
      </aside>
      <section className="editor-main">
        <div className="editor-topbar">
          <div>
            <h1>עורך תוכן מקומי</h1>
            <p>העיצוב נשאר קבוע. כאן עורכים טקסטים, תמונות, alt, סדר והצגה.</p>
          </div>
          <div className="editor-actions">
            <button type="button" onClick={save}>שמירה</button>
            <button type="button" onClick={openPreview}>תצוגה מקדימה</button>
            <button type="button" onClick={validate}>בדיקה</button>
            <button type="button" onClick={publishCheck}>פרסום</button>
          </div>
        </div>
        <StatusMessage status={status} />
        {renderSection()}
        <ValidationBox validation={validation} />
      </section>
    </div>
  )
}

function buildInitialContent() {
  const initialSolutions = structuredClone(solutions)
  return {
    routes,
    siteInfo: structuredClone(siteInfo),
    whatsappMessages: structuredClone(whatsappMessages),
    navItems: structuredClone(navItems),
    footerNavItems: structuredClone(footerNavItems),
    defaultSeo: structuredClone(defaultSeo),
    sharedCta: structuredClone(sharedCta),
    homeAbout: structuredClone(homeAbout),
    homeContent: structuredClone(homeContent),
    contactContent: structuredClone(contactContent),
    pages: structuredClone(pages),
    trustItems: structuredClone(trustItems),
    solutionsIntro: structuredClone(solutionsIntro),
    solutions: initialSolutions,
    _currentSolutions: initialSolutions,
    processIntro: structuredClone(processIntro),
    processSteps: structuredClone(processSteps),
    galleryIntro: structuredClone(galleryIntro),
    galleryItems: structuredClone(galleryItems),
    missingImageNeeds: structuredClone(missingImageNeeds),
    articles: structuredClone(articles),
  }
}

function EditorPanel({ title, children }) {
  return (
    <div className="editor-panel">
      <h2>{title}</h2>
      <div className="editor-form-grid">{children}</div>
    </div>
  )
}

function Field({ label, value, onChange, helper, required = false, readOnly = false }) {
  return (
    <label className="editor-field">
      <span>{label}{required ? ' *' : ''}</span>
      <input value={value || ''} readOnly={readOnly} onChange={(event) => onChange(event.target.value)} />
      {helper ? <small>{helper}</small> : null}
    </label>
  )
}

function NumberField({ label, value, onChange }) {
  return (
    <label className="editor-field">
      <span>{label}</span>
      <input type="number" value={value || ''} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  )
}

function TextArea({ label, value, onChange, required = false }) {
  return (
    <label className="editor-field editor-wide">
      <span>{label}{required ? ' *' : ''}</span>
      <textarea value={value || ''} rows="4" onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

function SelectField({ label, value, options, onChange }) {
  return (
    <label className="editor-field">
      <span>{label}</span>
      <select value={value || ''} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  )
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="editor-toggle">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span>{label}</span>
    </label>
  )
}

function Picker({ items, selected, onSelect, labelKey }) {
  return (
    <div className="editor-picker editor-wide">
      {items.map((item, index) => (
        <button type="button" key={item.id || item.slug || item.image || index} className={selected === index ? 'active' : ''} onClick={() => onSelect(index)}>
          {item[labelKey] || item.internalLabel || `פריט ${index + 1}`}
        </button>
      ))}
    </div>
  )
}

function ImageField({ label, value, alt, media, folder, onImage, onAlt, onUpload }) {
  return (
    <div className="image-field editor-wide">
      <span>{label}</span>
      {value ? <img src={`/${value}`} alt={alt || ''} /> : null}
      <div className="image-row">
        <select value={value || ''} onChange={(event) => onImage(event.target.value)}>
          <option value="">בחירת תמונה</option>
          {media.map((image) => <option key={image} value={image}>{image}</option>)}
        </select>
        <input type="file" accept="image/*" onChange={(event) => event.target.files?.[0] ? onUpload(event.target.files[0], folder) : null} />
      </div>
      <Field label="Alt לתמונה" value={alt || ''} onChange={onAlt} required helper="לתאר מה רואים בתמונה. לא שם קובץ ולא פרטי לקוח." />
    </div>
  )
}

function StringList({ title, items, onChange }) {
  const safeItems = items || []
  return (
    <div className="list-editor editor-wide">
      <h3>{title}</h3>
      {safeItems.map((item, index) => (
        <div className="list-row" key={`${title}-${index}`}>
          <input value={item} onChange={(event) => onChange(replaceAt(safeItems, index, event.target.value))} />
          <button type="button" onClick={() => onChange(moveItem(safeItems, index, -1))}>למעלה</button>
          <button type="button" onClick={() => onChange(moveItem(safeItems, index, 1))}>למטה</button>
          <button type="button" className="danger" onClick={() => onChange(safeItems.filter((_, itemIndex) => itemIndex !== index))}>מחיקה</button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...safeItems, ''])}>הוספת שורה</button>
    </div>
  )
}

function ImageList({ title, items, media, folder, onChange, onUpload }) {
  const safeItems = items || []
  return (
    <div className="image-list editor-wide">
      <h3>{title}</h3>
      {safeItems.map((item, index) => (
        <div className="image-list-item" key={`${item.image}-${index}`}>
          <ImageField
            label={`תמונה ${index + 1}`}
            value={item.image}
            alt={item.alt}
            media={media}
            folder={folder}
            onImage={(value) => onChange(replaceAt(safeItems, index, { ...item, image: value }))}
            onAlt={(value) => onChange(replaceAt(safeItems, index, { ...item, alt: value }))}
            onUpload={(file, targetFolder) => onUpload(file, targetFolder, (image) => onChange(replaceAt(safeItems, index, { ...item, image })))}
          />
          <NumberField label="סדר" value={item.order || index + 1} onChange={(value) => onChange(replaceAt(safeItems, index, { ...item, order: value }))} />
          <Toggle label="תמונה ראשונה / ראשית" checked={Boolean(item.primary)} onChange={(value) => onChange(safeItems.map((image, imageIndex) => ({ ...image, primary: imageIndex === index ? value : false })))} />
          <button type="button" className="danger" onClick={() => onChange(safeItems.filter((_, itemIndex) => itemIndex !== index))}>מחיקת תמונה</button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...safeItems, { image: '', alt: '', order: safeItems.length + 1, primary: safeItems.length === 0 }])}>הוספת תמונה</button>
    </div>
  )
}

function ProductOptionsList({ title, items, media, folder, onChange, onUpload }) {
  const safeItems = items || []
  return (
    <div className="image-list editor-wide">
      <h3>{title}</h3>
      <p className="editor-help">אלו תתי־האפשרויות שמופיעות בתוך עולם המוצר ובדף המוצר. במובייל הן מוצגות פתוחות, בלי תלות ב־hover.</p>
      {safeItems.map((item, index) => (
        <div className="image-list-item" key={`${item.title}-${index}`}>
          <Field label="כותרת אפשרות" value={item.title || ''} onChange={(value) => onChange(replaceAt(safeItems, index, { ...item, title: value }))} required />
          <TextArea label="טקסט קצר" value={item.text || ''} onChange={(value) => onChange(replaceAt(safeItems, index, { ...item, text: value }))} required />
          <ImageField
            label="תמונת אפשרות"
            value={item.image}
            alt={item.alt}
            media={media}
            folder={folder}
            onImage={(value) => onChange(replaceAt(safeItems, index, { ...item, image: value }))}
            onAlt={(value) => onChange(replaceAt(safeItems, index, { ...item, alt: value }))}
            onUpload={(file, targetFolder) => onUpload(file, targetFolder, (image) => onChange(replaceAt(safeItems, index, { ...item, image })))}
          />
          <NumberField label="סדר" value={item.order || index + 1} onChange={(value) => onChange(replaceAt(safeItems, index, { ...item, order: value }))} />
          <button type="button" className="danger" onClick={() => onChange(safeItems.filter((_, itemIndex) => itemIndex !== index))}>מחיקת אפשרות</button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...safeItems, { title: '', text: '', image: '', alt: '', order: safeItems.length + 1 }])}>הוספת אפשרות</button>
    </div>
  )
}

function ArticleSections({ article, onChange }) {
  const sections = article.sections || []
  return (
    <div className="list-editor editor-wide">
      <h3>גוף המאמר</h3>
      <p className="editor-help">אפשר לערוך בזהירות. לא לשנות slug. כל שורה בטקסט היא פסקה.</p>
      {sections.map((section, index) => (
        <div className="article-section-editor" key={`${section.title}-${index}`}>
          <Field label="כותרת חלק" value={section.title || ''} onChange={(value) => onChange(replaceAt(sections, index, { ...section, title: value }))} />
          <TextArea label="פסקאות" value={(section.body || []).join('\n')} onChange={(value) => onChange(replaceAt(sections, index, { ...section, body: value.split('\n').filter(Boolean) }))} />
        </div>
      ))}
    </div>
  )
}

function StatusMessage({ status }) {
  return <div className={`editor-status ${status.type}`}>{status.text}</div>
}

function ValidationBox({ validation }) {
  if (!validation) return null
  const issues = validation.issues || []
  const warnings = validation.warnings || []
  if (!issues.length && !warnings.length) return <div className="validation-box success">הבדיקה עברה</div>
  return (
    <div className="validation-box">
      {issues.map((issue) => <p key={`${issue.path}-${issue.message}`}>שגיאה: {issue.message}</p>)}
      {warnings.map((issue) => <p key={`${issue.path}-${issue.message}`}>אזהרה: {issue.message}</p>)}
    </div>
  )
}

async function postJson(url, body) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  return response.json()
}

async function uploadImage(file, folder, setMedia, setStatus, done) {
  const dataUrl = await fileToDataUrl(file)
  const result = await postJson('/__ashbel-editor/upload', { fileName: file.name, dataUrl, targetFolder: folder })
  if (!result.ok) {
    setStatus({ type: 'error', text: result.message || 'שמירת התמונה נכשלה' })
    return
  }
  setMedia(result.images || [])
  done(result.image)
  setStatus({ type: 'success', text: 'התמונה נוספה לתיקיית המדיה' })
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function setPath(source, path, value) {
  const next = structuredClone(source)
  let cursor = next
  path.slice(0, -1).forEach((part) => {
    cursor = cursor[part]
  })
  cursor[path.at(-1)] = value
  return next
}

function replaceAt(items, index, value) {
  return items.map((item, itemIndex) => (itemIndex === index ? value : item))
}

function moveItem(items, index, direction) {
  const target = index + direction
  if (target < 0 || target >= items.length) return items
  const next = [...items]
  const [item] = next.splice(index, 1)
  next.splice(target, 0, item)
  return next
}

function addProject(content, setContent, setSelectedProject) {
  const nextProject = {
    image: '',
    alt: '',
    title: 'פרויקט חדש',
    internalLabel: 'פרויקט חדש',
    category: 'מודרני',
    order: content.galleryItems.length + 1,
    featured: false,
    showOnHome: false,
  }
  setContent((current) => ({ ...current, galleryItems: [...current.galleryItems, nextProject] }))
  setSelectedProject(content.galleryItems.length)
}

function removeAt(path, index, setContent, setSelected) {
  setContent((current) => {
    const next = structuredClone(current)
    let cursor = next
    path.forEach((part) => {
      cursor = cursor[part]
    })
    if (cursor.length <= 1) return current
    cursor.splice(index, 1)
    return next
  })
  setSelected(Math.max(0, index - 1))
}

function folderForProduct(id) {
  return {
    modern: 'modern',
    belgian: 'belgian',
    shading: 'shading',
    pergolas: 'pergolas-fences',
    envelope: 'exterior-solutions',
    factory: 'factory-services',
  }[id] || 'modern'
}

export default ContentEditor
