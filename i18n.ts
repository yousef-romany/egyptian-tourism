import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'ar', 'fr', 'de', 'es', 'zh', 'hi'] as const;
export const defaultLocale = 'en' as typeof locales[number];

export const localeNames: Record<string, string> = {
  en: 'English',
  ar: 'العربية', // Arabic
  fr: 'Français', // French
  de: 'Deutsch', // German
  es: 'Español', // Spanish
  zh: '中文', // Chinese
  hi: 'हिन्दी', // Hindi
};

export const localeFlags: Record<string, string> = {
  en: '🇺🇸',
  ar: '🇪🇬',
  fr: '🇫🇷',
  de: '🇩🇪',
  es: '🇪🇸',
  zh: '🇨🇳',
  hi: '🇮🇳',
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

    // Load English as fallback for missing keys
    let fallbackMessages = {};
    if (validatedLocale !== 'en') {
      try {
        const fallbackModule = await import(`./messages/en.json`);
        fallbackMessages = fallbackModule.default;
      } catch (e) {
        console.warn('Failed to load fallback messages');
      }
    }

    return {
      locale: validatedLocale,
      messages: {
        ...fallbackMessages,
        ...messagesModule.default,
      },
      onError: () => {
        // Suppress missing translation errors during build
      },
      getMessageFallback: ({ namespace, key }) => {
        return `${namespace}.${key}`;
      }
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${validatedLocale}`, error);
    notFound();
  }
});