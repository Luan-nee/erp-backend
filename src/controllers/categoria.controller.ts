import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../models/api-response.model";
import type { Categoria, CategoriaCreate, CategoriaSelect, ResumenCategoria } from "../models/categoria.model";
import { CategoriaService } from "../services/categoria.service";

const categoriaService = new CategoriaService();

export class CategoriaController {
  async getCategorias(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categorias = await categoriaService.getCategorias();
      const responseBody: ApiResponse<CategoriaSelect[]> = {
        status: 200,
        message: "Lista de categorías recuperada exitosamente.",
        info: categorias,
      };
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  async getResumenCategorias(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const resumen = await categoriaService.getResumenCategorias();
      const responseBody: ApiResponse<ResumenCategoria> = {
        status: 200,
        message: "Resumen de categorías obtenido exitosamente.",
        info: resumen,
      };
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  async getCategoriaById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const categoria = await categoriaService.getCategoriasById(id);
      const responseBody: ApiResponse<Categoria> = {
        status: 200,
        message: `Categoria con ID ${id} obtenida exitosamente.`,
        info: categoria,
      };
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  async createCategoria(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categoriaData: CategoriaCreate = req.body;
      const newCategoriaId = await categoriaService.create(categoriaData);
      const responseBody: ApiResponse<number> = {
        status: 201,
        message: `Categoría creada exitosamente, su id es ${newCategoriaId}.`,
        info: newCategoriaId,
      };
      res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  async updateCategoria(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const newCategoriaData = req.body;
      await categoriaService.update(id, newCategoriaData);
      const responseBody: ApiResponse<null> = {
        status: 200,
        message: `Categoría con ID ${id} actualizada exitosamente.`,
        info: null,
      };
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  async deleteCategoria(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      await categoriaService.delete(id);
      const responseBody: ApiResponse<null> = {
        status: 200,
        message: `Categoría con ID ${id} eliminada exitosamente.`,
        info: null,
      };
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }
}