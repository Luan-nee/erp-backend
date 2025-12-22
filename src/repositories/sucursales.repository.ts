import { db } from "../config/db.config";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Sucursal, SucursalSelect } from "../models/sucursal.model";

export default class SucursalesRepository {

  // verifica si la sucursal con el ID dado existe
  static async SucursalExists(idSucursal: number): Promise<boolean> {
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT id FROM sucursales WHERE id = ? LIMIT 1;`,
      [idSucursal]
    );
    return rows.length > 0;
  }

  // Obtener datos escenciales de cada sucursal
  async findAll(): Promise<SucursalSelect[] | null> {
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT id, nombre, direccion, tipo_sucursal FROM sucursales;`
    );
    if (rows.length === 0) {
      return null;
    }
    return rows as SucursalSelect[];
  }

  // Obtiene todos los datos de la sucursal por su ID
  async findById(idSucursal: number): Promise<Sucursal | null> {
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT * FROM sucursales WHERE id = ? LIMIT 1;`,
      [idSucursal]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0] as any;
  }

  /* 
    Por el momento la creación y edición de los datos de las sucursales
    se harán dentro de la base de datos. 
  */
}