import axios from "axios"
import { urlUsuarios } from "../utilities/endpoints/endpoints";

export async function postLogin (data){

      try {
        const respuesta = await axios.post(urlUsuarios, data);
        return respuesta;

      } catch (e) {
        console.log(e);     
    }
 

  }


  