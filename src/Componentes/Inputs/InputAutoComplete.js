import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import { getListarClienteServicioAutoComplete } from "../../Services/serviciosCliente";
import { getListarVehiculoServicioAutoComplete } from "../../Services/servicioVehiculos";


export function InputAutocompleteCliente ({setClientSelect, clienteSelect, width, classname, descripcion, setDescripcion, codTipoCliente = "1" }){

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const loading = open && options.length === 0;


  useEffect(() => {
    (async () => {
        if(descripcion){
            if (descripcion !== ""  && descripcion.length < 15) {
                console.log(descripcion)
                const busqueda = await getListarClienteServicioAutoComplete({Descripcion: descripcion, CodTipoCuentaCorriente: codTipoCliente});
                setOptions(busqueda)
              }else{
                setOptions([])
              }
        }
})();

  }, [descripcion]);


  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  
  

return(
<Autocomplete
  id="AutoCompletaleInput"
  className = {classname}
  freeSolo = {true}
  disablePortal
  getOptionLabel={(option) => option.descripcion}
  options={options}
  size="small"
  loading={loading}
  open={open}
  onOpen={() => {
    setOpen(true);
  }}
  onClose={() => {
    setOpen(false);
  }}
  inputValue={descripcion}
  onInputChange={(event, newValue) => {
    setDescripcion(newValue);
  }}

  onChange={(event, newValue) => {
   
    setClientSelect(newValue);
    if(newValue){
      setDescripcion(newValue.descripcion);
    }
  }}

  isOptionEqualToValue={(option, value) => option.descripcion === value.descripcion}
  // sx={{ width }}

  renderInput={(params) => (
    <TextField 
      {...params}
      label="Clientes"
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <Fragment>
            {loading ? <CircularProgress color="inherit" size={20} /> : null}
            {params.InputProps.endAdornment}
          </Fragment>
        ),
      }}
    />

  )}
  
/>

)

}







export function InputAutocompleteVehiculo({setVehiculoSelect, vehiculoSelect, width, classname, descripcion, setDescripcion, disabled = false }){

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const loading = open && options.length === 0;


  useEffect(() => {
    (async () => {
        if(descripcion){
            if (descripcion !== ""  && descripcion.length < 15) {
                console.log(descripcion)
                const busqueda = await getListarVehiculoServicioAutoComplete({Descripcion: descripcion});
                setOptions(busqueda)
              }else{
                setOptions([])
              }
        }
})();

  }, [descripcion]);


  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  
  

return(
<Autocomplete
  id="AutoCompletaleInput"
  className = {classname}
  disabled={disabled}
  freeSolo = {true}
  disablePortal
  getOptionLabel={(option) => option.descripcion}
  options={options}
  size="small"
  loading={loading}
  open={open}
  onOpen={() => {
    setOpen(true);
  }}
  onClose={() => {
    setOpen(false);
  }}
  inputValue={descripcion}
  onInputChange={(event, newValue) => {
    setDescripcion(newValue);
  }}

  onChange={(event, newValue) => {
   
    setVehiculoSelect(newValue);
    if(newValue){
      setDescripcion(newValue.descripcion);
    }
  }}

  isOptionEqualToValue={(option, value) => option.descripcion === value.descripcion}
  // sx={{ width }}

  renderInput={(params) => (
    <TextField 
      {...params}
      label="VEHICULO"
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <Fragment>
            {loading ? <CircularProgress color="inherit" size={20} /> : null}
            {params.InputProps.endAdornment}
          </Fragment>
        ),
      }}
    />

  )}
  
/>

)

}