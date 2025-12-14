import express from "express";
import type { Request, Response } from "express";
import type { Connection } from "mysql2/promise";
import { createConnection } from "mysql2/promise";
import dotenv from "dotenv";
import cors from "cors";
import get from "./api/get"; // Importa la función GET desde el archivo test/get.ts
import type { PropResponse, Result } from "./api/get"; // Importa el tipo PropResponse desde el archivo test/get.ts

type getActionType = {
  endpoint: string;
  sql: string;
  name: string;
};

dotenv.config();

const corsOptions = {
  origin: "http://localhost:5173", // Reemplaza con el origen de tu frontend
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
  }
})();

app.get("/", (req: Request, res: Response) => {
  // TypeScript nos ayuda con los tipos de 'req' y 'res'
  res.send("¡Hola, mundo! Esta es mi primera API con TypeScript y Express.");
});

const getAction: getActionType[] = [
  {
    endpoint: "/api/categorias",
    sql: "SELECT * FROM `vw_categorias`;",
    name: "categorias",
  },
  {
    endpoint: "/api/colores",
    sql: "SELECT * FROM colores;",
    name: "colores",
  },
  {
    endpoint: "/api/estados-doc-facturacion",
    sql: "SELECT * FROM estados_doc_facturacion;",
    name: "estados de doc facturacion",
  },
  {
    endpoint: "/api/estados-transferencias-inventarios",
    sql: "SELECT * FROM estados_transferencias_inventarios;",
    name: "estados de transferencias inventarios",
  },
  {
    endpoint: "/api/marca",
    sql: "SELECT * FROM `vw_marcas`;",
    name: "marcas",
  },
  {
    endpoint: "/api/metodos-pago",
    sql: "SELECT * FROM metodos_pago;",
    name: "metodos de pago",
  },
  {
    endpoint: "/api/permisos",
    sql: "SELECT * FROM permisos;",
    name: "permisos",
  },
  // {
  //   endpoint: "/api/productos",
  //   sql: "SELECT * FROM productos;",
  //   name: "productos",
  // },
  {
    endpoint: "/api/resumen-marcas",
    sql: "SELECT COUNT(*) AS total_marcas, CAST(SUM(cantidad_productos) AS UNSIGNED) AS total_productos, CAST(AVG(cantidad_productos) AS DECIMAL(10, 2)) AS promedio_marca FROM `vw_marcas`;",
    name: "resumen de marcas",
  },
  {
    endpoint: "/api/resumen-categorias",
    sql: "SELECT COUNT(*) AS total_categorias, CAST(SUM(cantidad_productos) AS UNSIGNED) AS total_productos, CAST(AVG(cantidad_productos) AS DECIMAL(10, 2)) AS promedio_categoria FROM `vw_categorias`;",
    name: "resumen de categorias",
  },
  {
    endpoint: "/api/roles",
    sql: "SELECT * FROM roles;",
    name: "roles",
  },
  {
    endpoint: "/api/roles-permisos",
    sql: "SELECT * FROM roles_permisos;",
    name: "roles permisos",
  },
  {
    endpoint: "/api/sucursales",
    sql: "SELECT id as `id`, nombre as `nombre`, direccion as `direccion`, tipo_sucursal as `tipo_sucursal` FROM erp_app.sucursales;",
    name: "sucursales",
  },
  {
    endpoint: "/api/tipos-doc-facturacion",
    sql: "SELECT * FROM tipos_doc_facturacion;",
    name: "tipos doc facturacion",
  },
  {
    endpoint: "/api/tipos-documentos-cliente",
    sql: "SELECT * FROM tipos_documentos_cliente;",
    name: "tipos documentos cliente",
  },
  {
    endpoint: "/api/tipos-tax",
    sql: "SELECT * FROM tipos_tax;",
    name: "tipos tax",
  },
];

getAction.map(({sql, endpoint, name})=>{
  app.get(endpoint, async (req: Request, res: Response) =>
    get(req, res, connection, sql, name)
  );
});

app.get("/api/productos", async (req: Request, res: Response) => {
  const idSucursal = req.query.id_sucursal as string;
  console.log("ID Sucursal recibida:", idSucursal);
  try {
    let resultsData;
      if (!idSucursal) {
        let results = await connection.execute(`SELECT * FROM erp_app.detalles_producto;`);
        resultsData = results[0];
      } else {
        let results = await connection.execute(`
        SELECT
              p.id,
              p.sku,
              p.nombre,
              p.descripcion,
              dp.stock,
              dp.stock_minimo,
              dp.porcentaje_ganancia,
              NOT dp.esta_inhabilitado AS esta_habilitado
          FROM
              productos AS p
          JOIN
              detalles_producto AS dp ON p.id = dp.producto_id
          WHERE
              dp.sucursal_id = ${idSucursal};
        `);
        resultsData = results[0];
      }
      const response: PropResponse = {
        status: 200,
        message: ` productos obtenidos con éxito.`,
        info: resultsData as Result,
      };
      res.status(200).json(response);
      console.log(`✅ (GET: productos) - ejecutada con éxito.`);
    } catch (error) {
      const response: PropResponse = {
        status: 500,
        message: `Error interno del servidor al obtener productos.`,
        info: null,
      };
      res.status(500).json(response);
      console.log(`❌ (Error: productos) - error en la consulta`, error);
    }
  }
);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
