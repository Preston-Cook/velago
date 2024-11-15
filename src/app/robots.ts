import { MetadataRoute } from 'next';
import { protectedRoutes } from '@/config/protectedRoutes';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: protectedRoutes
    },
  };
}