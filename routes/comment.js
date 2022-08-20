const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentController = require('../controllers/comment_controller');

router.post('/create',passport.checkAuthentication,commentController.createComment);

router.get('/destroy/:id',passport.checkAuthentication,commentController.destroyComment);

module.exports = router;