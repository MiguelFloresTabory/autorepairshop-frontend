
export interface respuestaDTO {
    codigo_Respuesta_Operacion_Aplicacion: number,
    status_Operacion_Aplicacion: string,
    mensaje_Operacion_Aplicacion: string,
    identificador_Operacion_Aplicacion: number,
    erroValidacion: string

}

export interface respuestaLoginDTO {
       codUsuario: number;
       correo: string;
       codEmpresa: number;
       codSucursal: number;
       codDireccion: number;
}



