import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../models/api-response.model";
import type { Colaborador, resumenColaboradores, DetallesColaborador, RegistraCredencialesColaborador, DetallesCredencialesColaborador, RegistrarColaborador } from "../models/colaboradores.model";
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

  async detallesColaborador(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id_colaborador);
      const detalles = await colaboradorService.detallesColaborador(id);
      const responseBody: ApiResponse<DetallesColaborador | null> = {
        status: 200,
        message: "Detalles del colaborador recuperados exitosamente.",
        info: detalles,
      };
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  async registrarCredenciales(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const usuario_id = Number(req.params.id_colaborador);
      const usuario = (req.body as RegistraCredencialesColaborador)?.usuario;
      const clave = (req.body as RegistraCredencialesColaborador)?.clave;
      const rol_id = Number((req.body as RegistraCredencialesColaborador)?.rol_id);

      if (!usuario || !clave || Number.isNaN(rol_id)) {
        const error: any = new Error("Faltan datos obligatorios: usuario, clave o rol_id.");
        error.status = 400;
        throw error;
      }

      const payload: RegistraCredencialesColaborador = {
        usuario,
        clave,
        rol_id,
        usuario_id,
      } as RegistraCredencialesColaborador;

      const insertId = await colaboradorService.registrarCredenciales(payload);
      const responseBody: ApiResponse<number> = {
        status: 201,
        message: "Credenciales registradas exitosamente.",
        info: insertId,
      };
      res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  async detallesCredenciales(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const usuarioId = Number(req.params.id_colaborador);
      if (Number.isNaN(usuarioId)) {
        const error: any = new Error("El ID del colaborador debe ser un número válido.");
        error.status = 400;
        throw error;
      }
      const detalles = await colaboradorService.detallesCredenciales(usuarioId);
      const responseBody: ApiResponse<DetallesCredencialesColaborador | null> = {
        status: 200,
        message: "Detalles de credenciales obtenidos exitosamente.",
        info: detalles,
      };
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  async crearColaborador(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload: RegistrarColaborador = req.body as RegistrarColaborador;
      const insertId = await colaboradorService.crearColaborador(payload);
      const responseBody: ApiResponse<number> = {
        status: 201,
        message: "Colaborador registrado exitosamente.",
        info: insertId,
      };
      res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  }
}