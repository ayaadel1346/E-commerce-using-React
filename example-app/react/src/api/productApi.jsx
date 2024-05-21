import axios from '../axios';

export const fetchProducts = async () => {
    try {
        const response = await axios.get('/products');
        return response.data;
    } catch (error) {
        console.error("An error occurred while retrieving data", error);
        throw error;
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await axios.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while retrieving data", error);
        throw error;
    }
};

export const createProduct = (product) => async (dispatch) => {
    try {
        const response = await axios.post('/products', product);
        dispatch({ type: 'PRODUCT_CREATED', payload: response.data });
        return response.data; 
    } catch (error) {
        console.error("An error occurred while creating the product", error);
        throw error;
    }
};

export const updateProduct = (id, product) => async (dispatch) => {
    try {
        const response = await axios.put(`/products/${id}`, product);
        dispatch({ type: 'PRODUCT_UPDATED', payload: response.data });
        return response.data; 
    } catch (error) {
        console.error("An error occurred while updating the product", error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        await axios.delete(`/products/${id}`);
        return { type: 'PRODUCT_DELETED', payload: id }; 
    } catch (error) {
        console.error("An error occurred while deleting the product", error);
        throw error;
    }
};
