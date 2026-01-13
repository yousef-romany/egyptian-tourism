'use client';

import React, { useState } from 'react';
import { Facebook, Twitter, Link2, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

interface SocialShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
}

export function SocialShareButtons({ 
  url = typeof window !== 'undefined' ? window.location.href : '', 
  title = 'WanderLand Egypt - Discover the Wonders of Egypt',
  description = 'Join us for an unforgettable journey through ancient Egypt\'s most spectacular sites.'
}: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title} ${url}`)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: "Link Copied!",
        description: "The tour link has been copied to your clipboard.",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy the link. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = (platform: string) => {
    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-lg font-semibold mb-2">Share this tour</h3>
      
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('facebook')}
          className="flex items-center gap-2"
        >
          <Facebook className="h-4 w-4 text-blue-600" />
          Facebook
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('twitter')}
          className="flex items-center gap-2"
        >
          <Twitter className="h-4 w-4 text-sky-500" />
          Twitter
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('whatsapp')}
          className="flex items-center gap-2"
        >
          <MessageCircle className="h-4 w-4 text-green-600" />
          WhatsApp
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="flex items-center gap-2"
        >
          {copied ? (
            <>
              <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <Link2 className="h-4 w-4" />
              Copy Link
            </>
          )}
        </Button>
      </div>
    </div>
  );
}