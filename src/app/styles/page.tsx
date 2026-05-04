import type { Metadata } from 'next';
import { CtaBand, PageIntro, SectionHeader } from '@/components/PageSections';
import { styles } from '@/data/styles';

export const metadata: Metadata = {
  title: 'סגנונות אלומיניום לבית',
  description: 'סגנונות תכנון וביצוע למערכות אלומיניום לבית פרטי: מודרני, בלגי, כפרי מעודכן ואדריכלי שקט.',
};

export default function StylesPage() {
  return (
    <main>
      <div className='container-main'>
        <PageIntro
          eyebrow='סגנונות'
          title='סגנון אלומיניום הוא החלטה אדריכלית וגם החלטה שימושית'
          text='הגוון, החלוקה, רוחב הפרופיל וסוג הפתיחה משפיעים על חזית הבית, על האור בחלל ועל נוחות החיים אחרי ההתקנה.'
        />

        <section className='section-shell'>
          <SectionHeader title='כיווני תכנון נפוצים' text='הבחירה אינה רק עניין של טעם. היא צריכה להתחבר לתוכנית, לתקציב, לגמרים ולשגרת השימוש בבית.' />
          <div className='grid-2'>
            {styles.map((style) => (
              <article className='feature-card' key={style.title}>
                <h2>{style.title}</h2>
                <p>{style.desc}</p>
                <p>
                  <strong>{style.audience}</strong>
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className='section-shell body-copy'>
          <SectionHeader
            eyebrow='לבעלי בתים ולאנשי מקצוע'
            title='איך בוחרים נכון'
            text='בשלב מוקדם כדאי לתאם חזיתות, כיווני שמש, סוג פתחים, דרישות פרטיות, צבעים וגמרים, ורק אז לסגור סדרה וחלוקות.'
          />
          <p>בפרויקטים פרטיים איכותיים, בחירת אלומיניום מוקדמת מונעת פשרות מאוחרות במפלסים, תריסים, מסילות, רשתות ומפגש עם חיפויים.</p>
        </section>

        <CtaBand title='מתלבטים בין סגנונות?' text='העלו תוכנית, חזית או שאלה מקצועית, ונתאם פגישה לבחירת מערכות אלומיניום שמתאימות לבית ולשלב הפרויקט.' />
      </div>
    </main>
  );
}
