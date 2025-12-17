CREATE VIEW `vw_categorias` AS
SELECT categorias.id,
    categorias.nombre,
    categorias.descripcion,
    COUNT(productos.categoria_id) AS 'cantidad_productos'
FROM categorias
LEFT JOIN productos ON categorias.id = productos.categoria_id
GROUP BY categorias.id, categorias.nombre, categorias.descripcion;



CREATE VIEW `erp_app`.`vw_marcas` AS
SELECT 
    marcas.id AS `id`,
    marcas.nombre AS `nombre`,
    marcas.descripcion AS `descripcion`,
    COUNT(marcas.id) AS `cantidad_productos`
FROM
    (`erp_app`.`marcas`
JOIN `erp_app`.`productos` ON ((`erp_app`.`marcas`.`id` = `erp_app`.`productos`.`marca_id`)))
GROUP BY `erp_app`.`marcas`.`id` , `erp_app`.`marcas`.`nombre` , `erp_app`.`marcas`.`descripcion`