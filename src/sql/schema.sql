DROP DATABASE IF EXISTS `erp_app`;

CREATE SCHEMA `erp_app`;

USE `erp_app`;

CREATE TABLE `categorias` (
  `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Identificador único de la categoría. Es la clave primaria.',
  `nombre` VARCHAR(255) NOT NULL COMMENT 'Nombre descriptivo y corto de la categoría (ej. Electrónica).',
  `descripcion` TEXT COMMENT 'Descripción detallada sobre el tipo de productos que abarca esta categoría.'
) 
COMMENT = "
  **Propósito:** Almacena las categorías principales bajo las cuales se clasificarán los productos en el sistema.

  ### Valores Insertados

  A continuación, se listan las categorías iniciales que se han insertado en la tabla:

  | id | nombre | descripcion |
  | :---: | :--- | :--- |
  | 1 | Electrónica | Dispositivos y accesorios tecnológicos como laptops, móviles y audífonos. |
  | 2 | Ropa y Moda | Artículos de vestimenta, calzado y accesorios personales. |
  | 3 | Hogar y Jardín | Muebles, decoración, herramientas y artículos para el cuidado del hogar y exteriores. |
  | 4 | Libros y Medios | Ficción, no ficción, revistas y contenido multimedia digital o físico. |
";

CREATE TABLE `clientes` (
  `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Identificador único del cliente. Clave primaria.',
  `tipo_documento_id` INT NOT NULL COMMENT 'ID que referencia a la tabla de tipos de documento (ej. DNI, RUC).',
  `numero_documento` VARCHAR(20) NOT NULL COMMENT 'Número del documento de identificación del cliente (ej. 12345678, 20123456789).',
  `denominacion` VARCHAR(255) NOT NULL COMMENT 'Nombre o Razón Social del cliente. Es el resultado que se obtienen después de realizar la busqueda haciendo uso del tipo y número de documento.',
  `direccion` VARCHAR(255) NULL COMMENT 'Dirección física completa del cliente.',
  `correo` VARCHAR(100) NOT NULL COMMENT 'Correo electrónico de contacto del cliente.',
  `telefono` VARCHAR(20) NOT NULL COMMENT 'Número de teléfono de contacto del cliente.',
  `fecha_creacion` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP) COMMENT 'Fecha y hora en que se creó el registro del cliente.'
) 
COMMENT = "
  **Propósito:** Almacena la información de todos los clientes de la empresa, sean personas naturales o jurídicas.

  ### Restricciones Adicionales (Foreign Keys)

  * `FOREIGN KEY (tipo_documento_id)` se refiere a la columna **id** de la tabla de tipos de documento (`t_tipo_documento_identificacion` u otra tabla de catálogo).
";

CREATE TABLE `colores` (
  `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Identificador único del color. Clave primaria.',
  `nombre` VARCHAR(100) NOT NULL COMMENT 'Nombre legible del color (ej. Rojo, Azul Zafiro).',
  `hex` VARCHAR(7) COMMENT 'Código hexadecimal del color (ej. #FF0000 para rojo).'
) 
COMMENT = "
  **Propósito:** Almacena una lista de colores disponibles para ser usados en productos o interfaces.

  ### Valores Insertados

  A continuación, se listan los colores iniciales que se han insertado en la tabla:

  | id | nombre | hex |
  | :---: | :--- | :---: |
  | 1 | Rojo | #FF0000 |
  | 2 | Azul | #0000FF |
  | 3 | Verde | #008000 |
  | 4 | Amarillo | #FFFF00 |
";

CREATE TABLE `cuentas_usuario` (
  `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Identificador único de la cuenta de usuario. Clave primaria.',
  `usuario` VARCHAR(100) NOT NULL COMMENT 'Nombre de usuario único para el acceso al sistema.',
  `clave` VARCHAR(255) NOT NULL COMMENT 'Contraseña hasheada (cifrada) del usuario.',
  `eliminable` BOOLEAN NOT NULL DEFAULT true COMMENT 'Indica si la cuenta puede ser eliminada (TRUE) o es esencial (FALSE).',
  `rol_id` INT NOT NULL COMMENT 'ID que referencia a los roles o permisos del usuario.',
  `empleado_id` INT NOT NULL COMMENT 'ID que referencia al empleado asociado a esta cuenta de acceso.',
  `fecha_creacion` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP) COMMENT 'Fecha y hora en que se creó la cuenta.',
  `fecha_actualizacion` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP) COMMENT 'Fecha y hora de la última modificación del registro.'
) 
COMMENT = "

  **Propósito:** Almacena las credenciales de acceso y la información de la cuenta de los empleados que acceden al sistema.

  ### Restricciones Adicionales (Foreign Keys)

  * `FOREIGN KEY (rol_id)` se refiere a la columna **id** de la tabla de roles (asumida: `t_roles`).
  * `FOREIGN KEY (empleado_id)` se refiere a la columna **id** de la tabla de empleados (asumida: `empleados`).

  ---

  ### Valores Insertados

  *No se proporcionaron sentencias INSERT para esta tabla.*
