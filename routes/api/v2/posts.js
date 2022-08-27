const express = require('express');
const router = express.Router();
const postsAPiController = require('../../../controllers/api/v2/posts_api');

router.get('/',postsAPiController.index);

module.exports = router;

