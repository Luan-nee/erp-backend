import type { Request, Response } from "express";
import type { PropResponse } from "../types/response.js";
import type { PropColor } from "../types/color.js";
import type { Connection } from "mysql2/promise";



export async function getColores(req: Request, res: Response, connection: Connection): Promise<void>{
  try {
    const [results] = await connection.execute("SELECT * FROM colores;");
    const response: PropResponse = {
      status: 200,
      message: "Colores obtenidos con éxito.",
      info: results as PropColor[],
    };
    res.status(200).json(response);
    console.log("✅ Consulta de colores ejecutada con éxito.");

  } catch (error) {
    const response: PropResponse = {
      status: 500,
      message: "Error interno del servidor al obtener colores.",
      info: null,
    };
    res.status(500).json(response);
    console.log("❌ Error al ejecutar la consulta:", error);
  }
}