'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Loader2, ArrowLeft, Calendar, Users, MapPin, Shield, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [bookingData, setBookingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Get PayPal Client ID from env
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test';

  // Get booking data from URL params
  const bookingReference = searchParams.get('bookingReference');
  const totalPrice = searchParams.get('totalPrice');
  const customerName = searchParams.get('customerName');
  const email = searchParams.get('email');
  const tourName = searchParams.get('tourName');
  const tourDate = searchParams.get('tourDate');
  const numberOfPeople = searchParams.get('numberOfPeople');

  useEffect(() => {
    if (!bookingReference || !totalPrice || !customerName || !email) {
      setError('Missing required booking information');
      setIsLoading(false);
      return;
    }

    const bookingInfo = {
      bookingReference,
      totalPrice: parseFloat(totalPrice),
      customerName,
      email,
      tourName: tourName || 'Tour',
      tourDate: tourDate || new Date().toISOString(),
      numberOfPeople: parseInt(numberOfPeople || '1') || 1,
    };

    setBookingData(bookingInfo);
    setIsLoading(false);
  }, [bookingReference, totalPrice, customerName, email, tourName, tourDate, numberOfPeople]);

  const createOrder = async () => {
    if (!bookingData) throw new Error("No booking details");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/paypal/create-order`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: bookingData.totalPrice,
            currency: 'USD',
            description: `${bookingData.tourName} - ${bookingData.numberOfPeople} people`,
            bookingReference: bookingData.bookingReference,
            bookingId: bookingData.bookingReference,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to create PayPal order');
      }

      return data.data.orderId;
    } catch (err: any) {
      toast({
        title: "Order Creation Failed",
        description: err.message || "Failed to create order. Please try again.",
        variant: "destructive",
      });
      throw err;
    }
  };

  const onApprove = async (data: any) => {
    if (!bookingData) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/paypal/capture-payment`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: data.orderID,
            token: data.orderID,
            PayerID: data.payerID,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Payment Successful",
          description: "Your booking has been confirmed!",
        });
        // Redirect to success page
        const params = new URLSearchParams({
          token: data.orderID,
          PayerID: data.payerID,
          bookingId: bookingData.bookingReference,
        });
        router.push(`/payment/success?${params.toString()}`);
      } else {
        throw new Error(result.error?.message || 'Payment capture failed');
      }
    } catch (err: any) {
      toast({
        title: "Payment Failed",
        description: err.message || "Failed to capture payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const onCancel = () => {
    router.push('/payment/cancel');
  };

  const onError = (err: any) => {
    console.error('PayPal error:', err);
    setError('Payment processing failed. Please try again or contact support.');
    toast({
      title: "Payment Error",
      description: "An error occurred during payment processing.",
      variant: "destructive",
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (error || !bookingData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-red-600">Payment Error</CardTitle>
            <CardDescription>
              {error || 'Failed to load booking information'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/tours">
              <Button className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Tours
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/tours" className="flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tours
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Booking Details */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{bookingData.tourName}</h3>
                <p className="text-sm text-muted-foreground">Ref: {bookingData.bookingReference}</p>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {new Date(bookingData.tourDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {bookingData.numberOfPeople} {bookingData.numberOfPeople === 1 ? 'Person' : 'People'}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Egypt</span>
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span>Customer</span>
                  <span className="font-medium">{bookingData.customerName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Email</span>
                  <span className="font-medium text-sm">{bookingData.email}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total</span>
                <span>${bookingData.totalPrice.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* PayPal Payment */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Pay with PayPal</CardTitle>
              <CardDescription>
                Secure payment processing with buyer protection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Security Badges */}
                <div className="space-y-3 pb-6 border-b">
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-muted-foreground">
                      Secure SSL encryption
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-muted-foreground">
                      Buyer protection included
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-5 w-5 text-egyptian-gold" />
                    <span className="text-muted-foreground">
                      Instant confirmation
                    </span>
                  </div>
                </div>

                {/* PayPal Buttons */}
                <PayPalScriptProvider
                  options={{
                    "client-id": PAYPAL_CLIENT_ID,
                    currency: "USD",
                  }}
                >
                  <div className="space-y-4">
                    <PayPalButtons
                      style={{
                        layout: "vertical",
                        color: "gold",
                        shape: "rect",
                        label: "paypal",
                      }}
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onCancel={onCancel}
                      onError={onError}
                    />

                    {error && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-300 text-sm">
                        {error}
                      </div>
                    )}
                  </div>
                </PayPalScriptProvider>

                <div className="pt-4 border-t text-center">
                  <p className="text-xs text-muted-foreground mb-4">
                    By completing payment, you agree to our{' '}
                    <a href="/terms" className="text-egyptian-gold hover:underline">
                      Terms & Conditions
                    </a>
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push('/contact')}
                    className="text-egyptian-gold"
                  >
                    Need help? Contact us →
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}