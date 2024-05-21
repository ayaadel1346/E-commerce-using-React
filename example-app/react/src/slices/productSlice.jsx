import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, fetchProductById, createProduct, updateProduct, deleteProduct } from '../api/productApi';

export const fetchAllProducts = createAsyncThunk('product/fetchAll', async () => {
  const response = await fetchProducts();
  return response;
});

export const fetchProduct = createAsyncThunk('product/fetchById', async (id) => {
  const response = await fetchProductById(id);
  return response;
});

export const addNewProduct = createAsyncThunk('product/addNew', async (product) => {
  const response = await createProduct(product);
  return response;
});

export const updateExistingProduct = createAsyncThunk('product/update', async ({ id, product }) => {
  const response = await updateProduct(id, product);
  return response;
});

export const removeProduct = createAsyncThunk('product/remove', async (id) => {
  await deleteProduct(id);
  return id;
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    product: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products.push(action.payload);
      })
      .addCase(updateExistingProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = state.products.filter((product) => product.id !== action.payload);
      })
      .addMatcher(
        (action) => action.type.startsWith('product/') && action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('product/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});

export default productSlice.reducer;
