
import * as yup from "yup"
import { notificacion } from "../../../utilities/utils/utils"

export const schemaCliente = yup
  .object({
    Correo: yup.string().required("Ingrese Correo"),
    Direccion: yup.string().required("Ingrese la Direccion"),
    NombreComercial: yup.string().required("Ingrese Nombre Comercial"),
    NroDocumento: yup.string(),
    RazonSocial: yup.string().required("Ingrese Nombre Cliente"),
    Telefono: yup.string().required("Ingrese Telefono")
  }).required();

export function ValidarGrabarCliente(data) {

  let cadena = "";
  if (data) {
    if ((data.CodTipoDocumento === "-1" | !data.CodTipoDocumento) && data.CodTipoPersona === "1") {
      cadena += "SELECCIONE UN TIPO DOCUMENTO\n"
    }
    if (data.CodTipoPersona === "-1" | !data.CodTipoPersona) {
      cadena += "SELECCIONE UN TIPO PERSONA\n"
    }
    if (data.CodEstado === "-1" | !data.CodEstado) {
      cadena += "SELECCIONE EL ESTADO\n"
    }
    if (data.CodTipoDocumento !== "3") {
      if (data.NroDocumento === "" | !data.NroDocumento) {
        cadena += "INGRESE UN Nro Documento\n"
      }
    }
  }
  if (cadena === "") {
    return true;
  } else {
    notificacion(cadena, "warning");
    return false;
  }
}

export function ValidarEditarCliente(data) {
  let cadena = "";
  if (data) {
    if ((data.CodTipoDocumento === "-1" | !data.CodTipoDocumento) && data.CodTipoPersona === "1") {
      cadena += "SELECCIONE UN TIPO DOCUMENTO\n"
    }

    if (data.CodTipoPersona === "-1" | !data.CodTipoPersona) {
      cadena += "SELECCIONE UN TIPO PERSONA\n"
    }
    if (data.CodEstado === "-1" | !data.CodEstado) {
      cadena += "SELECCIONE EL ESTADO\n"
    }

    if (data.CodTipoDocumento !== "3") {
      if (data.NroDocumento === "" | !data.NroDocumento) {
        cadena += "INGRESE UN Nro Documento\n"
      }
    }

  }

  if (cadena === "") {
    return true;
  } else {
    notificacion(cadena, "warning");
    return false;
  }

}





