CREATE VIEW `vw_categorias` AS
SELECT categorias.id,
       categorias.nombre,
       categorias.descripcion,
       COUNT(categorias.id) AS 'cantidad_productos'
FROM categorias
JOIN productos ON categorias.id = productos.categoria_id
GROUP BY categorias.id, categorias.nombre, categorias.descripcion;



CREATE VIEW `erp_app`.`vw_marcas` AS
  SELECT 
      `erp_app`.`marcas`.`id` AS `id`,
      `erp_app`.`marcas`.`nombre` AS `nombre`,
      `erp_app`.`marcas`.`descripcion` AS `descripcion`,
      COUNT(`erp_app`.`marcas`.`id`) AS `cantidad_productos`
  FROM
      (`erp_app`.`marcas`
      JOIN `erp_app`.`productos` ON ((`erp_app`.`marcas`.`id` = `erp_app`.`productos`.`marca_id`)))
  GROUP BY `erp_app`.`marcas`.`id` , `erp_app`.`marcas`.`nombre` , `erp_app`.`marcas`.`descripcion`