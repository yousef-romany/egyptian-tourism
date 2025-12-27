# 🚀 Backend Setup Checklist

Follow this step-by-step guide to set up your Strapi backend.

---

## ✅ Checklist Progress

- [ ] **Step 1**: Create Admin Account
- [ ] **Step 2**: Configure Public Permissions
- [ ] **Step 3**: Add First Tour
- [ ] **Step 4**: Add More Tours (5-7 total)
- [ ] **Step 5**: Add Reviews (9 total - 3 per platform)
- [ ] **Step 6**: Test API Endpoints
- [ ] **Step 7**: Verify Frontend Integration

---

## 📋 Step 1: Create Admin Account

**Status**: 🔵 The admin panel is now open in your browser!

### What You'll See:
- Page title: "Welcome to Strapi!"
- Form asking for your details

### What to Do:
1. **Fill in the registration form**:
   - **First name**: Enter your first name
   - **Last name**: Enter your last name
   - **Email**: Enter your email address
   - **Password**: Choose a strong password (min 8 characters)
   - **Confirm Password**: Re-enter your password

2. **Click "Let's start"**

3. **You'll be logged into the Strapi admin panel**

### ✅ How to Know You're Done:
- You see the Strapi dashboard
- Left sidebar shows: Content Manager, Content-Type Builder, Media Library, etc.

---

## 📋 Step 2: Configure Public Permissions

**Why**: This allows your frontend to fetch data from the API without authentication.

### Navigation:
1. Click **Settings** (gear icon ⚙️ in the left sidebar at the bottom)
2. Under "Users & Permissions Plugin" section, click **Roles**
3. Click on the **Public** role

### Enable These Permissions:

#### For **Tour**:
- [x] `find` - Get all tours
- [x] `findOne` - Get single tour
- [x] Custom routes if available (featured, etc.)

#### For **Review**:
- [x] `find` - Get all reviews
- [x] `findOne` - Get single review
- [x] Custom routes if available (featured, platform, stats)

#### For **Blog-post** (if you see it):
- [x] `find` - Get all posts
- [x] `findOne` - Get single post
- [x] Custom routes if available (featured, category)

#### For **Newsletter-subscription**:
- [x] `subscribe` - Allow subscriptions
- [x] `create` - Create subscription (if available)

#### For **Contact-submission**:
- [x] `create` - Allow contact form submissions

#### For **Booking**:
- [x] `create` - Create bookings
- [x] Custom routes if available (reference)

### Important:
- **Click "Save"** (top right corner) when done!
- If you don't see some content types, that's okay - just enable what's available

### ✅ How to Know You're Done:
- You clicked "Save"
- You see a success notification
- Permissions show checkmarks

---

## 📋 Step 3: Add Your First Tour

**Let's add the Giza Pyramids tour using the sample data!**

### Navigation:
1. Click **Content Manager** in the left sidebar
2. Under "Collection Types", click **Tour**
3. Click **"Create new entry"** (blue button, top right)

### Fill in the Form:

Use the data from **SAMPLE_DATA.md** (Tour 1: Giza Pyramids):

**Basic Fields**:
- **Title**: `Giza Pyramids & Sphinx Tour`
- **Slug**: Leave empty (auto-generated) OR type `giza-pyramids-sphinx`
- **Description**: Copy the long description from SAMPLE_DATA.md
- **Excerpt**: `Visit the iconic Giza Pyramids and Sphinx with an expert Egyptologist guide`
- **Price**: `89`
- **Duration**: `8 hours`
- **Location**: `Cairo`
- **Category**: Select `Historical` from dropdown
- **Rating**: `4.9`
- **Reviews**: `1250`
- **Group Size**: `Up to 15 people`
- **Featured**: Toggle **ON** (should be green/blue)

**JSON Fields** (expand if collapsed):

**Highlights**: Click the field and paste this:
```json
["Visit the Great Pyramid of Khufu", "See the Sphinx up close", "Explore the Valley Temple", "Professional Egyptologist guide", "Hotel pickup and drop-off included"]
```

