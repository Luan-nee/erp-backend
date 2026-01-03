import { Router } from 'express';
import ColaboradorController from '../controllers/colaborador.controller';

const router = Router();
const colaboradorController = new ColaboradorController();

router.get('/resumen', colaboradorController.resumenColaboradores);
router.get('/', colaboradorController.select);

export default router;