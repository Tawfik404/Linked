import { combineReducers } from "@reduxjs/toolkit";
import userReducer from '../config/slice.ts';
import requestReducer from '../config/sliceReq.ts';
import usersReducer from '../config/sliceUsers.ts';
import userEditReducer from '../config/sliceUserEdit.ts';
import requestsReducer from '../config/sliceReqs.ts';

const appReducer = combineReducers({
  user: userReducer,
  request: requestReducer,
  users: usersReducer,
  userEdit: userEditReducer,
  requests: requestsReducer,
});

// The magic reset wrapper
const rootReducer = (state, action) => {
  if (action.type === "RESET") {
    state = undefined;  
  }
  return appReducer(state, action);
};


export default rootReducer;
