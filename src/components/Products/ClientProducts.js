import React, { useEffect, useState } from 'react';
import { getProducts, addProduct } from '../../api/api';
import { show_alert } from '../functions';

const ClientProducts = () => {
    const [productos, setProductos] = useState([]);
    const [newProduct, setNewProduct] = useState({
        nombre: '',
        precio: '',
        sku: '',
        stock: '',
        url_imagen: ''
    });
    const [title, setTitle] = useState('');
    const [productosComprados, setProductosComprados] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            setProductos(data);
        };
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleAddProduct = async () => {
        const response = await addProduct(newProduct);
        const data = await getProducts();
        if (response) {
            setProductos(data);
            setNewProduct({ nombre: '', precio: '', sku: '', stock: '', url_imagen: '' });
        }
    };

    const openModal = (op, nombre, precio, sku, stock, url_imagen) => {
        if (op === 1) {
            setTitle("Añadir Productos");
            setNewProduct({ nombre: '', precio: '', sku: '', stock: '', url_imagen: '' });
        } else if (op === 2) {
            setTitle("Editar Productos");
            setNewProduct({ nombre: nombre, precio: precio, sku: sku, stock: stock, url_imagen: url_imagen })
        } else if (op === 3) {
            setTitle("Eliminar Producto");
        }

    };

    const comprarProducto = (productoId) => {
        // Verifica si el producto ya ha sido comprado
        if (!productosComprados.includes(productoId)) {
            // Agrega el producto a la lista de comprados
            setProductosComprados([...productosComprados, productoId]);
            show_alert('Producto comprado correctamente.', 'success');
        } else {
            show_alert('Este producto ya ha sido comprado.', 'danger');
        }
    };

    return (
        <div className="App">
            <h2>Productos</h2>
            <div className='row justify-content-center mt-3'>
                <div className='col-12 col-lg-8'>
                    <div className='table-responsive'>
                        <table className="table table-bordered text-center">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">SKU</th>
                                    <th scope="col">Stock</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((producto, index) => (
                                    <tr key={producto.id}>
                                        <td>{index + 1}</td>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.precio}</td>
                                        <td>{producto.sku}</td>
                                        <td>{producto.stock}</td>
                                        <td>
                                            <button
                                                className={`btn btn-success ${productosComprados.includes(producto.id) ? 'disabled' : ''}`}
                                                onClick={() => comprarProducto(producto.id)}
                                                disabled={productosComprados.includes(producto.id)}
                                            >
                                                <i className='fas fa-shopping-cart'></i> Comprar
                                            </button>
                                   
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="modalProducts" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre</label>
                                <input type="text" className="form-control" id="nombre" name="nombre" value={newProduct.nombre} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="precio" className="form-label">Precio</label>
                                <input type="number" className="form-control" id="precio" name="precio" value={newProduct.precio} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="sku" className="form-label">SKU</label>
                                <input type="text" className="form-control" id="sku" name="sku" value={newProduct.sku} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="stock" className="form-label">Stock</label>
                                <input type="number" className="form-control" id="stock" name="stock" value={newProduct.stock} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="url_imagen" className="form-label">URL Imagen</label>
                                <input type="text" className="form-control" id="url_imagen" name="url_imagen" value={newProduct.url_imagen} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={handleAddProduct}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientProducts;