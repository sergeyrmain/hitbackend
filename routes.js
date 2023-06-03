// Project Team:
// - Sergey Artemeive (ID: 320689789)
// - Ohad Yael (ID: 208544866)
const express = require('express');
const router = express.Router();

// Import the controllers
const costController = require('./controllers/costController');
const reportController = require('./controllers/reportController');
const aboutController = require('./controllers/aboutController');

// Define the routes
router.post('/addcost', costController.addCost);
router.get('/report', reportController.getReport);
router.get('/about', aboutController.getAbout);

module.exports = router;
