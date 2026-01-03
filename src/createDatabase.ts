import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import * as mysql from "mysql2/promise";

dotenv.config();

if (!process.env.DB_NAME) {
  console.warn(
    "⚠️  Atención: la variable DB_NAME no está definida en .env. Se usará el valor definido en 'config'."
  );
}

const config = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "erp_app",
  port: parseInt(process.env.DB_PORT || "3306", 10),
};

// 3. Ruta al archivo SQL
// Use process.cwd() as project root to avoid import.meta usage in TypeScript configs that don't allow it
const projectRoot = process.cwd();

let connection: mysql.Connection | null = null;

(async () => {
  try {
    try {
      const { database, ...tempConfig } = config;
      // habilitar multipleStatements para permitir ejecutar varios comandos (incluyendo USE)
      connection = await mysql.createConnection({
        ...tempConfig,
        multipleStatements: true,
      });
      console.log("✅ Conexión establecida con MySQL Server.");
    } catch (error) {
      console.error("Error al conectar a MySQL:", error);
      throw error; // Re-lanzar el error para que sea capturado en el bloque externo
    }

    const sqlFilePath = path.join(projectRoot, "sql", "schema.sql");
    const sqlSchema = fs.readFileSync(sqlFilePath, "utf-8");
    readSqlFile(
      //#1
      sqlSchema,
      connection,
      `✅ Base de datos '${config.database}' y tablas creadas exitosamente.`,
      `❌ Error al crear la base de datos o las tablas.`
    );

    // const createFunctionsPath = path.join(projectRoot, "sql", "functions.sql");
    // const sqlFunctions = fs.readFileSync(createFunctionsPath, "utf-8");
    // readSqlFile(
    //   //#1
    //   sqlFunctions,
    //   connection,
    //   `✅ Funciones en '${config.database}' creadas exitosamente.`,
    //   `❌ Error al crear las funciones.`
    // );

    /* 
      TAREA: ADAPTAR EL SCRIP PARA CREAR AUTOMATICAMENTE LOS PROCEDIMIENTOS ALMACENADOS 
        Actualmente hay un error y la se sospecha que la causa del error se debe a los delimitadores
    */
    // const createProceduresPath = path.join(projectRoot, "sql", "StoreProcedures.sql");
    // const sqlProcedures = fs.readFileSync(createProceduresPath, "utf-8");
    // readSqlFile(
    //   //#1
    //   sqlProcedures,
    //   connection,
    //   `✅ Procedimientos almacenados en '${config.database}' creados exitosamente.`,
    //   `❌ Error al crear los procedimientos almacenados.`
    // );

    const createViewPath = path.join(projectRoot, "sql", "views.sql");
    const sqlView = fs.readFileSync(createViewPath, "utf-8");
    readSqlFile(
      //#1
      sqlView,
      connection,
      `✅ Vistas en '${config.database}' creadas exitosamente.`,
      `❌ Error al crear las vistas.`
    );

    const insertData_categoriasPath = path.join(
      projectRoot,
      "sql",
      "data",
      "categorias.sql"
    );
    const insertData_CategoriasSQL = fs.readFileSync(
      insertData_categoriasPath,
      "utf-8"
    );
    readSqlFile(
      //#2
      insertData_CategoriasSQL,
      connection,
      `✅ Insertando categorías en la tabla '${config.database}'.'categorias' exitosamente.`,
      `❌ Error al insertar los datos de categorías en la base de datos.`
    );

    const insertData_coloresPath = path.join(
      projectRoot,
      "sql",
      "data",
      "colores.sql"
    );
    const insertData_ColorsSQL = fs.readFileSync(
      insertData_coloresPath,
      "utf-8"
    );
    readSqlFile(
      //#4
      insertData_ColorsSQL,
      connection,
      `✅ Insertando colores en la tabla '${config.database}'.'colores' exitosamente.`,
      `❌ Error al insertar los datos de colores en la base de datos.`
    );

    const insertData_estados_doc_facturacion = path.join(
      projectRoot,
      "sql",
      "data",
      "estados_doc_facturacion.sql"
    );
    const insertData_estados_doc_facturacionSQL = fs.readFileSync(
      insertData_estados_doc_facturacion,
      "utf-8"
    );
    readSqlFile(
      //#5
      insertData_estados_doc_facturacionSQL,
      connection,
      `✅ Insertando estados de documentos de facturación en la tabla '${config.database}'.'estados_doc_facturacion' exitosamente.`,
      `❌ Error al insertar los datos de estados de documentos de facturación en la base de datos.`
    );

    const insertData_estados_transferencias_inventariosPath = path.join(
      projectRoot,
      "sql",
      "data",
      "estados_transferencias_inventarios.sql"
    );
    const insertData_estados_transferencias_inventariosSQL = fs.readFileSync(
      insertData_estados_transferencias_inventariosPath,
      "utf-8"
    );
    readSqlFile(
      insertData_estados_transferencias_inventariosSQL,
      connection,
      `✅ Insertando estados de transferencias de inventarios en la tabla '${config.database}'.'estados_transferencias_inventarios' exitosamente.`,
      `❌ Error al insertar los datos de estados de transferencias de inventarios en la base de datos.`
    );

    const insertData_marcasPath = path.join(
      projectRoot,
      "sql",
      "data",
      "marcas.sql"
    );
    const insertData_MarcasSQL = fs.readFileSync(
      insertData_marcasPath,
      "utf-8"
    );
    readSqlFile(
      insertData_MarcasSQL,
      connection,
      `✅ Insertando marcas en la tabla '${config.database}'.'marcas' exitosamente.`,
      `❌ Error al insertar los datos de marcas en la base de datos.`
    );

    const insertData_metodos_pagoPath = path.join(
      projectRoot,
      "sql",
      "data",
      "metodos_pago.sql"
    );
    const insertData_MetodosPagoSQL = fs.readFileSync(
      insertData_metodos_pagoPath,
      "utf-8"
    );
    readSqlFile(
      insertData_MetodosPagoSQL,
      connection,
      `✅ Insertando métodos de pago en la tabla '${config.database}'.'metodos_pago' exitosamente.`,
      `❌ Error al insertar los datos de métodos de pago en la base de datos.`
    );

    const insertData_sucursalesPath = path.join(
      projectRoot,
      "sql",
      "data",
      "sucursales.sql"
    );
    const insertData_SucursalesSQL = fs.readFileSync(
      insertData_sucursalesPath,
      "utf-8"
    );
    readSqlFile(
      insertData_SucursalesSQL,
      connection,
      `✅ Insertando sucursales en la tabla '${config.database}'.'sucursales' exitosamente.`,
      `❌ Error al insertar los datos de sucursales en la base de datos.`
    );

    const insertData_tipos_doc_facturacionPath = path.join(
      projectRoot,
      "sql",
      "data",
      "tipos_doc_facturacion.sql"
    );
    const insertData_tipos_doc_facturacionSQL = fs.readFileSync(
      insertData_tipos_doc_facturacionPath,
      "utf-8"
    );
    readSqlFile(
      insertData_tipos_doc_facturacionSQL,
      connection,
      `✅ Insertando tipos de documentos de facturación en la tabla '${config.database}'.'tipos_doc_facturacion' exitosamente.`,
      `❌ Error al insertar los datos de tipos de documentos de facturación en la base de datos.`
    );

    const insertData_tipos_documento_clientePath = path.join(
      projectRoot,
      "sql",
      "data",
      "tipos_documento_cliente.sql"
    );
    const insertData_tipos_documento_clienteSQL = fs.readFileSync(
      insertData_tipos_documento_clientePath,
      "utf-8"
    );
    readSqlFile(
      insertData_tipos_documento_clienteSQL,
      connection,
      `✅ Insertando tipos de documento de cliente en la tabla '${config.database}'.'tipos_documento_cliente' exitosamente.`,
      `❌ Error al insertar los datos de tipos de documento de cliente en la base de datos.`
    );

    const insertData_tipos_taxPath = path.join(
      projectRoot,
      "sql",
      "data",
      "tipos_tax.sql"
    );
    const insertData_TiposTaxSQL = fs.readFileSync(
      insertData_tipos_taxPath,
      "utf-8"
    );
    readSqlFile(
      insertData_TiposTaxSQL,
      connection,
      `✅ Insertando tipos de impuestos en la tabla '${config.database}'.'tipos_tax' exitosamente.`,
      `❌ Error al insertar los datos de tipos de impuestos en la base de datos.`
    );

    const insertData_ProductosPath = path.join(
      projectRoot,
      "sql",
      "data",
      "productos.sql"
    );
    const insertData_ProductsSQL = fs.readFileSync(
      insertData_ProductosPath,
      "utf-8"
    );
    readSqlFile(
      //#3
      insertData_ProductsSQL,
      connection,
      `✅ Insertando productos en la tabla '${config.database}'.'productos' exitosamente.`,
      `❌ Error al insertar los datos de productos en la base de datos.`
    );

    const insertData_DetallesProductoPath = path.join(
      projectRoot,
      "sql",
      "data",
      "detalles_producto.sql"
    );
    const insertData_DetallesProductoSQL = fs.readFileSync(
      insertData_DetallesProductoPath,
      "utf-8"
    );
    readSqlFile(
      //#3
      insertData_DetallesProductoSQL,
      connection,
      `✅ Insertando detalles de productos en la tabla '${config.database}'.'detalles_producto' exitosamente.`,
      `❌ Error al insertar los datos de detalles de productos en la base de datos.`
    );

    const insertData_usuariosPath = path.join(
      projectRoot,
      "sql",
      "data",
      "usuarios.sql"
    );
    const insertData_UsuariosSQL = fs.readFileSync(
      insertData_usuariosPath,
      "utf-8"
    );
    readSqlFile(
      //#3
      insertData_UsuariosSQL,
      connection,
      `✅ Insertando usuarios en la tabla '${config.database}'.'usuarios' exitosamente.`,
      `❌ Error al insertar los datos de usuarios en la base de datos.`
    );

    const insertData_rolesPath = path.join(
      projectRoot,
      "sql",
      "data",
      "roles.sql"
    );
    const insertData_RolesSQL = fs.readFileSync(insertData_rolesPath, "utf-8");
    readSqlFile(
      insertData_RolesSQL,
      connection,
      `✅ Insertando roles en la tabla '${config.database}'.'roles' exitosamente.`,
      `❌ Error al insertar los datos de roles en la base de datos.`
    );

    const insertData_permisosPath = path.join(
      projectRoot,
      "sql",
      "data",
      "permisos.sql"
    );
    const insertData_PermisosSQL = fs.readFileSync(
      insertData_permisosPath,
      "utf-8"
    );
    readSqlFile(
      insertData_PermisosSQL,
      connection,
      `✅ Insertando permisos en la tabla '${config.database}'.'permisos' exitosamente.`,
      `❌ Error al insertar los datos de permisos en la base de datos.`
    );

    const insertData_roles_permisosPath = path.join(
      projectRoot,
      "sql",
      "data",
      "roles_permisos.sql"
    );
    const insertData_RolesPermisosSQL = fs.readFileSync(
      insertData_roles_permisosPath,
      "utf-8"
    );
    readSqlFile(
      insertData_RolesPermisosSQL,
      connection,
      `✅ Insertando roles y permisos en la tabla '${config.database}'.'roles_permisos' exitosamente.`,
      `❌ Error al insertar los datos de roles y permisos en la base de datos.`
    );

    const insertData_cuentasUsuarioPath = path.join(
      projectRoot,
      "sql",
      "data",
      "cuentas_usuario.sql"
    );
    const insertData_CuentasUsuarioSQL = fs.readFileSync(
      insertData_cuentasUsuarioPath,
      "utf-8"
    );
    readSqlFile(
      //#4
      insertData_CuentasUsuarioSQL,
      connection,
      `✅ Insertando cuentas de usuario en la tabla '${config.database}'.'cuentas_usuario' exitosamente.`,
      `❌ Error al insertar los datos de cuentas de usuario en la base de datos.`
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

  function readSqlFile(
    sql: string,
    connection: mysql.Connection,
    messageOk: string,
    messageError: string
  ) {
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
})();
