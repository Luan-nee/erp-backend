CREATE DATABASE IF NOT EXISTS erp_app;

USE erp_app;

CREATE TABLE archivos_app (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    size VARCHAR(20) NOT NULL,
    metadata JSON NOT NULL,
    version VARCHAR(20) NOT NULL,
    userId INT UNSIGNED,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT archivos_app_filename_unique UNIQUE(filename)
);

CREATE TABLE categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    CONSTRAINT categorias_nombre_unique UNIQUE(nombre)
);

CREATE TABLE clientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo_documento_id INT UNSIGNED NOT NULL,
    numero_documento VARCHAR(20),
    denominacion VARCHAR(255) NOT NULL,
    codigo_pais VARCHAR(3) DEFAULT 'PE' NOT NULL,
    direccion VARCHAR(255),
    correo VARCHAR(100),
    telefono VARCHAR(20),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE colores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    hex VARCHAR(7),
    CONSTRAINT colores_nombre_unique UNIQUE(nombre)
);

CREATE TABLE cuentas_empleados (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(100) NOT NULL,
    clave VARCHAR(255) NOT NULL,
    secret VARCHAR(255) NOT NULL,
    eliminable BOOLEAN DEFAULT TRUE NOT NULL,
    rol_id INT UNSIGNED NOT NULL,
    empleado_id INT UNSIGNED NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT cuentas_empleados_usuario_unique UNIQUE(usuario)
);

CREATE TABLE detalles_producto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    precio_compra DECIMAL(12, 2) NOT NULL,
    porcentaje_ganancia VARCHAR(10),
    precio_venta DECIMAL(12, 2) NOT NULL,
    precio_oferta DECIMAL(12, 2),
    stock INT UNSIGNED DEFAULT 0 NOT NULL,
    stock_bajo BOOLEAN DEFAULT FALSE NOT NULL,
    liquidacion BOOLEAN DEFAULT FALSE NOT NULL,
    producto_id INT UNSIGNED NOT NULL,
    sucursal_id INT UNSIGNED NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT detalles_producto_producto_id_sucursal_id_unique UNIQUE(producto_id, sucursal_id)
);

CREATE TABLE detalles_venta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo_unidad VARCHAR(5) DEFAULT 'NIU' NOT NULL,
    codigo VARCHAR(50),
    nombre VARCHAR(255) NOT NULL,
    cantidad INT UNSIGNED DEFAULT 1 NOT NULL,
    precio_sin_igv DECIMAL(12, 2) NOT NULL,
    precio_con_igv DECIMAL(12, 2) NOT NULL,
    tipo_tax_id INT UNSIGNED NOT NULL,
    total_base_tax DECIMAL(12, 2) NOT NULL,
    total_tax DECIMAL(12, 2) NOT NULL,
    total DECIMAL(12, 2) NOT NULL,
    producto_id INT UNSIGNED,
    venta_id INT UNSIGNED NOT NULL
);

CREATE TABLE docs_facturacion (
    id INT PRIMARY KEY AUTO_INCREMENT,
    factpro_filename VARCHAR(255),
    factpro_document_id VARCHAR(50),
    hash VARCHAR(255),
    qr VARCHAR(255),
    link_xml VARCHAR(255),
    link_pdf VARCHAR(255),
    link_cdr VARCHAR(255),
    identificador_anulado VARCHAR(50),
    factpro_document_id_anulado VARCHAR(50),
    link_xml_anulado VARCHAR(255),
    link_pdf_anulado VARCHAR(255),
    link_cdr_anulado VARCHAR(255),
    ticket_anulado VARCHAR(100),
    estado_raw_id VARCHAR(50),
    descripcion_estado VARCHAR(255),
    informacion_sunat JSON,
    estado_id INT UNSIGNED,
    venta_id INT UNSIGNED NOT NULL
);

