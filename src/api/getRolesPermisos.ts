import type { Request, Response } from "express";
import type { PropResponse } from "../types/response";
import type { Connection } from "mysql2/promise";
import type { PropRolesPermiso } from "../types/rolesPermiso";

export async function getRolesPermisos(req: Request, res: Response, connection: Connection): Promise<void> {
  try {
    const [results] = await connection.execute("SELECT * FROM roles_permisos;");
    const response: PropResponse = {
      status: 200,
      message: "Roles permisos obtenidos con éxito.",
      info: results as PropRolesPermiso[],
    };
    res.status(200).json(response);
    console.log("✅ Consulta de roles permisos ejecutada con éxito.");
  } catch (error) {
    const response: PropResponse = {
      status: 500,
      message: "Error interno del servidor al obtener roles permisos.",
      info: null,
    };
    res.status(500).json(response);
    console.log("❌ Error al ejecutar la consulta:", error);
  }
}