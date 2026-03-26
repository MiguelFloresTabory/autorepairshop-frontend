import { useEffect } from "react"
import { Trash } from "react-feather"
import { Link } from "react-router-dom"
import { Input, Table, UncontrolledTooltip } from "reactstrap"
import { notificacion } from "../../utilities/utils/utils"

export function GrillaBuscarProducto({listaDatos, setListaDatos, ActualizarPrecio, ActualizarCantidad, EliminarProducto}){




    return (
      <Table bordered responsive>
      <thead>
        <tr>
        <th style={{ width: '70px' }}></th>
          <th style={{ textAlign: "center", width: "150px" }}>CODIGO</th>
          <th style={{ textAlign: "center" }}>PRODUCTO</th>
          <th style={{ textAlign: "center" , width: "100px"}}>MARCA</th>
          <th style={{ textAlign: "center",  width: "100px"  }}>CANTIDAD</th>
          <th style={{ textAlign: "center",  width: "60px"  }}>PRECIO</th>
          <th style={{ textAlign: "center" ,  width: "60px" }}>IMPORTE</th>
        </tr>
      </thead>
      {listaDatos ? 
       <tbody>
        {listaDatos.map((producto) => 
       <tr key={producto.codigoProducto} >
        <td style={{ textAlign: "center" }} >
                <Link to="#" id="eliminarProductoDetalle" onClick={() => { if (producto.codProducto === 0) { notificacion('Registro Inexistente', 'error') } else { EliminarProducto(producto) } }}>
                  <Trash size="20" color="red" />
                  <UncontrolledTooltip target="eliminarProductoDetalle"> ELIMINAR </UncontrolledTooltip>
                </Link>
              </td>
              
         <td>{producto.codigoAlternativo}</td>
         <td>{producto.descripcion}</td>
         <td>{producto.marca}</td>
         <td>
         <Input disabled={(producto.codTipoProducto === 1) ? false : true}  defaultValue={producto.cantidad} onBlur={(e) => ActualizarCantidad(e.target.value, producto)}  id="Cantidad" name="Cantidad" bsSize="sm"  style={{ width: "80px" }} placeholder='CANTIDAD'  />
         </td>
         <td>
         <Input defaultValue={producto.precio}  onBlur={(e) => ActualizarPrecio(e.target.value, producto)}   id="Precio" name="Precio" bsSize="sm"  style={{ width: "80px" }} placeholder='PRECIO'  />
         </td>
         <td>{parseFloat(producto.cantidad)*parseFloat(producto.precio)}</td>
       </tr> 
       )}
     </tbody>
     : <InicializarGrillaVacia/>
    }
     
  
    </Table>
    )
  }
  
  function InicializarGrillaVacia(){
  
  
    return (
    
      <tbody>
        <tr >
          <td></td>
          <td></td>
          <td></td>
          <td>
          <Input  id="Cantidad" name="Cantidad" bsSize="sm"  style={{ width: "80px" }} placeholder='CANTIDAD'  />
          </td>
          <td>
          <Input  id="Precio" name="Precio" bsSize="sm"  style={{ width: "80px" }} placeholder='PRECIO'  />
          </td>
          <td></td>
        </tr>
      </tbody>
    )
  }