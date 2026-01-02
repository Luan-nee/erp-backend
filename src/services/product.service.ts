// src/services/product.service.ts
import {
  DetallesProductoCreate,
  ProductoCreate,
  ProductoSelect,
  ProductoSelectById,
  ResumenProductos,
  ProductCreateMain,
  ProductoUpdate,
  DataProducto
} from "../models/producto.model";
import { ProductosRepository } from "../repositories/productos.repository";
import SucursalesRepository from "../repositories/sucursales.repository";
import { CategoriasRepository } from "../repositories/categorias.repository";
import ColoresRepository from "../repositories/colores.repository";
import { MarcasRepository } from "../repositories/marcas.repository";
import SucursalService from "../repositories/sucursales.repository"

// Instanciamos el repositorio para usarlo
const productRepository = new ProductosRepository();

export class ProductService {

  // obtienen datos de los productos según la sucursal.
  async getDetallesProductos(idSucursal: number): Promise<ProductoSelect[] | null> {
    // 1. Validar primero
    if (isNaN(idSucursal)) {
      const error: any = new Error(`El ID de sucursal proporcionado no es un número válido.`);
      error.status = 400;
      throw error;
    }

    const sucursalExists = await SucursalesRepository.SucursalExists(idSucursal);
    if (!sucursalExists){
      const error: any = new Error(`No se encontró una sucursal con ID=${idSucursal}.`);
      error.status = 404;
      throw error;
    }

    return await productRepository.findAll(idSucursal);
  }

  async getResumenProductos(idSucursal: number): Promise<ResumenProductos | null> {
    // 1. Validar primero SIEMPRE
    if (isNaN(idSucursal) || idSucursal <= 0) {
      const error: any = new Error(`El ID de sucursal proporcionado no es válido.`);
      error.status = 400;
      throw error;
    }

    const sucursalExists = await SucursalesRepository.SucursalExists(idSucursal);
    if (!sucursalExists){
      const error: any = new Error(`No se encontró una sucursal con ID=${idSucursal}.`);
      error.status = 404;
      throw error;
    }
    
    return await productRepository.getResumenProductos(idSucursal);
  }

  async getProductById(
    idProduct: number,
    idSucursal: number
  ): Promise<ProductoSelectById | null> {
    const productoExists = await ProductosRepository.ProductoExists(idProduct);
    const sucursalExists = await SucursalesRepository.SucursalExists(idSucursal);

    if (!sucursalExists) {
      const error: any = new Error(`No se encontró la sucursal con ID=${idSucursal}.`);
      error.status = 404;
      throw error;
    }

    if (!productoExists) {
      const error: any = new Error(`No se encontró el producto con ID=${idProduct}.`);
      error.status = 404;
      throw error;
    }

    const product = await productRepository.findById(idProduct, idSucursal);

    return product;
  }

  async createProducto(productData: ProductCreateMain): Promise<number> {
    // Podríamos validar datos o aplicar transformaciones aquí
    const categoriaExists = await CategoriasRepository.CategoriaExists(productData.categoria_id);
    const colorExists = await ColoresRepository.colorExists(productData.color_id);
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

  async updateProducto(
    idProduct: number,
    idSucursal: number,
    updateData: ProductoUpdate
  ): Promise<void> {
    const productoExists = await ProductosRepository.ProductoExists(idProduct);
    const sucursalExists = await SucursalesRepository.SucursalExists(idSucursal);
    if (!sucursalExists) {
      const error: any = new Error(`No se encontró la sucursal con ID=${idSucursal}.`);
      error.status = 404;
      throw error;
    }
    if (!productoExists) {
      const error: any = new Error(`No se encontró el producto con ID=${idProduct}.`);
      error.status = 404;
      throw error;
    }
    await productRepository.updateProducto(idProduct, idSucursal, updateData);
  }

  async dataProducto(
    idProduct: number,
    idSucursal: number
  ): Promise<DataProducto | null> {
    const productoExists = await ProductosRepository.ProductoExists(idProduct);
    const sucursalExists = await SucursalesRepository.SucursalExists(idSucursal);
    if (!sucursalExists) {
      const error: any = new Error(`No se encontró la sucursal con ID=${idSucursal}.`);
      error.status = 404;
      throw error;
    }
    if (!productoExists) {
      const error: any = new Error(`No se encontró el producto con ID=${idProduct}.`);
      error.status = 404;
      throw error;
    }
    const product = await productRepository.dataProducto(idProduct, idSucursal);
    return product;
  }
}