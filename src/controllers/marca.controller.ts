import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../models/api-response.model";
import type { Marca, MarcaCreate, MarcaSelect, ResumenMarca, MarcaUpdate } from "../models/marca.model";
import { MarcaService } from "../services/marca.service";

const marcaService = new MarcaService();

export class MarcaController {
  async select(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
      const marcas = await marcaService.select();
      const responseBody: ApiResponse<Marca[]> = {
        status: 200,
        message: "Lista de marcas recuperada exitosamente.",
        info: marcas,
      };
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  async getMarcas(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const marcas = await marcaService.getMarcas();
      const responseBody: ApiResponse<MarcaSelect[]> = {
        status: 200,
        message: "Lista de marcas recuperada exitosamente.",
        info: marcas,
      };
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  async getResumenMarcas(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const resumen = await marcaService.getResumenMarcas();
      const responseBody: ApiResponse<ResumenMarca> = {
        status: 200,
        message: "Resumen de marcas obtenido exitosamente.",
        info: resumen,
      };
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  async getMarcaById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const marca = await marcaService.getMarcaById(id);
      const responseBody: ApiResponse<Marca> = {
        status: 200,
        message: `Marca con ID ${id} obtenida exitosamente.`,
        info: marca,
      };
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  async createMarca(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const marcaData: MarcaCreate = req.body;
      const newMarcaId = await marcaService.create(marcaData);
      const responseBody: ApiResponse<number> = {
        status: 201,
        message: `Marca creada exitosamente, su id es ${newMarcaId}.`,
        info: newMarcaId,
      };
      res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  async updateMarca(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const newMarcaData: MarcaUpdate = req.body;
      await marcaService.update(id, newMarcaData);
      const responseBody: ApiResponse<null> = {
        status: 200,
        message: `Marca con ID ${id} actualizada exitosamente.`,
        info: null,
      };
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  async deleteMarca(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      await marcaService.delete(id);
      const responseBody: ApiResponse<null> = {
        status: 200,
        message: `Marca con ID ${id} eliminada exitosamente.`,
        info: null,
      };
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }
}