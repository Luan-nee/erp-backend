CREATE VIEW `vw_categorias` AS
SELECT categorias.id,
       categorias.nombre,
       categorias.descripcion,
       COUNT(categorias.id) AS 'cantidad_productos'
FROM categorias
JOIN productos ON categorias.id = productos.categoria_id
GROUP BY categorias.id, categorias.nombre, categorias.descripcion;