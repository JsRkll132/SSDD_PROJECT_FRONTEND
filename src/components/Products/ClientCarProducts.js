import React, { useEffect, useState } from 'react';
import { getProducts, getCarsItems,AddToCar, generateOrder,deleteCarItem  } from '../../api/api';
import { show_alert } from '../functions';
import { useNavigate } from 'react-router-dom';
const ClientCarProducts = () => {
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [items,UpdateItemInCar] = useState([])
    const [total, setTotal] = useState(0);
    const [clientid, setCurrClient] = useState(1);
    const navigate = useNavigate(); 
    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getCarsItems();
            setProductos(data);
            const initialQuantities = [];
            const initItems = [];
            data.forEach(producto => {
                initialQuantities.push( producto.cantidad_en_carrito);
                initItems.push({
                    carrito_id:producto.carrito_id,
                    producto_id:producto.id_producto,
                    cantidad:producto.cantidad_en_carrito
                })
            });
            UpdateItemInCar(initItems);
            setQuantities(initialQuantities);
        };
        fetchProducts();
    }, []);
    useEffect(() => {
        const totalCarrito = productos.reduce((acc, producto, index) => {
            return acc + (producto.precio * (quantities[index] || 0));
        }, 0);
        setTotal(totalCarrito);
    }, [productos, quantities]);

    const addToCart = (producto) => {
        const existente = carrito.find((item) => item.id === producto.id);
        if (existente) {
            setCarrito(
                carrito.map((item) =>
                    item.id === producto.id ? { ...existente, cantidad: existente.cantidad + 1 } : item
                )
            );
        } else {
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }
    };

    const removeFromCart = async (producto) => {
        const response = await deleteCarItem({
            item_id:producto.item_carrito_id,
        })
        if (response) {
            const data = await getCarsItems();
            setProductos(data);
        }
        
    };

    const handleQuantityChange = async (e, producto,index) => {
        const value = parseInt(e.target.value);
        
            quantities[index]=value;

            items[index] = {
                carrito_id:producto.carrito_id,
                producto_id:producto.id_producto,
                cantidad:value,}

            if (items[index].carrito_id!==null || items[index].carrito_id!==''){
                const response = await AddToCar(items[index])
                if (response && response.status ===1  ) {
                    console.log(response)
                }else{
                    console.log(response.status)
                }        
            }
            const updateData = await getCarsItems();
            setProductos(updateData);
          
    };

    const calcularPrecioTotal = (producto,index) => {
        const cantidad = quantities[index] || 0;
        return producto.precio * cantidad;
    };

    const generateOrderCli = async (client_id) =>{
        
        const resp = await generateOrder({
            usuario_id:client_id
        })
        console.log(resp)
        const data = await getCarsItems();
        setProductos(data);
    } 
    return (
        <div className="App">
            <nav className="navbar navbar-dark bg-primary"  style={{ color: '#d1e8e2' }}>
                <div className="container-fluid">
                <button type="button" class="btn btn-secondary" onClick={() => {navigate('/productos')} } style={{marginLeft:"40px"}}>Regresar</button>
               
                </div>
                </nav>
            <h2 style={{padding:"30px",textAlign:"center"}}>Carrito de compras</h2>
            <div className="row justify-content-center mt-3">
                <div className="col-12 col-lg-8" >
                    <div className="table-responsive" >
                        <table className="table table-bordered text-center" >
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Precio Total</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((producto, index) => (
                                    <tr key={producto.id}>
                                        <td>{index + 1}</td>
                                        <td>{producto.nombre_producto}</td>
                                        <td>{producto.precio}</td>
                                        <td>
                                            <div className="d-flex justify-content-center align-items-center" style={{ width: "4.5rem" }}>
                                                <input
                                                    min="0"
                                                    max={producto.stock}
                                                    type="number"
                                                    className="form-control text-center"
                                                    value={quantities[index] || 0}
                                                    onChange={(e) => handleQuantityChange(e, producto, index)}
                                                />
                                            </div>
                                        </td>
                                        <td>{calcularPrecioTotal(producto, index)}</td>
                                        <td >
                                            <button className="btn btn-outline-danger" onClick={() => removeFromCart(producto)}>
                                                <i className="fa-solid fa-rectangle-xmark"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="4">Total</td>
                                    <td colSpan="2" ><b>{total}</b> </td>
                                    
                                </tr>
                            </tfoot>
                        </table>
                        
                    </div>
                    <div className="text-center">
                    <button className="btn btn-primary mt-3" onClick={() => generateOrderCli(clientid)} style={{ }}>
                        Confirmar orden de compra
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
    
};

export default ClientCarProducts;
