import type { Request, Response } from "express";
import type { PropResponse } from "../types/response";
import type { PropSucursal } from "../types/sucursal";
import type { Connection } from "mysql2/promise";


export async function getSucursales(req: Request, res: Response, connection: Connection): Promise<void>{
  try {
    const [results] = await connection.execute("SELECT * FROM sucursales;");
    const response: PropResponse = {
      status: 200,
      message: "Sucursales obtenidas con éxito.",
      info: results as PropSucursal[],
    };
    res.status(200).json(response);
    console.log("✅ Consulta de sucursales ejecutada con éxito.");
  } catch (error) {
    const response: PropResponse = {
      status: 500,
      message: "Error interno del servidor al obtener sucursales.",
      info: null,
    };
    res.status(500).json(response);
    console.log("❌ Error al ejecutar la consulta:", error);
  }
}