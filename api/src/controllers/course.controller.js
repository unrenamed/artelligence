const Course = require('../models/course.model');

class CourseController {

    static async create(req, res) {

    }

    static async getAll(req, res) {
        
    }

    static async addLesson(req, res) {
        const courseId = req.params.courseId;
    }

    static async getLessons(req, res) {
        const courseId = req.params.courseId;
    }

    static async purchase(req, res) {

    }
}

module.exports = CourseController;