import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/UserSlice";
import doctorReducer from "./doctors/DoctorsSlice";
import chatSlice from "./chat/chatSlice";
import formSlice from "./doctors/FormSlice";

const rootReducer = combineReducers({
  userSlice: userReducer,
  doctorSlice: doctorReducer,
  formSlice: formSlice,
  chatSlice: chatSlice,
});

export default rootReducer;
