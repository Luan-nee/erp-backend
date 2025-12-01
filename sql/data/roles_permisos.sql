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