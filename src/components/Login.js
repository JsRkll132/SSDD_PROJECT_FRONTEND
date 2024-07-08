import {React,useState,useEffect } from 'react';
import { initSession } from '../api/api';
import { Navigate, useNavigate } from 'react-router-dom';
import { show_alert } from './functions';
//import './Login.css'; // Asegúrate de importar tus estilos CSS


const Login = () => {
    const [userLogin, sendData] = useState({
        username: '',
        password:'',
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        sendData({ ...userLogin, [e.target.name]: e.target.value });
    };
    
    const handleLoginUser = async () => {
        const response = await initSession(userLogin);
        if (response && response.status ===1) {
            console.log(response)
            navigate('/productos')
        }else{
            console.log(response.status)
            show_alert(response.error,"passid")
        }
    };

    return (
        <div className="align-items-center vh-100" style={{alignItems:'center'}}>
            <div className="col-sm-6 text-black">
                <div className="px-5 ms-xl-4">
                    <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style={{ color: '#709085' }}></i>
                    <span className="h1 fw-bold mb-0">PERU COMPRAS</span>
                </div>
                <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                    <form style={{ width: '32rem' }}>
                        <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Iniciar Sesion</h3>
                        <div className="form-outline mb-4">
                        <input 
                        type="email" 
                        id="form2Example18" 
                        className="form-control form-control-sm" 
                        style={{ fontSize: '1.5rem' }} 
                        name="username" 
                        value={userLogin.username} 
                        onChange={handleChange} 
                    />
                            <label className="form-label" htmlFor="form2Example18" style={{marginTop:"10px"}}>Correo</label>
                        </div>
                        <div className="form-outline mb-4">
                    
                         <input 
                            type="password" 
                            id="form2Example28" 
                            className="form-control form-control-sm" 
                            style={{ fontSize: '1.5rem' }} 
                            name="password" 
                            value={userLogin.password} 
                            onChange={handleChange} 

                        />
                        <label id='passid' className="form-label" htmlFor="form2Example28"  style={{marginTop:"10px"}}>Contraseña</label>
                        </div>
                        <div className="pt-1 mb-4">
                            <button className="btn btn-dark btn-lg btn-block" type="button" onClick={handleLoginUser}>Iniciar Sesion</button>
                        </div>
                        <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Olvide mi contraseña</a></p>
                        <p>No tienes una cuenta?      <a href="#!" className="link-primary">Registrarse aqui</a></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
