INSERT INTO `sucursales` 
    (`nombre`, `direccion`, `serie_factura`, `numero_factura_inicial`, `serie_boleta`, `numero_boleta_inicial`, `codigo_anexo`, `tipo_sucursal`) 
VALUES
-- Sucursal Central (ID 1)
('Sucursal Central', 'Av. Principal #123, Ciudad A', 'F001', 1, 'B001', 1, '0001', 'central'),
-- Sucursal Norte (ID 2)
('Sucursal Norte', 'Calle del Sol #45, Zona Norte', 'F002', 1, 'B002', 1, '0002', 'sucursal'),
-- Sucursal Sur (ID 3)
('Sucursal Sur', 'Blvd. Las Flores #67, Colonia Sur', 'F003', 1, 'B003', 1, '0003', 'sucursal');