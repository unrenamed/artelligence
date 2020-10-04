import {
		createContainer,
		asClass,
		asValue
} from 'awilix';

import CourseController from './controllers/course.controller';
import CourseService from './services/course.service';
import CourseValidator from './validators/course.validator';

import AuthController from './controllers/auth.controller';
import AuthService from './services/auth.service';
import AuthValidator from './validators/auth.validator';
import AuthMiddleware from './middlewares/auth.middleware';

import UserService from './services/user.service';

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

export default container;