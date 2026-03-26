import axios from "axios"
import { urlServicios, urlVehiculos } from "../utilities/endpoints/endpoints";
import { loadingPromise, loadingPromiseDelete, loadingPromiseGet } from "../utilities/utils/utils";
import Swal from "sweetalert2";

//Servicio DEL TALLER: CAMBIO DE PINTURA
async function postVehiculos(data) {

    try {
      const respuesta = await axios.post(urlVehiculos, data);
      return respuesta.data;
    } catch (e) {
      console.log(e)
    }
  }
  export async function postVehiculoServicio(data) {
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
          const  promesaPostServicio = postVehiculos(data);
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
  //getVehiculoListarVehiculo


  async function getListaVehiculo(data) {
    try {
      const respuesta = await axios.get(urlVehiculos, { 
        
        params: {
         CodAlmacen: data.CodAlmacen,
         CodEstado: data.CodEstado,
         Descripcion: data.Descripcion,
         CodTipoVehiculo: data.CodTipoVehiculo
      }
    });
      return respuesta.data;
    } catch (e) {
      console.log(e)
    }
  }
  export async function getVehiculoListarVehiculo(params) {
    try {
     const  promesaPostServicio = getListaVehiculo(params);
     return await loadingPromiseGet(promesaPostServicio);
  
    } catch (e) {
      console.log(e)
      return [];
    }
  }
  
  async function putVehiculos(data) {

    try {
      const respuesta = await axios.put(urlVehiculos, data);
      return respuesta.data;
    } catch (e) {
      console.log(e)
    }
  }
  
  export async function putVehiculosServicio(data) {
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
          const  promesaPostCliente = putVehiculos(data);
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
  







  async function deleteVehiculo(data) {
    try {
      const respuesta = await axios.delete(urlVehiculos,{ data: { codVehiculo: data.CodVehiculo, 
        codAlmacen: data.CodAlmacen }});
      return respuesta.data;
    } catch (e) {
      console.log(e)
    }
  }
  
  export async function deleteVehiculoServicio(data) {
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
          const  promesaDeleteCliente = deleteVehiculo(data);
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


  

  

  
  //LISTAR 15 PRIMEROS DE LA BUSQUEDA DEL AUTOCOMPLETE

async function getListaVehiculoAutoComplete(data) {
  try {
    const respuesta = await axios.get(urlVehiculos + '/AutoComplete',{ 
      params: {
      Descripcion: data.Descripcion
    }
  });
    return respuesta.data;
  } catch (e) {
    console.log(e)
  }
}
export async function getListarVehiculoServicioAutoComplete(params) {
  try {
   const  promesaGetCliente = getListaVehiculoAutoComplete(params);
   return await loadingPromiseGet(promesaGetCliente);

  } catch (e) {
    console.log(e)
    return [];
  }
}

