import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    isLoading: false,
    error: null,
};

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ userId, productId, quantity }) => {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/shop/cart/add`,
            {
                userId,
                productId,
                quantity,
            },{
                withCredentials: true,
            }
        );
        console.log(response);
        return response.data;
    }
);

export const fetchCartItems = createAsyncThunk(
    "cart/fetchCartItems",
    async (userId) => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/shop/cart/get/${userId}`,
            {
                withCredentials: true,
            }
        );

        return response.data;
    }
);

export const deleteCartItem = createAsyncThunk(
    "cart/deleteCartItem",
    async ({ userId, productId }) => {
        const response = await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/api/shop/cart/delete/${userId}/${productId}`,
            {
                withCredentials: true,
            }
        );

        return response.data;
    }
);

export const updateCartQuantity = createAsyncThunk(
    "cart/updateCartQuantity",
    async ({ userId, productId, quantity }) => {
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/shop/cart/update-cart`,
            {
                userId,
                productId,
                quantity,
            },{
                withCredentials: true,
            }
        );

        return response.data;
    }
);

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {
        getLocalStorageItem: function (state,action){
            state.cartItems = JSON.parse(localStorage.getItem('addTOCartProduct'));
            console.log(state.cartItems);
        },
        updateLocalStorageItem: function (state,action){
            state.cartItems=action.payload.cartItems;
            localStorage.setItem('addTOCartProduct', JSON.stringify(action.payload.cartItems));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                // state.cartItems = action.payload.product;
            })
            .addCase(addToCart.rejected, (state,action) => {
                state.isLoading = false;
                state.cartItems = [];
                console.log(error);
                // state.error = action.payload.error.message;
                console.error(action.payload);
                console.error(state.error);
            });



        builder.addCase(fetchCartItems.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload.product.map(product => product.products));
                // state.cartItems = action.payload.product.map(product =>product.products);
                state.cartItems = action.payload.product.map(product => product.products)[0];
            })
            .addCase(fetchCartItems.rejected, (state,action) => {
                state.isLoading = false;
                state.cartItems = [];
                state.error = action.payload;
                console.error(state.error);
            });


        builder.addCase(updateCartQuantity.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.isLoading = false;
                // state.cartItems = action.payload.data;
                // console.log(action.payload)
                // state.cartItems = action.payload.product.products.map(product =>product.products);
            })
            .addCase(updateCartQuantity.rejected, (state,action) => {
                state.isLoading = false;
                state.cartItems = [];
                state.error = action.payload.error.message;
                console.error(state.error);
            });

        builder.addCase(deleteCartItem.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.isLoading = false;
                // state.cartItems = state.cartItems.map((cartItem) => { if (cartItem.productId !== action.payload.product.productId) { return cartItem; } });
            })
            .addCase(deleteCartItem.rejected, (state,action) => {
                state.isLoading = false;
                state.cartItems = [];
                state.error = action.payload.error.message;
                console.error(state.error);
            });
    },
});

export const { getLocalStorageItem,updateLocalStorageItem } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;