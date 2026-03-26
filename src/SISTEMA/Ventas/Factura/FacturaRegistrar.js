import { Form, Card, CardBody, Col, Row, Label, FormFeedback, Input, Button, Table } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import SelectConceptController from '../../../Componentes/Selects/SelectConceptController';
import { ValidarGrabarFactura } from './ValidacionesFactura';
import { InputAutocompleteCliente } from '../../../Componentes/Inputs/InputAutoComplete';
import { useEffect, useState } from 'react';
import { GrillaBuscarProducto } from '../../../Componentes/Grillas/GrillaProductos';
import { ModalAgregarProducto } from '../../../Componentes/Modal/ModalAgregarProducto';
import { arregloDocumentoVenta, formatDate, notificacion } from '../../../utilities/utils/utils';
import { getTraerNumeroxSerieServicio } from '../../../Services/servicioCorrelativo';
import { getStorageObject } from '../../../utilities/storage/LogalStorage';
import { getDocumentoVentaObjServicio, postDocumentoVentaServicio, postDocumentoVentaServicioFactura, putDocumentoVentaServicio } from '../../../Services/servicioDocumentoVenta';
import { getOrdenTrabajoObjServicio } from '../../../Services/servicioOrdenTrabajo';

export default function FacturaRegistrar({ setPillActive, listaProductos, setListaProductos, objEdicion, setObjEdicion, estadoActualizo, setEstadoActualizo }) {
  const { reset, handleSubmit, register, getValues, setValue, control, formState: { errors } } =
    useForm({ mode: 'onChange'/*, resolver: yupResolver(schemaFactura) */ });

  const { onChange } = register('Serie', { onChange: (e) => { FuncionCargarNumero(e.target.value) } })
  const { onChangeDoc } = register('CodTipoDoc', { onChange: (e) => { 
    setCodTipoDoc(e.target.value)
    if(e.target.value === "6"){
      setCodTipoCliente("1") 
    }else{
      setCodTipoCliente("0") 
    }
    if(e.target.value === "-1"){
      setCodTipoCliente("1") 
    }
  
  } })
  const { onBlur } = register('Cotizacion', { onBlur: (e) => { 
    if(e.target.value === ""){
    }else
    FuncionCargarCotizacion(e.target.value) 
  } });
  const { onBlurOT } = register('NroOrdenTrabajo', { onBlur: (e) => { 
    if(e.target.value === ""){
    }else
    FuncionCargarOrdenTrabajo(e.target.value)
   } });

  

  const [objCliente, setObjCliente] = useState({});
  const [codTipoDoc, setCodTipoDoc] = useState("2");
  const [codTipoCliente, setCodTipoCliente] = useState("0");
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
  const [objProductoAgregado, setObjProductoAgregado] = useState({});

  const [numeroCotizacion, setNumeroCotizacion] = useState("");
  const [codCotizacion, setCodCotizacion] = useState(0);
  const [codOrdenTrabajo, setCodOrdenTrabajo] = useState(0);
  
  const [cotizacionEstado, setCotizacionEstado] = useState(false);
  const [ordenTrabajoDisabled, setOrdenTrabajoDisabled] = useState(false);

  const [descripcionAutoComplete, setDescripcionAutoComplete] = useState("");
  const [documentoDisabled, setDocumentoDisabled] = useState(false);
  

  const ObjStorage = getStorageObject();

  const arregloSerie = [
    { dscDocumento: "0001", value: "0001" },
  ]
  const arregloMetodoPago = [
    { dscDocumento: "CREDITO", value: "1" },
    { dscDocumento: "CONTADO", value: "2" },
  ]
  const arregloVendedor = [
    { dscDocumento: "MIGUEL FLORES", value: "1" }
  ]
  const arregloMoneda = [
    { dscDocumento: "SOLES", value: "1" }
  ]
  const arregloIGV = [
    { dscDocumento: "0.180", value: "1" }
  ]

  useEffect(() => {
    console.log(objEdicion)
    if (objEdicion) {
      if (Object.keys(objEdicion).length > 0) {
        setValue("CodFormaPago", objEdicion.codFormaPago)
        setValue("CodMoneda", objEdicion.codMoneda)
        setValue("CodVendedor", objEdicion.codVendedor.toString())
        setValue("Direccion", objEdicion.direccion)
        setValue("Emision", alreves(objEdicion.emision))
        //console.log(alreves(objEdicion.emision))
        setValue("Igv", objEdicion.igv)
        setValue("IgvPorcentaje", '1')
        setValue("NumeroDoc", objEdicion.numeroDoc)
        setValue("CodTipoDoc", objEdicion.codTipoDoc)
        setValue("Serie", objEdicion.serieDoc)
        setValue("SubTotal", objEdicion.subTotal)
        setValue("Total", objEdicion.total)
        setDescripcionAutoComplete(objEdicion.cliente)
        setObjCliente({ codCuentaCorriente: objEdicion.codCliente, direccion: objEdicion.direccion })
        setValue("Cotizacion", "")
        setCotizacionEstado(true)
        setOrdenTrabajoDisabled(true)
        setDocumentoDisabled(true)

      }
    }


  }, [objEdicion])

  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);

  async function FuncionCargarNumero(numero) {
    if (numero & numero !== "-1") {
      const datos = {
        SerieDoc: numero,
        CodAlmacen: ObjStorage.codSucursal, //almacen
        CodEmpresa: "2", //empresa
        CodTipoDoc: codTipoDoc  //Factura
      }
      const objetoNumero = await getTraerNumeroxSerieServicio(datos);
      if (Object.keys(objetoNumero).length > 0) {
        setValue("NumeroDoc", objetoNumero.numeroDoc)
      }
    }
  }
  
  function alreves(texto) {
    const alreves = texto.split("/").reverse().join("/").replaceAll("/", "-");
    return alreves;
  }


  const mostrarFuncion = () => setMostrarModalAgregar(!mostrarModalAgregar);

  function EliminarProducto(producto) {
    const listaNueva = listaProductos.filter((e) => producto.codProducto !== e.codProducto)
    setListaProductos(listaNueva);
  }

  //-------------------------

  function ActualizarPrecio(precio, producto) {

    const objetoModificado = {
      ...producto,
      precio: precio
    }
    let nuevoArray = []
    for (let i = 0; i < listaProductos.length; i++) {
      if (listaProductos[i].codProducto === producto.codProducto) {
        nuevoArray[i] = objetoModificado
      } else {
        nuevoArray[i] = listaProductos[i]
      }
    }
    setListaProductos(nuevoArray)
  }

  function ActualizarCantidad(cantidad, producto) {
    const objetoModificado = {
      ...producto,
      cantidad: cantidad
    }
    let nuevoArray = []
    for (let i = 0; i < listaProductos.length; i++) {
      if (listaProductos[i].codProducto === producto.codProducto) {
        nuevoArray[i] = objetoModificado
      } else {
        nuevoArray[i] = listaProductos[i]
      }
    }
    setListaProductos(nuevoArray)
  }

  //----------------

  useEffect(() => {
    console.log(objCliente)
    if (objCliente) {
      if (Object.values(objCliente).length > 0) {
        setValue("Direccion", objCliente.direccion)
      }
    } else {
      setValue("Direccion", "")
    }
  }, [objCliente])

  useEffect(() => {
    if (objProductoAgregado) {
      if (Object.keys(objProductoAgregado).length > 0) {
        if (ValidarAniadirProducto(objProductoAgregado, listaProductos)) {
          const arreglo = [
            objProductoAgregado,
            ...listaProductos
          ]
          setListaProductos(arreglo);
          setMostrarModalAgregar(false);
        }
      }
    }

  }, [objProductoAgregado])

  function handleResetClick()  {
    setListaProductos([]);
    reset();
    setObjCliente({})
    setObjEdicion({})
    setDescripcionAutoComplete("")
    setCodCotizacion(0)
    setCodOrdenTrabajo(0)
    setCotizacionEstado(false)  
    setOrdenTrabajoDisabled(false)
    setDocumentoDisabled(false)
    setValue("IgvPorcentaje", "1")
    setValue("CodTipoDoc", "2")
    setValue("CodMoneda", "1")
    setValue("CodFormaPago", "1")
    setValue("CodTipoDoc", "2")
  
  }


  const onSubmit = async (data) => {
    //EDICION
    if (Object.keys(objEdicion).length > 0) {
      const listaJsonCadena = JSON.stringify(listaProductos)
      const datos = {
        CodEmpresa: "2",
        CodDocVenta: objEdicion.codDocVenta,
        CodCliente: objCliente ? objCliente.codCuentaCorriente : 0,
        SerieDoc: data.Serie,
        CodAlmacen: ObjStorage.codSucursal,
        CodUsuario: ObjStorage.codUsuario,
        CodTipoDoc: data.CodTipoDoc, //Factura,
        Jsondetalle: listaJsonCadena,
        ...data
      }

      if (ValidarGrabarFactura(datos, listaProductos, objCliente)) {
        const res = await putDocumentoVentaServicio(datos);
        if (res) {
          reset(); setListaProductos([]); setObjCliente({}); setObjEdicion({}, setDescripcionAutoComplete(""))
          setPillActive('2')
          setEstadoActualizo(true)
        }
      }
    } else {
      //GRABAR
      const listaJsonCadena = JSON.stringify(listaProductos)
      const datos = {
        CodEmpresa: "2",
        CodCliente: objCliente ? objCliente.codCuentaCorriente : 0,
        SerieDoc: data.Serie,
        CodAlmacen: ObjStorage.codSucursal,
        CodUsuario: ObjStorage.codUsuario,
        Jsondetalle: listaJsonCadena,
        CodCotizacion: codCotizacion,
        CodOrdenTrabajo: codOrdenTrabajo ? codOrdenTrabajo : 0,
        CodTipoDoc: data.CodTipoDoc,
        ...data,
        
        
        
      }
      // console.log(datos)
      if (ValidarGrabarFactura(datos, listaProductos, objCliente)) {
        const res = await postDocumentoVentaServicioFactura(datos);
        if (res) {
          reset(); setListaProductos([]); setObjCliente({}); setObjEdicion({}, setDescripcionAutoComplete(""))
          setCodCotizacion(0)
          setCodOrdenTrabajo(0)
          setEstadoActualizo(false)
          setOrdenTrabajoDisabled(false)
          setNumeroCotizacion("")
          setValue("Cotizacion", "")
          handleResetClick();
        }
      }
    }
  }
  useEffect(() => {

    if (listaProductos) {
      if (listaProductos.length > 0) {
        //PRIMERO LOS LIMPIAMOS
        let SubTotal = 0
        listaProductos.forEach((e) => { SubTotal += parseFloat(e.precio) * parseFloat(e.cantidad) });
        let IGV = SubTotal * 0.180
        setValue("SubTotal", SubTotal.toFixed(2))
        setValue("Igv", IGV.toFixed(2))
        let Total = SubTotal + IGV
        setValue("Total", Total.toFixed(2))
      } else {
        setValue("SubTotal", ""); setValue("Igv", ""); setValue("Total", "")
      }
    }
  }, [listaProductos, setValue])

  async function FuncionCargarCotizacion(e){
   
  
    try{
      if(ValidarBuscarCotizacion(e)){
        const ObjCotiza = await getDocumentoVentaObjServicio({NumeroCotizacion: e, CodTipoDoc: 3 });
        setValue("CodFormaPago", ObjCotiza.codFormaPago)
        setValue("CodMoneda", ObjCotiza.codMoneda)
        setValue("CodVendedor", ObjCotiza.codVendedor.toString())
        setValue("Direccion", ObjCotiza.direccion)
        setValue("Emision", alreves(ObjCotiza.emision))
        //console.log(alreves(objEdicion.emision))
        setValue("Igv", ObjCotiza.igv)
        setValue("IgvPorcentaje", '1')
      //  setValue("NumeroDoc", ObjCotiza.numeroDoc)
        //setValue("Serie", ObjCotiza.serieDoc)
        setValue("SubTotal", ObjCotiza.subTotal)
        setValue("Total", ObjCotiza.total)
        setDescripcionAutoComplete(ObjCotiza.cliente)
        setObjCliente({ codCuentaCorriente: ObjCotiza.codCliente, direccion: ObjCotiza.direccion })
        setListaProductos(JSON.parse(ObjCotiza.docVentaDets))
        setCodCotizacion(ObjCotiza.codCotizacion)

        setCotizacionEstado(true)
        setValue("CodTipoDoc", "2")
       }

    }catch(e){
      setListaProductos([]);
      reset();
      setObjCliente({})
      setObjEdicion({})
      setDescripcionAutoComplete("")
      setNumeroCotizacion("")
      setValue("Cotizacion", "")
      setValue("CodTipoDoc", "2")
      setCotizacionEstado(false)
      notificacion("NO SE ENCONTRO LA COTIZACION", "warning")
    }
  }


  useEffect(() => {
    setValue("CodTipoDoc", "2")
  },[])

  async function FuncionCargarOrdenTrabajo(e){
  
  
    try{
      if(ValidarBuscarCotizacion(e)){
        const ObjeOrdenTrabajo = await getOrdenTrabajoObjServicio({NumeroOrdenTrabajo: e});
        setValue("CodFormaPago", ObjeOrdenTrabajo.codFormaPago)
        setValue("CodMoneda", ObjeOrdenTrabajo.codMoneda)
        setValue("CodVendedor", ObjeOrdenTrabajo.codVendedor.toString())
        setValue("Direccion", ObjeOrdenTrabajo.direccion)
        setValue("Emision", alreves(ObjeOrdenTrabajo.emision))
        //console.log(alreves(objEdicion.emision))
        setValue("Igv", ObjeOrdenTrabajo.igv)
        setValue("IgvPorcentaje", '1')
      //  setValue("NumeroDoc", ObjCotiza.numeroDoc)
        //setValue("Serie", ObjCotiza.serieDoc)
        setValue("SubTotal", ObjeOrdenTrabajo.subTotal)
        setValue("Total", ObjeOrdenTrabajo.total)
        setDescripcionAutoComplete(ObjeOrdenTrabajo.cliente)
        setObjCliente({ codCuentaCorriente: ObjeOrdenTrabajo.codCliente, direccion: ObjeOrdenTrabajo.direccion })
        setListaProductos(JSON.parse(ObjeOrdenTrabajo.ordenTrabajoDets))
        setCodOrdenTrabajo(ObjeOrdenTrabajo.codOrdenTrabajo)
        setCotizacionEstado(true)
        setOrdenTrabajoDisabled(true)
        setValue("CodTipoDoc", "2")
       }

    }catch(e){
      setListaProductos([]);
      reset();
      setObjCliente({})
      setObjEdicion({})
      setDescripcionAutoComplete("")
      setNumeroCotizacion("")
      setValue("Cotizacion", "")
      setCotizacionEstado(false)
      setOrdenTrabajoDisabled(false)
      notificacion("NO SE ENCONTRO LA ORDEN TRABAJO", "warning")

    }
    
    

  }

  //

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} id="formFactura" name="formFactura">
        <title>DOCUMENTO VENTA</title>
        <Card className='bg-transparent border-secondary shadow-none'  >
          <CardBody>
            <Row className='mb-1'>
              <Col>
                <h5>REGISTRO DE DOCUMENTO VENTA</h5>
              </Col>
            </Row>
            <Row>
              <Col sm='4'>
                <Row className='mb-1'>
                  <Label sm='4' md='4' size='sm' className='form-label' for='CodigoInterno'>
                    CLIENTE
                  </Label>
                  <InputAutocompleteCliente  codTipoCliente={codTipoCliente} setDescripcion={setDescripcionAutoComplete} descripcion={descripcionAutoComplete} setClientSelect={setObjCliente} clienteSelect={objCliente} classname={"col col-sm-8 col-md-8"} />
                </Row>
              </Col>
              <Col sm='4'>
                <Row className='mb-1'>
                  <Label sm='3' md='4' size='sm' className='form-label' for='Direccion'>
                    DIRECCION
                  </Label>
                  <Col sm='8' md='8'>
                    <Controller
                      name='Direccion'
                      defaultValue=''
                      control={control}
                      render={({ field }) => <Input {...field} id="Direccion" name="Direccion" bsSize="sm"
                        style={{ textTransform: 'uppercase' }} placeholder='Ingresar Direccion' invalid={errors.Direccion && true}
                      />}
                    />
                    {errors.Direccion && <FormFeedback>{errors.Direccion.message}</FormFeedback>}
                  </Col>
                </Row>
              </Col>

              <Col sm='4'>
                <Row className='mb-1'>
                  <Label sm='4' md='4' size='sm' className='form-label' for='CodTipoDoc'>
                    DOCUMENTO
                  </Label>
                  <Col sm='8' md='8'>
                    <SelectConceptController  valorDefecto={"2"} disabled={documentoDisabled} arregloConcepto={arregloDocumentoVenta} control={control} name={'CodTipoDoc'} error={errors.CodTipoDoc} />

                  </Col>
                </Row>
              </Col>

            </Row>
            <Row>
              <Col sm='4'>
                <Row className='mb-1'>
                  <Label sm='4' md='4' size='sm' className='form-label' for='Serie'>
                    SERIE
                  </Label>
                  <Col sm='8' md='8'>
                    <SelectConceptController valorDefecto={"-1"} arregloConcepto={arregloSerie} control={control} name={'Serie'} error={errors.Serie} />
                  </Col>
                </Row>
              </Col>

              <Col sm='4'>
                <Row className='mb-1'>
                  <Label sm='4' md='4' size='sm' className='form-label' for='NumeroDoc'>
                    NUMERO
                  </Label>
                  <Col sm='8' md='8'>
                    <Controller
                      name='NumeroDoc'
                      defaultValue=''
                      control={control}
                      render={({ field }) => <Input {...field} id="NumeroDoc" name="NumeroDoc" bsSize="sm"
                        style={{ textTransform: 'uppercase' }} invalid={errors.NumeroDoc && true}

                      />}
                    />
                    {errors.NumeroDoc && <FormFeedback>{errors.NumeroDoc.message}</FormFeedback>}
                  </Col>
                </Row>
              </Col>

              <Col sm='4'>
                <Row className='mb-1'>
                  <Label sm='4' md='4' size='sm' className='form-label' for='IgvPorcentaje'>
                    IGV (%)
                  </Label>
                  <Col sm='8' md='8'>
                    <SelectConceptController disabled={true} valorDefecto={"1"} arregloConcepto={arregloIGV} control={control} name={'IgvPorcentaje'} error={errors.IgvPorcentaje} />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col sm='4'>
                <Row className='mb-1'>
                  <Label sm='4' md='4' size='sm' className='form-label' for='Emision'>
                    EMISION
                  </Label>
                  <Col sm='8' md='8'>
                    <Controller
                      name='Emision'
                      defaultValue={formatDate(hoy)}
                      control={control}
                      render={({ field }) => <Input type='date' {...field} id="Emision" name="Numero" bsSize="sm"
                        style={{ textTransform: 'uppercase' }} invalid={errors.Emision && true}

                      />}
                    />
                    {errors.Emision && <FormFeedback>{errors.Emision.message}</FormFeedback>}
                  </Col>
                </Row>
              </Col>

              <Col sm='4'>
                <Row className='mb-1'>
                  <Label sm='4' md='4' size='sm' className='form-label' for='CodFormaPago'>
                    METODO
                  </Label>
                  <Col sm='8' md='8'>
                    <SelectConceptController valorDefecto={"1"} arregloConcepto={arregloMetodoPago} control={control} name={'CodFormaPago'} error={errors.CodFormaPago} />
                  </Col>
                </Row>
              </Col>

              <Col sm='4'>
                <Row className='mb-1'>
                  <Label sm='4' md='4' size='sm' className='form-label' for='CodVendedor'>
                    VENDEDOR
                  </Label>
                  <Col sm='8' md='8'>
                    <SelectConceptController arregloConcepto={arregloVendedor} control={control} name={'CodVendedor'} error={errors.CodVendedor} />
                  </Col>
                </Row>
              </Col>
            </Row>
           

            <Row>
            
              <Col sm='4'>
                <Row className='mb-1'>
                  <Label sm='4' md='4' size='sm' className='form-label' for='Total'>
                   COTIZACION
                  </Label>
                  <Col sm='8' md='8'>

                 {/* <Input  id="Cotizacion"  defaultValue={numeroCotizacion} onChange={(e) => setNumeroCotizacion(e.target.value)}  disabled={cotizacionEstado}  onBlur={(e) => FuncionCargarCotizacion(e.target.value)} name="Cotizacion" bsSize="sm" style={{ textTransform: 'uppercase' }} placeholder=''  /> */}
                 <Controller
                      name='Cotizacion'
                      defaultValue=''
                      
                      control={control}
                      render={({ field }) => <Input disabled={cotizacionEstado}  {...field} id="Cotizacion" name="Cotizacion" bsSize="sm"
                        style={{ textTransform: 'uppercase' }} placeholder='' invalid={errors.Cotizacion && true}
                      />}
                    />
                    {errors.Cotizacion && <FormFeedback>{errors.Cotizacion.message}</FormFeedback>}
                  </Col>
                </Row>
              </Col>


              <Col sm='4'>
                <Row className='mb-1'>
                  <Label sm='4' md='4' size='sm' className='form-label' for='Total'>
                   ORDEN TRABAJO
                  </Label>
                  <Col sm='8' md='8'>

                 {/* <Input  id="Cotizacion"  defaultValue={numeroCotizacion} onChange={(e) => setNumeroCotizacion(e.target.value)}  disabled={cotizacionEstado}  onBlur={(e) => FuncionCargarCotizacion(e.target.value)} name="Cotizacion" bsSize="sm" style={{ textTransform: 'uppercase' }} placeholder=''  /> */}
                 <Controller
                      name='NroOrdenTrabajo'
                      defaultValue=''
                      
                      control={control}
                      render={({ field }) => <Input disabled={ordenTrabajoDisabled}  {...field} id="NroOrdenTrabajo" name="NroOrdenTrabajo" bsSize="sm"
                        style={{ textTransform: 'uppercase' }} placeholder='' invalid={errors.NroOrdenTrabajo && true}
                      />}
                    />
                    {errors.NroOrdenTrabajo && <FormFeedback>{errors.NroOrdenTrabajo.message}</FormFeedback>}
                  </Col>
                </Row>
              </Col>


              <Col sm='4'>
                <Row className='mb-1'>
                  <Label sm='4' md='4' size='sm' className='form-label' for='CodMoneda'>
                    MONEDA
                  </Label>
                  <Col sm='8' md='8'>
                    <SelectConceptController disabled={true} valorDefecto={"1"} arregloConcepto={arregloMoneda} control={control} name={'CodMoneda'} error={errors.CodMoneda} />

                  </Col>
                </Row>


                
              </Col>
            </Row>

            <Row>
              <Col sm='4'>
                <Row className='mb-1'>
                  <Label sm='4' md='4' size='sm' className='form-label' for='SubTotal'>
                    SUBTOTAL
                  </Label>
                  <Col sm='8' md='8'>
                    <Controller
                      name='SubTotal'
                      defaultValue=''
                      control={control}
                      render={({ field }) => <Input disabled {...field} id="SubTotal" name="SubTotal" bsSize="sm"
                        style={{ textTransform: 'uppercase' }} placeholder='' invalid={errors.SubTotal && true}

                      />}
                    />
                    {errors.SubTotal && <FormFeedback>{errors.SubTotal.message}</FormFeedback>}
                  </Col>
                </Row>
              </Col>
              <Col sm='4'>
                <Row className='mb-1'>
                  <Label sm='4' md='4' size='sm' className='form-label' for='Igv'>
                    IGV
                  </Label>
                  <Col sm='8' md='8'>
                    <Controller
                      name='Igv'
                      defaultValue=''
                      control={control}
                      render={({ field }) => <Input disabled {...field} id="Igv" name="Igv" bsSize="sm"
                        style={{ textTransform: 'uppercase' }} placeholder='' invalid={errors.Igv && true}
                      />}
                    />
                    {errors.Igv && <FormFeedback>{errors.Igv.message}</FormFeedback>}
                  </Col>
                </Row>
              </Col>
              <Col sm='4'>
                <Row className='mb-1'>
                  <Label sm='4' md='4' size='sm' className='form-label' for='Total'>
                    TOTAL
                  </Label>
                  <Col sm='8' md='8'>
                    <Controller
                      name='Total'
                      defaultValue=''
                      control={control}
                      render={({ field }) => <Input disabled  {...field} id="Total" name="Total" bsSize="sm"
                        style={{ textTransform: 'uppercase' }} placeholder='' invalid={errors.Total && true}
                      />}
                    />
                    {errors.Total && <FormFeedback>{errors.Total.message}</FormFeedback>}
                  </Col>
                </Row>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Row style={{ textAlign: 'right' }}>
          <Col sm='12' className='mb-1'>
            <Button onClick={mostrarFuncion} color='secondary' outline id='reset-button' style={{ width: "120px" }}>
              AGREGAR
            </Button>
            <Button className='me-1' outline id='reset-button' color='secondary'  onClick={handleResetClick} style={{ width: "120px" }}>
              NUEVO
            </Button>
            <Button color='primary' type='submit' style={{ width: "120px" }}>
              GRABAR
            </Button>

          </Col>
        </Row>
      </Form>
      <br></br>
      <GrillaBuscarProducto EliminarProducto={EliminarProducto} ActualizarCantidad={ActualizarCantidad} ActualizarPrecio={ActualizarPrecio} listaDatos={listaProductos} setListaDatos={setListaProductos} />
      <ModalAgregarProducto mostrarModal={mostrarModalAgregar} setMostrarModal={setMostrarModalAgregar} setObjetoSeleccion={setObjProductoAgregado} objetoSeleccion={objProductoAgregado} />
    </>
  );
}

function ValidarAniadirProducto(producto, listaProductos) {
  let cadena = ""
  listaProductos.forEach(element => {
    if (element.codProducto === producto.codProducto) {
      cadena += "EL PRODUCTO YA SE ENCUENTRA AÑADIDO \n"
      return false
    }
  });
  if (cadena !== "") {
    notificacion(cadena, "warning")
    return false
  }
  return true

}


function ValidarBuscarCotizacion(numero){
  let cadena = ""
  if(numero){
    if(isNaN(numero)){
      cadena += "INGRESE UN NUMERO EN COTIZACION"
    }
  }
  if(cadena !== ""){
     notificacion(cadena, "warning")
     return false;
  }
  return true;
}