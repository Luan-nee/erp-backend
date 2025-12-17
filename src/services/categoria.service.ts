import type { Categoria, CategoriaCreate, CategoriaSelect, CategoriaUpdate, ResumenCategoria } from "../models/categoria.model";
import { CategoriasRepository } from "../repositories/categorias.repository";

const categoriaRepository = new CategoriasRepository();

export class CategoriaService {
  async getCategorias(): Promise<CategoriaSelect[] | null> {
    const categorias = await categoriaRepository.findAll();

    if (!categorias) {
      const error: any = new Error(`No hay categorias.`);
      error.status = 204;
      throw error;
    }

    return categorias;
  }

  async getResumenCategorias(): Promise<ResumenCategoria | null> {
    const resumen = await categoriaRepository.resumenCategorias();
    if (!resumen) {
      const error: any = new Error(`No se pudo obtener el resumen de categorías.`);
      error.status = 500;
      throw error;
    }
    return resumen;
  }

  async getCategoriasById(id: number): Promise<Categoria | null> {
    const categoria = await categoriaRepository.findById(id);
    if (!categoria) {
      const error: any = new Error(`La categoría con ID ${id} no existe.`);
      error.status = 500;
      throw error;
    }
    return categoria;
  }

  async create(categoria: CategoriaCreate): Promise<number> {
    const id = await categoriaRepository.create(categoria);
    if (!categoria) {
      const error: any = new Error(`La categoría con ID ${id} no existe.`);
      error.status = 500;
      throw error;
    }
    return id;
  }

  async update(id: number, newCategoria: CategoriaUpdate): Promise<void> {
    const exists = await categoriaRepository.categoriaExists(id);
    if (!exists) {
      const error: any = new Error(`La categoría con ID ${id} no existe.`);
      error.status = 404;
      throw error;
    }
    await categoriaRepository.update(id, newCategoria);
  }

  async delete(id: number): Promise<void> {
    const exists = await categoriaRepository.categoriaExists(id);
    if (!exists) {
      const error: any = new Error(`La categoría con ID ${id} no existe.`);
      error.status = 404;
      throw error;
    }
    await categoriaRepository.delete(id);
  }
}