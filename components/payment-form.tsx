'use client';

import React, { useState, FormEvent } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Loader2, CheckCircle } from 'lucide-react';
import { useToast } from './ui/use-toast';

interface PaymentFormProps {
  bookingData: {
    totalPrice: number;
    bookingReference: string;
    customerName: string;
    email: string;
  };
  onSuccess: (paymentIntentId: string) => void;
  onCancel: () => void;
}

export function PaymentForm({ bookingData, onSuccess, onCancel }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsProcessing(true);
    setMessage('');

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/book-now/confirmation`,
        receipt_email: bookingData.email,
      },
    });

    if (error) {
      setMessage(error.message || 'An unexpected error occurred.');
      toast({
        title: "Payment Failed",
        description: error.message || "An error occurred during payment processing.",
        variant: "destructive",
      });
    } else {
      setIsComplete(true);
      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully.",
      });
      // The payment will be confirmed via webhook, but we can still show success
      // In a real implementation, you might want to poll the backend or use a real-time connection
    }

    setIsProcessing(false);
  };

  if (isComplete) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-green-600">Payment Successful!</CardTitle>
          <CardDescription>
            Your booking has been confirmed. You will receive a confirmation email shortly.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button 
            onClick={() => onSuccess('')} 
            className="w-full"
          >
            View Booking Details
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Payment</CardTitle>
        <CardDescription>
          Please enter your payment details to confirm your booking.
        </CardDescription>
        <div className="mt-2 text-sm">
          <p>Booking Reference: <span className="font-semibold">{bookingData.bookingReference}</span></p>
          <p>Total Amount: <span className="font-semibold">${bookingData.totalPrice.toFixed(2)}</span></p>
        </div>
      </CardHeader>
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardContent>
          <PaymentElement 
            options={{
              layout: 'tabs'
            }}
          />
          {message && (
            <div id="payment-message" className="mt-4 text-red-600 text-sm">
              {message}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            id="submit" 
            type="submit" 
            disabled={isProcessing || !stripe || !elements}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay $${bookingData.totalPrice.toFixed(2)}`
            )}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isProcessing}
            className="w-full"
          >
            Cancel
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}