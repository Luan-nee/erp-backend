export type Marca = {
  id: number;
  nombre: string;
  descripcion: string;
}

export type MarcaCreate = {
  nombre: string;
  descripcion: string;
};

export type MarcaUpdate = {
  nombre: string;
  descripcion: string;
};

export type MarcaSelect = Marca & { cantidad_productos: number };

export type ResumenMarca = {
  total_marcas: number;
  total_productos: number;
  promedio_marca: number; 
}