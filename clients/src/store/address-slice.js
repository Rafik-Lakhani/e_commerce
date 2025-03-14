import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    address: [],
    isLoading: false,
    error: null
}

export const fetchAddresses = createAsyncThunk('/account/getaddress', async (userId) => {
    const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/shop/account/getaddress/${userId}`,
        {
            withCredentials: true,
        }
    );
    return response.data;
});


export const userAddAddress = createAsyncThunk('/account/addaddress', async (addressdata) => {
    const response =await  axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/shop/account/adduseraddress`,
        addressdata,
        {
            withCredentials: true,
        }
    );
    return response.data;
});

export const userEditAddress = createAsyncThunk('/account/editaddress', async (addressdata) => {
    const response =await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/shop/account/update-address`,
        addressdata,
        {
            withCredentials: true,
        }
    );
    return response.data;
});

export const addressDelete = createAsyncThunk('/account/deleteaddress', async ({ userId, addressId }) => {
    const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/shop/account/delete-address/${userId}/${addressId}`,
        {
            withCredentials: true,
        }
    );
    return response.data;
});


export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAddresses.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(fetchAddresses.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log(action);
            state.address = action.payload.address;
        }).addCase(fetchAddresses.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });


        builder.addCase(userAddAddress.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(userAddAddress.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(userAddAddress.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        builder.addCase(userEditAddress.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(userEditAddress.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(userEditAddress.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        builder.addCase(addressDelete.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(addressDelete.fulfilled, (state, action) => {
            state.isLoading = false;
        }).addCase(addressDelete.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default addressSlice.reducer;