CREATE TABLE empleados (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    activo BOOLEAN DEFAULT TRUE NOT NULL,
    dni VARCHAR(15),
    path_foto VARCHAR(255),
    celular VARCHAR(15),
    hora_inicio_jornada TIME,
    hora_fin_jornada TIME,
    fecha_contratacion DATE,
    sueldo DECIMAL(12, 2),
    sucursal_id INT UNSIGNED NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE entradas_inventarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cantidad INT UNSIGNED DEFAULT 1 NOT NULL,
    producto_id INT UNSIGNED NOT NULL,
    sucursal_id INT UNSIGNED NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE estados_doc_facturacion (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    codigo_sunat VARCHAR(10) NOT NULL,
    codigo VARCHAR(10) NOT NULL,
    CONSTRAINT estados_doc_facturacion_nombre_unique UNIQUE(nombre),
    CONSTRAINT estados_doc_facturacion_codigo_sunat_unique UNIQUE(codigo_sunat)
);

CREATE TABLE estados_transferencias_inventarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    codigo VARCHAR(20) NOT NULL,
    CONSTRAINT estados_transferencias_inventarios_nombre_unique UNIQUE(nombre),
    CONSTRAINT estados_transferencias_inventarios_codigo_unique UNIQUE(codigo)
);

CREATE TABLE fotos_producto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    path VARCHAR(255) NOT NULL,
    producto_id INT UNSIGNED NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE items_transferencia_inventario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cantidad INT UNSIGNED DEFAULT 1 NOT NULL,
    producto_id INT UNSIGNED NOT NULL,
    transferencia_inventario_id INT UNSIGNED NOT NULL
);

CREATE TABLE marcas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    CONSTRAINT marcas_nombre_unique UNIQUE(nombre)
);

CREATE TABLE metodos_pago (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    codigo_sunat VARCHAR(10) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    activado BOOLEAN NOT NULL,
    CONSTRAINT metodos_pago_nombre_unique UNIQUE(nombre),
    CONSTRAINT metodos_pago_codigo_sunat_unique UNIQUE(codigo_sunat),
    CONSTRAINT metodos_pago_tipo_unique UNIQUE(tipo)
);

CREATE TABLE monedas_facturacion (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    codigo_sunat VARCHAR(10) NOT NULL,
    CONSTRAINT monedas_facturacion_nombre_unique UNIQUE(nombre),
    CONSTRAINT monedas_facturacion_codigo_sunat_unique UNIQUE(codigo_sunat)
);

CREATE TABLE notificaciones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    leida BOOLEAN DEFAULT FALSE NOT NULL,
    sucursal_id INT UNSIGNED NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE permisos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(50) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    CONSTRAINT permisos_codigo_unique UNIQUE(codigo),
    CONSTRAINT permisos_nombre_unique UNIQUE(nombre)
);

CREATE TABLE productos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    
    -- El campo generado 'sku' debe manejarse de forma diferente en MySQL
    -- La expresión generada (LPAD(id::TEXT, 7, '0')) no es estándar de MySQL
    -- Para mantener la lógica, lo definimos como VARCHAR y usamos un TRIGGER (no incluido aquí) 
    -- o lo definimos como un campo GENERATED AS para la versión 5.7+
    sku VARCHAR(7) GENERATED ALWAYS AS (LPAD(CAST(id AS CHAR), 7, '0')) STORED NOT NULL,
    
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    max_dias_sin_reabastecer SMALLINT UNSIGNED,
    stock_minimo INT UNSIGNED,
    cantidad_minima_descuento INT UNSIGNED,
    cantidad_gratis_descuento INT UNSIGNED,
    porcentaje_descuento TINYINT UNSIGNED, -- Los porcentajes suelen ser entre 0 y 100
    path_foto VARCHAR(255),
    
    color_id INT UNSIGNED NOT NULL,
    categoria_id INT UNSIGNED NOT NULL,
    marca_id INT UNSIGNED NOT NULL,
    
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    
    CONSTRAINT productos_sku_unique UNIQUE(sku)
);

