import { db } from "../config/db.config";
import type { Colaborador, resumenColaboradores } from "../models/colaboradores.model";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export default class ColaboradoresRepository {
  async select(): Promise<Colaborador[] | null> {
    const [rows] = await db.query<RowDataPacket[]>(
      `
      SELECT 
        u.id AS 'id',
        u.nombres AS 'nombres', 
        u.apellidos AS 'apellidos', 
        -- Si el rol es nulo (porque no tiene cuenta), devuelve "sin definir"
        IFNULL(rol.nombre, 'Sin definir') AS 'rol',
        u.estaActivo AS 'estaActivo',
        u.celular AS 'celular',
        suc.direccion AS 'lugarTrabajo',
        CASE WHEN cu.id IS NOT NULL THEN TRUE ELSE FALSE END AS 'tieneCuenta'
      FROM 
        usuarios AS u
      INNER JOIN 
        sucursales AS suc ON u.sucursal_id = suc.id
      LEFT JOIN 
        cuentas_usuario AS cu ON cu.usuario_id = u.id
      LEFT JOIN 
        roles AS rol ON cu.rol_id = rol.id;
      `
    );
    if (rows.length === 0) {
      return null;
    }
    return rows as Colaborador[];
  }

  async resumenColaboradores(): Promise<resumenColaboradores | null> {
    const [rows] = await db.query<RowDataPacket[]>(
      `
      SELECT 
          COUNT(*) AS total_colaboradores,
          SUM(estaActivo = 1) AS activos,
          SUM(estaActivo = 0) AS inactivos
      FROM usuarios;
      `
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0] as resumenColaboradores;
  }
}