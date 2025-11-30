USE `erp_app`;

-- tipos_tax
INSERT INTO `tipos_tax` (nombre, codigo_sunat, porcentaje_tax) VALUES
('Gravado - Operación Onerosa', '10', 0.18),
('Exonerado - Operación Onerosa', '20', 0),
('Exonerado - Transferencia gratuita', '21', 0),
('Inafecto - Operación Onerosa', '30', 0),
('Exportación de Bienes o Servicios', '40', 0);

-- estados_doc_facturacion
INSERT INTO `estados_doc_facturacion` (codigo, nombre) VALUES
('01', 'Registrado en servidor factpro (Se puede editar el comprobante)'),
('03', 'Enviado pero sin respuesta de la sunat'),
('05', 'Aceptado ante la sunat'),
('09', 'Rechazado ante la sunat'),
('11', 'Anulado ante la sunat'),
('13', 'Por anular'),
('19', 'Sin respuesta de la sunat');

-- tipos_doc_facturacion
INSERT INTO `tipos_doc_facturacion` (`nombre`) VALUES 
('boleta'), 
('factura');

-- metodos_pago
INSERT INTO `metodos_pago` (`nombre`, `estaActivado`) VALUES 
('Yape', FALSE),
('Plin', FALSE);

-- colores
INSERT INTO `colores` (nombre, valor) VALUES
('Rojo', 'bg-red-600'),
('Azul', 'bg-blue-600'),
('Verde', 'bg-green-600');
('Amarillo', 'bg-yellow-600'),
('Naranja', 'bg-orange-600'),
('Morado', 'bg-purple-600'),
('Rosa', 'bg-pink-400'),
('Negro', 'bg-black'),
('Blanco', 'bg-white'),
('Celeste', 'bg-cyan-400');

-- categorias 
INSERT INTO `categorias` (nombre, descripcion) VALUES
('Electrónica', 'Dispositivos y accesorios tecnológicos como laptops, móviles y audífonos.'),
('Ropa y Moda', 'Artículos de vestimenta, calzado y accesorios personales.'),
('Hogar y Jardín', 'Muebles, decoración, herramientas y artículos para el cuidado del hogar y exteriores.'),
('Libros y Medios', 'Ficción, no ficción, revistas y contenido multimedia digital o físico.');

-- marcas
INSERT INTO `marcas` (nombre, descripcion) VALUES
('TechNova', 'Líder en innovación de hardware y software para el mercado global.'),
('FashionTrend', 'Marca especializada en ropa urbana, calzado y accesorios de alta calidad.'),
('HomeBliss', 'Ofrece soluciones prácticas y estéticas para la decoración y organización del hogar.'),
('GourmetDelight', 'Empresa de alimentos premium, especializada en productos orgánicos y delicatessen.');

-- estados_transferencias_inventarios
INSERT INTO `estados_transferencias_inventarios` (`nombre`) VALUES 
('Solicitando'),
('Finalizada'),
('Rechazado');

-- sucursales
INSERT INTO `sucursales` (nombre, direccion, serie_factura, numero_factura_inicial, serie_boleta, numero_boleta_inicial, codigo_anexo) VALUES
('Sucursal Central', 'Av. Principal #123, Ciudad A', 'F001', 1, 'B001', 1, 'SCENT'),
('Sucursal Norte', 'Calle del Sol #45, Zona Norte', 'F002', 1, 'B002', 1, 'SNORT'),
('Sucursal Sur', 'Blvd. Las Flores #67, Colonia Sur', 'F003', 1, 'B003', 1, 'SSUR');

-- 
INSERT INTO `permisos` (codigo, nombre) VALUES
('VIEW_DASH', 'Ver Dashboard'),
('MANAGE_USERS', 'Gestionar Usuarios'),
('EDIT_PRODUCTS', 'Editar Productos'),
('VIEW_REPORTS', 'Ver Reportes Financieros'),
('CREATE_INVOICE', 'Crear Facturas'),
('ANULAR_DOC', 'Anular Documentos');

-- 
INSERT INTO `roles` (codigo, nombre) VALUES
('ADMIN', 'Administrador del Sistema'),
('EMPLOYEE', 'Empleado de Ventas'),
('MANAGER', 'Gerente de Sucursal'),
('ACCOUNTANT', 'Contador');

-- 
INSERT INTO `roles_permisos` (rol_id, permiso_id) VALUES
-- Permisos para Administrador (rol_id = 1)
(1, (SELECT id FROM permisos WHERE codigo = 'VIEW_DASH')),
(1, (SELECT id FROM permisos WHERE codigo = 'MANAGE_USERS')),
(1, (SELECT id FROM permisos WHERE codigo = 'EDIT_PRODUCTS')),
(1, (SELECT id FROM permisos WHERE codigo = 'VIEW_REPORTS')),
(1, (SELECT id FROM permisos WHERE codigo = 'CREATE_INVOICE')),
(1, (SELECT id FROM permisos WHERE codigo = 'ANULAR_DOC')),

-- Permisos para Empleado de Ventas (rol_id = 2)
(2, (SELECT id FROM permisos WHERE codigo = 'VIEW_DASH')),
(2, (SELECT id FROM permisos WHERE codigo = 'CREATE_INVOICE')),
(2, (SELECT id FROM permisos WHERE codigo = 'ANULAR_DOC')),

-- Permisos para Gerente de Sucursal (rol_id = 3)
(3, (SELECT id FROM permisos WHERE codigo = 'VIEW_DASH')),
(3, (SELECT id FROM permisos WHERE codigo = 'MANAGE_USERS')),
(3, (SELECT id FROM permisos WHERE codigo = 'VIEW_REPORTS')),

-- Permisos para Contador (rol_id = 4)
(4, (SELECT id FROM permisos WHERE codigo = 'VIEW_DASH')),
(4, (SELECT id FROM permisos WHERE codigo = 'VIEW_REPORTS'));


INSERT INTO `tipos_documento_cliente` (codigo_sunat, descripction) VALUES
('1', 'Otros'),
('2', 'DNI'),
('3', 'CE'),
('4', 'RUC'),
('5', 'Pasaporte');

