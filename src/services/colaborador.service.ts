import type { Colaborador } from "../models/colaboradores.model";
import ColaboradoresRepository from "../repositories/colaboradores.repository";
  
const colaboradoresRepository = new ColaboradoresRepository();

export default class ColaboradorService {

  async select(): Promise<Colaborador[] | null> {
    const colaboradores = await colaboradoresRepository.select();
    if (!colaboradores) {
      const error: any = new Error(`No hay colaboradores.`);
      error.status = 204;
      throw error;
    }
    return colaboradores;
  }
}