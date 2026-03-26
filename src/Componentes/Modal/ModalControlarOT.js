import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Card, CardBody, Col, Modal, ModalBody, ModalHeader, Row, Form, Label, FormFeedback, Input, FormGroup, Button, Table } from "reactstrap";
import "./ModalAgregarProducto.css"
import { useEffect } from "react";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { getProductoListarAgregarServicio, notificacion } from "../../utilities/utils/utils";
import { getStorageObject } from "../../utilities/storage/LogalStorage";
import { getOrdenTrabajoListarProductosServicio, postOrdenTrabajoDetsGrabarProductosServicio } from "../../Services/servicioOrdenTrabajo";

//muestra lista de servicios y repuestos
export function ModalControlarOT({ listaDatos, setListaDatos, mostrarModal, objParams, setMostrarModal, ActualizarCantidad }) {

  const ObjStorage = getStorageObject();
  const { handleSubmit, control, setValue, formState: { errors } } = useForm({ mode: 'onChange', resolver: yupResolver(schemaAgregarProducto) });
  //argregamos

  const toggle = () => setMostrarModal(!mostrarModal);
  //objeto seleccion en modal
  const [checkServicio, setCheckServicio] = useState(false);
  const [disbledCantidad, setDisbledCantidad] = useState(false);
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {


    (async () => {
      if (mostrarModal) {
        const objetoParam = {
          Descripcion: descripcion ? descripcion : "",
          CodOrdenTrabajo: objParams.CodOrdenTrabajo,
          CodTipoProducto: objParams.CodTipoProducto
        }
        const listaProducto = await getOrdenTrabajoListarProductosServicio(objetoParam);
        setListaDatos(listaProducto);
      }

    })();
  }, [mostrarModal, setListaDatos])


  async function BuscarProducto() {
    const objetoParam = {
      Descripcion: descripcion ? descripcion : "",
      CodOrdenTrabajo: objParams.CodOrdenTrabajo,
      CodTipoProducto: objParams.CodTipoProducto
    }

    const listaProducto = await getOrdenTrabajoListarProductosServicio(objetoParam);
    setListaDatos(listaProducto);
  }

  // useEffect(() => {
  //   if (Object.keys(objtSeleccion).length > 0) {
  //     setValue("Descripcion", objtSeleccion.codigoAlternativo + "-" + objtSeleccion.descripcion)
  //   }
  // }, [objtSeleccion, setValue])

  useEffect(() => {
    if (!mostrarModal) {
      setListaDatos([])
    }
  }, [mostrarModal])

  async function GrabarCambiosRealizados() {
    const listaJsonCadena = JSON.stringify(listaDatos)
    const objetoParam = {
      OrdenTrabajoJson: listaJsonCadena,
      CodOrdenTrabajo: objParams.CodOrdenTrabajo,
      CodTipoProducto: objParams.CodTipoProducto
    }
    if (ValidarGrabarCambiosDetalleOrdenTrabajo(objetoParam, listaDatos)) {
      const res = await postOrdenTrabajoDetsGrabarProductosServicio(objetoParam);
      if (res) {
        BuscarProducto();
      }
    }
    console.log(listaDatos)

  }

  return (
    mostrarModal ?
      <>
        <Modal
          isOpen={mostrarModal}
          toggle={toggle}
          className='modal-dialog-centered modal-xl'
          style={{ width: "100%", margin: "auto" }}
          contentClassName='pt-0'
        >
          <ModalHeader toggle={toggle} tag='div'>
            <h5 className='modal-title'>{'CONTROLAR ' + objParams.NombreProducto}</h5>
          </ModalHeader>

          <ModalBody className='flex-grow-1' >

            <title>{objParams.NombreProducto}</title>
            <Card className='bg-transparent border-secondary shadow-none'  >
              <CardBody>

                <Row className='mb-2'>
                  <Col sm='12'>
                    <h5>{"BUSCAR " + objParams.NombreProducto}</h5>
                  </Col>
                </Row>

                <Row>
                  {/* <Col sm='2' md='2'>
             <FormGroup check inline>
               <Input
                 type="checkbox"
                 onChange={(e) => setCheckServicio(e.target.checked)}
                 checked={checkServicio}
               />
               <Label check>SERVICIO</Label>
             </FormGroup>
           </Col> */}

                  <Label className='form-label ' sm='2' md='2' size='sm' for='Telefono'>
                    DESC/CODIGO
                  </Label>
                  <Col sm='5' md='5'>
                    <Input id="Descripcion" name="Descripcion" bsSize='sm' style={{ textTransform: 'uppercase' }} placeholder='CODIGO/DESCRIPCION'
                      onChange={(e) => setDescripcion(e.target.value)} value={descripcion}
                    />
                  </Col>

                  <Col className='mb-1'>
                    <Button color='primary' onClick={BuscarProducto} >
                      BUSCAR
                    </Button>
                  </Col>

                </Row>
                <div style={{ height: "30rem" }}>
                  <GrillaResultadoProducto listaDatos={listaDatos} setListaDatos={setListaDatos} />
                </div>


              </CardBody>
            </Card>


            <Button className="mt-3" color='primary' size='lg' onClick={GrabarCambiosRealizados} >
              GRABAR
            </Button>

          </ModalBody>
        </Modal>

      </> : <></>)



}



