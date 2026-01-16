/**
 * Translation utility functions for the Egyptian tourism website
 * Provides helpers for formatting dates, currency, and handling RTL text
 */

import { locales } from '@/i18n';

/**
 * Format a date according to the specified locale
 */
export function formatDate(date: Date, locale: string, options?: Intl.DateTimeFormatOptions): string {
    const defaultOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options,
    };

    return new Intl.DateTimeFormat(locale, defaultOptions).format(date);
}

/**
 * Format a number as currency according to the specified locale
 */
export function formatCurrency(
    amount: number,
    locale: string,
    currency: string = 'USD',
    options?: Intl.NumberFormatOptions
): string {
    const defaultOptions: Intl.NumberFormatOptions = {
        style: 'currency',
        currency,
        ...options,
    };

    return new Intl.NumberFormat(locale, defaultOptions).format(amount);
}

/**
 * Format a number according to the specified locale
 */
export function formatNumber(number: number, locale: string, options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat(locale, options).format(number);
}

/**
 * Get the text direction for a given locale
 */
export function getTextDirection(locale: string): 'ltr' | 'rtl' {
    const rtlLocales = ['ar']; // Add more RTL locales if needed
    return rtlLocales.includes(locale) ? 'rtl' : 'ltr';
}

/**
 * Check if a locale uses RTL (right-to-left) text direction
 */
export function isRTL(locale: string): boolean {
    return getTextDirection(locale) === 'rtl';
}

/**
 * Get the appropriate alignment class for a locale
 */
export function getAlignmentClass(locale: string): string {
    return isRTL(locale) ? 'text-right' : 'text-left';
}

/**
 * Get the appropriate flex direction class for a locale
 */
export function getFlexDirectionClass(locale: string): string {
    return isRTL(locale) ? 'flex-row-reverse' : 'flex-row';
}

/**
 * Pluralization helper
 * Returns the appropriate plural form based on count
 */
export function pluralize(
    count: number,
    singular: string,
    plural: string,
    locale: string = 'en'
): string {
    const pluralRules = new Intl.PluralRules(locale);
    const rule = pluralRules.select(count);

    // Simple implementation - can be extended for more complex rules
    return count === 1 ? singular : plural;
}

/**
 * Format a relative time (e.g., "2 days ago", "in 3 hours")
 */
export function formatRelativeTime(
    date: Date,
    locale: string,
    baseDate: Date = new Date()
): string {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    const diffInSeconds = Math.floor((date.getTime() - baseDate.getTime()) / 1000);

    const units: Array<{ unit: Intl.RelativeTimeFormatUnit; seconds: number }> = [
        { unit: 'year', seconds: 31536000 },
        { unit: 'month', seconds: 2592000 },
        { unit: 'week', seconds: 604800 },
        { unit: 'day', seconds: 86400 },
        { unit: 'hour', seconds: 3600 },
        { unit: 'minute', seconds: 60 },
        { unit: 'second', seconds: 1 },
    ];

    for (const { unit, seconds } of units) {
        if (Math.abs(diffInSeconds) >= seconds) {
            const value = Math.floor(diffInSeconds / seconds);
            return rtf.format(value, unit);
        }
    }

    return rtf.format(0, 'second');
}

/**
 * Get locale-specific date format pattern
 */
export function getDateFormatPattern(locale: string): string {
    const patterns: Record<string, string> = {
        en: 'MM/DD/YYYY',
        ar: 'DD/MM/YYYY',
        fr: 'DD/MM/YYYY',
        de: 'DD.MM.YYYY',
        es: 'DD/MM/YYYY',
        zh: 'YYYY/MM/DD',
        hi: 'DD/MM/YYYY',
    };

    return patterns[locale] || patterns.en;
}

/**
 * Get locale-specific currency symbol
 */
export function getCurrencySymbol(locale: string, currency: string = 'USD'): string {
    const formatted = formatCurrency(0, locale, currency);
    // Extract the currency symbol from the formatted string
    return formatted.replace(/[\d\s.,]/g, '').trim();
}

/**
 * Validate if a locale is supported
 */
export function isValidLocale(locale: string): boolean {
    return locales.includes(locale as any);
}

/**
 * Get the default locale
 */
export function getDefaultLocale(): string {
    return 'en';
}

/**
 * Format a duration in minutes to a human-readable string
 */
export function formatDuration(minutes: number, locale: string): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    const parts: string[] = [];

    if (hours > 0) {
        parts.push(`${hours}h`);
    }

    if (mins > 0) {
        parts.push(`${mins}m`);
    }

    return parts.join(' ') || '0m';
}

/**
 * Get locale-specific phone number format
 */
export function formatPhoneNumber(phone: string, locale: string): string {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');

    // Apply locale-specific formatting
    // This is a simplified version - you might want to use a library like libphonenumber-js
    if (locale === 'en' && cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }

    return phone;
}
