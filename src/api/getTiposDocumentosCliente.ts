import type { Request, Response } from "express";
import type { PropResponse } from "../types/response.js";
import type { PropCategoria } from "../types/categoria.js";
import type { PropTipoDocumentoCliente } from "../types/tipo_documento_cliente.js";
import type { Connection } from "mysql2/promise";


export async function getTiposDocumentosCliente(req: Request, res: Response, connection: Connection): Promise<void>{
  try {
    const [results] = await connection.execute("SELECT * FROM tipos_documento_cliente;");
    const response: PropResponse = {
      status: 200,
      message: "Tipos de documento de cliente obtenidos con éxito.",
      info: results as PropTipoDocumentoCliente[],
    };
    res.status(200).json(response);
    console.log("✅ Consulta de tipos de documento de cliente ejecutada con éxito.");
  } catch (error) {
    const response: PropResponse = {
      status: 500,
      message: "Error interno del servidor al obtener tipos de documento de cliente.",
      info: null,
    };
    res.status(500).json(response);
    console.log("❌ Error al ejecutar la consulta:", error);
  }
}