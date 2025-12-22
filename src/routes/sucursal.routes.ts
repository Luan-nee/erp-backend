// src/routes/product.routes.ts
import { Router } from 'express';
import SucursalController from '../controllers/sucursal.controller';

const router = Router();
const sucursalController = new SucursalController();

router.get('/:id_sucursal', sucursalController.getSucursalById);
router.get('/', sucursalController.getSucursales);


export default router;