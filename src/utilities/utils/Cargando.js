
import imgCargando from "./loading.gif"
export function CargandoGif({style, className}){

    return(
        
       <img alt="CARGANDO..."  className={className} style={style} src={imgCargando} />
      
    )
}