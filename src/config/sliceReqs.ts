import { createSlice } from '@reduxjs/toolkit';


const requestsSlice = createSlice({
    name: 'requests',
    initialState: {
        requests: []
    },
    reducers: {
        setRequests(state, action) {
            state.requests = action.payload;
        },
        
    },
});


export const { setRequests } = requestsSlice.actions;
export default requestsSlice.reducer;
