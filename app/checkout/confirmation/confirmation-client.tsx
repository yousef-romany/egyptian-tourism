'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import strapiAPI, { Order } from '@/lib/api/strapi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Package, Mail, Home, Loader2 } from 'lucide-react'
import Link from 'next/link'

export function ConfirmationClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const orderNumber = searchParams.get('orderNumber')

  useEffect(() => {
    const loadOrder = async () => {
      if (!orderNumber) {
        router.push('/shop')
        return
      }

      try {
        const orderData = await strapiAPI.orders.trackOrder(orderNumber)
        setOrder(orderData)
      } catch (error) {
        console.error('Failed to load order:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadOrder()
  }, [orderNumber, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#d4af37]" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">Order Not Found</h1>
        <p className="mb-8 text-gray-600">
          We couldn't find an order with that number.
        </p>
        <Link href="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Success Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Thank You for Your Order!
          </h1>
          <p className="text-lg text-gray-600">
            Order #{order.orderNumber}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Confirmation email sent to {order.customerEmail}
          </p>
        </div>

        {/* Order Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Status</span>
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Payment</span>
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Order Date</span>
              <span className="text-sm text-gray-900">
                {new Date(order.orderDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-gray-200 pb-3 last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            <div className="space-y-2 border-t border-gray-200 pt-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {order.shippingCost === 0 ? 'FREE' : `$${order.shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-bold">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <address className="not-italic text-gray-700">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              <br />
              {order.shippingAddress.street}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
              {order.shippingAddress.postalCode}
              <br />
              {order.shippingAddress.country}
              {order.shippingAddress.phone && (
                <>
                  <br />
                  {order.shippingAddress.phone}
                </>
              )}
            </address>
          </CardContent>
        </Card>

        {/* What's Next */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              What's Next?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-600">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d4af37] text-xs font-bold text-white">
                  1
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-900">Order Confirmation</p>
                <p>You'll receive a confirmation email shortly at {order.customerEmail}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d4af37] text-xs font-bold text-white">
                  2
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-900">Order Processing</p>
                <p>We'll prepare your items for shipment within 1-2 business days</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d4af37] text-xs font-bold text-white">
                  3
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-900">Shipping Notification</p>
                <p>
                  You'll receive a tracking number once your order ships (typically 2-3 days)
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d4af37] text-xs font-bold text-white">
                  4
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-900">Delivery</p>
                <p>Your order will arrive within 5-7 business days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/shop" className="flex-1">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-8 rounded-md bg-blue-50 p-4 text-center text-sm text-blue-800">
          <p>
            Need help? Contact us at{' '}
            <a
              href="mailto:info@egydise-tours.com"
              className="font-medium underline"
            >
              info@egydise-tours.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
