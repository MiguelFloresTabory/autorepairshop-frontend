import { Edit, Trash } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row, Table, UncontrolledTooltip } from "reactstrap";
import { ValidarRuc, notificacion } from "../../../utilities/utils/utils";
import { useEffect, useState } from "react";
import { deleteClienteServicio, getClienteListarServicio, postClienteServicio, putClienteServicio } from "../../../Services/serviciosCliente";
import SelectConceptController from "../../../Componentes/Selects/SelectConceptController";
import { yupResolver } from "@hookform/resolvers/yup";
import { ValidarEditarCliente, ValidarGrabarCliente, schemaCliente } from "./ValidacionesCliente";
import { getDatosApiSunat } from "../../../Services/serviciosRucSunat";
import { SelectConcepto } from "../../../Componentes/Selects/SelectConcepto";

export default function ClienteConsulta() {

  const [estadoTabla, setEstadoTabla] = useState(false);
  const [listaClientes, setListaClientes] = useState([]);
  const [numeroGrilla, setNumeroGrilla] = useState(0);
  const [mostrarModal, setMostrarModal] = useState(false);

  const [objClienteEdicion, setObjClienteEdicion] = useState({});

  //mostrarModal
  const { handleSubmit, control, getValues, reset } = useForm({ mode: 'onChange' });

  function limpiarListaCliente() {
    setEstadoTabla(false);
    setListaClientes([]);
    setNumeroGrilla(0);
    reset();
  }
  async function listarCliente(params) {
    const lista = await getClienteListarServicio(params);
    setListaClientes(lista);
    setEstadoTabla(true);
    setNumeroGrilla(lista.length);
  }

  async function eliminarCliente(id) {
    const res = await deleteClienteServicio(id);
    const objFiltro = getValues();
    if (objFiltro.CodTipoDocumento === "-1") objFiltro.CodTipoDocumento = undefined;
    if (objFiltro.CodEstado === "-1") objFiltro.CodEstado = undefined;
    if (objFiltro.Descripcion === "") objFiltro.Descripcion = undefined;
    if (res) {
      listarCliente(objFiltro);
    }
  }

  function editarCliente(data) {
    setMostrarModal(!mostrarModal);
    setObjClienteEdicion(data)
  }


  return (
    <>

      <CriterioBusquedaCliente limpiarListaCliente={limpiarListaCliente} listarCliente={listarCliente} control={control} handleSubmit={handleSubmit} />

      <div className='divider' style={{ textAlign: "center" }} >
        <div className='divider-text' style={{ fontSize: '13pt' }}>CANTIDAD DE REGISTROS: {numeroGrilla}</div>
      </div>
      <Table bordered responsive>
        <thead>
          <tr>
            <th style={{ width: '70px' }}></th>
            <th style={{ width: '70px' }}></th>
            <th style={{ width: '300px', textAlign: "center" }}>CLIENTE</th>
            <th style={{ textAlign: "center" }}>DOCUMENTO</th>
            <th style={{ textAlign: "center" }}>TELEFONO</th>
            <th style={{ textAlign: "center" }}>CORREO</th>
            <th style={{ textAlign: "center"}}>TIPO DOCUMENTO</th>
            <th style={{ textAlign: "center" }}>ESTADO</th>
          </tr>
        </thead>
        {estadoTabla ?
          <tbody>
            {listaClientes?.map(cliente => <tr key={cliente.codCuentaCorriente}>
              <td style={{ textAlign: "center" }} >
                <Link to="#" id="editarCliente" onClick={() => { if (cliente.codCuentaCorriente === 0) { notificacion('Registro Inexistente', 'error') } else { editarCliente(cliente) } }}>
                  <Edit size="20" />
                  <UncontrolledTooltip target="editarCliente"> EDITAR </UncontrolledTooltip>
                </Link>
              </td>
              <td style={{ textAlign: "center" }} >
                <Link to="#" id="eliminarCliente" onClick={() => { if (cliente.codCuentaCorriente === 0) { notificacion('Registro Inexistente', 'error') } else { eliminarCliente(cliente.codCuentaCorriente) } }}>
                  <Trash size="20" color="red" />
                  <UncontrolledTooltip target="eliminarCliente"> ELIMINAR </UncontrolledTooltip>
                </Link>
              </td>
              <td>
                {cliente.razonSocial}
              </td>
              <td>
                {cliente.nroDocumento}
              </td>
              <td>
                {cliente.telefono}
              </td>
              <td>
                {cliente.correo}
              </td>
              <td>
                {cliente.tipoDocumento}
              </td>
              <td>
                {cliente.estado}
              </td>
            </tr>)}
          </tbody> : <InicializarGrillaCliente />}
      </Table>

      <ModalEditarCliente mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} setData={setObjClienteEdicion} data={objClienteEdicion} getValuesFormBusqueda={getValues} listarCliente={listarCliente}/>
    </>);
}


