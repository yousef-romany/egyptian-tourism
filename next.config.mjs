import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@strapi/strapi', 'lodash'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_STRAPI_URL?.replace('https://', '').replace('http://', '') || 'localhost',
        port: process.env.NEXT_PUBLIC_STRAPI_URL?.includes('localhost') ? 1337 : undefined,
        pathname: '/uploads',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
