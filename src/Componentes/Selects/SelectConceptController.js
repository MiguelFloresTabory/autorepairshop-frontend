import { Controller } from 'react-hook-form'
import { FormFeedback, Input } from 'reactstrap'
//error = error.nombre
//nombre = nombre del elemento del formulario
export default function SelectConceptController({name, control, error ,disabled = false ,arregloConcepto, valorDefecto}){

    
     //select que es controlado por 
    return (
        <>
          <Controller
                      name={name}
                      disabled={disabled}
                      defaultValue={valorDefecto ? valorDefecto : "-1"}
                      control={control}
                      render={({ field }) =>
                      
                <Input {...field} type='select' name={name} bsSize='sm' id={name} disabled={disabled}
                    className="form-control">
                    
                    <option  value="-1"></option>
                    {arregloConcepto?.map(
                        persona => <option key={persona.value+persona.dscDocumento} value={persona.value}>{persona.dscDocumento}</option>
                    )}
                </Input>}
                    />
                    {error && <FormFeedback>{error.message}</FormFeedback>}
        </>
    )
}
