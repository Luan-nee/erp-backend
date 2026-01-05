import type { Colaborador, resumenColaboradores, DetallesColaborador, RegistraCredencialesColaborador } from "../models/colaboradores.model";
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

  async resumenColaboradores(): Promise<resumenColaboradores | null> {
    const resumen = await colaboradoresRepository.resumenColaboradores();
    if (!resumen) {
      const error: any = new Error(`No se pudo obtener el resumen de colaboradores.`);
      error.status = 500;
      throw error;
    }
    return resumen;
  }

  async detallesColaborador(id: number): Promise<DetallesColaborador | null> {
    const detalles = await colaboradoresRepository.detallesColaborador(id);
    if (!detalles) {
      const error: any = new Error(`Colaborador con ID ${id} no encontrado.`);
      error.status = 404;
      throw error;
    }
    return detalles;
  }

  async registrarCredenciales(payload: RegistraCredencialesColaborador): Promise<number> {
    const { usuario_id, usuario } = payload;

    const existeUsuario = await colaboradoresRepository.usuarioExiste(usuario_id);
    if (!existeUsuario) {
      const error: any = new Error(`El colaborador con ID ${usuario_id} no existe.`);
      error.status = 404;
      throw error;
    }

    const yaTieneCuenta = await colaboradoresRepository.cuentaUsuarioExiste(usuario_id);
    if (yaTieneCuenta) {
      const error: any = new Error(`El colaborador con ID ${usuario_id} ya tiene credenciales registradas.`);
      error.status = 409;
      throw error;
    }

    const nombreUsuarioOcupado = await colaboradoresRepository.usuarioNombreExiste(usuario);
    if (nombreUsuarioOcupado) {
      const error: any = new Error(`El nombre de usuario '${usuario}' ya está en uso.`);
      error.status = 409;
      throw error;
    }

    const insertId = await colaboradoresRepository.registrarCredenciales(payload);
    return insertId;
  }
}