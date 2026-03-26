import { Form, Card, CardBody, Col, Row, Label, FormFeedback, Input, Button } from 'reactstrap';
import { Controller, useForm  } from 'react-hook-form';
import SelectConceptController from '../../../Componentes/Selects/SelectConceptController';
import { ValidarGrabarVehiculo, schemaVehiculo } from './ValidacionesVehiculo';
//import { postProductoVehiculo} from '../../../Services/VehiculoProducto';
import { yupResolver } from '@hookform/resolvers/yup';
import { getStorageObject } from '../../../utilities/storage/LogalStorage';
import { useEffect } from 'react';
import { useState } from 'react';
import { InputAutocompleteCliente } from '../../../Componentes/Inputs/InputAutoComplete';
import { arregloColor, arregloMarca, arregloTipoVehiculo, formatDate } from '../../../utilities/utils/utils';
import { postVehiculoServicio } from '../../../Services/servicioVehiculos';
//import { postVehiculoVehiculo } from '../../../Services/VehiculoVehiculos';

export default function VehiculoRegistrar(){
    const { reset, handleSubmit, setValue, control, formState: { errors }} = 
    useForm({ mode: 'onChange', resolver: yupResolver(schemaVehiculo)});
    const [descripcionAutoComplete, setDescripcionAutoComplete] = useState("")
    const [objCliente, setObjCliente] = useState({})
    
  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);



    const onSubmit = async (data) => {
      const datos = {
        CodCliente: objCliente ? objCliente.codCuentaCorriente : 0,
        ...data
      }
      console.log(datos)
      if(ValidarGrabarVehiculo(datos, objCliente)){
         const res =  await postVehiculoServicio(datos);
         if(res) {reset(); setDescripcionAutoComplete("");}
      }
    
      
    }

    const handleResetClick = () => {
      setDescripcionAutoComplete("");
      setObjCliente({})
      reset(); 
    };
    return(
    
        <Form onSubmit={handleSubmit(onSubmit)} id="formCliente" name="formCliente">
          <title>VehiculoS</title>
        <Card className='bg-transparent border-secondary shadow-none'  >
            <CardBody>
            <Row className='mb-1'>
              <Col>
                <h5>REGISTRO DE VEHICULO</h5>
              </Col>
            </Row>

            <Row>
               <Col sm='6'>
                 <Row className='mb-1'>
                   <Label sm='3' md='4'  size='sm' className='form-label' for='Descripcion'>
                     CLIENTE
                   </Label>
                   <InputAutocompleteCliente setDescripcion={setDescripcionAutoComplete} descripcion={descripcionAutoComplete} setClientSelect={setObjCliente} clienteSelect={objCliente} classname={"col col-sm-7 col-md-6"} />
              
                 </Row>
               </Col>

               <Col sm='6'>
                <Row className='mb-1'>
                  <Label sm='3' md='4' size='sm' className='form-label' for='Placa'>
                    PLACA
                  </Label>
                  <Col sm='7' md='6'>
                    <Controller
                      name='Placa'
                      defaultValue=''
                      control={control}
                      render={({ field }) => <Input {...field} id="Placa" name="Placa" bsSize="sm" 
                      style={{ textTransform: 'uppercase' }} placeholder='Ingresar PLACA' invalid={errors.Placa && true}
                      />}
                    />
                    {errors.Placa && <FormFeedback>{errors.Placa.message}</FormFeedback>}
                  </Col>
                </Row>
              </Col>


             </Row>
            <Row>

            <Col sm='6'>
                <Row className='mb-1'>
                  <Label sm='3' md='4' size='sm' className='form-label' for='Chasis'>
                    CHASIS
                  </Label>
                  <Col sm='7' md='6'>
                    <Controller
                      name='Chasis'
                      defaultValue=''
                      control={control}
                      render={({ field }) => <Input {...field} id="Chasis" name="Chasis" bsSize="sm" 
                      style={{ textTransform: 'uppercase' }} placeholder='Ingresar chasis' invalid={errors.Placa && true}
                      />}
                    />
                    {errors.Chasis && <FormFeedback>{errors.Chasis.message}</FormFeedback>}
                  </Col>
                </Row>
              </Col>

            <Col sm='6'>
                <Row className='mb-1'>
                  <Label sm='3' md='4' size='sm' className='form-label' for='NroMotor'>
                   NRO MOTOR
                  </Label>
                  <Col sm='7' md='6'>
                    <Controller
                      name='NroMotor'
                      defaultValue=''
                      control={control}
                      render={({ field }) => <Input {...field}  id="NroMotor" name="NroMotor" bsSize="sm" 
                      style={{ textTransform: 'uppercase' }} placeholder='Ingresar Numero Motor' invalid={errors.NroMotor && true}
                      
                      />}
                    />
                    {errors.NroMotor && <FormFeedback>{errors.NroMotor.message}</FormFeedback>}
                  </Col>
                </Row>
              </Col>

              
            </Row>

           


             <Row>
           
               <Col sm='6'>
                 <Row className='mb-1'>
                   <Label sm='3' md='4' size='sm' className='form-label' for='NroFlota'>
                  NRO FLOTA
                   </Label>
                   <Col sm='7' md='6'>
                     <Controller
                       name='NroFlota'
                       defaultValue=''
                       control={control}
                       render={({ field }) => <Input {...field}  id="NroFlota" name="NroFlota" bsSize="sm" 
                       style={{ textTransform: 'uppercase' }} placeholder='Ingresar numero flota' invalid={errors.NroFlota && true}
                       
                       />}
                     />
                     {errors.NroFlota && <FormFeedback>{errors.NroFlota.message}</FormFeedback>}
                   </Col>
                 </Row>
               </Col>

               <Col sm='6'>
                 <Row className='mb-1'>
                   <Label sm='3' md='4' size='sm' className='form-label' for='NroFlota'>
                     COLOR
                   </Label>
                   <Col sm='7' md='6'>
                   <SelectConceptController  arregloConcepto={arregloColor} control={control} name={'CodColor'} error={errors.CodColor} />

                   </Col>
                 </Row>
               </Col>
 
             </Row>
             <Row>
          </Row>

          
          <Row>
             <Col sm='6'>
                 <Row className='mb-1'>
                   <Label sm='3' md='4' size='sm' className='form-label' for='FechaVctoSoat'>
                  FECHA VEN. SOAT
                   </Label>
                   <Col sm='7' md='6'>
                     <Controller
                       name='FechaVctoSoat'
                       defaultValue=''
                       control={control}
                       render={({ field }) => <Input {...field} type='date' id="FechaVctoSoat" name="FechaVctoSoat" bsSize="sm" 
                       style={{ textTransform: 'uppercase' }} placeholder='Ingresar vencimiento' invalid={errors.FechaVctoSoat && true}
                       
                       />}
                     />
                     {errors.FechaVctoSoat && <FormFeedback>{errors.FechaVctoSoat.message}</FormFeedback>}
                   </Col>
                 </Row>
               </Col>

               <Col sm='6'>
                 <Row className='mb-1'>
                   <Label sm='3' md='4' size='sm' className='form-label' for='NroFlota'>
                   TIPO VEHICULO
                   </Label>
                   <Col sm='7' md='6'>
                   <SelectConceptController arregloConcepto={arregloTipoVehiculo} control={control} name={'CodTipoVehiculo'} error={errors.CodTipoVehiculo} />

                   </Col>
                 </Row>
               </Col>

             
 
             </Row>



             <Row>
             <Col sm='6'>
                 <Row className='mb-1'>
                   <Label sm='3' md='4' size='sm' className='form-label' for='NroFlota'>
                    MARCA
                   </Label>
                   <Col sm='7' md='6'>
                   <SelectConceptController  arregloConcepto={arregloMarca} control={control} name={'CodMarca'} error={errors.CodMarca} />

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


