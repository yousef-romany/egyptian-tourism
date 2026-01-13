"use client"

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, ExternalLink, Loader2 } from 'lucide-react';

export interface TourLocation {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  type: 'pickup' | 'destination' | 'waypoint';
  description?: string;
}

interface TourMapProps {
  locations: TourLocation[];
  tourName: string;
  center?: { lat: number; lng: number };
  zoom?: number;
}

export function TourMap({ locations, tourName, center, zoom = 12 }: TourMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Default center: Cairo, Egypt
  const defaultCenter = { lat: 30.0444, lng: 31.2357 };
  const mapCenter = center || defaultCenter;

  useEffect(() => {
    // Load Google Maps API
    const loadGoogleMaps = () => {
      if (typeof window === 'undefined' || window.google) {
        setIsLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''}&libraries=places`;
      script.async = true;
      script.onload = () => setIsLoaded(true);
      script.onerror = () => setError('Failed to load Google Maps');
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || !window.google) return;

    try {
      const map = new window.google.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
      });

      // Add markers for each location
      const bounds = new window.google.maps.LatLngBounds();

      locations.forEach((location) => {
        const position = { lat: location.latitude, lng: location.longitude };

        const marker = new window.google.maps.Marker({
          position,
          map,
          title: location.name,
          animation: window.google.maps.Animation.DROP,
        });

        // Create info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="font-semibold text-lg">${location.name}</h3>
              <p class="text-sm text-gray-600">${location.address}</p>
              ${location.description ? `<p class="text-sm mt-2">${location.description}</p>` : ''}
              <div class="mt-2">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}"
                  target="_blank"
                  class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          `,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        bounds.extend(position);
      });

      // Fit map to show all markers
      if (locations.length > 1) {
        map.fitBounds(bounds);
      }
    } catch (err) {
      console.error('Error initializing map:', err);
      setError('Error displaying map');
    }
  }, [isLoaded, locations, mapCenter, zoom]);

  const openDirections = (location: TourLocation) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;
    window.open(url, '_blank');
  };

  const openStreetView = (location: TourLocation) => {
    const url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${location.latitude},${location.longitude}`;
    window.open(url, '_blank');
  };

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-red-500" />
            Tour Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Please ensure Google Maps API key is configured
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-egyptian-gold" />
          Tour Locations
        </CardTitle>
        <CardDescription>
          Explore tour locations and get directions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Map Container */}
        <div
          ref={mapRef}
          className="w-full h-96 rounded-lg bg-gray-100 relative"
        >
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-egyptian-gold" />
                <p className="text-sm text-muted-foreground">Loading map...</p>
              </div>
            </div>
          )}
        </div>

        {/* Location List */}
        <div className="space-y-3">
          <h3 className="font-semibold">Tour Stops</h3>
          {locations.map((location, index) => (
            <div
              key={index}
              className="border rounded-lg p-3 hover:bg-accent transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={location.type === 'pickup' ? 'default' : 'secondary'}>
                      {location.type === 'pickup' ? 'Pickup' : location.type === 'destination' ? 'Destination' : 'Stop'}
                    </Badge>
                    <h4 className="font-semibold">{location.name}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{location.address}</p>
                  {location.description && (
                    <p className="text-sm mt-1">{location.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openDirections(location)}
                    className="gap-1"
                  >
                    <Navigation className="h-3 w-3" />
                    Directions
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openStreetView(location)}
                    className="gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Street View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Text */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
          <p className="text-blue-900">
            <strong>💡 Tip:</strong> Click on any location marker on the map to see details.
            Use the "Directions" button to get turn-by-turn navigation from your location.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
