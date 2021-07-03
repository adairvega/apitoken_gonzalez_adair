import {Router} from 'express';
const router = Router();

import * as userController from "../controllers/user.controller";
import { verifyToken } from "../middlewares";

//Rutas get
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);

//Rutas de administración
router.post('/', [verifyToken], userController.registerUser);
router.put('/:id',[verifyToken], userController.updateUserById);
router.delete('/delete/:id',[verifyToken], userController.deleteUserById);

export default router;