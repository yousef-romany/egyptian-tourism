import { Metadata } from 'next'
import { Suspense } from 'react'
import { ConfirmationClient } from './confirmation-client'

export const metadata: Metadata = {
  title: 'Order Confirmation | WanderLand Egypt',
  description: 'Your order has been confirmed',
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-egyptian-gold mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    }>
      <ConfirmationClient />
    </Suspense>
  )
}
