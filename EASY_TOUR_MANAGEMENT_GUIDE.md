# 🎯 Easy Tour Management Guide

**Quick & Simple Guide to Adding and Managing Tours**

---

## ✅ What's New

### 1. **Availability Features Added**
- ✅ Availability Status (Available, Limited Spots, Sold Out, Coming Soon)
- ✅ Available Spots (Number of spots left)
- ✅ Max Group Size (Maximum capacity)

### 2. **Blog Posts Created**
- ✅ 5 sample blog posts created
- ✅ Ready to view on your website

### 3. **Egyptian Divider Fixed**
- ✅ Background now transparent
- ✅ Works better with all backgrounds

---

## 🚀 Quick Start: Add a New Tour

### **Method 1: Using Strapi Admin (Easiest!)**

1. **Login to Strapi**
   ```
   http://localhost:1337/admin
   ```

2. **Go to Tours**
   - Click "Content Manager" in sidebar
   - Click "Tours"
   - Click "Create new entry" button

3. **Fill in Basic Info** (Required fields marked with *)

   **Essential Details:**
   - **Title*** (e.g., "Cairo Day Tour")
   - **Slug*** (auto-generated from title)
   - **Description*** (Full description of the tour)
   - **Excerpt** (Short 1-2 sentence summary)

   **Pricing:**
   - **Price*** (e.g., 89)
   - **Price Display** (e.g., "$89" or "$89 per person")

   **Tour Info:**
   - **Duration*** (e.g., "8 hours", "3 days", "Full day")
   - **Location*** (e.g., "Cairo", "Luxor", "Aswan")
   - **Category*** (Select from dropdown:Historical, Adventure, Cultural, Desert, Cruise, Beach)

   **Group Details:**
   - **Group Size** (e.g., "Up to 15 people")
   - **Max Group Size** (e.g., 15)

   **Ratings:**
   - **Rating** (0-5, e.g., 4.8)
   - **Reviews** (Number of reviews, e.g., 250)

4. **Add Images** (Required!)
   - **Main Image***: Click "Add" and upload tour image
   - **Gallery Images**: Add multiple images for gallery

5. **Set Availability** (NEW!)
   - **Availability**: Choose status
     - ✅ **Available** - Tour has many spots
     - ⚠️ **Limited Spots** - Few spots left
     - ❌ **Sold Out** - No spots available
     - 🔜 **Coming Soon** - Not yet available

   - **Available Spots**: How many spots left (e.g., 45)
   - **Max Group Size**: Maximum capacity (e.g., 15)

6. **Optional Details** (Enhance tour page)

   **Highlights** (JSON format):
   ```json
   [
     "Visit the Great Pyramid",
     "Expert Egyptologist guide",
     "Hotel pickup included",
     "Traditional lunch"
   ]
   ```

   **What's Included** (JSON format):
   ```json
   [
     "Hotel pickup and drop-off",
     "Professional guide",
     "All entrance fees",
     "Bottled water",
     "Lunch"
   ]
   ```

   **What's Excluded** (JSON format):
   ```json
   [
     "Gratuities and tips",
     "Personal expenses",
     "Travel insurance"
   ]
   ```

   **FAQs** (JSON format):
   ```json
   [
     {
       "question": "What should I wear?",
       "answer": "Comfortable clothing and walking shoes recommended."
     },
     {
       "question": "Is lunch included?",
       "answer": "Yes, lunch at a local restaurant is included."
     }
   ]
   ```

7. **Publish Tour**
   - Toggle "Published" switch ON
   - Check "Featured" if you want it on homepage
   - Click "Save" button

✅ **Done! Your tour is now live!**

---

## 📝 Method 2: Quick Copy & Paste Template

Copy this template and paste into each field:

```
Title: [Your Tour Name]
Slug: [auto-generated]
Description: [Full tour description - tell the story, what makes it special]
Excerpt: [Short 1-2 sentence summary]

Price: [Number, e.g., 89]
Price Display: [String, e.g., "$89"]
Duration: [e.g., "8 hours"]
Location: [e.g., "Cairo"]
Category: [Select from dropdown]

Group Size: "Up to [X] people"
Max Group Size: [Number, e.g., 15]

Rating: [e.g., 4.8]
Reviews: [e.g., 250]

Availability: Available
Available Spots: [e.g., 45]

Featured: [Check if should appear on homepage]
Published: [Check to make live]
```

---

## 🎯 Super Easy Tour Examples

### **Example 1: Simple Day Tour**

```
Title: Giza Pyramids Day Tour
Price: 89
Price Display: $89
Duration: 8 hours
Location: Cairo
Category: Historical
Group Size: Up to 15 people
Max Group Size: 15
Available Spots: 45
Availability: Available
Featured: ✅ Yes
```

### **Example 2: Multi-Day Adventure**

```
Title: 3-Day Nile Cruise Adventure
Price: 450
Price Display: $450 per person
Duration: 3 days / 2 nights
Location: Luxor to Aswan
Category: Cruise
Group Size: Up to 100 passengers
Max Group Size: 100
Available Spots: 60
Availability: Available
Featured: ✅ Yes
```

### **Example 3: Limited Availability Tour**

