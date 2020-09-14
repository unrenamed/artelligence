const express = require('express');
const router = express.Router();
const { catchAsync } = require('../utils/error');
const { accessLevels } = require('../configs/app.config');

const container = require('../container');
const { withAuth, allowOnly } = container.cradle.authMiddleware;
const {
    getAll,
    getById,
    create,
    addLesson,
    completeLesson,
    rateCourse,
    startCourse
} = container.cradle.courseController;

router.get('/', catchAsync(getAll));

router.get('/:courseId', catchAsync(getById));

router.post('/', withAuth, allowOnly(accessLevels.ADMIN), catchAsync(create));

router.post('/:courseId/lessons', withAuth, allowOnly(accessLevels.ADMIN), catchAsync(addLesson));

router.post('/:courseId/lesssons/:lessonId/complete', withAuth, catchAsync(completeLesson));

router.post('/:courseId/rate', withAuth, catchAsync(rateCourse));

router.post('/:courseId/start', withAuth, catchAsync(startCourse));

module.exports = router;