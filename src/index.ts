import express from "express";
import type { Request, Response } from "express";
import type { Connection } from "mysql2/promise"
import { createConnection } from "mysql2/promise";
import dotenv from "dotenv";
import cors from 'cors';
import { getColores } from "./api/getColores";
import { getMarcas } from "./api/getMarcas";
import { getCategorias } from "./api/getCategorias";
import { getSucursales } from "./api/getSucursales";

dotenv.config();

const corsOptions = {
    origin: 'http://localhost:5173' // Reemplaza con el origen de tu frontend
};

const PORT = 3000;
const app = express();

app.use(cors(corsOptions)); // 2. Usa el middleware de CORS con las opciones definidas
app.use(express.json());
let connection: Connection;

(async () => { 
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
}})();

app.get("/", (req: Request, res: Response) => {
  // TypeScript nos ayuda con los tipos de 'req' y 'res'
  res.send("¡Hola, mundo! Esta es mi primera API con TypeScript y Express.");
});

app.get("/api/colores", async (req: Request, res: Response) => getColores(req, res, connection));

app.get("/api/marcas", async (req: Request, res: Response) => getMarcas(req, res, connection));

app.get("/api/categorias", async (req: Request, res: Response) => getCategorias(req, res, connection));

app.get("/api/sucursales", async (req: Request, res: Response) => getSucursales(req, res, connection));

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
