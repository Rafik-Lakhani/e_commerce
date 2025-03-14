import { configureStore } from '@reduxjs/toolkit';
import AuthReducer  from './store/auth-slice';
import ProdcutReducer from './store/products-slice';
import UserProductReducer from './store/user-product-slice';
import CartReducer from './store/cart-slice.js';
import addressReducer from './store/address-slice.js'


export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    adminProdcuts:ProdcutReducer,
    userProdcuts: UserProductReducer, // for user's products
    cart: CartReducer,  // for shopping cart items,
    address:addressReducer,
  },
})