// src/routes/product.routes.ts
import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';

const router = Router();
const productController = new ProductController();

// Usamos bind para mantener el contexto 'this' en el controlador
router.get('/:id_sucursal', productController.getProducts);
router.get('/:id_sucursal/:id_producto', productController.getProductById);
router.post('/', productController.createProduct);

export default router;