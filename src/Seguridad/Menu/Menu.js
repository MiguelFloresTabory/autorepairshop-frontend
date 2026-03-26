import * as React from "react";
import { Link } from "react-router-dom";
import { deleteStorageObject } from "../../utilities/storage/LogalStorage";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { UncontrolledTooltip } from "reactstrap";
export const Menu = () => {

  const [mostrar, setMostrar] = useState(true);
  const navigate = useNavigate();

  function CerrarSession() {

    Swal.fire({
      title: '¿Está seguro?',
      text: "¿Está seguro de Cerrar Session?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStorageObject();
        setMostrar(false);
        navigate("/login");
      }
    })
  }


  return (
    <>
      {mostrar ? <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/cliente">SUPER DRIVE</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">

              <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    MAESTROS
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="/usuario">USUARIO</Link></li>
                    <li> <Link className="dropdown-item" to="/cargo">CARGO</Link></li>
                    <li> <Link className="dropdown-item" to="/cliente">CLIENTE</Link></li>
                    <li> <Link className="dropdown-item" to="/producto">PRODUCTO</Link></li>
                    <li> <Link className="dropdown-item" to="/servicio">SERVICIO</Link></li>
                    
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    VENTAS
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="/cotizacion">COTIZACION</Link></li>
                    <li> <Link className="dropdown-item" to="/factura">DOC VENTA</Link></li>
                    
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    REPORTES
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="/reportes/ventas/eficaciaVentas">EFICACIA VENTA</Link></li>
                    <li> <Link className="dropdown-item" to="/reportes/ventas/eficaciaCobranza">EFICACIA COBRANZA</Link></li>
                    <li> <Link className="dropdown-item" to="/reportes/ventas/ventasClientes">VENTAS POR CLIENTES</Link></li>

                    <li>

                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    TALLER
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/ordenTrabajo">ORDEN TRABAJO</Link></li>
                    <li><Link className="dropdown-item" to="/cotizacionVehicular">COTIZACION VEHICULAR</Link></li>
                    <li><Link className="dropdown-item" to="/vehiculo">VEHICULO</Link></li>

                    <li>

                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard" id="navbar" role="button"  aria-expanded="false">
                    DASHBOARD
                  </Link>
                </li>

               
              </ul>
              <Link to="#" id="CERRARSESSION" >
              <svg onClick={CerrarSession} style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
              </svg>
              <UncontrolledTooltip target="CERRARSESSION"> CERRAR SESSION </UncontrolledTooltip>
              </Link>

            </div>
          </div>
        </nav>



      </> : <></>}  </>


  );
}



/*

   const [mostrar, setMostrar] = useState(true);
    const navigate = useNavigate();

    function CerrarSession(){
      deleteStorageObject();
      navigate("/login");
      setMostrar(false);
    }

    
 <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <ul className="navbar-nav">
              <li className="nav-item m-2">
               
              </li>
              <li className="nav-item m-2">
                  
              </li>
              <li className="nav-item m-2">
                  <Link  to="/cargo">Cargo</Link>
              </li>
              <li className="nav-item m-2">
                  <Link  to="/login">login</Link>
              </li>
            </ul>
          </div>

       </nav> 
       
       <button onClick={CerrarSession} >CERRAR SESSION</button> */

