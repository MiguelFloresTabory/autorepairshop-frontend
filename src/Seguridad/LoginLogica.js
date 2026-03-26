import axios from "axios"
import { urlUsuarios } from "../utilities/endpoints/endpoints";

export async function postLogin (data, setRequest){

      try {
          await axios.post(urlUsuarios, data)
            .then((Respuesta) => {
              setRequest(Respuesta.data);
            });


      } catch (e) {
        console.log(e)     
    }
 

  }