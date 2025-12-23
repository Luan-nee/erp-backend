import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../models/api-response.model";
import type { Color } from "../models/color.model";
import { ColorService } from "../services/color.service";

const colorService = new ColorService();

export default class ColorController {
  async select(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const colors = await colorService.select();
      const responseBody: ApiResponse<Color[]> = {
        status: 200,
        message: "Colores obtenidos exitosamente.",
        info: colors,
      };
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  async getAllColors(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const colors = await colorService.getAllColors();
      const responseBody: ApiResponse<Color[]> = {
        status: 200,
        message: "Colores obtenidos exitosamente.",
        info: colors,
      };
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  async getColorById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const color = await colorService.getColorById(id);
      const responseBody: ApiResponse<Color | null> = {
        status: 200,
        message: `Color con ID ${id} obtenido exitosamente.`,
        info: color,
      };
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }
}