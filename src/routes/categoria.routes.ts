import { Router } from 'express';
import { CategoriaController } from '../controllers/categoria.controller';

const router = Router();
const categoriaController = new CategoriaController();

router.get('/', categoriaController.getCategorias);
router.get('/select', categoriaController.select);
router.get('/resumen', categoriaController.getResumenCategorias);
router.get('/:id', categoriaController.getCategoriaById);
router.post('/', categoriaController.createCategoria);
router.put('/:id', categoriaController.updateCategoria);
router.delete('/:id', categoriaController.deleteCategoria);

export default router;