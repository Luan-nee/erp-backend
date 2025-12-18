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