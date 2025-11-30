require("dotenv").config();
const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

// Configuración de conexión al servidor MySQL (sin DB seleccionada)
const connectionConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  // Si usas Docker o un puerto no estándar, inclúyelo
  // port: 3306
};

const DB_NAME = process.env.DB_NAME || "mi_base_datos";

// Rutas a los archivos SQL (ubicados en `src/sql/`)
const SQL_SCHEMA_FILE = path.resolve(__dirname, "sql", "schema.sql");
const SQL_DATA_FILE = path.resolve(__dirname, "sql", "insert-data.sql");

function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (e) {
    return false;
  }
}

if (!fileExists(SQL_SCHEMA_FILE)) {
  console.error(`❌ No se encontró el archivo de esquema: ${SQL_SCHEMA_FILE}`);
  process.exit(1);
}

if (!fileExists(SQL_DATA_FILE)) {
  console.warn(`⚠️ No se encontró el archivo de datos: ${SQL_DATA_FILE} (se continuará sin insertar datos)`);
}

const connection = mysql.createConnection(connectionConfig);

connection.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar al servidor MySQL:", err.message);
    process.exit(1);
  }

  console.log("✅ Conexión exitosa al servidor MySQL.");

  connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``,
    (err) => {
      if (err) {
        console.error(`Error al crear la base de datos ${DB_NAME}:`, err.message);
        connection.end();
        process.exit(1);
      }

      console.log(` ✅ Base de datos "${DB_NAME}" creada o ya existe.`);

      // Leer los scripts SQL
      let sqlScriptSchema;
      let sqlScriptData = "";
      try {
        sqlScriptSchema = fs.readFileSync(SQL_SCHEMA_FILE, "utf8");
      } catch (readErr) {
        console.error("❌ Error al leer el archivo de esquema:", readErr.message);
        connection.end();
        process.exit(1);
      }
      if (fileExists(SQL_DATA_FILE)) {
        try {
          sqlScriptData = fs.readFileSync(SQL_DATA_FILE, "utf8");
        } catch (readErr) {
          console.error(" ⚠️ Error al leer el archivo de datos:", readErr.message);
          // No salimos, puede que sólo no haya datos para insertar
        }
      }

      const dbConnection = mysql.createConnection({
        ...connectionConfig,
        database: DB_NAME,
        multipleStatements: true,
      });

      dbConnection.connect((dbErr) => {
        if (dbErr) {
          console.error("❌ Error al conectar a la base de datos recién creada:", dbErr.message);
          connection.end();
          process.exit(1);
        }

        // Ejecutar esquema
        dbConnection.query(sqlScriptSchema, (err) => {
          if (err) {
            console.error(" ❌ Error al crear las tablas:", err.message);
            dbConnection.end();
            connection.end();
            process.exit(1);
          }
          console.log("-------- TABLAS CREADAS EXITOSAMENTE -------- .");

          // Ejecutar datos (si existen)
          if (sqlScriptData && sqlScriptData.trim().length > 0) {
            dbConnection.query(sqlScriptData, (err) => {
              if (err) {
                console.error(" ❌ Error al insertar datos:", err.message);
                dbConnection.end();
                connection.end();
                process.exit(1);
              }
              console.log("-------- DATOS INSERTADOS EXITOSAMENTE -------- .");
              dbConnection.end();
              connection.end();
              process.exit(0);
            });
          } else {
            dbConnection.end();
            connection.end();
            process.exit(0);
          }
        });
      });
    }
  );
});
