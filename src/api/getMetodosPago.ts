import type { Request, Response } from "express";
import type { PropResponse } from "../types/response";
import type { Connection } from "mysql2/promise";
import type { PropMetodopago } from "../types/metodoPago";

export async function getMetodosPago(req: Request, res: Response, connection: Connection): Promise<void> {
  try {
    const [results] = await connection.execute("SELECT * FROM metodos_pago;");
    const response: PropResponse = {
      status: 200,
      message: "Métodos de pago obtenidos con éxito.",
      info: results as PropMetodopago[],
    };
    res.status(200).json(response);
    console.log("✅ Consulta de métodos de pago ejecutada con éxito.");

  } catch (error) {
    const response: PropResponse = {
      status: 500,
      message: "Error interno del servidor al obtener métodos de pago.",
      info: null,
    };
    res.status(500).json(response);
    console.log("❌ Error al ejecutar la consulta:", error);
  }
}