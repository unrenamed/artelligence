import { pick } from 'lodash';
import request from 'request-promise-native';

class CourseController {

		constructor({ courseService }) {
				this.courseService = courseService;

				this.create = this.create.bind(this);
				this.getAll = this.getAll.bind(this);
				this.getById = this.getById.bind(this);
				this.addLesson = this.addLesson.bind(this);
				this.rateCourse = this.rateCourse.bind(this);
				this.purchaseCourse = this.purchaseCourse.bind(this);
				this.completeLesson = this.completeLesson.bind(this);
				this.getCourseProgress = this.getCourseProgress.bind(this);
		}

		async create(req, res) {
				const courseDTO = pick(req.body, [
						'title',
						'description',
						'price',
						'level'
				]);
				const course = await this.courseService.create(courseDTO);

				return res.status(201).json({
						message: 'New course was successfully added to the system',
						data: course
				});
		}

		async getAll(req, res) {
				const courses = await this.courseService.getAll();
				res.status(200).json(courses);
		}

		async getById(req, res) {
				const { courseId } = req.params;
				const course = await this.courseService.getById(courseId);
				res.status(200).json(course);
		}

		async addLesson(req, res) {
				const { courseId } = req.params;
				const { title, number } = req.body;
				const lessonDTO = {
						title,
						number,
						courseId
				};

				const lesson = await this.courseService.addLesson(lessonDTO);
				res.status(201).json({
						message: `New lesson was successfully added to the system`,
						data: lesson
				});
		}

		async rateCourse(req, res) {
				const { courseId } = req.params;
				const { id: userId } = req.user;
				const { rating } = req.body;
				const ratingDTO = {
						courseId,
						userId,
						rating
				};

				const courseRating = await this.courseService.rateCourse(ratingDTO);
				res.status(201).json({
						message: `Course ${ courseId } was successfully rate by user ${ userId } with rating ${ rating }`,
						data: courseRating
				});
		}

		async purchaseCourse(req, res) {
				const { courseId } = req.params;
				const { id: userId } = req.user;

				const paymentResult = await request.post('http://payment-service:8090/api/charge', { form: req.body });
				const purchaseResult = await this.courseService.purchaseCourse(courseId);

				res.status(201).json({
						message: `Course ${ courseId } was successfully purchased by user ${ userId }`,
						data: {
								paymentResult,
								purchaseResult
						}
				});
		}

		async completeLesson(req, res) {
				const { lessonId } = req.params;
				const { id: userId } = req.user;
				const completeData = req.body;

				const completeMessage = await this.courseService.completeLesson(lessonId, userId, completeData);

				res.status(201).json({ message: completeMessage });
		}

		async getCourseProgress(req, res) {
				const { courseId } = req.params;
				const { id: userId } = req.user;
				const progress = await this.courseService.getCourseProgress(courseId, userId);
				res.status(200).json(progress);
		}
}

export default CourseController;