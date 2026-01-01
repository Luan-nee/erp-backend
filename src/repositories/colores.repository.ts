import { db } from "../config/db.config";
import type { Color, simpleColor } from "../models/color.model";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export default class ColoresRepository {
  async select(): Promise<Color[]> {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT id, nombre, valor FROM `colores`;"
    );
    // El casting es necesario porque 'rows' es un array genérico de RowDataPacket
    return rows as Color[];
  }

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

  async simpleSelect(): Promise<simpleColor[]> {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT id, nombre FROM `colores`;"
    );
    return rows as simpleColor[];
  }

  static async colorExists(idColor: number): Promise<boolean> {
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT id FROM colores WHERE id = ? LIMIT 1;`,
      [idColor]
    );
    return rows.length > 0;
  }
}