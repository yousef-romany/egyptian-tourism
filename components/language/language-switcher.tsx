"use client"

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { localeNames, localeFlags } from '@/i18n';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, Languages } from 'lucide-react';
import { useState, useTransition } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const switchLocale = (newLocale: string) => {
    startTransition(() => {
      // Replace locale in pathname
      const segments = pathname.split('/');
      segments[1] = newLocale;
      const newPath = segments.join('/');
      router.push(newPath);
      setOpen(false);
    });
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Languages className="h-4 w-4" />
          <span className="text-lg">{localeFlags[locale]}</span>
          <span className="hidden sm:inline">{localeNames[locale]}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        {Object.entries(localeNames).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => switchLocale(code)}
            disabled={isPending}
            className="flex items-center gap-3 cursor-pointer"
          >
            <span className="text-xl">{localeFlags[code]}</span>
            <div className="flex-1">
              <div className="font-medium">{name}</div>
            </div>
            {locale === code && (
              <span className="text-egyptian-gold">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
