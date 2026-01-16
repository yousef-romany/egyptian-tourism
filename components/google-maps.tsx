'use client';

import React, { useEffect, useRef } from 'react';

// Add TypeScript declarations for Google Maps
declare global {
  interface Window {
    google: any;
  }
}

interface GoogleMapsProps {
  location?: string;
  title?: string;
  className?: string;
}

export function GoogleMaps({ location, title, className = '' }: GoogleMapsProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only load Google Maps script if not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      // Add callback function to window
      window.initMap = () => {
        if (mapRef.current && location) {
          const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: 29.9792, lng: 31.1342 }, // Default to Egypt center
            zoom: 10,
            styles: [
              {
                featureType: 'all',
                elementType: 'geometry',
                stylers: [
                  { color: '#d4af37' }
                ]
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [
                  { color: '#e9e3e4' }
                ]
              },
              {
                featureType: 'landscape.man_made',
                elementType: 'geometry',
                stylers: [
                  { color: '#e5e3e1' }
                ]
              }
            ]
          });

          // Add marker for the location
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ address: location }, (results: any, status: string) => {
            if (status === 'OK' && results && results[0]) {
              new window.google.maps.Marker({
                position: results[0].geometry.location,
                map,
                title: title || 'Tour Location',
                animation: window.google.maps.Animation.DROP
              });
            }
          });
        }
      };

      document.head.appendChild(script);
    }
  }, [location, title]);

  return (
    <div 
      ref={mapRef} 
      className={`w-full h-96 rounded-lg overflow-hidden ${className}`}
      style={{ backgroundColor: '#f5f5f5' }}
    >
      {!window.google && (
        <div className="flex items-center justify-center h-full bg-muted/20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-egyptian-gold border-t-transparent"></div>
            <p className="mt-4 text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
}