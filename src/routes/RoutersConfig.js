import { DashBoard } from "../SISTEMA/DashBoard/DashBoard";
import CargoForm from "../SISTEMA/Maestros/Cargo/CargoForm";
import ClienteForm from "../SISTEMA/Maestros/Cliente/ClienteForm";
import ProductoForm from "../SISTEMA/Maestros/Producto/ProductoForm";
import ServicioForm from "../SISTEMA/Maestros/Servicio/ServicioForm";
import UsuarioForm from "../SISTEMA/Maestros/Usuario/UsuarioForm";
import ReporteEficaciaCobranza from "../SISTEMA/Reportes/Ventas/EficaciaCobranza";
import ReporteEficaciaVenta from "../SISTEMA/Reportes/Ventas/EficaciaVenta";
import { PDFVentasEficiencia } from "../SISTEMA/Reportes/Ventas/Pdfs/PDFVentasEficiencia";
import ReporteVentasClientes from "../SISTEMA/Reportes/Ventas/VentasClientes";
import CotizacionVehicularForm from "../SISTEMA/Taller/CotizacionVehicular/CotizacionVehicularForm";
import OrdenTrabajoForm from "../SISTEMA/Taller/OrdenTrabajo/OrdenTrabajoForm";
import VehiculoForm from "../SISTEMA/Taller/Vehiculo/VehiculoForm";
import CotizacionForm from "../SISTEMA/Ventas/Cotizacion/CotizacionForm";
import FacturaForm from "../SISTEMA/Ventas/Factura/FacturaForm";

import RedirectLogin from "./RedirectedLogin"



export const rutas = [
    //establecemos las rutas
    {path: "/cargo", component: CargoForm, exact: true},
    {path: "/cliente", component:  ClienteForm, exact: true},
    {path: "/usuario", component:  UsuarioForm, exact: true},
    {path: "/producto", component:  ProductoForm, exact: true},
    {path: "/reportes/ventas/eficaciaCobranza", component:  ReporteEficaciaCobranza,exact: true},
    {path: "/reportes/ventas/eficaciaVentas", component:  ReporteEficaciaVenta,exact: true},
    {path: "/reportes/ventas/ventasClientes", component:  ReporteVentasClientes,exact: true},
    {path: "/cotizacion", component:  CotizacionForm, exact: true},
    {path: "/factura", component:  FacturaForm, exact: true},
    {path: "/servicio", component:  ServicioForm, exact: true},
    {path: "/ordenTrabajo", component:  OrdenTrabajoForm, exact: true},
    {path: "/vehiculo", component:  VehiculoForm, exact: true},
    {path: "/cotizacionVehicular", component:  CotizacionVehicularForm, exact: true},
    {path: "/dashboard", component:  DashBoard, exact: true},
    //CotizacionVehicularForm
    
    
    {path: "/pruebas", component:  PDFVentasEficiencia, exact: true},
    {path: "/", component:  RedirectLogin, exact: true},
    {path: "*", component:  RedirectLogin, exact: true},
    
    

    

]



