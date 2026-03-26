import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Card, CardBody, Col, Modal, ModalBody, ModalHeader, Row, Form, Label, FormFeedback, Input, FormGroup, Button, Table } from "reactstrap";
import "./ModalAgregarProducto.css"
import { useEffect } from "react";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { getProductoListarAgregarServicio, notificacion } from "../../utilities/utils/utils";
import { getStorageObject } from "../../utilities/storage/LogalStorage";

export function ModalAgregarProducto({ mostrarModal, setMostrarModal, objetoSeleccion, setObjetoSeleccion }) {

  const ObjStorage = getStorageObject();
  const { handleSubmit, control, setValue, formState: { errors } } = useForm({ mode: 'onChange', resolver: yupResolver(schemaAgregarProducto) });
  //argregamos
 
  const toggle = () => setMostrarModal(!mostrarModal);
  const [listaProductos, setListaProductos] = useState([]);
  //objeto seleccion en modal
  const [objtSeleccion, setObjtSeleccion] = useState({});

  const [checkServicio, setCheckServicio] = useState(false);
  const [disbledCantidad, setDisbledCantidad] = useState(false);
  const [descripcion, setDescripcion] = useState("");

  const onSubmit = async (data) => {
    //nuevo objeto donde le pasamos los datos del seleccionado mas el precio y la cantidad ingresada
    const objetoCargadoSeleccion = {
      ...objtSeleccion,
      precio: data.Precio,
      cantidad: data.Cantidad
    }
    if(ValidarAgregarProducto(objetoCargadoSeleccion)){
      setObjetoSeleccion(objetoCargadoSeleccion)
      setMostrarModal(false)
    }
   }

  async function BuscarProducto() {
    const objetoParam = {
      Descripcion: descripcion,
      FlagServicio: checkServicio ? 1 : 0,
      CodAlmacen: ObjStorage.codSucursal
    }
    const listaProducto = await getProductoListarAgregarServicio(objetoParam);
    setListaProductos(listaProducto);
  }

  useEffect(() => {
    if (Object.keys(objtSeleccion).length > 0) {
      setValue("Descripcion", objtSeleccion.codigoAlternativo + "-" + objtSeleccion.descripcion)
    }
  }, [objtSeleccion, setValue])

  useEffect(() => {
    if(!mostrarModal){
      setListaProductos([])
    }

  }, [mostrarModal])



  return (
    <>
  
   <Modal
   isOpen={mostrarModal}
   toggle={toggle}
   className='modal-dialog-centered modal-xl'
   style={{ width: "100%", margin: "auto"}}
   contentClassName='pt-0'
 >
   <ModalHeader toggle={toggle} tag='div'>
     <h5 className='modal-title'>AGREGAR PRODUCTO</h5>
   </ModalHeader>

   <ModalBody className='flex-grow-1' >

     <title>Cotizacion</title>
     <Card className='bg-transparent border-secondary shadow-none'  >
       <CardBody>
         <Row className='mb-2'>
           <Col sm='12'>
             <h5>BUSCAR PRODUCTO</h5>
           </Col>
         </Row>

         <Row>

           <Col sm='2' md='2'>
             <FormGroup check inline>
               <Input
                 type="checkbox"
                 onChange={(e) => setCheckServicio(e.target.checked)}
                 checked={checkServicio}
               />
               <Label check>SERVICIO</Label>
             </FormGroup>
           </Col>
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
          <div style={{height: "30rem"}}> 
          <GrillaResultadoProducto setDisbledCantidad={setDisbledCantidad} setValue={setValue} listaDatos={listaProductos} setObjSeleccion={setObjtSeleccion} objSeleccion={objtSeleccion} />
          </div>
       

       </CardBody>
     </Card>


     <Form onSubmit={handleSubmit(onSubmit)} id="formAgregarProducto" name="formAgregarProducto">
       <Row className="mt-3" >
         <Label className='form-label' sm='1' md='1'  for='Descripcion'>
           DESC
         </Label>

         <Col sm='4' md='4'>
           <Controller
             name='Descripcion'
             defaultValue=''
             control={control}
             render={({ field }) =>
               <Input {...field} disabled id="Descripcion" name="Descripcion"  style={{ textTransform: 'uppercase' }} placeholder='Descripcion'
                 invalid={errors.Descripcion && true} />} />
           {errors.Descripcion && <FormFeedback>{errors.Descripcion.message}</FormFeedback>}

         </Col>
         <Label className='form-label' sm='1' md='1'  for='Cantidad'>
           CANT
         </Label>

         <Col sm='1' md='1'>
           <Controller
             name='Cantidad'
             defaultValue=''
             control={control}
             render={({ field }) =>
               <Input {...field} id="Cantidad" name="Cantidad" disabled={disbledCantidad} style={{ textTransform: 'uppercase' }} placeholder=''
                 invalid={errors.Cantidad && true} />} />
             {errors.Cantidad && <FormFeedback>{errors.Cantidad.message}</FormFeedback>}

         </Col>
         <Label className='form-label'  sm='1' md='1' for='Precio'>
           PRECIO
         </Label>

         <Col sm='2' md='2'>
           <Controller
             name='Precio'
             defaultValue=''
             control={control}
             render={({ field }) =>
               <Input  {...field} id="Precio" name="Precio"  style={{ textTransform: 'uppercase' }} placeholder=''
                 invalid={errors.Precio && true} />} />
            {errors.Precio && <FormFeedback>{errors.Precio.message}</FormFeedback>}

         </Col>
         <Col sm='1' md='1' className='mb-1'>
           <Button color='primary' size='lg' type='submit' >
             AGREGAR
           </Button>
         </Col>
       </Row>
     </Form>
   </ModalBody>
 </Modal>
   
    </> 



  )
}



