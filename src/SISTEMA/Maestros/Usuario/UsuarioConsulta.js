import { Edit, Trash } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row, Table, UncontrolledTooltip } from "reactstrap";
import { ValidarRuc, arregloCargo, notificacion } from "../../../utilities/utils/utils";
import { useEffect, useState } from "react";
//import { deleteClienteUsuario, getClienteListarUsuario, postClienteUsuario, putClienteUsuario } from "../../../Services/UsuarioCliente";
import SelectConceptController from "../../../Componentes/Selects/SelectConceptController";
import { yupResolver } from "@hookform/resolvers/yup";
//import { getDatosApiSunat } from "../../../Services/UsuarioRucSunat";
import { SelectConcepto } from "../../../Componentes/Selects/SelectConcepto";
//import { deleteProductoUsuario, getProductoListarUsuario, putProductoUsuario } from "../../../Services/UsuarioProducto";
import { ValidarEditarUsuario, schemaUsuario } from "./ValidacionesUsuario";
import { getStorageObject } from "../../../utilities/storage/LogalStorage";
import { getUsuarioListarUsuarioServicio, putUsuarioServicio } from "../../../Services/servicioUsuarios";
//import { deleteUsuarioervicio, getUsuarioListarUsuario, putUsuarioervicio } from "../../../Services/Usuarioervicios";

const objStorage = getStorageObject();

export default function UsuarioConsulta() {
  const { handleSubmit, control, getValues, reset } = useForm({ mode: 'onChange' });
  const [estadoTabla, setEstadoTabla] = useState(false);
  const [listaUsuario, setListaUsuario] = useState([]);
  const [numeroGrilla, setNumeroGrilla] = useState(0);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [objUsuarioEdicion, setObjUsuarioEdicion] = useState({});
  //mostrarModal

  async function listarUsuario(params) {
   const objStorage = getStorageObject();
   const datos = {...params, CodAlmacen: objStorage.codSucursal}
   const lista = await getUsuarioListarUsuarioServicio(datos);
   setListaUsuario(lista);
   setEstadoTabla(true);
   setNumeroGrilla(lista.length ? lista.length : 0);
   if(lista.length === 0 | lista ){
    setEstadoTabla(false);
   }
  }

 async function eliminarUsuario(id) {
    // const datosEliminar = {
    //   CodProducto: id,
    //   CodAlmacen: objStorage.codSucursal
    // }

    // const res = await deleteUsuarioervicio(datosEliminar);
    // const objFiltro = getValues();
    // if (objFiltro.CodEstado === "-1") objFiltro.CodEstado = undefined;
    // if (objFiltro.Descripcion === "") objFiltro.Descripcion = undefined;
    // if (res) {
    //  listarUsuario(objFiltro);
    // }
    notificacion("NO SE PUEDE ELIMINAR UN USUARIO", "error")
}

  function editarUsuario(data) {
    setMostrarModal(!mostrarModal);
    setObjUsuarioEdicion(data)
    
  }

  function limpiarListaUsuario() {
    setListaUsuario([]);
    reset();
    setNumeroGrilla(0);
    setEstadoTabla(false);
  }



  return (
    <>

      <CriterioBusquedaUsuario limpiarListaUsuario={limpiarListaUsuario} listarUsuario={listarUsuario} control={control} handleSubmit={handleSubmit} />

      <div className='divider' style={{ textAlign: "center" }} >
        <div className='divider-text' style={{ fontSize: '13pt' }}>CANTIDAD DE REGISTROS: {numeroGrilla}</div>
      </div>
      <Table bordered responsive>
        <thead>
          <tr>
            <th style={{ width: '70px' }}></th>
            <th style={{ width: '70px' }}></th>
            <th style={{ textAlign: "center" }}>NOMBRE USUARIO</th>
            <th style={{ textAlign: "center" }}>NOMBRE COMPLETO</th>
            <th style={{ textAlign: "center" }}>DNI</th>
            <th style={{ textAlign: "center" }}>CORREO</th>
            <th style={{ textAlign: "center" }}>CLAVE</th>
            <th style={{ textAlign: "center" }}>ESTADO</th>
          </tr>
        </thead>
        {estadoTabla ?
          <tbody>
            {listaUsuario?.map(Usuario => <tr key={Usuario.codUsuario}>
              <td style={{ textAlign: "center" }} >
                <Link to="#" id="editarUsuario" onClick={() => { if (Usuario.codUsuario === 0) { notificacion('Registro Inexistente', 'error') } else { editarUsuario(Usuario) } }}>
                  <Edit size="20" />
                  <UncontrolledTooltip target="editarUsuario"> EDITAR </UncontrolledTooltip>
                </Link>
              </td>
              <td style={{ textAlign: "center" }} >
                <Link to="#" id="eliminarUsuario" onClick={() => { if (Usuario.codUsuario === 0) { notificacion('Registro Inexistente', 'error') } else { eliminarUsuario(Usuario.codUsuario) } }}>
                  <Trash size="20" color="red" />
                  <UncontrolledTooltip target="eliminarUsuario"> ELIMINAR </UncontrolledTooltip>
                </Link>
              </td>
              <td>
                {Usuario.nombreUsuario}
              </td>
              <td>
                {Usuario.nombreCompleto}
              </td>
              <td>
                {Usuario.dni}
              </td>
              <td>
                {Usuario.correo}
              </td>
              <td>
                {Usuario.clave}
              </td>
              <td>
                {Usuario.estado}
              </td>
              
            </tr>)}
          </tbody> : <InicializarGrillaUsuario />}
      </Table>

      <ModalEditarUsuario mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} setData={setObjUsuarioEdicion} data={objUsuarioEdicion} getValuesFormBusqueda={getValues} listarUsuario={listarUsuario}/>
    
    </>);
}



