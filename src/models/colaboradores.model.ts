
export type Colaborador = {
  nombres: string;
  apellidos: string;
  rol: string; // admin, vendedor, cajero.
  estaActivo: boolean;
  celular: string;
  lugarTrabajo: string;
}

export type resumenColaboradores = {
  totalColaboradores: number;
  activos: number;
  inactivos: number;
}