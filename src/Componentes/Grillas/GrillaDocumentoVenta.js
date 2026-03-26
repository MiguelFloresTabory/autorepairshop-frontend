import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Edit, FileText, Trash } from "react-feather";
import { UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';


export function GrillaConsultaDocumento({ ListaData, AnularDocumento, EditarDocumento, VisualizarDocumento }) {
  console.log(ListaData)
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="center">NUMERO</TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="center">RAZONSOCIAL</TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="center">FORMAPAGO</TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="center">ESTADO</TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="center">TOTAL</TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="center">EMISION</TableCell>
          </TableRow>
        </TableHead>
        {ListaData.length > 0 ?
          <TableBody>{ListaData.map((row) => <Row key={row.codDocVenta} elementoRow={row} AnularDocumento={AnularDocumento}
            EditarDocumento={EditarDocumento} VisualizarDocumento={VisualizarDocumento} />)}</TableBody>
          : <TableBody><RowEmpity /></TableBody>}
      </Table>
    </TableContainer>
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
          <Collapse timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* <Typography variant="h6" gutterBottom component="div">
                History
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ fontWeight: "bold" }}></TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>CODIGO</TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>DESCRIPCION</TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>CANTIDAD</TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>PRECIO</TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>IMPORTE</TableCell>
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



function Row({ elementoRow, AnularDocumento, EditarDocumento, VisualizarDocumento }) {
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
          <BotonesGrilla key={elementoRow.codDocVenta} row={elementoRow} AnularDocumento={AnularDocumento} EditarDocumento={EditarDocumento} VisualizarDocumento={VisualizarDocumento} />
        </TableCell>
        <TableCell align="center">{elementoRow.numeroDoc}</TableCell>
        <TableCell align="center">{elementoRow.razonSocial}</TableCell>
        <TableCell align="center">{elementoRow.formaPago}</TableCell>
        <TableCell align="center">{elementoRow.estado}</TableCell>
        <TableCell align="center">{elementoRow.total}</TableCell>
        <TableCell align="center">{elementoRow.emision}</TableCell>
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
                    <TableCell align="center" style={{ fontWeight: "bold" }}></TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>CODIGO</TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>DESCRIPCION</TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>CANTIDAD</TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>PRECIO</TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>IMPORTE</TableCell>

                  </TableRow>
                </TableHead>
                {elementoRow.docVentaDets ?
                  <TableBody>
                    {JSON.parse(elementoRow.docVentaDets)?.map((docVentaDet) => (
                      <TableRow key={docVentaDet.codDocVentaDet}>
                        <TableCell align="center" ></TableCell>
                        <TableCell align="center"  >{docVentaDet.codigoAlternativo}</TableCell>
                        <TableCell align="center" >{docVentaDet.descripcion}</TableCell>
                        <TableCell align="center" >{docVentaDet.cantidad}</TableCell>
                        <TableCell align="center" >{docVentaDet.precio}</TableCell>
                        <TableCell align="center" >{docVentaDet.importe}</TableCell>
                      </TableRow>
                    ))}

              
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      
                    </TableRow>
                    
                  </TableBody> : <TableBody></TableBody>}

              </Table>
              <br></br>
                      <div>AUDITORIA</div>
                      <div> REGISTRADO POR EL USUARIO : {elementoRow.usuario} EL {elementoRow.emision}
                        {elementoRow.editadoPor ? `    ACTUALIZADO POR: ${elementoRow.editadoPor} EL ${elementoRow.editadoEnFecha}` : null}
                        {elementoRow.anuladoPor ? `    ANULADO POR: ${elementoRow.anuladoPor} EL ${elementoRow.anuladoEnFecha}` : null}</div>
                   
      
            </Box>

            
          </Collapse>
        </TableCell>
      </TableRow>
    </>


  );
}

function BotonesGrilla({ row, AnularDocumento, EditarDocumento, VisualizarDocumento }) {

  return (
    <div className='d-flex'>
      <Link to="#" id="anular" onClick={() => AnularDocumento(row.codDocVenta)}>
        <Trash size={24} color='red' />
        <UncontrolledTooltip target="anular">Anular Registro</UncontrolledTooltip>
      </Link>
      <Link to="#" id="editar" onClick={() => EditarDocumento(row)}>
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
      <Link to="#" id="ver" onClick={() => VisualizarDocumento(row)}>
        <FileText size={24} color='orange' />
        <UncontrolledTooltip target="ver">Visualizar Documento</UncontrolledTooltip>
      </Link>
    </div>

  );
}