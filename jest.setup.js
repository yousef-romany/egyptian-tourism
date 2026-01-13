import '@testing-library/jest-dom'
import { configure } from '@testing-library/react'

// Configure React Testing Library
configure({ testIdAttribute: 'data-testid' })

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
        route: '/',
        pathname: '/',
        query: '',
        asPath: '',
        push: jest.fn(),
        pop: jest.fn(),
        reload: jest.fn(),
        back: jest.fn(),
        prefetch: jest.fn(),
        beforePopState: jest.fn(),
        events: {
            on: jest.fn(),
            off: jest.fn(),
            trigger: jest.fn(),
        },
    }
  },
}))

// Mock Next.js image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}))

// Mock environment variables
process.env.NEXT_PUBLIC_STRAPI_URL = 'http://localhost:1337'
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'