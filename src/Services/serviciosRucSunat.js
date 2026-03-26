
import axios from "axios"
import { urlEmpresa } from "../utilities/endpoints/endpoints";
import { getStorageObject, setStorageObject } from "../utilities/storage/LogalStorage";

//carga datos del api sunat, en local storage, de la BD
export async function cargarDatosApisunat(CodEmpresa){

      try {
        if (CodEmpresa) {
            await axios.get(urlEmpresa+'?CodEmpresa='+CodEmpresa).then((Respuesta) => {
                //console.log(Respuesta);
                const objeto = getStorageObject();
                const objetoStorage = {
                    ...objeto,
                    urlapisunat: Respuesta.data.urlapisunat,
                    tokenapisunat: Respuesta.data.tokenapisunat
                }
                //console.log(Respuesta);
                setStorageObject(objetoStorage);
            });
        }

      } catch (e) {
        console.log(e);     
    }
 
  }



  export async function getDatosApiSunat(nroRuc){

    try {
      const objeto = getStorageObject();
         return await axios.get(objeto.urlapisunat + nroRuc + objeto.tokenapisunat);
    } catch (e) {
      console.log(e);     
  }

}



  