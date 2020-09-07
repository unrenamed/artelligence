const express = require('express');
const router = express.Router();
const { catchAsync } = require('../utils/error');

const AuthController = require('../controllers/auth.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

router.post('/register', catchAsync(AuthController.register));
router.post('/authenticate', catchAsync(AuthController.authenticate));
router.post('/logout', AuthMiddleware.withAuth, AuthController.logout);

module.exports = router;