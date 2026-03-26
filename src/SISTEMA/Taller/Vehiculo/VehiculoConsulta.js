import { Edit, Trash } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row, Table, UncontrolledTooltip } from "reactstrap";
import { ValidarRuc, arregloColor, arregloEstado, arregloMarca, arregloTipoVehiculo, formatearFechaSqltoReact, notificacion } from "../../../utilities/utils/utils";
import { useEffect, useState } from "react";
//import { deleteClienteVehiculo, getClienteListarVehiculo, postClienteVehiculo, putClienteVehiculo } from "../../../Services/VehiculosCliente";
import SelectConceptController from "../../../Componentes/Selects/SelectConceptController";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectConcepto } from "../../../Componentes/Selects/SelectConcepto";
//import { deleteProductoVehiculo, getProductoListarVehiculo, putProductoVehiculo } from "../../../Services/VehiculoProducto";
import { ValidarEditarVehiculo, schemaVehiculo } from "./ValidacionesVehiculo";
import { getStorageObject } from "../../../utilities/storage/LogalStorage";
import { deleteVehiculoServicio, getVehiculoListarVehiculo, putVehiculosServicio } from "../../../Services/servicioVehiculos";
import { InputAutocompleteCliente } from "../../../Componentes/Inputs/InputAutoComplete";
//import { deleteVehiculoVehiculo, getVehiculoListarVehiculo, putVehiculoVehiculo } from "../../../Services/VehiculoVehiculos";

const objStorage = getStorageObject();

export default function VehiculoConsulta() {
  const { handleSubmit, control, getValues, reset } = useForm({ mode: 'onChange' });
  const [estadoTabla, setEstadoTabla] = useState(false);
  const [listaVehiculos, setListaVehiculos] = useState([]);
  const [numeroGrilla, setNumeroGrilla] = useState(0);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [objVehiculoEdicion, setObjVehiculoEdicion] = useState({});
  //mostrarModal

  async function listarVehiculo(params) {
    console.log(objStorage)
   const datos = {...params, CodAlmacen: objStorage.codSucursal, CodTipoVehiculo : (params.CodTipoVehiculo === "-1") ? "0" :  params.CodTipoVehiculo}
   const lista = await getVehiculoListarVehiculo(datos);
   setListaVehiculos(lista);
   setEstadoTabla(true);
   setNumeroGrilla(lista.length ? lista.length : 0);
   if(lista.length === 0 | lista ){
    setEstadoTabla(false);
   }
  }

 async function eliminarVehiculo(id) {
    const datosEliminar = {
      CodVehiculo: id,
      CodAlmacen: objStorage.codSucursal
    }

    const res = await deleteVehiculoServicio(datosEliminar);
    const objFiltro = getValues();
    if (objFiltro.CodEstado === "-1") objFiltro.CodEstado = undefined;
    if (objFiltro.Descripcion === "") objFiltro.Descripcion = undefined;
    if (res) {
     listarVehiculo(objFiltro);
    }
}

  function editarVehiculo(data) {
    setMostrarModal(!mostrarModal);
    setObjVehiculoEdicion(data)
    
  }

  function limpiarListaVehiculo() {
    setListaVehiculos([]);
    reset();
    setNumeroGrilla(0);
    setEstadoTabla(false);
  }



  return (
    <>

      <CriterioBusquedaVehiculo limpiarListaVehiculo={limpiarListaVehiculo} listarVehiculo={listarVehiculo} control={control} handleSubmit={handleSubmit} />

      <div className='divider' style={{ textAlign: "center" }} >
        <div className='divider-text' style={{ fontSize: '13pt' }}>CANTIDAD DE REGISTROS: {numeroGrilla}</div>
      </div>
      <Table bordered responsive>
        <thead>
          <tr>
            <th style={{ width: '70px' }}></th>
            <th style={{ width: '70px' }}></th>
            <th style={{ textAlign: "center" }}>PLACA</th>
            <th style={{ textAlign: "center" }}>CLIENTE</th>
            <th style={{ textAlign: "center" }}>NRO MOTOR</th>
            <th style={{ textAlign: "center" }}>FLOTA</th>
            <th style={{ textAlign: "center" }}>MARCA</th>
            <th style={{ textAlign: "center" }}>COLOR</th>
            <th style={{ textAlign: "center" }}>ESTADO</th>
          </tr>
        </thead>
        {estadoTabla ?
          <tbody>
            {listaVehiculos?.map(Vehiculo => <tr key={Vehiculo.codVehiculo}>
              <td style={{ textAlign: "center" }} >
                <Link to="#" id="editarVehiculo" onClick={() => { if (Vehiculo.codVehiculo === 0) { notificacion('Registro Inexistente', 'error') } else { editarVehiculo(Vehiculo) } }}>
                  <Edit size="20" />
                  <UncontrolledTooltip target="editarVehiculo"> EDITAR </UncontrolledTooltip>
                </Link>
              </td>
              <td style={{ textAlign: "center" }} >
                <Link to="#" id="eliminarVehiculo" onClick={() => { if (Vehiculo.codVehiculo === 0) { notificacion('Registro Inexistente', 'error') } else { eliminarVehiculo(Vehiculo.codVehiculo) } }}>
                  <Trash size="20" color="red" />
                  <UncontrolledTooltip target="eliminarVehiculo"> ELIMINAR </UncontrolledTooltip>
                </Link>
              </td>
              <td>
                {Vehiculo.placa}
              </td>
              <td>
                {Vehiculo.cliente}
              </td>
              <td>
                {Vehiculo.nroMotor}
              </td>
              <td>
                {Vehiculo.nroFlota}
              </td>
              <td>
                {Vehiculo.marca}
              </td>
              <td>
                {Vehiculo.color}
              </td>
              <td>
                {Vehiculo.estado}
              </td>
              
            </tr>)}
          </tbody> : <InicializarGrillaVehiculo />}
      </Table>

      <ModalEditarVehiculo mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} setData={setObjVehiculoEdicion} data={objVehiculoEdicion} getValuesFormBusqueda={getValues} listarVehiculos={listarVehiculo}/>
    
    </>);
}



