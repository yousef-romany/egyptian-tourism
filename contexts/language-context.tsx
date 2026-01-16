'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Available languages
const languageData = {
  en: {
    name: 'English',
    flag: '🇺🇸',
    direction: 'ltr',
  },
  ar: {
    name: 'العربية',
    flag: '🇸🇦',
    direction: 'rtl',
  },
};

type Language = 'en' | 'ar';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation function
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.tours': 'Tours',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.profile': 'Profile',
    'nav.bookings': 'My Bookings',
    'nav.wishlist': 'Wishlist',
    
    // Common
    'loading': 'Loading...',
    'error': 'Error',
    'book.now': 'Book Now',
    'read.more': 'Read More',
    'contact.us': 'Contact Us',
    'search.placeholder': 'Search tours...',
    'filter.by.category': 'Filter by Category',
    'filter.by.location': 'Filter by Location',
    'filter.by.price': 'Filter by Price',
    'all.tours': 'All Tours',
    
    // Tour details
    'duration': 'Duration',
    'group.size': 'Group Size',
    'location': 'Location',
    'highlights': 'Tour Highlights',
    'itinerary': 'Itinerary',
    'included': 'What\'s Included',
    'not.included': 'What\'s Not Included',
    'faq': 'FAQ',
    'reviews': 'Reviews',
    'leave.review': 'Leave a Review',
    'related.tours': 'Related Tours',
    
    // Booking
    'booking.information': 'Booking Information',
    'personal.information': 'Personal Information',
    'trip.details': 'Trip Details',
    'special.requests': 'Special Requests',
    
    // Forms
    'first.name': 'First Name',
    'last.name': 'Last Name',
    'email.address': 'Email Address',
    'phone.number': 'Phone Number',
    'country': 'Country',
    'tour.type': 'Tour Type',
    'travel.date': 'Travel Date',
    'number.of.travelers': 'Number of Travelers',
    'accommodation.preference': 'Accommodation Preference',
    
    // Reviews
    'rating': 'Rating',
    'review.title': 'Review Title',
    'your.review': 'Your Review',
    'share.experience': 'Share your experience',
    'login.required': 'Login Required',
    'login.to.review': 'Login to Review',
    'review.submitted': 'Review Submitted!',
    'review.approval': 'Thank you for your feedback. Your review will be visible after approval.',
    'submission.failed': 'Submission Failed',
    'failed.to.submit': 'Failed to submit your review. Please try again.',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.tours': 'الجولات',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.login': 'تسجيل الدخول',
    'nav.profile': 'الملف الشخصي',
    'nav.bookings': 'حجوزاتي',
    'nav.wishlist': 'قائمة الأمنيات',
    
    // Common
    'loading': 'جاري التحميل...',
    'error': 'خطأ',
    'book.now': 'احجز الآن',
    'read.more': 'اقرأ المزيد',
    'contact.us': 'اتصل بنا',
    'search.placeholder': 'البحث عن جولات...',
    'filter.by.category': 'التصفية حسب الفئة',
    'filter.by.location': 'التصفية حسب الموقع',
    'filter.by.price': 'التصفية حسب السعر',
    'all.tours': 'كل الجولات',
    
    // Tour details
    'duration': 'المدة',
    'group.size': 'حجم المجموعة',
    'location': 'الموقع',
    'highlights': 'أبرز المعالم',
    'itinerary': 'البرنامج الزمني',
    'included': 'ما مشمول',
    'not.included': 'ما غير مشمول',
    'faq': 'الأسئلة الشائعة',
    'reviews': 'التقييمات',
    'leave.review': 'ترك تقييم',
    'related.tours': 'جولات ذات صلة',
    
    // Booking
    'booking.information': 'معلومات الحجز',
    'personal.information': 'المعلومات الشخصية',
    'trip.details': 'تفاصيل الرحلة',
    'special.requests': 'طلبات خاصة',
    
    // Forms
    'first.name': 'الاسم الأول',
    'last.name': 'الاسم الأخير',
    'email.address': 'البريد الإلكتروني',
    'phone.number': 'رقم الهاتف',
    'country': 'البلد',
    'tour.type': 'نوع الجولة',
    'travel.date': 'تاريخ السفر',
    'number.of.travelers': 'عدد المسافرين',
    'accommodation.preference': 'تفضيلات الإقامة',
    
    // Reviews
    'rating': 'التقييم',
    'review.title': 'عنوان التقييم',
    'your.review': 'تقييمك',
    'share.experience': 'شارك تجربتك',
    'login.required': 'مطلوب تسجيل الدخول',
    'login.to.review': 'سجل الدخول للتقييم',
    'review.submitted': 'تم إرسال التقييم!',
    'review.approval': 'شكرا لك على ملاحظاتك. سيظهر تقييمك بعد الموافقة.',
    'submission.failed': 'فشل في الإرسال',
    'failed.to.submit': 'فشل في إرسال تقييمك. يرجى المحاولة مرة أخرى.',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  // Get saved language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage
  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
  };

  // Translation function
  const t = (key: string): string => {
    const translationData = translations[currentLanguage as Language];
    if (!translationData || !(key in translationData)) return key;
    return translationData[key as keyof typeof translationData];
  };

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    t,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export { languageData, type Language };