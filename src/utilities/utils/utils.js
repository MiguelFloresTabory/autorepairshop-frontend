import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { urlProductos } from "../endpoints/endpoints";


export function ValidarRuc(numero) {


    if (numero) {

        if (numero.length === 11) {

            const onlyNumbers = !isNaN(numero);
            if (onlyNumbers) {
                return true
            } else {
                return false
            }

        } else {
            return false;
        }

    } else {
        return false;
    }



}
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
// muestra cadena de texto
// parametros:   mensaje, tipo, modeDark, props
// el # en BD es el salto de linea
export const notificacion = (
    mensaje,
    type,
    props = {
        duration: 3000, position: 'top-right',
        style: { padding: '15px', color: '#000000', }
    }
) => {
    let msg = mensaje;
    if(isNaN(mensaje)){
        const msgMayus = mensaje.toUpperCase();
        msg = msgMayus;
        if (msgMayus.includes("##")) {
        msg = msgMayus.replaceAll("##", "\n");
        }
    } else {
        msg = mensaje.toString();
    }
    
    if (props) {
        const prop = {
            duration: 3000,
            position: 'top-right',
            style: { padding: '15px', color: '#000000', },
            ...props
        }
        return retornartoast(type, msg, prop)
    } else {
        const props = {
            duration: 3000, position: 'top-right',
            style: { padding: '15px', color: '#000000', }
        }
        return retornartoast(type, msg, props)
    }

}
const retornartoast = (type, mensaje, props) => {

    if (!type) {
        return toast(mensaje, props)
    }
    if (type === "success") {
        return toast.success(mensaje, props)
    }
    if (type === "error") {
        return toast.error(mensaje, props)
    }
    if (type === "loading") {
        return toast.loading(mensaje, props)
    }
    if (type === "warning") {
        const propsconIcon = {
            icon: '⚠️',
            ...props
        }
        return toast.loading(mensaje, propsconIcon)
    }


}
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------

//PROMESA 
//recibe una promesa y la ejecuta y muestra si hay error, se !!usa para metodos POST, PUT !!!
export const loadingPromise = async (myPromise) => {
    const toastId = toast.loading('Cargando...', {
        position: 'top-right',
        style: { padding: '15px', color: '#000000', },
    });
    let mensaje = "";
    try {
        await myPromise.then(res => {
            console.log(res.mensaje)
            if (res.mensaje && res.mensaje === "SE GRABO CORRECTAMENTE") {
                toast.dismiss(toastId);
                notificacion(res.mensaje, "success");
                mensaje = res.mensaje;
            } else if (res.codigo_Respuesta_Operacion_Aplicacion === 400) {
                toast.dismiss(toastId);
                notificacion(res.mensaje_Operacion_Aplicacion, "error");
                mensaje = res.mensaje_Operacion_Aplicacion;
            } else {
                toast.dismiss(toastId);
                notificacion(res.mensaje, "warning");
                mensaje = res.mensaje;
            }

        });
    } catch (e) {
        console.log(e);
        mensaje = e.message;
        toast.dismiss(toastId);
        notificacion(e.message, "error");
    }

    if (mensaje === "SE GRABO CORRECTAMENTE") return true; else return false
}


//PROMESA 
//recibe una promesa y la ejecuta y muestra si hay error, 
//se !!usa para metodos GET Y LISTA !!!
export const loadingPromiseGet = async (myPromise) => {
    const toastId = toast.loading('Cargando...', {
        position: 'top-right',
        style: { padding: '15px', color: '#000000', },
    });
    let lista = [];
    try {
        await myPromise.then(res => {
            toast.dismiss(toastId);
            lista = res;
        }).catch(e => {
            toast.dismiss(toastId);
            notificacion(e.message, "error");
        });
    } catch (e) {
        toast.dismiss(toastId);
        notificacion(e.message, "error");
    }
    if (lista) {
        if (lista.length === 0) {
            notificacion("NO HAY REGISTROS", "warning");
        }
    }

    return lista;
}

