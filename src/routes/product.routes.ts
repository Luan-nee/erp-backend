// src/routes/product.routes.ts
import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';

const router = Router();
const productController = new ProductController();

// 1. Rutas específicas PRIMERO
router.get('/resumen/:id_sucursal', productController.getResumenProductos);
// http://localhost:3000/api/productos/dataProducto/:id_sucursal/:id_producto
router.get('/dataProducto/:id_sucursal/:id_producto', productController.getDataProducto);

// 2. Rutas con parámetros después
router.get('/:id_sucursal', productController.getProducts);
router.get('/:id_sucursal/:id_producto', productController.getProductById);

router.put('/:id_sucursal/:id_producto', productController.actualizarProducto);

// 3. Otros métodos
router.post('/', productController.crearProducto);

export default router;