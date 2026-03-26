
import * as yup from "yup"
import { notificacion } from "../../../utilities/utils/utils"

export const schemaProducto = yup
  .object({
    Descripcion: yup.string().required("Ingrese Descripcion"),
    CodigoProducto: yup.string().required("Ingrese el Codigo Producto"),
    CodigoInterno: yup.string().required("Ingrese el Codigo Interno"),
    Modelo: yup.string().required("Ingrese el Modelo"),
    Costo: yup.number().typeError('Tipo de datos numerico').required("Campo requerido"),
    Precio: yup.number().typeError('Tipo de datos numerico').required("Campo requerido"),
    Stock: yup.number().typeError('Requerido Ingrese un numero'),
    StockMaximo: yup.number().typeError('Requerido Ingrese un numero'),
    StockMinimo: yup.number().typeError('Requerido Ingrese un numero'),
  }).required();

export function ValidarGrabarProducto(data) {

  let cadena = "";
  if (data) {
    if (data.CodMarca === "-1" | !data.CodMarca) {
      cadena += "SELECCIONE UNA MARCA\n"
    }
    if (data.CodFamilia === "-1" | !data.CodFamilia) {
      cadena += "SELECCIONE UNA FAMILIA\n"
    }
    if (data.CodEstado === "-1" | !data.CodEstado) {
      cadena += "SELECCIONE EL ESTADO\n"
    }
    
  }
  if (cadena === "") {
    return true;
  } else {
    notificacion(cadena, "warning");
    return false;
  }
}



export function ValidarEditarProducto(data) {

  let cadena = "";
  if (data) {
    if (data.CodMarca === "-1" | !data.CodMarca) {
      cadena += "SELECCIONE UNA MARCA\n"
    }
    if (data.CodFamilia === "-1" | !data.CodFamilia) {
      cadena += "SELECCIONE UNA FAMILIA\n"
    }
    if (data.CodEstado === "-1" | !data.CodEstado) {
      cadena += "SELECCIONE EL ESTADO\n"
    }
    
  }
  if (cadena === "") {
    return true;
  } else {
    notificacion(cadena, "warning");
    return false;
  }
}
