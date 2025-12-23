// src/repositories/product.repository.ts
import { db } from "../config/db.config";
import { ProductCreateMain, ResumenProductos, ProductoSelect, DetallesProductoCreate, ProductoCreate, ProductoSelectById, ProductoUpdate, DetalleProductoUpdate } from "../models/producto.model";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class ProductosRepository {
  static async ProductoExists(idProducto: number): Promise<boolean> {
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT id FROM productos WHERE id = ? LIMIT 1;`,
      [idProducto]
    );
    return rows.length > 0;
  }

  async findAll(idSucursal: number): Promise<ProductoSelect[] | null> {
    const [rows] = await db.query<RowDataPacket[]>(
      `
        SELECT
              p.id,
              p.sku,
              p.nombre,
              p.descripcion,
              dp.stock,
              dp.stock_minimo,
              dp.porcentaje_ganancia,
              dp.esta_inhabilitado
          FROM
              productos AS p
          JOIN
              detalles_producto AS dp ON p.id = dp.producto_id
          WHERE
              dp.sucursal_id = ?;
      `,
      [idSucursal]
    );

    if (rows.length === 0) {
      return null;
    }

    // El casting es necesario porque 'rows' es un array genérico de RowDataPacket
    return rows as ProductoSelect[];
  }

  async findById(idProduct: number, idSucursal: number): Promise<ProductoSelectById | null> {
    // El "id" hace referencia al ID del producto que está almacenado dentro de la tabla "productos"
    // y el "idSucursal" hace referencia al ID de la sucursal dentro de la tabla "detalles_producto"

    const [rows] = await db.query<RowDataPacket[]>(
      `
        SELECT
          p.id,
          p.sku,
          p.nombre,
          p.descripcion,
          p.precio_compra,
          p.categoria_id,
          p.color_id,
          p.marca_id,
          p.fecha_creacion,
          dp.stock,
          dp.stock_minimo,
          dp.porcentaje_ganancia,
          dp.esta_inhabilitado,
          dp.fecha_actualizacion
        FROM
          productos AS p
        JOIN
          detalles_producto AS dp ON p.id = dp.producto_id
        WHERE dp.sucursal_id = ? AND p.id = ?;  
      `,
      [idSucursal, idProduct]
    );

    if (rows.length === 0) {
      return null;
    }
    // El casting es necesario porque 'rows' es un array genérico de RowDataPacket
    return rows[0] as ProductoSelectById;
  }

  async getResumenProductos(idSucursal: number): Promise<ResumenProductos | null> {
    const [rows] = await db.query<RowDataPacket[]>(
      `
        SELECT 
          COUNT(*) AS total_productos,
          SUM(CASE WHEN esta_inhabilitado = FALSE THEN 1 ELSE 0 END) AS activos,
          SUM(CASE WHEN esta_inhabilitado = TRUE THEN 1 ELSE 0 END) AS inhabilitados
        FROM detalles_producto 
        WHERE sucursal_id = ?;
      `,
      [idSucursal]
    );

    if (rows.length === 0) return null;
    return rows[0] as ResumenProductos;
  }

  async createProducto(producto: ProductCreateMain): Promise<number> {
    const [result] = await db.execute<any[]>(
      `CALL sp_registrar_producto_global(?,?,?,?,?,?,?,?,?);`,
      [producto.nombre, producto.descripcion, producto.precio_compra, producto.color_id, producto.categoria_id, producto.marca_id, producto.porcentaje_ganancia, producto.stock, producto.stock_minimo]
    );
    // Retorna el ID del producto insertado
    const nuevoId = result[0][0].nuevo_producto_id;
    return nuevoId;
  }

  async updateProducto(idProducto: number, producto: ProductoUpdate): Promise<number> {
    const [result] = await db.execute<ResultSetHeader>(
      `UPDATE productos SET nombre = ?, descripcion = ?, precio_compra = ?, categoria_id = ?, color_id = ?, marca_id = ? WHERE id = ?;`,
      [producto.nombre, producto.descripcion, producto.precio_compra, producto.categoria_id, producto.color_id, producto.marca_id, idProducto]
    );
    return result.affectedRows;
  }

  async updateDetalleProducto(idDetalleProducto: number, idSucursal: number, detalleProducto: DetalleProductoUpdate): Promise<number> {
    const [result] = await db.execute<ResultSetHeader>(
      `UPDATE detalles_producto SET porcentaje_ganancia = ?, stock = ?, stock_minimo = ?, esta_inhabilitado = ? WHERE producto_id = ? AND sucursal_id = ?;`,
      [detalleProducto.porcentaje_ganancia, detalleProducto.stock, detalleProducto.stock_minimo, detalleProducto.esta_inhabilitado, idDetalleProducto, idSucursal]
    );
    return result.affectedRows;
  }

  async deleteProducto(idProducto: number): Promise<number> {
    const [result] = await db.execute<ResultSetHeader>(
      `CALL sp_eliminar_producto(?);`,
      [idProducto]
    );
    return result.affectedRows;
  }

  // Inhabilitar el detalle del producto en una sucursal específica se puede entender como eliminar.
  async inhabilitarDetalleProducto(idDetalleProducto: number, idSucursal: number): Promise<number> {
    const [result] = await db.execute<ResultSetHeader>(
      `UPDATE detalles_producto SET esta_inhabilitado = true WHERE producto_id = ? AND sucursal_id = ?;`,
      [idDetalleProducto, idSucursal]
    );
    return result.affectedRows;
  }
}