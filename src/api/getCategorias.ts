import type { Request, Response } from "express";
import type { PropResponse } from "../types/response.js";
import type { PropCategoria, PropResumen } from "../types/categoria.js";
import type { Connection } from "mysql2/promise";


export async function getCategorias(req: Request, res: Response, connection: Connection): Promise<void>{
  try {
    const [results] = await connection.execute("SELECT * FROM `vw_categorias`;");
    const [resumenResults] = await connection.execute("SELECT COUNT(*) AS total_categorias, CAST(SUM(cantidad_productos) AS UNSIGNED) AS total_productos, CAST(AVG(cantidad_productos) AS DECIMAL(10, 2)) AS promedio_categoria FROM `vw_categorias`;");
    const response: PropResponse = {
      status: 200,
      message: "Categorías obtenidas con éxito.",
      info: results as PropCategoria[],
      resumen: resumenResults as PropResumen[],
    };
    res.status(200).json(response);
    console.log("✅ Consulta de categorías ejecutada con éxito.");

  } catch (error) {
    const response: PropResponse = {
      status: 500,
      message: "Error interno del servidor al obtener categorías.",
      info: null,
    };
    res.status(500).json(response);
    console.log("❌ Error al ejecutar la consulta:", error);
  }
}