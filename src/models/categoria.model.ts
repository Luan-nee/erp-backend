export type Categoria = {
  id: number;
  nombre: string;
  descripcion: string;
}

export type CategoriaSelect = Categoria & { cantidad_productos: number };