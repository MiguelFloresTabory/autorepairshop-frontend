import { Input, InputGroup} from 'reactstrap'


export default function SelectTipoCuenta({Estado, SetEstado, Disabled = false}){

     const arregloPersona = [
        { dscDocumento: "PERSONA NATURAL", value: "1"},
        { dscDocumento: "PERSONA JURIDICA", value: "2"},
        { dscDocumento: "Sin documento", value: "3"}
     ]   

    return (
        <>
        <InputGroup>
                <Input type='select' name='select' bsSize='sm'
                    id={"cbnTipoDoc"}
                    disabled = {Disabled}
                    value={Estado}
                    onChange={e => {
                        SetEstado(parseInt(e.currentTarget.value, 10))
                    }}
                    className="form-control">
                    {arregloPersona?.map(
                        persona => <option key={persona.value+persona.dscDocumento} value={persona.value}>{persona.dscDocumento}</option>
                    )}
                </Input>
        </InputGroup>
        </>
    )
}
