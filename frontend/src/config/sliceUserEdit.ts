import { createSlice } from '@reduxjs/toolkit';

const userEditSlice = createSlice({
    name: 'useredit',
    initialState: {
        users: {}
    },
    reducers: {
        setUserEdit(state, action) {
            state.users = action.payload;
        },
    },
});



export const { setUserEdit } = userEditSlice.actions;
export default userEditSlice.reducer;

