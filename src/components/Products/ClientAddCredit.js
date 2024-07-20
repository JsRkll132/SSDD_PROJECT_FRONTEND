import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OrderDetailById, confirmOrder } from '../../api/api';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
const ClientAddCredit = () => {
    const navigate = useNavigate()
    const signOut = useSignOut()
    return (
        <div className="App">


        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
        <li className="nav-item active mx-5">
            <a className="nav-link" href="" onClick={() => { navigate('/productos') }}>Productos Disponibles<span className="sr-only">(current)</span></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" onClick={() => { navigate('/productos') }} data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
            </li>
            <li className="nav-item active mx-3">
            <a className="nav-link" href="" onClick={() => { navigate('/productos/compras') }}>Compras<span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item active mx-3">
            <a className="nav-link" href="" onClick={() => { navigate('/productos/addCar') }}>Mi carrito<span className="sr-only">(current)</span></a>
            </li>
        
        </ul>
        <form className="form-inline my-2 " style={{marginLeft:"750px"}}>
            <button className="btn btn-outline-danger" onClick={() => { signOut();navigate('/login'); }} type="submit">Salir</button>
        </form>
        </div>
        </nav>



            <h2 style={{padding:"30px",textAlign:"center"}}>Añadir Credito</h2>
            <div className="row justify-content-center mt-3">
                <div className="col-12 col-lg-8" >
                    <div className="table-responsive" >
                        
                    </div>
          

                </div>
            </div>
        </div>
    );
};

export default ClientAddCredit;
