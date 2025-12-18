import type {
  Marca,
  MarcaCreate,
  MarcaSelect,
  MarcaUpdate,
  ResumenMarca,
} from "../models/marca.model";
import { MarcasRepository } from "../repositories/marcas.repository";

// Instanciamos el repositorio de marcas
const marcaRepository = new MarcasRepository();

export class MarcaService {
  async getMarcas(): Promise<MarcaSelect[] | null> {
    const marcas = await marcaRepository.findAll();

    if (!marcas) {
      const error: any = new Error(`No hay marcas registradas.`);
      error.status = 204; // No Content
      throw error;
    }

    return marcas;
  }

  async getResumenMarcas(): Promise<ResumenMarca | null> {
    const resumen = await marcaRepository.resumenMarcas();

    if (!resumen) {
      const error: any = new Error(`No se pudo obtener el resumen de marcas.`);
      error.status = 500;
      throw error;
    }

    return resumen;
  }

  async getMarcaById(id: number): Promise<Marca | null> {
    const marca = await marcaRepository.findById(id);

    if (!marca) {
      const error: any = new Error(`La marca con ID ${id} no existe.`);
      error.status = 404; // Not Found
      throw error;
    }

    return marca;
  }

  async create(marca: MarcaCreate): Promise<number> {
    const id = await marcaRepository.create(marca);

    if (!marca) {
      const error: any = new Error(`Error al crear la marca.`);
      error.status = 500;
      throw error;
    }

    return id;
  }

  async update(id: number, newMarca: MarcaUpdate): Promise<void> {
    const exists = await marcaRepository.marcaExists(id);

    if (!exists) {
      const error: any = new Error(
        `No se puede actualizar la marca con ID ${id} porque no existe.`
      );
      error.status = 404;
      throw error;
    }

    await marcaRepository.update(id, newMarca);
  }

  async delete(id: number): Promise<void> {
    const exists = await marcaRepository.marcaExists(id);

    if (!exists) {
      const error: any = new Error(
        `No se puede eliminar la marca con ID ${id} porque no existe.`
      );
      error.status = 404;
      throw error;
    }

    await marcaRepository.delete(id);
  }
}
