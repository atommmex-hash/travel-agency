# Agency Owner Guide: Managing Your Website Content

Welcome! This website was designed so that you can update trips, prices, FAQs, and photos without needing a web developer or touching code.

---

## 1. Accessing the Content Manager

1. Open your browser and go to:
   `https://yourdomain.com/admin/` (or `http://localhost:4321/admin/` when running locally)
2. Log in with your email and password (or your GitHub / Netlify Identity account).
3. You will see two main sections in the left sidebar:
   - **Trips & Packages**: Add, edit, or remove itineraries.
   - **Site Settings & Content**: Update contact numbers, opening hours, FAQs, and testimonials.

---

## 2. How to Change a Trip Price

1. In the CMS sidebar, click **Trips & Packages**.
2. Click on the trip you want to edit (e.g., **Darjeeling Tea and Toy Train**).
3. Scroll to the **Price per Person (INR, twin sharing)** field.
4. Enter the new base amount (e.g., `13500`).
5. Click **Publish** (or **Save**) in the top bar.
6. The website will automatically recalculate tier estimates (Comfort, Premium, Luxury) and update the live cards.

---

## 3. How to Add a New Trip

1. Click **Trips & Packages** in the left sidebar.
2. Click the **New Trips & Packages** button.
3. Fill in the trip details:
   - **Trip ID**: Short lowercase name with dashes (e.g., `sandakphu-trek`).
   - **Trip Title**: Full title shown to travellers (e.g., `Sandakphu Ridge Trek`).
   - **Destination**: Choose from the dropdown (`Darjeeling`, `Sikkim`, `Dooars`, or `Offbeat`).
   - **Duration (Nights)**: Number of nights (e.g., `4`).
   - **Price per Person**: Base twin-sharing rate in INR.
   - **Highest Point (Metres)**: Maximum altitude reached on the route (e.g., `3636`). This automatically draws the altitude bar.
   - **Highlights**: Add 3 key reasons to book (e.g., "Sleeping Buddha panorama", "Singalila National Park", "Sunrise from Sandakphu").
   - **Day-by-Day Itinerary**: Click **Add day** for each day of the journey:
     - Day label (e.g., `Day 1`)
     - Day title (e.g., `Drive to Manebhanjan & trek to Tumling`)
     - Description of activities and drives
   - **Included**: List what is included (hotel, transfers, permits, guide).
   - **Trip Photo**: Upload a photo (or leave empty to let the system generate a custom topographic contour plate).
4. Click **Publish**.

---

## 4. How to Replace a Photo

1. Open the trip in **Trips & Packages**.
2. Look for the **Trip Photo** field.
3. Click **Choose an image** or drag-and-drop your new high-resolution photo.
   - Tip: For best results, use horizontal landscape photos (at least 800px wide).
4. Click **Publish**.

---

## 5. How to Edit FAQs

1. In the left sidebar, click **Site Settings & Content**.
2. Click on **Frequently Asked Questions**.
3. You will see the list of questions.
4. Click into any question or answer to update the wording.
5. To add a new question, click **Add questions & answers** at the bottom.
6. Click **Publish**.

---

## 6. How to Update Phone and WhatsApp Numbers

1. In the left sidebar, click **Site Settings & Content** -> **Agency Details & Hero**.
2. Update:
   - **WhatsApp Number**: Digits only including country code (e.g., `919876543210`). Do not include spaces or `+`.
   - **Phone**: For phone calls, format with `+` (e.g., `+91 98765 43210`).
   - **Opening Hours**: (e.g., `Daily, 9 am to 9 pm`).
3. Click **Publish**. All WhatsApp buttons, footers, headers, and mobile docks across the site will immediately route to your updated numbers.

---

## 7. How to Edit or Add Promotional Carousel Banners

1. In the left sidebar, click **Site Settings & Content** -> **Promo Carousel Banners**.
2. You will see the list of active promotional banners shown on the homepage hero carousel.
3. **To Edit a Banner**:
   - Click on the banner to open its details.
   - Update **Headline Title**, **Subtitle / Tagline**, or **Inclusion Perks**.
   - Update the **Discounted Price** (e.g. `₹14,400`) and **Original Price / MRP** (e.g. `₹17,500`).
   - Change the **Badge Label** and **Badge Type** (`Trending`, `Newly Launched`, `Popular Circuit`, or `Limited Season Deal`).
   - Replace the **Banner Photo** using the upload widget or drag-and-drop.
4. **To Add a New Banner**:
   - Click **Add promotional ad banners** at the bottom of the list.
   - Set a unique **Banner ID** (e.g. `promo-gurudongmar`) and matching **Trip ID Slug** (e.g. `lachung-yumthang`).
   - Fill in the title, prices, perks, and upload a horizontal photo.
5. Click **Publish**. The homepage carousel will immediately display your new promotional campaigns with smooth auto-cycling, touch swiping, and instant WhatsApp quote links.

