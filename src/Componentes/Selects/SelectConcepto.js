import { Input, InputGroup} from 'reactstrap'
//SE TRAE TEMPORALMENTE EL ARREGLO DEL CONCEPTO
export  function SelectConcepto({codConcepto, setCodConcepto, disabled = false , arregloConcepto}){

    
     // Este es un select que es controlado por estado externo
    return (
        <>
        <InputGroup>
                <Input type='select' name='select' bsSize='sm'
                    id={"cbnTipoDoc"}
                    defaultValue={codConcepto}
                    disabled={disabled}
                    onChange={e => {
                        setCodConcepto(parseInt(e.currentTarget.value, 10))
                    }}
                    className="form-control">
                        <option  value="-1"></option>
                    {arregloConcepto?.map(
                        persona => <option key={persona.value+persona.dscDocumento} value={persona.value}>{persona.dscDocumento}</option>
                    )}
                </Input>
        </InputGroup>
        </>
    )
}

//select que devuelve un input controllado para el hook Form
export  function SelectConceptoForm({name,  disabled = false ,arregloConcepto}){

    
    //ACA IRA EL AXIOS, PARA TRAER CONCEPTO DE LA BD
   return (
       <>
      
             <Input type='select' bsSize='sm' name={name}  id={name} disabled={disabled}
                 className="form-control">
                 
                     <option  value="-1"></option>
                 {arregloConcepto?.map(
                     persona => <option key={persona.value+persona.dscDocumento} value={persona.value}>{persona.dscDocumento}</option>
                 )}
             </Input>
               
     </>
   )
}


