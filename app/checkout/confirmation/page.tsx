import { Metadata } from 'next'
import { ConfirmationClient } from './confirmation-client'

export const metadata: Metadata = {
  title: 'Order Confirmation | Egydise Tours',
  description: 'Your order has been confirmed',
}

export default function ConfirmationPage() {
  return <ConfirmationClient />
}
