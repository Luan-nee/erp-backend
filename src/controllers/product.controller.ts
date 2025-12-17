// src/controllers/product.controller.ts
import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service";
import { ProductoSelect, ProductoSelectById } from "../models/producto.model";
import { ApiResponse } from "../models/api-response.model";

const productService = new ProductService();

export class ProductController {
  // GET /api/products
  async getProducts(
    req: Request,
    res: Response<ApiResponse<ProductoSelect[]>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const idSucursal = parseInt(req.params.id_sucursal ?? "0");
      const products = await productService.getDetallesProductos(idSucursal);
      
      // CONSTRUIR LA RESPUESTA ESTANDARIZADA
      const responseBody: ApiResponse<ProductoSelect[]> = {
        status: 200,
        message: "Lista de productos recuperada exitosamente.",
        info: products, // Aquí va el array de datos
      };

      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  // GET /api/products/:id
  async getProductById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const idSucursal = parseInt(req.params.id_sucursal ?? "0");
      const id = parseInt(req.params.id_producto ?? "0");
      const product = await productService.getProductById(id, idSucursal);
      // CONSTRUIR LA RESPUESTA ESTANDARIZADA
      const responseBody: ApiResponse<ProductoSelectById> = {
        status: 200,
        message: "Producto recuperado exitosamente.",
        info: product, // Aquí va el objeto de datos
      };
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  // POST /api/products
  async createProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // **IMPORTANTE**: Aquí iría el middleware de validación (ej. con Joi/Zod)
      const newId = await productService.createDetalleProducto(req.body);
      res.status(201).json({
        message: "Product created successfully",
        id: newId,
      });
    } catch (error) {
      next(error);
    }
  }
}