function CriterioBusquedaVehiculo({ listarVehiculo, limpiarListaVehiculo, handleSubmit, control }) {


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
  
      listarVehiculo(datos);
    }
    const arregloTipoVehiculo = [
      { dscDocumento: "CAMIONETA", value: "1"},
      { dscDocumento: "AUTO", value: "2"},
      { dscDocumento: "CAMIÓN", value: "3"}
     ]  
  
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

                <Col sm='3'>
                  <Row className='mb-1'>
                    <Label sm='4' md='4' size='sm' className='form-label' for='CodTipoVehiculo'>
                      TIPO
                    </Label>
                    <Col sm='8' md='8'>
                      <SelectConceptController name={"CodTipoVehiculo"} control={control}  arregloConcepto={arregloTipoVehiculo} />
                    </Col>
                  </Row>
                </Col>
  
              </Row >
  
            </CardBody>
          </Card>
          <Row style={{ textAlign: 'right' }} className='mt-1' >
            <Col sm='12' className='mb-1'>
              <Button className='me-1' outline id='reset-button' color='secondary' type='reset' style={{ width: "120px" }} onClick={limpiarListaVehiculo} >
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
  

  function InicializarGrillaVehiculo() {
    return (
      <tbody>
        <tr >
          <td style={{ textAlign: "center" }} >
            <Link to="#" id="editarVehiculo" >
              <Edit size="20" />
              <UncontrolledTooltip target="editarVehiculo"> EDITAR </UncontrolledTooltip>
            </Link>
          </td>
          <td style={{ textAlign: "center" }} >
            <Link to="#" id="eliminarVehiculo" >
              <Trash size="20" color="red" />
              <UncontrolledTooltip target="eliminarVehiculo"> ELIMINAR </UncontrolledTooltip>
            </Link>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
  
    )
  
  }


  function ModalEditarVehiculo({ mostrarModal, setMostrarModal, setData, data, listarVehiculos, getValuesFormBusqueda }) {

    const { reset, handleSubmit, setValue, register, getValues, control, formState: { errors } } =
  useForm({ mode: 'onChange', resolver: yupResolver(schemaVehiculo) });

  const [descripcionAutoComplete, setDescripcionAutoComplete] = useState("")
  const [objCliente, setObjCliente] = useState({})
  
const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);


        const onSubmit = async (dt) => {
          const datos = {
            CodCliente: objCliente.codCuentaCorriente ? objCliente.codCuentaCorriente : data.codCliente,
            cliente: descripcionAutoComplete,
            CodEstado: data.codEstado,
            CodVehiculo: data.codVehiculo,
            ...dt
          }
          if (ValidarEditarVehiculo(datos)) {
            const res = await putVehiculosServicio(datos);
            if (res) { 
              const objetoFiltro = getValuesFormBusqueda();
              reset(); 
              setMostrarModal(false);
              setObjCliente({})
              if (objetoFiltro.CodEstado === "-1") objetoFiltro.CodEstado = undefined;
              if (!objetoFiltro.Descripcion) objetoFiltro.Descripcion = "";
              listarVehiculos(objetoFiltro);
            };
          }
          
        }

        useEffect(() => {
   
              function CargarFormulario() {
                setObjCliente({})
                setDescripcionAutoComplete(data.clienteAutoComplete ? data.clienteAutoComplete : "")
                setValue("Placa", data.placa);
                setValue("Chasis", data.chasis);
                setValue("NroMotor", data.nroMotor);
                setValue("CodColor", data.codColor);
                setValue("CodTipoVehiculo", data.codTipoVehiculo);
                setValue("NroFlota", data.nroFlota);
                setValue("CodMarca", data.codMarca);
                setValue("CodEstado", data.codEstado);
                setValue("FechaVctoSoat", formatearFechaSqltoReact(data.fechaVctoSoat ? data.fechaVctoSoat : ""));
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
            <h5 className='modal-title'>EDITAR Vehiculo</h5>
          </ModalHeader>
  
          <ModalBody className='flex-grow-1'>
           
           
          <Form onSubmit={handleSubmit(onSubmit)} id="formVehiculo" name="formVehiculo">
          <title>CLIENTES</title>
        <Card className='bg-transparent border-secondary shadow-none'  >
            <CardBody>
            <Row className='mb-1'>
              <Col>
                <h5>REGISTRO DE Vehiculo</h5>
              </Col>
            </Row>
            <Row>
               <Col sm='6'>
                 <Row className='mb-1'>
                   <Label sm='3' md='4'  size='sm' className='form-label' for='Descripcion'>
                     CLIENTE
                   </Label>
                   <InputAutocompleteCliente setDescripcion={setDescripcionAutoComplete} descripcion={descripcionAutoComplete} setClientSelect={setObjCliente} clienteSelect={objCliente} classname={"col col-sm-7 col-md-6"} />
              
                 </Row>
               </Col>

               <Col sm='6'>
                <Row className='mb-1'>
                  <Label sm='3' md='4' size='sm' className='form-label' for='Placa'>
                    PLACA
                  </Label>
                  <Col sm='7' md='6'>
                    <Controller
                      name='Placa'
                      defaultValue=''
                      control={control}
                      render={({ field }) => <Input {...field} id="Placa" name="Placa" bsSize="sm" 
                      style={{ textTransform: 'uppercase' }} placeholder='Ingresar PLACA' invalid={errors.Placa && true}
                      />}
                    />
                    {errors.Placa && <FormFeedback>{errors.Placa.message}</FormFeedback>}
                  </Col>
                </Row>
              </Col>


             </Row>
            <Row>

            <Col sm='6'>
                <Row className='mb-1'>
                  <Label sm='3' md='4' size='sm' className='form-label' for='Chasis'>
                    CHASIS
                  </Label>
                  <Col sm='7' md='6'>
                    <Controller
                      name='Chasis'
                      defaultValue=''
                      control={control}
                      render={({ field }) => <Input {...field} id="Chasis" name="Chasis" bsSize="sm" 
                      style={{ textTransform: 'uppercase' }} placeholder='Ingresar chasis' invalid={errors.Placa && true}
                      />}
                    />
                    {errors.Chasis && <FormFeedback>{errors.Chasis.message}</FormFeedback>}
                  </Col>
                </Row>
              </Col>

            <Col sm='6'>
                <Row className='mb-1'>
                  <Label sm='3' md='4' size='sm' className='form-label' for='NroMotor'>
                   NRO MOTOR
                  </Label>
                  <Col sm='7' md='6'>
                    <Controller
                      name='NroMotor'
                      defaultValue=''
                      control={control}
                      render={({ field }) => <Input {...field}  id="NroMotor" name="NroMotor" bsSize="sm" 
                      style={{ textTransform: 'uppercase' }} placeholder='Ingresar Numero Motor' invalid={errors.NroMotor && true}
                      
                      />}
                    />
                    {errors.NroMotor && <FormFeedback>{errors.NroMotor.message}</FormFeedback>}
                  </Col>
                </Row>
              </Col>

            </Row>
             <Row>
           
               <Col sm='6'>
                 <Row className='mb-1'>
                   <Label sm='3' md='4' size='sm' className='form-label' for='NroFlota'>
                  NRO FLOTA
                   </Label>
                   <Col sm='7' md='6'>
                     <Controller
                       name='NroFlota'
                       defaultValue=''
                       control={control}
                       render={({ field }) => <Input {...field}  id="NroFlota" name="NroFlota" bsSize="sm" 
                       style={{ textTransform: 'uppercase' }} placeholder='Ingresar numero flota' invalid={errors.NroFlota && true}
                       
                       />}
                     />
                     {errors.NroFlota && <FormFeedback>{errors.NroFlota.message}</FormFeedback>}
                   </Col>
                 </Row>
               </Col>

               <Col sm='6'>
                 <Row className='mb-1'>
                   <Label sm='3' md='4' size='sm' className='form-label' for='NroFlota'>
                     COLOR
                   </Label>
                   <Col sm='7' md='6'>
                   <SelectConceptController  arregloConcepto={arregloColor} control={control} name={'CodColor'} error={errors.CodColor} />

                   </Col>
                 </Row>
               </Col>
 
             </Row>
             <Row>
          </Row>
          <Row>
             <Col sm='6'>
                 <Row className='mb-1'>
                   <Label sm='3' md='4' size='sm' className='form-label' for='FechaVctoSoat'>
                  FECHA VEN. SOAT
                   </Label>
                   <Col sm='7' md='6'>
                     <Controller
                       name='FechaVctoSoat'
                       defaultValue=''
                       control={control}
                       render={({ field }) => <Input {...field} type='date' id="FechaVctoSoat" name="FechaVctoSoat" bsSize="sm" 
                       style={{ textTransform: 'uppercase' }} placeholder='Ingresar vencimiento' invalid={errors.FechaVctoSoat && true}
                       />}
                     />
                     {errors.FechaVctoSoat && <FormFeedback>{errors.FechaVctoSoat.message}</FormFeedback>}
                   </Col>
                 </Row>
               </Col>
               <Col sm='6'>
                 <Row className='mb-1'>
                   <Label sm='3' md='4' size='sm' className='form-label' for='NroFlota'>
                   TIPO VEHICULO
                   </Label>
                   <Col sm='7' md='6'>
                   <SelectConceptController arregloConcepto={arregloTipoVehiculo} control={control} name={'CodTipoVehiculo'} error={errors.CodTipoVehiculo} />

                   </Col>
                 </Row>
               </Col>
             </Row>
             <Row>
             <Col sm='6'>
                 <Row className='mb-1'>
                   <Label sm='3' md='4' size='sm' className='form-label' for='NroFlota'>
                    MARCA
                   </Label>
                   <Col sm='7' md='6'>
                   <SelectConceptController  arregloConcepto={arregloMarca} control={control} name={'CodMarca'} error={errors.CodMarca} />

                   </Col>
                 </Row>
               </Col>

               <Col sm='6'>
                 <Row className='mb-1'>
                   <Label sm='3' md='4' size='sm' className='form-label' for='CodEstado'>
                     ESTADO
                   </Label>
                   <Col sm='7' md='6'>
                   <SelectConceptController  arregloConcepto={arregloEstado} control={control} name={'CodEstado'} error={errors.CodEstado} />

                   </Col>
                 </Row>
               </Col>
             </Row>

             <Row>
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