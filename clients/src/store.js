import { configureStore } from '@reduxjs/toolkit';
import AuthReducer  from './store/auth-slice';
import ProdcutReducer from './store/products-slice';


export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    adminProdcuts:ProdcutReducer
  },
})