import axios from "axios"
import { urlClientes } from "../utilities/endpoints/endpoints";
import { loadingPromise, loadingPromiseDelete, loadingPromiseGet } from "../utilities/utils/utils";
import Swal from "sweetalert2";

async function postCliente(data) {

  try {
    const respuesta = await axios.post(urlClientes, data);
    return respuesta.data;
  } catch (e) {
    console.log(e)
  }
}
export async function postClienteServicio(data) {
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
        const  promesaPostCliente = postCliente(data);
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
 async function getListaCliente(data) {
  try {
    const respuesta = await axios.get(urlClientes,{ 
      
      params: {
      CodTipoDocumento: data.CodTipoDocumento,
      CodEstado: data.CodEstado,
      Descripcion: data.Descripcion
    }
  });
    return respuesta.data;
  } catch (e) {
    console.log(e)
  }
}
export async function getClienteListarServicio(params) {
  try {
   const  promesaPostCliente = getListaCliente(params);
   return await loadingPromiseGet(promesaPostCliente);

  } catch (e) {
    console.log(e)
    return [];
  }
}

async function deleteCliente(id) {
  try {
    const respuesta = await axios.delete(urlClientes,{ data: {codCuentaCorriente: id}});
    return respuesta.data;
  } catch (e) {
    console.log(e)
  }
}

export async function deleteClienteServicio(id) {
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
        const  promesaDeleteCliente = deleteCliente(id);
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

async function putCliente(data) {

  try {
    const respuesta = await axios.put(urlClientes, data);
    return respuesta.data;
  } catch (e) {
    console.log(e)
  }
}

export async function putClienteServicio(data) {
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
        const  promesaPostCliente = putCliente(data);
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



  //LISTAR 15 PRIMEROS DE LA BUSQUEDA DEL AUTOCOMPLETE

async function getListaClienteAutoComplete(data) {
  try {
    const respuesta = await axios.get(urlClientes + '/AutoComplete',{ 
      params: {
      Descripcion: data.Descripcion,
      CodTipoCuentaCorriente: data.CodTipoCuentaCorriente
    }
  });
    return respuesta.data;
  } catch (e) {
    console.log(e)
  }
}
export async function getListarClienteServicioAutoComplete(params) {
  try {
   const  promesaGetCliente = getListaClienteAutoComplete(params);
   return await loadingPromiseGet(promesaGetCliente);

  } catch (e) {
    console.log(e)
    return [];
  }
}


