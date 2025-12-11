import type { Request, Response } from "express";
import type { Connection } from "mysql2/promise";
import type { PropProducto } from "../types/producto";
import type { PropColor } from "../types/color";
import type { PropMarca } from "../types/marca";
import type {
  PropCategoria,
  PropResumenCategoria,
} from "../types/categoria.js";
import type { PropSucursal } from "../types/sucursal.js";
import type { PropEstadosDocFacturacion } from "../types/estadosDocFacturacion.js";
import type { PropEstadosTransferenciasInventarios } from "../types/estadosTransferenciasInventarios.js";
import type { PropMetodopago } from "../types/metodoPago.js";
import type { PropPermiso } from "../types/permiso.js";
import type { PropRolesPermiso } from "../types/rolesPermiso.js";
import type { PropRol } from "../types/rol.js";
import type { PropTipoDocFacturacion } from "../types/tipoDocFacturacion.js";
import type { PropTipoDocumentoCliente } from "../types/tipo_documento_cliente.js";
import type { PropTipoTax } from "../types/tipo_tax.js";

type Result =
  | PropProducto[]
  | PropColor[]
  | PropMarca[]
  | PropCategoria[]
  | PropResumenCategoria[]
  | PropSucursal[]
  | PropEstadosDocFacturacion[]
  | PropEstadosTransferenciasInventarios[]
  | PropMetodopago[]
  | PropPermiso[]
  | PropRolesPermiso[]
  | PropRol[]
  | PropTipoDocFacturacion[]
  | PropTipoDocumentoCliente[]
  | PropTipoTax[];

export type PropResponse = {
  status: number;
  message: string;
  info: Result | null;
};

export default async function get(
  req: Request,
  res: Response,
  connection: Connection,
  sql: string,
  nameEntidad: string
): Promise<void> {
  try {
    const [results] = await connection.execute(sql);
    const response: PropResponse = {
      status: 200,
      message: `${nameEntidad} obtenidos con éxito.`,
      info: results as Result,
    };
    res.status(200).json(response);
    console.log(`✅ (GET: ${nameEntidad}) - ejecutada con éxito.`);
  } catch (error) {
    const response: PropResponse = {
      status: 500,
      message: `Error interno del servidor al obtener ${nameEntidad}.`,
      info: null,
    };
    res.status(500).json(response);
    console.log(`❌ (Error: ${nameEntidad}) - error en la consulta`, error);
  }
}
