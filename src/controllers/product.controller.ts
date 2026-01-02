import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service";
import { DataProducto, ProductoSelect, ProductoSelectById, ResumenProductos } from "../models/producto.model";
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

  // POST /api/productos
  async crearProducto(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const newId: number = await productService.createProducto(req.body);

      const responseBody: ApiResponse<number> = {
        status: 200,
        message: "Producto Creadooo exitosamente.",
        info: newId,
      };

      res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  async actualizarProducto(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const idSucursal = parseInt(req.params.id_sucursal ?? "0");
      const idProducto = parseInt(req.params.id_producto ?? "0");
      await productService.updateProducto(idProducto, idSucursal, req.body);
      const responseBody: ApiResponse<number> = {
        status: 200,
        message: "Producto actualizado exitosamente.",
        info: null,
      };
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  async getDataProducto(
    req: Request,
    res: Response<ApiResponse<DataProducto>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const idSucursal = parseInt(req.params.id_sucursal ?? "0");
      const idProducto = parseInt(req.params.id_producto ?? "0");
      const productData = await productService.dataProducto(idProducto, idSucursal);
      const responseBody: ApiResponse<DataProducto> = {
        status: 200,
        message: "Datos del producto recuperados exitosamente.",
        info: productData,
      };
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }
}