import { notFound } from 'next/navigation';

export const locales = ['en', 'ar', 'fr', 'de', 'es', 'zh'] as const;
export const defaultLocale = 'en' as typeof locales[number];

export const localeNames: Record<string, string> = {
  en: 'English',
  ar: 'العربية', // Arabic
  fr: 'Français', // French
  de: 'Deutsch', // German
  es: 'Español', // Spanish
  zh: '中文', // Chinese
};

export const localeFlags: Record<string, string> = {
  en: '🇺🇸',
  ar: '🇪🇬',
  fr: '🇫🇷',
  de: '🇩🇪',
  es: '🇪🇸',
  zh: '🇨🇳',
};

export default {
  locales,
  defaultLocale,
};