";

CREATE TABLE `detalles_producto` (
  `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Identificador único del registro de detalle de producto. Clave primaria.',
  `porcentaje_ganancia` VARCHAR(10) COMMENT 'Margen de ganancia deseado aplicado al costo del producto (ej. "30%", "0.35").',
  `stock` INT NOT NULL DEFAULT 0 COMMENT 'Cantidad actual de unidades de este producto disponibles en la sucursal.',
  `stock_minimo` INT NOT NULL DEFAULT 0 COMMENT 'Nivel mínimo de inventario para este producto en la sucursal antes de generar una alerta de reposición.',
  `esta_inhabilitado` BOOLEAN NOT NULL DEFAULT false COMMENT 'Indica si este producto está inhabilitado/descontinuado en esta sucursal (TRUE) o no (FALSE).',
  `producto_id` INT NOT NULL COMMENT 'ID que referencia al producto genérico (nombre, descripción, etc.).',
  `sucursal_id` INT NOT NULL COMMENT 'ID que referencia a la sucursal específica donde se encuentra este stock.',
  `fecha_creacion` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP) COMMENT 'Fecha y hora en que se creó el registro de detalle.',
  `fecha_actualizacion` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP) COMMENT 'Fecha y hora de la última modificación del registro.'
) 
COMMENT = "
  **Propósito:** Almacena información variable (stock, ganancia) de un producto específico para cada sucursal.

  ### Restricciones Adicionales (Foreign Keys)

  * `FOREIGN KEY (producto_id)` se refiere a la columna **id** de la tabla de productos (asumida: `t_productos` o similar).
  * `FOREIGN KEY (sucursal_id)` se refiere a la columna **id** de la tabla de sucursales (asumida: `t_sucursales` o similar).
";

CREATE TABLE `detalles_venta` (
  `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Identificador único de la línea de detalle de la venta. Clave primaria.',
  `tipo_unidad` VARCHAR(5) NOT NULL DEFAULT 'NIU' COMMENT 'Código de la unidad de factpro.la.',
  `codigo` VARCHAR(50) COMMENT 'Código de producto del ítem vendido, cuyo valor es el SKU por ejemplo: P000001.',
  `descripcion` VARCHAR(255) NOT NULL COMMENT 'Descripción del producto o servicio vendido.',
  `cantidad` INT NOT NULL DEFAULT 1 COMMENT 'Cantidad de unidades vendidas de este ítem.',
  `precio` DECIMAL(12,2) NOT NULL COMMENT 'Precio unitario del producto o servicio en el momento de la venta (sin incluir impuestos/descuentos).',
  `tipo_tax_id` INT NOT NULL COMMENT 'ID que referencia el tipo de impuesto aplicado a este ítem (ej. IGV, ISC).',
  `descuento` DECIMAL(12,2) NOT NULL COMMENT 'Monto del descuento aplicado solo a esta línea de detalle.',
  `producto` JSON NOT NULL COMMENT 'Copia de seguridad o snapshot de la información clave del producto al momento de la venta (nombre, atributos, etc.).',
  `venta_id` INT NOT NULL COMMENT 'ID que referencia a la venta o factura a la que pertenece este detalle.'
) 
COMMENT = "
  **Propósito:** Almacena cada uno de los ítems (productos o servicios) incluidos en una transacción de venta específica.

  ### Restricciones Adicionales (Foreign Keys)

  * `FOREIGN KEY (tipo_tax_id)` se refiere a la columna **id** de la tabla de tipos de impuestos (asumida: `t_tipos_impuestos` o similar).
  * `FOREIGN KEY (venta_id)` se refiere a la columna **id** de la tabla de ventas (asumida: `ventas` o `facturas`).
