const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const courseRoutes = require('./course.routes');
const { withAuth } = require('../middlewares/auth.middleware');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/courses', courseRoutes);

// TEST
router.get('/test', withAuth, (req, res) => { res.status(200).json({ msg: 'OK' }) });

module.exports = router;