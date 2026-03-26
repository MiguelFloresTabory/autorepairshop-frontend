import { Form, Card, CardBody, Col, Row, Label, FormFeedback, Input, Button } from 'reactstrap';
import { Controller, useForm  } from 'react-hook-form';
import SelectConceptController from '../../../Componentes/Selects/SelectConceptController';
import { ValidarGrabarProducto, schemaProducto } from './ValidacionesProducto';
import { postProductoServicio } from '../../../Services/servicioProducto';
import { yupResolver } from '@hookform/resolvers/yup';
import { getStorageObject } from '../../../utilities/storage/LogalStorage';
import { useEffect } from 'react';

export default function ProductoRegistrar(){
    const { reset, handleSubmit, setValue, control, formState: { errors }} = 
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

    const onSubmit = async (data) => {
      const objetoStogage = getStorageObject();
      const datos = {
        CodEmpresa: "2",
        CodAlmacen: objetoStogage.codSucursal,
        ...data
      }
      if(ValidarGrabarProducto(datos)){
        const res =  await postProductoServicio(datos);
        if(res) reset();
      }
      
    }
 

    const handleResetClick = () => {
      reset(); 
    };
    return(
    
        <Form onSubmit={handleSubmit(onSubmit)} id="formCliente" name="formCliente">
          <title>REPUESTOS</title>
        <Card className='bg-transparent border-secondary shadow-none'  >
            <CardBody>
            <Row className='mb-1'>
              <Col>
                <h5>REGISTRO DE REPUESTOS</h5>
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


