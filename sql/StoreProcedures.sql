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