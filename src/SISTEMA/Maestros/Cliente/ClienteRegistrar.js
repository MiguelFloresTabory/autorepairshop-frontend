import { Form, Card, CardBody, Col, Row, Label, FormFeedback, Input, Button } from 'reactstrap';
import { Controller, useForm  } from 'react-hook-form';
import { postClienteServicio } from '../../../Services/serviciosCliente';
import { useState } from 'react';
import { ValidarRuc, notificacion } from '../../../utilities/utils/utils'
import { getDatosApiSunat } from '../../../Services/serviciosRucSunat';
import { ValidarGrabarCliente, schemaCliente } from './ValidacionesCliente';
import  SelectConceptController  from '../../../Componentes/Selects/SelectConceptController'
import { yupResolver } from "@hookform/resolvers/yup"
import { SelectConcepto } from '../../../Componentes/Selects/SelectConcepto';

export default function ClienteRegistrar(){
    const { reset, handleSubmit, setValue ,register, getValues, control, formState: { errors }} = 
    useForm({ mode: 'onChange', resolver: yupResolver(schemaCliente) });
    
    const [nroRuc, setNroRuc] = useState("");
    const { onBlur } = register('NroDocumento', { onBlur: (e) => onBlurDoc(e.target.value) })
    const { onChange } = register('CodTipoPersona', { onChange: (e) => ValidarCambioCombo(nroRuc)  })
   

    function ValidarCambioCombo(nroRuc){
      const codTipoPersona = getValues("CodTipoPersona"); 
      if(codTipoPersona === "1"){
        setDisabledCodTipoDoc(false);
      }else{
          setDisabledCodTipoDoc(true);
          setValue("CodTipoDocumento", "-1")
      }
     
      if(codTipoPersona === "2") onBlurDoc(nroRuc);
     
      }
    const [codEstado, setCodEstado] = useState("1");
    //desactivar propiedades
    const [disabledCodTipoDoc, setDisabledCodTipoDoc] = useState(false);
   
    //---------------------------------------------------
     //temporal, para llenar el concepto, viene de bd

    const arregloPersona = [
      { dscDocumento: "PERSONA NATURAL", value: "1"},
      { dscDocumento: "PERSONA JURIDICA", value: "2"},
      { dscDocumento: "SIN DOCUMENTO", value: "3"}
   ]   
   const arregloEstado = [
    { dscDocumento: "ACTIVO", value: "1"},
    { dscDocumento: "INACTIVO", value: "2"}
   ]   

   const arregloTipoDoc = [
    { dscDocumento: "DNI", value: "1"},
    { dscDocumento: "PASAPORTE", value: "2"},
    { dscDocumento: "CARNET EXTRANJERIA", value: "3"}
   ]   
   //---------------------------------------------------
   

    const onSubmit = async (data) => {
      const datos = {
        // 1 = cliente
        CodTipoCuentaCorriente: "1",
        CodEstado: codEstado,
        ...data
      }
      if(datos.CodTipoDocumento === "-1") datos.CodTipoDocumento = undefined;
      if(ValidarGrabarCliente(datos)){
        const res =  await postClienteServicio(datos);
        if(res) {reset();setNroRuc("");};
      }

    }

    const handleResetClick = () => {
      reset(); setNroRuc("");
    };

    const onBlurDoc = (nrRuc) => {
      
      const codTipoPersona = getValues("CodTipoPersona"); 
      setNroRuc(nrRuc);
      if(codTipoPersona  && codTipoPersona === "2" && ( nrRuc | nrRuc !== "") ){
      if(ValidarRuc(nrRuc)){
       const servicioRuc = getDatosApiSunat(nrRuc);
           try{
            servicioRuc.then((Respuesta) => {
              console.log(Respuesta.data);
              if (Object.keys(Respuesta.data).length > 2) {
                setValue("Direccion",Respuesta.data.direccion);
                  setValue("NombreComercial", Respuesta.data.razonSocial);
                  if (Respuesta.data.nombreComercial) setValue("NombreComercial",Respuesta.data.nombreComercial);
                  setValue("RazonSocial",Respuesta.data.razonSocial);
                  
              }else{
                notificacion("Ruc no tiene resultados", "error")
                setValue("NroDocumento", "");
                setNroRuc("");
                reset();
              }
             })
             .catch(function (error) {console.log(error)});
           } catch(e){
              console.log(e);
           }
      } else{
        notificacion("ingrese un ruc valido", "error")
        setValue("NroDocumento", "");
        setNroRuc("");
      }
     }
    }

    return(
    
        <Form onSubmit={handleSubmit(onSubmit)} id="formCliente" name="formCliente">
          <title>CLIENTES</title>
        <Card className='bg-transparent border-secondary shadow-none'  >
            <CardBody>
            <Row className='mb-1'>
              <Col>
                <h5>REGISTRO DE CLIENTE</h5>
              </Col>
            </Row>

            <Row>

            <Col sm='6'>
                <Row className='mb-1'>
                  <Label sm='5' md='6' size='sm' className='form-label' for='CodTipoPersona'>
                    TIPO PERSONA
                  </Label>
                  <Col sm='7' md='6'>
                                     
                    <SelectConceptController arregloConcepto={arregloPersona} control={control} error={errors.CodTipoPersona} name={'CodTipoPersona'}   />

                  </Col>
 
                </Row>
              </Col>
              <Col sm='6'>
                <Row className='mb-1'>
                  <Label sm='5' md='6' size='sm' className='form-label' for='CodTipoDocumento'>
                    TIPO DOCUMENTO
                  </Label>
                  <Col sm='7' md='6'>
                   <SelectConceptController arregloConcepto={arregloTipoDoc} control={control} error={errors.CodTipoDocumento} name={'CodTipoDocumento'} disabled={disabledCodTipoDoc}  />


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
                      render={({ field }) => <Input {...field}  id="NroDocumento" name="NroDocumento" bsSize="sm" 
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
                      render={({ field }) => <Input {...field} id="Correo" name="Correo" bsSize="sm"  type='Email'
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
                  <SelectConcepto  codConcepto={codEstado} setCodConcepto={setCodEstado} arregloConcepto={arregloEstado} />
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
            <Button className='me-1' outline id='reset-button' color='secondary' type='reset' onClick={handleResetClick} style={{ width: "120px" }}>
              NUEVO
            </Button>
            <Button color='primary' type='submit' style={{ width: "120px" }}>
              GRABAR
            </Button>
          </Col>
        </Row>
        </Form>             
        );
}
