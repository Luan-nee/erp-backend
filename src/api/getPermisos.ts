import type { Request, Response } from "express";
import type { PropResponse } from "../types/response.js";
import type { PropPermiso } from "../types/permiso.js";
import type { Connection } from "mysql2/promise";

export async function getPermisos(req: Request, res: Response, connection: Connection): Promise<void>{
  try {
    const [results] = await connection.execute("SELECT * FROM permisos;");
    const response: PropResponse = {
      status: 200,
      message: "Permisos obtenidos con éxito.",
      info: results as PropPermiso[],
    };
    res.status(200).json(response);
    console.log("✅ Consulta de permisos ejecutada con éxito.");
  } catch (error) {
    const response: PropResponse = {
      status: 500,
      message: "Error interno del servidor al obtener permisos.",
      info: null,
    };
    res.status(500).json(response);
    console.log("❌ Error al ejecutar la consulta:", error);
  }
}