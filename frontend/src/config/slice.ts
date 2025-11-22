import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {}
        // "id": 1,
        // "firstname": "Mike",
        // "lastname": "Tyson",
        // "email": "Wade34@yahoo.com",
        // "password": "password123",
        // "country": "Morocco",
        // "currency": "DH",
        // "image": "https://github.com/shadcn.png",
        // "color": "Rose",
        // "date": "24-04-2004",
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
