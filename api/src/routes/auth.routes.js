import express from 'express';
import { catchAsync } from '../../../common/errors/error';
import container from '../container';

const router = express.Router();

const { register, authenticate, logout } = container.cradle.authController;
const { withAuth } = container.cradle.authMiddleware;

router.post('/register', catchAsync(register));

router.post('/authenticate', catchAsync(authenticate));

router.post('/logout', withAuth, logout);

export default router;