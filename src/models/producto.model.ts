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

export type ProductoCreate = {
  id: number;
  sku: string;
  nombre: string;
  descripcion: string;
  path_foto: string;
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
