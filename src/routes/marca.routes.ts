import { Router } from 'express';
import { MarcaController } from '../controllers/marca.controller';

const router = Router();
const marcaController = new MarcaController();

// Definición de rutas para Marcas
router.get('/', marcaController.getMarcas);
router.get('/select', marcaController.select);
router.get('/resumen', marcaController.getResumenMarcas);
router.get('/:id', marcaController.getMarcaById);
router.post('/', marcaController.createMarca);
router.put('/:id', marcaController.updateMarca);
router.delete('/:id', marcaController.deleteMarca);

export default router;