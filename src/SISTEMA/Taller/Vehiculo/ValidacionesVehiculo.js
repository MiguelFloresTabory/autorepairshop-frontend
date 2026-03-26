
import * as yup from "yup"
import { notificacion } from "../../../utilities/utils/utils"

export const schemaVehiculo = yup
  .object({
    Chasis: yup.string().required("Ingrese Descripcion"),
    FechaVctoSoat: yup.string().required("Ingrese Fecha Vencimiento de Soat"),
    NroFlota: yup.number().typeError('Tipo numerico/requerido').required("Campo requerido"),
    NroMotor: yup.string().required("Ingrese un Numero Motor"),
    Placa: yup.string().required("Ingrese una placa"),
    }).required();

export function ValidarGrabarVehiculo(data, objetoCliente) {

  let cadena = "";
  if (data) {
    if(data.CodColor === "-1"){
      cadena += "INGRESE UN COLOR\n"
    }
    if(data.CodTipoVehiculo === "-1"){
      cadena += "INGRESE UN TIPO DE VEHICULO\n"
    }
    if(data.CodMarca === "-1"){
      cadena += "INGRESE UNA MARCA\n"
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



export function ValidarEditarVehiculo(data) {

  let cadena = "";
  if (data) {

    if(data.CodColor === "-1"){
      cadena += "INGRESE UN COLOR\n"
    }
    if(data.CodTipoVehiculo === "-1"){
      cadena += "INGRESE UN TIPO DE VEHICULO\n"
    }
    if(data.CodMarca === "-1"){
      cadena += "INGRESE UNA MARCA\n"
    }
    if(data.CodEstado === "-1"){
      cadena += "INGRESE UN ESTADO\n"
    }

    if(data.CodCliente === 0 | data.CodCliente === "0"){
      cadena += "INGRESE UN CLIENTE\n"
    }
    if(!data.cliente){
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
