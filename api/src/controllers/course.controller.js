const { isEmpty, isFinite, trim, isNil } = require('lodash');
const { ErrorHandler } = require('../utils/error');
const { BEGINNER, EXPERT } = require('../configs/app.config').skillLevels;
const { Lesson, Course } = require('../models');

class CourseController {

    static async create(req, res) {
        const { title, description, price, level } = req.body;
        const course = new Course({ title, description, price, level });

        validateCourse(course);

        await course.save();
        res.status(201).json({ message: `'${title}' course was successfully created!` });
    }

    static async getAll(req, res) {
        const allCourses = await Course.findAll();
        res.status(200).json(allCourses);
    }

    static async getById(req, res) {
        const { courseId } = req.params;
        const course = await Course.findByPk(courseId, { include: ['lessons'] });

        if (isNil(course)) {
            throw new ErrorHandler(400, `Course with ID = ${courseId} parameter was not found`);
        }

        res.status(200).json(course);
    }

    static async addLesson(req, res) {
        const courseId = req.params.courseId;
        const { title } = req.body;
        const lesson = new Lesson({ title, courseId });

        validateLesson(lesson);

        await lesson.save();
        res.status(201).json({ message: `${title} lesson was successfully added to course` });
    }
}

const validateCourse = course => {
    let { title, description, price, level } = course;

    title = trim(title);
    description = trim(description);

    // Title
    if (isEmpty(title) || title.length < 5) {
        throw new ErrorHandler(400, 'Title is empty or less than 5 characters');
    }

    // Description
    if (isEmpty(description) || description.length < 100) {
        throw new ErrorHandler(400, 'Description is empty or less than 100 characters');
    }

    // Price
    if (!isNil(price)) {

        if (!isFinite(price)) {
            throw new ErrorHandler(400, 'Price is not a number');
        }

        if (price < 0) {
            throw new ErrorHandler(400, 'Price can not be a negative number');
        }
    }

    // Level
    if (!isNil(level)) {

        if (!isFinite(level)) {
            throw new ErrorHandler(400, 'Level is not a number');
        }

        if (level < BEGINNER || level > EXPERT) {
            throw new ErrorHandler(400, `Supported levels should be between ${BEGINNER}-${EXPERT}, inclusively`);
        }

    }
};

const validateLesson = lesson => {
    let { title } = lesson;

    title = trim(title);

    // Title
    if (isEmpty(title) || title.length < 5) {
        throw new ErrorHandler(400, 'Title is empty or less than 5 characters');
    }
};

module.exports = CourseController;