";

CREATE TABLE `docs_ventas` (
  `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Identificador único del registro de documento electrónico. Clave primaria.',
  `exito` BOOLEAN NOT NULL COMMENT 'Indica si la operación de generación/envío del documento fue exitosa (TRUE/FALSE).',
  `mensaje` TEXT COMMENT 'Mensaje de error, si la operación falló, o mensaje informativo de éxito.',
  `numero_documento` VARCHAR(20) UNIQUE NOT NULL COMMENT 'Número único del documento de venta (Ej: F001-123 o B001-45).',
  `archivo_nombre` VARCHAR(50) NOT NULL COMMENT 'Nombre del archivo generado (Ej: 20541234567-01-F001-123.xml).',
  `monto_letras` VARCHAR(100) NOT NULL COMMENT 'Monto total de la venta expresado en letras.',
  `hash_firma` VARCHAR(50) NOT NULL COMMENT 'Código Hash de la firma digital del documento electrónico.',
  `qr_data` TEXT COMMENT 'Cadena de datos codificada (Base64) para generar la imagen del código QR.',
  `estado_id` INT COMMENT 'ID numérico del estado del documento según la autoridad fiscal.',
  `descripcion_estado` VARCHAR(50) NOT NULL COMMENT 'Descripción legible del estado del documento (Ej: ACEPTADO, RECHAZADO, REGISTRADO).',
  `url_pdf` VARCHAR(255) COMMENT 'URL donde se almacena la representación impresa del documento (PDF).',
  `url_xml` VARCHAR(255) COMMENT 'URL donde se almacena el archivo XML del documento electrónico.',
  `url_cdr` VARCHAR(255) COMMENT 'URL donde se almacena el CDR (Constancia de Recepción) si aplica.',
  `venta_id` INT NOT NULL COMMENT 'ID que referencia a la transacción maestra de venta a la que corresponde este documento.'
) 
COMMENT = "
**Propósito:** Almacena los metadatos y el estado de la generación de documentos electrónicos de venta (e.g., Facturas, Boletas).

### Restricciones Adicionales (Foreign Keys)

* `FOREIGN KEY (venta_id)` se refiere a la columna **id** de la tabla de ventas (asumida: `ventas` o `t_ventas`).
";

CREATE TABLE `usuarios` (
  `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Identificador único del usuario/empleado. Clave primaria.',
  `nombres` VARCHAR(100) NOT NULL COMMENT 'Nombres propios del empleado.',
  `apellidos` VARCHAR(100) NOT NULL COMMENT 'Apellidos del empleado.',
  `dni` VARCHAR(15) COMMENT 'Número de Documento Nacional de Identidad o identificación similar.',
  `estaActivo` BOOLEAN NOT NULL DEFAULT true COMMENT 'Estado de la relación laboral o activación de la cuenta (TRUE: activo, FALSE: inactivo).',
  `celular` VARCHAR(15) COMMENT 'Número de teléfono celular o móvil de contacto.',
  `hora_inicio_jornada` TIME COMMENT 'Hora de inicio programada para el turno o jornada laboral.',
  `hora_fin_jornada` TIME COMMENT 'Hora de finalización programada para el turno o jornada laboral.',
  `sueldo` DECIMAL(12,2) COMMENT 'Monto del sueldo o salario mensual bruto del empleado.',
  `sucursal_id` INT NOT NULL COMMENT 'ID que referencia a la sucursal o ubicación de trabajo principal del empleado.',
  `fecha_contratacion` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP) COMMENT 'Fecha y hora en que se registró la contratación del empleado.',
  `fecha_actualizacion` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP) COMMENT 'Fecha y hora de la última modificación del registro.'
) 
COMMENT = "
**Propósito:** Almacena la información de contacto, laboral y personal de los empleados o personal del sistema.

