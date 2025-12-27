# Egyptian Tourism - Setup Guide

This guide will help you complete the connection between the frontend and Strapi backend.

## Current Status

### ✅ What's Already Done

1. **Backend Server Running**
   - Strapi backend is running at: http://localhost:1337
   - Admin panel available at: http://localhost:1337/admin

2. **Frontend Server Running**
   - Next.js frontend is running at: http://localhost:3000
   - Environment variables configured in `.env.local`

3. **API Client Configured**
   - Full Strapi API client: `lib/api/strapi.ts`
   - Data layer converted to use API: `lib/data/tours.ts`, `lib/data/reviews.ts`

4. **Content Types Created**
   - Tours, Reviews, Blog Posts, Bookings, Newsletter, Contact, Wishlist

---

## 🚀 Required Setup Steps

### Step 1: Create Admin Account

1. Open your browser and go to: **http://localhost:1337/admin**
2. You'll see the "Create your first administrator" page
3. Fill in the form:
   - **First name**: Your first name
   - **Last name**: Your last name
   - **Email**: Your email address
   - **Password**: Choose a strong password (min 8 characters)
4. Click **"Let's start"**

---

### Step 2: Configure Public Permissions (CRITICAL!)

The backend is returning 403 Forbidden errors because public access isn't enabled yet.

1. After logging in to the admin panel, go to:
   **Settings → Users & Permissions Plugin → Roles → Public**

2. **Enable these permissions for Tours:**
   - ✅ `find` - Get all tours
   - ✅ `findOne` - Get single tour
   - ✅ `featured` - Get featured tours (if custom route exists)

3. **Enable these permissions for Reviews:**
   - ✅ `find` - Get all reviews
   - ✅ `findOne` - Get single review
   - ✅ `featured` - Get featured reviews
   - ✅ `platform` - Get reviews by platform
   - ✅ `stats` - Get review statistics

4. **Enable these permissions for Blog Posts:**
   - ✅ `find` - Get all blog posts
   - ✅ `findOne` - Get single blog post
   - ✅ `featured` - Get featured posts
   - ✅ `category` - Get posts by category

5. **Enable these permissions for Newsletter Subscriptions:**
   - ✅ `subscribe` - Allow newsletter subscriptions

6. **Enable these permissions for Contact Submissions:**
   - ✅ `create` - Allow contact form submissions

7. **Enable these permissions for Bookings:**
   - ✅ `create` - Allow booking creation
   - ✅ `reference` - Find booking by reference number

8. **Click "Save"** in the top right corner

---

### Step 3: Add Sample Data

#### Add Tours

1. In the Strapi admin, go to **Content Manager → Tours**
2. Click **"Create new entry"**
3. Fill in the tour details:
   - **Title**: e.g., "Giza Pyramids & Sphinx Tour"
   - **Slug**: Auto-generated from title (e.g., "giza-pyramids-sphinx-tour")
   - **Description**: Full tour description
   - **Excerpt**: Short summary
   - **Price**: e.g., 89
   - **Duration**: e.g., "8 hours"
   - **Location**: e.g., "Cairo"
   - **Category**: Select from dropdown (Historical, Adventure, Cultural, etc.)
   - **Rating**: e.g., 4.9
   - **Reviews**: Number of reviews (e.g., 1250)
   - **Group Size**: e.g., "Up to 15 people"
   - **Featured**: Toggle ON for featured tours
   - **Image**: Upload main tour image
   - **Images**: Upload gallery images (optional)
   - **Highlights**: JSON array, e.g.:
     ```json
     ["Great Pyramid of Giza", "Sphinx", "Valley Temple", "Professional Egyptologist guide"]
     ```
   - **Itinerary**: JSON array of itinerary items (optional)
   - **Included**: JSON array, e.g.:
     ```json
     ["Hotel pickup and drop-off", "Professional guide", "Entrance fees", "Bottled water"]
     ```
   - **Excluded**: JSON array, e.g.:
     ```json
     ["Lunch", "Gratuities", "Personal expenses"]
     ```
   - **FAQs**: JSON array of Q&A (optional)

4. Click **"Save"** and then **"Publish"**
5. Repeat for more tours (recommended: at least 5-7 tours)

#### Add Reviews

1. Go to **Content Manager → Reviews**
2. Click **"Create new entry"**
3. Fill in the review details:
   - **Name**: e.g., "Sarah Johnson"
   - **Location**: e.g., "New York, USA"
   - **Rating**: 1-5 stars
   - **Review**: The review text
   - **Date**: Review date
   - **Platform**: Select (tripadvisor, viator, or klook)
   - **Tour Name**: Name of the tour reviewed
   - **Verified**: Toggle ON
   - **Featured**: Toggle ON for featured reviews
   - **Avatar**: Upload reviewer photo (optional)

