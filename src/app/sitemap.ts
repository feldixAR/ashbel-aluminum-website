import type { MetadataRoute } from 'next';
import { productFamilies } from '@/data/productFamilies';
import { seo } from '@/data/seo';

const routes = [
  '/',
  '/services',
  '/styles',
  '/products',
  ...productFamilies.map((family) => `/products/${family.slug}`),
  '/projects',
  '/process',
  '/professionals',
  '/upload',
  '/about',
  '/contact',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${seo.baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
