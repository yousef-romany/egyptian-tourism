# Authentication Setup Guide

This guide explains how to set up OAuth authentication for the Egyptian Tourism website.

## Overview

The authentication system supports:
- Google OAuth (redirect-based)
- Facebook OAuth (redirect-based)
- Email/Password authentication via Strapi API

Note: Currently, the OAuth implementation uses redirect-based authentication. Full NextAuth.js integration will be available after installing the package.

## Setup Instructions

### 1. Environment Variables

Copy the `.env.example` file to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:
- `NEXTAUTH_URL` - Your application's URL (e.g., http://localhost:3000 for development)
- `NEXTAUTH_SECRET` - A random secret string for JWT signing
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `FACEBOOK_CLIENT_ID` - Facebook App ID
- `FACEBOOK_CLIENT_SECRET` - Facebook App Secret

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google` (for development)
5. Copy the Client ID and Client Secret to your `.env.local`

### 3. Facebook OAuth Setup

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app or select existing one
3. Add Facebook Login product
4. Configure OAuth redirect URI: `http://localhost:3000/api/auth/callback/facebook` (for development)
5. Copy the App ID and App Secret to your `.env.local`

### 4. Production Deployment

For production, update the following:
- `NEXTAUTH_URL` to your production domain
- Update authorized redirect URIs in Google and Facebook developer consoles

## Components

### Authentication Context (`contexts/auth-context.tsx`)
- Manages user authentication state
- Handles login, logout, and registration
- Integrates with Strapi authentication
- Provides OAuth redirect functionality

### Auth Configuration (`lib/auth.ts`)
- Configures OAuth provider settings
- Provides helper functions for OAuth URLs
- Prepares for NextAuth integration

### API Route (`app/api/auth/[...nextauth]/route.ts`)
- Handles OAuth initiation
- Processes OAuth callbacks (placeholder for NextAuth integration)

### Session Provider (`components/providers/session-provider.tsx`)
- Simple provider wrapper for future NextAuth integration

### Login Page (`app/[locale]/login/ClientPage.tsx`)
- Provides login form with email/password
- Includes OAuth login buttons for Google and Facebook
- Handles registration form

### Navbar (`components/navbar.tsx`)
- Shows user avatar when logged in
- Provides dropdown menu with user options
- Shows login/register buttons when not authenticated

## Usage

### Login with OAuth
```javascript
import { useAuth } from '@/contexts/auth-context'

const { loginWithOAuth } = useAuth()

// Login with Google (redirects to Google OAuth)
await loginWithOAuth('google')

// Login with Facebook (redirects to Facebook OAuth)
await loginWithOAuth('facebook')
```

### Login with Email/Password
```javascript
import { useAuth } from '@/contexts/auth-context'

const { login } = useAuth()

await login(email, password)
```

### Logout
```javascript
import { useAuth } from '@/contexts/auth-context'

const { logout } = useAuth()

await logout()
```

### Check Authentication Status
```javascript
import { useAuth } from '@/contexts/auth-context'

const { user, isAuthenticated, isLoading } = useAuth()

if (isLoading) {
  // Loading state
} else if (isAuthenticated) {
  // User is logged in
  console.log(user.email)
} else {
  // User is not logged in
}
```

## Security Considerations

1. Always use HTTPS in production
2. Keep your `.env.local` file secure and never commit it to version control
3. Use strong secrets for `NEXTAUTH_SECRET`
4. Regularly rotate your OAuth client secrets
5. Implement proper session timeout handling

## Troubleshooting

### Common Issues

1. **OAuth Callback Errors**
   - Check that redirect URIs match exactly in developer consoles
   - Ensure `NEXTAUTH_URL` is set correctly

2. **Session Not Persisting**
   - Verify `NEXTAUTH_SECRET` is set
   - Check browser cookies are enabled

3. **CORS Issues**
   - Ensure all origins are properly configured in OAuth provider settings

## Testing

To test the authentication flow:

1. Start the development server
2. Navigate to `/login`
3. Try both OAuth and email/password login
4. Verify user state updates in navbar
5. Test logout functionality

## Next Steps

1. Add more OAuth providers if needed
2. Implement role-based access control
3. Add two-factor authentication
4. Set up user profile management
5. Implement social account linking