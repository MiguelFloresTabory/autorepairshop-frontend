
import { Controller, useForm } from "react-hook-form";
import { Button, Card, CardBody, Col, Form,  Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import {  formatDate, notificacion } from "../../../utilities/utils/utils";
import { useEffect, useState } from "react";
// import { deleteOrdenTrabajoServicio, getOrdenTrabajoListarServicio, postOrdenTrabajoServicio, putOrdenTrabajoServicio } from "../../../Services/serviciosOrdenTrabajo";
import SelectConceptController from "../../../Componentes/Selects/SelectConceptController";
//import { deleteDocumentoVentaServicio, getDocumentoVentaListarServicio, getDocumentoVentaPDFServicio } from "../../../Services/servicioDocumentoVenta";
import { GrillaConsultaDocumento } from "../../../Componentes/Grillas/GrillaDocumentoVenta";
import * as React from 'react';
import { getStorageObject } from "../../../utilities/storage/LogalStorage";
import { DocumentoVentaPdf } from "../../../Pdfs/DocumentoVentaPdf";
import { CargandoGif } from "../../../utilities/utils/Cargando";
import { cerrarOrdenTrabajoServicio, deleteOrdenTrabajoServicio, getOrdenTrabajoListarServicio, getOrdenTrabajoPDFServicio } from "../../../Services/servicioOrdenTrabajo";
import { GrillaConsultaOrdenTrabajo } from "./GrillaConsultaOrdenTrabajo";
import { ModalControlarOT } from "../../../Componentes/Modal/ModalControlarOT";
import { OrdenTrabajoPdf } from "../../../Pdfs/OrdenTrabajoPdf";

export default function OrdenTrabajoConsulta({setPillActive, listaProductos, setListaProductos, objEdicion, setObjEdicion, estadoActualizo, setEstadoActualizo}) {

  const [mostrarModal, setMostrarModal] = useState(false);
  const [objPDFDocumento, setObjPDFDocumento] = useState({});
  const [listaOrdenTrabajoes, setListaOrdenTrabajoes] = useState([]); 
  const [numeroGrilla, setNumeroGrilla] = useState(0);
  const ObjStorage = getStorageObject();
  const [cargando, setCargando] = useState(false);
  const [mostrarModalControlOT, setMostrarModalControlOT] = useState(false);

  const [objetoParametros, setObjetoParametros] = useState({CodTipoProducto: 0, CodOrdenTrabajo: 0, NombreProducto: ""});

  const [listaProductosControlOT, setListaProductosControlOT] = useState([{}]);
  //mostrarModal
  const { handleSubmit, control, getValues, reset } = useForm({ mode: 'onChange' });


  function limpiarListaOrdenTrabajo() {
    setListaOrdenTrabajoes([]);
    setNumeroGrilla(0);
    reset();

  }


  async function listarOrdenTrabajo(params) {
    const parametros = {
      CodAlmacen: "2",
      CodDocumento: 5,
      ...params
    }
    const lista = await getOrdenTrabajoListarServicio(parametros);
    setListaOrdenTrabajoes(lista);
    setNumeroGrilla(lista.length);
  }

  function AbrirModalRepuestos(obj){

    setMostrarModalControlOT(!mostrarModalControlOT);
    const params = {
          CodTipoProducto: "1",
          CodOrdenTrabajo: obj.codOrdenTrabajo,
          NombreProducto: "REPUESTOS"
    }
    setObjetoParametros(params);
  }

  function AbrirModalServicios(obj){
    setMostrarModalControlOT(!mostrarModalControlOT);
    const params = {
      CodTipoProducto: "2",
      CodOrdenTrabajo: obj.codOrdenTrabajo,
      NombreProducto: "SERVICIOS"
    }
    setObjetoParametros(params);
  }

  async function AnularDocumento(id) {
    const Objeto = { CodOrdenTrabajo: id, CodAlmacen: ObjStorage.codSucursal, CodUsuario: ObjStorage.codUsuario }
    const res = await deleteOrdenTrabajoServicio(Objeto);

    const objFiltro = getValues();
    if (objFiltro.CodEstado = "-1") objFiltro.CodEstado = undefined
    if (objFiltro.CodFormaPago = "-1") objFiltro.CodFormaPago = undefined
    if (res) {
      const parametros = {
        CodAlmacen: "2",
        CodDocumento: 5,
        CodTipoDoc: 5,
        ...objFiltro
      }
      listarOrdenTrabajo(parametros);
    }

  }

  async function CerrarOrdenTrabajo(data, codEstado){
  //codEstado  -->  5 es cerrar
  //codEstado  -->  1 es abrir
    const Objeto = { CodOrdenTrabajo: data.codOrdenTrabajo, CodEstadoOT: codEstado}
    const res = await cerrarOrdenTrabajoServicio(Objeto);

    const objFiltro = getValues();
    if (objFiltro.CodEstado = "-1") objFiltro.CodEstado = undefined
    if (objFiltro.CodFormaPago = "-1") objFiltro.CodFormaPago = undefined
    if (res) {
      const parametros = {
        CodAlmacen: "2",
        CodDocumento: 5,
        CodTipoDoc: 5,
        ...objFiltro
      }
      listarOrdenTrabajo(parametros);
    }
  }

  

  function EditarDocumento(data) {
    setPillActive('1');
    setObjEdicion(data);
    console.log(data)
    setListaProductos(JSON.parse(data.ordenTrabajoDets));
  }
  //----------------------------------------------------

  async function VisualizarDocumento(data) {
    setMostrarModal(!mostrarModal);
    setCargando(true);
    const obj = await getOrdenTrabajoPDFServicio(data);
    if(Object.keys(obj).length > 0 ){
      setObjPDFDocumento(obj);
      setCargando(false);
    }
 
  }
 
  useEffect(() => {
      if(estadoActualizo){
        const objFiltro = getValues();
        if (objFiltro.CodEstado = "-1") objFiltro.CodEstado = undefined
        if (objFiltro.CodFormaPago = "-1") objFiltro.CodFormaPago = undefined
          const parametros = {
            CodAlmacen: "2",
            CodDocumento: 2,
            ...objFiltro
          }
          listarOrdenTrabajo(parametros);
          setEstadoActualizo(false);
      }

 }, [estadoActualizo])

  return (
    <>

      <CriterioBusquedaOrdenTrabajo limpiarListaOrdenTrabajo={limpiarListaOrdenTrabajo} listarOrdenTrabajo={listarOrdenTrabajo} control={control} handleSubmit={handleSubmit} />

      <div className='divider' style={{ textAlign: "center" }} >
        <div className='divider-text' style={{ fontSize: '13pt' }}>CANTIDAD DE REGISTROS: {numeroGrilla}</div>
      </div>

      <GrillaConsultaOrdenTrabajo CerrarOrdenTrabajo={CerrarOrdenTrabajo} AbrirModalRepuestos={AbrirModalRepuestos} AbrirModalServicios={AbrirModalServicios}  
      ListaData={listaOrdenTrabajoes} AnularDocumento={AnularDocumento} EditarDocumento={EditarDocumento} 
      VisualizarDocumento={VisualizarDocumento} />
      
      <ModalVisualizarPdf objPDFDocumento={objPDFDocumento} mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} 
      cargando={cargando} />

      <ModalControlarOT listaDatos={listaProductosControlOT} setListaDatos={setListaProductosControlOT} mostrarModal={mostrarModalControlOT}  
      setMostrarModal={setMostrarModalControlOT}  objParams={objetoParametros} />


    </>);
}
//cargando
const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);



