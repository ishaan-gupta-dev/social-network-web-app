const express = require('express');
const router = express.Router();

const usersAPIController = require('../../../controllers/api/v1/users_api');

router.post('/create-session',usersAPIController.createSession);

module.exports = router;