function InicializarGrillaCliente() {
  return (
    <tbody>
      <tr >
        <td style={{ textAlign: "center" }} >
          <Link to="#" id="editarCliente" >
            <Edit size="20" />
            <UncontrolledTooltip target="editarCliente"> EDITAR </UncontrolledTooltip>
          </Link>
        </td>
        <td style={{ textAlign: "center" }} >
          <Link to="#" id="eliminarCliente" >
            <Trash size="20" color="red" />
            <UncontrolledTooltip target="eliminarCliente"> ELIMINAR </UncontrolledTooltip>
          </Link>
        </td><td>
        </td><td>
        </td><td>
        </td><td>
        </td>
      </tr>
    </tbody>

  )

}


function CriterioBusquedaCliente({ listarCliente, limpiarListaCliente, handleSubmit, control }) {


  const arregloEstado = [
    { dscDocumento: "ACTIVO", value: "1" },
    { dscDocumento: "INACTIVO", value: "2" }
  ]

  const arregloTipoDoc = [
    { dscDocumento: "DNI", value: "1" },
    { dscDocumento: "PASAPORTE", value: "2" },
    { dscDocumento: "CARNET EXTRANJERIA", value: "3" }
  ]

  const onSubmit = (data) => {
    if (data.CodTipoDocumento === "-1") data.CodTipoDocumento = undefined;
    if (data.CodEstado === "-1") data.CodEstado = undefined;
    if (data.Descripcion === "") data.Descripcion = undefined;

    listarCliente(data);
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
                    DESCRIPCION
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
                    ESTADO
                  </Label>
                  <Col sm='8' md='8'>
                    <SelectConceptController valorDefecto={1} name={"CodEstado"} control={control} arregloConcepto={arregloEstado} />

                  </Col>
                </Row>
              </Col>

              <Col sm='3'>
                <Row className='mb-1'>
                  <Label sm='4' md='4' size='sm' className='form-label' for='Telefono'>
                    TIPO DOC
                  </Label>
                  <Col sm='8' md='8'>
                    <SelectConceptController name={"CodTipoDocumento"} control={control} arregloConcepto={arregloTipoDoc} />
                  </Col>
                </Row>
              </Col>

            </Row >

          </CardBody>
        </Card>
        <Row style={{ textAlign: 'right' }} className='mt-1' >
          <Col sm='12' className='mb-1'>
            <Button className='me-1' outline id='reset-button' color='secondary' type='reset' style={{ width: "120px" }} onClick={limpiarListaCliente} >
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


function ModalEditarCliente({ mostrarModal, setMostrarModal, setData, data, listarCliente, getValuesFormBusqueda }) {

  const { reset, handleSubmit, setValue, register, getValues, control, formState: { errors } } =
    useForm({ mode: 'onChange', resolver: yupResolver(schemaCliente) });
  const [nroRuc, setNroRuc] = useState("");
  const { onBlur } = register('NroDocumento', { onBlur: (e) => onBlurDoc(e.target.value) })
  const { onChange } = register('CodTipoPersona', { onChange: (e) => ValidarCambioCombo(nroRuc) })



  function ValidarCambioCombo(nroRuc) {
    const codTipoPersona = getValues("CodTipoPersona");
    if (codTipoPersona === "1") {
      setDisabledCodTipoDoc(false);
    } else {
      setDisabledCodTipoDoc(true);
      setValue("CodTipoDocumento", "-1")
    }

    if (codTipoPersona === "2") onBlurDoc(nroRuc);
  }

  const [codEstado, setCodEstado] = useState(1);
  //desactivar propiedades
  const [disabledCodTipoDoc, setDisabledCodTipoDoc] = useState(false);

  const onSubmit = async (dt) => {
    const datos = {
      // 1 = cliente      codTipoPersona
      CodTipoCuentaCorriente: "1",
      CodEstado: codEstado,
      CodCuentaCorriente: data.codCuentaCorriente,
      ...dt
    }

    if (datos.CodTipoDocumento === "-1") datos.CodTipoDocumento = undefined;

    if (ValidarEditarCliente(datos)) {
      const res = await putClienteServicio(datos);
      if (res) { 
        const objetoFiltro = getValuesFormBusqueda();
        reset(); 
        setNroRuc("");
        setMostrarModal(false);
        if (objetoFiltro.CodTipoDocumento === "-1") objetoFiltro.CodTipoDocumento = undefined;
        if (objetoFiltro.CodEstado === "-1") objetoFiltro.CodEstado = undefined;
        if (objetoFiltro.Descripcion === "") objetoFiltro.Descripcion = undefined;
        listarCliente(objetoFiltro);
      };
    }

  }

  useEffect(() => {
    console.log(data)
    function CargarFormulario() {
      setValue("Correo", data.correo);
      setValue("Direccion", data.direccion);
      setValue("NombreComercial", data.nombreComercial);
      setValue("NroDocumento", data.nroDocumento);
      setValue("RazonSocial", data.razonSocial);
      setValue("Telefono", data.telefono);
      setValue("CodTipoPersona", data.codTipoPersona);
      setValue("CodTipoDocumento", data.codTipoDocumento);
      setValue("CodEstado", data.codEstado);

      if (data.codTipoPersona === 1) {
        setDisabledCodTipoDoc(false);
      } else {
        setDisabledCodTipoDoc(true);
        setValue("CodTipoDocumento", "-1")
      }
    }

    if (data) {
      CargarFormulario();
    }
  }, [data, setValue])

  useEffect(() => {

    if(!mostrarModal){
      setData({});
    }

  }, [mostrarModal, setData, setDisabledCodTipoDoc])




  const onBlurDoc = (nrRuc) => {
    const codTipoPersona = getValues("CodTipoPersona");
    setNroRuc(nrRuc);
    if (codTipoPersona && codTipoPersona === "2" && (nrRuc | nrRuc !== "")) {
      if (ValidarRuc(nrRuc)) {
        const servicioRuc = getDatosApiSunat(nrRuc);
        try {
          servicioRuc.then((Respuesta) => {
            console.log(Respuesta.data);
            if (Object.keys(Respuesta.data).length > 2) {
              setValue("Direccion", Respuesta.data.direccion);
              setValue("NombreComercial", Respuesta.data.razonSocial);
              if (Respuesta.data.nombreComercial) setValue("NombreComercial", Respuesta.data.nombreComercial);
              setValue("RazonSocial", Respuesta.data.razonSocial);

            } else {
              notificacion("Ruc no tiene resultados", "error")
              setValue("NroDocumento", "");
              setNroRuc("");
              reset();
            }
          })
            .catch(function (error) { console.log(error) });
        } catch (e) {
          console.log(e);
        }
      } else {
        notificacion("ingrese un ruc valido", "error")
        setValue("NroDocumento", "");
        setNroRuc("");
      }
    }
  }

  //---------------------------------------------------
  //temporal, para llenar el concepto, viene de bd

  const arregloPersona = [
    { dscDocumento: "PERSONA NATURAL", value: "1" },
    { dscDocumento: "PERSONA JURIDICA", value: "2" },
    { dscDocumento: "SIN DOCUMENTO", value: "3" }
  ]
  const arregloEstado = [
    { dscDocumento: "ACTIVO", value: 1 },
    { dscDocumento: "INACTIVO", value: 2 }
  ]

  const arregloTipoDoc = [
    { dscDocumento: "DNI", value: "1" },
    { dscDocumento: "PASAPORTE", value: "2" },
    { dscDocumento: "CARNET EXTRANJERIA", value: "3" }
  ]
  //---------------------------------------------------

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
          <h5 className='modal-title'>EDITAR CLIENTE</h5>
        </ModalHeader>

        <ModalBody className='flex-grow-1'>
          <Form onSubmit={handleSubmit(onSubmit)} id="formCorrelativoFormato" name="formCorrelativoFormato">
            <title>CLIENTE</title>
            <Card className='bg-transparent border-secondary shadow-none'  >
              <CardBody>
                <Row className='mb-2'>
                  <Col sm='12'>
                    <h5>EDITAR CLIENTE DE DOCUMENTO</h5>
                  </Col>
                </Row>

                <Row>
                  <Col sm='6'>
                    <Row className='mb-1'>
                      <Label sm='5' md='6' size='sm' className='form-label' for='CodTipoPersona'>
                        TIPO PERSONA
                      </Label>
                      <Col sm='7' md='6'>

                        <SelectConceptController arregloConcepto={arregloPersona} control={control} error={errors.CodTipoPersona} name={'CodTipoPersona'} />

                      </Col>

                    </Row>
                  </Col>
                  <Col sm='6'>
                    <Row className='mb-1'>
                      <Label sm='5' md='6' size='sm' className='form-label' for='CodTipoDocumento'>
                        TIPO DOCUMENTO
                      </Label>
                      <Col sm='7' md='6'>
                        <SelectConceptController arregloConcepto={arregloTipoDoc} control={control} error={errors.CodTipoDocumento} name={'CodTipoDocumento'} disabled={disabledCodTipoDoc} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col sm='6'>
                    <Row className='mb-1'>
                      <Label sm='5' md='6' size='sm' className='form-label' for='NroDocumento'>
                        RUC/DOCUMENTO
                      </Label>
                      <Col sm='7' md='6'>
                        <Controller
                          name='NroDocumento'
                          defaultValue=''
                          control={control}
                          render={({ field }) => <Input {...field} id="NroDocumento" name="NroDocumento" bsSize="sm"
                            style={{ textTransform: 'uppercase' }} placeholder='Ingresar Nro de cliente' invalid={errors.NroDocumento && true}

                          />}
                        />
                        {errors.NroDocumento && <FormFeedback>{errors.NroDocumento.message}</FormFeedback>}
                      </Col>
                    </Row>
                  </Col>

                  <Col sm='6'>
                    <Row className='mb-1'>
                      <Label sm='5' md='6' size='sm' className='form-label' for='NombreComercial'>
                        NOMBRE COMERCIAL
                      </Label>
                      <Col sm='7' md='6'>
                        <Controller
                          name='NombreComercial'
                          defaultValue=''
                          control={control}
                          render={({ field }) => <Input {...field} id="NombreComercial" name="NombreComercial" bsSize="sm"
                            style={{ textTransform: 'uppercase' }} placeholder='Ingresar Nombre Comercial' invalid={errors.NombreComercial && true}
                          />}
                        />
                        {errors.NombreComercial && <FormFeedback>{errors.NombreComercial.message}</FormFeedback>}
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col sm='6'>
                    <Row className='mb-1'>
                      <Label sm='5' md='6' size='sm' className='form-label' for='RazonSocial'>
                        CLIENTE
                      </Label>
                      <Col sm='7' md='6'>
                        <Controller
                          name='RazonSocial'
                          defaultValue=''
                          control={control}
                          render={({ field }) => <Input {...field} id="RazonSocial" name="RazonSocial" bsSize="sm"
                            style={{ textTransform: 'uppercase' }} placeholder='RazonSocial' invalid={errors.RazonSocial && true}
                          />}
                        />
                        {errors.RazonSocial && <FormFeedback>{errors.RazonSocial.message}</FormFeedback>}
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
                          render={({ field }) => <Input {...field} id="Correo" name="Correo" bsSize="sm" type='Email'
                            style={{ textTransform: 'uppercase' }} placeholder='Ingresar su correo' invalid={errors.Correo && true}
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
                      <Label sm='5' md='6' size='sm' className='form-label' for='Telefono'>
                        TELEFONO
                      </Label>
                      <Col sm='7' md='6'>
                        <Controller
                          name='Telefono'
                          defaultValue=''
                          control={control}
                          render={({ field }) => <Input {...field} id="Telefono" name="Telefono" bsSize="sm"
                            style={{ textTransform: 'uppercase' }} placeholder='Telefono' invalid={errors.Telefono && true}
                          />}
                        />
                        {errors.Telefono && <FormFeedback>{errors.Telefono.message}</FormFeedback>}
                      </Col>
                    </Row>
                  </Col>

                  <Col sm='6'>
                    <Row className='mb-1'>
                      <Label sm='5' md='6' size='sm' className='form-label' for='CodEstado'>
                        ESTADO
                      </Label>
                      <Col sm='6'>
                      <SelectConceptController arregloConcepto={arregloEstado} control={control} name={'CodEstado'} error={errors.CodEstado} />
                    </Col>
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col sm='12'>
                    <Row className='mb-1'>
                      <Label sm='3' md='3' size='sm' className='form-label' for='Direccion'>
                        DIRECCION
                      </Label>
                      <Col sm='9' md='9'>
                        <Controller
                          name='Direccion'
                          defaultValue=''
                          control={control}
                          render={({ field }) => <Input {...field} id="Direccion" name="Direccion" bsSize="sm"
                            style={{ textTransform: 'uppercase' }} placeholder='Direccion' invalid={errors.Direccion && true}
                          />}
                        />
                        {errors.Direccion && <FormFeedback>{errors.Direccion.message}</FormFeedback>}
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