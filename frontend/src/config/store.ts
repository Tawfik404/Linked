import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../config/slice.ts';
import requestReducer from '../config/sliceReq.ts';
import usersReducer from '../config/sliceUsers.ts';
import userEditReducer from '../config/sliceUserEdit.ts';

export const store = configureStore({
  reducer: {
    user: userReducer,
    request: requestReducer,
    users: usersReducer,
    userEdit: userEditReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;