
export type Colaborador = {
  id: number;
  nombres: string;
  apellidos: string;
  rol: string; // admin, vendedor, cajero.
  estaActivo: boolean;
  celular: string;
  lugarTrabajo: string;
  tieneCuenta: boolean;
}

export type resumenColaboradores = {
  total_colaboradores: number;
  activos: number;
  inactivos: number;
  sin_cuenta: number;
}

export type DetallesColaborador = {
  id: number;
  nombres: string;
  apellidos: string;
  dni: string;
  estaActivo: boolean;
  celular: string;
  hora_inicio_jornada: string;
  hora_fin_jornada: string;
  sueldo: number;
  id_sucursal: number;
  lugarTrabajo: string;
  fecha_contratacion: Date;
  fecha_actualizacion: Date;
  tieneCuenta: boolean; 
  rol: string; // admin, vendedor, cajero, sin definir
}