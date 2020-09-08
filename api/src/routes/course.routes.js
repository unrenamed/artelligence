const express = require('express');
const router = express.Router();
const { catchAsync } = require('../utils/error');

const CourseController = require('../controllers/course.controller');

router.post('/', catchAsync(CourseController.create));
router.get('/', catchAsync(CourseController.getAll));
router.get('/:courseId', catchAsync(CourseController.getById));
router.post('/:courseId/lessons', catchAsync(CourseController.addLesson));

module.exports = router;