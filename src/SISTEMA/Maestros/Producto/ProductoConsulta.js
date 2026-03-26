import { Edit, Trash } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row, Table, UncontrolledTooltip } from "reactstrap";
import { ValidarRuc, notificacion } from "../../../utilities/utils/utils";
import { useEffect, useState } from "react";
import { deleteClienteServicio, getClienteListarServicio, postClienteServicio, putClienteServicio } from "../../../Services/serviciosCliente";
import SelectConceptController from "../../../Componentes/Selects/SelectConceptController";
import { yupResolver } from "@hookform/resolvers/yup";
import { getDatosApiSunat } from "../../../Services/serviciosRucSunat";
import { SelectConcepto } from "../../../Componentes/Selects/SelectConcepto";
import { deleteProductoServicio, getProductoListarServicio, putProductoServicio } from "../../../Services/servicioProducto";
import { ValidarEditarProducto, schemaProducto } from "./ValidacionesProducto";
import { getStorageObject } from "../../../utilities/storage/LogalStorage";

const objStorage = getStorageObject();

export default function ProductoConsulta() {
  const { handleSubmit, control, getValues, reset } = useForm({ mode: 'onChange' });
  const [estadoTabla, setEstadoTabla] = useState(false);
  const [listaProductos, setListaProductos] = useState([]);
  const [numeroGrilla, setNumeroGrilla] = useState(0);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [objProductoEdicion, setObjProductoEdicion] = useState({});
  //mostrarModal

  async function listarProducto(params) {
   const objStorage = getStorageObject();
   const datos = {...params, CodAlmacen: objStorage.codSucursal}
   const lista = await getProductoListarServicio(datos);
   setListaProductos(lista);
   setEstadoTabla(true);
   setNumeroGrilla(lista.length ? lista.length : 0);
   if(lista.length === 0 | lista ){
    setEstadoTabla(false);
   }
  }

 async function eliminarProducto(id) {
    const datosEliminar = {
      CodProducto: id,
      CodAlmacen: objStorage.codSucursal
    }

    const res = await deleteProductoServicio(datosEliminar);
    const objFiltro = getValues();
    if (objFiltro.CodMarca === "-1") objFiltro.CodMarca = undefined;
    if (objFiltro.CodFamilia === "-1") objFiltro.CodFamilia = undefined;
    if (objFiltro.CodEstado === "-1") objFiltro.CodEstado = undefined;
    if (objFiltro.Descripcion === "") objFiltro.Descripcion = undefined;
    if (res) {
     listarProducto(objFiltro);
    }
}

  function editarProducto(data) {
    setMostrarModal(!mostrarModal);
    setObjProductoEdicion(data)
    
  }

  function limpiarListaProducto() {
    setListaProductos([]);
    reset();
    setNumeroGrilla(0);
    setEstadoTabla(false);
  }



  return (
    <>

      <CriterioBusquedaProducto limpiarListaProducto={limpiarListaProducto} listarProducto={listarProducto} control={control} handleSubmit={handleSubmit} />

      <div className='divider' style={{ textAlign: "center" }} >
        <div className='divider-text' style={{ fontSize: '13pt' }}>CANTIDAD DE REGISTROS: {numeroGrilla}</div>
      </div>
      <Table bordered responsive>
        <thead>
          <tr>
            <th style={{ width: '70px' }}></th>
            <th style={{ width: '70px' }}></th>
            <th style={{ textAlign: "center" }}>PRODUCTO</th>
            <th style={{ textAlign: "center" }}>COD. INTE</th>
            <th style={{ textAlign: "center" }}>COD. PROD</th>
            <th style={{ textAlign: "center" }}>DESCRIPCION</th>
            <th style={{ textAlign: "center" }}>FAMILIA</th>
            <th style={{ textAlign: "center" }}>MARCA</th>
            <th style={{ textAlign: "center" }}>COSTO</th>
            <th style={{ textAlign: "center" }}>PRECIO</th>
            <th style={{ textAlign: "center" }}>MODELO</th>
            <th style={{ textAlign: "center" }}>STOCK</th>
          </tr>
        </thead>
        {estadoTabla ?
          <tbody>
            {listaProductos?.map(Producto => <tr key={Producto.codProducto}>
              <td style={{ textAlign: "center" }} >
                <Link to="#" id="editarProducto" onClick={() => { if (Producto.codProducto === 0) { notificacion('Registro Inexistente', 'error') } else { editarProducto(Producto) } }}>
                  <Edit size="20" />
                  <UncontrolledTooltip target="editarProducto"> EDITAR </UncontrolledTooltip>
                </Link>
              </td>
              <td style={{ textAlign: "center" }} >
                <Link to="#" id="eliminarProducto" onClick={() => { if (Producto.codProducto === 0) { notificacion('Registro Inexistente', 'error') } else { eliminarProducto(Producto.codProducto) } }}>
                  <Trash size="20" color="red" />
                  <UncontrolledTooltip target="eliminarProducto"> ELIMINAR </UncontrolledTooltip>
                </Link>
              </td>
              <td>
                {Producto.codigoAlternativo}
              </td>
              <td>
                {Producto.codigoInterno}
              </td>
              <td>
                {Producto.codigoProducto}
              </td>
              <td>
                {Producto.descripcion}
              </td>
              <td>
                {Producto.familia}
              </td>
              <td>
                {Producto.marca}
              </td>
              <td>
                {Producto.costo}
              </td>
              <td>
                {Producto.precio}
              </td>
              <td>
                {Producto.modelo}
              </td>
              <td>
                {Producto.stock}
              </td>
            </tr>)}
          </tbody> : <InicializarGrillaProducto />}
      </Table>

      <ModalEditarProducto mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} setData={setObjProductoEdicion} data={objProductoEdicion} getValuesFormBusqueda={getValues} listarProductos={listarProducto}/>
    
    </>);
}



