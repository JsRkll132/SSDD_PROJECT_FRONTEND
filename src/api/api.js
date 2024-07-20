import axios from 'axios';



const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/api', // Asegúrate de que esta URL sea correcta
});

export const getRoles = async () => {
    try {
        const response = await api.get('/roles');
        return response.data;
    } catch (error) {
        console.error('Error fetching roles:', error);
        return [];
    }
};

export const getProducts = async () => {
    try {
        const response = await api.get('/listar_productos');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export const generateOrder = async (data_client) => {
    try {
        const response = await api.post('/generar_orden',data_client);
        return response.data;
    } catch (error) {
        console.error('Error generating order:', error);
        return { error: 'Error generating order' };
    }
};


export const verifyScore = async (cliente_id) => {
    try {
        const response = await api.post('/verificar_score', { cliente_id });
        return response.data;
    } catch (error) {
        console.error('Error verifying score:', error);
        return { error: 'Error verifying score' };
    }
};

export const getPendingInvoices = async () => {
    try {
        const response = await api.get('/facturas_pendientes');
        return response.data;
    } catch (error) {
        console.error('Error fetching pending invoices:', error);
        return [];
    }
};

export const confirmPayment = async (factura_id) => {
    try {
        const response = await api.post('/confirmar_pago', { factura_id });
        return response.data;
    } catch (error) {
        console.error('Error confirming payment:', error);
        return { error: 'Error confirming payment' };
    }
};

export const addProduct = async (productData) => {
    try {
        const response = await api.post('/agregar_producto', productData);
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        return { error: 'Error adding product' };
    }
};


export const initSession = async (login_data) => {
    try{
        const response = await api.post('/login',login_data)
        return response.data
    }catch(error){
        console.error('Error in login : ',error);
        return {error: 'Error in login init'};
    }
}
export const getCarsItems = async (usuario_id) => {
    try {
        const response = await api.get('/productos_en_carritos', { params: { usuario_id } });
        if (response.data.status === 1) {
            return response.data.data;
        } else {
            console.log('Error al obtener los productos en el carrito');
            return { error: 'Error al obtener los productos en el carrito' };
        }
    } catch (error) {
        console.error('Error fetching products in cart:', error);
        return [];
    }
};
export const AddToCar = async (new_data) => {
    try{
        if (new_data!==null){
            const response = await api.post('/addtoCar',new_data)
            return response.data
        }
        
    }catch(error){
        console.error('Error in login : ',error);
        return {error: 'Error in login init'};
    }
 }

 export const deleteCartItem = async (data) => {
    try {
        const response = await api.post('/eliminaritem', data);
        return response.data;
    } catch (error) {
        console.error('Error deleting cart item:', error);
        return { error: 'Error deleting cart item' };
    }
};

 export const AllOrders = async (usuario_id) => {
    try {
        const response = await api.get('/ordenes', { params: { usuario_id } });
        if (response.data.status === 1) {
            return response.data.ordenes;
        } else {
            console.log('Error al obtener las órdenes');
            return { error: 'Error al obtener las órdenes' };
        }
    } catch (error) {
        console.error('Error in fetching orders', error);
        return { error: 'Error in fetching orders' };
    }
};
 export const OrderDetailById = async (orden_id) => {
    try {
        const response = await api.get(`/ordenes/${orden_id}`);
        if (response.data.status === 1) {
            return response.data.orden;
        } else {
            console.log('Error al obtener la orden');
            return { error: 'Error al obtener la orden' };
        }
    } catch (error) {
        console.error('Error al obtener los detalles de la orden', error);
        return { error: 'Error al obtener los detalles de la orden' };
    }
};



export const confirmOrder = async (order_data) => {
    try {
        const response = await api.post('/confirmar_orden', order_data);
        console.log(response.data.status)
        return response.data;
    } catch (error) {
        console.log('Error confirming order:', error);
        console.error('Error confirming order:', error);
        return { error: error.response.data };
    }
};

export const updateProduct = async (producto_id, productData) => {
    try {
        const response = await api.put(`/productos/${producto_id}`, productData);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        return { error: 'Error updating product' };
    }
};


export const deleteProduct = async (producto_id) => {
    try {
        const response = await api.delete(`/productos/${producto_id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting product:', error);
        return { error: 'Error deleting product' };
    }
};