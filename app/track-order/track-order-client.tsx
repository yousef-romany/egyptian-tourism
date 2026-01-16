'use client'

import { useState } from 'react'
import strapiAPI, { Order } from '@/lib/api/strapi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Package, Search, Loader2, Truck, CheckCircle, Clock } from 'lucide-react'

export function TrackOrderClient() {
  const [orderNumber, setOrderNumber] = useState('')
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!orderNumber.trim()) {
      toast({
        title: 'Invalid Order Number',
        description: 'Please enter a valid order number',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)

    try {
      const orderData = await strapiAPI.orders.trackOrder(orderNumber.trim())
      setOrder(orderData)
    } catch (error: any) {
      console.error('Track order error:', error)
      toast({
        title: 'Order Not Found',
        description: 'No order found with that number. Please check and try again.',
        variant: 'destructive',
      })
      setOrder(null)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-6 w-6 text-yellow-600" />
      case 'processing':
        return <Package className="h-6 w-6 text-blue-600" />
      case 'shipped':
        return <Truck className="h-6 w-6 text-purple-600" />
      case 'delivered':
        return <CheckCircle className="h-6 w-6 text-green-600" />
      default:
        return <Package className="h-6 w-6 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Track Your Order</h1>
        <p className="text-gray-600">
          Enter your order number to check your order status
        </p>
      </div>

      {/* Search Form */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <form onSubmit={handleTrack} className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor="orderNumber" className="sr-only">
                Order Number
              </Label>
              <Input
                id="orderNumber"
                type="text"
                placeholder="Enter your order number (e.g., ORD-1234567890)"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="h-11"
              />
            </div>
            <Button type="submit" disabled={isLoading} className="h-11">
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  Track
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Order Details */}
      {order && (
        <>
          {/* Status Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon(order.status)}
                Order Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Order Number</span>
                <span className="font-mono text-sm font-bold text-gray-900">
                  {order.orderNumber}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Status</span>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Order Date</span>
                <span className="text-sm text-gray-900">
                  {new Date(order.orderDate).toLocaleDateString()}
                </span>
              </div>

              {order.trackingNumber && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Tracking Number</span>
                    <span className="font-mono text-sm font-medium text-gray-900">
                      {order.trackingNumber}
                    </span>
                  </div>

                  {order.shippingCarrier && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Carrier</span>
                      <span className="text-sm text-gray-900">{order.shippingCarrier}</span>
                    </div>
                  )}
                </>
              )}

              {order.shippedAt && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Shipped Date</span>
                  <span className="text-sm text-gray-900">
                    {new Date(order.shippedAt).toLocaleDateString()}
                  </span>
                </div>
              )}

              {order.deliveredAt && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Delivered Date</span>
                  <span className="text-sm text-gray-900">
                    {new Date(order.deliveredAt).toLocaleDateString()}
                  </span>
                </div>
              )}
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

              <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-bold">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
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
              </address>
            </CardContent>
          </Card>
        </>
      )}

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
  )
}