function CriterioBusquedaUsuario({ listarUsuario, limpiarListaUsuario, handleSubmit, control }) {


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
  
      listarUsuario(datos);
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
              <Button className='me-1' outline id='reset-button' color='secondary' type='reset' style={{ width: "120px" }} onClick={limpiarListaUsuario} >
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
  

  function InicializarGrillaUsuario() {
    return (
      <tbody>
        <tr >
          <td style={{ textAlign: "center" }} >
            <Link to="#" id="editarUsuario" >
              <Edit size="20" />
              <UncontrolledTooltip target="editarUsuario"> EDITAR </UncontrolledTooltip>
            </Link>
          </td>
          <td style={{ textAlign: "center" }} >
            <Link to="#" id="eliminarUsuario" >
              <Trash size="20" color="red" />
              <UncontrolledTooltip target="eliminarUsuario"> ELIMINAR </UncontrolledTooltip>
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


  function ModalEditarUsuario({ mostrarModal, setMostrarModal, setData, data, listarUsuario, getValuesFormBusqueda }) {

    const { reset, handleSubmit, setValue, register, getValues, control, formState: { errors } } =
  useForm({ mode: 'onChange'/*, resolver: yupResolver(schemaUsuario) */});

   
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
        { dscDocumento: "INACTIVO", value: "2"}
       ]  

        const onSubmit = async (dt) => {
          console.log(data)
          const datos = {
            CodEmpresa: "2",
            CodUsuario: data.codUsuario,
            CodAlmacen: objStorage.codSucursal,
            ...dt
          }
          console.log(data.codEstado)
          if (ValidarEditarUsuario(datos)) {

            const res = await putUsuarioServicio(datos);
            if (res) { 
              const objetoFiltro = getValuesFormBusqueda();
              reset(); 
              setMostrarModal(false);
             
              if (objetoFiltro.CodEstado === "-1") objetoFiltro.CodEstado = undefined;
              if (!objetoFiltro.Descripcion) objetoFiltro.Descripcion = "";
              listarUsuario(objetoFiltro);
            };
          }
          
        }

        useEffect(() => {
   
              function CargarFormulario() {
                setValue("CodEstado", data.codEstado);
                setValue("Descripcion", data.descripcion);
                setValue("NombreCompleto", data.nombreCompleto);
                setValue("NombreUsuario", data.nombreUsuario);
                setValue("Clave", data.clave);
                setValue("CodCargo", data.codcargo ? data.codcargo.toString() : "-1");
                setValue("Correo", data.correo);
                setValue("Dni", data.dni);
                setValue("CodEstado", data.codEstado);
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
            <h5 className='modal-title'>EDITAR Usuario</h5>
          </ModalHeader>
  
          <ModalBody className='flex-grow-1'>
           
          <Form onSubmit={handleSubmit(onSubmit)} id="formUsuario" name="formUsuario">
          <title>CLIENTES</title>
        <Card className='bg-transparent border-secondary shadow-none'  >
            <CardBody>
            <Row className='mb-1'>
              <Col>
                <h5>REGISTRO DE USUARIO</h5>
              </Col>
            </Row>
            <Row>
            <Col sm='6'>
                <Row className='mb-1'>
                  <Label sm='5' md='6' size='sm' className='form-label' for='Dni'>
                    DNI
                  </Label>
                  <Col sm='7' md='6'>
                    <Controller
                      name='Dni'
                      defaultValue=''
                      control={control}
                      render={({ field }) => <Input {...field} id="Dni" name="Dni" bsSize="sm" 
                      style={{ textTransform: 'uppercase' }} placeholder='Ingresar Dni' invalid={errors.Dni && true}
                      />}
                    />
                    {errors.Dni && <FormFeedback>{errors.Dni.message}</FormFeedback>}
                  </Col>
                </Row>
              </Col>
            <Col sm='6'>
                <Row className='mb-1'>
                  <Label sm='5' md='6' size='sm' className='form-label' for='NombreCompleto'>
                    NOMBRE COMPLETO
                  </Label>
                  <Col sm='7' md='6'>
                    <Controller
                      name='NombreCompleto'
                      defaultValue=''
                      control={control}
                      render={({ field }) => <Input {...field}  id="NombreCompleto" name="NombreCompleto" bsSize="sm" 
                      style={{ textTransform: 'uppercase' }} placeholder='Ingresar NombreCompleto' invalid={errors.NombreCompleto && true}
                      
                      />}
                    />
                    {errors.NombreCompleto && <FormFeedback>{errors.NombreCompleto.message}</FormFeedback>}
                  </Col>
                </Row>
              </Col>

              
            </Row>

          
             <Row>
             <Col sm='6'>
                 <Row className='mb-1'>
                   <Label sm='5' md='6' size='sm' className='form-label' for='Clave'>
                   CLAVE
                   </Label>
                   <Col sm='7' md='6'>
                     <Controller
                       name='Clave'
                       defaultValue=''
                       control={control}
                       render={({ field }) => <Input {...field}  id="Clave" name="Clave" bsSize="sm" 
                       style={{ textTransform: 'uppercase' }} placeholder='Ingresar Clave' invalid={errors.Clave && true}
                       
                       />}
                     />
                     {errors.Clave && <FormFeedback>{errors.Clave.message}</FormFeedback>}
                   </Col>
                 </Row>
               </Col>

               <Col sm='6'>
                 <Row className='mb-1'>
                   <Label sm='5' md='6' size='sm' className='form-label' for='Correo'>
                   CORREO
                   </Label>
                   <Col sm='7' md='6'>
                     <Controller
                       name='Correo'
                       defaultValue=''
                       control={control}
                       render={({ field }) => <Input {...field}  id="Correo" name="Correo" bsSize="sm" 
                       style={{ textTransform: 'uppercase' }} placeholder='Ingresar costo' invalid={errors.Correo && true}
                       
                       />}
                     />
                     {errors.Correo && <FormFeedback>{errors.Correo.message}</FormFeedback>}
                   </Col>
                 </Row>
               </Col>

             
             </Row>


             <Row>
             <Col sm='6'>
                 <Row className='mb-1'>
                   <Label sm='5' md='6' size='sm' className='form-label' for='CodCargo'>
                   CARGO
                   </Label>
                   <Col sm='7' md='6'>
                   <SelectConceptController arregloConcepto={arregloCargo} control={control} error={errors.CodCargo} name={"CodCargo"}  />
               
                   </Col>
                 </Row>
               </Col>

               <Col sm='6'>
                 <Row className='mb-1'>
                   <Label sm='5' md='6' size='sm' className='form-label' for='Descripcion'>
                   DESCRIPCION
                   </Label>
                   <Col sm='7' md='6'>
                     <Controller
                       name='Descripcion'
                       defaultValue=''
                       control={control}
                       render={({ field }) => <Input {...field}  id="Descripcion" name="Descripcion" bsSize="sm" 
                       style={{ textTransform: 'uppercase' }} placeholder='Ingresar Descripcion' invalid={errors.Descripcion && true}
                       
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
                   <Label sm='5' md='6' size='sm' className='form-label' for='NombreUsuario'>
                   NOMBRE USUARIO
                   </Label>
                   <Col sm='7' md='6'>
                     <Controller
                       name='NombreUsuario'
                       defaultValue=''
                       control={control}
                       render={({ field }) => <Input {...field}  id="NombreUsuario" name="NombreUsuario" bsSize="sm" 
                       style={{ textTransform: 'uppercase' }} placeholder='Ingresar Nombre Usuario' invalid={errors.NombreUsuario && true}
                       
                       />}
                     />
                     {errors.NombreUsuario && <FormFeedback>{errors.NombreUsuario.message}</FormFeedback>}
                   </Col>
                 </Row>
               </Col>

               <Col sm='6'>
                 <Row className='mb-1'>
                   <Label sm='5' md='6' size='sm' className='form-label' for='CodEstado'>
                   ESTADO
                   </Label>
                   <Col sm='7' md='6'>
                    <SelectConceptController arregloConcepto={arregloEstado}  control={control}  name={"CodEstado"} error={errors.CodEstado} />
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