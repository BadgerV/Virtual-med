import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/UserSlice";
import doctorReducer from "./doctors/DoctorsSlice";
import chatSlice from "./chat/chatSlice";

const rootReducer = combineReducers({
  userSlice: userReducer,
  doctorSlice: doctorReducer,
  chatSlice: chatSlice,
});

export default rootReducer;
