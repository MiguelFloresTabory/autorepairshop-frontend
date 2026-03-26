
import * as yup from "yup"
import { notificacion } from "../../../utilities/utils/utils"

export const schemaUsuario = yup
  .object({
    Descripcion: yup.string().required("Ingrese Descripcion"),
    NombreCompleto: yup.string().required("Ingrese NombreCompleto"),
    NombreUsuario: yup.string().required("Ingrese NombreUsuario"),
    Dni: yup.string().required("Ingrese Dni"),
    Clave: yup.string().required("Ingrese la Clave"),
    Correo: yup.string().required("Ingrese el Correo"),
    }).required();

export function ValidarGrabarUsuario(data) {

  let cadena = "";
  if (data) {
    if(data.CodCargo === "-1"){
      cadena += "SELECCIONE UN CARGO \n"
    }
  }
  if (cadena === "") {
    return true;
  } else {
    notificacion(cadena, "warning");
    return false;
  }
}



export function ValidarEditarUsuario(data) {

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