//CUANDO SE ELIMINA EL ELEMENTO
export const loadingPromiseDelete = async (myPromise) => {
    const toastId = toast.loading('Cargando...', {
        position: 'top-right',
        style: { padding: '15px', color: '#000000', },
    });
    let mensaje = "";
    try {
        await myPromise.then(res => {
            if (res.mensaje && (res.mensaje === "SE ELIMINO CORRECTAMENTE" | res.mensaje === "SE ANULO CORRECTAMENTE")) {
                toast.dismiss(toastId);
                notificacion(res.mensaje, "success");
                mensaje = res.mensaje;
            } else if (res.codigo_Respuesta_Operacion_Aplicacion === 400) {
                toast.dismiss(toastId);
                notificacion(res.mensaje_Operacion_Aplicacion, "error");
                mensaje = res.mensaje_Operacion_Aplicacion;
            }
            else {
                toast.dismiss(toastId);
                notificacion(res.mensaje, "warning");
                mensaje = res.mensaje;
            }
        });
    } catch (e) {
        console.log(e);
        mensaje = e.message;
        toast.dismiss(toastId);
        notificacion(e.message, "error");
    }

    if (mensaje === "SE ELIMINO CORRECTAMENTE" | mensaje === "SE ANULO CORRECTAMENTE") return true; else return false
}



//ESPECIAL PARA CONCEPTO YA QUE LLENA COMBOS
export const loadingPromiseGetConcepto = async (myPromise) => {
    const toastId = toast.loading('Cargando...', {
        position: 'top-right',
        style: { padding: '15px', color: '#000000', },
    });
    let lista = [];
    try {
        await myPromise.then(res => {
            toast.dismiss(toastId);
            lista = res;
        }).catch(e => {
            toast.dismiss(toastId);
            notificacion(e.message, "error");
        });
    } catch (e) {
        toast.dismiss(toastId);
        notificacion(e.message, "error");
    }
    if (lista) {
        if (lista.length === 0) {
        }
    }
    return lista;
}

//ESPECIAL PARA CONCEPTO YA QUE LLENA COMBOS
export const loadingPromiseGetElement = async (myPromise) => {
    const toastId = toast.loading('Cargando...', {
        position: 'top-right',
        style: { padding: '15px', color: '#000000', },
    });
    let lista = {};
    try {
        await myPromise.then(res => {
            toast.dismiss(toastId);
            lista = res;
        }).catch(e => {
            toast.dismiss(toastId);
            notificacion(e.message, "error");
        });
    } catch (e) {
        toast.dismiss(toastId);
        notificacion(e.message, "error");
    }
    if (lista) {
        if (Object.keys(lista).length <= 0) {
            //notificacion("NO SE ENCONTRO ELEMENTO", "error"); 
        }
    }
    return lista;
}


//MESES


//MESES

export const arregloMeses = [
    { dscDocumento: "ENERO", value: "01" },
    { dscDocumento: "FEBRERO", value: "02" },
    { dscDocumento: "MARZO", value: "03" },
    { dscDocumento: "ABRIL", value: "04" },
    { dscDocumento: "MAYO", value: "05" },
    { dscDocumento: "JUNIO", value: "06" },
    { dscDocumento: "JULIO", value: "07" },
    { dscDocumento: "AGOSTO", value: "08" },
    { dscDocumento: "SETIEMBRE", value: "09" },
    { dscDocumento: "OCTUBRE", value: "10" },
    { dscDocumento: "NOVIEMBRE", value: "11" },
    { dscDocumento: "DICIEMBRE", value: "12" }
]


export const arregloAnios = [
    { dscDocumento: "2023", value: "2023" },
    { dscDocumento: "2022", value: "2022" },
    { dscDocumento: "2021", value: "2021" },
    { dscDocumento: "2020", value: "2020" },
    { dscDocumento: "2019", value: "2019" },
    { dscDocumento: "2018", value: "2018" },
]

