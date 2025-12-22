import SucursalesRepository from "../repositories/sucursales.repository";
import type { Sucursal, SucursalSelect } from "../models/sucursal.model";

const sucursalesRepository = new SucursalesRepository();

export default class SucursalService {
  
  async getAllSucursales(): Promise<SucursalSelect[] | null> {
    const sucursales = await sucursalesRepository.findAll();
    if (!sucursales) {
      const error: any = new Error(`No hay sucursales.`);
      error.status = 204;
      throw error;
    }
    return sucursales;
  }

  async getSucursalById(idSucursal: number): Promise<Sucursal | null> {
    const SucursalExist = await SucursalesRepository.SucursalExists(idSucursal);
    const Sucursal = await sucursalesRepository.findById(idSucursal);
    if (!SucursalExist) {
      const error: any = new Error(`La sucursal con ID=${idSucursal} no existe.`);
      error.status = 404;
      throw error;
    }
    if (!Sucursal) {
      const error: any = new Error(`No se pudo obtener la sucursal con ID=${idSucursal}.`);
      error.status = 500;
      throw error;
    }
    return Sucursal;
  }

}