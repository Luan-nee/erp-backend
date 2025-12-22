import ColoresRepository from "../repositories/colores.repository";

const coloresRepository = new ColoresRepository();

export class ColorService {
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
}