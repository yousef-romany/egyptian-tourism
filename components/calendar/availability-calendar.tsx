"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Calendar, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';

export interface BookingDate {
  date: string; // ISO date string
  status: 'available' | 'booked' | 'limited' | 'unavailable';
  price?: number;
  bookingsCount?: number;
  maxBookings?: number;
}

interface AvailabilityCalendarProps {
  tourId: string;
  bookedDates?: BookingDate[];
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
}

export function AvailabilityCalendar({
  tourId,
  bookedDates = [],
  onDateSelect,
  selectedDate,
}: AvailabilityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get booked dates as a map for quick lookup
  const bookedDatesMap = new Map<string, BookingDate>();
  bookedDates.forEach((date) => {
    bookedDatesMap.set(date.date, date);
  });

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Add padding days for full week view
  const firstDayOfWeek = monthStart.getDay();
  const paddingDays = Array.from({ length: firstDayOfWeek }, (_, i) => i);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const getDateStatus = (date: Date): BookingDate['status'] => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const bookedDate = bookedDatesMap.get(dateStr);
    return bookedDate?.status || 'available';
  };

  const getDateInfo = (date: Date): BookingDate | undefined => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return bookedDatesMap.get(dateStr);
  };

  const getStatusColor = (status: BookingDate['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200';
      case 'booked':
        return 'bg-red-50 text-red-700 border-red-200 cursor-not-allowed';
      case 'limited':
        return 'bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'unavailable':
        return 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed';
      default:
        return 'bg-white hover:bg-gray-50';
    }
  };

  const getStatusIcon = (status: BookingDate['status']) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-3 w-3 text-green-500" />;
      case 'booked':
        return <XCircle className="h-3 w-3 text-red-500" />;
      case 'limited':
        return <AlertCircle className="h-3 w-3 text-yellow-500" />;
      default:
        return null;
    }
  };

  const handleDateClick = (date: Date) => {
    const status = getDateStatus(date);
    if (status !== 'booked' && status !== 'unavailable') {
      onDateSelect?.(date);
    }
  };

  const selectedDateStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-egyptian-gold" />
              Tour Availability
            </CardTitle>
            <CardDescription>
              Select a date to check availability and pricing
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <h3 className="text-lg font-semibold">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-green-500" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-yellow-500" />
            <span>Limited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-red-500" />
            <span>Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gray-300" />
            <span>Unavailable</span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day Headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-semibold text-muted-foreground py-2"
            >
              {day}
            </div>
          ))}

          {/* Padding Days */}
          {paddingDays.map((_, index) => (
            <div key={`padding-${index}`} className="p-2" />
          ))}

          {/* Calendar Days */}
          {calendarDays.map((date) => {
            const status = getDateStatus(date);
            const dateInfo = getDateInfo(date);
            const dateStr = format(date, 'yyyy-MM-dd');
            const isSelected = selectedDateStr === dateStr;
            const isDayToday = isToday(date);

            return (
              <button
                key={dateStr}
                onClick={() => handleDateClick(date)}
                disabled={status === 'booked' || status === 'unavailable'}
                className={`
                  relative p-2 rounded-lg border-2 transition-all text-center
                  ${getStatusColor(status)}
                  ${isSelected ? 'ring-2 ring-egyptian-gold ring-offset-2' : ''}
                  ${isDayToday ? 'font-bold' : ''}
                  ${status !== 'booked' && status !== 'unavailable' ? 'cursor-pointer' : 'cursor-not-allowed'}
                `}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-sm">{format(date, 'd')}</span>
                  {getStatusIcon(status)}
                  {dateInfo?.bookingsCount !== undefined && dateInfo.bookingsCount > 0 && (
                    <Badge variant="outline" className="text-xs py-0 px-1">
                      {dateInfo.bookingsCount}/{dateInfo.maxBookings}
                    </Badge>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Date Info */}
        {selectedDate && (
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">
              Selected: {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </h4>
            {(() => {
              const dateInfo = getDateInfo(selectedDate);
              if (dateInfo) {
                return (
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          dateInfo.status === 'available'
                            ? 'default'
                            : dateInfo.status === 'limited'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {dateInfo.status.charAt(0).toUpperCase() + dateInfo.status.slice(1)}
                      </Badge>
                      {dateInfo.bookingsCount !== undefined && (
                        <span className="text-muted-foreground">
                          {dateInfo.bookingsCount} booking{dateInfo.bookingsCount !== 1 ? 's' : ''} made
                        </span>
                      )}
                    </div>
                    <Button className="w-full bg-egyptian-gold hover:bg-egyptian-gold-dark">
                      Book This Date
                    </Button>
                  </div>
                );
              }
              return (
                <div className="space-y-2">
                  <Badge variant="default">Available</Badge>
                  <Button className="w-full bg-egyptian-gold hover:bg-egyptian-gold-dark">
                    Book This Date
                  </Button>
                </div>
              );
            })()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
