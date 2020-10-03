const { ErrorHandler } = require('../utils/error');
const { trim, isFinite, isNil, isEmpty } = require('lodash');
const { BEGINNER, EXPERT } = require('../configs/app.config').skillLevels;

class CourseValidator {

		validateCourse(course) {
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
								throw new ErrorHandler(400, `Supported levels should be between ${ BEGINNER }-${ EXPERT }, inclusively`);
						}

				}
		}

		validateLesson(lesson) {
				let { title, number } = lesson;

				title = trim(title);

				// Title
				if (isEmpty(title) || title.length < 5) {
						throw new ErrorHandler(400, 'Title is empty or less than 5 characters');
				}

				// Number
				if (isNil(number)) {
						throw new ErrorHandler(400, 'Lesson number is missed');
				}

				if (!isFinite(number)) {
						throw new ErrorHandler(400, 'Lesson number is not a number');
				}

				if (number < 1) {
						throw new ErrorHandler(400, 'Lesson number can not be 0 or a negative number');
				}
		}
}

module.exports = CourseValidator;