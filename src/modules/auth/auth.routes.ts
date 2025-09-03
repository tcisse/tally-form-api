import { Router } from 'express';
import { validate } from '../../middleware/validate.js';
import { authMiddleware } from '../../middleware/auth.js';
import { signupSchema, loginSchema } from './auth.schemas.js';
import { signupController, loginController, meController } from './auth.controller.js';

const router = Router();

router.post('/signup', validate({ body: signupSchema }), signupController);
router.post('/login', validate({ body: loginSchema }), loginController);
router.get('/me', authMiddleware, meController);

export default router;

