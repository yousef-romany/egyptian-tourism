"use client"

import React from 'react'

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthSessionProvider({ children }: AuthProviderProps) {
  // Simple provider wrapper for future NextAuth integration
  // Currently just passes through children
  return <>{children}</>
}