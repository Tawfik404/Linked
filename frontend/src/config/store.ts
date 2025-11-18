import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../config/slice.ts';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
