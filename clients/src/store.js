import { configureStore } from '@reduxjs/toolkit';
import AuthReducer  from './store/auth-slice';

export const store = configureStore({
  reducer: {
    auth: AuthReducer
  },
})