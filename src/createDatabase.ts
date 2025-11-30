// src/createDatabase.ts

import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import * as mysql from "mysql2/promise"; // Importamos la versión con Promises

// 1. Cargar variables de entorno
dotenv.config();

// 2. Leer la configuración desde .env
const config = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "erp_app",
  port: parseInt(process.env.DB_PORT || "3306", 10),
};

// 3. Ruta al archivo SQL
// __dirname no existe en módulos ESM; crear equivalente a partir de import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sqlFilePath = path.join(__dirname, "..", "sql", "schema.sql");

// Comprobación mínima de variables de entorno necesarias
if (!process.env.DB_NAME) {
  console.warn("⚠️  Atención: la variable DB_NAME no está definida en .env. Se usará el valor definido en 'config'.");
}

async function createDatabaseAndTables() {
  let connection: mysql.Connection | null = null;

  try {
    // Leemos el contenido del archivo SQL
    const sqlSchema = fs.readFileSync(sqlFilePath, "utf-8");

    console.log("📝 Archivo SQL leído correctamente.");

    // **PASO 1: Conectarse sin especificar la base de datos**
    // Es crucial no especificar la DB, ya que la vamos a crear.
    try {
      const { database, ...tempConfig } = config;
      // habilitar multipleStatements para permitir ejecutar varios comandos (incluyendo USE)
      connection = await mysql.createConnection({ ...tempConfig, multipleStatements: true });
      console.log('✅ Conexión establecida con MySQL Server.');
    } catch (error) {
      console.error("Error al conectar a MySQL:", error);
      throw error; // Re-lanzar el error para que sea capturado en el bloque externo
    }

    // **PASO 2: Ejecutar los comandos SQL**
    // Separamos los comandos por punto y coma (;) y los filtramos
    const statements = sqlSchema
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0);

    // Ejecutar todo el script como una sola consulta (mysql2 con multipleStatements)
    try {
      await connection.query(sqlSchema);
    } catch (err) {
      // Fallback: si por alguna razón falla, ejecutar cada sentencia con query (no prepared)
      for (const statement of statements) {
        if (statement.length === 0) continue;
        await connection.query(statement);
      }
    }

    console.log(
      `✅ Base de datos '${config.database}' y tablas creadas exitosamente.`
    );
  } catch (error) {
    console.error("\n❌ ERROR al crear la base de datos:", error);

    // Muestra el error de MySQL de forma más legible
    if (error instanceof Error && "sqlMessage" in error) {
      console.error(`\nDetalle del Error SQL: ${error.sqlMessage}`);
    }
  } finally {
    if (connection) {
      await connection.end();
      console.log("⚠️  Conexión a MySQL cerrada.");
    }
  }
}

createDatabaseAndTables();
