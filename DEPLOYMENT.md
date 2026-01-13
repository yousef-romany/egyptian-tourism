# Production Deployment Guide

## Environment Variables

### Frontend (.env.local)
```env
# Strapi Backend API
NEXT_PUBLIC_API_URL=https://your-production-api.com/api
NEXT_PUBLIC_STRAPI_URL=https://your-production-api.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=Egydise Tours

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxxxxxxxxxx

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Backend (.env)
```env
# Server Configuration
HOST=0.0.0.0
PORT=1337

# Secrets - CHANGE THESE IN PRODUCTION!
APP_KEYS=your-generated-app-keys-here
API_TOKEN_SALT=your-generated-salt-here
ADMIN_JWT_SECRET=your-generated-jwt-secret-here
JWT_SECRET=your-generated-jwt-secret-here
TRANSFER_TOKEN_SALT=your-generated-transfer-salt-here

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_NAME=your-db-name
DATABASE_USERNAME=your-db-username
DATABASE_PASSWORD=your-db-password
DATABASE_SSL=true

# Server URL
CLIENT_URL=https://your-domain.com
NODE_ENV=production

# Email Configuration
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=SG.your_sendgrid_api_key_here
EMAIL_DEFAULT_FROM=noreply@your-domain.com
EMAIL_DEFAULT_REPLY_TO=info@your-domain.com

# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## Database Setup

1. Switch from SQLite to PostgreSQL for production
2. Create a production database
3. Run migrations: `npm run strapi migrate`
4. Seed data if needed: `npm run strapi seed`

## Security Checklist

- [ ] All JWT secrets are unique and secure
- [ ] Database credentials are secure
- [ ] SSL certificates are installed
- [ ] CORS is configured for production domain
- [ ] Rate limiting is enabled
- [ ] Security headers are configured
- [ ] Environment variables are not exposed to client

## Performance Optimization

- [ ] Images are optimized and served via CDN
- [ ] Gzip compression is enabled
- [ ] Caching headers are configured
- [ ] Build is optimized for production

## Monitoring

- [ ] Error tracking is configured (Sentry, etc.)
- [ ] Performance monitoring is set up
- [ ] Uptime monitoring is configured
- [ ] Log aggregation is implemented

## Deployment Steps

1. Build frontend: `npm run build`
2. Build backend: `npm run build` (in backend directory)
3. Deploy backend to your hosting provider
4. Deploy frontend to your hosting provider
5. Configure custom domain and SSL
6. Set up database connection
7. Configure environment variables
8. Test all critical functionality
9. Set up monitoring and alerts