function CriterioBusquedaOrdenTrabajo({ listarOrdenTrabajo, limpiarListaOrdenTrabajo, handleSubmit, control }) {


  const arregloEstado = [
    { dscDocumento: "ACTIVO", value: "1" },
    { dscDocumento: "INACTIVO", value: "2" }
  ]

  const arregloFormaPago = [
    { dscDocumento: "CREDITO", value: "1" },
    { dscDocumento: "CONTADO", value: "2" }
  ]

  

  const onSubmit = (data) => {
    if (data.CodEstado === "-1") data.CodEstado = undefined
    if (data.CodFormaPago === "-1") data.CodFormaPago = undefined
    listarOrdenTrabajo(data);
  }


  return (

    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card className='bg-transparent border-secondary shadow-none'>
          <CardBody>
            <Row className='mb-1'>
              <Col sm='4'>
                <h5>CRITERIO DE BUSQUEDA</h5>
              </Col>
            </Row>
            <Row>
              <Col sm='6'>
                <Row className='mb-1'>
                  <Label sm='3' md='3' size='sm' className='form-label' for='Descripcion' >
                  PLACA/MOTOR/FLOTA
                  </Label>
                  <Col sm='9' md='9'>
                    <Controller
                      name='Descripcion'
                      defaultValue=''
                      control={control}
                      render={({ field }) => <Input {...field} id="Descripcion" name="Descripcion" bsSize="sm"
                        style={{ textTransform: 'uppercase' }} placeholder=''
                      />}
                    />

                  </Col>
                </Row>
              </Col>

              <Col sm='3'>
                <Row className='mb-1'>
                  <Label sm='4' md='4' size='sm' className='form-label' for='Desde' >
                    DESDE
                  </Label>
                  <Col sm='8' md='8'>
                    <Controller
                      name='Desde'
                      defaultValue={formatDate(hoy)}
                      control={control}
                      render={({ field }) => <Input {...field} type="date" id="Desde" name="Desde" bsSize="sm"
                        style={{ textTransform: 'uppercase' }} placeholder=''
                      />}
                    />
                  </Col>
                </Row>
              </Col>
              <Col sm='3'>
                <Row className='mb-1'>
                  <Label sm='4' md='4' size='sm' className='form-label' for='Hasta' >
                    HASTA
                  </Label>
                  <Col sm='8' md='8'>
                    <Controller
                      name='Hasta'
                      defaultValue={formatDate(hoy)}
                      control={control}
                      render={({ field }) => <Input type="date" {...field} id="Hasta" name="Hasta" bsSize="sm"
                        style={{ textTransform: 'uppercase' }} placeholder=''
                      />}
                    />
                  </Col>
                </Row>
              </Col>
            </Row >
            <Row>
              <Col sm='3'>
                <Row className='mb-1'>
                  <Label sm='6' md='6' size='sm' className='form-label' for='SerieDoc' >
                    SERIE
                  </Label>
                  <Col sm='6' md='6'  >
                    <Controller
                      name='SerieDoc'
                      defaultValue=''
                      control={control}
                      render={({ field }) => <Input {...field} id="SerieDoc" name="SerieDoc" bsSize="sm"
                        style={{ textTransform: 'uppercase' }} placeholder=''
                      />}
                    />

                  </Col>
                </Row>
              </Col>
              <Col sm='3'>
                <Row className='mb-1'>
                  <Label sm='5' md='5' size='sm' className='form-label' for='NumeroDoc' >
                    NUMERO
                  </Label>
                  <Col sm='7' md='7'>
                    <Controller
                      name='NumeroDoc'
                      defaultValue=''
                      control={control}
                      render={({ field }) => <Input {...field} id="NumeroDoc" name="NumeroDoc" bsSize="sm"
                        style={{ textTransform: 'uppercase' }} placeholder=''
                      />}
                    />

                  </Col>
                </Row>
              </Col>
              <Col sm='3'>
                <Row className='mb-1'>
                  <Label sm='4' md='4' size='sm' className='form-label' for='CodFormaPago'>
                    FORMA
                  </Label>
                  <Col sm='8' md='8'>
                    <SelectConceptController name={"CodFormaPago"} control={control} arregloConcepto={arregloFormaPago} />
                  </Col>
                </Row>
              </Col>

              <Col sm='3'>
                <Row className='mb-1'>
                  <Label sm='4' md='4' size='sm' className='form-label' for='Telefono'>
                    ESTADO
                  </Label>
                  <Col sm='8' md='8'>
                    <SelectConceptController name={"CodEstado"} control={control} arregloConcepto={arregloEstado} />

                  </Col>
                </Row>
              </Col>

            </Row >
          </CardBody>
        </Card>
        <Row style={{ textAlign: 'right' }} className='mt-1' >
          <Col sm='12' className='mb-1'>
            <Button className='me-1' outline id='reset-button' color='secondary' type='reset' style={{ width: "120px" }} onClick={limpiarListaOrdenTrabajo} >
              LIMPIAR
            </Button>
            <Button color='primary' id="subbutton" type='submit' style={{ width: "120px" }}>
              BUSCAR
            </Button>
          </Col>
        </Row>
      </Form>

        </>

  )

}



function ModalVisualizarPdf({ mostrarModal, setMostrarModal, cargando, objPDFDocumento}) {
  const toggle = () => setMostrarModal(!mostrarModal);
  return ( mostrarModal ?
    <> <Modal
        isOpen={mostrarModal}
        toggle={toggle}
        className='modal-dialog-centered modal-xl'
        style={{ width: "70%",margin: "auto" }}
        contentClassName='pt-0'
      >
        <ModalHeader toggle={toggle} tag='div'>
          <h5 className='modal-title'>VISUALIZAR PDF</h5>
        </ModalHeader>

        <ModalBody className='flex-grow-1'>
          
         <div style={{height: '50rem'}} className="d-flex justify-content-center"  >
          {  cargando ?  <CargandoGif   style={{height: "25rem", marginTop:"100px"}} />  :   
          <OrdenTrabajoPdf  ObjetoData={objPDFDocumento}  />  }
         
         </div>
        </ModalBody>
      </Modal> </> : <></>

  )
  
}


