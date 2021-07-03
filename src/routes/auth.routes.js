import {Router} from 'express';
const router = Router();

import * as authController from "../controllers/auth.controller";

router.post('/signin', authController.signin);
router.post('/signup', authController.signup);

export default router;