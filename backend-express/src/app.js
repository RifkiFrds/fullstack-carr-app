//import express
const express = require('express')

//import CORS
const cors = require('cors')

//import bodyParser
const bodyParser = require('body-parser')

//import router
const router = require('./routes')
const authRoutes = require('./routes/auth.routes')
const categoryRoutes = require('./routes/category.routes')
const listingRoutes = require('./routes/listing.routes')

//init app
const app = express()

//use cors with specific origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://listing-carki.vercel.app',
  'http://listing-carki.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

//use body parser
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//route — API Documentation Landing Page
const docsPage = require('./pages/docs');
app.get('/', docsPage);

//define routes
app.use('/api', router);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/listings', listingRoutes);

module.exports = app;
