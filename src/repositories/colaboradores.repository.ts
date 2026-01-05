import { db } from "../config/db.config";
import type { Colaborador, resumenColaboradores, DetallesColaborador, RegistraCredencialesColaborador } from "../models/colaboradores.model";
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
          COUNT(u.id) AS total_colaboradores,
          SUM(u.estaActivo = 1) AS activos,
          SUM(u.estaActivo = 0) AS inactivos,
          -- Contamos las filas donde el ID de la cuenta es NULL
          SUM(cu.id IS NULL) AS sin_cuenta
      FROM 
          usuarios AS u
      LEFT JOIN 
          cuentas_usuario AS cu ON u.id = cu.usuario_id;
      `
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0] as resumenColaboradores;
  }

  async detallesColaborador(id: number): Promise<DetallesColaborador | null> {
    const [rows] = await db.query<RowDataPacket[]>(
      `
      SELECT 
        u.id AS 'id',
        u.nombres AS 'nombres',
        u.apellidos AS 'apellidos',
        u.dni AS 'dni',
        u.estaActivo AS 'estaActivo',
        u.celular AS 'celular',
        u.hora_inicio_jornada AS 'hora_inicio_jornada',
        u.hora_fin_jornada AS 'hora_fin_jornada',
        u.sueldo AS 'sueldo',
        u.sucursal_id AS 'id_sucursal',
        suc.direccion AS 'lugarTrabajo',
        u.fecha_contratacion AS 'fecha_contratacion',
        u.fecha_actualizacion AS 'fecha_actualizacion',
        CASE WHEN cu.id IS NOT NULL THEN TRUE ELSE FALSE END AS 'tieneCuenta',
        IFNULL(rol.nombre, 'Sin definir') AS 'rol'
      FROM
        usuarios AS u
      LEFT JOIN 
        cuentas_usuario AS cu ON cu.usuario_id = u.id
      LEFT JOIN
        sucursales AS suc ON u.sucursal_id = suc.id 
      LEFT JOIN 
        roles AS rol ON cu.rol_id = rol.id
      WHERE
        u.id = ?;
      `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0] as DetallesColaborador;
  }

  async usuarioExiste(id: number): Promise<boolean> {
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT id FROM usuarios WHERE id = ? LIMIT 1;`,
      [id]
    );
    return rows.length > 0;
  }

  async cuentaUsuarioExiste(usuarioId: number): Promise<boolean> {
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT id FROM cuentas_usuario WHERE usuario_id = ? LIMIT 1;`,
      [usuarioId]
    );
    return rows.length > 0;
  }

  async usuarioNombreExiste(usuario: string): Promise<boolean> {
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT id FROM cuentas_usuario WHERE usuario = ? LIMIT 1;`,
      [usuario]
    );
    return rows.length > 0;
  }

  async registrarCredenciales(payload: RegistraCredencialesColaborador): Promise<number> {
    const { usuario, clave, rol_id, usuario_id } = payload;
    const [result] = await db.execute<ResultSetHeader>(
      `INSERT INTO cuentas_usuario (usuario, clave, rol_id, usuario_id) VALUES (?, ?, ?, ?);`,
      [usuario, clave, rol_id, usuario_id]
    );
    return result.insertId;
  }
}