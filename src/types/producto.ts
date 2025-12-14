export type PropProductoResumen = {
  id: number;
  sku: string;
  nombre: string;
  descripcion: string;
  stock: number;
  stock_minimo: number;
  porcentaje_ganancia: number;
  esta_habilitado: boolean;
}

export type ProductoCard = {
  id: number;
  sku: string;
  nombre: string;
  descripcion: string;
  stock: number;
  stock_minimo: number;
  porcentaje_ganancia: number;
  esta_habilitado: boolean;
}

export type PropProducto = {
  id: number;
  sku: string;
  nombre: string;
  descripcion: string;
  path_foto: string;
  precio_compra: number;
  color_id: number;
  categoria_id: number;
  marca_id: number;
  fecha_creacion: Date;
}