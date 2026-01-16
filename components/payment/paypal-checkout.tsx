'use client'

import { useState } from 'react'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import strapiAPI from '@/lib/api/strapi'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

interface PayPalCheckoutProps {
  amount: number
  currency?: string
  bookingId: number
  bookingReference: string
  description?: string
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
  onCancel?: () => void
}

export function PayPalCheckout({
  amount,
  currency = 'USD',
  bookingId,
  bookingReference,
  description,
  onSuccess,
  onError,
  onCancel,
}: PayPalCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  // PayPal client ID from environment variables
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID

  if (!clientId) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
        <p className="text-sm text-red-800">
          PayPal is not configured. Please contact support.
        </p>
      </div>
    )
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        currency,
        intent: 'capture',
      }}
    >
      <div className="relative">
        {isProcessing && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-[#d4af37]" />
              <span className="text-sm font-medium text-gray-700">
                Processing payment...
              </span>
            </div>
          </div>
        )}

        <PayPalButtons
          style={{
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'paypal',
          }}
          createOrder={async () => {
            try {
              setIsProcessing(true)

              // Create PayPal order via backend
              const orderData = await strapiAPI.paypal.createOrder({
                amount,
                currency,
                description: description || `Payment for booking ${bookingReference}`,
                bookingId,
                bookingReference,
              })

              if (!orderData.orderId) {
                throw new Error('Failed to create PayPal order')
              }

              return orderData.orderId
            } catch (error: any) {
              console.error('Error creating PayPal order:', error)
              toast({
                title: 'Payment Error',
                description:
                  error?.error?.message ||
                  'Failed to initialize payment. Please try again.',
                variant: 'destructive',
              })
              setIsProcessing(false)
              throw error
            }
          }}
          onApprove={async (data) => {
            try {
              setIsProcessing(true)

              // Capture payment via backend
              const captureData = await strapiAPI.paypal.capturePayment(data.orderID)

              toast({
                title: 'Payment Successful!',
                description: `Your payment has been processed successfully. Booking ${bookingReference} is confirmed.`,
              })

              setIsProcessing(false)

              // Call success callback
              if (onSuccess) {
                onSuccess({
                  orderID: data.orderID,
                  ...captureData,
                })
              }
            } catch (error: any) {
              console.error('Error capturing PayPal payment:', error)
              toast({
                title: 'Payment Failed',
                description:
                  error?.error?.message ||
                  'Failed to process payment. Please contact support.',
                variant: 'destructive',
              })
              setIsProcessing(false)

              if (onError) {
                onError(error)
              }
            }
          }}
          onCancel={() => {
            setIsProcessing(false)
            toast({
              title: 'Payment Cancelled',
              description: 'You have cancelled the payment process.',
            })

            if (onCancel) {
              onCancel()
            }
          }}
          onError={(err) => {
            console.error('PayPal error:', err)
            setIsProcessing(false)
            toast({
              title: 'Payment Error',
              description: 'An error occurred with PayPal. Please try again.',
              variant: 'destructive',
            })

            if (onError) {
              onError(err)
            }
          }}
        />
      </div>
    </PayPalScriptProvider>
  )
}

// Simpler version for product checkout (can be extended)
interface ProductPayPalCheckoutProps {
  amount: number
  currency?: string
  description: string
  onSuccess?: (orderID: string) => void
  onError?: (error: any) => void
}

export function ProductPayPalCheckout({
  amount,
  currency = 'USD',
  description,
  onSuccess,
  onError,
}: ProductPayPalCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID

  if (!clientId) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
        <p className="text-sm text-red-800">
          PayPal is not configured. Please contact support.
        </p>
      </div>
    )
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        currency,
        intent: 'capture',
      }}
    >
      <div className="relative">
        {isProcessing && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-[#d4af37]" />
              <span className="text-sm font-medium text-gray-700">
                Processing payment...
              </span>
            </div>
          </div>
        )}

        <PayPalButtons
          style={{
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'paypal',
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [
                {
                  description,
                  amount: {
                    currency_code: currency,
                    value: amount.toFixed(2),
                  },
                },
              ],
            })
          }}
          onApprove={async (data, actions) => {
            try {
              setIsProcessing(true)

              if (!actions.order) {
                throw new Error('Order actions not available')
              }

              const details = await actions.order.capture()

              toast({
                title: 'Payment Successful!',
                description: 'Your payment has been processed successfully.',
              })

              setIsProcessing(false)

              if (onSuccess) {
                onSuccess(data.orderID)
              }
            } catch (error: any) {
              console.error('Error capturing payment:', error)
              toast({
                title: 'Payment Failed',
                description: 'Failed to process payment. Please try again.',
                variant: 'destructive',
              })
              setIsProcessing(false)

              if (onError) {
                onError(error)
              }
            }
          }}
          onCancel={() => {
            setIsProcessing(false)
            toast({
              title: 'Payment Cancelled',
              description: 'You have cancelled the payment process.',
            })
          }}
          onError={(err) => {
            console.error('PayPal error:', err)
            setIsProcessing(false)
            toast({
              title: 'Payment Error',
              description: 'An error occurred with PayPal. Please try again.',
              variant: 'destructive',
            })

            if (onError) {
              onError(err)
            }
          }}
        />
      </div>
    </PayPalScriptProvider>
  )
}
