import createNextIntlPlugin from 'next-intl/plugin';
// import withPWA from 'next-pwa';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@strapi/strapi', 'lodash'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_STRAPI_URL?.replace('https://', '').replace('http://', '') || 'localhost',
        port: process.env.NEXT_PUBLIC_STRAPI_URL?.includes('localhost') ? '1337' : undefined,
        pathname: '/uploads',
      },
    ],
  },
};

// const pwaConfig = withPWA({
//   dest: 'public',
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV === 'development',
//   runtimeCaching: [
//     {
//       urlPattern: /^https?.*/,
//       handler: 'NetworkFirst',
//       options: {
//         cacheName: 'offlineCache',
//         expiration: {
//           maxEntries: 200,
//         },
//       },
//     },
//   ],
// });

export default withNextIntl(nextConfig);
