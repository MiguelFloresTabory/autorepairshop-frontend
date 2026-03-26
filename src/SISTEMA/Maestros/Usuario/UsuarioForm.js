
import {  useState } from 'react'
import {
  Card, CardBody, CardHeader, Col, Nav,
  NavItem,
  NavLink, Row, TabContent,
  TabPane
} from 'reactstrap'
import UsuarioRegistrar from './UsuarioRegistrar'
import UsuarioConsulta from './UsuarioConsulta'

export default function UsuarioForm ()  {

    const [activePill, setPillActive] = useState('1')
  
    const togglePills = tab => {
      if (activePill !== tab) {
        setPillActive(tab)
      }
    }
    return(
        <section className='container-formUsuario'>
        
        <h5 className='mt-0 mb-1' style={{paddingLeft: "15px"}} >Usuario</h5>
        <Row>
          <Col md='8'>
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
                  <UsuarioRegistrar />

                  </TabPane>
                  <TabPane tabId='2'>
                  <UsuarioConsulta />
                  
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