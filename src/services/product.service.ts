// src/services/product.service.ts
import {
  DetallesProductoCreate,
  ProductoCreate,
  ProductoSelect,
  ProductoSelectById
} from "../models/producto.model";
import { ProductosRepository } from "../repositories/productos.repository";

// Instanciamos el repositorio para usarlo
const productRepository = new ProductosRepository();

export class ProductService {
  async getDetallesProductos(idSucursal: number): Promise<ProductoSelect[] | null> {
    // Podríamos añadir lógica de negocio aquí, ej: aplicar descuentos
    const sucursalExists = await productRepository.SucursalExists(idSucursal);

    if (!sucursalExists){
      const error: any = new Error(`No se encontró una sucursal con ID=${idSucursal}.`);
      error.status = 404;
      throw error;
    }

    const products = await productRepository.findAll(idSucursal);

    if (!products){
      const error: any = new Error(`No se encontró una sucursal con ID=${idSucursal} o no tiene productos.`);
      error.status = 404;
      throw error;
    }

    return products;
  }

  async getProductById(
    idProduct: number,
    idSucursal: number
  ): Promise<ProductoSelectById> {
    const product = await productRepository.findById(idProduct, idSucursal);

    if (!product) {
      // Manejo de error: aquí podrías lanzar un error tipado (ej. NotFoundError)
      throw new Error(`Producto con la ID=${idProduct} No encontrado.`);
    }
    return product;
  }

  async createDetalleProducto(
    productData: DetallesProductoCreate
  ): Promise<number> {
    // Podríamos validar datos o aplicar transformaciones aquí
    const id = await productRepository.createDetalleProducto(productData);
    return id;
  }

  async createProducto(productData: ProductoCreate): Promise<number> {
    // Podríamos validar datos o aplicar transformaciones aquí
    const id = await productRepository.createProducto(productData);
    return id;
  }
}
