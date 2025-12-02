import type { Request, Response } from "express";
import type { PropResponse } from "../types/response";
import type { Connection } from "mysql2/promise";
import type { PropRol } from "../types/rol.js";

export async function getRoles(req: Request, res: Response, connection: Connection): Promise<void> {
  try {
    const [results] = await connection.execute("SELECT * FROM roles;");
    const response: PropResponse = {
      status: 200,
      message: "Roles obtenidos con éxito.",
      info: results as PropRol[],
    };
    res.status(200).json(response);
    console.log("✅ Consulta de roles ejecutada con éxito.");
  } catch (error) {
    const response: PropResponse = {
      status: 500,
      message: "Error interno del servidor al obtener roles.",
      info: null,
    };
    res.status(500).json(response);
    console.log("❌ Error al ejecutar la consulta:", error);
  }
}