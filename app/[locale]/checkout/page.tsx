import { Suspense } from 'react'
import CheckoutPage from './checkout-client'

export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-egyptian-gold mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading checkout...</p>
        </div>
      </div>
    }>
      <CheckoutPage />
    </Suspense>
  )
}
