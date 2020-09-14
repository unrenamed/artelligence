const { Lesson, Course, CourseRating } = require('../models');
const { ErrorHandler } = require('../utils/error');
const { avg } = require('../utils');
const { map } = require('lodash');

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

    async getAll() {
        const allCourses = await Course.findAll();
        return allCourses;
    }

    async getById(courseId) {
        const course = await Course.findByPk(courseId, {
            include: [{
                model: Lesson,
                as: 'lessons',
                attributes: ['id', 'title', 'number']
            }]
        });

        if (!course) {
            throw new ErrorHandler(400, `Course with ID = ${courseId} parameter was not found`);
        }

        const result = {
            ...course.dataValues,
            rating: await this.getCourseRating(course)
        };
        return result;
    }

    async addLesson(lessonDTO) {
        this.courseValidator.validateLesson(lessonDTO);

        const courseExist = !!await Course.findByPk(lessonDTO.courseId);
        if (!courseExist) {
            throw new ErrorHandler(400, `Can not add a lesson to a non-existing course`);
        }

        const lessonExist = !!await Lesson.findOne({ where: { number: lessonDTO.number } });
        if (lessonExist) {
            throw new ErrorHandler(400, `Lesson with number=${lessonDTO.number} already exists for course with ID=${lessonDTO.courseId}`);
        }

        const lesson = new Lesson(lessonDTO);
        await lesson.save();
        return lesson;
    }

    async rateCourse(ratingDTO) {
        const courseExist = !!await Course.findByPk(ratingDTO.courseId);
        if (!courseExist) {
            throw new ErrorHandler(400, `Can not rate a non-existing course`);
        }

        const rating = new CourseRating(ratingDTO);
        await rating.save();
        return rating;
    }

    async getCourseRating(course) {
        const ratings = map(await course.getUserRatings(), user => +user.courseRating.rating);
        return avg(ratings);
    }

    async startCourse() { /*TODO*/ }

    async completeLesson() { /*TODO*/ }
}

module.exports = CourseService;