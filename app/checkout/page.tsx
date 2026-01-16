import { Metadata } from 'next'
import { CheckoutClient } from './checkout-client'

export const metadata: Metadata = {
  title: 'Checkout | Egydise Tours',
  description: 'Complete your order and checkout securely with PayPal',
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <CheckoutClient />
    </div>
  )
}
