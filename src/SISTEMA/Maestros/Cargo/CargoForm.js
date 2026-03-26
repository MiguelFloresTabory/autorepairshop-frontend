
import {  useState } from 'react'
import {
  Card, CardBody, CardHeader, Col, Nav,
  NavItem,
  NavLink, Row, TabContent,
  TabPane
} from 'reactstrap'

export default function CargoForm ()  {

    const [activePill, setPillActive] = useState('1')
  
    const togglePills = tab => {
      if (activePill !== tab) {
        setPillActive(tab)
      }
    }
    return(
        <section className='container-formCliente'>
        
        <h5 className='mt-0 mb-1'>CARGO</h5>
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

                  </TabPane>
                  <TabPane tabId='2'>
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