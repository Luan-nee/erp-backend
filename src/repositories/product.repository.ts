// src/repositories/product.repository.ts
import { db } from "../config/db.config";
import { Product } from "../models/product.model";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class ProductRepository {
  async findAll(): Promise<Product[]> {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM productos;");
    // El casting es necesario porque 'rows' es un array genérico de RowDataPacket
    return rows as Product[];
  }

  async findById(id: number): Promise<Product | null> {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM productos WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return null;
    }
    return rows[0] as Product;
  }

  async create(product: Omit<Product, "id">): Promise<number> {
    const [result] = await db.execute<ResultSetHeader>(
      "INSERT INTO products (name, price, description) VALUES (?, ?, ?)",
      [product.name, product.price, product.description]
    );
    // Retorna el ID del producto insertado
    return result.insertId;
  }
}

const reuslta = {
  status: 200,
};
