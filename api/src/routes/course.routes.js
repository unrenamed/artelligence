import express from 'express'
import { catchAsync } from '../../../common/errors/error'
import config from '../config/app.config'
import container from '../container'

const router = express.Router();

const { accessLevels } = config;

const { withAuth, allowOnly } = container.cradle.authMiddleware;
const {
		getAll,
		getById,
		create,
		addLesson,
		completeLesson,
		rateCourse,
		getCourseProgress,
		purchaseCourse,
		getTopCourses
} = container.cradle.courseController;

router.get('/', catchAsync(getAll));

router.get('/top', catchAsync(getTopCourses));

router.get('/:courseId', catchAsync(getById));

router.post('/', withAuth, allowOnly(accessLevels.ADMIN), catchAsync(create));

router.post('/:courseId/lessons', withAuth, allowOnly(accessLevels.ADMIN), catchAsync(addLesson));

router.post('/:courseId/lessons/:lessonId/complete', withAuth, catchAsync(completeLesson));

router.post('/:courseId/rate', withAuth, catchAsync(rateCourse));

router.get('/:courseId/progress', withAuth, catchAsync(getCourseProgress));

router.post('/:courseId/purchase', withAuth, catchAsync(purchaseCourse));

export default router;