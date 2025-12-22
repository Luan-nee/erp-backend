export type SucursalSelect = {
  id: number;
  nombre: string;
  direccion: string;
  tipo_sucursal: string;
}

export type Sucursal = {
  id: number;
  nombre: string;
  direccion: string;
  serie_factura: string;
  numer_factura_inicial: number;
  serie_boleta: string;
  numero_boleta_inicial: number;
  codigo_anexo: string;
}