CREATE TABLE proformas_venta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255),
    total DECIMAL(12, 2) NOT NULL,
    detalles JSON NOT NULL,
    cliente_id INT UNSIGNED,
    empleado_id INT UNSIGNED NOT NULL,
    sucursal_id INT UNSIGNED NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE reservas_productos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descripcion TEXT,
    detalles_reserva JSON NOT NULL,
    monto_adelantado DECIMAL(12, 2) NOT NULL,
    fecha_recojo DATE,
    cliente_id INT UNSIGNED NOT NULL,
    sucursal_id INT UNSIGNED,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE roles_permisos (
    rol_id INT UNSIGNED NOT NULL,
    permiso_id INT UNSIGNED NOT NULL,
    CONSTRAINT roles_permisos_rol_id_permiso_id_pk PRIMARY KEY(rol_id, permiso_id)
);

CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(20) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    CONSTRAINT roles_codigo_unique UNIQUE(codigo),
    CONSTRAINT roles_nombre_unique UNIQUE(nombre)
);

CREATE TABLE sucursales (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255),
    sucursal_central BOOLEAN NOT NULL,
    serie_factura VARCHAR(10),
    numero_factura_inicial INT UNSIGNED DEFAULT 1,
    serie_boleta VARCHAR(10),
    numero_boleta_inicial INT UNSIGNED DEFAULT 1,
    codigo_establecimiento VARCHAR(10),
    tiene_notificaciones BOOLEAN DEFAULT FALSE NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT sucursales_serie_factura_unique UNIQUE(serie_factura),
    CONSTRAINT sucursales_serie_boleta_unique UNIQUE(serie_boleta),
    CONSTRAINT sucursales_codigo_establecimiento_unique UNIQUE(codigo_establecimiento)
);

CREATE TABLE tipos_doc_facturacion (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    codigo_sunat VARCHAR(10) NOT NULL,
    codigo VARCHAR(10) NOT NULL,
    CONSTRAINT tipos_doc_facturacion_nombre_unique UNIQUE(nombre),
    CONSTRAINT tipos_doc_facturacion_codigo_sunat_unique UNIQUE(codigo_sunat)
);

CREATE TABLE tipos_documento_cliente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    codigo_sunat VARCHAR(10) NOT NULL,
    codigo VARCHAR(10) NOT NULL,
    CONSTRAINT tipos_documento_cliente_nombre_unique UNIQUE(nombre),
    CONSTRAINT tipos_documento_cliente_codigo_sunat_unique UNIQUE(codigo_sunat),
    CONSTRAINT tipos_documento_cliente_codigo_unique UNIQUE(codigo)
);

CREATE TABLE tipos_tax (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    codigo_sunat VARCHAR(10) NOT NULL,
    porcentaje TINYINT UNSIGNED NOT NULL,
    codigo VARCHAR(10) NOT NULL,
    CONSTRAINT tipos_tax_nombre_unique UNIQUE(nombre),
    CONSTRAINT tipos_tax_codigo_sunat_unique UNIQUE(codigo_sunat)
);

CREATE TABLE totales_venta (
    venta_id INT UNSIGNED PRIMARY KEY NOT NULL,
    total_gravadas DECIMAL(12, 2) NOT NULL,
    total_exoneradas DECIMAL(12, 2) NOT NULL,
    total_gratuitas DECIMAL(12, 2) NOT NULL,
    total_tax DECIMAL(12, 2) NOT NULL,
    total_venta DECIMAL(12, 2) NOT NULL
);

CREATE TABLE transferencias_inventarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    estado_transferencia_id INT UNSIGNED NOT NULL,
    sucursal_origen_id INT UNSIGNED,
    sucursal_destino_id INT UNSIGNED NOT NULL,
    salida_origen TIMESTAMP NULL,
    llegada_destino TIMESTAMP NULL,
    modificable BOOLEAN DEFAULT TRUE NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE ventas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    observaciones TEXT,
    tipo_operacion VARCHAR(10) DEFAULT '0101' NOT NULL,
    porcentaje_venta TINYINT UNSIGNED DEFAULT 18 NOT NULL,
    tipo_documento_id INT UNSIGNED NOT NULL,
    serie_documento VARCHAR(5) NOT NULL,
    numero_documento VARCHAR(10) NOT NULL,
    moneda_id INT UNSIGNED NOT NULL,
    metodo_pago_id INT UNSIGNED NOT NULL,
    cliente_id INT UNSIGNED NOT NULL,
    empleado_id INT UNSIGNED NOT NULL,
    sucursal_id INT UNSIGNED NOT NULL,
    fecha_emision DATE NOT NULL,
    hora_emision TIME NOT NULL,
    declarada BOOLEAN DEFAULT FALSE NOT NULL,
    anulada BOOLEAN DEFAULT FALSE NOT NULL,
    cancelada BOOLEAN DEFAULT FALSE NOT NULL,
    motivo_anulado TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT ventas_serie_documento_numero_documento_unique UNIQUE(serie_documento, numero_documento)
);

