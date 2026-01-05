
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