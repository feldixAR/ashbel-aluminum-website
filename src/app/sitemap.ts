import type { MetadataRoute } from 'next';
import { seo } from '@/data/seo';

const routes = ['/', '/services', '/styles', '/products', '/projects', '/process', '/professionals', '/upload', '/about', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${seo.baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
