import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/UserSlice";
import doctorReducer from "./doctors/DoctorsSlice";
import chatSlice from "./chat/chatSlice";
import formSlice from "./doctors/FormSlice";
import NotifcationSlice from "./notification/NotifcationSlice";

const rootReducer = combineReducers({
  userSlice: userReducer,
  doctorSlice: doctorReducer,
  formSlice: formSlice,
  chatSlice: chatSlice,
  NotifcationSlice : NotifcationSlice
});

export default rootReducer;
