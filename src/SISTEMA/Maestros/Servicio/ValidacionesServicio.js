
import * as yup from "yup"
import { notificacion } from "../../../utilities/utils/utils"

export const schemaServicio = yup
  .object({
    Descripcion: yup.string().required("Ingrese Descripcion"),
    CodigoProducto: yup.string().required("Ingrese el Codigo Servicio"),
    CodigoInterno: yup.string().required("Ingrese el Codigo Interno"),
    Costo: yup.number().typeError('Tipo de datos numerico').required("Campo requerido"),
    }).required();

export function ValidarGrabarServicio(data) {

  let cadena = "";
  if (data) {
    
  }
  if (cadena === "") {
    return true;
  } else {
    notificacion(cadena, "warning");
    return false;
  }
}



export function ValidarEditarServicio(data) {

  let cadena = "";
  if (data) {
       
  }
  if (cadena === "") {
    return true;
  } else {
    notificacion(cadena, "warning");
    return false;
  }
}
