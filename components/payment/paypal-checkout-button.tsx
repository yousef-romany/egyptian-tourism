"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface PayPalCheckoutButtonProps {
  amount: number
  currency?: string
  description: string
  tourId: string
  tourName: string
  bookingData?: {
    customerName: string
    customerEmail: string
    customerPhone: string
    tourDate: string
    numberOfPeople: number
  }
  onSuccess?: (details: any) => void
  onError?: (error: any) => void
  className?: string
}

export function PayPalCheckoutButton({
  amount,
  currency = 'USD',
  description,
  tourId,
  tourName,
  bookingData,
  onSuccess,
  onError,
  className = '',
}: PayPalCheckoutButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePayment = async () => {
    setIsProcessing(true)
    setError(null)

    try {
      // Create booking first
      const bookingResponse = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            ...bookingData,
            tourName,
            tourId,
            totalPrice: amount,
            status: 'pending',
            paymentStatus: 'pending_payment',
            paymentMethod: 'paypal',
          },
        }),
      })

      if (!bookingResponse.ok) {
        throw new Error('Failed to create booking')
      }

      const booking = await bookingResponse.json()

      // Create PayPal order
      const paypalOrderResponse = await fetch('/api/payment/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
          description,
          bookingId: booking.data.id,
          bookingReference: booking.data.bookingReference,
        }),
      })

      if (!paypalOrderResponse.ok) {
        throw new Error('Failed to create PayPal order')
      }

      const paypalOrder = await paypalOrderResponse.json()

      // Redirect to PayPal for approval
      if (paypalOrder.approvalUrl) {
        window.location.href = paypalOrder.approvalUrl
      } else {
        throw new Error('No approval URL returned')
      }

    } catch (err: any) {
      console.error('Payment error:', err)
      setError(err.message || 'Payment failed')
      onError?.(err)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button
        onClick={handlePayment}
        disabled={isProcessing}
        className={`${className} bg-[#0070ba hover:bg-[#005ea6] text-white`}
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.909C5.217.371 6.237.26 7.247.26 8.2c0 1.02.814 1.537 2.007 1.537h5.016l-1.228 7.065a.64.64 0 0 1-.632.538H8.21a.641.641 0 0 1-.633-.741L9.586 8.89c.074-.408.217-.788.424-1.126a2.597 2.597 0 0 1-.08-2.193c.074-.514.22-.989.424-1.418.074-.206.158-.403.425-.588l2.05-11.844a.641.641 0 0 1 .632-.538h4.622c.952 0 1.826.605 2.147 1.507.32.903.32 1.507-.074 2.147-.32.641-.741-.741-1.506l-1.134-6.543h5.016c1.372 0 2.58-.86 2.964-2.147a.641.641 0 0 0-.396-.538h-4.622a.641.641 0 0 0-.632.538l-1.228 7.065z"/>
            </svg>
            Pay with PayPal
          </>
        )}
      </Button>

      {error && (
        <div className="text-sm text-red-500 text-center">
          {error}
        </div>
      )}

      <div className="text-xs text-center text-muted-foreground">
        🔒 Secure payment powered by PayPal
      </div>
    </div>
  )
}
