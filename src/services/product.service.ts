// src/services/product.service.ts
import {
  DetallesProductoCreate,
  ProductoCreate,
  ProductoSelect,
  ProductoSelectById
} from "../models/producto.model";
import { ProductosRepository } from "../repositories/productos.repository";
import SucursalesRepository from "../repositories/sucursales.repository";
import { CategoriasRepository } from "../repositories/categorias.repository";
import { ColoresRepository } from "../repositories/colores.repository";
import { MarcasRepository } from "../repositories/marcas.repository";

// Instanciamos el repositorio para usarlo
const productRepository = new ProductosRepository();

export class ProductService {
  async getDetallesProductos(idSucursal: number): Promise<ProductoSelect[] | null> {
    // Podríamos añadir lógica de negocio aquí, ej: aplicar descuentos
    const sucursalExists = await SucursalesRepository.SucursalExists(idSucursal);

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
  ): Promise<ProductoSelectById | null> {
    const ProductoExists = await ProductosRepository.ProductoExists(idProduct);

    if (!ProductoExists) {
      throw new Error(`Producto con la ID=${idProduct} No encontrado.`);
    }

    const product = await productRepository.findById(idProduct, idSucursal);

    return product;
  }

  async createDetalleProducto(
    productData: DetallesProductoCreate
  ): Promise<number> {
    const productoExists = await ProductosRepository.ProductoExists(productData.producto_id);
    const sucursalExists = await SucursalesRepository.SucursalExists(productData.sucursal_id);

    if (!productoExists) {
      const error: any = new Error(`No se encontró el producto con ID=${productData.producto_id}.`);
      error.status = 404;
      throw error;
    }else if (!sucursalExists) {
      const error: any = new Error(`No se encontró la sucursal con ID=${productData.sucursal_id}.`);
      error.status = 404;
      throw error;
    }

    const id = await productRepository.createDetalleProducto(productData);
    return id;
  }

  async createProducto(productData: ProductoCreate): Promise<number> {
    // Podríamos validar datos o aplicar transformaciones aquí
    const categoriaExists = await CategoriasRepository.CategoriaExists(productData.categoria_id);
    const colorExists = await ColoresRepository.ColorExists(productData.color_id);
    const marcaExists = await MarcasRepository.MarcaExists(productData.marca_id);

    if (!categoriaExists) {
      const error: any = new Error(`No se encontró la categoría con ID=${productData.categoria_id}.`);
      error.status = 404;
      throw error;
    } else if (!colorExists) {
      const error: any = new Error(`No se encontró el color con ID=${productData.color_id}.`);
      error.status = 404;
      throw error;
    } else if (!marcaExists) {
      const error: any = new Error(`No se encontró la marca con ID=${productData.marca_id}.`);
      error.status = 404;
      throw error;
    }

    const id = await productRepository.createProducto(productData);
    return id;
  }

  // async updateProducto(
  //   idProduct: number,
  //   productData: ProductoCreate
  // ): Promise<void> {
  //   const productoExists = await ProductosRepository.ProductoExists(idProduct);
  //   if (!productoExists) {
  //     const error: any = new Error(`No se encontró el producto con ID=${idProduct}.`);
  //     error.status = 404;
  //     throw error;
  //   }
  //   await productRepository.updateProducto(idProduct, productData);
  // }
}