### Restricciones Adicionales (Foreign Keys)

* `FOREIGN KEY (sucursal_id)` se refiere a la columna **id** de la tabla de sucursales (asumida: `t_sucursales` o similar).
";

CREATE TABLE `entradas_inventarios` (
  `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Identificador único del registro de entrada al inventario. Clave primaria.',
  `cantidad` INT NOT NULL DEFAULT 1 COMMENT 'Número de unidades del producto que ingresan al inventario.',
  `producto_id` INT NOT NULL COMMENT 'ID que referencia al producto específico que está ingresando.',
  `sucursal_id` INT NOT NULL COMMENT 'ID que referencia a la sucursal donde se registra el ingreso del stock.',
  `fecha_creacion` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP) COMMENT 'Fecha y hora en que se registró la entrada de inventario.',
  `fecha_actualizacion` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP) COMMENT 'Fecha y hora de la última modificación del registro de entrada.'
) 
COMMENT = "
**Propósito:** Registra los movimientos de aumento de stock (ingresos) de productos en una sucursal específica.

### Restricciones Adicionales (Foreign Keys)

* `FOREIGN KEY (producto_id)` se refiere a la columna **id** de la tabla de productos (asumida: `t_productos` o similar).
* `FOREIGN KEY (sucursal_id)` se refiere a la columna **id** de la tabla de sucursales (asumida: `t_sucursales` o similar).
";

CREATE TABLE `estados_doc_facturacion` (
  `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Identificador único del estado. Clave primaria.',
  `nombre` VARCHAR(100) NOT NULL COMMENT 'Nombre legible y descriptivo del estado (Ej: Aceptado, Rechazado, Enviado).',
  `codigo` VARCHAR(10) NOT NULL COMMENT 'Código corto o clave del estado, a menudo un código oficial de la autoridad fiscal (Ej: 01, 02, C001).'
) 
COMMENT = "
  **Propósito:** Define y almacena los diferentes estados por los que puede pasar un documento de venta electrónico (Factura, Boleta, etc.).

  ### Valores Insertados

  A continuación, se listan los estados iniciales que se han insertado en la tabla:

  | id | codigo | nombre |
  | :---: | :---: | :--- |
  | 1 | 01 | Registrado en servidor factpro (Se puede editar el comprobante) |
  | 2 | 03 | Enviado pero sin respuesta de la sunat |
  | 3 | 05 | Aceptado ante la sunat |
  | 4 | 09 | Rechazado ante la sunat |
  | 5 | 11 | Anulado ante la sunat |
  | 6 | 13 | Por anular |
  | 7 | 19 | Sin respuesta de la sunat |
";

CREATE TABLE `estados_transferencias_inventarios` (
  `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Identificador único del estado de la transferencia. Clave primaria.',
  `nombre` VARCHAR(100) NOT NULL COMMENT 'Nombre legible y descriptivo del estado (Ej: Pendiente, En Tránsito, Recibida, Cancelada).'
) 
COMMENT = "
  **Propósito:** Define los diferentes estados por los que pasa una transferencia de stock de inventario entre sucursales.

  ### Valores Insertados

  A continuación, se listan los estados iniciales que se han insertado en la tabla:

  | id | nombre |
  | :---: | :--- |
  | 1 | Solicitando |
  | 2 | Finalizada |
  | 3 | Rechazado |
";

CREATE TABLE `items_transferencia_inventario` (
  `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Identificador único de la línea de detalle de la transferencia. Clave primaria.',
  `cantidad` INT NOT NULL DEFAULT 1 COMMENT 'Número de unidades del producto solicitadas para transferir.',
  `producto_id` INT NOT NULL COMMENT 'ID que referencia al producto específico que se está transfiriendo.',
  `transferencia_inventario_id` INT NOT NULL COMMENT 'ID que referencia al registro maestro de la transferencia de inventario a la que pertenece este ítem.'
) 
COMMENT = "
**Propósito:** Almacena el detalle de los productos y sus cantidades que forman parte de una transferencia de stock entre sucursales.

