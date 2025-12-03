export type PropCategoria = {
  id: number;
  nombre: string;
  descripcion: string;
  cantidad_productos: number;
}

export type PropResumen = {
  total_categorias: number;
  total_productos: number;
  promedio_categoria: number; 
}