import { XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          {/* Cancel Icon */}
          <div className="mb-8 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <XCircle className="h-16 w-16 text-red-600 dark:text-red-400" />
            </div>
          </div>

          {/* Cancel Message */}
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Payment Cancelled
          </h1>
          <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
            Your payment was cancelled. No charges were made to your account.
          </p>

          {/* Info Card */}
          <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
              What Happened?
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              You cancelled the payment process. This could have happened intentionally
              or due to a connection issue. Don't worry, your booking was not completed
              and no payment was processed.
            </p>

            <div className="space-y-3 rounded-md bg-gray-50 p-4 text-left dark:bg-gray-900">
              <p className="font-medium text-gray-900 dark:text-white">
                Your booking details were not saved. If you still want to book this
                tour, you can start the booking process again.
              </p>
            </div>
          </div>

          {/* Help Options */}
          <div className="mb-8 rounded-lg border-2 border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950/30">
            <h3 className="mb-3 text-xl font-semibold text-blue-900 dark:text-blue-100">
              Need Help?
            </h3>
            <ul className="space-y-2 text-left text-blue-800 dark:text-blue-200">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Try again:</strong> You can restart the booking process at any time
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Payment issues:</strong> Contact your bank if you experience
                  problems with PayPal
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Support:</strong> Email us at info@WanderLand Egypt.com for assistance
                </span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="bg-egyptian-gold hover:bg-egyptian-gold-dark">
              <Link href="/tours">Browse Tours</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white dark:border-gray-100 dark:text-gray-100 dark:hover:bg-gray-100 dark:hover:text-gray-900"
            >
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
