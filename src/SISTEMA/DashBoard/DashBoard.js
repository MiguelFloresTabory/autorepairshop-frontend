import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, FormGroup } from 'reactstrap';
import { GraficoBarras, GraficoDoughnut, GraficoLineas, GraficoTortas } from './ChartComponents ';
import { getDocumentoVentaGraficosDatosServicio } from '../../Services/servicioDocumentoVenta';
import { CargandoGif } from '../../utilities/utils/Cargando';




export const DashBoard = () => {

    const [listaDatos, setlistaDatos] = useState([]);

    const beneficios = [0, 56, 20, 36, 80, 40, 30, -20, 25, 30, 12, 60];
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const listaDatosPrevia = { grafico1: [{ datos: 320, nombres: "2020" }, { datos: 5000, nombres: "2020" }, { datos: 6000, nombres: "2021" }, { datos: 3000, nombres: "2022" }, { datos: 2000, nombres: "2023" },] }
    //const listaDatos = ConvertirArrayObjectstoObjectArray(listaDatosPrevia.grafico1);
    useEffect(() => {
        (async () => {
            const res = await getDocumentoVentaGraficosDatosServicio();
            if (res) {
                setlistaDatos(res)
                console.log(res)
            }

        })();
    }, [])
    async function CargarGraficos(){
        const res = await getDocumentoVentaGraficosDatosServicio();
        if (res) {
            setlistaDatos(res)
            console.log(res)
        }

    }




    return (
        <div className='container' style={{width: "100%", height: "100%"}}>
        <div className='row justify-content-between' style={{width: "100%", height: "100%"}}>
         
           <Row>
           <Col md="6" >
           <h1 className="mt-4 mb-4 ms-4">DASHBOARD</h1>
           </Col>
           <Col md="6" >
           <Button  onClick={() => {CargarGraficos()}} className="mt-4 mb-4 ms-4 btn btn-success" type='button' > ACTUALIZAR</Button>
           </Col>
           </Row>
            
            <Row>
                <Col md="6" className="mb-4">
                <h3 style={{textAlign: "center"}} >TOP PRODUCTOS MAS COMPRADOS</h3>
                    <div className="bg-light mx-auto border border-2 border-primary" style={{ width: "600px", height: "290px" }} >
                        <div style={{ width: "100%", height: "100%", padding: "10px 0" }} >
                        
                            {listaDatos.graficoTopCantidadProductos ?
                                <GraficoLineas listaDatos={ConvertirArraytoFormatoGrafico(listaDatos.graficoTopCantidadProductos)} titulo={"PRODUCTOS"} />
                                : <CargandoGif style={{width: "400px", height: "200px" }} />

                            }

                        </div>
                    </div>
                </Col>
                <Col md="6" className="mb-4">
                <h3 style={{textAlign: "center"}} >TOTAL COBRANZAS POR AÑO</h3>
                    <div className="bg-light mx-auto border border-2 border-primary" style={{ width: "600px", height: "290px" }} >
                        <div style={{ width: "100%", height: "100%", padding: "10px 0" }} >
                        {listaDatos.graficoCobranzasxAnio ?
                                <GraficoBarras max={3000} min={0}  listaDatos={ConvertirArraytoFormatoGrafico(listaDatos.graficoCobranzasxAnio)} titulo={"recaudado"} />
                                : <CargandoGif style={{width: "400px", height: "200px" }} /> }
                            
                             </div>  </div>
                </Col>
                <Col md="6" className="mb-4">
                <h3 style={{textAlign: "center"}} >CREDITO VS CONTADO</h3>
                    <div className="bg-light mx-auto border border-2 border-primary" style={{ width: "600px", height: "290px" }} >
                        <div style={{ width: "100%", height: "100%", padding: "10px 0" }} >
                        {listaDatos.graficoContadovsCredito ?
                                <GraficoTortas listaDatos={ConvertirArraytoFormatoGrafico(listaDatos.graficoContadovsCredito)} titulo={"MONTO INGRESADO"} />
                                : <CargandoGif style={{width: "400px", height: "200px" }} /> }
                           
                             </div>
                    </div>
                </Col>
                <Col md="6" className="mb-4">
                <h3 style={{textAlign: "center"}} >TOP 7 NRO REPUESTOS POR CLIENTE</h3>
                    <div className="bg-light mx-auto border border-2 border-primary" style={{ width: "600px", height: "290px" }} >
                        <div style={{ width: "100%", height: "100%", padding: "10px 0" }} >
                        {listaDatos.graficoTopClientexNroRepuestos ?
                                <GraficoDoughnut listaDatos={ConvertirArraytoFormatoGrafico(listaDatos.graficoTopClientexNroRepuestos)} titulo={"CANTIDAD REPUESTOS"} />
                                : <CargandoGif style={{width: "400px", height: "200px" }} /> }

                        </div>
                    </div>

                </Col>
            </Row>

        </div>
        </div>
    );
};

function ConvertirArraytoFormatoGrafico(listaDatosPrevia) {
    const objetoFinal = { datos: [], nombres: [] }
    const toArray = JSON.parse(listaDatosPrevia)
    toArray.map((e) => {
        objetoFinal.datos.push(e.datos);
        objetoFinal.nombres.push(e.nombres);
    })
   
    return objetoFinal
}