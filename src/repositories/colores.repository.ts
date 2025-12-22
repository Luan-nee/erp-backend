import { db } from "../config/db.config";
import type { Color } from "../models/color.model";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export default class ColoresRepository {
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

  static async colorExists(idColor: number): Promise<boolean> {
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT id FROM colores WHERE id = ? LIMIT 1;`,
      [idColor]
    );
    return rows.length > 0;
  }
}