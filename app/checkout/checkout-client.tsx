'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/use-cart'
import strapiAPI, { getMediaUrl, ShippingAddress } from '@/lib/api/strapi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/components/ui/use-toast'
import { ProductPayPalCheckout } from '@/components/payment/paypal-checkout'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ShoppingCart, Package, CreditCard, Loader2, Banknote, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Image from 'next/image'
import Link from 'next/link'

export function CheckoutClient() {
  const router = useRouter()
  const { cart, itemCount, totalAmount, clearCart } = useCart()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [sameAsBilling, setSameAsBilling] = useState(true)
  const [orderId, setOrderId] = useState<number | null>(null)
  const [orderNumber, setOrderNumber] = useState<string | null>(null)
  const [showPayment, setShowPayment] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'cod'>('paypal')

  // Form state
  const [shippingInfo, setShippingInfo] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
  })

  const [billingInfo, setBillingInfo] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
  })

  const [customerEmail, setCustomerEmail] = useState('')

  // Calculate totals
  const shippingCost = totalAmount > 50 ? 0 : 10 // Free shipping over $50
  const tax = totalAmount * 0.1 // 10% tax
  const finalTotal = totalAmount + shippingCost + tax

  // Redirect if cart is empty
  useEffect(() => {
    if (!cart || cart.items.length === 0) {
      router.push('/shop')
    }
  }, [cart, router])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'shipping' | 'billing'
  ) => {
    const { name, value } = e.target
    if (type === 'shipping') {
      setShippingInfo((prev) => ({ ...prev, [name]: value }))
    } else {
      setBillingInfo((prev) => ({ ...prev, [name]: value }))
    }
  }

  const validateForm = () => {
    // Validate email
    if (!customerEmail || !/\S+@\S+\.\S+/.test(customerEmail)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      })
      return false
    }

    // Validate shipping address
    const requiredFields = ['firstName', 'lastName', 'street', 'city', 'state', 'postalCode', 'country']
    for (const field of requiredFields) {
      if (!shippingInfo[field as keyof ShippingAddress]) {
        toast({
          title: 'Missing Information',
          description: `Please fill in all required shipping fields`,
          variant: 'destructive',
        })
        return false
      }
    }

    // Validate Luxor-only delivery area
    const luxorCityVariations = ['luxor', 'الأقصر', 'al-uqsur']
    const cityLower = shippingInfo.city.toLowerCase().trim()
    const isLuxor = luxorCityVariations.some(variation => cityLower.includes(variation))

    if (!isLuxor) {
      toast({
        title: 'Delivery Area Restricted',
        description: 'We currently only deliver to Luxor. Please enter "Luxor" as your city.',
        variant: 'destructive',
      })
      return false
    }

    return true
  }

  const handlePlaceOrder = async () => {
    if (!validateForm()) return

    setIsProcessing(true)

    try {
      // Create order
      const order = await strapiAPI.orders.create({
        items: cart!.items,
        customerName: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        customerEmail,
        customerPhone: shippingInfo.phone,
        shippingAddress: shippingInfo,
        billingAddress: sameAsBilling ? shippingInfo : billingInfo,
        subtotal: totalAmount,
        shippingCost,
        tax,
        total: finalTotal,
        currency: 'USD',
        paymentMethod,
      })

      setOrderId(order.id)
      setOrderNumber(order.orderNumber)

      // For Cash on Delivery, skip payment and go directly to confirmation
      if (paymentMethod === 'cod') {
        await clearCart()
        setIsProcessing(false)
        router.push(`/checkout/confirmation?orderNumber=${order.orderNumber}`)
      } else {
        // For PayPal, show payment section
        setShowPayment(true)
        setIsProcessing(false)
        toast({
          title: 'Order Created!',
          description: 'Please complete payment with PayPal below',
        })
      }
    } catch (error: any) {
      console.error('Order creation error:', error)
      toast({
        title: 'Error',
        description: error?.error?.message || 'Failed to create order',
        variant: 'destructive',
      })
      setIsProcessing(false)
    }
  }

  const handlePaymentSuccess = async (paypalOrderId: string) => {
    try {
      if (orderId) {
        // Update order payment status
        await strapiAPI.orders.updatePayment(orderId, {
          paypalOrderId,
          paypalCaptureId: paypalOrderId,
          status: 'COMPLETED',
        })

        // Clear cart
        await clearCart()

        // Redirect to confirmation
        router.push(`/checkout/confirmation?orderNumber=${paypalOrderId}`)
      }
    } catch (error) {
      console.error('Payment update error:', error)
    }
  }

  if (!cart || cart.items.length === 0) {
    return null
  }

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={shippingInfo.firstName}
                    onChange={(e) => handleInputChange(e, 'shipping')}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={shippingInfo.lastName}
                    onChange={(e) => handleInputChange(e, 'shipping')}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={shippingInfo.phone}
                  onChange={(e) => handleInputChange(e, 'shipping')}
                />
              </div>

              <div>
                <Label htmlFor="street">Street Address *</Label>
                <Input
                  id="street"
                  name="street"
                  value={shippingInfo.street}
                  onChange={(e) => handleInputChange(e, 'shipping')}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={shippingInfo.city}
                    onChange={(e) => handleInputChange(e, 'shipping')}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State/Province *</Label>
                  <Input
                    id="state"
                    name="state"
                    value={shippingInfo.state}
                    onChange={(e) => handleInputChange(e, 'shipping')}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="postalCode">Postal Code *</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={shippingInfo.postalCode}
                    onChange={(e) => handleInputChange(e, 'shipping')}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    name="country"
                    value={shippingInfo.country}
                    onChange={(e) => handleInputChange(e, 'shipping')}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sameAsBilling"
                  checked={sameAsBilling}
                  onCheckedChange={(checked) => setSameAsBilling(checked as boolean)}
                />
                <label
                  htmlFor="sameAsBilling"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Billing address same as shipping
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Selection */}
          {!showPayment && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as 'paypal' | 'cod')}>
                  <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-gray-50">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex flex-1 cursor-pointer items-center gap-3">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">PayPal</p>
                        <p className="text-sm text-gray-500">Pay securely with PayPal</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-gray-50">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex flex-1 cursor-pointer items-center gap-3">
                      <Banknote className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-sm text-gray-500">Pay when you receive your order (Luxor only)</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'cod' && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Please have the exact amount ready when your order is delivered. Our delivery team will collect the payment.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}

          {/* Payment Section */}
          {showPayment && orderId && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProductPayPalCheckout
                  amount={finalTotal}
                  currency="USD"
                  description={`Order for ${itemCount} items`}
                  onSuccess={handlePaymentSuccess}
                  onError={(error) => {
                    toast({
                      title: 'Payment Failed',
                      description: 'Please try again or contact support',
                      variant: 'destructive',
                    })
                  }}
                />
              </CardContent>
            </Card>
          )}

          {/* Place Order Button */}
          {!showPayment && (
            <Button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : paymentMethod === 'cod' ? (
                <>
                  <Banknote className="mr-2 h-5 w-5" />
                  Place Order (Pay on Delivery)
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-5 w-5" />
                  Continue to Payment
                </>
              )}
            </Button>
          )}
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-3">
                {cart.items.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={getMediaUrl(item.image)}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Pricing */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {shippingCost === 0 && (
                <div className="rounded-md bg-green-50 p-3 text-sm text-green-800">
                  🎉 You qualify for FREE shipping!
                </div>
              )}

              <Link href="/shop" className="block">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
