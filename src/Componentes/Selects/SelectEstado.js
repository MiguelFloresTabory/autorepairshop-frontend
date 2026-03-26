import { Input, InputGroup} from 'reactstrap'

export default function SelectEstado({Estado = -1, SetEstado}){


    return (
        <>
        <InputGroup>
                <Input type='select' name='select' bsSize='sm'
                    id={"cbnEstado"}
                    value={Estado}
                    onChange={e => {
                        SetEstado(parseInt(e.currentTarget.value, 10))
                    }}
                    className="form-control">
                    <option value="1">ACTIVO</option>
                    <option value="0">INACTIVO</option>
                </Input>
        </InputGroup>
        </>
    )
}
