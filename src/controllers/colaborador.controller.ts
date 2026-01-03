import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../models/api-response.model";
import type { Colaborador } from "../models/colaboradores.model";
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

}