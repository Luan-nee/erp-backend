// src/routes/product.routes.ts
import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';

const router = Router();
const productController = new ProductController();

// 1. Rutas específicas PRIMERO
router.get('/resumen/:id_sucursal', productController.getResumenProductos);

// 2. Rutas con parámetros después
router.get('/:id_sucursal', productController.getProducts);
router.get('/:id_sucursal/:id_producto', productController.getProductById);

// 3. Otros métodos
router.post('/', productController.createProduct);

export default router;