import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { data } from "react-router-dom";

const initialState = {
    isLoading: false,
    productList: [],
}


export const addNewProduct = createAsyncThunk("/products/addnewproduct", async (formData) => {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products/add`, formData, {
        withCredentials: true,
    });
    if (response.status == 200 || response.status == 201) {
        console.log(response);
        return response.data.product;
    } else {
        return response.data.message;
    }
});

export const editProduct = createAsyncThunk("/products/editproduct", async ({ id, formData }) => {
    console.log(formData,"in slice");
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products/edit/${id}`, formData, {
        withCredentials: true,
    });
    if (response.status == 200 || response.status == 201) {
        return response.data.product;
    } else {
        return response.data.message;
    }
});

export const fetchAllProducts = createAsyncThunk("/products/fetchallproducts", async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products/getAllProducts`, {
        withCredentials: true,
    });
    if (response.status == 200 || response.status == 201) {
        return response.data.products;
    } else {
        return response.data.message;
    }
});

export const deleteProduct = createAsyncThunk("/products/deleteproduct", async (id) => {
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products/delete/${id}`, {
        withCredentials: true,
    });
    if (response.status == 200 || response.status == 201) {
        return response.data.product;
    } else {
        return response.data.message;
    }
});




export const AdminProdcutSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // here add products case
        builder.addCase(addNewProduct.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(addNewProduct.fulfilled, (state, action) => {
            if (typeof action.payload == "object") {
                state.isLoading = false;
                state.productList.push(action.payload);
            } else {
                state.isLoading = false;
                console.log(action.payload);
            }
        }).addCase(addNewProduct.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action);
        });

        // here fetchallproduct case
        builder.addCase(fetchAllProducts.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(fetchAllProducts.fulfilled, (state, action) => {
            if (Array.isArray(action.payload)) {
                state.isLoading = false;
                state.productList = action.payload;
            } else {
                state.isLoading = false;
                console.log(action.payload);
            }
        }).addCase(fetchAllProducts.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action);
        });

        // here delete product case
        builder.addCase(deleteProduct.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(deleteProduct.fulfilled, (state, action) => {
            if (typeof action.payload == "object") {
                state.isLoading = false;
                state.productList = state.productList.filter((product) => product._id !== action.payload._id);
            } else {
                state.isLoading = false;
                console.log(action.payload);
            }
        }).addCase(deleteProduct.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action);
        });

        // here edit product case
        builder.addCase(editProduct.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(editProduct.fulfilled, (state, action) => {
            if (typeof action.payload == "object") {
                state.isLoading = false;
                const index = state.productList.findIndex((product) => product._id === action.payload._id);
                if (index > -1) {
                    state.productList[index] = action.payload;
                }
            } else {
                state.isLoading = false;
                console.log(action.payload);
            }
        }).addCase(editProduct.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action);
        });
    }
});


export default AdminProdcutSlice.reducer;