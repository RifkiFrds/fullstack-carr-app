fullstack-listing-app/
│
├── backend-express/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── utils/
│   │   └── app.js
│   │
│   ├── prisma/
│   └── server.js
│
├── frontend-react/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   │   ├── public/
│   │   │   └── admin/
│   │   ├── routes/
│   │   ├── hooks/
│   │   ├── contexts/
│   │   ├── utils/
│   │   └── App.jsx
│
└── README.md

High-Level Database
users
├── id
├── username
├── email
└── password

categories
├── id
├── name
├── slug
└── description

listings
├── id
├── category_id
├── title
├── description
├── image_url
├── price
├── location
├── created_by
└── created_at