import { db } from "../config/db.config";
import type { Marca, MarcaCreate, MarcaSelect, MarcaUpdate, ResumenMarca } from "../models/marca.model";
import type { Categoria, CategoriaSelect, ResumenCategoria, CategoriaUpdate, CategoriaCreate } from "../models/categoria.model";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class MarcasRepository {
  // consulta para obtener todas las marcas junto con la cantidad 
  // de productos que están haciendo uso de cada marca
  async findAll(): Promise<MarcaSelect[] | null> {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM `vw_marcas`;");
    if (rows.length === 0) {
      return null;
    }
    return rows as MarcaSelect[];
  }

  // consulta para obtener un resumen de las marcas
  async resumenMarcas(): Promise<ResumenMarca | null> {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT COUNT(*) AS total_marcas, CAST(SUM(cantidad_productos) AS UNSIGNED) AS total_productos, CAST(AVG(cantidad_productos) AS DECIMAL(10, 2)) AS promedio_marca FROM `vw_marcas`;"
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0] as ResumenMarca;
  }

  // consulta para obtener una marca por su ID
  async findById(id: number): Promise<Marca | null> {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT id, nombre, descripcion FROM `marcas` WHERE id = ?;",
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0] as Marca;
  }

  // consulta para crear una nueva marca
  async create(marca: MarcaCreate): Promise<number> {
    const [result] = await db.execute<ResultSetHeader>(
      "INSERT INTO marcas (nombre, descripcion) VALUES (?, ?)",
      [marca.nombre, marca.descripcion]
    );

    // no se aplicaron manejo de errores porque se asume que la capa superior
    // (servicio/controlador) se encargará de manejar cualquier error que pueda surgir

    // Retorna el ID del producto insertado
    return result.insertId;
  }

  async update(id: number, newMarca: MarcaUpdate): Promise<void> {
    await db.execute(
      "UPDATE marcas SET nombre = ?, descripcion = ? WHERE id = ?",
      [newMarca.nombre, newMarca.descripcion, id]
    );
  }

  async marcaExists(id: number): Promise<boolean> {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT id FROM marcas WHERE id = ? LIMIT 1;",
      [id]
    );
    return rows.length > 0;
  }

  async delete(id: number): Promise<void> {
    if (id !== 1){
      await db.execute(
        "CALL sp_eliminar_marca (?);",
        [id]
      );
    }
  }
}