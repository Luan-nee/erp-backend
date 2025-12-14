// src/config/db.config.ts
import mysql from 'mysql2/promise';
import 'dotenv/config'; // Asegura que las variables de entorno se carguen

let connection: mysql.Connection;

const config = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "erp_app",
  port: parseInt(process.env.DB_PORT || "3306", 10),
};

(async () => {
  try {
    const { database, ...tempConfig } = config;
    // habilitar multipleStatements para permitir ejecutar varios comandos (incluyendo USE)
    connection = await mysql.createConnection({
      database: database,
      ...tempConfig,
      multipleStatements: true,
    });
    console.log("✅ Conexión establecida con MySQL Server.");
  } catch (error) {
    console.error("Error al conectar a MySQL:", error);
    throw error; // Re-lanzar el error para que sea capturado en el bloque externo
  }
})();

export { connection as db };