import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import * as mysql from "mysql2/promise"; 

dotenv.config();

if (!process.env.DB_NAME) {
  console.warn("⚠️  Atención: la variable DB_NAME no está definida en .env. Se usará el valor definido en 'config'.");
}

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

let connection: mysql.Connection | null = null;

try {
  try {
    const { database, ...tempConfig } = config;
    // habilitar multipleStatements para permitir ejecutar varios comandos (incluyendo USE)
    connection = await mysql.createConnection({ ...tempConfig, multipleStatements: true });
    console.log('✅ Conexión establecida con MySQL Server.');
  } catch (error) {
    console.error("Error al conectar a MySQL:", error);
    throw error; // Re-lanzar el error para que sea capturado en el bloque externo
  }

  const sqlFilePath = path.join(__dirname, "..", "sql", "schema.sql");
  const sqlSchema = fs.readFileSync(sqlFilePath, "utf-8");
    readSqlFile( //#1
    sqlSchema, connection, 
    `✅ Base de datos '${config.database}' y tablas creadas exitosamente.`, 
    `❌ Error al crear la base de datos o las tablas.`
  );

  const insertData_categoriasPath = path.join(__dirname, "..", "sql/data", "categorias.sql");
  const insertData_CategoriasSQL = fs.readFileSync(insertData_categoriasPath, "utf-8");
  readSqlFile( //#2
    insertData_CategoriasSQL, connection,
    `✅ Insertando categorías en la tabla '${config.database}'.'categorias' exitosamente.`, 
    `❌ Error al insertar los datos de categorías en la base de datos.`
  );

  const insertData_coloresPath = path.join(__dirname, "..", "sql/data", "colores.sql");
  const insertData_ColorsSQL = fs.readFileSync(insertData_coloresPath, "utf-8");
  readSqlFile( //#4
    insertData_ColorsSQL, connection,
    `✅ Insertando colores en la tabla '${config.database}'.'colores' exitosamente.`, 
    `❌ Error al insertar los datos de colores en la base de datos.`
  );

  const insertData_estados_doc_facturacion = path.join(__dirname, "..", "sql/data", "estados_doc_facturacion.sql");
  const insertData_estados_doc_facturacionSQL = fs.readFileSync(insertData_estados_doc_facturacion, "utf-8");
  readSqlFile( //#5
    insertData_estados_doc_facturacionSQL, connection,
    `✅ Insertando estados de documentos de facturación en la tabla '${config.database}'.'estados_doc_facturacion' exitosamente.`, 
    `❌ Error al insertar los datos de estados de documentos de facturación en la base de datos.`
  );

  const insertData_estados_transferencias_inventariosPath = path.join(__dirname, "..", "sql/data", "estados_transferencias_inventarios.sql");
const insertData_estados_transferencias_inventariosSQL = fs.readFileSync(insertData_estados_transferencias_inventariosPath, "utf-8");
readSqlFile( 
  insertData_estados_transferencias_inventariosSQL, connection,
  `✅ Insertando estados de transferencias de inventarios en la tabla '${config.database}'.'estados_transferencias_inventarios' exitosamente.`, 
  `❌ Error al insertar los datos de estados de transferencias de inventarios en la base de datos.`
);

const insertData_marcasPath = path.join(__dirname, "..", "sql/data", "marcas.sql");
const insertData_MarcasSQL = fs.readFileSync(insertData_marcasPath, "utf-8");
readSqlFile( 
  insertData_MarcasSQL, connection,
  `✅ Insertando marcas en la tabla '${config.database}'.'marcas' exitosamente.`, 
  `❌ Error al insertar los datos de marcas en la base de datos.`
);

const insertData_metodos_pagoPath = path.join(__dirname, "..", "sql/data", "metodos_pago.sql");
const insertData_MetodosPagoSQL = fs.readFileSync(insertData_metodos_pagoPath, "utf-8");
readSqlFile( 
  insertData_MetodosPagoSQL, connection,
  `✅ Insertando métodos de pago en la tabla '${config.database}'.'metodos_pago' exitosamente.`, 
  `❌ Error al insertar los datos de métodos de pago en la base de datos.`
);

const insertData_permisosPath = path.join(__dirname, "..", "sql/data", "permisos.sql");
const insertData_PermisosSQL = fs.readFileSync(insertData_permisosPath, "utf-8");
readSqlFile( 
  insertData_PermisosSQL, connection,
  `✅ Insertando permisos en la tabla '${config.database}'.'permisos' exitosamente.`, 
  `❌ Error al insertar los datos de permisos en la base de datos.`
);

const insertData_ProductosPath = path.join(__dirname, "..", "sql/data", "productos.sql");
const insertData_ProductsSQL = fs.readFileSync(insertData_ProductosPath, "utf-8");
readSqlFile( //#3
  insertData_ProductsSQL, connection,
  `✅ Insertando productos en la tabla '${config.database}'.'productos' exitosamente.`, 
  `❌ Error al insertar los datos de productos en la base de datos.`
);

const insertData_rolesPath = path.join(__dirname, "..", "sql/data", "roles.sql");
const insertData_RolesSQL = fs.readFileSync(insertData_rolesPath, "utf-8");
readSqlFile( 
  insertData_RolesSQL, connection,
  `✅ Insertando roles en la tabla '${config.database}'.'roles' exitosamente.`, 
  `❌ Error al insertar los datos de roles en la base de datos.`
);

const insertData_sucursalesPath = path.join(__dirname, "..", "sql/data", "sucursales.sql");
const insertData_SucursalesSQL = fs.readFileSync(insertData_sucursalesPath, "utf-8");
readSqlFile( 
  insertData_SucursalesSQL, connection,
  `✅ Insertando sucursales en la tabla '${config.database}'.'sucursales' exitosamente.`, 
  `❌ Error al insertar los datos de sucursales en la base de datos.`
);

const insertData_tipos_doc_facturacionPath = path.join(__dirname, "..", "sql/data", "tipos_doc_facturacion.sql");
const insertData_tipos_doc_facturacionSQL = fs.readFileSync(insertData_tipos_doc_facturacionPath, "utf-8");
readSqlFile( 
  insertData_tipos_doc_facturacionSQL, connection,
  `✅ Insertando tipos de documentos de facturación en la tabla '${config.database}'.'tipos_doc_facturacion' exitosamente.`, 
  `❌ Error al insertar los datos de tipos de documentos de facturación en la base de datos.`
);

const insertData_tipos_documento_clientePath = path.join(__dirname, "..", "sql/data", "tipos_documento_cliente.sql");
const insertData_tipos_documento_clienteSQL = fs.readFileSync(insertData_tipos_documento_clientePath, "utf-8");
readSqlFile( 
  insertData_tipos_documento_clienteSQL, connection,
  `✅ Insertando tipos de documento de cliente en la tabla '${config.database}'.'tipos_documento_cliente' exitosamente.`, 
  `❌ Error al insertar los datos de tipos de documento de cliente en la base de datos.`
);

const insertData_tipos_taxPath = path.join(__dirname, "..", "sql/data", "tipos_tax.sql");
const insertData_TiposTaxSQL = fs.readFileSync(insertData_tipos_taxPath, "utf-8");
readSqlFile( 
  insertData_TiposTaxSQL, connection,
  `✅ Insertando tipos de impuestos en la tabla '${config.database}'.'tipos_tax' exitosamente.`, 
  `❌ Error al insertar los datos de tipos de impuestos en la base de datos.`
);

const insertData_roles_permisosPath = path.join(__dirname, "..", "sql/data", "roles_permisos.sql");
const insertData_RolesPermisosSQL = fs.readFileSync(insertData_roles_permisosPath, "utf-8");
readSqlFile( 
  insertData_RolesPermisosSQL, connection,
  `✅ Insertando roles y permisos en la tabla '${config.database}'.'roles_permisos' exitosamente.`, 
  `❌ Error al insertar los datos de roles y permisos en la base de datos.`
);


} catch (error) {
  // Muestra el error de MySQL de forma más legible
  if (error instanceof Error && "sqlMessage" in error) {
    console.error(`\nDetalle del Error SQL: ${error.sqlMessage}`);
  }
} finally {
  if (connection) {
    connection.end();
    console.log("⚠️  Cerrando la conexión a MySQL.");
  }
}


function readSqlFile(sql: string, connection: mysql.Connection, messageOk: string, messageError: string) {
  try {
      // **PASO 2: Ejecutar los comandos SQL**
      // Separamos los comandos por punto y coma (;) y los filtramos
      const statements = sql
        .split(";")
        .map((stmt) => stmt.trim())
        .filter((stmt) => stmt.length > 0);

      // Ejecutar todo el script como una sola consulta (mysql2 con multipleStatements
      try {
        connection.query(sql);
      } catch (err) {
        // Fallback: si por alguna razón falla, ejecutar cada sentencia con query (no prepared)
        for (const statement of statements) {
          if (statement.length === 0) continue;
          connection.query(statement);
        }
      }
      console.log(messageOk);
    } catch (error) {
      console.log(messageError);
    }
}