export function GrillaResultadoProducto({ listaDatos, setListaDatos }) {

  function ActualizarCantidad(cantidad, producto) {

    const objetoModificado = {
      ...producto,
      cantidadEntregada: cantidad
    }
    console.log(objetoModificado)
    let nuevoArray = [];
    for (let i = 0; i < listaDatos.length; i++) {
      if (listaDatos[i].codProducto === producto.codProducto) {
        nuevoArray[i] = objetoModificado;
      } else {
        nuevoArray[i] = listaDatos[i];
      }
    }
    setListaDatos(nuevoArray);
  }

  function ActualizarObservacion(observacion, producto) {

    const objetoModificado = {
      ...producto,
      observacion: observacion
    }

    let nuevoArray = [];
    for (let i = 0; i < listaDatos.length; i++) {
      if (listaDatos[i].codProducto === producto.codProducto) {
        nuevoArray[i] = objetoModificado;
      } else {
        nuevoArray[i] = listaDatos[i];
      }
    }
    setListaDatos(nuevoArray);
  }
  function ActualizarEstadoServicio(codEstado, producto) {
    //ACTUALIZAR ESTADO DE OBSERVACION AL CAMBIAR ESTADO, CUANDO SEA DIFERENTE A DETENIDO SE LIMPIA OBERVACION
    if (codEstado !== "6") {
      const objetoModificado = {
        ...producto,
        codEstado: codEstado,
        observacion: ""
      }
      let nuevoArray = [];
      for (let i = 0; i < listaDatos.length; i++) {
        if (listaDatos[i].codProducto === producto.codProducto) {
          nuevoArray[i] = objetoModificado;
        } else {
          nuevoArray[i] = listaDatos[i];
        }
      }
      setListaDatos(nuevoArray);
      //SI ESTADO ES IGUAL A 6 ENTONCES NO SE LIMPIA
    } else {
      const objetoModificado = {
        ...producto,
        codEstado: codEstado
      }

      let nuevoArray = [];
      for (let i = 0; i < listaDatos.length; i++) {
        if (listaDatos[i].codProducto === producto.codProducto) {
          nuevoArray[i] = objetoModificado;
        } else {
          nuevoArray[i] = listaDatos[i];
        }
      }
      setListaDatos(nuevoArray);
    }




  }


  return (<>
    <div style={{ maxHeight: '30rem', overflowY: 'auto' }}>

      <Table bordered responsive className="mt-2" hover  >

        <thead>
          <tr>
            <th style={{ textAlign: "center", width: "120px" }}>CODIGO</th>
            <th style={{ textAlign: "center", width: "150" }}>PRODUCTO</th>
            <th style={{ textAlign: "center", width: "70px" }}>MARCA</th>
            <th style={{ textAlign: "center", width: "70px" }}>MODELO</th>
            <th style={{ textAlign: "center", width: "130px" }}>ESTADO</th>

            <th style={{ textAlign: "center", width: "200px" }}>OBSERVACION</th>
            <th style={{ textAlign: "center", width: "50px" }}>DETENIDO</th>
            <th style={{ textAlign: "center", width: "20px" }}>CANTIDAD</th>
            <th style={{ textAlign: "center", width: "30px" }}>ENTREGA</th>
          </tr>
        </thead>
        {listaDatos ?
          <tbody>
            {listaDatos.map((producto) =>
              <tr className="tablaDato" key={producto.codigoProducto} >
                <td> {producto.codigoAlternativo}</td>
                <td>{producto.producto}</td>
                <td>{producto.marca}</td>
                <td> {producto.modelo}</td>
                <td style={{ textAlign: "center", width: "30px" }} >

                  <Input disabled={(producto.codTipoProducto === 1) ? true : false} type='select' bsSize='sm' className="form-control" key={producto.codEstado} value={(producto.codTipoProducto === 1) ? 0 : producto.codEstado} onChange={(e) => ActualizarEstadoServicio(e.target.value, producto)}  >
                    <option value="0"></option>
                    <option value="1">PENDIENTE</option>
                    <option value="5">CERRADO</option>
                    <option value="4">PROCESANDO</option>
                    <option value="6">DETENIDO</option>
                  </Input>
                </td>

                <td style={{ textAlign: "center", width: "150px" }} >
                  <Input key={producto.codigoProducto} disabled={(producto.codTipoProducto === 2) ? false : true} defaultValue={producto.observacion} onBlur={(e) => ActualizarObservacion(e.target.value, producto)} id="Observacion" name="Observacion" bsSize="sm" />
                </td>

                <td>{producto.fechaDetenido}</td>
                <td>{producto.cantidad}</td>

                <td style={{ textAlign: "center", width: "30px" }} >
                  <Input key={producto.codigoProducto} disabled={(producto.codTipoProducto === 1) ? false : true} defaultValue={(producto.cantidadEntregada === 0) ? "" : producto.cantidadEntregada} onBlur={(e) => ActualizarCantidad(e.target.value, producto)} id="Cantidad" name="Cantidad" bsSize="sm" />
                </td>

              </tr>
            )}
          </tbody>
          : <InicializarGrillaVacia />
        }
      </Table>
    </div>



  </>

  )
}

