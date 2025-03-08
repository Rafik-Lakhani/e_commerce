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
            }
        );

        return response.data;
    }
);

export const fetchCartItems = createAsyncThunk(
    "cart/fetchCartItems",
    async (userId) => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/shop/cart/get/${userId}`
        );

        return response.data;
    }
);

export const deleteCartItem = createAsyncThunk(
    "cart/deleteCartItem",
    async ({ userId, productId }) => {
        const response = await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/api/shop/cart/delete/${userId}/${productId}`
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
            }
        );

        return response.data;
    }
);

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = state.cartItems.push(action.payload.product);
            })
            .addCase(addToCart.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
                state.error = action.error.message;
                console.error(state.error);
            });



        builder.addCase(fetchCartItems.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.product;
            })
            .addCase(fetchCartItems.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
                state.error = action.error.message;
                console.error(state.error);
            });


        builder.addCase(updateCartQuantity.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
                state.cartItems = state.cartItems.map((cartItem) => {
                    if (cartItem.productId == action.payload.product.productId) {
                        cartItem.quantity = action.payload.product.quantity;
                        return cartItem;
                    } else return cartItem;
                })
            })
            .addCase(updateCartQuantity.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
                state.error = action.error.message;
                console.error(state.error);
            });

        builder.addCase(deleteCartItem.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = state.cartItems.map((cartItem) => { if (cartItem.productId !== action.payload.product.productId) { return cartItem; } });
            })
            .addCase(deleteCartItem.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
                state.error = action.error.message;
                console.error(state.error);
            });
    },
});

export default shoppingCartSlice.reducer;