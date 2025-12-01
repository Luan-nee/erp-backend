import type { PropColor } from "./color.js";
import type { PropMarca } from "./marca.js";
import type { PropCategoria } from "./categoria.js";
import type { PropSucursal } from "./sucursal.js";

export type PropResponse = {
  status: number;
  message: string;
  info: PropColor[] | PropMarca[] | PropCategoria[] | PropSucursal[] | null;
}