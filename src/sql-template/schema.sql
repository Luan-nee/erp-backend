CREATE SCHEMA IF NOT EXISTS "erp_app";

USE "erp_app";

CREATE TABLE "archivos_app" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "archivos_app_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" text NOT NULL,
	"filename" text NOT NULL,
	"tipo" text NOT NULL,
	"size" text NOT NULL,
	"metadata" jsonb NOT NULL,
	"version" text NOT NULL,
	"userId" integer,
	"fecha_creacion" timestamp DEFAULT now() NOT NULL,
	"fecha_actualizacion" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "archivos_app_filename_unique" UNIQUE("filename")
);

--> statement-breakpoint
CREATE TABLE "categorias" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "categorias_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" text NOT NULL,
	"descripcion" text,
	CONSTRAINT "categorias_nombre_unique" UNIQUE("nombre")
);
--> statement-breakpoint
CREATE TABLE "clientes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "clientes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"tipo_documento_id" integer NOT NULL,
	"numero_documento" text,
	"denominacion" text NOT NULL,
	"codigo_pais" text DEFAULT 'PE' NOT NULL,
	"direccion" text,
	"correo" text,
	"telefono" text,
	"fecha_creacion" timestamp DEFAULT now() NOT NULL,
	"fecha_actualizacion" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "colores" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "colores_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" text NOT NULL,
	"hex" text,
	CONSTRAINT "colores_nombre_unique" UNIQUE("nombre")
);
--> statement-breakpoint
CREATE TABLE "cuentas_empleados" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "cuentas_empleados_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"usuario" text NOT NULL,
	"clave" text NOT NULL,
	"secret" text NOT NULL,
	"eliminable" boolean DEFAULT true NOT NULL,
	"rol_id" integer NOT NULL,
	"empleado_id" integer NOT NULL,
	"fecha_creacion" timestamp DEFAULT now() NOT NULL,
	"fecha_actualizacion" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "cuentas_empleados_usuario_unique" UNIQUE("usuario")
);
--> statement-breakpoint
CREATE TABLE "detalles_producto" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "detalles_producto_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"precio_compra" numeric(12, 2) NOT NULL,
	"porcentaje_ganancia" text,
	"precio_venta" numeric(12, 2) NOT NULL,
	"precio_oferta" numeric(12, 2),
	"stock" integer DEFAULT 0 NOT NULL,
	"stock_bajo" boolean DEFAULT false NOT NULL,
	"liquidacion" boolean DEFAULT false NOT NULL,
	"producto_id" integer NOT NULL,
	"sucursal_id" integer NOT NULL,
	"fecha_creacion" timestamp DEFAULT now() NOT NULL,
	"fecha_actualizacion" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "detalles_producto_producto_id_sucursal_id_unique" UNIQUE("producto_id","sucursal_id")
);
--> statement-breakpoint
CREATE TABLE "detalles_venta" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "detalles_venta_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"tipo_unidad" text DEFAULT 'NIU' NOT NULL,
	"codigo" text,
	"nombre" text NOT NULL,
	"cantidad" integer DEFAULT 1 NOT NULL,
	"precio_sin_igv" numeric(12, 2) NOT NULL,
	"precio_con_igv" numeric(12, 2) NOT NULL,
	"tipo_tax_id" integer NOT NULL,
	"total_base_tax" numeric(12, 2) NOT NULL,
	"total_tax" numeric(12, 2) NOT NULL,
	"total" numeric(12, 2) NOT NULL,
	"producto_id" integer,
	"venta_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "docs_facturacion" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "docs_facturacion_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"factpro_filename" text,
	"factpro_document_id" text,
	"hash" text,
	"qr" text,
	"link_xml" text,
	"link_pdf" text,
	"link_cdr" text,
	"identificador_anulado" text,
	"factpro_document_id_anulado" text,
	"link_xml_anulado" text,
	"link_pdf_anulado" text,
	"link_cdr_anulado" text,
	"ticket_anulado" text,
	"estado_raw_id" text,
	"descripcion_estado" text,
	"informacion_sunat" jsonb,
	"estado_id" integer,
	"venta_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "empleados" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "empleados_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" text NOT NULL,
	"apellidos" text NOT NULL,
	"activo" boolean DEFAULT true NOT NULL,
	"dni" text,
	"path_foto" text,
	"celular" text,
	"hora_inicio_jornada" time,
	"hora_fin_jornada" time,
	"fecha_contratacion" date,
	"sueldo" numeric(12, 2),
	"sucursal_id" integer NOT NULL,
	"fecha_creacion" timestamp DEFAULT now() NOT NULL,
	"fecha_actualizacion" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "entradas_inventarios" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "entradas_inventarios_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"cantidad" integer DEFAULT 1 NOT NULL,
	"producto_id" integer NOT NULL,
	"sucursal_id" integer NOT NULL,
	"fecha_creacion" timestamp DEFAULT now() NOT NULL,
	"fecha_actualizacion" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "estados_doc_facturacion" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "estados_doc_facturacion_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" text NOT NULL,
	"codigo_sunat" text NOT NULL,
	"codigo" text NOT NULL,
	CONSTRAINT "estados_doc_facturacion_nombre_unique" UNIQUE("nombre"),
	CONSTRAINT "estados_doc_facturacion_codigo_sunat_unique" UNIQUE("codigo_sunat")
);
--> statement-breakpoint
CREATE TABLE "estados_transferencias_inventarios" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "estados_transferencias_inventarios_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" text NOT NULL,
	"codigo" text NOT NULL,
	CONSTRAINT "estados_transferencias_inventarios_nombre_unique" UNIQUE("nombre"),
	CONSTRAINT "estados_transferencias_inventarios_codigo_unique" UNIQUE("codigo")
);
--> statement-breakpoint
CREATE TABLE "fotos_producto" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "fotos_producto_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"path" text NOT NULL,
	"producto_id" integer NOT NULL,
	"fecha_creacion" timestamp DEFAULT now() NOT NULL,
	"fecha_actualizacion" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "items_transferencia_inventario" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "items_transferencia_inventario_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"cantidad" integer DEFAULT 1 NOT NULL,
	"producto_id" integer NOT NULL,
	"transferencia_inventario_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "marcas" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "marcas_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" text NOT NULL,
	"descripcion" text,
	CONSTRAINT "marcas_nombre_unique" UNIQUE("nombre")
);
--> statement-breakpoint
CREATE TABLE "metodos_pago" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "metodos_pago_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" text NOT NULL,
	"codigo_sunat" text NOT NULL,
	"tipo" text NOT NULL,
	"activado" boolean NOT NULL,
	CONSTRAINT "metodos_pago_nombre_unique" UNIQUE("nombre"),
	CONSTRAINT "metodos_pago_codigo_sunat_unique" UNIQUE("codigo_sunat"),
	CONSTRAINT "metodos_pago_tipo_unique" UNIQUE("tipo")
);
--> statement-breakpoint
CREATE TABLE "monedas_facturacion" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "monedas_facturacion_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" text NOT NULL,
	"codigo_sunat" text NOT NULL,
	CONSTRAINT "monedas_facturacion_nombre_unique" UNIQUE("nombre"),
	CONSTRAINT "monedas_facturacion_codigo_sunat_unique" UNIQUE("codigo_sunat")
);
--> statement-breakpoint
CREATE TABLE "notificaciones" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "notificaciones_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"titulo" text NOT NULL,
	"descripcion" text,
	"leida" boolean DEFAULT false NOT NULL,
	"sucursal_id" integer NOT NULL,
	"fecha_creacion" timestamp DEFAULT now() NOT NULL,
	"fecha_actualizacion" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "permisos" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "permisos_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"codigo" text NOT NULL,
	"nombre" text NOT NULL,
	CONSTRAINT "permisos_codigo_unique" UNIQUE("codigo"),
	CONSTRAINT "permisos_nombre_unique" UNIQUE("nombre")
);
--> statement-breakpoint
CREATE TABLE "productos" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "productos_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"sku" text GENERATED ALWAYS AS (LPAD(id::TEXT, 7, '0')) STORED NOT NULL,
	"nombre" text NOT NULL,
	"descripcion" text,
	"max_dias_sin_reabastecer" integer,
	"stock_minimo" integer,
	"cantidad_minima_descuento" integer,
	"cantidad_gratis_descuento" integer,
	"porcentaje_descuento" integer,
	"path_foto" text,
	"color_id" integer NOT NULL,
	"categoria_id" integer NOT NULL,
	"marca_id" integer NOT NULL,
	"fecha_creacion" timestamp DEFAULT now() NOT NULL,
	"fecha_actualizacion" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "productos_sku_unique" UNIQUE("sku")
);
--> statement-breakpoint
CREATE TABLE "proformas_venta" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "proformas_venta_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" text,
	"total" numeric(12, 2) NOT NULL,
	"detalles" jsonb NOT NULL,
	"cliente_id" integer,
	"empleado_id" integer NOT NULL,
	"sucursal_id" integer NOT NULL,
	"fecha_creacion" timestamp DEFAULT now() NOT NULL,
	"fecha_actualizacion" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reservas_productos" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "reservas_productos_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"descripcion" text,
	"detalles_reserva" jsonb NOT NULL,
	"monto_adelantado" numeric(12, 2) NOT NULL,
	"fecha_recojo" date,
	"cliente_id" integer NOT NULL,
	"sucursal_id" integer,
	"fecha_creacion" timestamp DEFAULT now() NOT NULL,
	"fecha_actualizacion" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roles_permisos" (
	"rol_id" integer NOT NULL,
	"permiso_id" integer NOT NULL,
	CONSTRAINT "roles_permisos_rol_id_permiso_id_pk" PRIMARY KEY("rol_id","permiso_id")
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "roles_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"codigo" text NOT NULL,
	"nombre" text NOT NULL,
	CONSTRAINT "roles_codigo_unique" UNIQUE("codigo"),
	CONSTRAINT "roles_nombre_unique" UNIQUE("nombre")
);
--> statement-breakpoint
CREATE TABLE "sucursales" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sucursales_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" text NOT NULL,
	"direccion" text,
	"sucursal_central" boolean NOT NULL,
	"serie_factura" text,
	"numero_factura_inicial" integer DEFAULT 1,
	"serie_boleta" text,
	"numero_boleta_inicial" integer DEFAULT 1,
	"codigo_establecimiento" text,
	"tiene_notificaciones" boolean DEFAULT false NOT NULL,
	"fecha_creacion" timestamp DEFAULT now() NOT NULL,
	"fecha_actualizacion" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sucursales_serie_factura_unique" UNIQUE("serie_factura"),
	CONSTRAINT "sucursales_serie_boleta_unique" UNIQUE("serie_boleta"),
	CONSTRAINT "sucursales_codigo_establecimiento_unique" UNIQUE("codigo_establecimiento")
);
--> statement-breakpoint
CREATE TABLE "tipos_doc_facturacion" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tipos_doc_facturacion_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" text NOT NULL,
	"codigo_sunat" text NOT NULL,
	"codigo" text NOT NULL,
	CONSTRAINT "tipos_doc_facturacion_nombre_unique" UNIQUE("nombre"),
	CONSTRAINT "tipos_doc_facturacion_codigo_sunat_unique" UNIQUE("codigo_sunat")
);
--> statement-breakpoint
CREATE TABLE "tipos_documento_cliente" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tipos_documento_cliente_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" text NOT NULL,
	"codigo_sunat" text NOT NULL,
	"codigo" text NOT NULL,
	CONSTRAINT "tipos_documento_cliente_nombre_unique" UNIQUE("nombre"),
	CONSTRAINT "tipos_documento_cliente_codigo_sunat_unique" UNIQUE("codigo_sunat"),
	CONSTRAINT "tipos_documento_cliente_codigo_unique" UNIQUE("codigo")
);
--> statement-breakpoint
CREATE TABLE "tipos_tax" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tipos_tax_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" text NOT NULL,
	"codigo_sunat" text NOT NULL,
	"porcentaje" integer NOT NULL,
	"codigo" text NOT NULL,
	CONSTRAINT "tipos_tax_nombre_unique" UNIQUE("nombre"),
	CONSTRAINT "tipos_tax_codigo_sunat_unique" UNIQUE("codigo_sunat")
);
--> statement-breakpoint
CREATE TABLE "totales_venta" (
	"venta_id" integer PRIMARY KEY NOT NULL,
	"total_gravadas" numeric(12, 2) NOT NULL,
	"total_exoneradas" numeric(12, 2) NOT NULL,
	"total_gratuitas" numeric(12, 2) NOT NULL,
	"total_tax" numeric(12, 2) NOT NULL,
	"total_venta" numeric(12, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transferencias_inventarios" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "transferencias_inventarios_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"estado_transferencia_id" integer NOT NULL,
	"sucursal_origen_id" integer,
	"sucursal_destino_id" integer NOT NULL,
	"salida_origen" timestamp,
	"llegada_destino" timestamp,
	"modificable" boolean DEFAULT true NOT NULL,
	"fecha_creacion" timestamp DEFAULT now() NOT NULL,
	"fecha_actualizacion" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ventas" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "ventas_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"observaciones" text,
	"tipo_operacion" text DEFAULT '0101' NOT NULL,
	"porcentaje_venta" integer DEFAULT 18 NOT NULL,
	"tipo_documento_id" integer NOT NULL,
	"serie_documento" text NOT NULL,
	"numero_documento" text NOT NULL,
	"moneda_id" integer NOT NULL,
	"metodo_pago_id" integer NOT NULL,
	"cliente_id" integer NOT NULL,
	"empleado_id" integer NOT NULL,
	"sucursal_id" integer NOT NULL,
	"fecha_emision" date NOT NULL,
	"hora_emision" time NOT NULL,
	"declarada" boolean DEFAULT false NOT NULL,
	"anulada" boolean DEFAULT false NOT NULL,
	"cancelada" boolean DEFAULT false NOT NULL,
	"motivo_anulado" text,
	"fecha_creacion" timestamp DEFAULT now() NOT NULL,
	"fecha_actualizacion" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ventas_serie_documento_numero_documento_unique" UNIQUE("serie_documento","numero_documento")
);
--> statement-breakpoint
ALTER TABLE "archivos_app" ADD CONSTRAINT "archivos_app_userId_cuentas_empleados_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."cuentas_empleados"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_tipo_documento_id_tipos_documento_cliente_id_fk" FOREIGN KEY ("tipo_documento_id") REFERENCES "public"."tipos_documento_cliente"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cuentas_empleados" ADD CONSTRAINT "cuentas_empleados_rol_id_roles_id_fk" FOREIGN KEY ("rol_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cuentas_empleados" ADD CONSTRAINT "cuentas_empleados_empleado_id_empleados_id_fk" FOREIGN KEY ("empleado_id") REFERENCES "public"."empleados"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "detalles_producto" ADD CONSTRAINT "detalles_producto_producto_id_productos_id_fk" FOREIGN KEY ("producto_id") REFERENCES "public"."productos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "detalles_producto" ADD CONSTRAINT "detalles_producto_sucursal_id_sucursales_id_fk" FOREIGN KEY ("sucursal_id") REFERENCES "public"."sucursales"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "detalles_venta" ADD CONSTRAINT "detalles_venta_tipo_tax_id_tipos_tax_id_fk" FOREIGN KEY ("tipo_tax_id") REFERENCES "public"."tipos_tax"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "detalles_venta" ADD CONSTRAINT "detalles_venta_venta_id_ventas_id_fk" FOREIGN KEY ("venta_id") REFERENCES "public"."ventas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "docs_facturacion" ADD CONSTRAINT "docs_facturacion_estado_id_estados_doc_facturacion_id_fk" FOREIGN KEY ("estado_id") REFERENCES "public"."estados_doc_facturacion"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "docs_facturacion" ADD CONSTRAINT "docs_facturacion_venta_id_ventas_id_fk" FOREIGN KEY ("venta_id") REFERENCES "public"."ventas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "empleados" ADD CONSTRAINT "empleados_sucursal_id_sucursales_id_fk" FOREIGN KEY ("sucursal_id") REFERENCES "public"."sucursales"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entradas_inventarios" ADD CONSTRAINT "entradas_inventarios_producto_id_productos_id_fk" FOREIGN KEY ("producto_id") REFERENCES "public"."productos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entradas_inventarios" ADD CONSTRAINT "entradas_inventarios_sucursal_id_sucursales_id_fk" FOREIGN KEY ("sucursal_id") REFERENCES "public"."sucursales"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fotos_producto" ADD CONSTRAINT "fotos_producto_producto_id_productos_id_fk" FOREIGN KEY ("producto_id") REFERENCES "public"."productos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items_transferencia_inventario" ADD CONSTRAINT "items_transferencia_inventario_producto_id_productos_id_fk" FOREIGN KEY ("producto_id") REFERENCES "public"."productos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items_transferencia_inventario" ADD CONSTRAINT "items_transferencia_inventario_transferencia_inventario_id_transferencias_inventarios_id_fk" FOREIGN KEY ("transferencia_inventario_id") REFERENCES "public"."transferencias_inventarios"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notificaciones" ADD CONSTRAINT "notificaciones_sucursal_id_sucursales_id_fk" FOREIGN KEY ("sucursal_id") REFERENCES "public"."sucursales"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "productos" ADD CONSTRAINT "productos_color_id_colores_id_fk" FOREIGN KEY ("color_id") REFERENCES "public"."colores"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "productos" ADD CONSTRAINT "productos_categoria_id_categorias_id_fk" FOREIGN KEY ("categoria_id") REFERENCES "public"."categorias"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "productos" ADD CONSTRAINT "productos_marca_id_marcas_id_fk" FOREIGN KEY ("marca_id") REFERENCES "public"."marcas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proformas_venta" ADD CONSTRAINT "proformas_venta_cliente_id_clientes_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proformas_venta" ADD CONSTRAINT "proformas_venta_empleado_id_empleados_id_fk" FOREIGN KEY ("empleado_id") REFERENCES "public"."empleados"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proformas_venta" ADD CONSTRAINT "proformas_venta_sucursal_id_sucursales_id_fk" FOREIGN KEY ("sucursal_id") REFERENCES "public"."sucursales"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reservas_productos" ADD CONSTRAINT "reservas_productos_cliente_id_clientes_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reservas_productos" ADD CONSTRAINT "reservas_productos_sucursal_id_sucursales_id_fk" FOREIGN KEY ("sucursal_id") REFERENCES "public"."sucursales"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roles_permisos" ADD CONSTRAINT "roles_permisos_rol_id_roles_id_fk" FOREIGN KEY ("rol_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roles_permisos" ADD CONSTRAINT "roles_permisos_permiso_id_permisos_id_fk" FOREIGN KEY ("permiso_id") REFERENCES "public"."permisos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "totales_venta" ADD CONSTRAINT "totales_venta_venta_id_ventas_id_fk" FOREIGN KEY ("venta_id") REFERENCES "public"."ventas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transferencias_inventarios" ADD CONSTRAINT "transferencias_inventarios_estado_transferencia_id_estados_transferencias_inventarios_id_fk" FOREIGN KEY ("estado_transferencia_id") REFERENCES "public"."estados_transferencias_inventarios"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transferencias_inventarios" ADD CONSTRAINT "transferencias_inventarios_sucursal_origen_id_sucursales_id_fk" FOREIGN KEY ("sucursal_origen_id") REFERENCES "public"."sucursales"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transferencias_inventarios" ADD CONSTRAINT "transferencias_inventarios_sucursal_destino_id_sucursales_id_fk" FOREIGN KEY ("sucursal_destino_id") REFERENCES "public"."sucursales"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_tipo_documento_id_tipos_doc_facturacion_id_fk" FOREIGN KEY ("tipo_documento_id") REFERENCES "public"."tipos_doc_facturacion"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_moneda_id_monedas_facturacion_id_fk" FOREIGN KEY ("moneda_id") REFERENCES "public"."monedas_facturacion"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_metodo_pago_id_metodos_pago_id_fk" FOREIGN KEY ("metodo_pago_id") REFERENCES "public"."metodos_pago"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_cliente_id_clientes_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_empleado_id_empleados_id_fk" FOREIGN KEY ("empleado_id") REFERENCES "public"."empleados"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_sucursal_id_sucursales_id_fk" FOREIGN KEY ("sucursal_id") REFERENCES "public"."sucursales"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "detalles_producto_precio_compra_idx" ON "detalles_producto" USING btree ("precio_compra");--> statement-breakpoint
CREATE INDEX "detalles_producto_precio_venta_idx" ON "detalles_producto" USING btree ("precio_venta");--> statement-breakpoint
CREATE INDEX "detalles_producto_precio_oferta_idx" ON "detalles_producto" USING btree ("precio_oferta");--> statement-breakpoint
CREATE INDEX "detalles_producto_precio_stock_idx" ON "detalles_producto" USING btree ("stock");--> statement-breakpoint
CREATE INDEX "productos_nombre_idx" ON "productos" USING btree ("nombre");--> statement-breakpoint
CREATE UNIQUE INDEX "productos_sku_idx" ON "productos" USING btree ("sku");--> statement-breakpoint
CREATE INDEX "productos_fecha_creacion_idx" ON "productos" USING btree ("fecha_creacion");--> statement-breakpoint
CREATE INDEX "productos_color_id_idx" ON "productos" USING btree ("color_id");--> statement-breakpoint
CREATE INDEX "productos_categoria_id_idx" ON "productos" USING btree ("categoria_id");--> statement-breakpoint
CREATE INDEX "productos_marca_id_idx" ON "productos" USING btree ("marca_id");