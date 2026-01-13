'use client';

import React from 'react';
import { Button } from './ui/button';
import { useLanguage } from '@/contexts/language-context';
import { languageData } from '@/contexts/language-context';

export function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      {Object.entries(languageData).map(([code, lang]) => (
        <Button
          key={code}
          variant={currentLanguage === code ? 'default' : 'outline'}
          size="sm"
          onClick={() => setLanguage(code as any)}
          className="flex items-center gap-2"
        >
          <span className="text-lg">{lang.flag}</span>
          <span>{lang.name}</span>
        </Button>
      ))}
    </div>
  );
}