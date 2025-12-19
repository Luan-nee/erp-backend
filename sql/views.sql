CREATE VIEW `vw_categorias` AS
SELECT 
    categorias.id AS `id`,
    categorias.nombre AS `nombre`,
    categorias.descripcion AS `descripcion`,
    COUNT(productos.categoria_id) AS 'cantidad_productos'
FROM categorias
LEFT JOIN productos ON categorias.id = productos.categoria_id
GROUP BY categorias.id, categorias.nombre, categorias.descripcion;



CREATE VIEW `vw_marcas` AS
SELECT 
    marcas.id AS `id`,
    marcas.nombre AS `nombre`,
    marcas.descripcion AS `descripcion`,
    COUNT(productos.marca_id) AS `cantidad_productos`
FROM marcas
LEFT JOIN productos ON marcas.id = productos.marca_id
GROUP BY marcas.id , marcas.nombre , marcas.descripcion;