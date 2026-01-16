import { Metadata } from 'next'
import { TrackOrderClient } from './track-order-client'

export const metadata: Metadata = {
  title: 'Track Your Order | Egydise Tours',
  description: 'Track your order status and shipping information',
}

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <TrackOrderClient />
    </div>
  )
}
