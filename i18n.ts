import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

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

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  // Ensure locale is a string, not undefined
  const validatedLocale = locale as string;

  return {
    locale: validatedLocale,
    messages: (await import(`./messages/${validatedLocale}.json`)).default,
  };
});