**Included**: Paste this:
```json
["Hotel pickup and drop-off", "Professional Egyptologist guide", "All entrance fees", "Bottled water", "Air-conditioned transportation"]
```

**Excluded**: Paste this:
```json
["Lunch and meals", "Gratuities and tips", "Personal expenses", "Interior pyramid entrance (extra fee)", "Camel rides"]
```

**FAQs**: Paste this:
```json
[
  {
    "question": "What should I wear?",
    "answer": "Comfortable walking shoes and light clothing are recommended. Bring sun protection including hat and sunscreen."
  },
  {
    "question": "Can I go inside the pyramids?",
    "answer": "Yes, interior access to the Great Pyramid is available for an additional fee purchased on-site."
  },
  {
    "question": "Is this tour suitable for children?",
    "answer": "Yes, this tour is family-friendly and suitable for all ages. However, it involves walking and climbing stairs."
  }
]
```

**Image Upload**:
- Scroll to **Image** field
- Click "Add more assets" or the upload area
- Upload a photo of the pyramids (or use a placeholder for now)
- Select the uploaded image

### Save & Publish:
1. Click **"Save"** (top right)
2. Click **"Publish"** (top right)
3. Verify status shows "Published"

### ✅ How to Know You're Done:
- You see the tour in the list
- Status shows "Published" (green)
- You can see all the fields you entered

---

## 📋 Step 4: Add More Tours

**Repeat Step 3 for these tours** (use data from SAMPLE_DATA.md):

1. ✅ Giza Pyramids (Done in Step 3)
2. [ ] Luxor Valley of the Kings
3. [ ] Nile River Cruise
4. [ ] White Desert Safari
5. [ ] Cairo City Tour
6. [ ] Red Sea Snorkeling
7. [ ] Alexandria Day Trip

**Quick Tip**: You can duplicate an existing tour and edit it:
- Click on a tour
- Click "..." (three dots, top right)
- Select "Duplicate"
- Edit the fields
- Save & Publish

### ✅ How to Know You're Done:
- You have 5-7 tours total
- All are marked "Published"
- All have the "Featured" toggle ON

---

## 📋 Step 5: Add Reviews

**Add reviews for all three platforms!**

### Navigation:
1. Click **Content Manager** in left sidebar
2. Click **Review** under Collection Types
3. Click **"Create new entry"**

### Add These 9 Reviews (from SAMPLE_DATA.md):

**TripAdvisor (3 reviews)**:
1. [ ] Sarah Johnson - Giza Pyramids - 5 stars
2. [ ] James Williams - Luxor Valley of the Kings - 5 stars
3. [ ] Emma Martinez - Nile River Cruise - 5 stars

**Viator (3 reviews)**:
4. [ ] Michael Chen - White Desert Safari - 5 stars
5. [ ] Lisa Anderson - Cairo City Tour - 4 stars
6. [ ] David Brown - Red Sea Snorkeling - 5 stars

**Klook (3 reviews)**:
7. [ ] Yuki Tanaka - Alexandria Day Trip - 5 stars
8. [ ] Sophie Dubois - Giza Pyramids - 5 stars
9. [ ] Marco Rossi - Luxor Valley of the Kings - 5 stars

### For Each Review:
1. Copy data from SAMPLE_DATA.md
2. Fill in all fields:
   - Name
   - Location
   - Rating (1-5)
   - Review (the text)
   - Date
   - **Platform**: Select from dropdown (tripadvisor, viator, or klook)
   - Tour Name
   - **Verified**: Toggle ON
   - **Featured**: Toggle ON
3. **Save & Publish**

### ✅ How to Know You're Done:
- You have 9 reviews total
- 3 for TripAdvisor
- 3 for Viator
- 3 for Klook
- All are Published

---

## 📋 Step 6: Test API Endpoints

**Verify the API is working!**

Open these URLs in your browser:

