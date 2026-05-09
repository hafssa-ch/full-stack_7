
import express from 'express';
import * as empruntController from '../../controllers/empruntController';
import { validateRequest } from '../../middlewares/validateRequest';
import { createEmpruntSchema } from '../../validations/empruntValidation';
import { protect, authorize } from '../../middlewares/auth';

const router = express.Router();

router.route('/')
  .get(protect, authorize('bibliothecaire', 'admin'), empruntController.getAllEmprunts)
  .post(protect, validateRequest(createEmpruntSchema), empruntController.createEmprunt);

router.route('/:id')
  .get(protect, empruntController.getEmpruntById)
  .put(protect, empruntController.returnEmprunt);  // retourner un emprunt

export default router;