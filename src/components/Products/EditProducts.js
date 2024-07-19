import React, { useEffect, useState } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../api/api';
import { show_alert } from '../functions';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
const EditProducts = () => {
    const [productos, setProductos] = useState([]);
    const [currentProductId, setCurrentProductId] = useState(null); // Para almacenar el ID del producto actual al editar/eliminar
    const [newProduct, setNewProduct] = useState({
        nombre: '',
        precio: '',
        sku: '',
        stock: '',
        url_imagen: ''
    });
    const [title, setTitle] = useState('');

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
    const signOut = useSignOut()
    const handleSaveProduct = async () => {
        if (currentProductId === null) {
            // Añadir nuevo producto
            if (!(newProduct.precio < 0 || newProduct.stock < 0)) {
                const response = await addProduct(newProduct);
                if (response) {
                    alert('Producto añadido exitosamente');
                }
            } else {
                alert("Datos invalidos");
            }
        } else {
            // Actualizar producto existente
            if (!(newProduct.precio < 0 || newProduct.stock < 0)) {
                const response = await updateProduct(currentProductId, newProduct);
                if (response) {
                    alert('Producto actualizado exitosamente');
                    // show_alert('Producto actualizado exitosamente', 'success');
                }
            } else {
                alert("Datos invalidos");
            }
        }
        const data = await getProducts();
        setProductos(data);
        setNewProduct({ nombre: '', precio: '', sku: '', stock: '', url_imagen: '' });
        setCurrentProductId(null);
    };

    const handleDeleteProduct = async (id) => {
        const response = await deleteProduct(id);
        if (response.status===1) {
            alert('Producto eliminado exitosamente');
            // show_alert('Producto eliminado exitosamente', 'success');
        }else{
            alert('El producto se encuentra dentro de una orden')
        }
        const data = await getProducts();
        setProductos(data);
    };

    const openModal = (op, id = null, nombre = '', precio = '', sku = '', stock = '', url_imagen = '') => {
        if (op === 1) {
            setTitle("Añadir Productos");
            setNewProduct({ nombre: '', precio: '', sku: '', stock: '', url_imagen: '' });
            setCurrentProductId(null);
        } else if (op === 2) {
            setTitle("Editar Productos");
            setNewProduct({ nombre, precio, sku, stock, url_imagen });
            setCurrentProductId(id);
        } else if (op === 3) {
            setTitle("Eliminar Producto");
            setNewProduct({ nombre, precio, sku, stock, url_imagen });
            setCurrentProductId(id);
        }
    };

    return (
        <div className="App">
        <h2 style={{ padding: "30px", textAlign: "center" }}>Control de Stock</h2>
            <div className='row justify-content-center mt-3'>
                <div className='col-12 col-lg-8'>
                    <div className='table-responsive'>
                        <table className="table text-center">
                            <thead>
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
                                        <th scope="row">{index + 1}</th>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.precio}</td>
                                        <td>{producto.sku}</td>
                                        <td>{producto.stock}</td>
                                        <td>
                                            <button
                                                className='btn btn-warning'
                                                onClick={() => openModal(2, producto.id, producto.nombre, producto.precio, producto.sku, producto.stock, producto.url_imagen)}
                                                data-bs-toggle='modal'
                                                data-bs-target='#modalProducts'
                                            >
                                                <i className='fa-solid fa-edit'></i>
                                            </button>
                                            &nbsp;
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => handleDeleteProduct(producto.id)}
                                            >
                                                <i className='fa-solid fa-trash'></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className='col-md-4 offset-md-4'>
                    <div className='d-grid mx-auto'>
                        <button
                            onClick={() => openModal(1)}
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle='modal'
                            data-bs-target='#modalProducts'
                        >
                            <i className='fa-solid fa-circle-plus'></i> Añadir
                        </button>
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
                                <input type="text" className="form-control" id="nombre" name="nombre" value={newProduct.nombre} onChange={handleChange} disabled={title === "Eliminar Producto"} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="precio" className="form-label">Precio</label>
                                <input type="number" className="form-control" id="precio" name="precio" value={newProduct.precio} onChange={handleChange} disabled={title === "Eliminar Producto"} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="sku" className="form-label">SKU</label>
                                <input type="text" className="form-control" id="sku" name="sku" value={newProduct.sku} onChange={handleChange} disabled={title === "Eliminar Producto"} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="stock" className="form-label">Stock</label>
                                <input type="number" className="form-control" id="stock" name="stock" value={newProduct.stock} onChange={handleChange} disabled={title === "Eliminar Producto"} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="url_imagen" className="form-label">URL Imagen</label>
                                <input type="text" className="form-control" id="url_imagen" name="url_imagen" value={newProduct.url_imagen} onChange={handleChange} disabled={title === "Eliminar Producto"} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            {title === "Eliminar Producto" ? (
                                <button type="button" className="btn btn-danger" onClick={() => handleDeleteProduct(currentProductId)}>Eliminar</button>
                            ) : (
                                <button type="button" className="btn btn-primary" onClick={handleSaveProduct}>Guardar</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProducts;