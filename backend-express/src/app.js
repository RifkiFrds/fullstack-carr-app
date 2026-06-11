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

app.use(cors({
  origin: true,
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
