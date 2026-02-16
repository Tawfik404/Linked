import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../config/slice.ts';
import requestReducer from '../config/sliceReq.ts';
import usersReducer from '../config/sliceUsers.ts';
import userEditReducer from '../config/sliceUserEdit.ts';
import requestsReducer from '../config/sliceReqs.ts';
import rootReducer from './sliceReset.ts';

export const store = configureStore({
  reducer: rootReducer
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;