### Test Tours API:
```
http://localhost:1337/api/tours?populate=*
```
**Expected**: You should see JSON with your tours

### Test Featured Tours:
```
http://localhost:1337/api/tours/featured?populate=*
```
**Expected**: JSON with featured tours

### Test Reviews:
```
http://localhost:1337/api/reviews
```
**Expected**: JSON with all reviews

### Test Reviews by Platform:
```
http://localhost:1337/api/reviews/platform/tripadvisor
http://localhost:1337/api/reviews/platform/viator
http://localhost:1337/api/reviews/platform/klook
```
**Expected**: JSON with reviews for each platform

### ✅ How to Know You're Done:
- All URLs return JSON data (not 403 errors)
- You can see your actual tour and review data
- Images have URLs like `/uploads/...`

---

## 📋 Step 7: Verify Frontend Integration

**See your data on the website!**

### What to Do:
1. Open **http://localhost:3000** in your browser
2. **Hard refresh**: Press `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac)

### What You Should See:

**Homepage**:
- ✅ Tour carousel showing your tours
- ✅ Reviews section with tabs (TripAdvisor, Viator, Klook)
- ✅ Reviews displaying when you click each tab
- ✅ Tour images loading
- ✅ Correct prices, ratings, and descriptions

**Tours Page** (http://localhost:3000/tours):
- ✅ Grid of all your tours
- ✅ Tour cards with images

**Individual Tour Page** (click any tour):
- ✅ Tour details page loads
- ✅ Shows description, highlights, FAQs
- ✅ Gallery images (if you added multiple)

### ✅ How to Know You're Done:
- Tours display on homepage
- Reviews display on homepage
- No error messages in browser console (F12)
- Images load correctly
- All data matches what you entered in Strapi

---

## 🎉 Congratulations!

If you've completed all steps, your Egyptian Tourism website is fully functional!

### What Works Now:
- ✅ Dynamic tours from backend
- ✅ Dynamic reviews from backend
- ✅ Tour detail pages
- ✅ Search functionality
- ✅ Newsletter subscription
- ✅ Contact form
- ✅ Booking system

---

## 📊 Summary

**Time Required**: ~30-45 minutes

**What You Created**:
- Admin account ✅
- 5-7 tours ✅
- 9 reviews across 3 platforms ✅
- Working API ✅
- Full frontend-backend integration ✅

---

## 🆘 Troubleshooting

### Problem: Still seeing 403 errors
**Solution**:
- Go back to Step 2
- Make sure you clicked "Save" after enabling permissions
- Refresh the API URL in your browser

### Problem: No tours showing on frontend
**Solution**:
- Check tours are "Published" (not "Draft") in Strapi
- Hard refresh the frontend (Ctrl + Shift + R)
- Check browser console for errors (F12)

### Problem: Images not loading
**Solution**:
- Make sure you uploaded images in Strapi
- Check `.env.local` has `NEXT_PUBLIC_STRAPI_URL=http://localhost:1337`
- Restart the frontend server if needed

### Problem: JSON field error
**Solution**:
- Make sure you copied the entire JSON (including `[` and `]`)
- Check for any extra commas or syntax errors
- You can leave JSON fields empty if having trouble (they're optional)

---

## 📝 Next Steps

After completing setup:

1. **Add More Content**:
   - More tours (aim for 15-20)
   - More reviews (30+)
   - Blog posts (optional)

2. **Customize Content**:
   - Upload real/better images
   - Adjust prices
   - Update descriptions
   - Add your actual tour details

3. **Test Features**:
   - Try the newsletter subscription
   - Test the contact form
   - Create a booking
   - Test user registration/login

4. **Prepare for Production**:
   - Plan database migration (SQLite → PostgreSQL/MySQL)
   - Set up cloud storage for images
   - Configure domain names
   - Set up SSL certificates

---

**Ready to start? Begin with Step 1!**

The admin panel should already be open in your browser at: http://localhost:1337/admin
