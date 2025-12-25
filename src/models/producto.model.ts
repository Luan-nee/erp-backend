export type ProductoSelect = {
  id: number;
  sku: string;
  nombre: string;
  descripcion: string;
  stock: number;
  stock_minimo: number;
  porcentaje_ganancia: number;
  esta_inhabilitado: boolean;
}

export type ProductoSelectById = {
  id: number;
  sku: string;
  nombre: string;
  descripcion: string;
  precio_compra: number;
  categoria: string;
  color: string;
  marca: string;
  fecha_creacion: Date;
  stock: number;
  stock_minimo: number;
  porcentaje_ganancia: number;
  esta_inhabilitado: boolean;
  fecha_actualizacion: Date;
}

export type ProductoUpdate = {
  nombre: string; // t-productos
  descripcion: string; // t-productos
  precio_compra: number; // t-productos
  categoria_id: number; // t-productos
  color_id: number; // t-productos
  marca_id: number; // t-productos
  stock: number; // t-detalles_productos
  stock_minimo: number; // t-detalles_productos
  porcentaje_ganancia: number; // t-detalles_productos
  esta_inhabilitado: boolean; // t-detalles_productos
}

export type ResumenProductos = {
  total_productos: number;
  activos: number;
  inhabilitados: number;
}

export type ProductoCreate = {
  nombre: string;
  descripcion: string;
  precio_compra: number;
  color_id: number;
  categoria_id: number;
  marca_id: number;
} 

export type DetallesProductoCreate = {
  porcentaje_ganancia: number;
  stock: number;
  stock_minimo: number;
}

export type ProductCreateMain = ProductoCreate & DetallesProductoCreate;

export type ProductMoreInfo = {
  // propiededes de la tabla productos
  sku: string;
  nombre: string;
  descripcion: string;
  // path_foto: string; // Se omite temporalmente
  precio_compra: number;
  categoria_id: number;
  color_id: number;
  marca_id: number;

  // propiedades de la tabla detalles_producto
  porcentaje_ganancia: number;
  stock: number;
  stock_minimo: number;
  esta_inhabilitado: boolean;
}