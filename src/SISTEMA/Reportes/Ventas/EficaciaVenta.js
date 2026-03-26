
import { Form, Card, CardBody, Col, Row, Label, FormFeedback, Input, Button, CardHeader } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import { arregloAnios, arregloMeses, notificacion } from '../../../utilities/utils/utils';
import SelectConceptController from '../../../Componentes/Selects/SelectConceptController';
import jsPDF from 'jspdf';
import { getReporteVentaEficienciaServicio } from '../../../Services/serviciosReporte';
import autoTable from 'jspdf-autotable'
export default function ReporteEficaciaVenta() {

  
    const { handleSubmit, control, formState: { errors } } = useForm({ mode: 'onChange' });
 
    const onSubmit = async (data) => {
        if(ValidarReporte(data)){
            const arreglo = await getReporteVentaEficienciaServicio(data);
            if(arreglo.length > 0){
                exportPDF(arreglo);
            }
            
          }
    }
      
    const exportPDF = (arregloVentas) => {
        const marginLeft = 40;
        const doc = new jsPDF("portrait", "pt", "A4");
    
        doc.setFontSize(15);
    
        const title = "REPORTE EFICACIA VENTAS";
        const headers = [["DOCUMENTO", "FECHA", "CLIENTE","FORMAPAGO","NRO OPERACION" ,"TIPO DOC", "MONTO"]];
    
        const data =  arregloVentas?.map(data=> [data.serieDoc +'-'+ data.numeroDoc, data.fechaEmisionTexto,
        data.cliente, data.formaPago, data.nroOperacion,data.tipoDocumento, data.total]);

        let total=0
        let Meta=0
        for(let i = 0; i < arregloVentas.length; i++) total+=arregloVentas[i].total;
        let eficacia = 0
        try{ eficacia = (total*100)/arregloVentas[0].meta}catch(e){ console.log(e)}
        Meta = arregloVentas[0].meta;
       
        let content = {
          startY: 50,
          head: headers,
          body: data,
          theme: 'grid'
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.text("TOTAL:", 400, 750, 0, 150);
        doc.text(total+ " /S", 480, 750, 0, 150);

        doc.text("META:", 400, 770, 0, 150);
        doc.text(Meta+ " /S", 480, 770, 0, 150);

        doc.text("EFICACIA:", 400, 790, 0, 150);
        doc.text(eficacia+ "%", 480, 790, 0, 150);

        

        doc.save("ReporteEficacia.pdf")
      }
    
    return (

        <section className='container-formEficacia '>

            <h5 className='mt-0 mb-1' style={{marginLeft:"10px"}} >EFICACIA DE VENTA</h5>
            <Row>
                <Col md='5'>
                    <Card >
                        <CardHeader>
                        </CardHeader>
                        <CardBody>

                            <Form onSubmit={handleSubmit(onSubmit)} id="formCliente" name="formCliente">
                                <title>EFICACIA DE VENTA</title>
                                <Card className='bg-transparent border-secondary shadow-none'  >
                                    <CardBody>
                                        <Row className='mb-1'>
                                            <Col>
                                                <h5>REPORTE DE EFICACIA DE VENTA</h5>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col sm='12'>
                                                <Row className='mb-1'>
                                                    <Label sm='4' md='4' size='sm' className='form-label' for='Mes'>
                                                        MES
                                                    </Label>
                                                    <Col sm='8' md='8'>
                                                    <SelectConceptController control={control}   error={errors.Mes} name={'Mes'} arregloConcepto={arregloMeses} />
                                                    </Col>
                                                </Row>
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
                                                <Label sm='4' md='4' size='sm' className='form-label' for='MetaMes'>
                                                    VENTA META MES
                                                    </Label>
                                                    <Col sm='8' md='8'>
                                                        <Controller
                                                            name='MetaMes'
                                                            defaultValue=''
                                                            control={control}
                                                            render={({ field }) => <Input {...field} id="MetaMes" name="MetaMes" bsSize="sm"
                                                                style={{ textTransform: 'uppercase' }} placeholder='Meta del Mes' invalid={errors.MetaMes && true}
                                                            />}
                                                        />
                                                        {errors.MetaMes && <FormFeedback>{errors.MetaMes.message}</FormFeedback>}
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
    let cadena = ""
    if(data.Mes === "-1"){
        cadena += "SELECCIONE UN MES\n"
    }

    if(data.Anio === "-1"){
        cadena += "SELECCIONE UN AÑO\n"
    }
    if(data.MetaMes === ""){
        cadena += "INGRESE LA META DEL MES\n"
    }

    if(isNaN(data.MetaMes)){
        cadena += "LA META NO PUEDE SER LETRAS\n"
    }

    if(cadena === "")  return true;
    else {
        notificacion(cadena, "error");
        return false;
    }

}