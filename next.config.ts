import { config } from 'dotenv-safe';
import createNextIntlPlugin from 'next-intl/plugin';

if (process.env.NODE_ENV === 'development') {
  config({
    path: '.env.development',
  });
}

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextIntl(nextConfig);
