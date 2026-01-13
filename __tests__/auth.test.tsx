import { render, screen } from '@testing-library/react'
import { AuthProvider } from '@/contexts/auth-context'

// Mock user for testing
const mockUser = {
  id: 1,
  username: 'testuser',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  confirmed: true,
  blocked: false,
}

describe('AuthProvider', () => {
  it('provides user context to children', () => {
    render(
      <AuthProvider>
        <div>Test Content</div>
      </AuthProvider>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('provides authentication state', () => {
    const TestComponent = () => {
      const { user } = useAuth()
      
      return (
        <div data-testid="user-info">
          {user ? <span data-testid="user-email">{user.email}</span> : <span>No user</span>}
        </div>
      )
    }

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId('user-email')).toBeInTheDocument()
  })
})