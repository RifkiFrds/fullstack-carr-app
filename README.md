# CarKi & Listing Webki — Full-Stack Vehicle Listings Platform

A modern, minimalist, full-stack vehicle listing platform built with a React frontend and an Express.js REST API backend. The project features a public marketplace interface (**CarKi**) and an administrative command console (**Listing Webki**) supporting dynamic metadata schemas across all 10 platform categories.

---

## 🏗️ Repository Architecture

This project consists of two core applications:
- **`backend-express/`**: Node.js & Express REST API powered by Prisma ORM and PostgreSQL (Supabase).
- **`frontend-react/`**: Modern React & Vite application using Tailwind CSS, Axios, and React Router DOM.

---

## 🚀 Technology Stack

### Backend (`backend-express`)
- **Runtime & Framework**: Node.js & Express.js
- **Database Tooling**: Prisma ORM with PostgreSQL (Supabase)
- **Security & Auth**: JWT (JSON Web Tokens) & bcryptjs
- **Validation**: express-validator

### Frontend (`frontend-react`)
- **Framework & Tooling**: React, Vite
- **Routing**: React Router DOM (Layout nesting, private route guards)
- **Styling**: Tailwind CSS (Minimalist light theme focus)
- **HTTP Client**: Axios (interceptor config for tokens auto-injection)
- **Session Management**: React Context API & js-cookie

---

## 📋 Features

### 🌐 Public Portal (CarKi)
- **Car Marketplace**: Showcase vehicle listings dynamically from the database.
- **Search & Brand Filtering**: Filter listings by brand names (Toyota, Honda, BMW, etc.) and keywords.
- **Dynamic Spec View**: Display car attributes (year, mileage, transmission, location, pricing).

### 🔒 Admin Dashboard (Listing Webki)
- **KPI Metrics**: Overall platform counters showing total listings, categories count, and recent list logs.
- **Dynamic CRUD Engine**: Perform Create, Read, Update, and Delete operations for listings.
- **Dynamic Metadata Forms**: The form automatically resolves fields depending on chosen categories (Handphone, Kendaraan, Laptop, Buku, Film, Makanan, Wisata, Sewa, Lowongan Kerja, Acara) and compiles JSON metadata before submission.
- **Categories Viewer**: Read-only listing of database category models.

---

## ⚙️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) v9+
- A [Supabase](https://supabase.com/) project (or PostgreSQL instance)

---

### Backend Setup (`backend-express`)

1. Navigate to the backend directory:
   ```bash
   cd backend-express
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file inside `backend-express/` and fill:
   ```env
   PORT=5000
   JWT_SECRET="your-super-secret-jwt-key"
   CLIENT_URL="http://localhost:5173"
   DATABASE_URL="postgresql://postgres.[your password]:[EMAIL_ADDRESS]:6543/postgres?sslmode=require&pgbouncer=true"
   DIRECT_URL="postgresql://postgres.[your password]:[EMAIL_ADDRESS]:5432/postgres?sslmode=require"
   ```

4. Initialize database, migrate models and seed default data:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   npx prisma db seed
   ```
   *Note: Seeding creates the default administrator credential (`admin@platform.com` / `admin123`).*

5. Run the dev server:
   ```bash
   npm start
   ```
   The backend API will run on `http://localhost:5000`.

---

### Frontend Setup (`frontend-react`)

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file inside `frontend-react/` and fill:
   ```env
   VITE_API_URL=https://listing-webki-production.up.railway.app/api
   ```
   *(For local backend testing, update to `http://localhost:5000/api`)*

4. Run the local development server:
   ```bash
   npm run dev
   ```
   The application will run on `http://localhost:5173`.

---

## 📖 API Endpoints

### Authentication
- `POST /api/auth/login` - Login and get JWT token (Public)
- `GET /api/auth/me` - Get logged-in user profile (Protected)

### Categories
- `GET /api/categories` - List all categories (Public)
- `GET /api/categories/:id` - Fetch category detail (Public)

### Listings
- `GET /api/listings` - List all listings with search, category filtering, and sorting (Public)
- `GET /api/listings/:id` - Get listing details (Public)
- `POST /api/listings` - Create new listing (Protected)
- `PUT /api/listings/:id` - Update listing info (Protected)
- `DELETE /api/listings/:id` - Delete listing (Protected)

---

## 🤝 Project Credits & Author

Developed by **Muhamad Rifki Firdaus** — Frontend Developer & System Creator.
Student at **Universitas Muhammadiyah Tangerang**.

- **GitHub**: [@RifkiFrds](https://github.com/RifkiFrds)
- **LinkedIn**: [muhamad-rifki-firdaus](https://www.linkedin.com/in/muhamad-rifki-firdaus)
