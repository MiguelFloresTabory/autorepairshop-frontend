
import * as yup from "yup"
import { notificacion } from "../../../utilities/utils/utils"

export const schemaCotizacion = yup
  .object({
  }).required();

export function ValidarGrabarCotizacion(data, listaProductos, objetoCliente) {
  let cadena = "";
  if (data) {
    if (data.CodVendedor === "-1" | !data.CodVendedor) {
      cadena += "SELECCIONE UN VENDEDOR\n"
    }
    if (data.CodFormaPago === "-1" | !data.CodFormaPago) {
      cadena += "SELECCIONE UNA FORMA DE PAGO\n"
    }
    if (data.CodMoneda === "-1" | !data.CodMoneda) {
      cadena += "SELECCIONE UNA MONEDA\n"
    }
    if (data.Serie === "-1" | !data.Serie) {
      cadena += "SELECCIONE UNA SERIE\n"
    }
    if (data.Emision === "-1" | !data.Emision) {
      cadena += "SELECCIONE UNA FECHA EMISION\n"
    }
    if (listaProductos.length <= 0) {
      cadena += "INGRESE ALMENOS UN PRODUCTO\n"
    }
    if (objetoCliente) {
      if (Object.keys(objetoCliente).length <= 0) {
        cadena += "INGRESE UN CLIENTE\n"
      }
    } else {
      cadena += "INGRESE UN CLIENTE\n"
    }
  }
  if (cadena === "") {
    return true;
  } else {
    notificacion(cadena, "warning");
    return false;
  }
}





