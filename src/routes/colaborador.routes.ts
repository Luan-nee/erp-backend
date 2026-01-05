import { Router } from 'express';
import ColaboradorController from '../controllers/colaborador.controller';

const router = Router();
const colaboradorController = new ColaboradorController();

router.get('/resumen', colaboradorController.resumenColaboradores);
router.post('/:id_colaborador/credenciales', colaboradorController.registrarCredenciales);
router.get('/:id_colaborador', colaboradorController.detallesColaborador);
router.get('/', colaboradorController.select);

export default router;