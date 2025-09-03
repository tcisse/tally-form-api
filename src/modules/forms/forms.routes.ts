import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { generateSchema, patchSchema } from './forms.schemas.js';
import { generateController, listController, getController, deleteController, applyController, patchController } from './forms.controller.js';
import { makeUserRateLimiter } from '../../middleware/ratelimit.js';

const router = Router();

router.use(authMiddleware);

router.post('/generate', makeUserRateLimiter({ max: 10, windowMs: 60_000 }), validate({ body: generateSchema }), generateController);
router.get('/', listController);
router.get('/:id', getController);
router.patch('/:id', makeUserRateLimiter({ max: 30, windowMs: 60_000 }), validate({ body: patchSchema }), patchController);
router.delete('/:id', deleteController);
router.post('/:id/apply', applyController);

export default router;

