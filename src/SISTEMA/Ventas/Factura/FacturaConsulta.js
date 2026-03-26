
import { Controller, useForm } from "react-hook-form";
import { Button, Card, CardBody, Col, Form,  Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import {  arregloDocumentoVenta, formatDate, notificacion } from "../../../utilities/utils/utils";
import { useEffect, useState } from "react";
// import { deleteFacturaServicio, getFacturaListarServicio, postFacturaServicio, putFacturaServicio } from "../../../Services/serviciosFactura";
import SelectConceptController from "../../../Componentes/Selects/SelectConceptController";
import { deleteDocumentoVentaServicio, getDocumentoVentaListarServicio, getDocumentoVentaPDFServicio } from "../../../Services/servicioDocumentoVenta";
import { GrillaConsultaDocumento } from "../../../Componentes/Grillas/GrillaDocumentoVenta";
import * as React from 'react';
import { getStorageObject } from "../../../utilities/storage/LogalStorage";
import { DocumentoVentaPdf } from "../../../Pdfs/DocumentoVentaPdf";
import { CargandoGif } from "../../../utilities/utils/Cargando";

export default function FacturaConsulta({setPillActive, listaProductos, setListaProductos, objEdicion, setObjEdicion, estadoActualizo, setEstadoActualizo}) {

  const [mostrarModal, setMostrarModal] = useState(false);
  const [objPDFDocumento, setObjPDFDocumento] = useState({});
  const [listaFacturaes, setListaFacturaes] = useState([]); 
  const [numeroGrilla, setNumeroGrilla] = useState(0);
  const ObjStorage = getStorageObject();
  const [cargando, setCargando] = useState(false);

  //mostrarModal
  const { handleSubmit, control, getValues, reset } = useForm({ mode: 'onChange' });
  function limpiarListaFactura() {
    setListaFacturaes([]);
    setNumeroGrilla(0);
    reset();

  }
  async function listarFactura(params) {
    const parametros = {
      CodAlmacen: "2",
      CodDocumento: params.CodTipoDoc,
      ...params
    }
    const lista = await getDocumentoVentaListarServicio(parametros);
    setListaFacturaes(lista);
    setNumeroGrilla(lista.length);
  }

  async function AnularDocumento(id) {
    const Objeto = { CodDocVenta: id, CodAlmacen: ObjStorage.codSucursal, CodUsuario: ObjStorage.codUsuario }
    const res = await deleteDocumentoVentaServicio(Objeto);

    const objFiltro = getValues();
    if (objFiltro.CodEstado = "-1") objFiltro.CodEstado = undefined
    if (objFiltro.CodFormaPago = "-1") objFiltro.CodFormaPago = undefined
    if (res) {
      const parametros = {
        CodAlmacen: "2",
        CodDocumento: 2,
        CodTipoDoc: 2,
        ...objFiltro
      }
      listarFactura(parametros);
    }

  }

  function EditarDocumento(data) {
    setPillActive('1');
    setObjEdicion(data);
    console.log(JSON.parse(data.docVentaDets))
    setListaProductos(JSON.parse(data.docVentaDets));
  }
  //----------------------------------------------------

  async function VisualizarDocumento(data) {
    setMostrarModal(!mostrarModal);
    setCargando(true);
    const obj = await getDocumentoVentaPDFServicio(data);
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
          listarFactura(parametros);
          setEstadoActualizo(false);
      }

 }, [estadoActualizo])

  return (
    <>

      <CriterioBusquedaFactura limpiarListaFactura={limpiarListaFactura} listarFactura={listarFactura} control={control} handleSubmit={handleSubmit} />

      <div className='divider' style={{ textAlign: "center" }} >
        <div className='divider-text' style={{ fontSize: '13pt' }}>CANTIDAD DE REGISTROS: {numeroGrilla}</div>
      </div>

      <GrillaConsultaDocumento  ListaData={listaFacturaes} AnularDocumento={AnularDocumento} EditarDocumento={EditarDocumento} VisualizarDocumento={VisualizarDocumento} />
      
      <ModarVisualizarPdf   objPDFDocumento={objPDFDocumento} mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} cargando={cargando} />

    </>);
}
//cargando
const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);



function CriterioBusquedaFactura({ listarFactura, limpiarListaFactura, handleSubmit, control }) {


  const arregloEstado = [
    { dscDocumento: "ACTIVO", value: "1" },
    { dscDocumento: "INACTIVO", value: "2" }
  ]

  const arregloFormaPago = [
    { dscDocumento: "CREDITO", value: "1" },
    { dscDocumento: "CONTADO", value: "2" }
  ]

  

  const onSubmit = (data) => {
    if(data.CodTipoDoc === "-1"){
        notificacion("INGRESE UN TIPO DOCUMENTO", "warning");
        return false
      }
  
    if (data.CodEstado === "-1") data.CodEstado = undefined
    if (data.CodFormaPago === "-1") data.CodFormaPago = undefined
    if (data.CodTipoDoc === "-1") data.CodTipoDoc = undefined
    listarFactura(data);



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
                  <Label sm='3' md='3' size='sm' className='form-label' for='RazonSocial' >
                    RZNSOCIAL
                  </Label>
                  <Col sm='9' md='9'>
                    <Controller
                      name='RazonSocial'
                      defaultValue=''
                      control={control}
                      render={({ field }) => <Input {...field} id="RazonSocial" name="RazonSocial" bsSize="sm"
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


            <Row>
              <Col sm='3'>
                <Row className='mb-1'>
                  <Label sm='6' md='6' size='sm' className='form-label' for='CodTipoDoc' >
                    DOCUMENTO
                  </Label>
                  <Col sm='6' md='6'>
                    <SelectConceptController valorDefecto={"2"} name={"CodTipoDoc"} control={control} arregloConcepto={arregloDocumentoVenta} />

                  </Col>
                </Row>
              </Col>
            </Row >

            


          </CardBody>
        </Card>
        <Row style={{ textAlign: 'right' }} className='mt-1' >
          <Col sm='12' className='mb-1'>
            <Button className='me-1' outline id='reset-button' color='secondary' type='reset' style={{ width: "120px" }} onClick={limpiarListaFactura} >
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



function ModarVisualizarPdf({ mostrarModal, setMostrarModal, cargando, objPDFDocumento}) {
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
          <DocumentoVentaPdf  ObjetoData={objPDFDocumento}  />  }
         
         </div>
        </ModalBody>
      </Modal> </> : <></>

  )
  
}