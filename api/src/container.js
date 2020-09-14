const { createContainer, asClass, asValue } = require('awilix');

const CourseController = require('./controllers/course.controller');
const CourseService = require('./services/course.service');
const CourseValidator = require('./validators/course.validator');

const AuthController = require('./controllers/auth.controller');
const AuthService = require('./services/auth.service');
const AuthValidator = require('./validators/auth.validator');

const UserService = require('./services/user.service');

const AuthMiddleware = require('./middlewares/auth.middleware');

const container = createContainer();

// Register controllers
container.register({
    courseController: asClass(CourseController),
    authController: asClass(AuthController),
});

// Register middleware
container.register({
    authMiddleware: asClass(AuthMiddleware)
});

// Register services
container.register({
    courseService: asClass(CourseService),
    authService: asClass(AuthService),
    userService: asClass(UserService)
});

// Register validators
container.register({
    courseValidator: asClass(CourseValidator),
    authValidator: asClass(AuthValidator)
});

// Register helper functions/values
container.register({
    timeout: asValue(1000)
});

module.exports = container;