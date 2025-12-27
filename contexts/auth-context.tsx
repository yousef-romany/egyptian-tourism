"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import strapiAPI, { User, AuthResponse } from '@/lib/api/strapi'

// ============================================================================
// Types
// ============================================================================

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (identifier: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  updateUser: (data: Partial<User>) => Promise<void>
  refreshUser: () => Promise<void>
}

interface RegisterData {
  username: string
  email: string
  password: string
  firstName?: string
  lastName?: string
  phone?: string
  nationality?: string
}

interface AuthProviderProps {
  children: ReactNode
}

// ============================================================================
// Context
// ============================================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// ============================================================================
// Provider Component
// ============================================================================

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check authentication status on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check if user is authenticated
        if (strapiAPI.auth.isAuthenticated()) {
          // Try to get fresh user data from API
          const userData = await strapiAPI.auth.getMe()
          setUser(userData)
        } else {
          // Check localStorage for cached user data
          const cachedUser = strapiAPI.getStoredUser()
          if (cachedUser) {
            setUser(cachedUser)
          }
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error)
        // Clear invalid token
        strapiAPI.auth.logout()
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  /**
   * Login user
   */
  const login = async (identifier: string, password: string) => {
    try {
      setIsLoading(true)
      const authData: AuthResponse = await strapiAPI.auth.login(identifier, password)
      setUser(authData.user)
    } catch (error: any) {
      console.error('Login failed:', error)
      throw new Error(
        error?.error?.message || 'Login failed. Please check your credentials.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Register new user
   */
  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true)
      const authData: AuthResponse = await strapiAPI.auth.register(data)
      setUser(authData.user)
    } catch (error: any) {
      console.error('Registration failed:', error)
      const message = error?.error?.message || 'Registration failed. Please try again.'
      throw new Error(message)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Logout user
   */
  const logout = () => {
    strapiAPI.auth.logout()
    setUser(null)
  }

  /**
   * Update user profile
   */
  const updateUser = async (data: Partial<User>) => {
    try {
      setIsLoading(true)
      const updatedUser = await strapiAPI.profile.update(data)
      setUser(updatedUser)
    } catch (error: any) {
      console.error('Update failed:', error)
      throw new Error(error?.error?.message || 'Failed to update profile.')
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Refresh user data from server
   */
  const refreshUser = async () => {
    try {
      const userData = await strapiAPI.auth.getMe()
      setUser(userData)
    } catch (error) {
      console.error('Failed to refresh user:', error)
      // If refresh fails, user might be logged out
      logout()
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// ============================================================================
// Hook
// ============================================================================

/**
 * Hook to access auth context
 * @throws Error if used outside AuthProvider
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// ============================================================================
// Utility Hook for Protected Routes
// ============================================================================

/**
 * Hook to protect routes - redirects to login if not authenticated
 */
export function useRequireAuth(): AuthContextType {
  const auth = useAuth()

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      // Redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
      }
    }
  }, [auth.isAuthenticated, auth.isLoading])

  return auth
}
