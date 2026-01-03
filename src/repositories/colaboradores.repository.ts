import { db } from "../config/db.config";
import type { Colaborador } from "../models/colaboradores.model";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export default class ColaboradoresRepository {
  async select(): Promise<Colaborador[] | null> {
    const [rows] = await db.query<RowDataPacket[]>(
      `
      select 
        u.nombres as 'nombres', 
        u.apellidos as 'apellidos', 
        rol.nombre as 'rol',
        u.estaActivo as 'estaActivo',
        u.celular as 'celular',
        suc.direccion as 'lugarTrabajo'
      from 
        usuarios as u join 
        cuentas_usuario as cu join 
        roles as rol join 
        sucursales as suc
      ON (u.sucursal_id = suc.id AND cu.usuario_id = u.id AND  cu.rol_id = rol.id);
      `
    );
    if (rows.length === 0) {
      return null;
    }
    return rows as Colaborador[];
  }
}