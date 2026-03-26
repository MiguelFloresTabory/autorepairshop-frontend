import {
  Routes,
  Route
} from "react-router-dom";
import { Menu } from "../src/Seguridad/Menu/Menu";
import { rutas } from './routes/RoutersConfig';
import {ProtectedRouter} from "./routes/ProtectedRouter"
import Login from './Seguridad/Login';
import { useState } from 'react';
import { Toaster } from "react-hot-toast";

function AppData() {
    const [mostrarMenu, setMostrarMenu ] = useState(true);

    return (
      <>
      {mostrarMenu ? <Menu /> : <></> }

      <br></br>
      <br></br>

      <div className='container-main'> 
        <Routes> 
        <Route index exact={true}   path='/login' key='/login' element={<Login  setMostrarMenu={setMostrarMenu} />} />
        {rutas.map(ruta =>
              <Route key={ruta.path} path={ruta.path} exact={ruta.exact}  element={
                <ProtectedRouter  redirectTo={ruta.path}>
                    <ruta.component/>
                 </ProtectedRouter>
              } />
        )}
        </Routes>
        </div>

         <Toaster/>

      </>
      
    
    );
  }
  
  export default AppData;