import type { Request, Response } from "express";
import type { PropResponse } from "../types/response.js";
import type { Connection } from "mysql2/promise";
import { PropTipoTax } from "../types/tipo_tax.js";
  
export async function getTiposTax(req: Request, res: Response, connection: Connection): Promise<void>{
  try {
    const [results] = await connection.execute("SELECT * FROM tipos_tax;");
    const response: PropResponse = {
      status: 200,
      message: "Tipos de tax obtenidos con éxito.",
      info: results as PropTipoTax[],
    };
    res.status(200).json(response);
    console.log("✅ Consulta de tipos de tax ejecutada con éxito.");

  } catch (error) {
    const response: PropResponse = {
      status: 500,
      message: "Error interno del servidor al obtener tipos de tax.",
      info: null,
    };
    res.status(500).json(response);
    console.log("❌ Error al ejecutar la consulta:", error);
  }
}