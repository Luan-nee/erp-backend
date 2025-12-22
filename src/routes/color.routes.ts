import { Router } from 'express';
import ColorController from '../controllers/color.controller';

const router = Router();
const colorController = new ColorController();

router.get('/', colorController.getAllColors);
router.get('/:id', colorController.getColorById);

export default router;