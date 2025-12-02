import type { Request, Response } from "express";
import type { PropResponse } from "../types/response.js";
import type { PropEstadosTransferenciasInventarios } from "../types/estadosTransferenciasInventarios.js";
import type { PropCategoria } from "../types/categoria.js";
import type { Connection } from "mysql2/promise";


export async function getEstadosTransferenciasInventarios(req: Request, res: Response, connection: Connection): Promise<void>{
  try {
    const [results] = await connection.execute("SELECT * FROM estados_transferencias_inventarios;");
    const response: PropResponse = {
      status: 200,
      message: "Estados de transferencias de inventarios obtenidos con éxito.",
      info: results as PropEstadosTransferenciasInventarios[],
    };
    res.status(200).json(response);
    console.log("✅ Consulta de estados de transferencias de inventarios ejecutada con éxito.");
  } catch (error) {
    const response: PropResponse = {
      status: 500,
      message: "Error interno del servidor al obtener estados de transferencias de inventarios.",
      info: null,
    };
    res.status(500).json(response);
    console.log("❌ Error al ejecutar la consulta:", error);
  }
}