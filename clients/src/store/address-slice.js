import {createSlice,createAsyncThunk} from 'react-redux'

const initialState = {
    address:[],
    isLoading: false,
    error: null
}

export const fetchAddresses = createAsyncThunk('/account/getaddress',async()=>{
     fetch(`${import.meta.env.VITE_BACKEND_URL}/api/account/getaddress`,{
        method: 'GET',
        credentials: 'include'
    }).then(response => response.json())
   .then(data => data)
})




export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAddresses.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(fetchAddresses.fulfilled, (state, action) => {
            state.isLoading = false;
            state.address = action.payload.addresses;
        }).addCase(fetchAddresses.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export default addressSlice.reducer;