export function GrillaResultadoProducto({ listaDatos, objSeleccion, setObjSeleccion, setValue, setDisbledCantidad }) {

  function SeleccionarProducto(obj) {
    if(obj.codTipoProducto === 2){
      setValue("Cantidad", "1")
      setDisbledCantidad(true)
    }else{
      setValue("Cantidad", "")
      setDisbledCantidad(false)
    }
    setObjSeleccion(obj)

   
  }



  return (<>
    <div  style={{ maxHeight: '30rem',  overflowY: 'auto'}}>

    <Table bordered responsive className="mt-2" hover  >

      <thead>
        <tr>
          <th style={{ textAlign: "center", width: "120px" }}>CODIGO</th>
          <th style={{ textAlign: "center", width: "300px" }}>PRODUCTO</th>
          <th style={{ textAlign: "center", width: "100px" }}>MARCA</th>
          <th style={{ textAlign: "center", width: "100px" }}>MODELO</th>
          <th style={{ textAlign: "center", width: "60px" }}>COSTO</th>
          <th style={{ textAlign: "center", width: "60px" }}>STOCK</th>
        </tr>
      </thead>
      {listaDatos ?
        <tbody>
          {listaDatos.map((producto) =>
            <tr onClick={() => SeleccionarProducto(producto)} className="tablaDato" key={producto.codigoProducto} >
              <td> {producto.codigoAlternativo}</td>
              <td   >{producto.descripcion}</td>
              <td>{producto.marca}</td>
              <td> {producto.modelo}</td>
              <td>{producto.costo}</td>
              <td>{producto.stock}</td>
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
        <td>
          <Input id="Cantidad" name="Cantidad" bsSize="sm" style={{ width: "80px" }} placeholder='CANTIDAD' />
        </td>
        <td>
          <Input id="Precio" name="Precio" bsSize="sm" style={{ width: "80px" }} placeholder='PRECIO' />
        </td>
        <td></td>
      </tr>
    </tbody>
  )
}


 const schemaAgregarProducto = yup
  .object({
    Precio: yup.number().required("Requerido").typeError("Requerido"),
    Cantidad: yup.number().required("Requerido").typeError("Requerido")
  }).required();

function ValidarAgregarProducto(data){
  console.log(data)
  let cadena = ""
  //valida el objeto
  if(data){
  if(Object.keys(data).length > 0){

    if((parseInt(data.cantidad) > parseInt(data.stock))  & data.codTipoProducto === 1){
      cadena += "NO HAY SUFICIENTE STOCK\n"
    }
    
    //validar cuando es repuesto
    //-----------------------------------------
    if(parseInt(data.precio)  <= parseInt(data.costo)) {
      cadena += "EL PRECIO DEBE SER MAYOR AL COSTO\n"
    }

  }
  }
    if(cadena !== ""){
      notificacion(cadena, "warning")
      return false
    }
    return true
}
























