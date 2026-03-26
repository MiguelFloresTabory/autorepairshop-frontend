
import {  useState } from 'react'
import {
  Card, CardBody, CardHeader, Col, Nav,
  NavItem,
  NavLink, Row, TabContent,
  TabPane
} from 'reactstrap'
import CotizacionRegistrar from './CotizacionVehicularRegistrar'
import CotizacionConsulta from './CotizacionVehicularConsulta'
// import CotizacionConsulta from './CotizacionConsulta'

export default function CotizacionVehicularForm ()  {

    const [activePill, setPillActive] = useState('1')
    const [listaProductos, setListaProductos] = useState([]);
    const [objEdicion, setObjEdicion] = useState({});
    //se utiliza para saber si se actualizo, para llamar a listar en consulta, desde registrar
    const [estadoActualizo, setEstadoActualizo] = useState(false);
  
    const togglePills = tab => {
      if (activePill !== tab) {
        setPillActive(tab)
      }
    }
    return(
        <section className='container-formProducto'>
        
        <h5 className='mt-0 mb-1' style={{paddingLeft: "15px"}} >COTIZACION</h5>
        <Row>
          <Col md='9'>
            <Card >
              <CardHeader>
                <Nav pills>
                  <NavItem>
                    <NavLink
                      active={activePill === '1'}
                      onClick={() => {
                        togglePills('1')
                      }}
                    >
                      REGISTRO
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      active={activePill === '2'}
                      onClick={() => {
                        togglePills('2')
                      }}
                    >
                      CONSULTA
                    </NavLink>
                  </NavItem>
                </Nav>
              </CardHeader>
              <CardBody>
                <TabContent activeTab={activePill}>
                  <TabPane tabId='1'>
                  <CotizacionRegistrar setPillActive={setPillActive}  objEdicion={objEdicion}  setObjEdicion={setObjEdicion} listaProductos={listaProductos} 
                   setListaProductos={setListaProductos}  estadoActualizo={estadoActualizo} setEstadoActualizo={setEstadoActualizo} />
                  </TabPane>
                  <TabPane tabId='2'>
                  <CotizacionConsulta setObjEdicion={setObjEdicion}  objEdicion={objEdicion}  listaProductos={listaProductos} 
                   setListaProductos={setListaProductos}   setPillActive={setPillActive}   estadoActualizo={estadoActualizo} 
                   setEstadoActualizo={setEstadoActualizo} />
                  
                  {/*  consulta   */}
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </section>
    
        );
}