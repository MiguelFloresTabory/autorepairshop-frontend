
import { useEffect } from "react";
import { getStorageObject } from "../utilities/storage/LogalStorage"
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import RedirectLogin from "./RedirectedLogin";

export const ProtectedRouter = ({ children, redirectTo}) => {

    const navigate = useNavigate();

        const objetoUsuario = getStorageObject();
    try{
        if(objetoUsuario){
            if (Object.keys(objetoUsuario).length > 0) {
                if(objetoUsuario.codUsuario > 0){
                    //correcto
                } else {
                  return  <RedirectLogin />
                 
                }
              }else{
                return  <RedirectLogin />
            
              }
        }else{
            return  <RedirectLogin />
          
        }
    }catch(e){
        console.log(e)
        return  <RedirectLogin />
    
    }
        

    return children;
}