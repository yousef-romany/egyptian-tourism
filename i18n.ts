import { notFound } from 'next/navigation';

export const locales = ['en', 'ar', 'fr'] as const;
export const defaultLocale = 'en' as typeof locales[number];

export default {
  locales,
  defaultLocale,
};