```
Title: Exclusive White Desert Camping
Price: 180
Price Display: $180
Duration: 2 days / 1 night
Location: Bahariya Oasis
Category: Desert
Group Size: Up to 8 people
Max Group Size: 8
Available Spots: 3
Availability: Limited Spots
Featured: ✅ Yes
```

---

## 🔍 View Your Tours

### **On Website:**
```
All Tours: http://localhost:3000/tours
Homepage Featured: http://localhost:3000
```

### **In Strapi:**
```
Admin Panel: http://localhost:1337/admin
→ Content Manager → Tours
```

---

## ✏️ Edit Existing Tours

1. Go to http://localhost:1337/admin
2. Click "Content Manager" → "Tours"
3. Click on any tour to edit
4. Make changes
5. Click "Save"

---

## 🎨 Blog Posts Management

### **View Blog Posts:**
```
Blog Page: http://localhost:3000/blog
Strapi Admin: http://localhost:1337/admin → Blog Posts
```

### **Sample Posts Created:**
1. ✅ Top 10 Must-Visit Ancient Egyptian Temples
2. ✅ Egyptian Food Guide: What to Eat on Your Tour
3. ✅ Best Time to Visit Egypt: Month-by-Month Guide
4. ✅ Nile River Cruise: Complete Guide for First-Timers
5. ✅ Photography Tips for Capturing Egypt's Ancient Wonders

### **Add New Blog Post:**
1. Go to http://localhost:1337/admin
2. Content Manager → Blog Posts
3. Click "Create new entry"
4. Fill in:
   - Title
   - Slug (auto-generated)
   - Excerpt (short summary)
   - Content (full article in Markdown)
   - Category (Select from: Travel Tips, Food & Culture, Destinations, Photography, History)
   - Featured (Yes/No)
5. Click "Save" and "Publish"

---

## 📊 Tour Availability Status Guide

### **When to Use Each Status:**

**🟢 Available**
- Plenty of spots remaining
- More than 30% capacity available
- Example: 45/15 spots = Available

**🟡 Limited Spots**
- Less than 30% capacity remaining
- Creates urgency for bookings
- Example: 3/8 spots = Limited Spots

**🔴 Sold Out**
- No spots available
- Tour is fully booked
- Example: 0/15 spots = Sold Out

**🔵 Coming Soon**
- Tour not yet available for booking
- Still in planning/setup
- Example: New tour being prepared

---

## 💡 Pro Tips

### **1. Good Tour Titles**
✅ DO:
- "Giza Pyramids & Sphinx Day Tour"
- "3-Day Luxury Nile Cruise"
- "White Desert Camping Adventure"

❌ DON'T:
- "Tour 1"
- "Cairo thing"
- "pyramid"

### **2. Writing Descriptions**
Include:
- What you'll see
- What's included
- What makes it special
- Who it's perfect for

### **3. Pricing Display**
Examples:
- "$89" (simple)
- "$89 per person" (clear)
- "$450 for 3 days" (value)
- "From $89" (starting price)

### **4. Group Size Formats**
Examples:
- "Up to 15 people"
- "Small group (max 8)"
- "Private tour (1-4 guests)"
- "Large ship (up to 100)"

### **5. Duration Examples**
- "8 hours"
- "Full day"
- "Half day (4 hours)"
- "3 days / 2 nights"
- "5 days / 4 nights"

---

## 🚨 Common Issues & Fixes

### **Issue: Tour doesn't appear on website**
✅ **Solution:**
1. Make sure "Published" is toggled ON
2. Refresh your browser (Ctrl + Shift + R)
3. Check if backend is running

### **Issue: Images not showing**
✅ **Solution:**
1. Upload image in Strapi media library first
2. Make sure image is selected in tour
3. Check image is published

### **Issue: Availability not updating**
✅ **Solution:**
1. Edit tour in Strapi
2. Update Available Spots number
3. Change Availability status if needed
4. Save

---

## 📚 Quick Reference URLs

### **Frontend (User-Facing)**
- Homepage: http://localhost:3000
- Tours Page: http://localhost:3000/tours
- Blog Page: http://localhost:3000/blog
- Booking Page: http://localhost:3000/book-now

### **Backend (Admin)**
- Strapi Admin: http://localhost:1337/admin
- Tours Management: http://localhost:1337/admin/content-manager/collectionType/api::tour.tour
- Blog Management: http://localhost:1337/admin/content-manager/collectionType/api::blog-post.blog-post
- Bookings: http://localhost:1337/admin/content-manager/collectionType/api::booking.booking

---

## ✨ Summary

**You now have:**
- ✅ Easy tour creation through Strapi admin
- ✅ Availability tracking (spots, status)
- ✅ 5 sample blog posts
- ✅ Transparent Egyptian divider
- ✅ Simple copy-paste templates
- ✅ Quick management guide

**To add a tour:**
1. Login to Strapi admin
2. Create new tour entry
3. Fill in basic fields
4. Upload images
5. Set availability
6. Publish!

**That's it! Super easy!** 🎉

---

**Need help?** Check the main documentation files:
- FINAL_STATUS.md
- BOOKING_SYSTEM_GUIDE.md
- SETUP_GUIDE.md
