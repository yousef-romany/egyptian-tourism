import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Always show locale prefix for all locales
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  // Exclude api, _next, static files
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};