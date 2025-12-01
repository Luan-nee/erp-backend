import type { Request, Response } from "express";
import type { PropResponse } from "../types/response";
import type { Connection } from "mysql2/promise";
import type { PropMarca } from "../types/marca"; 

export async function getMarcas(req: Request, res: Response, connection: Connection): Promise<void> {
  try {
    const [results] = await connection.execute("SELECT * FROM marcas;");
    const response: PropResponse = {
      status: 200,
      message: "Marcas obtenidas con éxito.",
      info: results as PropMarca[],
    };
    res.status(200).json(response);
    console.log("✅ Consulta de marcas ejecutada con éxito.");

  } catch (error) {
    const response: PropResponse = {
      status: 500,
      message: "Error interno del servidor al obtener marcas.",
      info: null,
    };
    res.status(500).json(response);
    console.log("❌ Error al ejecutar la consulta:", error);
  }
}