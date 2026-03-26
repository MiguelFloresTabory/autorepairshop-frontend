import axios from "axios"
import { urlProductos } from "../utilities/endpoints/endpoints";
import { loadingPromise, loadingPromiseDelete, loadingPromiseGet } from "../utilities/utils/utils";
import Swal from "sweetalert2";

async function postProducto(data) {

    try {
      const respuesta = await axios.post(urlProductos, data);
      return respuesta.data;
    } catch (e) {
      console.log(e)
    }
  }
  export async function postProductoServicio(data) {
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
          const  promesaPostProducto = postProducto(data);
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

  async function getListaProducto(data) {
    try {
      const respuesta = await axios.get(urlProductos,{ 
        
        params: {
        Descripcion: data.Descripcion,
        CodFamilia: data.CodFamilia,
        CodMarca: data.CodMarca,
        CodAlmacen: data.CodAlmacen
      }
    });
      return respuesta.data;
    } catch (e) {
      console.log(e)
    }
  }
  export async function getProductoListarServicio(params) {
    try {
     const  promesaPostProducto = getListaProducto(params);
     return await loadingPromiseGet(promesaPostProducto);
  
    } catch (e) {
      console.log(e)
      return [];
    }
  }
  
  async function deleteProducto(data) {
    try {
      const respuesta = await axios.delete(urlProductos,{ data: { codProducto: data.CodProducto, 
        codAlmacen: data.CodAlmacen }});
      return respuesta.data;
    } catch (e) {
      console.log(e)
    }
  }
  
  export async function deleteProductoServicio(data) {
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
          const  promesaDeleteCliente = deleteProducto(data);
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

  async function putProducto(data) {

    try {
      const respuesta = await axios.put(urlProductos, data);
      return respuesta.data;
    } catch (e) {
      console.log(e)
    }
  }
  
  export async function putProductoServicio(data) {
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
          const  promesaPostCliente = putProducto(data);
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
  
  

  