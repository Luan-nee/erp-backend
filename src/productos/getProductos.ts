import type { Request, Response } from "express";
import type { PropResponse } from "../types/response";
import type { Connection } from "mysql2/promise";
import type { PropProducto } from "../types/producto";

export async function getProductos(req: Request, res: Response, connection: Connection): Promise<void> {
  try {
    const [results] = await connection.execute("SELECT * FROM productos;");
    const response: PropResponse = {
      status: 200,
      message: "Productos obtenidos con éxito.",
      info: results as PropProducto[],
    };
    res.status(200).json(response);
    console.log("✅ Consulta de productos ejecutada con éxito.");
  } catch (error) {
    const response: PropResponse = {
      status: 500,
      message: "Error interno del servidor al obtener productos.",
      info: null,
    };
    res.status(500).json(response);
    console.log("❌ Error al ejecutar la consulta:", error);
  }
}