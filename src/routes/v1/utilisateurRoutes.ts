
import express from 'express';
import * as utilisateurController from '../../controllers/utilisateurController';
import { validateRequest } from '../../middlewares/validateRequest';
import { registerSchema, loginSchema, updateUserSchema } from '../../validations/utilisateurValidation';
import { protect, authorize } from '../../middlewares/auth';

const router = express.Router();

router.post('/register', validateRequest(registerSchema), utilisateurController.register);
router.post('/login', validateRequest(loginSchema), utilisateurController.login);

router.route('/')
  .get(protect, authorize('admin'), utilisateurController.getAllUsers);

router.route('/:id')
  .get(protect, utilisateurController.getUserById)
  .put(protect, validateRequest(updateUserSchema), utilisateurController.updateUser)
  .delete(protect, authorize('admin'), utilisateurController.deleteUser);

export default router;