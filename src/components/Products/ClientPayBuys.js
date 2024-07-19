import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AllOrders } from '../../api/api';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
const ClientPayBuys = () => {
    const [ordenes, setOrdenes] = useState([]);
    const navigate = useNavigate();
    const signOut = useSignOut()
    const auth = useAuthUser()
    useEffect(() => {
        const fetchOrders = async () => {
            const data = await AllOrders(auth.id);
            setOrdenes(data);
        };
        fetchOrders();
    }, []);

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
                            <a className="nav-link" href="" onClick={() => { navigate('/productos/compras') }}><b>Compras</b><span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item active mx-3">
                            <a className="nav-link" href="" onClick={() => { navigate('/productos/addCar') }}>Mi carrito<span className="sr-only">(current)</span></a>
                        </li>
                    </ul>
                    <form className="form-inline my-2" style={{ marginLeft: "900px" }}>
                        <button className="btn btn-outline-danger" onClick={() => { signOut();navigate('/login'); }} type="submit">Salir</button>
                    </form>
                </div>
            </nav>
            <h2 style={{ padding: "30px", textAlign: "center" }}>Mis ordenes</h2>
            <div className="row justify-content-center mt-3">
                <div className="col-12 col-lg-8">
                    <div className="table-responsive">
                        <table className="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">id</th>
                                    <th scope="col">Usuario</th>
                                    <th scope="col">Monto</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Detalles</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {ordenes.map((orden, index) => (
                                    <tr key={orden.id}>
                                        <td>{index + 1}</td>
                                        <td>{orden.id}</td>
                                        <td>{orden.nombre_usuario}</td>
                                        <td>{orden.monto_total}</td>
                                        <td>{orden.fecha_creacion}</td>
                                        <td>
                                            <button
                                                className={"btn btn-warning"}
                                                onClick={() => { navigate(`/productos/compras/info/${orden.id}`) }}
                                            >
                                                <i className="fa-solid fa-circle-info"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientPayBuys;
