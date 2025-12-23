import { db } from "../config/db.config";
import type { Categoria, CategoriaSelect, ResumenCategoria, CategoriaUpdate, CategoriaCreate } from "../models/categoria.model";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class CategoriasRepository {
  async select(): Promise<Categoria[] | null> {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT id, nombre, descripcion FROM `categorias`;"
    );
    if (rows.length === 0) {
      return null;
    }
    return rows as Categoria[];
  }
  // consulta para obtener todas las categorías junto con la cantidad 
  // de productos que están haciendo uso de cada categoría
  async findAll(): Promise<CategoriaSelect[] | null> {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM `vw_categorias`;");
    
    if (rows.length === 0) {
      return null;
    }

    return rows as CategoriaSelect[];
  }

  // consulta para obtener un resumen de las categorías
  async resumenCategorias(): Promise<ResumenCategoria | null> {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT COUNT(*) AS total_categorias, CAST(SUM(cantidad_productos) AS UNSIGNED) AS total_productos, CAST(AVG(cantidad_productos) AS DECIMAL(10, 2)) AS promedio_categoria FROM `vw_categorias`;"
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0] as ResumenCategoria;
  }

  // consulta para obtener una categoría por su ID
  async findById(id: number): Promise<Categoria | null> {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT id, nombre, descripcion FROM `categorias` WHERE id = ?;",
      [id]
    );

    if (rows.length === 0) {
      return null;
    }
    return rows[0] as Categoria;
  }

  // consulta para crear una nueva categoría
  async create(categoria: CategoriaCreate): Promise<number> {
    const [result] = await db.execute<ResultSetHeader>(
      "INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)",
      [categoria.nombre, categoria.descripcion]
    );

    // no se aplicaron manejo de errores porque se asume que la capa superior
    // (servicio/controlador) se encargará de manejar cualquier error que pueda surgir

    // Retorna el ID del producto insertado
    return result.insertId;
  }

  async update(id: number, newCategoria: CategoriaUpdate): Promise<void> {
    await db.execute(
      "UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?",
      [newCategoria.nombre, newCategoria.descripcion, id]
    );
  }

  async categoriaExists(id: number): Promise<boolean> {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT id FROM categorias WHERE id = ? LIMIT 1;",
      [id]
    );
    return rows.length > 0;
  }

  async delete(id: number): Promise<void> {
    if (id !== 1){
      await db.execute(
        "CALL sp_eliminar_categoria (?);",
        [id]
      );
    }
  }

  static async CategoriaExists(idCategoria: number): Promise<boolean> {
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT id FROM categorias WHERE id = ? LIMIT 1;`,
      [idCategoria]
    );
    return rows.length > 0;
  }
}