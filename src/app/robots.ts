import { protectedPageRoutes } from '@/config/protectedPageRoutes';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: protectedPageRoutes,
    },
    sitemap: 'https://acme.com/sitemap.xml',
  };
}
