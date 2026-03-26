import axios from "axios"
import { urlServicios } from "../utilities/endpoints/endpoints";
import { loadingPromise, loadingPromiseDelete, loadingPromiseGet } from "../utilities/utils/utils";
import Swal from "sweetalert2";

//Servicio DEL TALLER: CAMBIO DE PINTURA
async function postServicio(data) {

    try {
      const respuesta = await axios.post(urlServicios, data);
      return respuesta.data;
    } catch (e) {
      console.log(e)
    }
  }
  export async function postServicioServicio(data) {
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
          const  promesaPostServicio = postServicio(data);
          const valor =  await loadingPromise(promesaPostServicio);
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



  async function getListaServicio(data) {
    try {
      const respuesta = await axios.get(urlServicios, { 
        
        params: {
         CodAlmacen: data.CodAlmacen,
         CodEstado: data.CodEstado,
         Descripcion: data.Descripcion
      }
    });
      return respuesta.data;
    } catch (e) {
      console.log(e)
    }
  }
  export async function getServicioListarServicio(params) {
    try {
     const  promesaPostServicio = getListaServicio(params);
     return await loadingPromiseGet(promesaPostServicio);
  
    } catch (e) {
      console.log(e)
      return [];
    }
  }
  
  async function deleteServicio(data) {
    try {
      const respuesta = await axios.delete(urlServicios,{ data: { codProducto: data.CodProducto, 
        codAlmacen: data.CodAlmacen }});
      return respuesta.data;
    } catch (e) {
      console.log(e)
    }
  }
  
  export async function deleteServicioServicio(data) {
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
          const  promesaDeleteCliente = deleteServicio(data);
          const respuesta =  await loadingPromiseDelete(promesaDeleteCliente);
          res = respuesta
          if(respuesta){
            Swal.fire(
              'Se Grabo!',
              'Se guardaron los cambios',
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

  async function putServicio(data) {

    try {
      const respuesta = await axios.put(urlServicios, data);
      return respuesta.data;
    } catch (e) {
      console.log(e)
    }
  }
  
  export async function putServicioServicio(data) {
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
          const  promesaPostCliente = putServicio(data);
          const valor =  await loadingPromise(promesaPostCliente);
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
  
  

  