import { map } from 'lodash'
import { ErrorHandler } from '../../../common/errors/error'
import models from '../models'
import { upsert } from '../models/utils'
import { avg } from '../utils'

const { Lesson, Course, CourseRating, LessonProgress } = models;

class CourseService {

		constructor({ courseValidator }) {
				this.courseValidator = courseValidator;
		}

		async create(courseDTO) {
				this.courseValidator.validateCourse(courseDTO);

				const course = new Course(courseDTO);
				await course.save();
				return course;
		}

		async getAll(limit, offset) {
				return await Course.findAndCountAll({
					offset,
					limit,
					order: [
						['price', 'ASC'],
						['title', 'ASC'],
					],
					where: { isActive: true }
				});
		}

		async getById(courseId) {
				const course = await Course.findByPk(courseId, {
						include: [
								{
										model: Lesson,
										as: 'lessons',
										attributes: [
												'id',
												'title',
												'number'
										]
								}
						]
				});

				if (!course) {
						throw new ErrorHandler(400, `Course with ID = ${ courseId } parameter was not found`);
				}

				return {
						...course.dataValues,
						rating: await this.getCourseRating(course)
				};
		}

		async addLesson(lessonDTO) {
				await this.courseValidator.validateLesson(lessonDTO);

				const lesson = new Lesson(lessonDTO);
				await lesson.save();
				return lesson;
		}

		async rateCourse(ratingDTO) {
				await this.courseValidator.validateCourseRating(ratingDTO);

				const rating = new CourseRating(ratingDTO);
				await rating.save();
				return rating;
		}

		async getCourseRating(course) {
				const ratings = map(await course.getUserRatings(), user => +user.courseRating.rating);
				return avg(ratings);
		}

		async getCourseProgress(courseId, userId) {
				const lessonsIds = map(await Lesson.findAll({ where: { courseId } }), 'id');
				const lessonsProgresses = await LessonProgress.findAll({
						where: {
								lessonId: lessonsIds,
								userId
						}
				});
				return map(lessonsProgresses, ({ id, lessonId, isCompleted }) => ({ id, lessonId, isCompleted, courseId }));
		}

		async completeLesson(lessonId, userId, completeData) {
				await this.courseValidator.validateLessonCompletion(lessonId, userId);

				const progress = { lessonId, userId, isCompleted: true, ...completeData };
				await upsert(LessonProgress, { lessonId, userId }, progress);

				const lesson = await Lesson.findByPk(lessonId);
				const nextLesson = await Lesson.findOne({
						where: { courseId: lesson.courseId, number: lesson.number + 1 },
						attributes: ['id']
				});

				if (!nextLesson) {
						return `Course with ID = ${ lesson.courseId } is completed by user with ID = ${ userId }`;
				}

				// Create the progress for the next lesson
				await LessonProgress.create({ lessonId: nextLesson.id, userId, isCompleted: false });
				return `Lesson ${ lessonId } was successfully completed by user ${ userId }`;
		}

		async purchaseCourse(courseId) {
				console.log(`${ courseId } - purchased`);
				// TODO
		}
}

export default CourseService;