function InicializarGrillaVacia() {


  return (

    <tbody>
      <tr >
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td style={{ textAlign: "center", width: "30px" }} >
          <Input id="Cantidad" name="Cantidad" bsSize="sm" placeholder='CANTIDAD' />
        </td>
      </tr>
    </tbody>
  )
}


const schemaAgregarProducto = yup
  .object({
    Precio: yup.number().required("Requerido").typeError("Requerido"),
    Cantidad: yup.number().required("Requerido").typeError("Requerido")
  }).required();

function ValidarAgregarProducto(data) {
  console.log(data)
  let cadena = ""
  //valida el objeto
  if (data) {
    if (Object.keys(data).length > 0) {

      if ((parseInt(data.cantidad) > parseInt(data.stock)) & data.codTipoProducto === 1) {
        cadena += "NO HAY SUFICIENTE STOCK\n"
      }

      //validar cuando es repuesto
      //-----------------------------------------
      if (parseInt(data.precio) <= parseInt(data.costo)) {
        cadena += "EL PRECIO DEBE SER MAYOR AL COSTO\n"
      }

    }
  }
  if (cadena !== "") {
    notificacion(cadena, "warning")
    return false
  }
  return true
}



function ValidarGrabarCambiosDetalleOrdenTrabajo(data, listaDatos) {
  let cadena = ""



  for (let i = 0; i < listaDatos.length; i++) {
    //si es servicio
    if (listaDatos[i].codTipoProducto === 2 & listaDatos[i].codEstado === "6" & listaDatos[i].observacion === "") {
      cadena += "INGRESE OBSERVACION EN EL SERVICIO " + listaDatos[i].codigoAlternativo + "\n"
    }
    if (listaDatos[i].codTipoProducto === 2 & listaDatos[i].codEstado === "0") {
      cadena += "INGRESE ESTADO EN SERVICIO " + listaDatos[i].codigoAlternativo + "\n"
    }
    //si es producto
    if (listaDatos[i].codTipoProducto === 1 & (listaDatos[i].cantidad < listaDatos[i].cantidadEntregada)) {
      cadena += "INGRESE UNA CANTIDAD MENOR EN EL REPUESTO " + listaDatos[i].codigoAlternativo + "\n"
    }
    if (listaDatos[i].codTipoProducto === 1 & isNaN(listaDatos[i].cantidadEntregada)) {
      cadena += "INGRESE UNA CANTIDAD VALIDA EN REPUESTO" + listaDatos[i].codigoAlternativo + "\n"
    }
  }


  if (cadena === "") return true;
  notificacion(cadena, "warning");
  return false;

}




















