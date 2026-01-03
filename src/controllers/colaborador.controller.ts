import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../models/api-response.model";
import type { Colaborador, resumenColaboradores } from "../models/colaboradores.model";
import ColaboradorService from "../services/colaborador.service";

const colaboradorService = new ColaboradorService();

export default class ColaboradorController {

  async select(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const colaboradores = await colaboradorService.select();
      const responseBody: ApiResponse<Colaborador[] | null> = {
        status: 200,
        message: "Lista de colaboradores recuperada exitosamente.",
        info: colaboradores,
      };
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  async resumenColaboradores(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const resumen = await colaboradorService.resumenColaboradores();
      const responseBody: ApiResponse<resumenColaboradores | null> = {
        status: 200,
        message: "Resumen de colaboradores recuperado exitosamente.",
        info: resumen,
      };
      res.status(200).json(responseBody);
    }
    catch (error) {
      next(error);
    }
  }
}