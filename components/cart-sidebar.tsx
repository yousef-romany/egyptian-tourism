'use client'

import { useState } from 'react'
import { useCart } from '@/hooks/use-cart'
import { getMediaUrl } from '@/lib/api/strapi'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function CartSidebar() {
  const { cart, itemCount, totalAmount, updateItemQuantity, removeItem } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#d4af37] text-xs font-bold text-white">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({itemCount})</SheetTitle>
        </SheetHeader>

        {!cart || cart.items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <ShoppingCart className="mb-4 h-16 w-16 text-gray-300" />
            <p className="mb-2 text-lg font-medium text-gray-900">Your cart is empty</p>
            <p className="mb-6 text-sm text-gray-500">
              Add some products to get started!
            </p>
            <Button onClick={() => setIsOpen(false)} asChild>
              <Link href="/shop">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 border-b border-gray-200 pb-4"
                  >
                    {/* Product Image */}
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Image
                        src={getMediaUrl(item.image)}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="mt-1 text-sm text-gray-500">
                        {item.currency} ${item.price.toFixed(2)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateItemQuantity(item.productId, item.quantity - 1)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 hover:bg-gray-50"
                          disabled={item.quantity <= 1}
                        >
                          {item.quantity <= 1 ? (
                            <Trash2 className="h-3 w-3 text-red-500" />
                          ) : (
                            <Minus className="h-3 w-3" />
                          )}
                        </button>

                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateItemQuantity(item.productId, item.quantity + 1)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 hover:bg-gray-50"
                        >
                          <Plus className="h-3 w-3" />
                        </button>

                        <span className="ml-auto text-sm font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Footer */}
            <div className="border-t border-gray-200 pt-4">
              <div className="mb-4 flex justify-between text-base font-medium">
                <p>Subtotal</p>
                <p>${totalAmount.toFixed(2)}</p>
              </div>
              <p className="mb-4 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>

              <Button asChild className="mb-2 w-full">
                <Link href="/checkout" onClick={() => setIsOpen(false)}>
                  Proceed to Checkout
                </Link>
              </Button>

              <Button
                variant="outline"
                asChild
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
