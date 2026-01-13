"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface BookingData {
  tourId: string
  tourName: string
  tourDate: string
  numberOfPeople: number
  totalPrice: number
  customerName: string
  customerEmail: string
  customerPhone: string
  nationality?: string
  specialRequests?: string
}

interface PaymentContextType {
  bookingData: BookingData | null
  setBookingData: (data: BookingData | null) => void
  paymentStatus: 'idle' | 'processing' | 'success' | 'error'
  setPaymentStatus: (status: 'idle' | 'processing' | 'success' | 'error') => void
  clearBooking: () => void
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined)

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [bookingData, setBookingDataState] = useState<BookingData | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')

  const setBookingData = (data: BookingData | null) => {
    setBookingDataState(data)
    if (data) {
      // Save to localStorage for persistence
      localStorage.setItem('pendingBooking', JSON.stringify(data))
    } else {
      localStorage.removeItem('pendingBooking')
    }
  }

  const clearBooking = () => {
    setBookingDataState(null)
    setPaymentStatus('idle')
    localStorage.removeItem('pendingBooking')
  }

  // Load booking from localStorage on mount
  useState(() => {
    const saved = localStorage.getItem('pendingBooking')
    if (saved) {
      try {
        setBookingDataState(JSON.parse(saved))
      } catch (error) {
        console.error('Failed to load saved booking:', error)
      }
    }
  })

  return (
    <PaymentContext.Provider
      value={{
        bookingData,
        setBookingData,
        paymentStatus,
        setPaymentStatus,
        clearBooking,
      }}
    >
      {children}
    </PaymentContext.Provider>
  )
}

export function usePayment() {
  const context = useContext(PaymentContext)
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider')
  }
  return context
}
