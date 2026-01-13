"use client"

import { AvailabilityCalendar } from "./calendar"
import { TourMap } from "./maps"
import type { Tour } from "@/lib/data/tours"

interface TourSidebarWidgetsProps {
  tour: Tour
}

export function TourSidebarWidgets({ tour }: TourSidebarWidgetsProps) {
  return (
    <>
      {/* Availability Calendar */}
      <div className="mt-8">
        <AvailabilityCalendar
          tourId={tour.id}
          onDateSelect={(date) => console.log('Selected date:', date)}
        />
      </div>

      {/* Tour Map */}
      <div className="mt-8">
        <TourMap
          tourName={tour.title}
          locations={[
            {
              name: tour.title,
              address: `${tour.location}, Egypt`,
              latitude: 29.9792, // Default to Giza coordinates
              longitude: 31.1342,
              type: 'destination',
              description: tour.description,
            },
          ]}
          center={{ lat: 29.9792, lng: 31.1342 }}
          zoom={12}
        />
      </div>
    </>
  )
}
