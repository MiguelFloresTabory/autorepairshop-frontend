import axios from "axios";
import { urlReportes } from "../utilities/endpoints/endpoints";
import { loadingPromiseGet } from "../utilities/utils/utils";


async function getReporteVentaEficiencia(data) {
    try {
      const respuesta = await axios.get(urlReportes+'/rptVentaEficacia',{ 
        params: {
        Anio: data.Anio,
        Mes: data.Mes,
        Meta: data.MetaMes
      }
    });
      return respuesta.data;
    } catch (e) {
      console.log(e)
    }
  }
  
  export async function getReporteVentaEficienciaServicio(params) {
    try {
     const  promesaGet = getReporteVentaEficiencia(params);
     return await loadingPromiseGet(promesaGet);
  
    } catch (e) {
      console.log(e)
      return [];
    }
  }



  
async function getReporteVentaCobranza(data) {
    try {
      const respuesta = await axios.get(urlReportes+'/rptVentaCobranza',{ 
        params: {
        Anio: data.Anio
      }
    });
      return respuesta.data;
    } catch (e) {
      console.log(e)
    }
  }
  
  export async function getReporteVentaCobranzaServicio(params) {
    try {
     const  promesaGet = getReporteVentaCobranza(params);
     return await loadingPromiseGet(promesaGet);
  
    } catch (e) {
      console.log(e)
      return [];
    }
  }





  async function getReporteDatosVentasClientes(data) {
    try {
      const respuesta = await axios.get(urlReportes+'/rptVentaCobranzaDatos',{ 
        params: {
        Anio: data.Anio
      }
    });
      return respuesta.data;
    } catch (e) {
      console.log(e)
    }
  }
  
  export async function getReporteDatosVentasClientesServicio(params) {
    try {
     const  promesaGet = getReporteDatosVentasClientes(params);
     return await loadingPromiseGet(promesaGet);
  
    } catch (e) {
      console.log(e)
      return [];
    }
  }

