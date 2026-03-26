import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {  Edit, FileText, Trash } from "react-feather";
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import { notificacion } from '../../../utilities/utils/utils';


export default function GrillaConsultaCotizacion({ ListaData }) {

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell style={{fontWeight: "bold"}} align="center">NUMERO</TableCell>
            <TableCell style={{fontWeight: "bold"}} align="center">RAZONSOCIAL</TableCell>
            <TableCell style={{fontWeight: "bold"}} align="center">FORMAPAGO</TableCell>
            <TableCell style={{fontWeight: "bold"}} align="center">ESTADO</TableCell>
            <TableCell style={{fontWeight: "bold"}} align="center">TOTAL</TableCell>
            <TableCell style={{fontWeight: "bold"}} align="center">EMISION</TableCell>
          </TableRow>
        </TableHead>
        {(ListaData) ?
          <TableBody>{ListaData.map((row)=><Row key={row.codDocVenta} row={row}/>)}</TableBody> 
          : <TableBody><RowEmpity/></TableBody>}
      </Table>
    </TableContainer>
  );
}

function BotonesGrilla({row}) {

  return (
    <div className='d-flex'>
      <Link to="#" id="anular" onClick={() => AnularCotizacion(row.codDocVenta)}>
        <Trash size={24} color='red' />
        <UncontrolledTooltip target="anular">Anular Registro</UncontrolledTooltip>
      </Link>
      <Link to="#" id="editar" onClick={() => EditarCotizacion(row.codDocVenta)}>
        <Edit size={24} />
        <UncontrolledTooltip target="editar">Actualizar Documento</UncontrolledTooltip>
      </Link>
      {/* <Link to="#" id="confirmar" onClick={() => EditarCoti(row.codNotaIngresoSalidaCab)}>
                    <CheckCircle size={24} color='green' />
                    <UncontrolledTooltip target="confirmar">Confirmar Documento</UncontrolledTooltip>
                </Link> */}
      {/* <Link to="#" id="imprimir" onClick={() => handleModalEditar(row.codNotaIngresoSalidaCab)}>
                    <Printer size={24} />
                    <UncontrolledTooltip target="imprimir">Imprimir Nota de Salida</UncontrolledTooltip>
                </Link> */}
      <Link to="#" id="ver" onClick={() => VisualizarDocumento(row.codDocVenta)}>
        <FileText size={24} color='orange' />
        <UncontrolledTooltip target="ver">Visualizar Documento</UncontrolledTooltip>
      </Link>
    </div>

  );
}

function BotonesGrillaVacia() {

  return (
    <div className='d-flex'>
      <Link to="#" id="anular" >
        <Trash size={24} color='red' />
        <UncontrolledTooltip target="anular">Anular Registro</UncontrolledTooltip>
      </Link>
      <Link to="#" id="editar" >
        <Edit size={24} />
        <UncontrolledTooltip target="editar">Actualizar Documento</UncontrolledTooltip>
      </Link>
      {/* <Link to="#" id="confirmar" onClick={() => EditarCoti(row.codNotaIngresoSalidaCab)}>
                    <CheckCircle size={24} color='green' />
                    <UncontrolledTooltip target="confirmar">Confirmar Documento</UncontrolledTooltip>
                </Link> */}
      {/* <Link to="#" id="imprimir" onClick={() => handleModalEditar(row.codNotaIngresoSalidaCab)}>
                    <Printer size={24} />
                    <UncontrolledTooltip target="imprimir">Imprimir Nota de Salida</UncontrolledTooltip>
                </Link> */}
      <Link to="#" id="ver" >
        <FileText size={24} color='orange' />
        <UncontrolledTooltip target="ver">Visualizar Documento</UncontrolledTooltip>
      </Link>
    </div>

  );
}




function AnularCotizacion(id){
  notificacion("AnularRegistro: "+id)
}
function EditarCotizacion(id){
  notificacion("Editar: "+id)
}
function VisualizarDocumento(id){
  notificacion("visualizar: "+ id)
}


function RowEmpity() {
  return (
    <>

      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

        <TableCell align="center"><BotonesGrillaVacia /></TableCell>
        <TableCell align="center"></TableCell>
        <TableCell align="center"></TableCell>
        <TableCell align="center"></TableCell>
        <TableCell align="center"></TableCell>
        <TableCell align="center"></TableCell>
        <TableCell align="center"></TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse  timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* <Typography variant="h6" gutterBottom component="div">
                History
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                  <TableCell align="center" style={{fontWeight: "bold"}}></TableCell>
                    <TableCell align="center" style={{fontWeight: "bold"}}>CODIGO</TableCell>
                    <TableCell align="center" style={{fontWeight: "bold"}}>DESCRIPCION</TableCell>
                    <TableCell align="center" style={{fontWeight: "bold"}}>CANTIDAD</TableCell>
                    <TableCell align="center" style={{fontWeight: "bold"}}>PRECIO</TableCell>
                    <TableCell align="center" style={{fontWeight: "bold"}}>IMPORTE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody> 
                    <TableRow >
                        <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow> 
                   </TableBody> 
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

    </>


  );
}




function Row(prop) {
  const {row} = prop;
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell align="center">
          <BotonesGrilla  key={row.codDocVenta}  row={row} />
        </TableCell>
        <TableCell align="center">{row.numeroDoc}</TableCell>
        <TableCell align="center">{row.razonSocial}</TableCell>
        <TableCell align="center">{row.formaPago}</TableCell>
        <TableCell align="center">{row.estado}</TableCell>
        <TableCell align="center">{row.total}</TableCell>
        <TableCell align="center">{row.emision}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* <Typography variant="h6" gutterBottom component="div">
                History
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                  <TableCell align="center" style={{fontWeight: "bold"}}></TableCell>
                    <TableCell align="center" style={{fontWeight: "bold"}}>CODIGO</TableCell>
                    <TableCell align="center" style={{fontWeight: "bold"}}>DESCRIPCION</TableCell>
                    <TableCell align="center" style={{fontWeight: "bold"}}>CANTIDAD</TableCell>
                    <TableCell align="center" style={{fontWeight: "bold"}}>PRECIO</TableCell>
                    <TableCell align="center" style={{fontWeight: "bold"}}>IMPORTE</TableCell>

                  </TableRow>
                </TableHead>
                {row.docVentaDets ? 
                <TableBody> 
                  {JSON.parse(row.docVentaDets)?.map((docVentaDet) => (
                    <TableRow key={docVentaDet.CodDocVentaDet}>
                        <TableCell align="center" ></TableCell>
                      <TableCell align="center"  >{docVentaDet.CodigoAlternativo}</TableCell>
                      <TableCell align="center" >{docVentaDet.Descripcion}</TableCell>
                      <TableCell align="center" >{docVentaDet.Cantidad}</TableCell>
                      <TableCell align="center" >{docVentaDet.Precio}</TableCell>
                      <TableCell align="center" >{docVentaDet.Importe}</TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody> : <TableBody></TableBody> }

              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>


  );
}