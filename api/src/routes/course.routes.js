const express = require('express');
const router = express.Router();
const { catchAsync } = require('../utils/error');

const CourseController = require('../controllers/course.controller');

router.post('/', catchAsync(CourseController.create));
router.get('/', catchAsync(CourseController.getAll));

router.post('/:courseId/lessons', catchAsync(CourseController.addLesson));
router.get('/:courseId/lessons', catchAsync(CourseController.getLessons));

router.post('/:courseId/purchase', catchAsync(CourseController.purchase));

module.exports = router;