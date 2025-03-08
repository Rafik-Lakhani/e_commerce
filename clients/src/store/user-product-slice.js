import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products: [],
    isLoading: true,
    error: null,
    productDetails: null,
    relatedProducts: [],
};

export const fetchUserProducts = createAsyncThunk(
    'userProduct/fetchUserProducts', async () => {
        return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/shop/products`, {
            withCredentials: true,
        }).then((res) => res.data);
    });

export const fetchProductDetails = createAsyncThunk(
    'userProduct/fetchProductDetails', async (id) => {
        return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/shop/SingleProduct/${id}`, {
            withCredentials: true,
        }).then((res) => res.data);
    });




const userProductSlice = createSlice({
    name: 'userProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserProducts.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(fetchUserProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload.products;
        }).addCase(fetchUserProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(fetchProductDetails.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(fetchProductDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productDetails = action.payload.product;
            state.relatedProducts = action.payload.relatedProducts;
        }).addCase(fetchProductDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default userProductSlice.reducer;