USE erp_app;

-- TABLA archivos_app
ALTER TABLE archivos_app
ADD CONSTRAINT fk_archivos_app_userId
FOREIGN KEY (userId) REFERENCES cuentas_empleados(id)
ON DELETE SET NULL ON UPDATE NO ACTION;

-- TABLA clientes
ALTER TABLE clientes
ADD CONSTRAINT fk_clientes_tipo_documento_id
FOREIGN KEY (tipo_documento_id) REFERENCES tipos_documento_cliente(id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

-- TABLA cuentas_empleados
ALTER TABLE cuentas_empleados
ADD CONSTRAINT fk_cuentas_empleados_rol_id
FOREIGN KEY (rol_id) REFERENCES roles(id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE cuentas_empleados
ADD CONSTRAINT fk_cuentas_empleados_empleado_id
FOREIGN KEY (empleado_id) REFERENCES empleados(id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

-- TABLA detalles_producto
ALTER TABLE detalles_producto
ADD CONSTRAINT fk_detalles_producto_producto_id
FOREIGN KEY (producto_id) REFERENCES productos(id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE detalles_producto
ADD CONSTRAINT fk_detalles_producto_sucursal_id
FOREIGN KEY (sucursal_id) REFERENCES sucursales(id)
ON DELETE CASCADE ON UPDATE NO ACTION;

-- TABLA detalles_venta
ALTER TABLE detalles_venta
ADD CONSTRAINT fk_detalles_venta_tipo_tax_id
FOREIGN KEY (tipo_tax_id) REFERENCES tipos_tax(id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE detalles_venta
ADD CONSTRAINT fk_detalles_venta_venta_id
FOREIGN KEY (venta_id) REFERENCES ventas(id)
ON DELETE CASCADE ON UPDATE NO ACTION;

-- TABLA docs_facturacion
ALTER TABLE docs_facturacion
ADD CONSTRAINT fk_docs_facturacion_estado_id
FOREIGN KEY (estado_id) REFERENCES estados_doc_facturacion(id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE docs_facturacion
ADD CONSTRAINT fk_docs_facturacion_venta_id
FOREIGN KEY (venta_id) REFERENCES ventas(id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

-- TABLA empleados
ALTER TABLE empleados
ADD CONSTRAINT fk_empleados_sucursal_id
FOREIGN KEY (sucursal_id) REFERENCES sucursales(id)
ON DELETE CASCADE ON UPDATE NO ACTION;

-- TABLA entradas_inventarios
ALTER TABLE entradas_inventarios
ADD CONSTRAINT fk_entradas_inventarios_producto_id
FOREIGN KEY (producto_id) REFERENCES productos(id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE entradas_inventarios
ADD CONSTRAINT fk_entradas_inventarios_sucursal_id
FOREIGN KEY (sucursal_id) REFERENCES sucursales(id)
ON DELETE CASCADE ON UPDATE NO ACTION;

-- TABLA fotos_producto
ALTER TABLE fotos_producto
ADD CONSTRAINT fk_fotos_producto_producto_id
FOREIGN KEY (producto_id) REFERENCES productos(id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

-- TABLA items_transferencia_inventario
ALTER TABLE items_transferencia_inventario
ADD CONSTRAINT fk_items_trans_inv_producto_id
FOREIGN KEY (producto_id) REFERENCES productos(id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE items_transferencia_inventario
ADD CONSTRAINT fk_items_trans_inv_transferencia_id
FOREIGN KEY (transferencia_inventario_id) REFERENCES transferencias_inventarios(id)
ON DELETE CASCADE ON UPDATE NO ACTION;

-- TABLA notificaciones
ALTER TABLE notificaciones
ADD CONSTRAINT fk_notificaciones_sucursal_id
FOREIGN KEY (sucursal_id) REFERENCES sucursales(id)
ON DELETE CASCADE ON UPDATE NO ACTION;

-- TABLA productos
ALTER TABLE productos
ADD CONSTRAINT fk_productos_color_id
FOREIGN KEY (color_id) REFERENCES colores(id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE productos
ADD CONSTRAINT fk_productos_categoria_id
FOREIGN KEY (categoria_id) REFERENCES categorias(id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE productos
ADD CONSTRAINT fk_productos_marca_id
FOREIGN KEY (marca_id) REFERENCES marcas(id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

-- TABLA proformas_venta
ALTER TABLE proformas_venta
ADD CONSTRAINT fk_proformas_venta_cliente_id
FOREIGN KEY (cliente_id) REFERENCES clientes(id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE proformas_venta
ADD CONSTRAINT fk_proformas_venta_empleado_id
FOREIGN KEY (empleado_id) REFERENCES empleados(id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE proformas_venta
ADD CONSTRAINT fk_proformas_venta_sucursal_id
FOREIGN KEY (sucursal_id) REFERENCES sucursales(id)
ON DELETE CASCADE ON UPDATE NO ACTION;

-- TABLA reservas_productos
ALTER TABLE reservas_productos
ADD CONSTRAINT fk_reservas_productos_cliente_id
FOREIGN KEY (cliente_id) REFERENCES clientes(id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE reservas_productos
ADD CONSTRAINT fk_reservas_productos_sucursal_id
FOREIGN KEY (sucursal_id) REFERENCES sucursales(id)
ON DELETE CASCADE ON UPDATE NO ACTION;

-- TABLA roles_permisos
ALTER TABLE roles_permisos
ADD CONSTRAINT fk_roles_permisos_rol_id
FOREIGN KEY (rol_id) REFERENCES roles(id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE roles_permisos
ADD CONSTRAINT fk_roles_permisos_permiso_id
FOREIGN KEY (permiso_id) REFERENCES permisos(id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

-- TABLA totales_venta
ALTER TABLE totales_venta
ADD CONSTRAINT fk_totales_venta_venta_id
FOREIGN KEY (venta_id) REFERENCES ventas(id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

-- TABLA transferencias_inventarios
ALTER TABLE transferencias_inventarios
ADD CONSTRAINT fk_trans_inv_estado_transferencia_id
FOREIGN KEY (estado_transferencia_id) REFERENCES estados_transferencias_inventarios(id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE transferencias_inventarios
ADD CONSTRAINT fk_trans_inv_sucursal_origen_id
FOREIGN KEY (sucursal_origen_id) REFERENCES sucursales(id)
ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE transferencias_inventarios
ADD CONSTRAINT fk_trans_inv_sucursal_destino_id
FOREIGN KEY (sucursal_destino_id) REFERENCES sucursales(id)
ON DELETE CASCADE ON UPDATE NO ACTION;

-- TABLA ventas
ALTER TABLE ventas
ADD CONSTRAINT fk_ventas_tipo_documento_id
FOREIGN KEY (tipo_documento_id) REFERENCES tipos_doc_facturacion(id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE ventas
ADD CONSTRAINT fk_ventas_moneda_id
FOREIGN KEY (moneda_id) REFERENCES monedas_facturacion(id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE ventas
ADD CONSTRAINT fk_ventas_metodo_pago_id
FOREIGN KEY (metodo_pago_id) REFERENCES metodos_pago(id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE ventas
ADD CONSTRAINT fk_ventas_cliente_id
FOREIGN KEY (cliente_id) REFERENCES clientes(id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE ventas
ADD CONSTRAINT fk_ventas_empleado_id
FOREIGN KEY (empleado_id) REFERENCES empleados(id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE ventas
ADD CONSTRAINT fk_ventas_sucursal_id
FOREIGN KEY (sucursal_id) REFERENCES sucursales(id)
ON DELETE CASCADE ON UPDATE NO ACTION;