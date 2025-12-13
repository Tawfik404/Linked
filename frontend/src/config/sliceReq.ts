import { createSlice } from '@reduxjs/toolkit';


const requestSlice = createSlice({
    name: 'request',
    initialState: {
        request: []
    },
    reducers: {
        setRequest(state, action) {
            state.request = action.payload;
        },
        
    },
});


export const { setRequest } = requestSlice.actions;
export default requestSlice.reducer;
