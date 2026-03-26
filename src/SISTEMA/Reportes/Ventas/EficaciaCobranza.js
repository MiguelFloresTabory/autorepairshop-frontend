
import { Form, Card, CardBody, Col, Row, Label, FormFeedback, Input, Button, CardHeader } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import SelectConceptController from '../../../Componentes/Selects/SelectConceptController';
import { arregloAnios, notificacion, removerDuplicados } from '../../../utilities/utils/utils';
import jsPDF from 'jspdf';
import { getReporteDatosVentasClientesServicio, getReporteVentaCobranzaServicio } from '../../../Services/serviciosReporte';
import autoTable from 'jspdf-autotable'
import { useEffect, useState } from 'react';
export default function ReporteEficaciaCobranza() {

    
    const { handleSubmit, register, setValue, control, formState: { errors } } = useForm({ mode: 'onChange' });
    const { onChange } = register('Anio', { onChange: (e) => LlenarCampos(e.target.value) })

    const [campos, setCampos] = useState({});

    const onSubmit = async (data) => {
        if(ValidarReporte(data)){
            const arreglo = await getReporteVentaCobranzaServicio(data);
            if(arreglo.length > 0){
                exportPDF(arreglo);
            }
            
          }
    }

    async function  LlenarCampos(anios) {
        if(anios !== "-1"){
            const respuesta = await getReporteDatosVentasClientesServicio({Anio: anios});
            if(respuesta){
                setCampos(respuesta);
            }
        }else{
            notificacion("Ingrese un año correcto", "error")
        }
           

        
    }

    useEffect(() => {
        if (campos) {
            setValue("TotalEmitido", campos.totalEmitido);
            setValue("TotalCobrado", campos.totalCobrado);
            setValue("Cobranza", campos.indicadorCobranza);
        }
        console.log("GOLA")

    }, [campos])
    
      
    const exportPDF = (arregloVentas) => {
        const marginLeft = 40;
        const doc = new jsPDF("portrait", "pt", "A4");
    
        doc.setFontSize(15);
    
        const title = "REPORTE EFICACIA COBRANZAS";
        const headers = [["DOCUMENTO", "FECHA", "CLIENTE","FORMAPAGO","NRO OPERACION" ,"TIPO DOC", "MONTO"]];
    
        const data =  arregloVentas?.map(data=> [data.serieDoc +'-'+ data.numeroDoc, data.fechaEmisionTexto,
        data.cliente, data.formaPago, data.nroOperacion,data.tipoDocumento, data.total]);

        
        let anio = 0
        let total=0
        let Indicador=0
        let Cobrado=0
        let Emitido=0
        try{ 
            anio = arregloVentas[0].anio
            for(let i = 0; i < arregloVentas.length; i++) total+=arregloVentas[i].total;
            Indicador = campos.indicadorCobranza;
            Cobrado = campos.totalCobrado;
            Emitido = campos.totalEmitido;
        }catch(e){ console.log(e)}
       
        let content = {
          startY: 50,
          head: headers,
          body: data,
          theme: 'grid'
        };
        
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.text("TOTAL:", 400, 750, 0, 150);
        doc.text(Emitido.toString()+ " /S", 490, 750, 0, 150);

        doc.text("COBRADO:", 400, 770, 0, 150);
        doc.text(Cobrado.toString()+ " /S", 490, 770, 0, 150);

        doc.text("EFICACIA:", 400, 790, 0, 150);
        doc.text(Indicador, 490, 790, 0, 150);

        doc.save("ReporteCobranza.pdf")
      }
    



    return (
      
        <section className='container-formEficacia '>

            <h5 className='mt-0 mb-1' style={{marginLeft:"10px"}}  >EFICACIA DE COBRANZA</h5>
            <Row>
                <Col md='5'>
                    <Card >
                        <CardHeader>
                        </CardHeader>
                        <CardBody>

                            <Form onSubmit={handleSubmit(onSubmit)} id="formCliente" name="formCliente">
                                <title>EFICACIA DE COBRANZA</title>
                                <Card className='bg-transparent border-secondary shadow-none'  >
                                    <CardBody>
                                        <Row className='mb-1'>
                                            <Col>
                                                <h5>REPORTE EFICACIA DE VENTAS COBRANZAS</h5>
                                            </Col>
                                        </Row>


                                        <Row>
                                        <Col sm='12'>
                                                <Row className='mb-1'>
                                                    <Label  sm='4' md='4' size='sm' className='form-label' for='Anio'>
                                                        AÑO
                                                    </Label>
                                                    <Col sm='8' md='8'>
                                                    <SelectConceptController control={control}   error={errors.Anio} name={'Anio'} arregloConcepto={arregloAnios} />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>


                                        <Row>
                                            <Col sm='12'>
                                                <Row className='mb-1'>
                                                <Label sm='4' md='4' size='sm' className='form-label' for='TotalEmitido'>
                                                   TOTAL EMITIDO
                                                    </Label>
                                                    <Col sm='8' md='8'>
                                                        <Controller
                                                            name='TotalEmitido'
                                                            defaultValue=''
                                                            control={control}
                                                            render={({ field }) => <Input {...field} id="TotalEmitido" name="TotalEmitido" bsSize="sm" disabled={true}
                                                                style={{ textTransform: 'uppercase' }} placeholder='' invalid={errors.TotalEmitido && true}
                                                            />}
                                                        />
                                                        {errors.TotalEmitido && <FormFeedback>{errors.TotalEmitido.message}</FormFeedback>}
                                                    </Col>
                                                </Row>
                                            </Col>

                                        </Row>

                                        <Row>
                                            <Col sm='12'>
                                                <Row className='mb-1'>
                                                <Label sm='4' md='4' size='sm' className='form-label' for='TotalCobrado'>
                                                    TOTAL COBRADO
                                                    </Label>
                                                    <Col sm='8' md='8'>
                                                        <Controller
                                                            name='TotalCobrado'
                                                            defaultValue=''
                                                            control={control}
                                                            render={({ field }) => <Input {...field} id="TotalCobrado" name="TotalCobrado" bsSize="sm" disabled={true}
                                                                style={{ textTransform: 'uppercase' }} placeholder='' invalid={errors.TotalCobrado && true}
                                                            />}
                                                        />
                                                        {errors.TotalCobrado && <FormFeedback>{errors.TotalCobrado.message}</FormFeedback>}
                                                    </Col>
                                                </Row>
                                            </Col>

                                        </Row>

                                        <Row>
                                            <Col sm='12'>
                                                <Row className='mb-1'>
                                                    <Label sm='4' md='4' size='sm' className='form-label' for='Cobranza'>
                                                    EFICIENCIA COBRANZA
                                                    </Label>
                                                    <Col sm='8' md='8'>
                                                        <Controller
                                                            name='Cobranza'
                                                            defaultValue=''
                                                            control={control}
                                                            render={({ field }) => <Input {...field} id="Cobranza" name="Cobranza" bsSize="sm" disabled={true}
                                                                style={{ textTransform: 'uppercase' }} placeholder='' invalid={errors.Cobranza && true}
                                                            />}
                                                        />
                                                        {errors.Cobranza && <FormFeedback>{errors.Cobranza.message}</FormFeedback>}
                                                    </Col>
                                                </Row>
                                            </Col>

                                        </Row>


                                    </CardBody>
                                </Card>
                                <Row style={{ textAlign: 'right' }}>
                                    <Col sm='12' className='mb-1'>
                                        <Button color='primary' type='submit' style={{ width: "120px" }}>
                                            PDF
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>


                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </section>



    )
}

function ValidarReporte(data){
    console.log(data)
    if(data.Anio === "-1"){
        notificacion("Seleccione un año", "error")
        return false
    }

    if(!data.Anio){
        notificacion("Seleccione un año", "error")
        return false
    }
    return true
}




