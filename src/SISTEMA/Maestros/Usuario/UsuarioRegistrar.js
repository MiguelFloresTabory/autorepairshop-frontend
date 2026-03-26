import { Form, Card, CardBody, Col, Row, Label, FormFeedback, Input, Button } from 'reactstrap';
import { Controller, useForm  } from 'react-hook-form';
import SelectConceptController from '../../../Componentes/Selects/SelectConceptController';
import { ValidarGrabarUsuario, schemaUsuario } from './ValidacionesUsuario';
//import { postProductoUsuario} from '../../../Usuarios/UsuarioProducto';
import { yupResolver } from '@hookform/resolvers/yup';
import { getStorageObject } from '../../../utilities/storage/LogalStorage';
import { useEffect } from 'react';
import { arregloCargo } from '../../../utilities/utils/utils';
import { postUsuarioServicio } from '../../../Services/servicioUsuarios';
//import { postUsuarioervicio } from '../../../Services/Usuarioervicios';

export default function UsuarioRegistrar(){
    const { reset, handleSubmit, setValue, control, formState: { errors }} = 
    useForm({ mode: 'onChange', resolver: yupResolver(schemaUsuario) });
   
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

    const onSubmit = async (data) => {
      const objetoStogage = getStorageObject();
      const datos = {
        CodEmpresa: "2",
        CodAlmacen: objetoStogage.codSucursal,
        ...data
      }
      if(ValidarGrabarUsuario(datos)){
        const res =  await postUsuarioServicio(datos);
        if(res) reset();
      }
      console.log(data)
      
    }

    const handleResetClick = () => {
      reset(); 
    };
    return(
    
        <Form onSubmit={handleSubmit(onSubmit)} id="formCliente" name="formCliente">
          <title>Usuario</title>
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


