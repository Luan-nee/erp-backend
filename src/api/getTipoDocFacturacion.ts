import type { Request, Response } from "express";
import type { PropResponse } from "../types/response";
import type { Connection } from "mysql2/promise";
import type { PropTipoDocFacturacion } from "../types/tipoDocFacturacion";

export async function getTipoDocFacturacion(req: Request, res: Response, connection: Connection): Promise<void> {
  try {
    const [results] = await connection.execute("SELECT * FROM tipos_doc_facturacion;");
    const response: PropResponse = {
      status: 200,
      message: "Tipos de documento de facturación obtenidos con éxito.",
      info: results as PropTipoDocFacturacion[],
    };
    res.status(200).json(response);
    console.log("✅ Consulta de tipos de documento de facturación ejecutada con éxito.");
  } catch (error) {
    const response: PropResponse = {
      status: 500,
      message: "Error interno del servidor al obtener tipos de documento de facturación.",
      info: null,
    };
    res.status(500).json(response);
    console.log("❌ Error al ejecutar la consulta:", error);
  }
}