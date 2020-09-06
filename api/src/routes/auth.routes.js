const express = require('express');
const AuthController = require('../controllers/auth.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/authenticate', AuthController.authenticate);
router.post('/logout', AuthMiddleware.withAuth, AuthController.logout);

module.exports = router;