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
  // Simple approach for Next.js 15 compatibility
  const validatedLocale = locale || defaultLocale;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(validatedLocale as any)) {
    console.error(`Invalid locale: ${validatedLocale}`);
    notFound();
  }

  try {
    // Direct import approach
    const messagesModule = await import(`./messages/${validatedLocale}.json`);
    return {
      locale: validatedLocale,
      messages: messagesModule.default,
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${validatedLocale}`, error);
    notFound();
  }
});