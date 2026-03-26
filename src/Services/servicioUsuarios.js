import axios from "axios"
import { urlUsuarios } from "../utilities/endpoints/endpoints";
import { loadingPromise, loadingPromiseDelete, loadingPromiseGet } from "../utilities/utils/utils";
import Swal from "sweetalert2";

//Usuario DEL TALLER: CAMBIO DE PINTURA
async function postUsuario(data) {

    try {
      const respuesta = await axios.post(urlUsuarios+'/grabarUsuario', data);
      return respuesta.data;
    } catch (e) {
      console.log(e)
    }
  }
  export async function postUsuarioServicio(data) {
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
          const  promesaPostUsuario = postUsuario(data);
          const valor =  await loadingPromise(promesaPostUsuario);
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



  async function getListaUsuario(data) {
    try {
      const respuesta = await axios.get(urlUsuarios, { 
        
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
  export async function getUsuarioListarUsuarioServicio(params) {
    try {
     const  promesaPostUsuario = getListaUsuario(params);
     return await loadingPromiseGet(promesaPostUsuario);
  
    } catch (e) {
      console.log(e)
      return [];
    }
  }
  
  async function deleteUsuario(data) {
    try {
      const respuesta = await axios.delete(urlUsuarios,{ data: { codProducto: data.CodProducto, 
        codAlmacen: data.CodAlmacen }});
      return respuesta.data;
    } catch (e) {
      console.log(e)
    }
  }
  
  export async function deleteUsuarioUsuario(data) {
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
          const  promesaDeleteCliente = deleteUsuario(data);
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

  async function putUsuario(data) {

    try {
      const respuesta = await axios.put(urlUsuarios, data);
      return respuesta.data;
    } catch (e) {
      console.log(e)
    }
  }
  
  export async function putUsuarioServicio(data) {
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
          const  promesaPostCliente = putUsuario(data);
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
  
  

  