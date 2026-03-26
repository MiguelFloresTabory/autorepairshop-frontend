import axios from "axios";
import {  loadingPromiseGetElement } from "../utilities/utils/utils";
import {  urlCorrelativo } from "../utilities/endpoints/endpoints";




async function getTraerNumeroxSerie(data) {
    try {
      const respuesta = await axios.get(urlCorrelativo,{ 
        params: {
        CodAlmacen: data.CodAlmacen,
        CodEmpresa: data.CodEmpresa,
        SerieDoc: data.SerieDoc,
        CodTipoDoc: data.CodTipoDoc

      }
    });
      return respuesta.data;
    } catch (e) {
      console.log(e)
    }
  }
  export async function getTraerNumeroxSerieServicio(params) {
    try {
     const  promesa = getTraerNumeroxSerie(params);
     return await loadingPromiseGetElement(promesa);
  
    } catch (e) {
      console.log(e)
      return {};
    }
  }
  