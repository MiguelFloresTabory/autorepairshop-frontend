
import * as yup from "yup"
import { notificacion } from "../../../utilities/utils/utils"

export const schemaOrdenTrabajo = yup
  .object({
  }).required();

export function ValidarGrabarOrdenTrabajo(data, listaProductos, objetoVehiculo) {
  let cadena = "";
  let cont = 0;
  if (data) {
    if (data.CodMecanico1 === "-1" | !data.CodMecanico1) {
      cont++
    }
    if (data.CodMecanico2 === "-1" | !data.CodMecanico2) {
      cont++
    }
    if (data.CodMecanico3 === "-1" | !data.CodMecanico3) {
      cont++
    }
    if (cont === 3 ) {
      cadena += "SELECCIONE ALMENOS UN MECANICO\n"
    }
    //QUE EL PRIMERO Y EL SEGUNDO NO ESTEN VACIOS 

if ( (data.CodMecanico1 !== "-1" )  |  (data.CodMecanico2 !== "-1" ) | (data.CodMecanico3 !== "-1")){
if ((data.CodMecanico1 === data.CodMecanico2  & (data.CodMecanico1 !== "-1" ) & (data.CodMecanico2 !== "-1")) | (data.CodMecanico1 === data.CodMecanico3 &  (data.CodMecanico1 !== "-1" ) & (data.CodMecanico3 !== "-1" )))
        cadena += "SELECCIONE UN MECANICO DIFERENTE\n"  
       
else if((data.CodMecanico2 === data.CodMecanico3  & (data.CodMecanico2 !== "-1") & (data.CodMecanico3 !== "-1")) | (data.CodMecanico2 === data.CodMecanico1 &  (data.CodMecanico2 !== "-1") & (data.CodMecanico1 !== "-1" )))
        cadena += "SELECCIONE UN MECANICO DIFERENTE\n"  
      
else if ((data.CodMecanico3 === data.CodMecanico1  & (data.CodMecanico3 !== "-1") & (data.CodMecanico1 !== "-1")) | (data.CodMecanico3 === data.CodMecanico2 &  (data.CodMecanico3 !== "-1" ) & (data.CodMecanico2 !== "-1" )))
        cadena += "SELECCIONE UN MECANICO DIFERENTE\n"  

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

    if (objetoVehiculo) {
      if (Object.keys(objetoVehiculo).length <= 0) {
        cadena += "INGRESE UN VEHICULO\n"
      }
    } else {
      cadena += "INGRESE UN VEHICULO\n"
    }

  }
  if (cadena === "") {
    return true;
  } else {
    notificacion(cadena, "warning");
    return false;
  }
}