function CriterioBusquedaProducto({ listarProducto, limpiarListaProducto, handleSubmit, control }) {


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
    
    const onSubmit = (data) => {
      if (data.CodMarca === "-1") data.CodMarca = undefined;
      if (data.CodFamilia === "-1") data.CodFamilia = undefined;
      if (data.Descripcion === "") data.Descripcion = undefined;
  
      listarProducto(data);
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
                    <Label sm='4' md='4' size='sm' className='form-label' for='Telefono'>
                      FAMILIA
                    </Label>
                    <Col sm='8' md='8'>
                      <SelectConceptController name={"CodFamilia"} control={control} arregloConcepto={arregloFamilia} />
  
                    </Col>
                  </Row>
                </Col>
  
                <Col sm='3'>
                  <Row className='mb-1'>
                    <Label sm='4' md='4' size='sm' className='form-label' for='Telefono'>
                      MARCA
                    </Label>
                    <Col sm='8' md='8'>
                      <SelectConceptController name={"CodMarca"} control={control} arregloConcepto={arregloMarca} />
                    </Col>
                  </Row>
                </Col>
  
              </Row >
  
            </CardBody>
          </Card>
          <Row style={{ textAlign: 'right' }} className='mt-1' >
            <Col sm='12' className='mb-1'>
              <Button className='me-1' outline id='reset-button' color='secondary' type='reset' style={{ width: "120px" }} onClick={limpiarListaProducto} >
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
  

  function InicializarGrillaProducto() {
    return (
      <tbody>
        <tr >
          <td style={{ textAlign: "center" }} >
            <Link to="#" id="editarProducto" >
              <Edit size="20" />
              <UncontrolledTooltip target="editarProducto"> EDITAR </UncontrolledTooltip>
            </Link>
          </td>
          <td style={{ textAlign: "center" }} >
            <Link to="#" id="eliminarProducto" >
              <Trash size="20" color="red" />
              <UncontrolledTooltip target="eliminarProducto"> ELIMINAR </UncontrolledTooltip>
            </Link>
          </td>
          <td></td>
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


  function ModalEditarProducto({ mostrarModal, setMostrarModal, setData, data, listarProductos, getValuesFormBusqueda }) {

    const { reset, handleSubmit, setValue, register, getValues, control, formState: { errors } } =
    useForm({ mode: 'onChange', resolver: yupResolver(schemaProducto) });

   
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
            ...dt
          }
          if (ValidarEditarProducto(datos)) {

            const res = await putProductoServicio(datos);
            if (res) { 
              const objetoFiltro = getValuesFormBusqueda();
              reset(); 
              setMostrarModal(false);
              if (objetoFiltro.CodMarca === "-1") objetoFiltro.CodMarca = undefined;
              if (objetoFiltro.CodFamilia === "-1") objetoFiltro.CodFamilia = undefined;
              if (objetoFiltro.CodEstado === "-1") objetoFiltro.CodEstado = undefined;
              if (objetoFiltro.Descripcion === "") objetoFiltro.Descripcion = undefined;
              listarProductos(objetoFiltro);
            };
          }
          
        }

        useEffect(() => {
            if (data) {
              function CargarFormulario() {
                setValue("CodMarca", data.codMarca);
                setValue("CodFamilia", data.codFamilia);
                setValue("CodEstado", data.codEstado);
                setValue("CodigoInterno", data.codigoInterno);
                setValue("CodigoProducto", data.codigoProducto);
                setValue("Costo", data.costo);
                setValue("Precio", data.precio);
                setValue("Descripcion", data.descripcion);
                setValue("Modelo", data.modelo);
                setValue("Stock", data.stock);
                setValue("StockMaximo", data.stockMaximo);
                setValue("StockMinimo", data.stockMinimo);
              }
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
            <h5 className='modal-title'>EDITAR PRODUCTO</h5>
          </ModalHeader>
  
          <ModalBody className='flex-grow-1'>
           
          <Form onSubmit={handleSubmit(onSubmit)} id="formCliente" name="formCliente">
          <title>CLIENTES</title>
        <Card className='bg-transparent border-secondary shadow-none'  >
            <CardBody>
            <Row className='mb-1'>
              <Col>
                <h5>REGISTRO DE PRODUCTO</h5>
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
                    CODIGO PRODUCTO
                  </Label>
                  <Col sm='7' md='6'>
                    <Controller
                      name='CodigoProducto'
                      defaultValue=''
                      control={control}
                      render={({ field }) => <Input {...field}  id="CodigoProducto" name="CodigoProducto" bsSize="sm" 
                      style={{ textTransform: 'uppercase' }} placeholder='Ingresar codigo producto' invalid={errors.CodigoProducto && true}
                      
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
                   <Label sm='5' md='6' size='sm' className='form-label' for='Familia'>
                     FAMILIA
                   </Label>
                   <Col sm='7' md='6'>
                    <SelectConceptController arregloConcepto={arregloFamilia} control={control} name={'CodFamilia'} error={errors.CodFamilia} />
                  </Col>
                 </Row>
               </Col>
 
               <Col sm='6'>
                 <Row className='mb-1'>
                   <Label sm='5' md='6' size='sm' className='form-label' for='CodMarca'>
                     MARCA
                   </Label>
                   <Col sm='7' md='6'>
                    <SelectConceptController arregloConcepto={arregloMarca} control={control} name={'CodMarca'} error={errors.CodMarca} />
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
                   <Label sm='5' md='6' size='sm' className='form-label' for='Precio'>
                     PRECIO
                   </Label>
                   <Col sm='7' md='6'>
                     <Controller
                       name='Precio'
                       defaultValue=''
                       control={control}
                       render={({ field }) => <Input {...field} id="Precio" name="Precio" bsSize="sm" 
                       style={{ textTransform: 'uppercase' }} placeholder='Ingresar precio' invalid={errors.Precio && true}
                       />}
                     />
                     {errors.Precio && <FormFeedback>{errors.Precio.message}</FormFeedback>}
                   </Col>
                 </Row>
               </Col>
             </Row>

             
             <Row>
            

               <Col sm='6'>
                 <Row className='mb-1'>
                   <Label sm='5' md='6' size='sm' className='form-label' for='Modelo'>
                     MODELO
                   </Label>
                   <Col sm='7' md='6'>
                     <Controller
                       name='Modelo'
                       defaultValue=''
                       control={control}
                       render={({ field }) => <Input {...field} id="Modelo" name="Modelo" bsSize="sm" 
                       style={{ textTransform: 'uppercase' }} placeholder='Ingresar Modelo' invalid={errors.Modelo && true}
                       />}
                     />
                     {errors.Modelo && <FormFeedback>{errors.Modelo.message}</FormFeedback>}
                   </Col>
                 </Row>
               </Col>

               <Col sm='6'>
                 <Row className='mb-1'>
                   <Label sm='5' md='6' size='sm' className='form-label' for='Familia'>
                     ESTADO
                   </Label>
                   <Col sm='7' md='6'>
                    <SelectConceptController arregloConcepto={arregloEstado} control={control} name={'CodEstado'} error={errors.CodEstado} />
                  </Col>
                 </Row>
               </Col>
 
             </Row>

             <Row>
            

            <Col sm='6'>
              <Row className='mb-1'>
                <Label sm='5' md='6' size='sm' className='form-label' for='Stock'>
                  STOCK
                </Label>
                <Col sm='7' md='6'>
                  <Controller
                    name='Stock'
                    defaultValue=''
                    control={control}
                    render={({ field }) => <Input {...field} id="Stock" name="Stock" bsSize="sm" 
                    style={{ textTransform: 'uppercase' }} placeholder='Ingresar Stock' invalid={errors.Stock && true}
                    />}
                  />
                  {errors.Stock && <FormFeedback>{errors.Stock.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>

            <Col sm='6'>
              <Row className='mb-1'>
                <Label sm='5' md='6' size='sm' className='form-label' for='StockMaximo'>
                  STOCK MAXIMO
                </Label>
                <Col sm='7' md='6'>
                  <Controller
                    name='StockMaximo'
                    defaultValue=''
                    control={control}
                    render={({ field }) => <Input {...field} id="StockMaximo" name="StockMaximo" bsSize="sm" 
                    style={{ textTransform: 'uppercase' }} placeholder='Ingresar Stock Actual' invalid={errors.StockMaximo && true}
                    />}
                  />
                  {errors.StockMaximo && <FormFeedback>{errors.StockMaximo.message}</FormFeedback>}
                </Col>
              </Row>
            </Col>

            <Col sm='6'>
              <Row className='mb-1'>
                <Label sm='5' md='6' size='sm' className='form-label' for='StockMinimo'>
                  STOCK MINIMO
                </Label>
                <Col sm='7' md='6'>
                  <Controller
                    name='StockMinimo'
                    defaultValue=''
                    control={control}
                    render={({ field }) => <Input {...field} id="StockMinimo" name="StockMinimo" bsSize="sm" 
                    style={{ textTransform: 'uppercase' }} placeholder='Ingresar Stock Minimo' invalid={errors.StockMinimo && true}
                    />}
                  />
                  {errors.StockMinimo && <FormFeedback>{errors.StockMinimo.message}</FormFeedback>}
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