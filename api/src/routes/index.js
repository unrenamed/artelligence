const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const courseRoutes = require('./course.routes');

router.use('/auth', authRoutes);
router.use('/courses', courseRoutes);

module.exports = router;