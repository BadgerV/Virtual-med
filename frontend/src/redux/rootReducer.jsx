import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/UserSlice";
import doctorReducer from "./doctors/DoctorsSlice";
import chatSlice from "./chat/chatSlice";
import formSlice from "./doctors/FormSlice";
import NotifcationSlice from "./notification/NotifcationSlice";
import appointmentSlice from "./appointment/appointmentSlice";

const rootReducer = combineReducers({
  userSlice: userReducer,
  doctorSlice: doctorReducer,
  formSlice: formSlice,
  chatSlice: chatSlice,
  notificationSlice: NotifcationSlice,
  appointmentSlice: appointmentSlice,
});

export default rootReducer;
