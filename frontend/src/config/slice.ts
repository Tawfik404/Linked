import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'user',
    initialState: {
        "nom": "Funk",
        "age": "4",
        "admin": false,
        "MotDePasse": "e2EpziAy5RIpJgP",
        "pseudo": "Kaci_Reilly73",
        "prenom": "Rose",
        "couleur": "maroon",
        "Devise": "kr",
        "Pays": "Spain",
        "avatar": "https://cloudflareipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/831.jpg",
        "email": "Wade34@yahoo.com",
        "photo": "https://loremflickr.com/640/480/people",
        "id": "8"
    },
    reducers: {

    },
});

//export const { increment, decrement, reset, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
