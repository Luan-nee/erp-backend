import express from "express";
import type { Request, Response } from "express";
import type { Connection } from "mysql2/promise";
import { createConnection } from "mysql2/promise";
import dotenv from "dotenv";
import cors from 'cors'; // 1. Importa 'cors'
import type { PropResponse } from "./types/response.js";
import type { PropColor } from "./types/color.js";

dotenv.config();

const corsOptions = {
    origin: 'http://localhost:5173' // Reemplaza con el origen de tu frontend
};

const PORT = 3000;
const app = express();

app.use(cors(corsOptions)); // 2. Usa el middleware de CORS con las opciones definidas
app.use(express.json());
let connection: Connection;

try {
  connection = await createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    // Aseguramos que password y database sean strings (mysql2 TS exige string)
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "erp_app", // Usamos la DB por defecto si no está en .env
    port: parseInt(process.env.DB_PORT || "3306", 10),
  });
} catch (error) {
  console.error("❌ Error al conectar con la base de datos:", error);
  // Re-lanzar el error original para depuración
  throw error as Error;
}

app.get("/", (req: Request, res: Response) => {
  // TypeScript nos ayuda con los tipos de 'req' y 'res'
  res.send("¡Hola, mundo! Esta es mi primera API con TypeScript y Express.");
});

app.get("/api/colores", async (req: Request, res: Response) => {
  try {
    const [results] = await connection.execute("SELECT * FROM colores;");
    const response: PropResponse = {
      status: 200,
      message: "Colores obtenidos con éxito.",
      info: results as PropColor[],
    };
    res.status(200).json(response);
    console.log("✅ Consulta de colores ejecutada con éxito.");

  } catch (error) {
    const response: PropResponse = {
      status: 500,
      message: "Error interno del servidor al obtener colores.",
      info: null,
    };
    res.status(500).json(response);
    console.log("❌ Error al ejecutar la consulta:", error);
  }
});

app.get("/api/marcas", async (req: Request, res: Response) => {
  try {
    const [results] = await connection.execute("SELECT * FROM marcas;");
    const response: PropResponse = {
      status: 200,
      message: "Marcas obtenidas con éxito.",
      info: results as PropColor[],
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
    console.log("❌ Error al obtener las marcas:", error);
  }
});

app.get("/api/categorias", async (req: Request, res: Response) => {
  try {
    const [results] = await connection.execute("SELECT * FROM categorias;");
    const response: PropResponse = {
      status: 200,
      message: "Categorías obtenidas con éxito.",
      info: results as PropColor[],
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
    console.log("❌ Error al obtener las categorías:", error);
  }
})

app.get("/api/sucursales", async (req: Request, res: Response) => {
  try {
    const [results] = await connection.execute("SELECT * FROM sucursales;");
    const response: PropResponse = {
      status: 200,
      message: "Sucursales obtenidas con éxito.",
      info: results as PropColor[], // Cambia PropColor por el tipo adecuado para sucursales
    };
    res.status(200).json(response);
    console.log("✅ Consulta de sucursales ejecutada con éxito.");
  } catch (error) {
    const response: PropResponse = {
      status: 500,
      message: "Error interno del servidor al obtener sucursales.",
      info: null,
    };
    res.status(500).json(response);
    console.log("❌ Error al obtener las sucursales:", error);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
