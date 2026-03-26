
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState } from "react"
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap"


export function PDFVentasEficiencia(listaVentas = [{numeroDoc: ""}], objHead = {hola: "", gaaaa: ""}, visible = false) {


    const [loader, setLoader] = useState(false);
    const downloadPDF = () => {
        // const capture = document.querySelector('.actual-receipts');
        // setLoader(true);
        // html2canvas(capture).then((canvas) => {
        //     const imgData = canvas.toDataURL('img/png');
        //     const doc = new jsPDF('p', 'mm', 'a4')
        //     const componentWidth = doc.internal.pageSize.getWidth();
        //     const componentHeight = canvas.height * componentWidth / canvas.width;
        //     doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
        //     setLoader(false);
        //     doc.save('reporte.pdf')
        // })

        const doc = new jsPDF();
        

    }

    const none = {display: "none"}
    const noNone = {}


    return (

        <>
            <div className="actual-receipts" style={visible ? none : noNone} >
                <div className="container" >

                    <div className="d-flex justify-content-center align-self-center h-100">
                        <Col sm='12'  >
                            <Card>
                                <CardHeader>
                                    <h3>REPORTE VENTAS</h3>
                                </CardHeader>
                                <CardBody>
                                    <table className="table">
                                        <thead>
                                            {objHead ?
                                                <tr>
                                                    {Object.keys(objHead).map(key =>
                                                        <th style={{ textAlign: "center" }}>{objHead[key]}</th>
                                                    )}
                                                </tr>
                                                :
                                                <tr></tr>}

                                        </thead>
                                        {listaVentas ?
                                            <tbody>
                                                {/* {listaVentas.map(venta => <tr key={venta.numeroDoc + '-' + venta.serieDoc}>

                                                    <td>
                                                        {venta.fechaEmision}
                                                    </td>
                                                    <td>
                                                        {venta.cliente}
                                                    </td>
                                                    <td>
                                                        {venta.formaPago}
                                                    </td>
                                                    <td>
                                                        {venta.nroOperacion}
                                                    </td>
                                                    <td>
                                                        {venta.tipoDocumento}
                                                    </td>
                                                    <td>
                                                        {venta.total}
                                                    </td>
                                                </tr>)} */}

                                            </tbody> : <InicializarGrilla />}
                                    </table>

                                </CardBody>

                            </Card>


                        </Col>
                    </div>
                </div>



            </div>
            <div className="container" >
                <Row style={{ textAlign: 'right' }}>
                    <Col sm='12' className='mb-1'>
                        <Button color='primary' onClick={() => { downloadPDF() }} style={{ width: "120px" }}>
                            DESCARGAR
                        </Button>
                    </Col>
                </Row>
            </div>


        </>

    )
}


function InicializarGrilla() {
    return (
        <tbody>
            <tr >
                <td></td>
                <td></td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
            </tr>
        </tbody>

    )

}

