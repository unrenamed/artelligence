const express = require('express');
const router = express.Router();
const { catchAsync } = require('../utils/error');

const container = require('../container');
const { register, authenticate, logout } = container.cradle.authController;
const { withAuth } = container.cradle.authMiddleware;

router.post('/register', catchAsync(register));

router.post('/authenticate', catchAsync(authenticate));

router.post('/logout', withAuth, logout);

module.exports = router;