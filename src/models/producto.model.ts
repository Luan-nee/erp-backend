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
  categoria_id: number;
  color_id: number;
  marca_id: number;
  fecha_creacion: Date;
  stock: number;
  stock_minimo: number;
  porcentaje_ganancia: number;
  esta_inhabilitado: boolean;
  fecha_actualizacion: Date;
}

export type ProductoCreate = {
  id: number;
  sku: string;
  nombre: string;
  descripcion: string;
  precio_compra: number;
  color_id: number;
  categoria_id: number;
  marca_id: number;
} 

export type DetallesProductoCreate = {
  id: number;
  porcentaje_ganancia: number;
  stock: number;
  stock_minimo: number;
  esta_inhabilitado: boolean;
  producto_id: number;
  sucursal_id: number;
}

export type ProductoUpdate = {
  nombre: string;
  descripcion: string;
  precio_compra: number;
  categoria_id: number;
  color_id: number;
  marca_id: number;
}

export type DetalleProductoUpdate = {
  porcentaje_ganancia: number;
  stock: number;
  stock_minimo: number;
  esta_inhabilitado: boolean;
  // fecha_actualizacion: Date; // Esto se actualizará automáticamente en la base de datos
}
