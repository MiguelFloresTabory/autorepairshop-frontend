import { Form, Card, CardBody, Col, Row, Label, FormFeedback, Input, Button, CardHeader } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import SelectConceptController from '../../../Componentes/Selects/SelectConceptController';
import { arregloAnios, arregloMeses, notificacion, removerDuplicados } from '../../../utilities/utils/utils';
import jsPDF from 'jspdf';
import { getReporteVentaCobranzaServicio, getReporteVentaEficienciaServicio } from '../../../Services/serviciosReporte';
import autoTable from 'jspdf-autotable'
export default function VentasClientes() {

    
    const { handleSubmit, control, formState: { errors } } = useForm({ mode: 'onChange' });

   
    const onSubmit = async (data) => {
        const datos = { MetaMes: 0, ...data}
        if(ValidarReporte(datos)){
            const arreglo = await getReporteVentaEficienciaServicio(datos);
            console.log(arreglo)
            if(arreglo.length > 0){
                exportPDF(arreglo);
            }
            
          }
    }
      
    const exportPDF = (arregloVentas) => {
        const marginLeft = 40;
        const doc = new jsPDF("portrait", "pt", "A4");
    
        doc.setFontSize(15);
    
        const title = "REPORTE VENTAS POR CLIENTES";
        const headers = [["DOCUMENTO", "FECHA", "CLIENTE","FORMAPAGO","NRO OPERACION" ,"TIPO DOC", "MONTO"]];
    
        const data =  arregloVentas?.map(data=> [data.serieDoc +'-'+ data.numeroDoc, data.fechaEmisionTexto,
        data.cliente, data.formaPago, data.nroOperacion,data.tipoDocumento, data.total]);

        
        let Meta=0
        let anio = 0
        let total=0
        let NroClientesCompraron=0
        let Indicador=0
        let Mes=""
        try{ 
            anio = arregloVentas[0].anio
            for(let i = 0; i < arregloVentas.length; i++) total+=arregloVentas[i].total;

            let arrayUnico = removerDuplicados(arregloVentas, "cliente");
            NroClientesCompraron = arrayUnico.length;
            Indicador = total/NroClientesCompraron;
            Mes = arregloVentas[0].mes


        }catch(e){ console.log(e)}
       
        let content = {
          startY: 50,
          head: headers,
          body: data,
          theme: 'grid'
        };
        
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.text("AÑO:", 400, 750, 0, 150);
        doc.text(anio.toString(), 500, 750, 0, 150);

        doc.text("MES:", 400, 770, 0, 150);
        doc.text(Mes, 500, 770, 0, 150);

        doc.text("INDICADOR:", 400, 790, 0, 150);
        doc.text(Indicador.toString()+ " R/C", 500, 790, 0, 150);

        doc.text("TOTAL", 400, 810, 0, 150);
        doc.text(total+ " /S", 500, 810, 0, 150);

        doc.save("ReporteCobranza.pdf")
      }
    



    return (
      
        <section className='container-formEficacia '>

            <h5 style={{marginLeft:"10px"}}  className='mt-0 mb-1'>VENTAS POR CLIENTES</h5>
            <Row>
                <Col md='5'>
                    <Card >
                        <CardHeader>
                        </CardHeader>
                        <CardBody>

                            <Form onSubmit={handleSubmit(onSubmit)} id="formCliente" name="formCliente">
                                <title>VENTAS POR CLIENTES</title>
                                <Card className='bg-transparent border-secondary shadow-none'  >
                                    <CardBody>
                                        <Row className='mb-1'>
                                            <Col>
                                                <h5>REPORTE DE VENTAS POR CLIENTES</h5>
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
                                                    <Label sm='4' md='4' size='sm' className='form-label' for='Mes'>
                                                        MES
                                                    </Label>
                                                    <Col sm='8' md='8'>
                                                    <SelectConceptController control={control}   error={errors.Mes} name={'Mes'} arregloConcepto={arregloMeses} />
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
    if(data.Anio === "-1"){
        cadena += "Seleccione un año\n"
    }
    if(data.Mes === "-1"){
        cadena += "Seleccione un Mes\n"
       
    }
    if (cadena === "") return true;
    notificacion(cadena, "error")
    return false
}




