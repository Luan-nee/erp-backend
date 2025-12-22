import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service";
import { ProductoSelect, ProductoSelectById, ResumenProductos } from "../models/producto.model";
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

  async getResumenProductos(
  req: Request,
  res: Response<ApiResponse<ResumenProductos>>,
  next: NextFunction
): Promise<void> {
  try {
    // 1. Capturar el valor
    const rawId = req.params.id_sucursal;
    const idSucursal = parseInt(rawId ?? "0");

    // 2. VALIDACIÓN CRÍTICA: Si no es un número, lanzar error antes de ir a la DB
    if (isNaN(idSucursal) || idSucursal <= 0) {
      const error: any = new Error(`El parámetro id_sucursal ('${rawId}') no es un número válido.`);
      error.status = 400;
      throw error;
    }

    const resumen = await productService.getResumenProductos(idSucursal);
    
    const responseBody: ApiResponse<ResumenProductos> = {
      status: 200,
      message: "Resumen de productos recuperado exitosamente.",
      info: resumen,
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
      const newId = await productService.createDetalleProducto(parseInt(req.params.id_sucursal ?? "0"), req.body);
      res.status(201).json({
        message: "Product created successfully",
        id: newId,
      });
    } catch (error) {
      next(error);
    }
  }
}
