import { map, merge, find } from 'lodash'
import { QueryTypes } from 'sequelize'
import { lessonStatus } from '../../../common/constants/statuses'
import { ErrorHandler } from '../../../common/errors/error'
import { isValidJson } from '../../../common/utils/validation'
import sequelize from '../config/db.config'
import models from '../models'
import { upsert } from '../models/utils'
import { avg } from '../utils'

const { Lesson, Course, CourseRating, LessonProgress, Order } = models

class CourseService {

	constructor({ courseValidator }) {
		this.courseValidator = courseValidator
	}

	async create(courseDTO) {
		this.courseValidator.validateCourse(courseDTO)

		const course = new Course(courseDTO)
		await course.save()
		return course
	}

	async getAll(limit, offset) {
		return await Course.findAndCountAll({
			offset,
			limit,
			order: [
				[
					'price',
					'ASC'
				],
				[
					'title',
					'ASC'
				],
			],
			where: { isActive: true }
		})
	}

	async getById(courseId, user) {
		const course = await Course.findByPk(courseId, {
			include: [
				{
					model: Lesson, as: 'lessons', attributes: [
						'id',
						'title',
						'number'
					]
				}
			]
		})

		if (!course) {
			throw new ErrorHandler(400, `Course with ID = ${ courseId } parameter was not found`)
		}

		const rating = await this.getCourseRating(course)
		const lessons = await this.getCourseLessons(courseId, user)
		const isPurchased = user ?
				!!await Order.findOne({ where: { courseId, userId: user.id } }) :
				false

		return { ...course.dataValues, ...rating, lessons, isPurchased }
	}

	async addLesson(lessonDTO) {
		await this.courseValidator.validateLesson(lessonDTO)

		const lesson = new Lesson(lessonDTO)
		await lesson.save()
		return lesson
	}

	async rateCourse(ratingDTO) {
		await this.courseValidator.validateCourseRating(ratingDTO)

		const rating = new CourseRating(ratingDTO)
		await rating.save()
		return rating
	}

	async getCourseRating(course) {
		const ratings = map(await course.getUserRatings(), user => +user.courseRating.rating)
		return {
			rating: avg(ratings),
			numberOfReviews: ratings.length
		}
	}

	async getCourseLessons(courseId, user) {
		const lessons = await Lesson.findAll({ where: { courseId } })
		if (!user) return lessons

		return await this.getCourseLessonsWithProgress(courseId, user)
	}

	async getCourseLessonsWithProgress(courseId, user) {
		const lessons = await Lesson.findAll({ where: { courseId } })
		const lessonsIds = map(lessons, 'id')
		const lessonsProgresses = await LessonProgress.findAll({
			where: { lessonId: lessonsIds, userId: user.id }
		})

		const getLessonStatus = ({ id }) => {
			const progress = find(lessonsProgresses, { 'lessonId': id })
			return !!progress ?
					progress.isCompleted ? lessonStatus.COMPLETED : lessonStatus.IN_PROGRESS :
					lessonStatus.NOT_STARTED
		}

		return map(lessons, lesson => ({ ...lesson.dataValues, status: getLessonStatus(lesson) }))
	}

	async completeLesson(lessonId, userId, completeData) {
		await this.courseValidator.validateLessonCompletion(lessonId, userId)

		const progress = { lessonId, userId, isCompleted: true, ...completeData }
		await upsert(LessonProgress, { lessonId, userId }, progress)

		const lesson = await Lesson.findByPk(lessonId)
		const nextLesson = await Lesson.findOne({
			where: { courseId: lesson.courseId, number: lesson.number + 1 },
			attributes: ['id']
		})

		if (!nextLesson) {
			return `Course with ID = ${ lesson.courseId } is completed by user with ID = ${ userId }`
		}

		// Create the progress for the next lesson
		await LessonProgress.create({ lessonId: nextLesson.id, userId, isCompleted: false })
		return `Lesson ${ lessonId } was successfully completed by user ${ userId }`
	}

	async purchaseCourse(courseId, userId, paymentData) {
		await this.courseValidator.validateCoursePurchase(courseId, userId)

		const order = new Order({
			courseId,
			userId,
			paymentData: isValidJson(paymentData) ?
					paymentData : JSON.stringify(paymentData)
		})
		await order.save()
		return order
	}

	async getTopCourses() {
		const query = `
        select c.id                              as courseId,
               count(cR.userId)                  as numberOfReviews,
               sum(cR.rating) / count(cR.userId) as avgRating
        from courses c
                 inner join courseRatings cR on c.id = cR.courseId
        where c.isActive is true
        group by cR.courseId
        order by avgRating desc,
                 numberOfReviews desc limit 3
		`

		const topRatings = map(
				await sequelize.query(query, { raw: true, type: QueryTypes.SELECT }),
				({ courseId, numberOfReviews, avgRating }) => ({ id: courseId, numberOfReviews, avgRating })
		)

		const topCoursesIds = map(topRatings, 'id')

		const topCourses = await Course.findAll({
			where: { id: topCoursesIds },
			order: sequelize.literal('FIELD(course.id,' + topCoursesIds.join(',') + ')'), // follow the same order
			raw: true
		})

		return merge(topCourses, topRatings)
	}
}

export default CourseService