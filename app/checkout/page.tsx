'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PaymentForm } from '@/components/payment-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Loader2, ArrowLeft, Calendar, Users, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const [bookingData, setBookingData] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

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
    createPaymentIntent(bookingInfo);
  }, [bookingReference, totalPrice, customerName, email, tourName, tourDate, numberOfPeople]);

  const createPaymentIntent = async (bookingInfo: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/stripe/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            totalPrice: bookingInfo.totalPrice,
            bookingReference: bookingInfo.bookingReference,
            customerName: bookingInfo.customerName,
            email: bookingInfo.email,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to create payment intent');
      }

      setClientSecret(data.data.clientSecret);
    } catch (err: any) {
      setError(err.message || 'An error occurred while setting up payment');
      toast({
        title: "Payment Setup Failed",
        description: err.message || "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = (paymentIntentId: string) => {
    toast({
      title: "Payment Successful",
      description: "Your booking has been confirmed!",
    });
    router.push(`/book-now/confirmation?bookingReference=${bookingReference}`);
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Setting up payment...</p>
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

        {/* Payment Form */}
        <div className="lg:col-span-2">
          {clientSecret ? (
            <PaymentForm
              bookingData={bookingData}
              onSuccess={handlePaymentSuccess}
              onCancel={handleCancel}
            />
          ) : (
            <Card className="w-full max-w-md mx-auto">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p>Initializing payment form...</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}