import { Edit, Trash } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row, Table, UncontrolledTooltip } from "reactstrap";
import { ValidarRuc, notificacion } from "../../../utilities/utils/utils";
import { useEffect, useState } from "react";
//import { deleteClienteServicio, getClienteListarServicio, postClienteServicio, putClienteServicio } from "../../../Services/serviciosCliente";
import SelectConceptController from "../../../Componentes/Selects/SelectConceptController";
import { yupResolver } from "@hookform/resolvers/yup";
import { getDatosApiSunat } from "../../../Services/serviciosRucSunat";
import { SelectConcepto } from "../../../Componentes/Selects/SelectConcepto";
//import { deleteProductoServicio, getProductoListarServicio, putProductoServicio } from "../../../Services/servicioProducto";
import { ValidarEditarServicio, schemaServicio } from "./ValidacionesServicio";
import { getStorageObject } from "../../../utilities/storage/LogalStorage";
import { deleteServicioServicio, getServicioListarServicio, putServicioServicio } from "../../../Services/servicioServicios";

const objStorage = getStorageObject();

export default function ServicioConsulta() {
  const { handleSubmit, control, getValues, reset } = useForm({ mode: 'onChange' });
  const [estadoTabla, setEstadoTabla] = useState(false);
  const [listaServicios, setListaServicios] = useState([]);
  const [numeroGrilla, setNumeroGrilla] = useState(0);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [objServicioEdicion, setObjServicioEdicion] = useState({});
  //mostrarModal

  async function listarServicio(params) {
   const objStorage = getStorageObject();
   const datos = {...params, CodAlmacen: objStorage.codSucursal}
   const lista = await getServicioListarServicio(datos);
   setListaServicios(lista);
   setEstadoTabla(true);
   setNumeroGrilla(lista.length ? lista.length : 0);
   if(lista.length === 0 | lista ){
    setEstadoTabla(false);
   }
  }

 async function eliminarServicio(id) {
    const datosEliminar = {
      CodProducto: id,
      CodAlmacen: objStorage.codSucursal
    }

    const res = await deleteServicioServicio(datosEliminar);
    const objFiltro = getValues();
    if (objFiltro.CodEstado === "-1") objFiltro.CodEstado = undefined;
    if (objFiltro.Descripcion === "") objFiltro.Descripcion = undefined;
    if (res) {
     listarServicio(objFiltro);
    }
}

  function editarServicio(data) {
    setMostrarModal(!mostrarModal);
    setObjServicioEdicion(data)
    
  }

  function limpiarListaServicio() {
    setListaServicios([]);
    reset();
    setNumeroGrilla(0);
    setEstadoTabla(false);
  }



  return (
    <>

      <CriterioBusquedaServicio limpiarListaServicio={limpiarListaServicio} listarServicio={listarServicio} control={control} handleSubmit={handleSubmit} />

      <div className='divider' style={{ textAlign: "center" }} >
        <div className='divider-text' style={{ fontSize: '13pt' }}>CANTIDAD DE REGISTROS: {numeroGrilla}</div>
      </div>
      <Table bordered responsive>
        <thead>
          <tr>
            <th style={{ width: '70px' }}></th>
            <th style={{ width: '70px' }}></th>
            <th style={{ textAlign: "center" }}>SERVICIO</th>
            <th style={{ textAlign: "center" }}>COD. INTE</th>
            <th style={{ textAlign: "center" }}>COD. SERV</th>
            <th style={{ textAlign: "center" }}>DESCRIPCION</th>
            <th style={{ textAlign: "center" }}>COSTO</th>
          </tr>
        </thead>
        {estadoTabla ?
          <tbody>
            {listaServicios?.map(Servicio => <tr key={Servicio.codProducto}>
              <td style={{ textAlign: "center" }} >
                <Link to="#" id="editarServicio" onClick={() => { if (Servicio.codProducto === 0) { notificacion('Registro Inexistente', 'error') } else { editarServicio(Servicio) } }}>
                  <Edit size="20" />
                  <UncontrolledTooltip target="editarServicio"> EDITAR </UncontrolledTooltip>
                </Link>
              </td>
              <td style={{ textAlign: "center" }} >
                <Link to="#" id="eliminarServicio" onClick={() => { if (Servicio.codProducto === 0) { notificacion('Registro Inexistente', 'error') } else { eliminarServicio(Servicio.codProducto) } }}>
                  <Trash size="20" color="red" />
                  <UncontrolledTooltip target="eliminarServicio"> ELIMINAR </UncontrolledTooltip>
                </Link>
              </td>
              <td>
                {Servicio.codigoAlternativo}
              </td>
              <td>
                {Servicio.codigoInterno}
              </td>
              <td>
                {Servicio.codigoProducto}
              </td>
              <td>
                {Servicio.descripcion}
              </td>
              <td>
                {Servicio.costo}
              </td>
              
            </tr>)}
          </tbody> : <InicializarGrillaServicio />}
      </Table>

      <ModalEditarServicio mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} setData={setObjServicioEdicion} data={objServicioEdicion} getValuesFormBusqueda={getValues} listarServicios={listarServicio}/>
    
    </>);
}



