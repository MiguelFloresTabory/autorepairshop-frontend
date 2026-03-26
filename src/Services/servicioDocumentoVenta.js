import axios from "axios";
import { urlDocumentoVenta } from "../utilities/endpoints/endpoints";
import Swal from "sweetalert2";
import { loadingPromise, loadingPromiseDelete, loadingPromiseGet, loadingPromiseGetElement } from "../utilities/utils/utils";

async function postDocumentoVenta(data) {

    try {
      const respuesta = await axios.post(urlDocumentoVenta, data);
      return respuesta.data;
    } catch (e) {
      console.log(e)
    }
  }
  
  export async function postDocumentoVentaServicio(data) {
    let res = false
    try {
     await Swal.fire({
        title: '¿Está seguro?',
        text: "¿Está seguro de Guardar el Registro?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const  promesaPostProducto = postDocumentoVenta(data);
          const valor =  await loadingPromise(promesaPostProducto);
          if(valor){
            Swal.fire(
              'Se Grabo!',
              'Se guardaron los cambios',
              'success'
              )
              res =  true;
            }
          }
  
      })
    } catch (e) {
      console.log(e)
    }
    return res;
  }

  async function getDocumentoVenta(data) {
    try {
      const respuesta = await axios.get(urlDocumentoVenta+"/Listar",{ 
        
        params: {
        RazonSocial: data.RazonSocial,
        Desde: data.Desde,
        Hasta: data.Hasta,
        SerieDoc: data.SerieDoc,
        NumeroDoc: data.NumeroDoc,
        CodFormaPago: data.CodFormaPago,
        CodDocumento: data.CodDocumento,
        CodEstado: data.CodEstado
      }
    });
      return respuesta.data;
    } catch (e) {
      console.log(e)
    }
  }

  export async function getDocumentoVentaListarServicio(params) {
    try {
     const  promesa = getDocumentoVenta(params);
     return await loadingPromiseGet(promesa);
  
    } catch (e) {
      console.log(e)
      return [];
    }
  }


  async function deleteDocumentoVenta(data) {
    try {
      const respuesta = await axios.delete(urlDocumentoVenta,{ data: { codDocVenta: data.CodDocVenta, 
        codAlmacen: data.CodAlmacen,  codUsuario: data.CodUsuario, codTipoDoc:  data.CodTipoDoc}});
      return respuesta.data;
    } catch (e) {
      console.log(e)
    }
  }
  
  export async function deleteDocumentoVentaServicio(data) {
    let res = false;
    try {
      await Swal.fire({
        title: '¿Está seguro?',
        text: "¿Está seguro de Eliminar el Registro?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const  promesaDeleteCliente = deleteDocumentoVenta(data);
          const respuesta =  await loadingPromiseDelete(promesaDeleteCliente);
          res = respuesta
          if(respuesta){
            Swal.fire(
              'Se Grabo!',
              'Se anulo el registro',
              'success'
            )
          }
          
        }else {
          res = false
        }
  
      })
      
    } catch (e) {
      console.log(e)
      res =  false;
    }
    return res;
  }


  async function putDocumentoVenta(data) {

    try {
      const respuesta = await axios.put(urlDocumentoVenta, data);
      return respuesta.data;
    } catch (e) {
      console.log(e)
    }
  }
  
  export async function putDocumentoVentaServicio(data) {
    let res = false
    try {
     await Swal.fire({
        title: '¿Está seguro?',
        text: "¿Está seguro de Guardar el Registro?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const  promesa = putDocumentoVenta(data);
          const valor =  await loadingPromise(promesa);
          if(valor){
            Swal.fire(
              'Se Grabo!',
              'Se guardaron los cambios',
              'success'
              )
              res =  true;
            }
          }
  
      })
    } catch (e) {
      console.log(e)
    }
    return res;
  }


  //DOCUMENTO DE VENTA
  async function getDocumentoVentaPDF(data) {
    try {
      const respuesta = await axios.get(urlDocumentoVenta+"/VistaPdfDocumentoVenta",{ 
        params: {
        CodDocVenta: data.codDocVenta
      }
    });
      return respuesta.data;
    } catch (e) {
      console.log(e)
    }
  }

  export async function getDocumentoVentaPDFServicio(params) {
    try {
     const  promesa = getDocumentoVentaPDF(params);
     return await loadingPromiseGetElement(promesa);
  
    } catch (e) {
      console.log(e)
      return {};
    }
  }



  //trae un elemento de docventa
   // DOCUMENTO DE VENTA
    async function getDocumentoVentaObj(data) {
      try {
        const respuesta = await axios.get(urlDocumentoVenta+"/TraerObjetoDocVenta",{ 
          params: {
            NumeroCotizacion: data.NumeroCotizacion,
            CodTipoDoc: data.CodTipoDoc
        }
      });
        return respuesta.data;
      } catch (e) {
        console.log(e)
      }
    }
  
    export async function getDocumentoVentaObjServicio(params) {
      try {
       const  promesa = getDocumentoVentaObj(params);
       return await loadingPromiseGetElement(promesa);
    
      } catch (e) {
        console.log(e)
        return {};
      }
    }
  
//GRABAR FACTURA
//---------------------------------------------------
async function postDocumentoVentaFactura(data) {

  try {
    const respuesta = await axios.post(urlDocumentoVenta+"/GrabarFactura", data);
    return respuesta.data;
  } catch (e) {
    console.log(e)
  }
}

export async function postDocumentoVentaServicioFactura(data) {
  let res = false
  try {
   await Swal.fire({
      title: '¿Está seguro?',
      text: "¿Está seguro de Guardar el Registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const  promesa = postDocumentoVentaFactura(data);
        const valor =  await loadingPromise(promesa);
        if(valor){
          Swal.fire(
            'Se Grabo!',
            'Se guardaron los cambios',
            'success'
            )
            res =  true;
          }
        }

    })
  } catch (e) {
    console.log(e)
  }
  return res;
}


  
//setlistaDatos

  //DOCUMENTO DE VENTA
  async function getDocumentoVentaGraficos(data) {
    try {
      const respuesta = await axios.get(urlDocumentoVenta+"/TraerGraficosDatos");
      return respuesta.data;
    } catch (e) {
      console.log(e)
    }
  }

  export async function getDocumentoVentaGraficosDatosServicio(params) {
    try {
     const  promesa = getDocumentoVentaGraficos(params);
     return await loadingPromiseGetElement(promesa);
  
    } catch (e) {
      console.log(e)
      return {};
    }
  }
