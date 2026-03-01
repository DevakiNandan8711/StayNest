# StayNest 🏠  

A professional, full-stack vacation rental platform designed for seamless property discovery and booking experiences. Developed using the **Model-View-Controller (MVC)** architectural pattern on a **MERN** (MongoDB, Express, Node.js) stack with an **EJS** frontend, StayNest represents a clean, scalable approach to web development.  

---

## 🚀 Key Features

### 🏢 Property Management (CRUD)
- **Discover:** Browse through a variety of unique listings across various countries.
- **Host:** Authenticated users can create and publish their own listings with detailed descriptions and pricing.
- **Manage:** Property owners have full control to edit or delete their listings through an intuitive dashboard.

### 🔐 Security & Authentication
- **User Accounts:** Secure Signup, Login, and Logout functionality powered by **Passport.js**.
- **Role-Based Access:** Only property owners can modify listings; only review authors can delete their own feedback.

### 🖼️ Rich User Experience
- **Interactive Maps:** Real-time location visualization for listings using **Maptiler SDK**.
- **Image Hosting:** Seamless property image uploads using **Cloudinary** and **Multer**.
- **Review System:** Users can provide 1-5 star ratings and leave detailed reviews.
- **Responsive Design:** A mobile-first UI built with **Bootstrap 5** and custom CSS for a premium feel.

### 🛠️ Robust Backend
- **Data Integrity:** Schema-level validation using **Joi**.
- **State Management:** Session-based user tracking and interactive **Flash messages** for better user feedback.
- **Error Handling:** Centralized 404 and global error handling with custom-styled error views.

---

## 🏗️ Project Architecture (MVC)

StayNest is built following the **Model-View-Controller (MVC)** design pattern to ensure clean code separation and scalability:

- **Models:** Handles data structures and MongoDB interactions using Mongoose (e.g., `listing.js`, `review.js`, `user.js`).
- **Views:** Manages UI rendering using EJS templates for dynamic content display (located in the `view/` directory).
- **Controllers:** Contains the core business logic, linking user interactions from routes to the data models (located in the `controllers/` directory).
- **Routes:** Defines the application endpoints and connects them to the appropriate controller logic.

---

## � Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (EJS Templating), Bootstrap 5
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Cloud Atlas)
- **Object Modeling:** Mongoose
- **Authentication:** Passport.js (Local Strategy)
- **File Uploads:** Cloudinary, Multer
- **API/SDKs:** Maptiler SDK

---

## 🛠️ Setup & Local Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DevakiNandan8711/StayNest.git
   cd StayNest
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**  
   Create a `.env` file in the root directory and add:
   ```env
   ATLASDB_URL=your_mongodb_atlas_url
   SECRET=your_session_secret
   CLOUD_NAME=your_cloudinary_name
   CLOUD_API_KEY=your_cloudinary_key
   CLOUD_API_SECRET=your_cloudinary_secret
   MAP_TOKEN=your_maptiler_token
   ```

4. **Run the application:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:8080` in your browser.

---

## � Roadmap & Future Improvements
- [ ] **Payments:** Integrated Stripe/Razorpay for secure bookings.
- [ ] **Category Filters:** Advanced filtering for 'Beaches', 'Mountains', 'Trending', etc.
- [ ] **Search Engine:** Fuzzy search for location and property titles.
- [ ] **Booking Calendar:** Real-time availability tracking.

---

## � License
Distributed under the **ISC License**. See `LICENSE` for more information.

## 🤝 Contact
- **Developer Name:** Devaki Nandan 
- **LinkedIn:** https://www.linkedin.com/in/devaki-nandan8711 

---
*StayNest – Real Experiences, Real Homes.*
