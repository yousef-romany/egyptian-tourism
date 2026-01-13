"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetErrorBoundary: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-muted p-4">
          <div className="max-w-md w-full">
            <FallbackComponent error={this.state.error} resetErrorBoundary={() => this.resetErrorBoundary()} />
          </div>
        </div>
      )
    }

    return this.props.children
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: undefined })
  }
}

function DefaultErrorFallback({ error, resetErrorBoundary }: { error?: Error; resetErrorBoundary: () => void }) {
  return (
    <Card className="border-red-200 bg-red-50">
      <CardHeader className="text-center">
        <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-4" />
        <CardTitle className="text-red-800">Something went wrong</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-red-700 mb-4">
          {error?.message || 'An unexpected error occurred while loading this page.'}
        </p>
        
        {error?.message && (
          <details className="text-left">
            <summary className="cursor-pointer text-sm text-red-600 hover:text-red-800 mb-2">
              Technical Details
            </summary>
            <div className="mt-2 p-3 bg-red-100 rounded-md text-sm">
              <pre className="whitespace-pre-wrap text-red-800">
                {error.stack}
              </pre>
            </div>
          </details>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={resetErrorBoundary}
            className="text-red-600 border-red-300 hover:bg-red-50"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          
          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="text-red-600 border-red-300 hover:bg-red-50"
          >
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}