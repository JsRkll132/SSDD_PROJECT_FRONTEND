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

export const generateOrder = async (cliente_id, items) => {
    try {
        const response = await api.post('/generar_orden', { cliente_id, items });
        return response.data;
    } catch (error) {
        console.error('Error generating order:', error);
        return { error: 'Error generating order' };
    }
};

export const confirmOrder = async (orden_id) => {
    try {
        const response = await api.post('/confirmar_orden', { orden_id });
        return response.data;
    } catch (error) {
        console.error('Error confirming order:', error);
        return { error: 'Error confirming order' };
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
