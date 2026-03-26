import { Form, Card, CardBody, Col, Row, Label, FormFeedback, Input, Button, Table, FormGroup } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import SelectConceptController from '../../../Componentes/Selects/SelectConceptController';
import { ValidarGrabarOrdenTrabajo } from './ValidacionesOrdenTrabajo';
import { InputAutocompleteCliente, InputAutocompleteVehiculo } from '../../../Componentes/Inputs/InputAutoComplete';
import { useEffect, useState } from 'react';
import { GrillaBuscarProducto } from '../../../Componentes/Grillas/GrillaProductos';
import { ModalAgregarProducto } from '../../../Componentes/Modal/ModalAgregarProducto';
import { formatDate, notificacion } from '../../../utilities/utils/utils';
import { getTraerNumeroxSerieServicio } from '../../../Services/servicioCorrelativo';
import { getStorageObject } from '../../../utilities/storage/LogalStorage';
import { getDocumentoVentaObjServicio, postDocumentoVentaServicio } from '../../../Services/servicioDocumentoVenta';
import { postOrdenTrabajoServicio, putOrdenTrabajoServicio } from '../../../Services/servicioOrdenTrabajo';
//import { getDocumentoVentaObjServicio, postDocumentoVentaServicio, postDocumentoVentaServicioOrdenTrabajo, putDocumentoVentaServicio } from '../../../Services/servicioDocumentoVenta';

