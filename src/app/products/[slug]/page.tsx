import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CtaBand, SectionHeader } from '@/components/PageSections';
import { VisualMedia } from '@/components/VisualMedia';
import { productFamilies } from '@/data/productFamilies';
import '../products.css';

type ProductFamilyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return productFamilies.map((family) => ({ slug: family.slug }));
}

export async function generateMetadata({ params }: ProductFamilyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const family = productFamilies.find((item) => item.slug === slug);

  if (!family) {
    return {};
  }

  return {
    title: `${family.title} | מוצרים ופתרונות`,
    description: `${family.title} - ${family.kicker}. הסבר קצר על פתרונות, נקודות תכנון ורכיבי אלומיניום לקראת פגישה מקצועית.`,
  };
}

export default async function ProductFamilyPage({ params }: ProductFamilyPageProps) {
  const { slug } = await params;
  const family = productFamilies.find((item) => item.slug === slug);

  if (!family) {
    notFound();
  }

  const contentSections = [
    {
      title: 'מה כלול במשפחה הזו',
      text: family.intro,
      items: family.subOptions,
      image: family.gallery[0],
    },
    {
      title: 'נקודות תכנון מקצועיות',
      text: 'לפני שמתקדמים למדידה או להצעה, חשוב לסגור את השאלות שמשפיעות על הביצוע והנראות בבית.',
      items: family.planning,
      image: family.gallery[1],
    },
    {
      title: 'רכיבים וחומרה שכדאי להכיר',
      text: 'הבחירה הנכונה היא שילוב של פרופיל, זכוכית, מסילות, פרזול, גמרים ותיאום התקנה.',
      items: family.components,
      image: family.gallery[2],
    },
  ];

  return (
    <main className='products-page family-page'>
      <section className='container-main product-family-hero'>
        <div className='family-hero-copy'>
          <p className='eyebrow'>מוצרים ופתרונות</p>
          <h1>{family.title}</h1>
          <p className='lead'>{family.intro}</p>
          <a className='btn btn-primary' href='/upload'>
            העלאת תוכניות ותיאום פגישה
          </a>
        </div>
        <VisualMedia image={family.image} className='family-hero-image' loading='eager' label='תמונת אווירה והמחשה, לא פרויקט של אשבל' />
      </section>

      <section className='container-main section-shell'>
        <SectionHeader title='פתרונות בתוך המשפחה' text='עמוד זה מסביר את המשפחה ברמה מקצועית קצרה, בלי להפוך אותה לרשימת דגמים טכנית.' />
        <div className='family-chip-grid'>
          {family.subOptions.map((option) => (
            <span key={option}>{option}</span>
          ))}
        </div>
      </section>

      {contentSections.map((section, index) => (
        <section className={`container-main family-section ${index % 2 ? 'is-reversed' : ''}`} key={section.title}>
          <VisualMedia image={section.image} label='תמונת מוצר/חומר להמחשה בלבד' />
          <div className='family-section-copy'>
            <p className='eyebrow'>תכנון וביצוע</p>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className='container-main family-gallery section-shell'>
        <SectionHeader title='עוד פרטים ותחושת חומר' text='התמונות בעמוד משמשות כהמחשה למוצר, חומר ואווירה אדריכלית בלבד.' />
        <div className='image-mosaic'>
          {family.gallery.map((image) => (
            <VisualMedia image={image} key={image.src} />
          ))}
        </div>
      </section>

      <div className='container-main'>
        <CtaBand title={`מתאמים פגישה סביב ${family.title}`} text='העלו תוכנית אלומיניום, תוכנית אדריכלית, מידות או שאלה מקצועית, ונחזור לתיאום פגישה והמשך טיפול מסודר.' />
      </div>
    </main>
  );
}
