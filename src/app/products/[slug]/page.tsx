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
    title: `${family.title} | מוצרים ושירותים`,
    description: `${family.title}: ${family.kicker}. מידע על מוצרים, הכנה לפגישת ייעוץ ופרטים שכדאי לבדוק לפני הצעת מחיר.`,
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
      title: 'מה כולל התחום',
      text: family.intro,
      items: family.subOptions,
      image: family.gallery[0],
    },
    {
      title: 'מה חשוב לבדוק',
      text: 'לפני שמתקדמים להצעה, חשוב להבין את סוג הפתח, המידות, שלב העבודה והפרטים שמשפיעים על הביצוע.',
      items: family.planning,
      image: family.gallery[1],
    },
    {
      title: 'פרטים שמשפיעים על העבודה',
      text: 'הפרופיל, הזכוכית, המסילות, הפרזול, התריסים והגמרים משפיעים על המחיר, המראה והשימוש היומיומי.',
      items: family.components,
      image: family.gallery[2],
    },
  ];

  return (
    <main className='products-page family-page'>
      <section className='container-main product-family-hero'>
        <div className='family-hero-copy'>
          <p className='eyebrow'>מוצרים ושירותים</p>
          <h1>{family.title}</h1>
          <p className='lead'>{family.intro}</p>
          <a className='btn btn-primary' href='/upload'>
            שליחת תוכניות
          </a>
        </div>
        <VisualMedia image={family.image} className='family-hero-image' loading='eager' />
      </section>

      <section className='container-main section-shell'>
        <SectionHeader title='מוצרים בתחום הזה' text='ריכזנו את המוצרים והשירותים המרכזיים בתחום, בלי להעמיס מפרט טכני לפני פגישת ייעוץ.' />
        <div className='family-chip-grid'>
          {family.subOptions.map((option) => (
            <span key={option}>{option}</span>
          ))}
        </div>
      </section>

      {contentSections.map((section, index) => (
        <section className={`container-main family-section ${index % 2 ? 'is-reversed' : ''}`} key={section.title}>
          <VisualMedia image={section.image} />
          <div className='family-section-copy'>
            <p className='eyebrow'>פגישת ייעוץ</p>
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
        <SectionHeader title='תמונות להמחשה' text='התמונות בעמוד נועדו להמחשת סגנון, חומר ותחום עבודה.' />
        <div className='image-mosaic'>
          {family.gallery.map((image) => (
            <VisualMedia image={image} key={image.src} />
          ))}
        </div>
      </section>

      <div className='container-main'>
        <CtaBand title={`שליחת תוכניות עבור ${family.title}`} text='שלחו תוכנית, מידות או תמונות מהשטח. נבדוק את החומר ונחזור לתיאום המשך עבודה.' />
      </div>
    </main>
  );
}
