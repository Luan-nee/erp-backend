-- ADMINISTRADORES 
INSERT INTO `usuarios` (`nombres`, `apellidos`, `dni`, `estaActivo`, `celular`, `hora_inicio_jornada`, `hora_fin_jornada`, `sueldo`, `sucursal_id`) VALUES
('Luan Del Sol', 'Huillca Sanchez', '44556677J', true, '987654321', '08:00:00', '17:00:00', 2500.00, 1),
('Erick Davisson', 'Huaracha Yabar', '55667788K', true, '987654322', '09:00:00', '18:00:00', 2800.50, 1),
('Christian Smith', 'Gonzales Condori', '66778899L', true, '987654323', '07:00:00', '16:00:00', 3000.00, 1);

-- EMPLEADOS en Sucursal (local central) ID: 1
INSERT INTO `usuarios` (`nombres`, `apellidos`, `dni`, `estaActivo`, `celular`, `hora_inicio_jornada`, `hora_fin_jornada`, `sueldo`, `sucursal_id`) VALUES
('Juan Carlos', 'Pérez García', '12345678A', true, '600111222', '08:00:00', '16:00:00', 1500.50, 1),
('María José', 'López Martínez', '23456789B', true, '600222333', '09:00:00', '17:00:00', 1650.00, 1);

-- EMPLEADOS en Sucursal ID: 2
INSERT INTO `usuarios` (`nombres`, `apellidos`, `dni`, `estaActivo`, `celular`, `hora_inicio_jornada`, `hora_fin_jornada`, `sueldo`, `sucursal_id`) VALUES
('Elena', 'Torres Ruiz', '45678901D', true, '600444555', '07:30:00', '15:30:00', 1800.00, 2),
('Ricardo', 'Sánchez Luna', '56789012E', true, '600555666', '10:00:00', '18:00:00', 1550.75, 2);

-- EMPLEADOS en Sucursal ID: 3
INSERT INTO `usuarios` (`nombres`, `apellidos`, `dni`, `estaActivo`, `celular`, `hora_inicio_jornada`, `hora_fin_jornada`, `sueldo`, `sucursal_id`) VALUES
('Roberto', 'Díaz Castro', '78901234G', true, '600777888', '08:30:00', '16:30:00', 1450.00, 3),
('Ana Belén', 'Molina Ortiz', '89012345H', false, '600888999', '12:00:00', '20:00:00', 1700.25, 3);

-- sigue el patrón
INSERT INTO `cuentas_usuario` (usuario, clave, eliminable, rol_id, usuario_id) VALUES 
('luan', 'luan123', FALSE, 1, 1),
('erick', 'erick123', FALSE, 1, 2),
('christian', 'christian123', FALSE, 1, 3)
('juan', 'juan123', TRUE, 2, 4),
('maria', 'maria123', TRUE, 3, 5),
('elena', 'elena123', TRUE, 2, 6),
('ricardo', 'ricardo123', TRUE, 3, 7),
('roberto', 'roberto123', TRUE, 2, 8),
('ana', 'ana123', TRUE, 3, 9);