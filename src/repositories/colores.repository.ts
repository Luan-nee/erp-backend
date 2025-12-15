import { db } from "../config/db.config";
import type { Color } from "../models/color.model";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class ColoresRepository {
  async findAll(): Promise<Color[]> {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM `colores`;");
    // El casting es necesario porque 'rows' es un array genérico de RowDataPacket
    return rows as Color[];
  }

  async findById(id: number): Promise<Color | null> {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM `colores` WHERE id = ?;",
      [id]
    );

    if (rows.length === 0) {
      return null;
    }
    return rows[0] as Color;
  }

  async create(color: Color): Promise<number> {
    const [result] = await db.execute<ResultSetHeader>(
      "INSERT INTO colores (nombre, valor) VALUES (?, ?)",
      [color.nombre, color.valor]
    );
    // Retorna el ID del producto insertado
    return result.insertId;
  }
}