### Restricciones Adicionales (Foreign Keys)

* `FOREIGN KEY (producto_id)` se refiere a la columna **id** de la tabla de productos (asumida: `t_productos` o similar).
* `FOREIGN KEY (transferencia_inventario_id)` se refiere a la columna **id** de la tabla de transferencias (asumida: `transferencias_inventario`).
";

CREATE TABLE `marcas` (
  `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Identificador único de la marca. Clave primaria.',
  `nombre` VARCHAR(100) NOT NULL COMMENT 'Nombre oficial o comercial de la marca (Ej: Sony, Samsung, Nike).',
  `descripcion` TEXT COMMENT 'Descripción opcional sobre la historia, filosofía o sector de la marca.'
) 
COMMENT = "
**Propósito:** Almacena un catálogo de las diferentes marcas asociadas a los productos vendidos en el sistema.

### Valores Insertados

A continuación, se listan las marcas iniciales que se han insertado en la tabla:

| id | nombre | descripcion |
| :---: | :--- | :--- |
| 1 | TechNova | Líder en innovación de hardware y software para el mercado global. |
| 2 | FashionTrend | Marca especializada en ropa urbana, calzado y accesorios de alta calidad. |
| 3 | HomeBliss | Ofrece soluciones prácticas y estéticas para la decoración y organización del hogar. |
| 4 | GourmetDelight | Empresa de alimentos premium, especializada en productos orgánicos y delicatessen. |
";

CREATE TABLE `metodos_pago` (
  `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Identificador único del método de pago. Clave primaria.',
  `nombre` VARCHAR(50) NOT NULL COMMENT 'Nombre del método de pago (Ej: Efectivo, Tarjeta de Crédito, Transferencia Bancaria).',
  `estaActivado` BOOLEAN NOT NULL DEFAULT true COMMENT 'Indica si el método de pago está disponible o activo para su uso (TRUE/FALSE).'
) 
COMMENT = "
**Propósito:** Almacena un catálogo de las diferentes formas o métodos de pago aceptados en las transacciones de venta.

### Valores Insertados

A continuación, se listan los métodos de pago iniciales que se han insertado en la tabla:

| id | nombre | estaActivado |
| :---: | :--- | :---: |
| 1 | Yape | FALSE |
| 2 | Plin | FALSE |
";

CREATE TABLE `permisos` (
  `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Identificador único del permiso. Clave primaria.',
  `codigo` VARCHAR(50) NOT NULL COMMENT 'Código único y técnico del permiso (Ej: view_productos, edit_ventas, delete_usuarios).',
  `nombre` VARCHAR(100) NOT NULL COMMENT 'Nombre legible y descriptivo del permiso para la interfaz de usuario (Ej: Ver Productos, Editar Ventas).'
) 
COMMENT = "
**Propósito:** Define las acciones o funcionalidades específicas que un usuario puede realizar en el sistema, utilizadas en el control de acceso basado en roles (RBAC).

### Valores Insertados

A continuación, se listan los permisos iniciales que se han insertado en la tabla:

| id | codigo | nombre |
| :---: | :--- | :--- |
| 1 | VIEW\_DASH | Ver Dashboard |
| 2 | MANAGE\_USERS | Gestionar Usuarios |
| 3 | EDIT\_PRODUCTS | Editar Productos |
| 4 | VIEW\_REPORTS | Ver Reportes Financieros |
| 5 | CREATE\_INVOICE | Crear Facturas |
| 6 | ANULAR\_DOC | Anular Documentos |
";

CREATE TABLE `productos` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `sku` VARCHAR(7) NOT NULL,
  `nombre` VARCHAR(255) NOT NULL,
  `descripcion` TEXT,
  `path_foto` VARCHAR(255),
  `precio_compra` DECIMAL(12,2) NOT NULL,
  `color_id` INT NOT NULL,
  `categoria_id` INT NOT NULL,
  `marca_id` INT NOT NULL,
  `fecha_creacion` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `proformas_venta` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `total` DECIMAL(12,2) NOT NULL,
  `productos` JSON NOT NULL,
  `sucursal_id` INT NOT NULL,
  `cliente_id` INT NOT NULL,
  `fecha_creacion` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `reservas_productos` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `descripcion` TEXT,
  `productos` JSON NOT NULL,
  `monto_adelantado` DECIMAL(12,2) NOT NULL,
  `monto_total` DECIMAL(12,2) NOT NULL,
  `sucursal_id` INT,
  `cliente_id` INT NOT NULL,
  `fecha_recojo` DATE,
  `fecha_creacion` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `roles_permisos` (
  `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Identificador único del registro de asignación. Clave primaria.',
  `rol_id` INT NOT NULL COMMENT 'ID que referencia al rol específico al que se le asigna el permiso.',
  `permiso_id` INT NOT NULL COMMENT 'ID que referencia al permiso que se está otorgando a dicho rol.'
) 
COMMENT = "
**Propósito:** Tabla de unión (muchos a muchos) que establece la relación entre los roles de usuario y los permisos, definiendo las capacidades de cada rol.

