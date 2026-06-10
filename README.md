# Universal Listing Platform — Backend API

A RESTful API for managing categories and listings, built with Express.js, Prisma ORM, and PostgreSQL (Supabase). Features JWT authentication, search, filtering, sorting, and pagination.

---

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework |
| **Prisma ORM** | Database toolkit & migrations |
| **PostgreSQL** | Relational database |
| **Supabase** | Cloud-hosted PostgreSQL |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **express-validator** | Request validation |

---

## 📁 Project Structure

```
backend-express/
├── prisma/
│   ├── schema.prisma          # Database models & relations
│   ├── client.js              # Prisma client singleton
│   ├── seed.js                # Database seeder
│   └── migrations/            # Migration history
├── src/
│   ├── app.js                 # Express app setup
│   ├── server.js              # Server entry point
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── category.controller.js
│   │   └── listing.controller.js
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── category.service.js
│   │   └── listing.service.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── category.routes.js
│   │   └── listing.routes.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   └── pages/
│       └── docs.js            # API documentation landing page
├── .env                       # Environment variables
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) v9+
- A [Supabase](https://supabase.com/) project (or any PostgreSQL instance)

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/fullstack-carr-app.git
cd fullstack-carr-app/backend-express
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `backend-express/` root:

```env
# Supabase PostgreSQL (pooled connection)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:6543/postgres?sslmode=require&pgbouncer=true"

# Supabase PostgreSQL (direct connection — used for migrations)
DIRECT_URL="postgresql://USER:PASSWORD@HOST:5432/postgres?sslmode=require"

# JWT Secret
JWT_SECRET="your-super-secret-key"

# Server Port
PORT=3000
```

> **Note:** Replace `USER`, `PASSWORD`, and `HOST` with your actual Supabase credentials found in **Project Settings → Database → Connection String**.

### 4. Generate Prisma client

```bash
npx prisma generate
```

### 5. Run database migrations

```bash
npx prisma migrate dev --name init
```

### 6. Seed the database

```bash
npx prisma db seed
```

This creates:
- A default admin user (`admin@platform.com`)
- Predefined categories

### 7. Start the development server

```bash
npm start
```

The API will be available at `http://localhost:3000`.

---

## 📖 API Endpoints

### Root

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API documentation page |

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | Public | Login and receive JWT |
| `GET` | `/api/auth/me` | 🔒 JWT | Get current user info |

### Categories

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/categories` | Public | List all categories |
| `GET` | `/api/categories/:id` | Public | Get category by ID |
| `POST` | `/api/categories` | 🔒 JWT | Create a category |
| `PUT` | `/api/categories/:id` | 🔒 JWT | Update a category |
| `DELETE` | `/api/categories/:id` | 🔒 JWT | Delete a category |

### Listings

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/listings` | Public | List listings (search, filter, paginate) |
| `GET` | `/api/listings/:id` | Public | Get listing by ID |
| `POST` | `/api/listings` | 🔒 JWT | Create a listing |
| `PUT` | `/api/listings/:id` | 🔒 JWT | Update a listing |
| `DELETE` | `/api/listings/:id` | 🔒 JWT | Delete a listing |

---

## 🔍 Search & Filter

The `GET /api/listings` endpoint supports query parameters:

| Parameter | Type | Description | Example |
|---|---|---|---|
| `search` | `string` | Search in title and description | `?search=toyota` |
| `category` | `string` | Filter by category slug | `?category=kendaraan` |
| `sort` | `string` | Sort by `newest` or `oldest` | `?sort=newest` |
| `page` | `number` | Page number (default: 1) | `?page=2` |
| `limit` | `number` | Items per page (default: 10, max: 100) | `?limit=5` |

**Combined example:**

```
GET /api/listings?search=honda&category=kendaraan&sort=newest&page=1&limit=5
```

**Response includes pagination metadata:**

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 5,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

## 🔐 Authentication

Protected routes require a JWT token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

### Login Example

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@platform.com", "password": "password123"}'
```

### Using the Token

```bash
curl -X POST http://localhost:3000/api/listings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title": "My Listing", "description": "Details here", "categoryId": 1}'
```

---

## 🗄️ Database Models

```
User
├── id          (Int, PK, Auto Increment)
├── username    (String, Unique)
├── email       (String, Unique)
├── password    (String, Hashed)
├── createdAt   (DateTime)
├── updatedAt   (DateTime)
└── listings    → Listing[]

Category
├── id          (Int, PK, Auto Increment)
├── name        (String)
├── slug        (String, Unique)
├── description (String, Optional)
├── createdAt   (DateTime)
├── updatedAt   (DateTime)
└── listings    → Listing[]

Listing
├── id          (Int, PK, Auto Increment)
├── title       (String)
├── description (String)
├── imageUrl    (String, Optional)
├── metadata    (JSON)
├── categoryId  → Category
├── createdBy   → User
├── createdAt   (DateTime)
└── updatedAt   (DateTime)
```

---

## 🧪 Useful Commands

```bash
# Start the server
npm start

# Run Prisma Studio (visual database browser)
npx prisma studio

# Create a new migration
npx prisma migrate dev --name <migration_name>

# Reset the database
npx prisma migrate reset

# Seed the database
npx prisma db seed

# Generate Prisma client after schema changes
npx prisma generate
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes:
   ```bash
   git commit -m "feat: add your feature description"
   ```
4. **Push** to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request** against the `main` branch

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Purpose |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation changes |
| `refactor:` | Code restructuring |
| `chore:` | Maintenance tasks |

---

## 📄 License

This project is licensed under the ISC License.

---

## 📬 Contact

For questions or issues, please open a [GitHub Issue](https://github.com/your-username/fullstack-carr-app/issues).
