import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../models/api-response.model"
import SucursalService from '../services/sucursal.service';
import type { Sucursal, SucursalSelect } from "../models/sucursal.model";

const sucursalService = new SucursalService();

export default class SucursalController {
  async getSucursales(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sucursales = await sucursalService.getAllSucursales();
      const responseBody: ApiResponse<SucursalSelect[]> = {
        status: 200,
        message: "Lista de sucursales recuperada exitosamente.",
        info: sucursales,
      };
      res.status(200).json(responseBody);
    }catch (error) {
      next(error);
    }
  }

  async getSucursalById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idSucursal = Number(req.params.id_sucursal);

      if (isNaN(idSucursal)) {
        res.status(400).json({
          status: 400,
          message: "El ID de la sucursal debe ser un número válido.",
        });
        return;
      }

      const sucursal = await sucursalService.getSucursalById(idSucursal);
      const responseBody: ApiResponse<Sucursal> = {
        status: 200,
        message: `Sucursal con ID ${idSucursal} obtenida exitosamente.`,
        info: sucursal,
      };
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }
}