function CriterioBusquedaServicio({ listarServicio, limpiarListaServicio, handleSubmit, control }) {


    const arregloFamilia = [
        { dscDocumento: "AMORTIGUADORES", value: "1"},
        { dscDocumento: "LLANTAS", value: "2"},
        { dscDocumento: "AUTOPARTES", value: "3"}
       ]   
    
       const arregloMarca = [
        { dscDocumento: "VOLDSWAGEN", value: "1"},
        { dscDocumento: "HINO", value: "2"},
        { dscDocumento: "HYUNDAU", value: "3"},
        { dscDocumento: "ISUZU", value: "4"},
        { dscDocumento: "VOLVO", value: "5"}
       ]   
       const arregloEstado = [
        { dscDocumento: "ACTIVO", value: "1"},
        { dscDocumento: "INACTIVO", value: "2"},
       ]   

       
    
    const onSubmit = (data) => {
      if (data.CodEstado === "-1") data.CodEstado = undefined;
      if (!data.Descripcion) data.Descripcion = "";
      const datos= {
        CodAlmacen: "2",
        ...data
      }
  
      listarServicio(datos);
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
                      DESC/CODIGO
                    </Label>
                    <Col sm='9' md='9'>
                      <Controller
                        name='Descripcion'
                        defaultValue=''
                        control={control}
                        render={({ field }) => <Input {...field} id="Descripcion" name="Descripcion" bsSize="sm"
                          style={{ textTransform: 'uppercase' }} placeholder='Ingresar la Descripcion'
                        />}
                      />
  
                    </Col>
                  </Row>
                </Col>
  
                <Col sm='3'>
                  <Row className='mb-1'>
                    <Label sm='4' md='4' size='sm' className='form-label' for='CodEstado'>
                      ESTADO
                    </Label>
                    <Col sm='8' md='8'>
                      <SelectConceptController name={"CodEstado"} control={control}  arregloConcepto={arregloEstado} />
                    </Col>
                  </Row>
                </Col>
  
              </Row >
  
            </CardBody>
          </Card>
          <Row style={{ textAlign: 'right' }} className='mt-1' >
            <Col sm='12' className='mb-1'>
              <Button className='me-1' outline id='reset-button' color='secondary' type='reset' style={{ width: "120px" }} onClick={limpiarListaServicio} >
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
  

  function InicializarGrillaServicio() {
    return (
      <tbody>
        <tr >
          <td style={{ textAlign: "center" }} >
            <Link to="#" id="editarServicio" >
              <Edit size="20" />
              <UncontrolledTooltip target="editarServicio"> EDITAR </UncontrolledTooltip>
            </Link>
          </td>
          <td style={{ textAlign: "center" }} >
            <Link to="#" id="eliminarServicio" >
              <Trash size="20" color="red" />
              <UncontrolledTooltip target="eliminarServicio"> ELIMINAR </UncontrolledTooltip>
            </Link>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
  
    )
  
  }


  function ModalEditarServicio({ mostrarModal, setMostrarModal, setData, data, listarServicios, getValuesFormBusqueda }) {

    const { reset, handleSubmit, setValue, register, getValues, control, formState: { errors } } =
  useForm({ mode: 'onChange'/*, resolver: yupResolver(schemaServicio) */});

   
    const arregloFamilia = [
        { dscDocumento: "AMORTIGUADORES", value: "1"},
        { dscDocumento: "LLANTAS", value: "2"},
        { dscDocumento: "AUTOPARTES", value: "3"}
       ]   
       const arregloMarca = [
        { dscDocumento: "VOLDSWAGEN", value: "1"},
        { dscDocumento: "HINO", value: "2"},
        { dscDocumento: "HYUNDAU", value: "3"},
        { dscDocumento: "ISUZU", value: "4"},
        { dscDocumento: "VOLVO", value: "5"}
       ]   
       const arregloEstado = [
        { dscDocumento: "ACTIVO", value: "1"},
        { dscDocumento: "INACTIVO", value: "0"}
       ]  

        const onSubmit = async (dt) => {
          const datos = {
            CodEmpresa: "2",
            CodProducto: data.codProducto,
            CodAlmacen: objStorage.codSucursal,
            CodEstado: data.codEstado,
            ...dt
          }
          if (ValidarEditarServicio(datos)) {

            const res = await putServicioServicio(datos);
            if (res) { 
              const objetoFiltro = getValuesFormBusqueda();
              reset(); 
              setMostrarModal(false);
             
              if (objetoFiltro.CodEstado === "-1") objetoFiltro.CodEstado = undefined;
              if (!objetoFiltro.Descripcion) objetoFiltro.Descripcion = "";
              listarServicios(objetoFiltro);
            };
          }
          
        }

        useEffect(() => {
   
              function CargarFormulario() {
                setValue("CodEstado", data.codEstado);
                setValue("CodEstado", data.codEstado);
                setValue("CodigoInterno", data.codigoInterno);
                setValue("CodigoProducto", data.codigoProducto);
                setValue("Costo", data.costo);
                setValue("Descripcion", data.descripcion);
              }
              if (data) {
                 CargarFormulario();
              }
          }, [data, setValue])
        
          useEffect(() => {
            if(!mostrarModal){
              setData({});
            }
          }, [mostrarModal, setData])
        
        const toggle = () => setMostrarModal(!mostrarModal);


    return (
      <>
        <Modal
          isOpen={mostrarModal}
          toggle={toggle}
          className='modal-dialog-centered modal-xl'
          style={{ width: "70%", margin: "auto" }}
          contentClassName='pt-0'
        >
          <ModalHeader toggle={toggle} tag='div'>
            <h5 className='modal-title'>EDITAR Servicio</h5>
          </ModalHeader>
  
          <ModalBody className='flex-grow-1'>
           
          <Form onSubmit={handleSubmit(onSubmit)} id="formServicio" name="formServicio">
          <title>CLIENTES</title>
        <Card className='bg-transparent border-secondary shadow-none'  >
            <CardBody>
            <Row className='mb-1'>
              <Col>
                <h5>REGISTRO DE SERVICIO</h5>
              </Col>
            </Row>
            <Row>
            <Col sm='6'>
                <Row className='mb-1'>
                  <Label sm='5' md='6' size='sm' className='form-label' for='CodigoInterno'>
                    CODIGO INTERNO
                  </Label>
                  <Col sm='7' md='6'>
                    <Controller
                      name='CodigoInterno'
                      defaultValue=''
                      control={control}
                      render={({ field }) => <Input {...field} id="CodigoInterno" name="CodigoInterno" bsSize="sm" 
                      style={{ textTransform: 'uppercase' }} placeholder='Ingresar codigo interno' invalid={errors.CodigoInterno && true}
                      />}
                    />
                    {errors.CodigoInterno && <FormFeedback>{errors.CodigoInterno.message}</FormFeedback>}
                  </Col>
                </Row>
              </Col>
            <Col sm='6'>
                <Row className='mb-1'>
                  <Label sm='5' md='6' size='sm' className='form-label' for='CodigoProducto'>
                    CODIGO SERVICIO
                  </Label>
                  <Col sm='7' md='6'>
                    <Controller
                      name='CodigoProducto'
                      defaultValue=''
                      control={control}
                      render={({ field }) => <Input {...field}  id="CodigoProducto" name="CodigoProducto" bsSize="sm" 
                      style={{ textTransform: 'uppercase' }} placeholder='Ingresar codigo Servicio' invalid={errors.CodigoProducto && true}
                      
                      />}
                    />
                    {errors.CodigoProducto && <FormFeedback>{errors.CodigoProducto.message}</FormFeedback>}
                  </Col>
                </Row>
              </Col>

              
            </Row>

            <Row>
               <Col sm='12'>
                 <Row className='mb-1'>
                   <Label sm='3' md='3' size='sm' className='form-label' for='Descripcion'>
                     DESCRIPCION
                   </Label>
                   <Col sm='9' md='9'>
                     <Controller
                       name='Descripcion'
                       defaultValue=''
                       control={control}
                       render={({ field }) => <Input {...field} id="Descripcion" name="Descripcion" bsSize="sm" 
                       style={{ textTransform: 'uppercase' }} placeholder='INGRESAR Descripcion' invalid={errors.Descripcion && true}
                       />}
                     />
                     {errors.Descripcion && <FormFeedback>{errors.Descripcion.message}</FormFeedback>}
                   </Col>
                 </Row>
               </Col>
             </Row>


           

             <Row>
             <Col sm='6'>
                 <Row className='mb-1'>
                   <Label sm='5' md='6' size='sm' className='form-label' for='Costo'>
                     COSTO
                   </Label>
                   <Col sm='7' md='6'>
                     <Controller
                       name='Costo'
                       defaultValue=''
                       control={control}
                       render={({ field }) => <Input {...field}  id="Costo" name="Costo" bsSize="sm" 
                       style={{ textTransform: 'uppercase' }} placeholder='Ingresar costo' invalid={errors.Costo && true}
                       
                       />}
                     />
                     {errors.Costo && <FormFeedback>{errors.Costo.message}</FormFeedback>}
                   </Col>
                 </Row>
               </Col>

               <Col sm='6'>
                 <Row className='mb-1'>
                   <Label sm='5' md='6' size='sm' className='form-label' for='CodEstado'>
                     ESTADO
                   </Label>
                   <Col sm='7' md='6'>
                    <SelectConceptController arregloConcepto={arregloEstado} control={control} name={'CodEstado'} error={errors.CodEstado} />
                  </Col>
                 </Row>
               </Col>
             </Row>


         </CardBody>
        </Card>
        <Row style={{ textAlign: 'right' }}>
          <Col sm='12' className='mb-1'>
            <Button color='primary' type='submit' style={{ width: "120px" }}>
              GRABAR
            </Button>
          </Col>
        </Row>
        </Form>     

          </ModalBody>
  
  
        </Modal>
      </>
    )
  }