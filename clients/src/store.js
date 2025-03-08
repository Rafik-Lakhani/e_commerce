import { configureStore } from '@reduxjs/toolkit';
import AuthReducer  from './store/auth-slice';
import ProdcutReducer from './store/products-slice';
import UserProductReducer from './store/user-product-slice';


export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    adminProdcuts:ProdcutReducer,
    userProdcuts: UserProductReducer, // for user's products
  },
})