'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
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
  const t = useTranslations('TrackOrder')
  const locale = useLocale()

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!orderNumber.trim()) {
      toast({
        title: t('invalidOrderNumber'),
        description: t('invalidOrderNumber'),
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
        title: t('orderNotFound'),
        description: t('orderNotFound'),
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
        <h1 className="mb-2 text-3xl font-bold text-gray-900">{t('title')}</h1>
        <p className="text-gray-600">
          {t('subtitle')}
        </p>
      </div>

      {/* Search Form */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <form onSubmit={handleTrack} className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor="orderNumber" className="sr-only">
                {t('orderNumber')}
              </Label>
              <Input
                id="orderNumber"
                type="text"
                placeholder={t('orderNumberPlaceholder')}
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
                  {t('track')}
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
                {t('orderStatus')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{t('orderNumberLabel')}</span>
                <span className="font-mono text-sm font-bold text-gray-900">
                  {order.orderNumber}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{t('status')}</span>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{t('orderDate')}</span>
                <span className="text-sm text-gray-900">
                  {new Date(order.orderDate).toLocaleDateString()}
                </span>
              </div>

              {order.trackingNumber && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">{t('trackingNumber')}</span>
                    <span className="font-mono text-sm font-medium text-gray-900">
                      {order.trackingNumber}
                    </span>
                  </div>

                  {order.shippingCarrier && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">{t('carrier')}</span>
                      <span className="text-sm text-gray-900">{order.shippingCarrier}</span>
                    </div>
                  )}
                </>
              )}

              {order.shippedAt && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">{t('shippedDate')}</span>
                  <span className="text-sm text-gray-900">
                    {new Date(order.shippedAt).toLocaleDateString()}
                  </span>
                </div>
              )}

              {order.deliveredAt && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">{t('deliveredDate')}</span>
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
              <CardTitle>{t('orderItems')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-gray-200 pb-3 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{t('quantity')}: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </CardContent>

            <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-bold">
              <span>{t('total')}</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle>{t('shippingAddress')}</CardTitle>
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
          {t('needHelp')}{' '}
          <a
            href="mailto:info@WanderLand Egypt.com"
            className="font-medium underline"
          >
            info@WanderLand Egypt.com
          </a>
        </p>
      </div>
    </div>
  )
}
