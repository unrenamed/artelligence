import express from 'express';
import { catchAsync } from '../../../common/errors/error';
import container from '../container';

const router = express.Router();

const { charge } = container.cradle.paymentController;

router.post('/charge', catchAsync(charge));

export default router;