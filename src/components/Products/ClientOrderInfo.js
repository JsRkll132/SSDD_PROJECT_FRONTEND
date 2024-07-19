import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OrderDetailById, confirmOrder } from '../../api/api';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
const ClientOrderInfo = () => {
    const { id_orden } = useParams();
    const [orden, setOrden] = useState(null);
    const [metodoPago, setMetodoPago] = useState('');
    const navigate = useNavigate();
    const signOut = useSignOut()
    useEffect(() => {
        const fetchOrderDetails = async () => {
            const data = await OrderDetailById(parseInt(id_orden, 10));
            setOrden(data);
        };
        fetchOrderDetails();
    }, [id_orden]);

    const handleMetodoPagoChange = (e) => {
        setMetodoPago(e.target.value);
    };

    const handleConfirmOrder = async () => {
        if (!metodoPago) {
            alert("Por favor, seleccione un método de pago.");
            return;
        }
        const ordenIdInt = parseInt(id_orden, 10)
        const response = await confirmOrder({ orden_id: ordenIdInt, metodo_pago: metodoPago });
        if (response.error) {
            alert(response.error);
        } else {
            alert("Orden confirmada exitosamente.");
            navigate('/productos/compras'); // Navegar de vuelta a la lista de compras
        }
    };

    if (!orden) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active mx-5">
                            <a className="nav-link" href="" onClick={() => { navigate('/productos') }}>Informacion de la orden<span className="sr-only">(current)</span></a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" onClick={() => { navigate('/productos') }} data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </li>
                        <li className="nav-item active mx-3">
                            <a className="nav-link" href="" onClick={() => { navigate('/productos/compras') }}> <b> Compras</b><span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item active mx-3">
                            <a className="nav-link" href="" onClick={() => { navigate('/productos/addCar') }}> Mi carrito<span className="sr-only">(current)</span></a>
                        </li>
                    </ul>
                    <form className="form-inline my-2" style={{ marginLeft: "900px" }}>
                        <button className="btn btn-outline-danger" onClick={() => { signOut();navigate('/login'); }} type="submit">Salir</button>
                    </form>
                </div>
            </nav>
            <h2 style={{ padding: "30px", textAlign: "center" }}>Informacion de la orden :</h2>
            <div className="row justify-content-center mt-3" style={{ paddingBottom: "80px", textAlign: "left" }}>
                <div className="col-12 col-lg-5">
                    <div className="table-responsive">
                        <div className="card">
                            <h5 className="card-header">Detalles de la Orden #{id_orden}</h5>
                            <div className="card-body">
                                <h5 className="card-title">Cliente: {orden.cliente}</h5>
                                <p className="card-text">Estado: {orden.estado}</p>
                                <p className="card-text">Fecha de Creacion: {orden.fecha_creacion}</p>
                                <h5 className="card-title">Detalles:</h5>
                                <ul className="list-group" style={{ maxHeight: '280px', overflowY: 'scroll' }}>
                                    {orden.detalles?.map((detalle, index) => (
                                        <li key={index} className="list-group-item">
                                            <div>Producto: {detalle.nombre_producto}</div>
                                            <div>Cantidad: {detalle.cantidad}</div>
                                            <div>Precio unitario: {detalle.precio_compra}</div>
                                            <div>Precio total: {detalle.precio_compra * detalle.cantidad}</div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="text-center">
                                    <div className="d-flex justify-content-center align-items-center mt-3">
                                        <div className="dropdown me-3">
                                            <select 
                                                className="form-select" 
                                                aria-label="Default select example"
                                                value={metodoPago}
                                                onChange={handleMetodoPagoChange}
                                            >
                                                <option value="" selected disabled>Método de pago</option>
                                                <option value="score_crediticio">Score Crediticio</option>
                                                <option value="credito">Crédito</option>
                                            </select>
                                        </div>
                                        <button className="btn btn-success" onClick={handleConfirmOrder}>
                                            Confirmar orden de compra
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientOrderInfo;
