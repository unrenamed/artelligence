import { trim, isFinite, isNil, isEmpty, map, sortBy, isEqual } from 'lodash'
import { Op } from 'sequelize'
import { ErrorHandler } from '../../../common/errors/error'
import config from '../config/app.config'
import models from '../models'

const { Lesson, Course, CourseRating, LessonProgress, Order } = models

const { BEGINNER, EXPERT } = config.skillLevels

class CourseValidator {

	validateCourse(course) {
		let { title, description, price, level } = course

		title = trim(title)
		description = trim(description)

		// Title
		if (isEmpty(title) || title.length < 5) {
			throw new ErrorHandler(400, 'Title is empty or less than 5 characters')
		}

		// Description
		if (isEmpty(description) || description.length < 100) {
			throw new ErrorHandler(400, 'Description is empty or less than 100 characters')
		}

		// Price
		if (!isNil(price)) {

			if (!isFinite(price)) {
				throw new ErrorHandler(400, 'Price is not a number')
			}

			if (price < 0) {
				throw new ErrorHandler(400, 'Price can not be a negative number')
			}
		}

		// Level
		if (isNil(level)) {
			throw new ErrorHandler(400, 'Course level is missed')
		}

		if (!isFinite(level)) {
			throw new ErrorHandler(400, 'Level is not a number')
		}

		if (level < BEGINNER || level > EXPERT) {
			throw new ErrorHandler(400, `Supported levels should be between ${ BEGINNER }-${ EXPERT }, inclusively`)
		}
	}

	async validateLesson(lesson) {
		let { title, number, courseId } = lesson

		// Common
		const courseExist = !!await Course.findByPk(courseId)
		if (!courseExist) {
			throw new ErrorHandler(400, `Can not add a lesson to a non-existing course`)
		}

		const lessonExist = !!await Lesson.findOne({ where: { number, courseId } })
		if (lessonExist) {
			throw new ErrorHandler(400, `Lesson with number=${ number } already exists for course with ID=${ courseId }`)
		}

		title = trim(title)

		// Title
		if (isEmpty(title) || title.length < 5) {
			throw new ErrorHandler(400, 'Title is empty or less than 5 characters')
		}

		// Number
		if (isNil(number)) {
			throw new ErrorHandler(400, 'Lesson number is missed')
		}

		if (!isFinite(number)) {
			throw new ErrorHandler(400, 'Lesson number is not a number')
		}

		if (number < 1) {
			throw new ErrorHandler(400, 'Lesson number can not be 0 or a negative number')
		}
	}

	async validateLessonCompletion(lessonId, userId) {
		const lesson = await Lesson.findByPk(lessonId)
		if (!lesson) {
			throw new ErrorHandler(400, `Can not complete a non-existing lesson`)
		}

		const lessonProgress = await LessonProgress.findOne({ where: { lessonId, userId } })
		if (lessonProgress && lessonProgress.isCompleted) {
			throw new ErrorHandler(400, `Lesson with ID = ${ lessonId } is already completed by user ${ userId }`)
		}

		const prevCourseLessons = await Lesson.findAll({
			where: {
				courseId: lesson.courseId,
				number: { [Op.lt]: lesson.number }
			}
		})

		const completedLessons = await LessonProgress.findAll({
			where: {
				userId,
				isCompleted: true,
				lessonId: map(prevCourseLessons, 'id')
			}
		})

		const prevLessonsIds = sortBy(map(prevCourseLessons, 'id'))
		const completedLessonsIds = sortBy(map(completedLessons, 'lessonId'))

		if (!isEqual(prevLessonsIds, completedLessonsIds)) {
			throw new ErrorHandler(400, `Can not finish lesson until the previous lessons are completed`)
		}
	}

	async validateCourseRating(rating) {
		const { courseId, userId, rating: ratingNumber } = rating

		const courseExist = !!await Course.findByPk(courseId)
		if (!courseExist) {
			throw new ErrorHandler(400, `Can not rate a non-existing course`)
		}

		const isCourseRate = !!await CourseRating.findOne({ where: { courseId, userId } })
		if (isCourseRate) {
			throw new ErrorHandler(400, `User can not rate the same course multiple times`)
		}

		const min = 1,
				max = 5
		if (ratingNumber < min || ratingNumber > max) {
			throw new ErrorHandler(400, `Only numbers from ${ min } to ${ max } are allowed to rate a course`)
		}
	}

	async validateCoursePurchase(courseId, userId) {
		const courseExist = !!await Course.findByPk(courseId)
		if (!courseExist) {
			throw new ErrorHandler(400, `Can not purchase a non-existing course`)
		}

		const isPurchased = !!await Order.findOne({ where: { courseId, userId } })
		if (isPurchased) {
			throw new ErrorHandler(400, `User can not purchase the same course multiple times`)
		}
	}
}

export default CourseValidator