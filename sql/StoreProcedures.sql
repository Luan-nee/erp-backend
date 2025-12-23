DELIMITER //
	CREATE PROCEDURE sp_eliminar_categoria(IN p_id_categoria INT)
	BEGIN
			IF p_id_categoria <> 1 THEN
					UPDATE productos 
					SET categoria_id = 5 
					WHERE categoria_id = p_id_categoria;

					DELETE FROM categorias 
					WHERE id = p_id_categoria;					
			END IF;
	END //
DELIMITER ;

DELIMITER //
	CREATE PROCEDURE sp_eliminar_marca(IN p_id_marca INT)
	BEGIN
			IF p_id_marca <> 1 THEN
					UPDATE productos 
					SET marca_id = 1 
					WHERE marca_id = p_id_marca;

					DELETE FROM marcas 
					WHERE id = p_id_marca;					
			END IF;
	END //
DELIMITER ;

DELIMITER //
	CREATE PROCEDURE sp_eliminar_producto(IN p_id_producto INT)
	BEGIN
		UPDATE productos SET estado = FALSE WHERE productos.id = p_id_producto;
		UPDATE detalles_producto SET esta_inhabilitado = TRUE WHERE detalles_producto.producto_id = p_id_producto;
	END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_registrar_producto_global(
    IN p_nombre VARCHAR(255),
    IN p_descripcion TEXT,
    IN p_precio_compra DECIMAL(12,2),
    IN p_color_id INT,
    IN p_categoria_id INT,
    IN p_marca_id INT,
    IN p_porcentaje_ganancia DECIMAL(5,4),
    IN p_stock INT,
    IN p_stock_minimo INT
)
BEGIN
    DECLARE v_producto_id INT;
    DECLARE v_nuevo_sku VARCHAR(7);

    -- Manejo de errores
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

        -- 1. Registrar el producto (dejamos el SKU vacío momentáneamente)
        INSERT INTO productos (
            sku, nombre, descripcion, path_foto, 
            precio_compra, color_id, categoria_id, marca_id
        ) VALUES (
            '', p_nombre, p_descripcion, '', 
            p_precio_compra, p_color_id, p_categoria_id, p_marca_id
        );

        -- 2. Obtener el ID generado
        SET v_producto_id = LAST_INSERT_ID();

        -- 3. Generar el SKU formateado (P + ceros a la izquierda hasta completar 7 caracteres)
        -- LPAD(v_producto_id, 6, '0') convierte el ID 1 en '000001'
        SET v_nuevo_sku = CONCAT('P', LPAD(v_producto_id, 6, '0'));

        -- 4. Actualizar el producto con su nuevo SKU
        UPDATE productos SET sku = v_nuevo_sku WHERE id = v_producto_id;

        -- 5. Registrar en "detalles_producto" para todas las sucursales
        INSERT INTO detalles_producto (
            porcentaje_ganancia, 
            stock, 
            stock_minimo, 
            esta_inhabilitado,
            producto_id, 
            sucursal_id
        )
        SELECT 
            p_porcentaje_ganancia, 
            p_stock, 
            p_stock_minimo, 
            TRUE, 
            v_producto_id, 
            id
        FROM sucursales;

    COMMIT;
    
    -- Devolver información del registro
    SELECT v_producto_id AS nuevo_producto_id;
END //
DELIMITER ;