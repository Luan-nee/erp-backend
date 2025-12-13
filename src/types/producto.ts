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

/*

// --- CÓDIDGO PARA CREAR UN ENDPOINT CON EL MÉTODO POST (para crear producto) ---
import { ProductoPayload, PropProducto } from '../types/producto';


// * Simula la inserción de un nuevo producto en la base de datos.
// * @param data - El payload del producto.
// * @returns El producto completo con ID y fecha de creación.

export const crearProductoDB = async (data: ProductoPayload): Promise<PropProducto> => {
  // --- Lógica real de la base de datos (Ejemplo SQL/ORM) ---

  // const resultado = await db.query(
  //   'INSERT INTO productos (sku, nombre, descripcion, ...) VALUES ($1, $2, $3, ...)',
  //   [data.sku, data.nombre, data.descripcion, ...]
  // );

  // Simulación de la DB: Asigna un ID y la fecha actual
  const nuevoProducto: PropProducto = {
    ...data,
    id: Math.floor(Math.random() * 1000) + 1, // ID simulado
    fecha_creacion: new Date(),
  };

  console.log('✅ Producto guardado en DB:', nuevoProducto);

  return nuevoProducto;
};

*/