export const arregloDocumentoVenta = [
    { dscDocumento: "FACTURA", value: "2" },
    { dscDocumento: "BOLETA", value: "6" }
]

export const arregloCargo = [
    { dscDocumento: "VENDEDOR", value: "1" },
    { dscDocumento: "MECANICO", value: "2" }
]








//   originalArray : arreglo original            prop: propiedad a usar que no se repita
export function removerDuplicados(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
    return newArray;
}



//agregar modal producto

//BUSCAR MODAL AGREGAR PRODUCTO

async function getListarAgregarProducto(data) {
    try {
        const respuesta = await axios.get(urlProductos + "/ListarProductosAgregar", {

            params: {
                Descripcion: data.Descripcion,
                FlagServicio: data.FlagServicio,
                CodAlmacen: data.CodAlmacen,
            }
        });
        return respuesta.data;
    } catch (e) {
        console.log(e)
    }
}
export async function getProductoListarAgregarServicio(params) {
    try {
        const promesaPostProducto = getListarAgregarProducto(params);
        return await loadingPromiseGet(promesaPostProducto);

    } catch (e) {
        console.log(e)
        return [];
    }
}
//-------------------------------------------------------------
//FORMATEAR FECHA AL MODELO DE BOOSTRAP PIDE "YYYY/MM/DD"
export function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
//

//recibe xx/xx/xx (103 format en sql) convierte a xx-xx-xx
export function formatearFechaSqltoReact(texto) {
    const alreves = texto.split("/").reverse().join("/").replaceAll("/", "-");
    return alreves;
}



export const arregloTipoVehiculo = [
    { dscDocumento: "CAMIONETA", value: "1" },
    { dscDocumento: "AUTO", value: "2" },
    { dscDocumento: "CAMIÓN", value: "3" }
]
export const arregloMarca = [
    { dscDocumento: "VOLDSWAGEN", value: "1" },
    { dscDocumento: "HINO", value: "2" },
    { dscDocumento: "HYUNDAU", value: "3" },
    { dscDocumento: "ISUZU", value: "4" },
    { dscDocumento: "VOLVO", value: "5" }
]
export const arregloColor = [
    { dscDocumento: "PLOMO", value: "1" },
    { dscDocumento: "NEGRO", value: "2" },
    { dscDocumento: "ROJO", value: "3" },
    { dscDocumento: "AZUL", value: "4" }
]
export const arregloFamilia = [
    { dscDocumento: "AMORTIGUADORES", value: "1" },
    { dscDocumento: "LLANTAS", value: "2" },
    { dscDocumento: "AUTOPARTES", value: "3" }
]

export const arregloEstado = [
    { dscDocumento: "ACTIVO", value: "1" },
    { dscDocumento: "INACTIVO", value: "2" }
]


export const arregloMetodoPago = [
    { dscDocumento: "CREDITO", value: "1" },
    { dscDocumento: "CONTADO", value: "2" },
]

export const arregloVendedor = [
    { dscDocumento: "MIGUEL FLORES", value: "1" }
]
export const arregloMoneda = [
    { dscDocumento: "SOLES", value: "1" }
]
export const arregloIGV = [
    { dscDocumento: "0.180", value: "1" }
]
export const arregloEstadoDocumento = [
    { dscDocumento: "PENDIENTE", value: "1" },
    { dscDocumento: "FACTURADO", value: "2" },
    { dscDocumento: "ANULADO", value: "3" },
   
  ]

  export const arregloEstadoServicio= [
    { dscDocumento: "PENDIENTE", value: "1" },
    { dscDocumento: "ANULADO", value: "3" },
    { dscDocumento: "CERRADO", value: "4" },
    { dscDocumento: "PROCESANDO", value: "5" }
   
  ]




  
