import React, { useState } from 'react';
import { initSession } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { show_alert } from './functions';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
const Login = () => {
    const [userLogin, setUserLogin] = useState({
        nombre_usuario: '',
        contrasena: '',
    });

    const navigate = useNavigate();
    const signIn = useSignIn()
    const signOut = useSignOut()
    const handleChange = (e) => {
        setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
    };

    const handleLoginUser = async () => {
        try {
            const response = await initSession(userLogin);
            if (response && response.status === 1) {
                const { rol, id, nombre_usuario, correo } = response.data_info;
                signIn({
                    auth: {
                        token: response.token,
                        type: 'Bearer'
                    },
                    userState: response.data_info
                })
                /*
                signIn({
                    token: response.token, // Assuming the API returns a token
                    expiresIn: 3600,
                    tokenType: 'Bearer',
                    authState: response.data_info
                });*/
                
                if (response.data_info.rol === 1) {
                    navigate('/productos');
                } else if (response.data_info.rol > 1) {
                    navigate('/admin');
                }
            } else {
                alert(response?.status);
            }
        } catch (error) {
            console.error(error);
            alert('Error de conexión con el servidor');
        }
    };

    return (
        <div className="align-items-center vh-100" style={{ alignItems: 'center' }}>
            <div className="col-sm-6 text-black">
                <div className="px-5 ms-xl-4">
                    <i className="fa-solid fa-store fa-3x me-3 pt-5 mt-xl-4" style={{ color: '#709085' }}></i>
                    <span className="h1 fw-bold mb-0">PERU COMPRAS</span>
                </div>
                <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                    <form style={{ width: '32rem' }}>
                        <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Iniciar Sesión</h3>
                        <div className="form-outline mb-4">
                            <input
                                type="text"
                                id="form2Example18"
                                className="form-control form-control-sm"
                                style={{ fontSize: '1.5rem' }}
                                name="nombre_usuario"
                                value={userLogin.nombre_usuario}
                                onChange={handleChange}
                            />
                            <label className="form-label" htmlFor="form2Example18" style={{ marginTop: "10px" }}>Nombre de Usuario</label>
                        </div>
                        <div className="form-outline mb-4">
                            <input
                                type="password"
                                id="form2Example28"
                                className="form-control form-control-sm"
                                style={{ fontSize: '1.5rem' }}
                                name="contrasena"
                                value={userLogin.contrasena}
                                onChange={handleChange}
                            />
                            <label id='passid' className="form-label" htmlFor="form2Example28" style={{ marginTop: "10px" }}>Contraseña</label>
                        </div>
                        <div className="pt-1 mb-4">
                            <button className="btn btn-dark btn-lg btn-block" type="button" onClick={handleLoginUser}>Iniciar Sesión</button>
                        </div>
                        <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Olvidé mi contraseña</a></p>
                        <p>No tienes una cuenta? <a href="#!" className="link-primary">Registrarse aquí</a></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
