import { Form, Card, CardBody, Col, Row, Label, FormFeedback, Input, Button } from 'reactstrap';
import { Controller, useForm  } from 'react-hook-form';
import SelectConceptController from '../../../Componentes/Selects/SelectConceptController';
import { ValidarGrabarServicio, schemaServicio } from './ValidacionesServicio';
import { postProductoServicio} from '../../../Services/servicioProducto';
import { yupResolver } from '@hookform/resolvers/yup';
import { getStorageObject } from '../../../utilities/storage/LogalStorage';
import { useEffect } from 'react';
import { postServicioServicio } from '../../../Services/servicioServicios';

export default function ServicioRegistrar(){
    const { reset, handleSubmit, setValue, control, formState: { errors }} = 
    useForm({ mode: 'onChange', resolver: yupResolver(schemaServicio) });
   
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

    const onSubmit = async (data) => {
      const objetoStogage = getStorageObject();
      const datos = {
        CodEmpresa: "2",
        CodAlmacen: objetoStogage.codSucursal,
        ...data
      }
      if(ValidarGrabarServicio(datos)){
        const res =  await postServicioServicio(datos);
        if(res) reset();
      }
      console.log(data)
      
    }

    const handleResetClick = () => {
      reset(); 
    };
    return(
    
        <Form onSubmit={handleSubmit(onSubmit)} id="formCliente" name="formCliente">
          <title>SERVICIOS</title>
        <Card className='bg-transparent border-secondary shadow-none'  >
            <CardBody>
            <Row className='mb-1'>
              <Col>
                <h5>REGISTRO DE SERVICIOS</h5>
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
 
             </Row>
             <Row>
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


