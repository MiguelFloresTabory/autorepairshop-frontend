import axios from "axios";
import { urlOrdenTrabajo } from "../utilities/endpoints/endpoints";
import Swal from "sweetalert2";
import { loadingPromise, loadingPromiseDelete, loadingPromiseGet, loadingPromiseGetElement } from "../utilities/utils/utils";

async function postOrdenTrabajo(data) {

  try {
    const respuesta = await axios.post(urlOrdenTrabajo, data);
    return respuesta.data;
  } catch (e) {
    console.log(e)
  }
}

export async function postOrdenTrabajoServicio(data) {
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
        const promesaPostProducto = postOrdenTrabajo(data);
        const valor = await loadingPromise(promesaPostProducto);
        if (valor) {
          Swal.fire(
            'Se Grabo!',
            'Se guardaron los cambios',
            'success'
          )
          res = true;
        }
      }

    })
  } catch (e) {
    console.log(e)
  }
  return res;
}

async function postOrdenTrabajoDetsGrabarProductos(data) {

  try {
    const respuesta = await axios.post(urlOrdenTrabajo+"/ActualizarEstadoOT", data);
    return respuesta.data;
  } catch (e) {
    console.log(e)
  }
}

export async function postOrdenTrabajoDetsGrabarProductosServicio(data) {
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
        const promesaPostProducto = postOrdenTrabajoDetsGrabarProductos(data);
        const valor = await loadingPromise(promesaPostProducto);
        if (valor) {
          Swal.fire(
            'Se Grabo!',
            'Se guardaron los cambios',
            'success'
          )
          res = true;
        }
      }

    })
  } catch (e) {
    console.log(e)
  }
  return res;
}


//
async function getOrdenTrabajo(data) {
  try {
    const respuesta = await axios.get(urlOrdenTrabajo + "/Listar", {

      params: {
        Descripcion: data.Descripcion,
        Desde: data.Desde,
        Hasta: data.Hasta,
        SerieDoc: data.SerieDoc,
        NumeroDoc: data.NumeroDoc,
        CodFormaPago: data.CodFormaPago,
        CodDocumento: data.CodDocumento,
        CodEstado: data.CodEstado,
      }
    });
    return respuesta.data;
  } catch (e) {
    console.log(e)
  }
}


export async function getOrdenTrabajoListarServicio(params) {
  try {
    const promesa = getOrdenTrabajo(params);
    return await loadingPromiseGet(promesa);

  } catch (e) {
    console.log(e)
    return [];
  }
}


async function getOrdenTrabajoProductosListar(data) {
  try {
    const respuesta = await axios.get(urlOrdenTrabajo + "/ListarOrdenTrabajoControl", {

      params: {
        Descripcion: data.Descripcion,
        CodTipoProducto: data.CodTipoProducto,
        CodOrdenTrabajo: data.CodOrdenTrabajo
      }
    });
    return respuesta.data;
  } catch (e) {
    console.log(e)
  }
}


export async function getOrdenTrabajoListarProductosServicio(params) {
  try {
    const promesa = getOrdenTrabajoProductosListar(params);
    return await loadingPromiseGet(promesa);

  } catch (e) {
    console.log(e)
    return [];
  }
}

async function deleteOrdenTrabajo(data) {
  try {
    const respuesta = await axios.delete(urlOrdenTrabajo, {
      data: {
        codAlmacen: data.CodAlmacen, codUsuario: data.CodUsuario, 
        codOrdenTrabajo: data.CodOrdenTrabajo
      }
    });
    return respuesta.data;
  } catch (e) {
    console.log(e)
  }
}

export async function deleteOrdenTrabajoServicio(data) {
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
        const promesaDeleteCliente = deleteOrdenTrabajo(data);
        const respuesta = await loadingPromiseDelete(promesaDeleteCliente);
        res = respuesta
        if (respuesta) {
          Swal.fire(
            'Se Grabo!',
            'Se anulo el registro',
            'success'
          )
        }

      } else {
        res = false
      }

    })

  } catch (e) {
    console.log(e)
    res = false;
  }
  return res;
}

//
async function putOrdenTrabajo(data) {

  try {
    const respuesta = await axios.put(urlOrdenTrabajo, data);
    return respuesta.data;
  } catch (e) {
    console.log(e)
  }
}



//
async function cerrarOrdenTrabajo(data) {

  try {
    const respuesta = await axios.post(urlOrdenTrabajo+'/CerrarOrdenTrabajo', data);
    return respuesta.data;
  } catch (e) {
    console.log(e)
  }
}

export async function cerrarOrdenTrabajoServicio(data) {
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
        const promesaPostProducto = cerrarOrdenTrabajo(data);
        const valor = await loadingPromise(promesaPostProducto);
        if (valor) {
          Swal.fire(
            'Se Grabo!',
            'Se guardaron los cambios',
            'success'
          )
          res = true;
        }
      }

    })
  } catch (e) {
    console.log(e)
  }
  return res;
}



export async function putOrdenTrabajoServicio(data) {
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
        const promesa = putOrdenTrabajo(data);
        const valor = await loadingPromise(promesa);
        if (valor) {
          Swal.fire(
            'Se Grabo!',
            'Se guardaron los cambios',
            'success'
          )
          res = true;
        }
      }

    })
  } catch (e) {
    console.log(e)
  }
  return res;
}
//trae un elemento de docventa
// DOCUMENTO DE VENTA
async function getOrdenTrabajoObj(data) {
  try {
    const respuesta = await axios.get(urlOrdenTrabajo + "/TraerObjetoOrdenTrabajo", {
      params: {
        NumeroOrdenTrabajo: data.NumeroOrdenTrabajo
      }
    });
    return respuesta.data;
  } catch (e) {
    console.log(e)
  }
}

export async function getOrdenTrabajoObjServicio(params) {
  try {
    const promesa = getOrdenTrabajoObj(params);
    return await loadingPromiseGetElement(promesa);

  } catch (e) {
    console.log(e)
    return {};
  }
}


//DOCUMENTO DE VENTA
async function getOrdenTrabajoPDF(data) {
  try {
    const respuesta = await axios.get(urlOrdenTrabajo + "/VistaPdfOrdenTrabajo", {
      params: {
        CodOrdenTrabajo: data.codOrdenTrabajo
      }
    });
    return respuesta.data;
  } catch (e) {
    console.log(e)
  }
}

export async function getOrdenTrabajoPDFServicio(params) {
  try {
    const promesa = getOrdenTrabajoPDF(params);
    return await loadingPromiseGetElement(promesa);

  } catch (e) {
    console.log(e)
    return {};
  }
}





