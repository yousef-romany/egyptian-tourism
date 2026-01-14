import { redirect } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface SearchParams {
  token?: string
  PayerID?: string
  bookingId?: string
}

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const awaitedSearchParams = await searchParams;
  const { token, PayerID, bookingId } = awaitedSearchParams

  if (!token) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-20" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Payment Successful! 🎉
          </h1>
          <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
            Thank you for your booking. Your payment has been confirmed.
          </p>

          {/* Booking Details Card */}
          <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
              Booking Confirmed
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              A confirmation email has been sent to your email address with all the
              booking details.
            </p>

            <div className="space-y-3 rounded-md bg-gray-50 p-4 text-left dark:bg-gray-900">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  PayPal Token:
                </span>
                <span className="font-mono text-sm text-gray-900 dark:text-white">
                  {token}
                </span>
              </div>
              {PayerID && (
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600 dark:text-gray-400">
                    Payer ID:
                  </span>
                  <span className="font-mono text-sm text-gray-900 dark:text-white">
                    {PayerID}
                  </span>
                </div>
              )}
              {bookingId && (
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600 dark:text-gray-400">
                    Booking ID:
                  </span>
                  <span className="font-mono text-sm text-gray-900 dark:text-white">
                    {bookingId}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* What's Next */}
          <div className="mb-8 rounded-lg border-2 border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/30">
            <h3 className="mb-3 text-xl font-semibold text-amber-900 dark:text-amber-100">
              What's Next?
            </h3>
            <ul className="space-y-2 text-left text-amber-800 dark:text-amber-200">
              <li className="flex items-start">
                <span className="mr-2 font-bold">✓</span>
                <span>Check your email for detailed booking confirmation</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-bold">✓</span>
                <span>Save your booking reference number for future inquiries</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-bold">✓</span>
                <span>Our team will contact you 24-48 hours before your tour</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 font-bold">✓</span>
                <span>
                  Need help? Contact us at info@egydise-tours.com
                </span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="bg-egyptian-gold hover:bg-egyptian-gold-dark">
              <Link href="/tours">Browse More Tours</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-egyptian-gold text-egyptian-gold hover:bg-egyptian-gold hover:text-white"
            >
              <Link href="/profile">View My Bookings</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
