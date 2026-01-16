/**
 * Strapi OAuth Configuration
 *
 * This file contains helper functions for OAuth authentication with Strapi backend.
 * Strapi handles the OAuth flow and returns JWT tokens.
 *
 * @see https://docs.strapi.io/dev-docs/plugins/users-permissions#providers
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const FRONTEND_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const authConfig = {
  providers: {
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      // Strapi handles the OAuth callback
      redirectUri: `${STRAPI_URL}/api/connect/google/callback`,
    },
    facebook: {
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID || "",
      // Strapi handles the OAuth callback
      redirectUri: `${STRAPI_URL}/api/connect/facebook/callback`,
    },
  },
}

/**
 * Get Google OAuth URL that redirects to Strapi
 */
export const getGoogleAuthUrl = () => {
  // Strapi's Google OAuth endpoint
  return `${STRAPI_URL}/api/connect/google`
}

/**
 * Get Facebook OAuth URL that redirects to Strapi
 */
export const getFacebookAuthUrl = () => {
  // Strapi's Facebook OAuth endpoint
  return `${STRAPI_URL}/api/connect/facebook`
}