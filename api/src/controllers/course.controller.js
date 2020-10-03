const { pick } = require('lodash');

class CourseController {

		constructor({ courseService }) {
				this.courseService = courseService;

				this.create = this.create.bind(this);
				this.getAll = this.getAll.bind(this);
				this.getById = this.getById.bind(this);
				this.addLesson = this.addLesson.bind(this);
				this.rateCourse = this.rateCourse.bind(this);
				this.startCourse = this.startCourse.bind(this);
				this.completeLesson = this.completeLesson.bind(this);
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

		async startCourse(req, res) {
		}

		async completeLesson(req, res) {
		}
}

module.exports = CourseController;