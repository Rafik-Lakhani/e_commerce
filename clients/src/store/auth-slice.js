import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import {toast} from 'react-toastify';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null
}

export const registeruser= createAsyncThunk("/auth/register", async(formData)=>{
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, formData,{
    withCredentials:true
  }).catch((err) =>{toast.error(err.response.data.message); return err.response});
  if(response.status==200 || response.status==201){
    return response.data.user;
  }
  else{
    return response.data.message;
  }
});

export const loginUser= createAsyncThunk("/auth/login", async(formData)=>{
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, formData,{
    withCredentials:true
  }).catch((err) =>{toast.error(err.response.data.message); return err.response});
  if(response.status==200 || response.status==201){
    return response.data.user;
  }
  else{
    return response.data.message;
  }
});

export const checkAuth= createAsyncThunk("/auth/checkauth", async(formData)=>{
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/check-auth`,{
    withCredentials:true
  }).catch((err) =>{return err.response});
  if(response.status==200 || response.status==201){
    return response.data.user;
  }
  else{
    return response.data.message;
  }
});


export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser:(state,action)=>{

    }
  },
  extraReducers: (builder)=>{
    builder.addCase(registeruser.pending,(state,action)=>{
      state.isLoading=true;
    }).addCase(registeruser.fulfilled,(state,action)=>{
      if(typeof action.payload=="object"){
        state.isLoading=false
        state.isAuthenticated=true;
        state.user=action.payload;
      }
      else{
        state.isLoading=false
        state.isAuthenticated=false;
        state.user=null;
      }
    }).addCase(registeruser.rejected,(state,action)=>{
      state.isLoading=false;
      console.log(action);
    });

    // here login event
    builder.addCase(loginUser.pending,(state,action)=>{
      state.isLoading=true;
    }).addCase(loginUser.fulfilled,(state,action)=>{
      console.log(typeof action.payload);
      if(typeof action.payload=="object"){
        state.isLoading=false
        state.isAuthenticated=true;
        state.user=action.payload;
      }
      else{
        state.isLoading=false
        state.isAuthenticated=false;
        state.user=null;
      }
    }).addCase(loginUser.rejected,(state,action)=>{
      state.isLoading=false;
      console.log(action);
    });

    // here auth event
    builder.addCase(checkAuth.pending,(state,action)=>{
      state.isLoading=true;
    }).addCase(checkAuth.fulfilled,(state,action)=>{
      if(typeof action.payload=="object"){
        state.isLoading=false
        state.isAuthenticated=true;
        state.user=action.payload;
      }
      else{
        state.isLoading=false
        state.isAuthenticated=false;
        state.user=null;
      }
    }).addCase(checkAuth.rejected,(state,action)=>{
      state.isLoading=false;
      console.log(action);
    });

  }
})


export const { setUser } = AuthSlice.actions

export default AuthSlice.reducer