export default function OrdenTrabajoRegistrar({ setPillActive, listaProductos, setListaProductos, objEdicion, setObjEdicion, estadoActualizo, setEstadoActualizo }) {
  const { reset, handleSubmit, register, getValues, setValue, control, formState: { errors } } =
    useForm({ mode: 'onChange'/*, resolver: yupResolver(schemaOrdenTrabajo) */ });

  const { onChange } = register('Serie', { onChange: (e) => { FuncionCargarNumero(e.target.value) } })
  const { onBlur } = register('Cotizacion', { onBlur: (e) => { FuncionCargarCotizacion(e.target.value) } })



  const [objVehiculo, setObjVehiculo] = useState({});
  const [flagInicio, setFlagInicio] = useState(false);

  const [disabledVehiculo, setDisabledVehiculo] = useState(false);
  const [disabledCliente, setDisabledCliente] = useState(false);

  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
  const [objProductoAgregado, setObjProductoAgregado] = useState({});

  const [numeroCotizacion, setNumeroCotizacion] = useState("");
  const [codCotizacion, setCodCotizacion] = useState(0);

  const [cotizacionEstado, setCotizacionEstado] = useState(false);

  const [descripcionAutoComplete, setDescripcionAutoComplete] = useState("");

  const ObjStorage = getStorageObject();

  const arregloSerie = [
    { dscDocumento: "T001", value: "T001" },
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
  const arregloMecanicos = [
    { dscDocumento: "CARLOS RUIZ", value: "7" },
    { dscDocumento: "ROBER GONZALES", value: "8" },
    { dscDocumento: "RONALDO CHAVEZ", value: "9" }
  ]


  useEffect(() => {
    if (objEdicion) {
      if (Object.keys(objEdicion).length > 0) {
        setValue("CodFormaPago", objEdicion.codFormaPago)
        setValue("CodMoneda", objEdicion.codMoneda)
        //setValue("CodVendedor", objEdicion.codVendedor.toString())
        setValue("Cliente", objEdicion.cliente)
        setValue("FechaEmision", alreves(objEdicion.fechaEmision))
        setValue("FechaSalida", alreves(objEdicion.fechaSalida))
        setValue("FechaIngreso", alreves(objEdicion.fechaIngreso))
        //console.log(alreves(objEdicion.emision))
        setValue("Igv", objEdicion.igv)
        setValue("IgvPorcentaje", '1')
        setValue("NumeroDoc", objEdicion.numeroDoc)
        setValue("Serie", objEdicion.serieDoc)
        setValue("SubTotal", objEdicion.subTotal)
        setValue("Total", objEdicion.total)
        setDescripcionAutoComplete(objEdicion.cliente)
        setObjVehiculo({ codVehiculo: objEdicion.codVehiculo, cliente: objEdicion.cliente })
        setValue("Cotizacion", "")
        setValue("CodMecanico1", objEdicion.codMecanico1)
        setValue("CodMecanico2", objEdicion.codMecanico2)
        setValue("CodMecanico3", objEdicion.codMecanico3)
        setCotizacionEstado(true)
        setFlagInicio(objEdicion.flagInicio === 1 ? true : false)

      }
      console.log()
    }


  }, [objEdicion])

  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);

  async function FuncionCargarNumero(numero) {
    if (numero !== "-1" & numero !== "") {
      const datos = {
        SerieDoc: numero,
        CodAlmacen: ObjStorage.codSucursal, //almacen
        CodEmpresa: "2", //empresa
        CodTipoDoc: "4"  //OrdenTrabajo
      }
      const objetoNumero = await getTraerNumeroxSerieServicio(datos);
      if (objetoNumero) {
        if (Object.keys(objetoNumero).length > 0) {
          setValue("NumeroDoc", objetoNumero.numeroDoc)
        }
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
    console.log(objetoModificado)
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
    console.log(objVehiculo)
    if (objVehiculo) {
      if (Object.values(objVehiculo).length > 0) {
        setValue("Cliente", objVehiculo.cliente)
      }
    } else {
      setValue("Cliente", "")
    }
  }, [objVehiculo])

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

  function handleResetClick() {
    setListaProductos([]);
    reset();
    setObjVehiculo({})
    setObjEdicion({})
    setDescripcionAutoComplete("")
    setCodCotizacion(0)
    setCotizacionEstado(false)
    setDisabledCliente(false)
    setDisabledVehiculo(false)
    setValue("IgvPorcentaje", "1")
    setValue("CodTipoDoc", "2")
    setValue("CodMoneda", "1")
    setValue("CodFormaPago", "1")

  }
  const onSubmit = async (data) => {
    //EDICION
    if (Object.keys(objEdicion).length > 0) {
      const listaJsonCadena = JSON.stringify(listaProductos)
      const datos = {
        CodEmpresa: "2",
        CodVehiculo: objVehiculo ? objVehiculo.codVehiculo : 0,
        SerieDoc: data.Serie,
        CodAlmacen: ObjStorage.codSucursal,
        CodUsuario: ObjStorage.codUsuario,
        CodTipoDoc: 5, //OrdenTrabajo,
        FlagInicio: flagInicio ? 1 : 0,
        Jsondetalle: listaJsonCadena,
        CodCotizacion: codCotizacion,
        CodOrdenTrabajo: objEdicion.codOrdenTrabajo,
        FechaIngresoCadena: data.FechaIngreso,
        FechaSalidaCadena: data.FechaSalida,
        ...data,
        CodMecanico1: data.CodMecanico1 === "-1" ?  0 : data.CodMecanico1,
        CodMecanico2: data.CodMecanico2 === "-1" ?  0 : data.CodMecanico2,
        CodMecanico3: data.CodMecanico3 === "-1" ?  0 : data.CodMecanico3
      }

      if (ValidarGrabarOrdenTrabajo(datos, listaProductos, objVehiculo)) {
        const res = await putOrdenTrabajoServicio(datos);
        if (res) {
          reset(); setListaProductos([]); setObjVehiculo({}); setObjEdicion({}, setDescripcionAutoComplete(""))
          setPillActive('2')
          setEstadoActualizo(true)
        }
      }
    } else {
      //GRABAR
      const listaJsonCadena = JSON.stringify(listaProductos)
      const datos = {
        CodEmpresa: "2",
        CodVehiculo: objVehiculo ? objVehiculo.codVehiculo : 0,
        SerieDoc: data.Serie,
        CodAlmacen: ObjStorage.codSucursal,
        CodUsuario: ObjStorage.codUsuario,
        CodTipoDoc: 4, //OrdenTrabajo,
        Jsondetalle: listaJsonCadena,
        CodCotizacion: codCotizacion,
        FlagInicio: flagInicio ? 1 : 0,
        FechaIngresoCadena: data.FechaIngreso,
        FechaSalidaCadena: data.FechaSalida,
        ...data,
        CodMecanico1: data.CodMecanico1 === "-1" ?  0 : data.CodMecanico1,
        CodMecanico2: data.CodMecanico2 === "-1" ?  0 : data.CodMecanico2,
        CodMecanico3: data.CodMecanico3 === "-1" ?  0 : data.CodMecanico3

      }
      // console.log(datos)
      if (ValidarGrabarOrdenTrabajo(datos, listaProductos, objVehiculo)) {
        const res = await postOrdenTrabajoServicio(datos);
        if (res) {
          reset(); 
          setListaProductos([]); setObjVehiculo({}); setObjEdicion({});
          setDescripcionAutoComplete("");setCodCotizacion(0);
          setEstadoActualizo(false);setNumeroCotizacion("");
          setValue("Cotizacion", "");
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

  async function FuncionCargarCotizacion(e) {
    if (e === "" | !e) {
      return false
    }


    try {
      if (ValidarBuscarCotizacion(e)) {
        const ObjCotiza = await getDocumentoVentaObjServicio({ NumeroCotizacion: e, CodTipoDoc: 5 });
        setValue("CodFormaPago", ObjCotiza.codFormaPago)
        setValue("CodMoneda", ObjCotiza.codMoneda)
        setValue("CodVendedor", ObjCotiza.codVendedor.toString())
        setValue("Cliente", ObjCotiza.cliente)
        setValue("Emision", alreves(ObjCotiza.emision))
        //console.log(alreves(objEdicion.emision))
        setValue("Igv", ObjCotiza.igv)
        setValue("IgvPorcentaje", '1')
        //  setValue("NumeroDoc", ObjCotiza.numeroDoc)
        //setValue("Serie", ObjCotiza.serieDoc)
        setValue("SubTotal", ObjCotiza.subTotal)
        setValue("Total", ObjCotiza.total)
        setDescripcionAutoComplete(ObjCotiza.vehiculo)
        setObjVehiculo({ codVehiculo: ObjCotiza.codVehiculo, cliente: ObjCotiza.cliente })
        setListaProductos(JSON.parse(ObjCotiza.docVentaDets))
        setCodCotizacion(ObjCotiza.codCotizacion)
        setCotizacionEstado(true)
        setDisabledCliente(true)
        setDisabledVehiculo(true)
      }

    } catch (e) {
      setListaProductos([]);
      reset();
      setObjVehiculo({})
      setObjEdicion({})
      setDescripcionAutoComplete("")
      setNumeroCotizacion("")
      setValue("Cotizacion", "")
      setCotizacionEstado(false)
      notificacion("NO SE ENCONTRO COTIZACION VEHICULAR", "warning")
      setDisabledCliente(false)
      setDisabledVehiculo(false)

    }



  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} id="formOrdenTrabajo" name="formOrdenTrabajo">
        <title>ORDEN TRABAJO</title>
        <Card className='bg-transparent border-secondary shadow-none'  >
          <CardBody>
            <Row className='mb-1'>
              <Col>
                <h5>REGISTRO DE ORDEN TRABAJO</h5>
              </Col>
            </Row>
            <Row>
              <Col sm='4'>
                <Row className='mb-1'>
                  <Label sm='4' md='4' size='sm' className='form-label' for='CodigoInterno'>
                    VEHICULO
                  </Label>
                  <InputAutocompleteVehiculo  disabled={disabledVehiculo} setDescripcion={setDescripcionAutoComplete} descripcion={descripcionAutoComplete} setVehiculoSelect={setObjVehiculo} vehiculoSelect={objVehiculo} classname={"col col-sm-8 col-md-8"} />
                </Row>
              </Col>
              <Col sm='4'>
                <Row className='mb-1'>
                  <Label sm='3' md='4' size='sm' className='form-label' for='Cliente'>
                    CLIENTE
                  </Label>
                  <Col sm='8' md='8'>
                    <Controller
                      name='Cliente'
                      defaultValue=''
                      control={control}
                      render={({ field }) => <Input {...field} disabled={disabledCliente} id="Cliente" name="Cliente" bsSize="sm"
                        style={{ textTransform: 'uppercase' }} placeholder='Ingresar Cliente' invalid={errors.Cliente && true}
                      />}
                    />
                    {errors.Cliente && <FormFeedback>{errors.Cliente.message}</FormFeedback>}
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
                  <Label sm='4' md='4' size='sm' className='form-label' for='SubTotal'>
                    MECANICO 1
                  </Label>
                  <Col sm='8' md='8'>
                    <SelectConceptController arregloConcepto={arregloMecanicos} control={control} name={'CodMecanico1'} error={errors.CodMecanico1} />


                  </Col>
                </Row>
              </Col>
              <Col sm='4'>
                <Row className='mb-1'>
                  <Label sm='4' md='4' size='sm' className='form-label' for='Igv'>
                    MECANICO 2
                  </Label>
                  <Col sm='8' md='8'>

                    <SelectConceptController arregloConcepto={arregloMecanicos} control={control} name={'CodMecanico2'} error={errors.CodMecanico2} />

                  </Col>
                </Row>
              </Col>
              <Col sm='4'>
                <Row className='mb-1'>
                  <Label sm='4' md='4' size='sm' className='form-label' for='Total'>
                    MECANICO 3
                  </Label>
                  <Col sm='8' md='8'>

                    <SelectConceptController arregloConcepto={arregloMecanicos} control={control} name={'CodMecanico3'} error={errors.CodMecanico3} />

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
                      render={({ field }) => <Input disabled={cotizacionEstado}   {...field} id="Cotizacion" name="Cotizacion" bsSize="sm"
                        style={{ textTransform: 'uppercase' }} placeholder='' invalid={errors.Cotizacion && true}
                      />}
                    />
                    {errors.Cotizacion && <FormFeedback>{errors.Cotizacion.message}</FormFeedback>}
                  </Col>
                </Row>
              </Col>

              <Col sm='4'>
                <Row className='mb-1'>
                  <Label sm='4' md='4' size='sm' className='form-label' for='FechaIngreso'>
                    FECHA INGRESO
                  </Label>
                  <Col sm='8' md='8'>
                    <Controller
                      name='FechaIngreso'
                      defaultValue={formatDate(hoy)}
                      control={control}
                      render={({ field }) => <Input type='date' {...field} id="FechaIngreso" name="FechaIngreso" bsSize="sm"
                        style={{ textTransform: 'uppercase' }} invalid={errors.FechaIngreso && true}

                      />}
                    />
                    {errors.FechaIngreso && <FormFeedback>{errors.FechaIngreso.message}</FormFeedback>}
                  </Col>
                </Row>
              </Col>


              <Col sm='4'>
                <Row className='mb-1'>
                  <Label sm='4' md='4' size='sm' className='form-label' for='FechaSalida'>
                    FECHA SALIDA
                  </Label>
                  <Col sm='8' md='8'>
                    <Controller
                      name='FechaSalida'
                      defaultValue={formatDate(hoy)}
                      control={control}
                      render={({ field }) => <Input type='date' {...field} id="FechaSalida" name="FechaSalida" bsSize="sm"
                        style={{ textTransform: 'uppercase' }} invalid={errors.FechaSalida && true}

                      />}
                    />
                    {errors.FechaSalida && <FormFeedback>{errors.FechaSalida.message}</FormFeedback>}
                  </Col>
                </Row>
              </Col>


            </Row>

            <Row>
              <Col sm='4'>
                <Row className='mb-1 mt-2'>

                  <Col sm='12' md='12'>
                    <FormGroup switch>

                      <Input
                        type="switch"
                        checked={flagInicio ? true : false}
                        onClick={() => {
                          setFlagInicio(!flagInicio);
                        }}
                        onChange={() => {
                          setFlagInicio(!flagInicio);
                        }}
                      />

                      {/* <Controller
                        name='FlagInicio'
                        control={control}
                        render={({ field }) => <Input {...field} bsSize="sm"  type="switch"
                        // onClick={() => {
                        //   setFlagInicio(!flagInicio);
                        // }}
                        />}
                      />    */}
                      <Label check>INICIAR ORDEN TRABAJO</Label>
                    </FormGroup>
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
            <Button className='me-1' outline id='reset-button' color='secondary' onClick={handleResetClick} style={{ width: "120px" }}>
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


function ValidarBuscarCotizacion(numero) {
  let cadena = ""
  if (numero) {
    if (isNaN(numero)) {
      cadena += "INGRESE UN NUMERO EN COTIZACION"
    }
  }
  if (cadena !== "") {
    notificacion(cadena, "warning")
    return false;
  }
  return true;
}