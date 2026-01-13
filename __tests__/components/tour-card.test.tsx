import { render, screen } from '@testing-library/react'
import TourCardServer from '@/components/tour-card-server'

const mockTour = {
  id: 1,
  title: 'Pyramids Adventure',
  slug: 'pyramids-adventure',
  image: '/pyramids.jpg',
  duration: '5 days',
  location: 'Giza, Egypt',
  price: '500',
  rating: 4.8,
  reviews: 120,
  description: 'Explore the ancient pyramids',
  category: 'Historical',
}

describe('TourCardServer', () => {
  it('renders tour information correctly', () => {
    render(<TourCardServer tour={mockTour} />)

    expect(screen.getByText('Pyramids Adventure')).toBeInTheDocument()
    expect(screen.getByText('Giza, Egypt')).toBeInTheDocument()
    expect(screen.getByText('5 days')).toBeInTheDocument()
    expect(screen.getByText('$500')).toBeInTheDocument()
  })

  it('displays rating with correct value', () => {
    render(<TourCardServer tour={mockTour} />)

    expect(screen.getByText('4.8')).toBeInTheDocument()
    expect(screen.getByText(/\(120\)/)).toBeInTheDocument()
  })

  it('has proper link to tour detail page', () => {
    render(<TourCardServer tour={mockTour} />)

    const link = screen.getByRole('link', { name: /pyramids adventure/i })
    expect(link).toHaveAttribute('href', '/tours/pyramids-adventure')
  })

  it('renders wishlist button with proper aria label', () => {
    render(<TourCardServer tour={mockTour} />)

    const wishlistButton = screen.getByRole('button', { name: /add to wishlist/i })
    expect(wishlistButton).toBeInTheDocument()
  })

  it('has accessible image with alt text', () => {
    render(<TourCardServer tour={mockTour} />)

    const image = screen.getByRole('img', { name: /pyramids adventure/i })
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', expect.stringContaining('pyramids'))
  })
})
