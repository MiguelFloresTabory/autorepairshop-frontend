
import React, { useEffect, useState } from 'react';
import { BsFillPersonFill, BsLockFill, BsFillFilePersonFill } from 'react-icons/bs';
import { postLogin } from '../Services/serviciosLogin';
import { setStorageObject } from "../utilities/storage/LogalStorage"
import { useNavigate } from 'react-router-dom';
import { cargarDatosApisunat } from '../Services/serviciosRucSunat';
import "../../src/css/Login.css"
import { notificacion } from '../utilities/utils/utils';

function Login ({ setMostrarMenu }){
  const [form, setForm] = useState({correo:'', clave:''});
  const [response, setResponse] = useState({});
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    ValidarLogin();
  }

  function ValidarLogin() {
    let cadena = ""
    try {

    if(form.correo === ""){
      cadena += "Ingrese el correo\n"
    }
    if(form.clave === ""){
      cadena += "Ingrese la clave\n"
    }
    if(cadena === ""){
      const reques = postLogin(form);
      reques.then((Respuesta) => {
        setResponse(Respuesta.data);
      });
    }else{
      notificacion(cadena, "error")
    }
     
    } catch (e) {
      console.log("Error: " + e)
    }

  }

  useEffect(() => {

    if (Object.keys(response).length > 0) {
      if (response.codUsuario > 0) {
        setStorageObject(response);
        cargarDatosApisunat(response.codEmpresa);
        navigate("/cliente");
        setMostrarMenu(true);

      } else {
        notificacion("CORREO/CONTRASEÑA INVALIDO", "warning");
      }
    }

  }, [response, navigate, setMostrarMenu]);

  useEffect(() => {
    setMostrarMenu(false);
  }, [setMostrarMenu]);

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-self-center h-100">
        <div className="card col-3">

          <div className="card-header">
            <h3>Login</h3>
          </div>
        

          <div className="card-body">
          <div className='row justify-content-md-center mb-2 mt-2"' >
          <BsFillFilePersonFill  size={60}/> 
          </div>

            <form onSubmit={handleSubmit} className='container-form'>
              <div className='row'>
                <div className='col-1'>
                  <BsFillPersonFill  size={20}/>
                </div>
                <div className='col-10'>
                  <input className="form-control col-4" type="email" onChange={handleChange} defaultValue={form.correo} name="correo" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
              </div>
              <div className='row'>
                <div className='col-1'>
                  <BsLockFill  size={20}/>
                </div>
                <div className='col-10'>
                  <input type='password' onChange={handleChange} defaultValue={form.clave} placeholder='Password' className="form-control" name="clave" />
                </div>
              </div>
              <div className="d-flex justify-content-end mt-1">
                <button className="btn btn-primary" type='submit' >Login</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;






/*

<div class="container">
  <div class="d-flex justify-content-center h-100">
    <div class="card">
      <div class="card-header">
        <h3>Sign In</h3>
        <div class="d-flex justify-content-end social_icon">
          <span><i class="fab fa-facebook-square"></i></span>
          <span><i class="fab fa-google-plus-square"></i></span>
          <span><i class="fab fa-twitter-square"></i></span>
        </div>
      </div>
      <div class="card-body">
        <form>
          <div class="input-group form-group">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fas fa-user"></i></span>
            </div>
            <input type="text" class="form-control" placeholder="username">
          	
          </div>
          <div class="input-group form-group">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fas fa-key"></i></span>
            </div>
            <input type="password" class="form-control" placeholder="password">
          </div>
          <div class="row align-items-center remember">
            <input type="checkbox">Remember Me
          </div>
          <div class="form-group">
            <input type="submit" value="Login" class="btn float-right login_btn">
          </div>
        </form>
      </div>
      <div class="card-footer">
        <div class="d-flex justify-content-center links">
          Don't have an account?<a href="#">Sign Up</a>
        </div>
        <div class="d-flex justify-content-center">
          <a href="#">Forgot your password?</a>
        </div>
      </div>
    </div>
  </div>
</div>*/