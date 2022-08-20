const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

const playGroundController = require('../controllers/home_controller');

// console.log('routers loaded');

router.get('/',homeController.home);
router.use('/user',require('./user'));
router.use('/post',require('./post'));
router.use('/comment',require('./comment'));
// for any further routes, access from here
// router.use('/routerName',require('./routerfile'));


module.exports = router;