### Restricciones Adicionales (Foreign Keys)

* `FOREIGN KEY (rol_id)` se refiere a la columna **id** de la tabla `roles`.
* `FOREIGN KEY (permiso_id)` se refiere a la columna **id** de la tabla `permisos`.

### Valores Insertados

Los siguientes valores representan la asignación inicial de permisos a cada rol (asumiendo que los `id` de `roles` y `permisos` son secuenciales):

| Rol (ID) | Permiso (Código) | Permiso (Nombre) |
| :---: | :--- | :--- |
| **1 (Administrador)** | VIEW\_DASH | Ver Dashboard |
| 1 | MANAGE\_USERS | Gestionar Usuarios |
| 1 | EDIT\_PRODUCTS | Editar Productos |
| 1 | VIEW\_REPORTS | Ver Reportes Financieros |
| 1 | CREATE\_INVOICE | Crear Facturas |
| 1 | ANULAR\_DOC | Anular Documentos |
| **2 (Empleado)** | VIEW\_DASH | Ver Dashboard |
| 2 | CREATE\_INVOICE | Crear Facturas |
| 2 | ANULAR\_DOC | Anular Documentos |
| **3 (Gerente)** | VIEW\_DASH | Ver Dashboard |
| 3 | MANAGE\_USERS | Gestionar Usuarios |
| 3 | VIEW\_REPORTS | Ver Reportes Financieros |
| **4 (Contador)** | VIEW\_DASH | Ver Dashboard |
| 4 | VIEW\_REPORTS | Ver Reportes Financieros |
";

