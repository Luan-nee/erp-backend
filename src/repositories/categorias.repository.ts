import { db } from "../config/db.config";
import type { Categoria, CategoriaSelect } from "../models/categoria.model";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class CategoriasRepository {
  async findAll(): Promise<CategoriaSelect[]> {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM `vw_categorias`;");
    // El casting es necesario porque 'rows' es un array genérico de RowDataPacket
    return rows as CategoriaSelect[];
  }

  async findById(id: number): Promise<Categoria | null> {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM `categorias` WHERE id = ?;",
      [id]
    );

    if (rows.length === 0) {
      return null;
    }
    return rows[0] as Categoria;
  }

  async create(categoria: Categoria): Promise<number> {
    const [result] = await db.execute<ResultSetHeader>(
      "INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)",
      [categoria.nombre, categoria.descripcion]
    );
    // Retorna el ID del producto insertado
    return result.insertId;
  }
}