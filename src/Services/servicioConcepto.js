import axios from "axios";
import { loadingPromiseGet } from "../utilities/utils/utils";




async function getListaConceptosDet(data) {
    try {
      const respuesta = await axios.get(urlConceptosDet,{ 
        params: {
        CodPrincipal: data.CodPrincipal
      }
    });
      return respuesta.data;
    } catch (e) {
      console.log(e)
    }
  }
  export async function getListaConceptosDet(params) {
    try {
     const  promesaConceptoDet = getListaProducto(params);
     return await loadingPromiseGet(promesaConceptoDet);
  
    } catch (e) {
      console.log(e)
      return [];
    }
  }
  