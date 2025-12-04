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
import { getEstadosDocFacturacion } from "./api/getEstadosDocFacturacion";
import { getEstadosTransferenciasInventarios } from "./api/getEstadosTransferenciasInventarios";
import { getPermisos } from "./api/getPermisos";
import { getMetodosPago } from "./api/getMetodosPago";
import { getProductos } from "./api/getProductos";
import { getRolesPermisos } from "./api/getRolesPermisos";
import { getRoles } from "./api/getRoles";
import { getTipoDocFacturacion } from "./api/getTipoDocFacturacion";
import { getTiposDocumentosCliente } from "./api/getTiposDocumentosCliente";
import { getTiposTax } from "./api/getTiposTax";
import { getResumenCategorias } from "./api/getResumenCategorias";

dotenv.config();

const corsOptions = {
    origin: 'http://localhost:5173' // Reemplaza con el origen de tu frontend
};

const PORT = process.env.BACKEND_PORT || 3000;
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

app.get("/api/categorias", async (req: Request, res: Response) => getCategorias(req, res, connection));

app.get("/api/resumen-categorias", async (req: Request, res: Response) => getResumenCategorias(req, res, connection));

app.get("/api/colores", async (req: Request, res: Response) => getColores(req, res, connection));

app.get("/api/estados-doc-facturacion", async (req: Request, res: Response) => getEstadosDocFacturacion(req, res, connection));

app.get("/api/estados-transferencias-inventarios", async (req: Request, res: Response) => getEstadosTransferenciasInventarios(req, res, connection));

app.get("/api/marcas", async (req: Request, res: Response) => getMarcas(req, res, connection));

app.get("/api/metodos-pago", async (req: Request, res: Response) => getMetodosPago(req, res, connection));

app.get("/api/permisos", async (req: Request, res: Response) => getPermisos(req, res, connection));

app.get("/api/productos", async (req: Request, res: Response) => getProductos(req, res, connection));

app.get("/api/roles-permisos", async (req: Request, res: Response) => getRolesPermisos(req, res, connection)); 

app.get("/api/roles", async (req: Request, res: Response) => getRoles(req, res, connection));

app.get("/api/sucursales", async (req: Request, res: Response) => getSucursales(req, res, connection));

app.get("/api/tipos-doc-facturacion", async (req: Request, res: Response) => getTipoDocFacturacion(req, res, connection));

app.get("/api/tipos-documentos-cliente", async (req: Request, res: Response) => getTiposDocumentosCliente(req, res, connection));

app.get("/api/tipos-tax", async (req: Request, res: Response) => getTiposTax(req, res, connection));

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
