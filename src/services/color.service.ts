import ColoresRepository from "../repositories/colores.repository";
import type { simpleColor } from "../models/color.model";

const coloresRepository = new ColoresRepository();

export class ColorService {
  async select() {
    const colores = await coloresRepository.select();
    if (colores.length === 0) {
      const error: any = new Error("No se encontraron colores.");
      error.status = 404;
      throw error;
    }
    return colores;
  }

  async getAllColors() {
    return coloresRepository.findAll();
  }
  async getColorById(id: number) {
    const colorExists = await ColoresRepository.colorExists(id);

    if (!colorExists) {
      const error: any = new Error(`El color con ID ${id} no existe.`);
      error.status = 404;
      throw error;
    }

    return coloresRepository.findById(id);
  }

  async simpleSelect(): Promise<simpleColor[]> {
    const colores = await coloresRepository.simpleSelect();
    if (colores.length === 0) {
      const error: any = new Error("No se encontraron colores.");
      error.status = 404;
      throw error;
    }
    return colores;
  }
}