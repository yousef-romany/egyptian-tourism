import { render, screen } from '@testing-library/react'
import Navbar from '@/components/navbar'

describe('Navbar', () => {
  it('renders the logo', () => {
    render(<Navbar />)
    const logo = screen.getByAltText(/logo/i)
    expect(logo).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Navbar />)
    expect(screen.getByText(/tours/i)).toBeInTheDocument()
    expect(screen.getByText(/blog/i)).toBeInTheDocument()
    expect(screen.getByText(/about/i)).toBeInTheDocument()
    expect(screen.getByText(/contact/i)).toBeInTheDocument()
  })

  it('renders mobile menu button on small screens', () => {
    render(<Navbar />)
    const menuButton = screen.getByRole('button', { name: /menu/i })
    expect(menuButton).toBeInTheDocument()
  })

  it('has proper ARIA labels for accessibility', () => {
    render(<Navbar />)
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'main navigation')
  })
})
