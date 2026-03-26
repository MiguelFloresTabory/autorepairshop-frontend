import { Form, Card, CardBody, Col, Row, Label, FormFeedback, Input, Button, Table } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import SelectConceptController from '../../../Componentes/Selects/SelectConceptController';
import { ValidarGrabarCotizacion, schemaCotizacion } from './ValidacionesCotizacionVehicular';
//import { postCotizacionServicio } from '../../../Services/servicioCotizacion';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputAutocompleteCliente, InputAutocompleteVehiculo } from '../../../Componentes/Inputs/InputAutoComplete';
import { useEffect, useState } from 'react';
import { GrillaBuscarProducto } from '../../../Componentes/Grillas/GrillaProductos';
import { ModalAgregarProducto } from '../../../Componentes/Modal/ModalAgregarProducto';
import { arregloIGV, arregloMetodoPago, arregloMoneda, arregloVendedor, formatDate, notificacion } from '../../../utilities/utils/utils';
import { getTraerNumeroxSerieServicio } from '../../../Services/servicioCorrelativo';
import { getStorageObject } from '../../../utilities/storage/LogalStorage';
import { postDocumentoVentaServicio, putDocumentoVentaServicio } from '../../../Services/servicioDocumentoVenta';

export default function CotizacionRegistrar({ setPillActive, listaProductos, setListaProductos, objEdicion, setObjEdicion, estadoActualizo, setEstadoActualizo }) {
  const { reset, handleSubmit, register, getValues, setValue, control, formState: { errors } } =
    useForm({ mode: 'onChange'/*, resolver: yupResolver(schemaCotizacion) */ });

  const { onChange } = register('Serie', { onChange: (e) => { FuncionCargarNumero(e.target.value) } })

  const [objVehiculo, setObjVehiculo] = useState({});
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
  const [objProductoAgregado, setObjProductoAgregado] = useState({});

  const [descripcionAutoComplete, setDescripcionAutoComplete] = useState("");

  const ObjStorage = getStorageObject();

  const arregloSerie = [
    { dscDocumento: "0001", value: "0001" },
  ]

 

  useEffect(() => {
    if (objEdicion) {
      if (Object.keys(objEdicion).length > 0) {
        console.log(objEdicion)
        setValue("CodFormaPago", objEdicion.codFormaPago)
        setValue("CodMoneda", objEdicion.codMoneda)
        setValue("CodVendedor", objEdicion.codVendedor.toString())
        setValue("Cliente", objEdicion.cliente)
        setValue("Emision", alreves(objEdicion.emision))
        //setValue("Vehiculo", alreves(objEdicion.vehiculo))
        setValue("Igv", objEdicion.igv)
        setValue("IgvPorcentaje", '1')
        setValue("NumeroDoc", objEdicion.numeroDoc)
        setValue("Serie", objEdicion.serieDoc)
        setValue("SubTotal", objEdicion.subTotal)
        setValue("Total", objEdicion.total)
        setDescripcionAutoComplete(objEdicion.vehiculo)
        setObjVehiculo({ codVehiculo: objEdicion.codVehiculo, cliente: objEdicion.cliente, codCliente: objEdicion.codCliente})

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
        CodTipoDoc: "5"  //cotizacion vehicular
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

  const handleResetClick = () => {
    setListaProductos([]);
    reset();
    setObjVehiculo({})
    setObjEdicion({})
    setDescripcionAutoComplete("")
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
        CodDocVenta: objEdicion.codDocVenta,
        CodVehiculo: objVehiculo ? objVehiculo.codVehiculo : 0,
        CodCliente: objVehiculo ? objVehiculo.codCliente : 0,
        SerieDoc: data.Serie,
        CodAlmacen: ObjStorage.codSucursal,
        CodUsuario: ObjStorage.codUsuario,
        CodTipoDoc: 5, //cotizacion vehicular,
        Jsondetalle: listaJsonCadena,
        ...data
      }

      if (ValidarGrabarCotizacion(datos, listaProductos, objVehiculo)) {
        const res = await putDocumentoVentaServicio(datos);
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
        CodCliente: objVehiculo ? objVehiculo.codCliente : 0,
        SerieDoc: data.Serie,
        CodAlmacen: ObjStorage.codSucursal,
        CodUsuario: ObjStorage.codUsuario,
        CodTipoDoc: 5, //cotizacion VEHICULAR,
        Jsondetalle: listaJsonCadena,
        ...data
      }

      if (ValidarGrabarCotizacion(datos, listaProductos, objVehiculo)) {
        const res = await postDocumentoVentaServicio(datos);
        if (res) {
          reset(); setListaProductos([]); setObjVehiculo({}); setObjEdicion({}, setDescripcionAutoComplete(""))
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
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} id="formCotizacion" name="formCotizacion">
        <title>CLIENTES</title>
        <Card className='bg-transparent border-secondary shadow-none'  >
          <CardBody>
            <Row className='mb-1'>
              <Col>
                <h5>REGISTRO DE COTIZACION</h5>
              </Col>
            </Row>
            <Row>
              <Col sm='4'>
                <Row className='mb-1'>
                  <Label sm='4' md='4' size='sm' className='form-label' for='CodigoInterno'>
                    VEHICULO
                  </Label>
                  <InputAutocompleteVehiculo setDescripcion={setDescripcionAutoComplete} descripcion={descripcionAutoComplete} setVehiculoSelect={setObjVehiculo} vehiculoSelect={objVehiculo} classname={"col col-sm-8 col-md-8"} />
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
                      render={({ field }) => <Input {...field} id="Cliente" name="Cliente" bsSize="sm"
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


