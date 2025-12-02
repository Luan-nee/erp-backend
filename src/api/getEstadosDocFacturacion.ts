import type { Request, Response } from "express";
import type { PropResponse } from "../types/response.js";
import type { PropEstadosDocFacturacion } from "../types/estadosDocFacturacion.js";
import type { Connection } from "mysql2/promise";


export async function getEstadosDocFacturacion(req: Request, res: Response, connection: Connection): Promise<void>{
  try {
    const [results] = await connection.execute("SELECT * FROM estados_doc_facturacion;");
    const response: PropResponse = {
      status: 200,
      message: "Estados de documento de facturación obtenidos con éxito.",
      info: results as PropEstadosDocFacturacion[],
    };
    res.status(200).json(response);
    console.log("✅ Consulta de estados de documento de facturación ejecutada con éxito.");

  } catch (error) {
    const response: PropResponse = {
      status: 500,
      message: "Error interno del servidor al obtener estados de documento de facturación.",
      info: null,
    };
    res.status(500).json(response);
    console.log("❌ Error al ejecutar la consulta:", error);
  }
}