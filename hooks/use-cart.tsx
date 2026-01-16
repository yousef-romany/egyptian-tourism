'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import strapiAPI, { Cart, CartItem, Product } from '@/lib/api/strapi'
import { useToast } from '@/components/ui/use-toast'

interface CartContextType {
  cart: Cart | null
  itemCount: number
  totalAmount: number
  isLoading: boolean
  addItem: (product: Product, quantity?: number) => Promise<void>
  removeItem: (productId: number) => Promise<void>
  updateItemQuantity: (productId: number, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Check if user is authenticated
  const isAuthenticated = useCallback(() => {
    if (typeof window === 'undefined') return false
    return !!localStorage.getItem('jwt')
  }, [])

  // Load cart from backend or localStorage
  const loadCart = useCallback(async () => {
    try {
      if (isAuthenticated()) {
        // Load from backend for authenticated users
        const backendCart = await strapiAPI.cart.get()
        setCart(backendCart)

        // Sync to localStorage as backup
        localStorage.setItem('cart', JSON.stringify(backendCart))
      } else {
        // Load from localStorage for guests
        const localCart = localStorage.getItem('cart')
        if (localCart) {
          setCart(JSON.parse(localCart))
        } else {
          // Initialize empty cart
          setCart({
            id: 0,
            items: [],
            totalAmount: 0,
            currency: 'USD',
            status: 'active',
            lastModified: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
        }
      }
    } catch (error) {
      console.error('Failed to load cart:', error)

      // Fallback to localStorage
      const localCart = localStorage.getItem('cart')
      if (localCart) {
        setCart(JSON.parse(localCart))
      } else {
        setCart({
          id: 0,
          items: [],
          totalAmount: 0,
          currency: 'USD',
          status: 'active',
          lastModified: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      }
    } finally {
      setIsLoading(false)
    }
  }, [isAuthenticated])

  // Save cart to localStorage (for guests)
  const saveToLocalStorage = useCallback((updatedCart: Cart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }, [])

  // Add item to cart
  const addItem = useCallback(async (product: Product, quantity: number = 1) => {
    try {
      if (isAuthenticated()) {
        // Add to backend
        const updatedCart = await strapiAPI.cart.addItem(product.id, quantity)
        setCart(updatedCart)
        saveToLocalStorage(updatedCart)

        toast({
          title: 'Added to cart',
          description: `${product.name} has been added to your cart.`,
        })
      } else {
        // Add to localStorage for guests
        const currentCart = cart || {
          id: 0,
          items: [],
          totalAmount: 0,
          currency: 'USD',
          status: 'active',
          lastModified: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        const existingItemIndex = currentCart.items.findIndex(
          (item) => item.productId === product.id
        )

        let updatedItems: CartItem[]
        if (existingItemIndex >= 0) {
          // Update quantity
          updatedItems = [...currentCart.items]
          updatedItems[existingItemIndex].quantity += quantity
        } else {
          // Add new item
          updatedItems = [
            ...currentCart.items,
            {
              productId: product.id,
              name: product.name,
              slug: product.slug,
              price: product.price,
              currency: product.currency,
              quantity,
              image: product.images?.[0],
            },
          ]
        }

        const totalAmount = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )

        const updatedCart: Cart = {
          ...currentCart,
          items: updatedItems,
          totalAmount,
          lastModified: new Date().toISOString(),
        }

        setCart(updatedCart)
        saveToLocalStorage(updatedCart)

        toast({
          title: 'Added to cart',
          description: `${product.name} has been added to your cart.`,
        })
      }
    } catch (error: any) {
      console.error('Failed to add item to cart:', error)
      toast({
        title: 'Error',
        description: error?.error?.message || 'Failed to add item to cart',
        variant: 'destructive',
      })
    }
  }, [cart, isAuthenticated, saveToLocalStorage, toast])

  // Remove item from cart
  const removeItem = useCallback(async (productId: number) => {
    try {
      if (isAuthenticated()) {
        const updatedCart = await strapiAPI.cart.removeItem(productId)
        setCart(updatedCart)
        saveToLocalStorage(updatedCart)
      } else {
        const currentCart = cart
        if (!currentCart) return

        const updatedItems = currentCart.items.filter(
          (item) => item.productId !== productId
        )
        const totalAmount = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )

        const updatedCart: Cart = {
          ...currentCart,
          items: updatedItems,
          totalAmount,
          lastModified: new Date().toISOString(),
        }

        setCart(updatedCart)
        saveToLocalStorage(updatedCart)
      }

      toast({
        title: 'Removed from cart',
        description: 'Item has been removed from your cart.',
      })
    } catch (error: any) {
      console.error('Failed to remove item from cart:', error)
      toast({
        title: 'Error',
        description: error?.error?.message || 'Failed to remove item from cart',
        variant: 'destructive',
      })
    }
  }, [cart, isAuthenticated, saveToLocalStorage, toast])

  // Update item quantity
  const updateItemQuantity = useCallback(async (productId: number, quantity: number) => {
    try {
      if (quantity <= 0) {
        await removeItem(productId)
        return
      }

      if (isAuthenticated()) {
        const updatedCart = await strapiAPI.cart.updateItem(productId, quantity)
        setCart(updatedCart)
        saveToLocalStorage(updatedCart)
      } else {
        const currentCart = cart
        if (!currentCart) return

        const updatedItems = currentCart.items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        )
        const totalAmount = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )

        const updatedCart: Cart = {
          ...currentCart,
          items: updatedItems,
          totalAmount,
          lastModified: new Date().toISOString(),
        }

        setCart(updatedCart)
        saveToLocalStorage(updatedCart)
      }
    } catch (error: any) {
      console.error('Failed to update item quantity:', error)
      toast({
        title: 'Error',
        description: error?.error?.message || 'Failed to update item quantity',
        variant: 'destructive',
      })
    }
  }, [cart, isAuthenticated, removeItem, saveToLocalStorage, toast])

  // Clear cart
  const clearCart = useCallback(async () => {
    try {
      if (isAuthenticated()) {
        const updatedCart = await strapiAPI.cart.clear()
        setCart(updatedCart)
        saveToLocalStorage(updatedCart)
      } else {
        const emptyCart: Cart = {
          id: 0,
          items: [],
          totalAmount: 0,
          currency: 'USD',
          status: 'active',
          lastModified: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        setCart(emptyCart)
        saveToLocalStorage(emptyCart)
      }

      toast({
        title: 'Cart cleared',
        description: 'All items have been removed from your cart.',
      })
    } catch (error: any) {
      console.error('Failed to clear cart:', error)
      toast({
        title: 'Error',
        description: error?.error?.message || 'Failed to clear cart',
        variant: 'destructive',
      })
    }
  }, [isAuthenticated, saveToLocalStorage, toast])

  // Refresh cart
  const refreshCart = useCallback(async () => {
    setIsLoading(true)
    await loadCart()
  }, [loadCart])

  // Load cart on mount
  useEffect(() => {
    loadCart()
  }, [loadCart])

  // Sync localStorage cart to backend when user logs in
  useEffect(() => {
    const syncCartOnLogin = async () => {
      const localCart = localStorage.getItem('cart')
      if (isAuthenticated() && localCart) {
        try {
          const parsedCart: Cart = JSON.parse(localCart)
          if (parsedCart.items.length > 0) {
            // Add all items from localStorage to backend
            for (const item of parsedCart.items) {
              await strapiAPI.cart.addItem(item.productId, item.quantity)
            }
            // Refresh cart from backend
            await loadCart()
          }
        } catch (error) {
          console.error('Failed to sync cart on login:', error)
        }
      }
    }

    syncCartOnLogin()
  }, [isAuthenticated, loadCart])

  const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0
  const totalAmount = cart?.totalAmount || 0

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount,
        totalAmount,
        isLoading,
        addItem,
        removeItem,
        updateItemQuantity,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
