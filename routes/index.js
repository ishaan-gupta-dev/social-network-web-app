const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

const playGroundController = require('../controllers/home_controller');

// console.log('routers loaded');

router.get('/',homeController.home);
router.get('/playground',playGroundController.playground);

module.exports = router;