CREATE TABLE `roles` (
  `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Identificador único del rol. Clave primaria.',
  `codigo` VARCHAR(20) NOT NULL COMMENT 'Código técnico y único para identificar el rol (Ej: ADMIN, VENTAS, ALMACEN).',
  `nombre` VARCHAR(100) NOT NULL COMMENT 'Nombre legible del rol que se muestra al usuario (Ej: Administrador, Vendedor, Jefe de Almacén).'
) 
COMMENT = "
**Propósito:** Define los diferentes roles o perfiles de acceso que pueden asignarse a las cuentas de usuario, determinando sus permisos y funcionalidades.

### Valores Insertados

A continuación, se listan los roles iniciales que se han insertado en la tabla:

| id | codigo | nombre |
| :---: | :--- | :--- |
| 1 | ADMIN | Administrador del Sistema |
| 2 | EMPLOYEE | Empleado de Ventas |
| 3 | MANAGER | Gerente de Sucursal |
| 4 | ACCOUNTANT | Contador |
";

CREATE TABLE `sucursales` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `direccion` VARCHAR(255),
  `serie_factura` VARCHAR(10),
  `numero_factura_inicial` INT DEFAULT 1,
  `serie_boleta` VARCHAR(10),
  `numero_boleta_inicial` INT DEFAULT 1,
  `codigo_anexo` VARCHAR(10),
  `fecha_creacion` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `tipos_doc_facturacion` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL
);

CREATE TABLE `tipos_documento_cliente` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `codigo_sunat` VARCHAR(2) NOT NULL,
  `descripction` VARCHAR(100) NOT NULL
);

CREATE TABLE `tipos_tax` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `codigo_sunat` VARCHAR(10) NOT NULL,
  `porcentaje_tax` TINYINT NOT NULL
);

CREATE TABLE `transferencias_inventarios` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `estado_transferencia_id` INT NOT NULL,
  `sucursal_origen_id` INT,
  `sucursal_destino_id` INT NOT NULL,
  `fecha_creacion` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  `fecha_actualizacion` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `ventas` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `serie_documento` VARCHAR(5) NOT NULL,
  `numero_documento` VARCHAR(10) NOT NULL,
  `tipo_operacion` VARCHAR(10) NOT NULL DEFAULT '0101',
  `enviar_automaticamente_al_cliente` BOOLEAN NOT NULL DEFAULT false,
  `tipo_documento_id` INT NOT NULL,
  `metodo_pago_id` INT NOT NULL,
  `sucursal_id` INT NOT NULL,
  `cliente_id` INT NOT NULL,
  `observaciones` TEXT,
  `fecha_emision` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE UNIQUE INDEX `categorias_nombre_unique` ON `categorias` (`nombre`);

CREATE UNIQUE INDEX `colores_nombre_unique` ON `colores` (`nombre`);

CREATE UNIQUE INDEX `cuentas_empleados_usuario_unique` ON `cuentas_usuario` (`usuario`);

CREATE UNIQUE INDEX `detalles_producto_producto_id_sucursal_id_unique` ON `detalles_producto` (`producto_id`, `sucursal_id`);

CREATE UNIQUE INDEX `estados_doc_facturacion_nombre_unique` ON `estados_doc_facturacion` (`nombre`);

CREATE UNIQUE INDEX `estados_doc_facturacion_codigo_unique` ON `estados_doc_facturacion` (`codigo`);

CREATE UNIQUE INDEX `estados_transferencias_inventarios_nombre_unique` ON `estados_transferencias_inventarios` (`nombre`);

CREATE UNIQUE INDEX `marcas_nombre_unique` ON `marcas` (`nombre`);

CREATE UNIQUE INDEX `metodos_pago_nombre_unique` ON `metodos_pago` (`nombre`);

CREATE UNIQUE INDEX `permisos_codigo_unique` ON `permisos` (`codigo`);

CREATE UNIQUE INDEX `permisos_nombre_unique` ON `permisos` (`nombre`);

CREATE UNIQUE INDEX `productos_sku_unique` ON `productos` (`sku`);

CREATE UNIQUE INDEX `roles_codigo_unique` ON `roles` (`codigo`);

CREATE UNIQUE INDEX `roles_nombre_unique` ON `roles` (`nombre`);

CREATE UNIQUE INDEX `sucursales_serie_factura_unique` ON `sucursales` (`serie_factura`);

CREATE UNIQUE INDEX `sucursales_serie_boleta_unique` ON `sucursales` (`serie_boleta`);

CREATE UNIQUE INDEX `sucursales_codigo_establecimiento_unique` ON `sucursales` (`codigo_anexo`);

CREATE UNIQUE INDEX `tipos_doc_facturacion_nombre_unique` ON `tipos_doc_facturacion` (`nombre`);

CREATE UNIQUE INDEX `tipos_documento_cliente_nombre_unique` ON `tipos_documento_cliente` (`descripction`);

CREATE UNIQUE INDEX `tipos_documento_cliente_codigo_sunat_unique` ON `tipos_documento_cliente` (`codigo_sunat`);

CREATE UNIQUE INDEX `tipos_tax_nombre_unique` ON `tipos_tax` (`nombre`);

CREATE UNIQUE INDEX `tipos_tax_codigo_sunat_unique` ON `tipos_tax` (`codigo_sunat`);

CREATE UNIQUE INDEX `ventas_serie_documento_numero_documento_unique` ON `ventas` (`serie_documento`, `numero_documento`);

ALTER TABLE `clientes` ADD CONSTRAINT `fk_clientes_tipo_documento_id` FOREIGN KEY (`tipo_documento_id`) REFERENCES `tipos_documento_cliente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `cuentas_usuario` ADD CONSTRAINT `fk_cuentas_empleados_rol_id` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `cuentas_usuario` ADD CONSTRAINT `fk_cuentas_empleados_empleado_id` FOREIGN KEY (`empleado_id`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `detalles_producto` ADD CONSTRAINT `fk_detalles_producto_producto_id` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `detalles_producto` ADD CONSTRAINT `fk_detalles_producto_sucursal_id` FOREIGN KEY (`sucursal_id`) REFERENCES `sucursales` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `detalles_venta` ADD CONSTRAINT `fk_detalles_venta_tipo_tax_id` FOREIGN KEY (`tipo_tax_id`) REFERENCES `tipos_tax` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `detalles_venta` ADD CONSTRAINT `fk_detalles_venta_venta_id` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `docs_ventas` ADD CONSTRAINT `fk_docs_facturacion_estado_id` FOREIGN KEY (`estado_id`) REFERENCES `estados_doc_facturacion` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `docs_ventas` ADD CONSTRAINT `fk_docs_facturacion_venta_id` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `usuarios` ADD CONSTRAINT `fk_empleados_sucursal_id` FOREIGN KEY (`sucursal_id`) REFERENCES `sucursales` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `entradas_inventarios` ADD CONSTRAINT `fk_entradas_inventarios_producto_id` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `entradas_inventarios` ADD CONSTRAINT `fk_entradas_inventarios_sucursal_id` FOREIGN KEY (`sucursal_id`) REFERENCES `sucursales` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `items_transferencia_inventario` ADD CONSTRAINT `fk_items_trans_inv_producto_id` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `items_transferencia_inventario` ADD CONSTRAINT `fk_items_trans_inv_transferencia_id` FOREIGN KEY (`transferencia_inventario_id`) REFERENCES `transferencias_inventarios` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `productos` ADD CONSTRAINT `fk_productos_color_id` FOREIGN KEY (`color_id`) REFERENCES `colores` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `productos` ADD CONSTRAINT `fk_productos_categoria_id` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `productos` ADD CONSTRAINT `fk_productos_marca_id` FOREIGN KEY (`marca_id`) REFERENCES `marcas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `proformas_venta` ADD CONSTRAINT `fk_proformas_venta_cliente_id` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `proformas_venta` ADD CONSTRAINT `fk_proformas_venta_sucursal_id` FOREIGN KEY (`sucursal_id`) REFERENCES `sucursales` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `reservas_productos` ADD CONSTRAINT `fk_reservas_productos_cliente_id` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `reservas_productos` ADD CONSTRAINT `fk_reservas_productos_sucursal_id` FOREIGN KEY (`sucursal_id`) REFERENCES `sucursales` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `roles_permisos` ADD CONSTRAINT `fk_roles_permisos_rol_id` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `roles_permisos` ADD CONSTRAINT `fk_roles_permisos_permiso_id` FOREIGN KEY (`permiso_id`) REFERENCES `permisos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `transferencias_inventarios` ADD CONSTRAINT `fk_trans_inv_estado_transferencia_id` FOREIGN KEY (`estado_transferencia_id`) REFERENCES `estados_transferencias_inventarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `transferencias_inventarios` ADD CONSTRAINT `fk_trans_inv_sucursal_origen_id` FOREIGN KEY (`sucursal_origen_id`) REFERENCES `sucursales` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `transferencias_inventarios` ADD CONSTRAINT `fk_trans_inv_sucursal_destino_id` FOREIGN KEY (`sucursal_destino_id`) REFERENCES `sucursales` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `ventas` ADD CONSTRAINT `fk_ventas_tipo_documento_id` FOREIGN KEY (`tipo_documento_id`) REFERENCES `tipos_doc_facturacion` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `ventas` ADD CONSTRAINT `fk_ventas_metodo_pago_id` FOREIGN KEY (`metodo_pago_id`) REFERENCES `metodos_pago` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `ventas` ADD CONSTRAINT `fk_ventas_cliente_id` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `ventas` ADD CONSTRAINT `fk_ventas_sucursal_id` FOREIGN KEY (`sucursal_id`) REFERENCES `sucursales` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
