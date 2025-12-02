import type { PropColor } from "./color.js";
import type { PropMarca } from "./marca.js";
import type { PropCategoria } from "./categoria.js";
import type { PropSucursal } from "./sucursal.js";
import type { PropEstadosDocFacturacion } from "./estadosDocFacturacion.js";
import type { PropEstadosTransferenciasInventarios } from "./estadosTransferenciasInventarios.js";
import type { PropMetodopago } from "./metodoPago.js";
import type { PropPermiso } from "./permiso.js";
import type { PropRolesPermiso } from "./rolesPermiso.js";
import type { PropProducto } from "./producto.js";
import type { PropRol } from "./rol.js";
import type { PropTipoDocFacturacion } from "./tipoDocFacturacion.js";
import type { PropTipoDocumentoCliente } from "./tipo_documento_cliente.js";
import type { PropTipoTax } from "./tipo_tax.js";

export type PropResponse = {
  status: number;
  message: string;
  info:
    | PropColor[]
    | PropMarca[]
    | PropCategoria[]
    | PropSucursal[]
    | PropEstadosDocFacturacion[]
    | PropEstadosTransferenciasInventarios[]
    | PropMetodopago[]
    | PropPermiso[]
    | PropProducto[]
    | PropRolesPermiso[]
    | PropRol[]
    | PropTipoDocFacturacion[]
    | PropTipoDocumentoCliente[]
    | PropTipoTax[]
    | null;
};
