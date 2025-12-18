DELIMITER //
  CREATE PROCEDURE sp_eliminar_categoria(IN p_id_categoria INT)
  BEGIN
      UPDATE productos
      SET categoria_id = 1
      WHERE categoria_id = p_id_categoria;
      
      DELETE FROM categorias
      WHERE id = p_id_categoria;
  END //
DELIMITER ;