4. Click **"Save"** and then **"Publish"**
5. Add reviews for all three platforms (TripAdvisor, Viator, Klook)

#### Add Blog Posts (Optional)

1. Go to **Content Manager → Blog Posts**
2. Create blog posts following similar steps

---

## 🧪 Testing the Integration

### Test API Endpoints

Open these URLs in your browser to verify the API is working:

1. **Get all tours**:
   ```
   http://localhost:1337/api/tours?populate=*
   ```

2. **Get featured tours**:
   ```
   http://localhost:1337/api/tours/featured?populate=*
   ```

3. **Get all reviews**:
   ```
   http://localhost:1337/api/reviews
   ```

4. **Get reviews by platform**:
   ```
   http://localhost:1337/api/reviews/platform/tripadvisor
   ```

5. **Get single tour by slug**:
   ```
   http://localhost:1337/api/tours/giza-pyramids-sphinx-tour?populate=*
   ```
   (Replace the slug with your actual tour slug)

If you see JSON data instead of 403 errors, permissions are configured correctly!

### Test Frontend

1. Open your browser to: **http://localhost:3000**
2. The homepage should now display:
   - Tours fetched from the backend
   - Reviews from TripAdvisor, Viator, and Klook
   - All dynamic content

3. Navigate to:
   - **Tours page**: http://localhost:3000/tours
   - **Individual tour pages**: http://localhost:3000/tours/[slug]
   - **Reviews page**: http://localhost:3000/reviews

---

## 📝 Sample Data Template

### Quick Tour JSON Template

Here's a quick template you can use for adding tours:

**Highlights** (JSON):
```json
["Visit the Great Pyramid of Giza", "See the Sphinx up close", "Expert Egyptologist guide", "Hotel pickup included"]
```

**Included** (JSON):
```json
["Hotel pickup and drop-off", "Professional Egyptologist guide", "All entrance fees", "Bottled water", "Air-conditioned transportation"]
```

**Excluded** (JSON):
```json
["Lunch and meals", "Gratuities and tips", "Personal expenses", "Inside pyramid entrance (extra fee)"]
```

**FAQs** (JSON):
```json
[
  {
    "question": "What should I wear?",
    "answer": "Comfortable clothing and walking shoes. Sun protection recommended."
  },
  {
    "question": "Is lunch included?",
    "answer": "No, lunch is not included but we can recommend nearby restaurants."
  },
  {
    "question": "Can I go inside the pyramids?",
    "answer": "Interior access requires an additional ticket that can be purchased on-site."
  }
]
```

---

## 🔧 Troubleshooting

### Frontend shows "No tours found"
- Check that tours are **Published** in Strapi (not just Saved as Draft)
- Verify Public permissions are enabled for Tours
- Check browser console for API errors

### 403 Forbidden errors
- Public permissions are not configured correctly
- Go back to Step 2 and enable the required permissions

### Images not displaying
- Ensure `NEXT_PUBLIC_STRAPI_URL=http://localhost:1337` is in `.env.local`
- Upload images in Strapi and make sure image field is populated
- Check that images are in the `public/uploads` folder in the backend

### Backend not running
- Run: `cd ../egyptian-tourism-backend && npm run develop`
- Check that it's running on port 1337

### Frontend not running
- Run: `npm run dev` (from frontend directory)
- Check that it's running on port 3000

---

## 🎯 Next Steps After Setup

Once you have data in the backend and everything is working:

1. **Create more content**: Add more tours, reviews, and blog posts
2. **Test all features**:
   - Newsletter subscription
   - Contact form
   - Tour booking
   - Search functionality
   - Filtering and sorting

3. **Customize content**: Update tour descriptions, prices, and images to match your actual offerings

4. **User authentication**: Test user registration, login, and profile features

5. **Production deployment**:
   - Update environment variables for production
   - Use PostgreSQL or MySQL database instead of SQLite
   - Set up cloud storage for images (Cloudinary, AWS S3)

---

## 📚 Additional Resources

- **Strapi Documentation**: https://docs.strapi.io
- **Next.js Documentation**: https://nextjs.org/docs
- **Backend API Documentation**: See `/egyptian-tourism-backend/API_DOCUMENTATION.md`
- **Authentication Guide**: See `/egyptian-tourism-backend/AUTHENTICATION.md`

---

## 🆘 Need Help?

If you encounter issues:

1. Check the browser console for errors (F12)
2. Check the terminal output for both frontend and backend
3. Verify all environment variables are set correctly
4. Ensure both servers are running
5. Check that data is published in Strapi (not in draft mode)

---

**That's it! Once you complete these steps, your Egyptian Tourism website will be fully connected to the Strapi backend.** 🎉
