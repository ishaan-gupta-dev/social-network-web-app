const express = require('express');
const passport = require('passport');
const router = express.Router();

const usersAPIController = require('../../../controllers/api/v1/posts_api');

router.get('/',usersAPIController.index);
router.delete('/:id',passport.authenticate('jwt',{session:false}),usersAPIController.destroyPost);

module.exports = router;

