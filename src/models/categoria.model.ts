export type Categoria = {
  id: number;
  nombre: string;
  descripcion: string;
}

export type CategoriaCreate = {
  nombre: string;
  descripcion: string;
};

export type CategoriaUpdate = {
  nombre: string;
  descripcion: string;
};

export type CategoriaSelect = Categoria & { cantidad_productos: number };

export type ResumenCategoria = {
  total_categorias: number;
  total_productos: number;
  promedio_categoria: number; 
}